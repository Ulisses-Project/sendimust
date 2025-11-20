import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
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
import { use } from "react";
import { LobeContext } from "@/context/LobeContext";
import { LanguageContext } from "@/context/LanguageContext";
import { CustomInput } from "../common/CustomInput";

export const LobeTable = () => {
  const { dimensions, setDimensions } = useDimensions();
  const { thyroidalLobes, updateLobe } = use(LobeContext);
  const { t } = use(LanguageContext);

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
            {thyroidalLobes.lobes.map((lobe) => (
              <TableRow key={lobe.id}>
                <TableCell className="font-medium w-[200px]">
                  {t(`lobe.id.${lobe.id}`)}
                </TableCell>
                <TableCell className="w-[100px]">
                  <div className="flex items-center justify-center">
                    <Switch
                      checked={lobe.isAbsent}
                      onCheckedChange={(value) =>
                        updateLobe(lobe.id, "isAbsent", value)
                      }
                    />
                  </div>
                </TableCell>
                {!lobe.isAbsent && (
                  <>
                    <TableCell className="w-[100px]">
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={lobe.isDefault}
                          onCheckedChange={(value) =>
                            updateLobe(lobe.id, "isDefault", !!value)
                          }
                        />
                      </div>
                    </TableCell>
                    {dimensions.map((dimension) => (
                      <TableCell key={dimension.id} className="w-[100px]">
                        <div className="flex items-center justify-center">
                          <CustomInput
                            value={lobe[dimension.id]}
                            onChange={(value) =>
                              updateLobe(lobe.id, dimension.id, value)
                            }
                            withoutArrow
                            className="w-20 text-center"
                            placeholder="0"
                            disabled={lobe.isDefault}
                          />
                        </div>
                      </TableCell>
                    ))}
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Sortable>
    </div>
  );
};
