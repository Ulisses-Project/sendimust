import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { CustomHeader } from "@/components/common/CustomHeader";
import { CustomFooter } from "@/components/common/CustomFooter";
import { LobeGrid } from "./components/lobe/LobeGrid";
import { LymphNodeGrid } from "./components/lymph/LymphNodeGrid";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-screen flex flex-col">
          <CustomHeader />
          <div className="flex-1 overflow-auto p-6">
            <div className="mx-auto max-w-7xl space-y-6">
              <LobeGrid />
              <LymphNodeGrid />
            </div>
          </div>
          <CustomFooter />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
