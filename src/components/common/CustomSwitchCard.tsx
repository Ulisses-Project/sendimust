import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface CustomSwitchCardProps {
  title: string;
  id: string;
  checked: boolean;
  children: React.ReactNode;
  className?: string;
  handleCheckedChange: (checked: boolean) => void;
}

export const CustomSwitchCard = ({
  title,
  id,
  checked,
  handleCheckedChange,
  children,
  className,
}: CustomSwitchCardProps) => {
  return (
    <Card className={className}>
      <CardHeader className="flex items-center gap-x-4">
        <CardTitle>
          <div className="flex items-center gap-2">
            <div className="h-8 w-1 bg-primary rounded-full" />
            <h3 className="text-lg font-semibold text-primary">{title}</h3>
          </div>
        </CardTitle>
        <Switch
          id={id}
          checked={checked}
          onCheckedChange={handleCheckedChange}
        />
      </CardHeader>
      {checked && <CardContent>{children}</CardContent>}
    </Card>
  );
};
