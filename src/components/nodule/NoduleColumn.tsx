import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { use } from "react";
import { Badge } from "@/components/ui/badge";
import { NoduleContext } from "@/context/NoduleContext";
import type {
  Composition,
  isCalcification,
  isExtrathyroidalExtension,
  Lobe,
  Margin,
  Nodule,
  VascularityType,
} from "@/types/nodule/nodule.type";
import { CustomSelect } from "@/components/common/CustomSelect";
import { LanguageContext } from "@/context/LanguageContext";
import { optionsMapper } from "@/lib/utils";
import { CustomCheckboxGrid } from "@/components/common/CustomCheckboxGrid";
import { CustomInput } from "@/components/common/CustomInput";
import { useDimensions } from "@/context/DimensionsContext";
import {
  Sortable,
  SortableContent,
  SortableItem,
} from "@/components/ui/sortable";
import { Switch } from "@/components/ui/switch";
import { toggleArrayField as toggleArrayFieldHelper } from "@/lib/helpers/nodule";
import { getTiRadsColor, getTiRadsBorderColor } from "@/lib/helpers/tirads";

export const NoduleColumn = () => {
  const { getDict, t } = use(LanguageContext);

  const { dimensions, setDimensions } = useDimensions();

  const { nodules, updateNoduleField, currentNoduleId } = use(NoduleContext);

  const currentNodule = nodules.find((n) => n.id === currentNoduleId) as Nodule;

  // Helper wrapper to maintain existing API
  const toggleArrayField = (field: keyof Nodule, value: string) => {
    toggleArrayFieldHelper(currentNodule, field, value, updateNoduleField);
  };

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <Card>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2">
                <div className="h-8 w-1 bg-secondary rounded-full" />
                <h3 className="text-lg font-semibold text-secondary">
                  Ubicación y Medidas
                </h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2" data-tour="nodule-lobulo">
                  <Label>Lóbulo</Label>
                  <CustomSelect
                    options={optionsMapper(getDict("nodule.lobe"))}
                    value={currentNodule.lobe}
                    onChange={(value) =>
                      updateNoduleField(currentNoduleId, "lobe", value as Lobe)
                    }
                  />
                </div>

                <div className="space-y-2" data-tour="nodule-composicion">
                  <Label>Composición</Label>
                  <CustomSelect
                    options={optionsMapper(getDict("nodule.composition"))}
                    value={currentNodule.composition}
                    onChange={(value) =>
                      updateNoduleField(
                        currentNoduleId,
                        "composition",
                        value as Composition
                      )
                    }
                  />
                </div>
              </div>

              <div className="space-y-3" data-tour="nodule-localizacion">
                <CustomCheckboxGrid
                  className="grid grid-cols-2 gap-2 sm:grid-cols-4"
                  title="Localización en el lóbulo"
                  options={optionsMapper(getDict("nodule.location"))}
                  currentValues={currentNodule.location}
                  onChange={(value) => toggleArrayField("location", value)}
                />
              </div>

              <div className="space-y-2" data-tour="nodule-medidas">
                <Label>Medidas</Label>
                <Sortable
                  value={dimensions}
                  onValueChange={setDimensions}
                  getItemValue={(item) => item.id}
                  orientation="horizontal"
                >
                  <SortableContent asChild>
                    <div className="flex w-full gap-2">
                      {dimensions.map((dimension) => (
                        <SortableItem
                          key={dimension.id}
                          value={dimension.id}
                          asChild
                        >
                          <div className="flex flex-1 min-w-[100px]">
                            <CustomInput
                              value={currentNodule[dimension.id]}
                              placeholder="0"
                              label={dimension.label}
                              onChange={(value) => {
                                updateNoduleField(
                                  currentNoduleId,
                                  dimension.id,
                                  value
                                );
                              }}
                              withoutArrow
                              className="w-full"
                            />
                          </div>
                        </SortableItem>
                      ))}
                    </div>
                  </SortableContent>
                </Sortable>
              </div>
            </div>

            {currentNodule.composition !== "simpleCyst" && (
              <>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-2 pb-2">
                    <div className="h-8 w-1 bg-secondary rounded-full" />
                    <h3 className="text-lg font-semibold text-secondary">
                      Características ecográficas
                    </h3>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Ecogenicidad</Label>
                      <CustomSelect
                        options={optionsMapper(getDict("nodule.echogenicity"))}
                        value={currentNodule.echogenicity}
                        onChange={(value) =>
                          updateNoduleField(
                            currentNoduleId,
                            "echogenicity",
                            value as any
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Margen</Label>
                      <CustomSelect
                        options={optionsMapper(getDict("nodule.margin"))}
                        value={currentNodule.margin}
                        onChange={(value) =>
                          updateNoduleField(
                            currentNoduleId,
                            "margin",
                            value as Margin
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Label className="pr-2">Extensión extratiroidea</Label>
                      <Switch
                        checked={
                          currentNodule.isExtrathyroidalExtension === "yes"
                        }
                        onCheckedChange={(value) =>
                          updateNoduleField(
                            currentNoduleId,
                            "isExtrathyroidalExtension",
                            (value ? "yes" : "no") as isExtrathyroidalExtension
                          )
                        }
                      />
                      {/* //*Titulo del switch descomentar */}
                      <span className="text-sm text-muted-foreground">
                        {t(
                          `nodule.isExtrathyroidalExtension.${currentNodule.isExtrathyroidalExtension}`
                        )}
                      </span>
                    </div>
                    {currentNodule.isExtrathyroidalExtension === "yes" && (
                      <div className="pl-4 space-y-2 border-l-2 border-secondary">
                        <CustomCheckboxGrid
                          className="grid grid-cols-2 gap-2 sm:grid-cols-4"
                          title="Localización de la extensión"
                          options={optionsMapper(
                            getDict("nodule.extrathyroidalExtensionLocation")
                          )}
                          currentValues={
                            currentNodule.extrathyroidalExtensionLocation
                          }
                          onChange={(value) =>
                            toggleArrayField(
                              "extrathyroidalExtensionLocation",
                              value
                            )
                          }
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Label className="pr-2">Puntos ecogénicos</Label>
                      <Switch
                        checked={currentNodule.isCalcification === "yes"}
                        onCheckedChange={(value) =>
                          updateNoduleField(
                            currentNoduleId,
                            "isCalcification",
                            (value ? "yes" : "no") as isCalcification
                          )
                        }
                      />
                      {/* //* Titulo del switch descomentar */}
                      <span className="text-sm text-muted-foreground">
                        {t(
                          `nodule.isCalcification.${currentNodule.isCalcification}`
                        )}
                      </span>
                    </div>
                    {currentNodule.isCalcification === "yes" && (
                      <div className="pl-4 space-y-2 border-l-2 border-secondary">
                        <CustomCheckboxGrid
                          className="space-y-2"
                          title="Tipo de calcificación"
                          options={optionsMapper(
                            getDict("nodule.calcificationType")
                          )}
                          currentValues={currentNodule.calcificationType}
                          onChange={(value) =>
                            toggleArrayField("calcificationType", value)
                          }
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 pt-4">
                    <div className="flex items-center gap-2 pb-2">
                      <div className="h-8 w-1 bg-secondary rounded-full" />
                      <h3 className="text-lg font-semibold text-secondary">
                        Vascularización
                      </h3>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Vascularización</Label>
                        <CustomSelect
                          options={optionsMapper(getDict("nodule.vascularity"))}
                          value={currentNodule.vascularity}
                          onChange={(value) =>
                            updateNoduleField(
                              currentNoduleId,
                              "vascularity",
                              value as any
                            )
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Tipo de vascularización</Label>
                        <CustomSelect
                          options={optionsMapper(
                            getDict("nodule.vascularityType")
                          )}
                          value={currentNodule.vascularityType}
                          onChange={(value) =>
                            updateNoduleField(
                              currentNoduleId,
                              "vascularityType",
                              value as VascularityType
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="space-y-4 pt-4 -mx-6 px-6 py-4">
              <div className="flex items-center gap-2 pb-2">
                <div className="h-8 w-1 bg-secondary rounded-full" />
                <h3 className="text-lg font-semibold text-secondary">
                  Análisis Automático
                </h3>
                <Badge className="ml-auto">Sólo lectura</Badge>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">
                    Más alto que ancho
                  </Label>
                  <Input
                    id="mas-alto-ancho"
                    type="text"
                    value={t(
                      `nodule.isTallerThanWide.${currentNodule.isTallerThanWide}`
                    )}
                    readOnly
                    className="bg-background border-2 font-semibold text-center"
                    placeholder="Calculando..."
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">
                    Más alto que largo
                  </Label>
                  <Input
                    id="mas-alto-largo"
                    type="text"
                    value={t(
                      `nodule.isTallerThanLong.${currentNodule.isTallerThanLong}`
                    )}
                    readOnly
                    className="bg-background border-2 font-semibold text-center"
                    placeholder="Calculando..."
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">
                    ACR TI-RADS
                  </Label>
                  <div className="flex flex-col gap-2">
                    <div
                      className="px-3 py-2 rounded-md border-2 font-bold text-center text-white"
                      style={{
                        backgroundColor: getTiRadsColor(currentNodule.tiRads),
                        borderColor: getTiRadsBorderColor(currentNodule.tiRads),
                      }}
                    >
                      {currentNodule.tiRads}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <Label>Observaciones adicionales</Label>
              <Textarea
                id="observaciones"
                className="min-h-[100px] resize-none"
                value={currentNodule.observations}
                onChange={(e) =>
                  updateNoduleField(
                    currentNoduleId,
                    "observations",
                    e.target.value
                  )
                }
                placeholder="Añadir observaciones clínicas relevantes..."
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
