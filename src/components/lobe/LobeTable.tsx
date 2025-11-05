import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const LOBULOS_DATA = [
  { id: "derecho", label: "Lóbulo derecho" },
  { id: "izquierdo", label: "Lóbulo izquierdo" },
  { id: "istmo", label: "Istmo" },
] as const;

export const LobeTable = () => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Estructura</TableHead>
            <TableHead className="text-center w-[100px]">Ausente</TableHead>
            <TableHead className="text-center w-[100px]">
              <div className="flex items-center justify-center gap-1">
                Por defecto
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm w-[300px] text-center">
                        Si no se introducen las dimensiones de los lóbulos se
                        establecerán por defecto para la generación del
                        pictograma, dichos valores no serán incluidos en el
                        informe.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TableHead>
            <TableHead className="text-center w-[100px]">AP [mm]</TableHead>
            <TableHead className="text-center w-[100px]">T [mm]</TableHead>
            <TableHead className="text-center w-[100px]">CC [mm]</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {LOBULOS_DATA.map((lobulo) => (
            <TableRow key={lobulo.id}>
              <TableCell className="font-medium w-[200px]">
                {lobulo.label}
              </TableCell>
              {["Ausente", "Por defecto"].map((item) => (
                <TableCell key={item} className="w-[100px]">
                  <div className="flex items-center justify-center">
                    <Checkbox />
                  </div>
                </TableCell>
              ))}
              {["AP", "T", "CC"].map((item) => (
                <TableCell key={item} className="w-[100px]">
                  <div className="flex items-center justify-center">
                    <Input
                      type="number"
                      withoutArrow
                      className="w-20 text-center"
                      placeholder="0"
                    />
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
