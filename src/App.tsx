import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { CustomHeader } from "@/components/common/CustomHeader";
import { CustomFooter } from "@/components/common/CustomFooter";
import { LobeGrid } from "./components/lobe/LobeGrid";

import { CustomSwitchCard } from "./components/common/CustomSwitchCard";
import { LymphNodeTable } from "./components/lymph/LymphNodeTable";
import { useState } from "react";
import { NoduleTable } from "./components/nodule/NoduleTable";
import { NoduleProvider } from "./context/NoduleContext";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  const [showLymphNode, setShowLymphNode] = useState(false);
  const [showNodule, setshowNodule] = useState(false);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <LanguageProvider>
          <NoduleProvider>
            <div className="flex h-screen flex-col">
              <CustomHeader />
              <div className="flex-1 overflow-auto p-6">
                <div className="mx-auto max-w-7xl space-y-6">
                  <LobeGrid />

                  {/*Lymph Nodes */}
                  <CustomSwitchCard
                    title="Ganglios linfáticos cervicales reseñables"
                    id="lymphNodes"
                    checked={showLymphNode}
                    handleCheckedChange={setShowLymphNode}
                  >
                    <LymphNodeTable />
                  </CustomSwitchCard>

                  {/*Nodules */}
                  <CustomSwitchCard
                    title="Nódulos tiroideos reseñables"
                    id="Nodule"
                    checked={showNodule}
                    handleCheckedChange={setshowNodule}
                  >
                    <NoduleTable />
                  </CustomSwitchCard>
                </div>
              </div>
              <CustomFooter />
            </div>
          </NoduleProvider>
        </LanguageProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
