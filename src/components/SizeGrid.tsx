import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Download, Check, FileImage, FileType, Image } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export interface SizeOption {
  id: string;
  name: string;
  width: number;
  height: number;
  description: string;
}

export type DownloadFormat = "png" | "svg" | "jpeg" | "webp" | "pdf";

interface SizeGridProps {
  sizes: SizeOption[];
  selectedSize: string;
  onSelectSize: (sizeId: string) => void;
  onDownload: (sizeId: string, format: DownloadFormat) => void;
  text: string;
}

const FORMAT_OPTIONS: {
  value: DownloadFormat;
  label: string;
  icon: any;
  description: string;
}[] = [
  {
    value: "png",
    label: "PNG",
    icon: Image,
    description: "High quality, transparent",
  },
  {
    value: "svg",
    label: "SVG",
    icon: FileType,
    description: "Scalable vector",
  },
  {
    value: "jpeg",
    label: "JPEG",
    icon: FileImage,
    description: "Compressed, smaller size",
  },
  {
    value: "webp",
    label: "WebP",
    icon: Image,
    description: "Modern, efficient",
  },
  {
    value: "pdf",
    label: "PDF",
    icon: FileType,
    description: "Print-ready document",
  },
];

export default function SizeGrid({
  sizes,
  selectedSize,
  onSelectSize,
  onDownload,
  text,
}: SizeGridProps) {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);

  const handleDownload = async (sizeId: string, format: DownloadFormat) => {
    setDownloadingId(sizeId);
    await onDownload(sizeId, format);
    setDownloadingId(null);
    setSuccessId(sizeId);
    setTimeout(() => setSuccessId(null), 2000);
  };

  if (!text) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Select Size & Download</h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="hidden sm:inline">Available formats:</span>
          <div className="flex gap-1">
            {FORMAT_OPTIONS.map((format) => (
              <span
                key={format.value}
                className="bg-muted px-2 py-1 rounded font-medium"
              >
                {format.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sizes.map((size) => (
          <Card
            key={size.id}
            className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${
              selectedSize === size.id
                ? "ring-2 ring-primary border-primary bg-primary/5"
                : "hover:border-primary/50"
            }`}
            onClick={() => onSelectSize(size.id)}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-base">{size.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {size.description}
                  </p>
                </div>
                {selectedSize === size.id && (
                  <div className="bg-primary text-primary-foreground rounded-full p-1">
                    <Check className="h-3 w-3" />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="bg-muted px-2 py-1 rounded">
                  {size.width}x{size.height}px
                </span>
              </div>

              {selectedSize === size.id && (
                <div className="pt-2 animate-in slide-in-from-top-2 duration-200">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="sm"
                        className="w-full"
                        disabled={downloadingId === size.id}
                      >
                        {downloadingId === size.id ? (
                          <span className="flex items-center gap-2">
                            <div className="h-3 w-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            Downloading...
                          </span>
                        ) : successId === size.id ? (
                          <span className="flex items-center gap-2">
                            <Check className="h-4 w-4" />
                            Downloaded!
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Download className="h-4 w-4" />
                            Download Barcode
                          </span>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>Select Format</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {FORMAT_OPTIONS.map((format) => {
                        const Icon = format.icon;
                        return (
                          <DropdownMenuItem
                            key={format.value}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownload(size.id, format.value);
                            }}
                            className="cursor-pointer"
                          >
                            <Icon className="h-4 w-4 mr-2" />
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {format.label}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {format.description}
                              </span>
                            </div>
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
