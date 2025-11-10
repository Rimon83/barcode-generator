import { Input } from "./ui/input";
import { Label } from "./ui/label";


interface BarcodeInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function BarcodeInput({
  value,
  onChange,
  error,
}: BarcodeInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="barcode-input" className="text-sm font-medium">
        Enter Text to Convert
      </Label>
      <Input
        id="barcode-input"
        type="text"
        placeholder="Type or paste text here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`transition-all ${
          error ? "border-destructive focus-visible:ring-destructive" : ""
        }`}
      />
      {error && (
        <p className="text-sm text-destructive animate-in fade-in-50 duration-200">
          {error}
        </p>
      )}
    </div>
  );
}
