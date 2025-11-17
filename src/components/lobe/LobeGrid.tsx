import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LobeTable } from "@/components/lobe/LobeTable";
import { CustomSelect, type Option } from "../common/CustomSelect";
import { Textarea } from "../ui/textarea";

const globalEchogenicity: Option[] = [
  { value: "homogeneous", label: "Homogénea" },
  { value: "heterogeneous", label: "Heterogénea" },
];

const globalVascularization: Option[] = [
  { value: "not-evaluated", label: "No evaluada" },
  { value: "normal", label: "Normal" },
  { value: "decreased", label: "Disminuida" },
  { value: "increased", label: "Aumentada" },
];

const lobeGridOptions = [
  {
    title: "Ecogenicidad global",
    defaultValue: "homogeneous",
    options: globalEchogenicity,
    //! Descomentar cuando creemos funcionalidad
    // onChange: (value) => console.log(value)
  },

  {
    title: "Vascularización global",
    defaultValue: "not-evaluated",
    options: globalVascularization,
    //! Descomentar cuando creemos funcionalidad
    // onChange: (value) => console.log(value)
  },
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
        <Card withoutBorder className="py-0">
          <CardHeader>
            <CardTitle>Medidas de lóbulos tiroideos</CardTitle>
          </CardHeader>
          <CardContent>
            <LobeTable />
          </CardContent>
        </Card>

        {/* Ecogenicidad y vascularización */}
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {lobeGridOptions.map(
            ({
              title,
              defaultValue,
              options,
              //! Descomentar cuando creemos funcionalidad
              // onChange
            }) => (
              <Card withoutBorder className="py-10">
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CustomSelect
                    defaultValue={defaultValue}
                    options={options}
                    onChange={(value) => console.log(value)}
                  />
                </CardContent>
              </Card>
            )
          )}
        </div>

        {/* Observaciones */}
        <Card withoutBorder className="py-0">
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
