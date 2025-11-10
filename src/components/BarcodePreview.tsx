import { useEffect, useRef } from "react";
// @ts-ignore - jsbarcode types
import JsBarcode from "jsbarcode";
import { Card } from "./ui/card";

interface BarcodePreviewProps {
  text: string;
  width?: number;
  height?: number;
}

export default function BarcodePreview({
  text,
  width = 2,
  height = 100,
}: BarcodePreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && text) {
      try {
        // @ts-ignore - jsbarcode types
        JsBarcode(canvasRef.current, text, {
          format: "CODE128",
          width,
          height,
          displayValue: true,
          fontSize: 14,
          textMargin: 12,
          font: "Arial", // Change font to Arial
          textAlign: "center", // Center align the text
        });
      } catch (error) {
        console.error("Error generating barcode:", error);
      }
    }
  }, [text, width, height]);

  if (!text) {
    return (
      <Card className="p-12 flex items-center justify-center bg-muted/30 border-dashed">
        <div className="text-center space-y-2">
          <div className="text-4xl">📊</div>
          <p className="text-sm text-muted-foreground">
            Enter text above to generate a barcode
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 flex items-center justify-center bg-white transition-all duration-300 animate-in fade-in-50">
      <canvas ref={canvasRef} className="max-w-full" />
    </Card>
  );
}
