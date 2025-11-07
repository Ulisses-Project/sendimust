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

export const LobeGrid = () => {
  return (
    <Card data-tour="lobulos-table">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="h-8 w-1 bg-primary rounded-full" />
          <h3 className="text-lg font-semibold text-primary">
            Lóbulos tiroideos
          </h3>
        </div>
      </CardHeader>

      <CardContent>
        <Card withoutBorder>
          <CardHeader>
            <CardTitle>Medidas de lóbulos tiroideos</CardTitle>
          </CardHeader>
          <CardContent>
            <LobeTable />
          </CardContent>
        </Card>

        {/* //!Refactorizar a un componente Ecogenicidad y vascularización global */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
          <Card withoutBorder>
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
          <Card withoutBorder>
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
        <Card withoutBorder>
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
      </CardContent>
    </Card>
  );
};
