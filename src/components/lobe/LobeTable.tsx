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
import { Info, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sortable,
  SortableContent,
  SortableItem,
  SortableItemHandle,
} from "@/components/ui/sortable";
import { useDimensions } from "@/context/DimensionsContext";

const LOBULOS_DATA = [
  { id: "derecho", label: "Lóbulo derecho" },
  { id: "izquierdo", label: "Lóbulo izquierdo" },
  { id: "istmo", label: "Istmo" },
] as const;

export const LobeTable = () => {
  const { dimensions, setDimensions } = useDimensions();

  return (
    <div>
      <Sortable
        value={dimensions}
        onValueChange={setDimensions}
        getItemValue={(item) => item.id}
        orientation="horizontal"
      >
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
                        <Info className="h-4 w-4 text-muted-foreground" />
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
              <SortableContent asChild>
                <>
                  {dimensions.map((dimension) => (
                    <SortableItem
                      key={dimension.id}
                      value={dimension.id}
                      asChild
                    >
                      <TableHead className="text-center w-[100px]">
                        <div className="flex items-center justify-center gap-1">
                          <SortableItemHandle asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-20 hover:cursor-grab active:cursor-grabbing hover:bg-transparent"
                            >
                              <GripVertical className="h-4 w-4 text-muted-foreground" />
                              <span className="font-bold">
                                {dimension.label}
                              </span>
                            </Button>
                          </SortableItemHandle>
                        </div>
                      </TableHead>
                    </SortableItem>
                  ))}
                </>
              </SortableContent>
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
                {dimensions.map((dimension) => (
                  <TableCell key={dimension.id} className="w-[100px]">
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
      </Sortable>
    </div>
  );
};
