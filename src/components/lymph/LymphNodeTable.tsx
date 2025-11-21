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
import { Eraser, GripVertical, Plus, RotateCcw, Trash2 } from "lucide-react";

import { CustomSelect } from "../common/CustomSelect";
import {
  Sortable,
  SortableContent,
  SortableItem,
  SortableItemHandle,
} from "@/components/ui/sortable";
import { useContext, useState } from "react";
import { LymphNodeContext } from "@/context/LymphNodeContext";
import { useDimensions } from "@/context/DimensionsContext";
import type {
  CentralVascularity,
  Compartment,
  Laterality,
  SuspiciousFeature,
  UltrasoundAppearance,
} from "@/types/lymph/lymph.type";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "../common/MultiSelect";
import { optionsMapper } from "@/lib/utils";
import { LanguageContext } from "@/context/LanguageContext";

export const LymphNodeTable = () => {
  const { getDict, t } = useContext(LanguageContext);
  const {
    lymphNodes,
    addLymphNode,
    removeLymphNode,
    updateLymphNode,
    resetLymphNodes,
    resetLymphNode,
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
                <TableHead className="text-center w-[150px]">
                  {t("lymph.headers.laterality")}
                </TableHead>
                <TableHead className="text-center w-[100px]">
                  {t("lymph.headers.compartment")}
                </TableHead>
                <SortableContent asChild>
                  <>
                    {dimensions.map((dimension) => (
                      <SortableItem
                        key={dimension.id}
                        value={dimension.id}
                        asChild
                      >
                        <TableHead className="text-center w-20">
                          <div className="flex items-center justify-center gap-1">
                            <SortableItemHandle asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-20 hover:cursor-grab active:cursor-grabbing hover:bg-transparent"
                              >
                                <GripVertical className="h-4 w-4 text-muted-foreground" />
                                <span className="font-bold">
                                  {t(`lymph.dimensions.${dimension.id}`) ||
                                    dimension.label}
                                </span>
                              </Button>
                            </SortableItemHandle>
                          </div>
                        </TableHead>
                      </SortableItem>
                    ))}
                  </>
                </SortableContent>
                <TableHead className="text-center w-[280px]">
                  {t("lymph.headers.suspiciousFeatures")}
                </TableHead>
                <TableHead className="text-center w-[90px]">
                  {t("lymph.headers.fattyHilum")}
                </TableHead>
                <TableHead className="text-center w-[130px]">
                  {t("lymph.headers.centralVascularity")}
                </TableHead>
                <TableHead className="text-center w-[140px]">
                  {t("lymph.headers.ultrasoundAppearance")}
                </TableHead>
                <TableHead className="text-center w-[200px]">
                  {t("lymph.headers.observations")}
                </TableHead>
                <TableHead className="text-center w-20">
                  {t("lymph.headers.actions")}
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {lymphNodes.map((lymphNode, index) => (
                <TableRow key={lymphNode.id}>
                  <TableCell className="w-[150px]">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">#{index + 1}</span>
                      <CustomSelect
                        value={lymphNode.laterality}
                        options={optionsMapper(getDict("lymph.laterality"))}
                        onChange={(value) =>
                          updateLymphNode(
                            lymphNode.id,
                            "laterality",
                            value as Laterality
                          )
                        }
                      />
                    </div>
                  </TableCell>
                  <TableCell className="w-[100px]">
                    <CustomSelect
                      value={lymphNode.compartment}
                      options={optionsMapper(getDict("lymph.compartment"))}
                      onChange={(value) =>
                        updateLymphNode(
                          lymphNode.id,
                          "compartment",
                          value as Compartment
                        )
                      }
                    />
                  </TableCell>
                  {dimensions.map((dimension) => (
                    <TableCell key={dimension.id} className="w-20">
                      <div className="flex items-center justify-center">
                        <Input
                          withoutArrow
                          type="number"
                          placeholder="0"
                          className="w-16 text-center"
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
                  <TableCell className="w-[280px]">
                    <div className="flex flex-col items-center justify-center gap-2 w-full min-h-[80px]">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={lymphNode.isSuspicious}
                          onCheckedChange={(checked) =>
                            updateLymphNode(
                              lymphNode.id,
                              "isSuspicious",
                              checked
                            )
                          }
                        />
                        <Label>
                          {lymphNode.isSuspicious
                            ? t("lymph.boolean.yes")
                            : t("lymph.boolean.no")}
                        </Label>
                      </div>
                      {lymphNode.isSuspicious && (
                        <div className="w-full h-10">
                          <MultiSelect
                            options={optionsMapper(
                              getDict("lymph.suspiciousFeatures")
                            )}
                            selected={lymphNode.suspiciousFeatures || []}
                            onChange={(value) =>
                              updateLymphNode(
                                lymphNode.id,
                                "suspiciousFeatures",
                                value as SuspiciousFeature[]
                              )
                            }
                          />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="w-[90px]">
                    <div className="flex items-center justify-center gap-2">
                      <Switch
                        checked={lymphNode.hasFattyHilum}
                        onCheckedChange={(checked) =>
                          updateLymphNode(
                            lymphNode.id,
                            "hasFattyHilum",
                            checked
                          )
                        }
                      />
                      <Label>
                        {lymphNode.hasFattyHilum
                          ? t("lymph.boolean.yes")
                          : t("lymph.boolean.no")}
                      </Label>
                    </div>
                  </TableCell>
                  <TableCell className="w-[130px]">
                    <CustomSelect
                      value={lymphNode.centralVascularity}
                      options={optionsMapper(
                        getDict("lymph.centralVascularity")
                      )}
                      onChange={(value) =>
                        updateLymphNode(
                          lymphNode.id,
                          "centralVascularity",
                          value as CentralVascularity
                        )
                      }
                    />
                  </TableCell>
                  <TableCell className="w-[140px]">
                    <CustomSelect
                      value={lymphNode.ultrasoundAppearance}
                      options={optionsMapper(
                        getDict("lymph.ultrasoundAppearance")
                      )}
                      onChange={(value) =>
                        updateLymphNode(
                          lymphNode.id,
                          "ultrasoundAppearance",
                          value as UltrasoundAppearance
                        )
                      }
                    />
                  </TableCell>
                  <TableCell className="w-[200px]">
                    <Input
                      placeholder={t("lymph.headers.observations")}
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
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => resetLymphNode(lymphNode.id)}
                        className="text-muted-foreground hover:text-primary hover:bg-transparent"
                        title={t("lymph.actions.cleanRow")}
                      >
                        <Eraser className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeLymphNode(lymphNode.id)}
                        disabled={lymphNodes.length === 1}
                        className="text-muted-foreground hover:text-destructive hover:bg-transparent"
                        title={t("lymph.actions.deleteRow")}
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
          {t("lymph.actions.resetAll")}
        </Button>
        <Button onClick={addLymphNode} variant="outline" className="gap-2">
          <Plus className="h-4 w-4" />
          {t("lymph.actions.addRow")}
        </Button>
      </div>
    </div>
  );
};
