import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LobeTable } from "@/components/lobe/LobeTable";
import { CustomSelect, type Option } from "../common/CustomSelect";
import { Textarea } from "../ui/textarea";

const global_echogenicity: Option[] = [
  { value: "homogeneous", label: "Homogénea" },
  { value: "heterogeneous", label: "Heterogénea" },
];

const global_vascularization: Option[] = [
  { value: "not-evaluated", label: "No evaluada" },
  { value: "normal", label: "Normal" },
  { value: "decreased", label: "Disminuida" },
  { value: "increased", label: "Aumentada" },
];

export const LobeTab = () => {
  return (
    <TabsContent value="lobulos" className="space-y-6">
      <Card data-tour="lobulos-table">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Medidas de lóbulos tiroideos</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <LobeTable />
        </CardContent>
      </Card>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{"Ecogenicidad global"}</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomSelect
              defaultValue="homogeneous"
              options={global_echogenicity}
              onChange={(value) => console.log(value)}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{"Vascularización global"}</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomSelect
              defaultValue="not-evaluated"
              options={global_vascularization}
              onChange={(value) => console.log(value)}
            />
          </CardContent>
        </Card>
      </div>

      {/* Observaciones */}
      <Card>
        <CardHeader>
          <CardTitle>Observaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Ingrese observaciones adicionales..."
            className="min-h-32"
          />
        </CardContent>
      </Card>

      {/*  //! Preguntar a Pablo si queremos mantenerlo

      <Card data-tour="lymph-nodes">
        <CardHeader>
          <CardTitle>Ganglios linfáticos cervicales reseñables</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={hasLymphNodes ? "si" : "no"}
            onValueChange={handleLymphNodesChange}
          >
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="si" id="ganglios-si" />
                <Label htmlFor="ganglios-si">Sí</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="ganglios-no" />
                <Label htmlFor="ganglios-no">No</Label>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card data-tour="nodules">
        <CardHeader>
          <CardTitle>Información sobre nódulos tiroideos</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={"si"}>
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="si" id="nodulos-si" />
                <Label htmlFor="nodulos-si">
                  Sí, hay nódulos que describir
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="nodulos-no" />
                <Label htmlFor="nodulos-no">
                  No, no hay nódulos que describir
                </Label>
              </div>
            </div>
          </RadioGroup>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <Label>Número de nódulos a describir: {noduleCount}</Label>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Minus className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card> */}
    </TabsContent>
  );
};
