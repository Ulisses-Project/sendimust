import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CustomCheckboxGridProps {
  className?: string;
  title: string;
  options: Option[];
  currentValues: string[];
  onChange: (value: string) => void;
}

export interface Option {
  value: string;
  label: string;
}

export const CustomCheckboxGrid = ({
  className,
  title,
  options,
  currentValues,
  onChange,
}: CustomCheckboxGridProps) => {
  return (
    <div className="space-y-2">
      <Label>{title}</Label>
      <div className={className}>
        {options.map(({ value, label }) => (
          <div
            key={value}
            className={`flex items-center space-x-2 rounded-lg border p-3 transition-all cursor-pointer hover:bg-accent hover:border-primary/50 ${
              currentValues.includes(value)
                ? "border-primary bg-primary/10 shadow-sm"
                : "border-border"
            }`}
            onClick={() => onChange(value)}
          >
            <Checkbox
              checked={currentValues.includes(value)}
              onCheckedChange={() => onChange(value)}
            />
            <Label className="cursor-pointer text-sm font-normal flex-1">
              {label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
