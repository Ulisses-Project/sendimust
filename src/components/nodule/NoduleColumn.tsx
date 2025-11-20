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
import { noduleLanguageMapper } from "@/lib/utils";
import { CustomCheckboxGrid } from "@/components/common/CustomCheckboxGrid";
import { CustomInput } from "@/components/common/CustomInput";
import { useDimensions } from "@/context/DimensionsContext";
import {
  Sortable,
  SortableContent,
  SortableItem,
} from "@/components/ui/sortable";
import { Switch } from "@/components/ui/switch";

export const NoduleColumn = () => {
  const { getDict, t } = use(LanguageContext);

  const { dimensions, setDimensions } = useDimensions();

  const { nodules, updateNoduleField, currentNoduleId } = use(NoduleContext);

  const currentNodule = nodules.find((n) => n.id === currentNoduleId) as Nodule;

  // Generic helper to toggle values in array fields
  const toggleArrayField = (field: keyof Nodule, value: string) => {
    const currentValues = (currentNodule[field] as string[]) || [];
    const updated = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    updateNoduleField(currentNoduleId, field, updated as any);
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
                    options={noduleLanguageMapper(getDict("nodule.lobe"))}
                    value={currentNodule.lobe}
                    onChange={(value) =>
                      updateNoduleField(currentNoduleId, "lobe", value as Lobe)
                    }
                  />
                </div>

                <div className="space-y-2" data-tour="nodule-composicion">
                  <Label>Composición</Label>
                  <CustomSelect
                    options={noduleLanguageMapper(
                      getDict("nodule.composition")
                    )}
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
                  options={noduleLanguageMapper(getDict("nodule.location"))}
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
                    options={noduleLanguageMapper(
                      getDict("nodule.echogenicity")
                    )}
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
                    options={noduleLanguageMapper(getDict("nodule.margin"))}
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
                <div className="flex items-center justify-between">
                  <Label>Extensión extratiroidea</Label>
                  <Switch
                    checked={
                      currentNodule.isExtrathyroidalExtension ===
                      t("nodule.isExtrathyroidalExtension.yes")
                    }
                    onCheckedChange={(value) =>
                      updateNoduleField(
                        currentNoduleId,
                        "isExtrathyroidalExtension",
                        (value
                          ? t("nodule.isExtrathyroidalExtension.yes")
                          : t(
                              "nodule.isExtrathyroidalExtension.no"
                            )) as isExtrathyroidalExtension
                      )
                    }
                  />
                </div>
                {currentNodule.isExtrathyroidalExtension ===
                  t("nodule.isExtrathyroidalExtension.yes") && (
                  <div className="pl-4 space-y-2 border-l-2 border-secondary">
                    <CustomCheckboxGrid
                      className="grid grid-cols-2 gap-2 sm:grid-cols-4"
                      title="Localización de la extensión"
                      options={noduleLanguageMapper(
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
                <div className="flex items-center justify-between">
                  <Label>Puntos ecogénicos</Label>
                  <Switch
                    checked={
                      currentNodule.isCalcification ===
                      (t("nodule.isCalcification.yes") as isCalcification)
                    }
                    onCheckedChange={(value) =>
                      updateNoduleField(
                        currentNoduleId,
                        "isCalcification",
                        (value
                          ? t("nodule.isCalcification.yes")
                          : t("nodule.isCalcification.no")) as isCalcification
                      )
                    }
                  />
                </div>
                {currentNodule.isCalcification ===
                  t("nodule.isCalcification.yes") && (
                  <div className="pl-4 space-y-2 border-l-2 border-secondary">
                    <CustomCheckboxGrid
                      className="space-y-2"
                      title="Tipo de calcificación"
                      options={noduleLanguageMapper(
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
                      options={noduleLanguageMapper(
                        getDict("nodule.vascularity")
                      )}
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
                      options={noduleLanguageMapper(
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
                    value="No"
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
                    value="No"
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
                    <div className="px-3 py-2 rounded-md border-2 font-bold text-center bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-300">
                      TR1
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
