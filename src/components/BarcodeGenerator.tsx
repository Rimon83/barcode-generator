import { useState } from "react";
import { Card } from "./ui/card";
import BarcodeInput from "./BarcodeInput";
import BarcodePreview from "./BarcodePreview";
import SizeGrid, { type SizeOption } from "./SizeGrid";
// @ts-ignore - jsbarcode types
import JsBarcode from "jsbarcode";
import { toast } from "sonner";
import { jsPDF } from "jspdf"; // for PDF export

const SIZE_OPTIONS: SizeOption[] = [
  {
    id: "small",
    name: "Small",
    width: 1,
    height: 50,
    description: "Perfect for labels and tags",
  },
  {
    id: "medium",
    name: "Medium",
    width: 2,
    height: 80,
    description: "Standard size for most uses",
  },
  {
    id: "large",
    name: "Large",
    width: 2,
    height: 120,
    description: "High visibility applications",
  },
  {
    id: "xlarge",
    name: "Extra Large",
    width: 3,
    height: 150,
    description: "Maximum readability",
  },
  {
    id: "long",
    name: "Long",
    width: 1.6,
    height: 20,
    description: " For narrow spaces",
  },
];

export default function BarcodeGenerator() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [selectedSize, setSelectedSize] = useState("medium");

  const handleTextChange = (value: string) => {
    setText(value);
    if (value && value.length < 1) {
      setError("Text is required");
    } else {
      setError("");
    }
  };

  const handleDownload = async (
    sizeId: string,
    format: "png" | "svg" | "jpeg" | "webp" | "pdf"
  ) => {
    if (!text) return;

    const size = SIZE_OPTIONS.find((s) => s.id === sizeId);
    if (!size) return;

    try {
      if (["png", "jpeg", "webp"].includes(format)) {
        // Create a canvas
        const canvas = document.createElement("canvas");
        JsBarcode(canvas, text, {
          format: "CODE128",
          width: size.width,
          height: size.height,
          displayValue: true,
          textMargin: 12,
          font: "Arial",
          fontSize: 18,
          textAlign: "center",
        });

        // Convert to Blob (supports png, jpeg, webp)
        const mimeTypeMap = {
          png: "image/png",
          jpeg: "image/jpeg",
          webp: "image/webp",
        } as const;
        const mimeType = mimeTypeMap[format as keyof typeof mimeTypeMap];

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = `barcode-${size.name.toLowerCase()}-${text}.${format}`;
              link.click();
              URL.revokeObjectURL(url);

              toast("Download successful!", {
                description: `Barcode saved as ${
                  size.name
                } ${format.toUpperCase()}`,
              });
            }
          },
          mimeType,
          format === "jpeg" ? 0.92 : 1 // JPEG quality (optional)
        );
      } else if (format === "svg") {
        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        JsBarcode(svg, text, {
          format: "CODE128",
          width: size.width,
          height: size.height,
          displayValue: true,
          fontSize: 14,
          textMargin: 12,
          font: "Arial", // Change font to Arial
          textAlign: "center", // Center align the text
        });

        const svgData = new XMLSerializer().serializeToString(svg);
        const blob = new Blob([svgData], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `barcode-${size.name.toLowerCase()}-${text}.svg`;
        link.click();
        URL.revokeObjectURL(url);

        toast("Download successful!", {
          description: `Barcode saved as ${size.name} SVG`,
        });
      }
      // 📄 PDF
      else if (format === "pdf") {
        // Render at higher internal resolution (scale) so the human-readable text stays crisp when rasterized,
        // then downscale to a controlled PDF width so the page isn't huge.
        const deviceRatio = typeof window !== "undefined" ? (window.devicePixelRatio || 1) : 1;
        const scale = Math.max(2, Math.round(deviceRatio)); // at least 2x for crisp text

        // Estimate barcode logical width in pixels:
        // CODE128 typically uses ~11 modules per character + start/stop; this is an approximation
        const modulesPerChar = 11;
        const startStopModules = 35;
        const modules = text.length * modulesPerChar + startStopModules;
        const logicalWidth = Math.ceil(modules * size.width);
        const logicalHeight = Math.ceil(size.height);

        // Create a high-resolution canvas
        const canvas = document.createElement("canvas");
        canvas.width = logicalWidth * scale;
        canvas.height = logicalHeight * scale;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          // Scale the drawing context so JsBarcode can draw using logical sizes but the output will be high-res
          ctx.scale(scale, scale);
        }

        // Draw the barcode using logical sizes (JsBarcode draws into the canvas coordinate system)
        JsBarcode(canvas, text, {
          format: "CODE128",
          width: size.width, // logical module width (will be scaled by ctx.scale)
          height: logicalHeight,
          displayValue: true,
          font: "Arial",
          fontSize: 18,
          textMargin: 12,
          textAlign: "center",
        });

        // Export to Data URL (PNG) from high-res canvas
        const imgData = canvas.toDataURL("image/png");

        // Prepare PDF sizing: limit the maximum PDF width so barcode isn't enormous on the page
        const margin = 10; // px
        const imgLogicalWidth = canvas.width / scale;
        const imgLogicalHeight = canvas.height / scale;
        const maxPdfContentWidth = 800; // px - adjust to taste (keeps PDF a reasonable width)
        const pdfScale = Math.min(1, maxPdfContentWidth / imgLogicalWidth);

        const pdfWidth = Math.round(imgLogicalWidth * pdfScale + margin * 2);
        const pdfHeight = Math.round(imgLogicalHeight * pdfScale + margin * 2);

        const pdf = new jsPDF({
          orientation: imgLogicalWidth > imgLogicalHeight ? "l" : "p",
          unit: "px",
          format: [pdfWidth, pdfHeight],
        });

        // Add scaled image into PDF (use logical dims scaled by pdfScale)
        pdf.addImage(
          imgData,
          "PNG",
          margin,
          margin,
          Math.round(imgLogicalWidth * pdfScale),
          Math.round(imgLogicalHeight * pdfScale)
        );

        pdf.save(`barcode-${size.name.toLowerCase()}-${text}.pdf`);

        toast("Download successful!", {
          description: `Barcode saved as ${size.name} PDF`,
        });
      }
    } catch (err) {
      toast("Download failed", {
        description: "There was an error generating the barcode",
      });
    }
  };

  const selectedSizeOption = SIZE_OPTIONS.find((s) => s.id === selectedSize);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 animate-in fade-in-50 duration-500">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Barcode Generator
          </h1>
          <p className="text-lg text-muted-foreground">
            Convert text to professional barcodes instantly
          </p>
        </div>

        {/* Main Card */}
        <Card className="p-6 sm:p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm animate-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-8">
            {/* Input Section */}
            <BarcodeInput
              value={text}
              onChange={handleTextChange}
              error={error}
            />

            {/* Preview Section */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Preview</h3>
              <BarcodePreview
                text={text}
                width={selectedSizeOption?.width}
                height={selectedSizeOption?.height}
              />
            </div>

            {/* Size Selection */}
            <SizeGrid
              sizes={SIZE_OPTIONS}
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
              onDownload={handleDownload}
              text={text}
            />
          </div>
        </Card>

        {/* Footer Info */}
        {text && (
          <div className="text-center text-sm text-muted-foreground animate-in fade-in-50 duration-500">
            <p>
              💡 Tip: Select a size option above to download your barcode in PNG
              or SVG format
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
