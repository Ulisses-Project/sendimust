import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { CustomHeader } from "@/components/common/CustomHeader";
import { CustomFooter } from "@/components/common/CustomFooter";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { LobeTab } from "./components/lobe/LobeTab";
import { LymphNodeTab } from "./components/lobe/LymphNodeTab";

function App() {
  const [activeTab, setActiveTab] = useState("lobulos");

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <CustomHeader />
        <div className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-7xl">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-6"
              data-tour="tabs"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="lobulos">
                  Información sobre lóbulos tiroideos
                </TabsTrigger>
                <TabsTrigger value="ganglios">
                  Ganglios linfáticos cervicales reseñables
                </TabsTrigger>
              </TabsList>
              <LobeTab />
              <LymphNodeTab />
            </Tabs>
          </div>
        </div>
        <CustomFooter />
      </ThemeProvider>
    </>
  );
}

export default App;
