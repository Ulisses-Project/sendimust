import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { LymphNodeTable } from "@/components/lobe/LymphNodeTable";

export const LymphNodeTab = () => {
  const [showLymphNode, setShowLymphNode] = useState(false);

  return (
    <TabsContent value="ganglios" className="space-y-6">
      <Card>
        <CardHeader className="flex items-center gap-x-4">
          <CardTitle>Ganglios linfáticos cervicales reseñables</CardTitle>
          <Switch
            id="lymphNodes"
            checked={showLymphNode}
            onCheckedChange={setShowLymphNode}
          />
        </CardHeader>
        <CardContent className="space-y-6">
          {showLymphNode && <LymphNodeTable />}
        </CardContent>
      </Card>
    </TabsContent>
  );
};
