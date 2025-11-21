"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GripVertical, Plus, RotateCcw, Trash2 } from "lucide-react";

import { CustomSelect, type Option } from "../common/CustomSelect";
import {
  Sortable,
  SortableContent,
  SortableItem,
  SortableItemHandle,
} from "@/components/ui/sortable";
import { useContext, useState } from "react";
import { LymphNodeContext } from "@/context/LymphNodeContext";
import { useDimensions } from "@/context/DimensionsContext";
import { lymph as lymphEs } from "@/i18n/es/lymph";
import type { UltrasoundAppearance } from "@/types/lymph/lymph.type";

const ultrasoundAppearances: Option[] = Object.entries(
  lymphEs.ultrasoundAppearance
).map(([key, label]) => ({
  value: key,
  label,
}));

export const LymphNodeTable = () => {
  const {
    lymphNodes,
    addLymphNode,
    removeLymphNode,
    updateLymphNode,
    resetLymphNodes,
  } = useContext(LymphNodeContext);

  const { dimensions, setDimensions } = useDimensions();

  const [isRotating, setIsRotating] = useState(false);

  const handleReset = async () => {
    setIsRotating(true);

    resetLymphNodes();

    // La animación durará 1s, luego se detiene
    setTimeout(() => setIsRotating(false), 1000);
  };

  return (
    <div className="space-y-4">
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
                <TableHead className="w-[250px]">Compartimento</TableHead>
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
                <TableHead className="text-center w-[180px]">
                  Aspecto ecográfico
                </TableHead>
                <TableHead className="text-center w-[250px]">
                  Observaciones
                </TableHead>
                <TableHead className="text-center w-20">Acciones</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {lymphNodes.map((lymphNode, index) => (
                <TableRow key={lymphNode.id}>
                  <TableCell className="w-[250px]">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">#{index + 1}</span>
                      <Input
                        placeholder="Compartimento"
                        className="flex-1"
                        value={lymphNode.compartment}
                        onChange={(e) =>
                          updateLymphNode(
                            lymphNode.id,
                            "compartment",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </TableCell>
                  {dimensions.map((dimension) => (
                    <TableCell key={dimension.id} className="w-[100px]">
                      <div className="flex items-center justify-center">
                        <Input
                          withoutArrow
                          type="number"
                          placeholder="0"
                          className="w-20 text-center"
                          // @ts-ignore
                          value={lymphNode[dimension.id]}
                          onChange={(e) =>
                            // @ts-ignore
                            updateLymphNode(
                              lymphNode.id,
                              dimension.id,
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </TableCell>
                  ))}
                  <TableCell className="w-[180px]">
                    <div className="flex items-center justify-center">
                      <CustomSelect
                        value={lymphNode.ultrasoundAppearance}
                        options={ultrasoundAppearances}
                        onChange={(value) =>
                          updateLymphNode(
                            lymphNode.id,
                            "ultrasoundAppearance",
                            value as UltrasoundAppearance
                          )
                        }
                      />
                    </div>
                  </TableCell>
                  <TableCell className="w-[250px]">
                    <Input
                      placeholder="Observaciones"
                      className="min-w-48"
                      value={lymphNode.observations}
                      onChange={(e) =>
                        updateLymphNode(
                          lymphNode.id,
                          "observations",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell className="w-20">
                    <div className="flex items-center justify-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeLymphNode(lymphNode.id)}
                        disabled={lymphNodes.length === 1}
                        className="text-muted-foreground hover:text-primary hover:bg-transparent"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Sortable>
      </div>
      <div className="flex justify-between">
        <Button
          onClick={handleReset}
          variant="outline"
          className="gap-2"
          disabled={isRotating}
        >
          <RotateCcw
            className={`h-4 w-4 ${isRotating ? "animate-spin-once" : ""}`}
          />
          Resetear
        </Button>
        <Button onClick={addLymphNode} variant="outline" className="gap-2">
          <Plus className="h-4 w-4" />
          Añadir fila
        </Button>
      </div>
    </div>
  );
};
