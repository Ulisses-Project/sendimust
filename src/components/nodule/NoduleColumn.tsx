import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { use, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { NoduleContext } from "@/context/NoduleContext";
import type {
  isCalcification,
  isExtrathyroidalExtension,
  Lobe,
  Nodule,
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

  const {
    nodules,
    updateLobe,
    currentNoduleId,
    updateDimension,
    setExtrathyroidalExtension,
    setCalcification,
  } = use(NoduleContext);

  const currentNodule = nodules.find((n) => n.id === currentNoduleId) as Nodule;

  const [location, setLocation] = useState<string[]>([]);

  const [locationExtension, setLocationExtension] = useState<string[]>([]);

  const [calcificationType, setCalcificationType] = useState<string[]>([]);

  const toggleLocation = (option: string) => {
    const current = location;
    const updated = current.includes(option)
      ? current.filter((l) => l !== option)
      : [...current, option];

    setLocation(updated);
  };

  const toggleLocationExtension = (option: string) => {
    const current = locationExtension;
    const updated = current.includes(option)
      ? current.filter((l) => l !== option)
      : [...current, option];
    setLocationExtension(updated);
  };

  const toggleCalcification = (option: string) => {
    const current = calcificationType;
    const updated = current.includes(option)
      ? current.filter((l) => l !== option)
      : [...current, option];

    setCalcificationType(updated);
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
                      updateLobe(currentNoduleId, value as Lobe)
                    }
                  />
                </div>

                <div className="space-y-2" data-tour="nodule-composicion">
                  <Label>Composición</Label>
                  <CustomSelect
                    options={noduleLanguageMapper(
                      getDict("nodule.composition")
                    )}
                    value={nodules[0].composition}
                    onChange={() => {}}
                  />
                </div>
              </div>

              <div className="space-y-3" data-tour="nodule-localizacion">
                <CustomCheckboxGrid
                  className="grid grid-cols-2 gap-2 sm:grid-cols-4"
                  title="Localización en el lóbulo"
                  options={noduleLanguageMapper(getDict("nodule.location"))}
                  currentValues={location}
                  onChange={(value) => toggleLocation(value)}
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
                              value={nodules[0][dimension.id]}
                              placeholder="0"
                              label={dimension.label}
                              onChange={(value) => {
                                updateDimension(1, dimension, value);
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
                    value={nodules[0].echogenicity}
                    onChange={() => {}}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Margen</Label>
                  <CustomSelect
                    options={noduleLanguageMapper(getDict("nodule.margin"))}
                    value={nodules[0].margin}
                    onChange={() => {}}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Extensión extratiroidea</Label>
                  <Switch
                    checked={
                      nodules[0].isExtrathyroidalExtension ===
                      t("nodule.isExtrathyroidalExtension.yes")
                    }
                    onCheckedChange={(value) =>
                      setExtrathyroidalExtension(
                        1,
                        (value
                          ? t("nodule.isExtrathyroidalExtension.yes")
                          : t(
                              "nodule.isExtrathyroidalExtension.no"
                            )) as isExtrathyroidalExtension
                      )
                    }
                  />
                </div>
                {nodules[0].isExtrathyroidalExtension ===
                  t("nodule.isExtrathyroidalExtension.yes") && (
                  <div className="pl-4 space-y-2 border-l-2 border-secondary">
                    <CustomCheckboxGrid
                      className="grid grid-cols-2 gap-2 sm:grid-cols-4"
                      title="Localización de la extensión"
                      options={noduleLanguageMapper(
                        getDict("nodule.extrathyroidalExtensionLocation")
                      )}
                      currentValues={locationExtension}
                      onChange={(value) => toggleLocationExtension(value)}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Puntos ecogénicos</Label>
                  <Switch
                    checked={
                      nodules[0].isCalcification ===
                      (t("nodule.isCalcification.yes") as isCalcification)
                    }
                    onCheckedChange={(value) =>
                      setCalcification(
                        1,
                        (value
                          ? t("nodule.isCalcification.yes")
                          : t("nodule.isCalcification.no")) as isCalcification
                      )
                    }
                  />
                </div>
                {nodules[0].isCalcification ===
                  t("nodule.isCalcification.yes") && (
                  <div className="pl-4 space-y-2 border-l-2 border-secondary">
                    <CustomCheckboxGrid
                      className="space-y-2"
                      title="Tipo de calcificación"
                      options={noduleLanguageMapper(
                        getDict("nodule.calcificationType")
                      )}
                      currentValues={calcificationType}
                      onChange={(value) => toggleCalcification(value)}
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
                      value={nodules[0].vascularity}
                      onChange={() => {}}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Tipo de vascularización</Label>
                    <CustomSelect
                      options={noduleLanguageMapper(
                        getDict("nodule.vascularityType")
                      )}
                      value={nodules[0].vascularityType}
                      onChange={() => {}}
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
                value=""
                // onChange={(e) =>
                //   updateNodule("observaciones", e.target.value)
                // }
                placeholder="Añadir observaciones clínicas relevantes..."
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
