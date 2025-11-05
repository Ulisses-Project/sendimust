import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomSelectProps {
  defaultValue: string;
  options: Option[];
  onChange: (value: string) => void;
}

export interface Option {
  value: string;
  label: string;
}

export const CustomSelect = ({
  defaultValue,
  options,
  onChange,
}: CustomSelectProps) => {
  return (
    <Select defaultValue={defaultValue} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
