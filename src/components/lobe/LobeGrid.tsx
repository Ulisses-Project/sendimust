import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LobeTable } from "@/components/lobe/LobeTable";
import { CustomSelect } from "../common/CustomSelect";
import { Textarea } from "../ui/textarea";
import { use } from "react";
import { LanguageContext } from "@/context/LanguageContext";
import { optionsMapper } from "@/lib/utils";
import { LobeContext } from "@/context/LobeContext";
import type {
  GlobalEchogenicity,
  GlobalVascularity,
} from "@/types/lobe/lobe.type";

export const LobeGrid = () => {
  const { getDict } = use(LanguageContext);
  const { thyroidalLobes, updateGlobalField } = use(LobeContext);

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
          <Card withoutBorder className="py-10">
            <CardHeader>
              <CardTitle>Ecogenicidad global</CardTitle>
            </CardHeader>
            <CardContent>
              <CustomSelect
                value={thyroidalLobes.globalEchogenicity}
                options={optionsMapper(getDict("lobe.echogenicity"))}
                onChange={(value) =>
                  updateGlobalField(
                    "globalEchogenicity",
                    value as GlobalEchogenicity
                  )
                }
              />
            </CardContent>
          </Card>

          <Card withoutBorder className="py-10">
            <CardHeader>
              <CardTitle>Vascularización global</CardTitle>
            </CardHeader>
            <CardContent>
              <CustomSelect
                value={thyroidalLobes.globalVascularity}
                options={optionsMapper(getDict("lobe.vascularity"))}
                onChange={(value) =>
                  updateGlobalField(
                    "globalVascularity",
                    value as GlobalVascularity
                  )
                }
              />
            </CardContent>
          </Card>
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
              value={thyroidalLobes.observations}
              onChange={(e) =>
                updateGlobalField("observations", e.target.value)
              }
            />
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};
