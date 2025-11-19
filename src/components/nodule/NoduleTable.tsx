import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { use, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { NoduleContext } from "@/context/NoduleContext";
import type { Lobe } from "@/types/nodule/nodule.type";
import { CustomSelect } from "../common/CustomSelect";
import { LanguageContext } from "@/context/LanguageContext";
import { noduleLanguageMapper } from "@/lib/utils";
import { CustomCheckboxGrid } from "../common/CustomCheckboxGrid";

const calcificationOptions = [
  { value: "microcalcificaciones", label: "Microcalcificaciones" },
  {
    value: "macrocalcificaciones-intranodulares",
    label: "Macrocalcificaciones intranodulares",
  },
  {
    value: "macrocalcificaciones-perifericas-finas-regulares",
    label: "Macrocalcificaciones periféricas finas y regulares",
  },
  {
    value: "macrocalcificaciones-perifericas-irregulares",
    label: "Macrocalcificaciones periféricas irregulares",
  },
  {
    value: "macrocalcificaciones-perifericas-interrumpidas",
    label: "Macrocalcificaciones periféricas interrumpidas",
  },
];

export const NoduleTable = () => {
  const { getDict } = use(LanguageContext);

  const { nodules, updateLobe } = use(NoduleContext);

  const [location, setLocation] = useState<string[]>([]);

  const [locationExtension, setLocationExtension] = useState<string[]>([]);

  const [calcification, setCalcification] = useState<string[]>([]);

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
    const current = calcification;
    const updated = current.includes(option)
      ? current.filter((l) => l !== option)
      : [...current, option];
    setCalcification(updated);
  };

  return (
    <div className="flex h-screen flex-col">
      {/* <NoduleStickyBar /> */}

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
                    <Label htmlFor="lobulo">Lóbulo</Label>
                    <CustomSelect
                      options={noduleLanguageMapper(getDict("nodule.lobe"))}
                      defaultValue={nodules[0].lobe}
                      onChange={(value) => updateLobe(1, value as Lobe)}
                    />
                  </div>

                  <div className="space-y-2" data-tour="nodule-composicion">
                    <Label htmlFor="composicion">Composición</Label>
                    <CustomSelect
                      options={noduleLanguageMapper(
                        getDict("nodule.composition")
                      )}
                      defaultValue={nodules[0].composition}
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
                  <Label>Medidas (mm)</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="ap"
                        className="text-xs text-muted-foreground"
                      >
                        AP
                      </Label>
                      <Input
                        id="ap"
                        type="number"
                        value={6}
                        // onChange={(e) => updateNodule("ap", e.target.value)}
                        placeholder="0"
                        className="text-center text-lg font-semibold"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="t"
                        className="text-xs text-muted-foreground"
                      >
                        T
                      </Label>
                      <Input
                        id="t"
                        type="number"
                        value={8}
                        // onChange={(e) => updateNodule("t", e.target.value)}
                        placeholder="0"
                        className="text-center text-lg font-semibold"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="cc"
                        className="text-xs text-muted-foreground"
                      >
                        CC
                      </Label>
                      <Input
                        id="cc"
                        type="number"
                        value={10}
                        // onChange={(e) => updateNodule("cc", e.target.value)}
                        placeholder="0"
                        className="text-center text-lg font-semibold"
                      />
                    </div>
                  </div>
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
                    <Label htmlFor="ecogenicidad">Ecogenicidad</Label>
                    <CustomSelect
                      options={noduleLanguageMapper(
                        getDict("nodule.echogenicity")
                      )}
                      defaultValue={nodules[0].echogenicity}
                      onChange={() => {}}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="margen">Margen</Label>
                    <CustomSelect
                      options={noduleLanguageMapper(getDict("nodule.margin"))}
                      defaultValue={nodules[0].margin}
                      onChange={() => {}}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="extension-extratiroidea">
                      Extensión extratiroidea
                    </Label>
                    <Select
                      value="no"
                      // onValueChange={(value) =>
                      //   updateNodule("extensionExtratiroidea", value)
                      // }
                    >
                      <SelectTrigger
                        id="extension-extratiroidea"
                        className="w-32"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="si">Sí</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

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
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="extension-extratiroidea">
                      Puntos ecogénicos
                    </Label>
                    <Select
                      value="no"
                      // onValueChange={(value) =>
                      //   updateNodule("puntosEcogenicos", value)
                      // }
                    >
                      <SelectTrigger id="puntos-ecogenicos" className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">
                          No/Artefactos de reverberación
                        </SelectItem>
                        <SelectItem value="si">Sí</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pl-4 space-y-2 border-l-2 border-secondary">
                    <CustomCheckboxGrid
                      className="space-y-2"
                      title="Tipo de calcificación"
                      options={noduleLanguageMapper(
                        getDict("nodule.calcificationType")
                      )}
                      currentValues={calcification}
                      onChange={(value) => toggleCalcification(value)}
                    />
                  </div>
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
                      <Label htmlFor="vascularizacion">Vascularización</Label>
                      <CustomSelect
                        options={noduleLanguageMapper(
                          getDict("nodule.vascularity")
                        )}
                        defaultValue={nodules[0].vascularity}
                        onChange={() => {}}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tipo-vascularizacion">
                        Tipo de vascularización
                      </Label>
                      <CustomSelect
                        options={noduleLanguageMapper(
                          getDict("nodule.vascularityType")
                        )}
                        defaultValue={nodules[0].vascularityType}
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
                    <Label
                      htmlFor="mas-alto-ancho"
                      className="text-sm text-muted-foreground"
                    >
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
                    <Label
                      htmlFor="mas-alto-largo"
                      className="text-sm text-muted-foreground"
                    >
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
                    <Label
                      htmlFor="tirads"
                      className="text-sm text-muted-foreground"
                    >
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
                <Label htmlFor="observaciones">Observaciones adicionales</Label>
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

          <Button
            // onClick={addNodule}
            variant="outline"
            className="w-full bg-transparent"
            size="lg"
            data-tour="add-nodule"
          >
            <Plus className="mr-2 h-4 w-4" />
            Añadir nuevo nódulo
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">Ctrl+N</span>
            </kbd>
          </Button>
        </div>
      </div>
    </div>
  );
};
