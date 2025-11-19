import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { GripVertical } from "lucide-react";
import { SortableItemHandle } from "@/components/ui/sortable";

interface CustomInputProps {
  value: string;
  placeholder: string;
  className?: string;
  label?: string;
  withoutArrow?: boolean;
  onChange: (value: string) => void;
}

export const CustomInput = ({
  value,
  placeholder,
  className,
  label,
  withoutArrow,
  onChange,
}: CustomInputProps) => {
  return (
    <div className={className}>
      {label && (
        <SortableItemHandle tabIndex={-1}>
          <div className="flex">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 hover:cursor-grab active:cursor-grabbing"
              tabIndex={-1}
              type="button"
            >
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Label className="text-md text-muted-foreground grow hover:cursor-grab active:cursor-grabbing">
              {label}
            </Label>
          </div>
        </SortableItemHandle>
      )}
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="text-center text-lg font-semibold w-full"
        withoutArrow={withoutArrow}
      />
    </div>
  );
};
