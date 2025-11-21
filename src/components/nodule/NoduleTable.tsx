import { NoduleColumn } from "@/components/nodule/NoduleColumn";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { NoduleContext } from "@/context/NoduleContext";
import { use } from "react";
import { NoduleStickyBar } from "@/components/nodule/NoduleStickyBar";
import { isMac } from "@/hooks/useKeyboardShortcuts";

export const NoduleTable = () => {
  const { nodules, currentNoduleId, setCurrentNoduleId, addNodule } =
    use(NoduleContext);

  const goToNextNodule = () => {
    const nextNoduleIndex =
      nodules.findIndex((nodule) => nodule.id === currentNoduleId) + 1 || 0;
    const newCurrentNoduleId = nodules[nextNoduleIndex].id;
    setCurrentNoduleId(newCurrentNoduleId);
  };
  const goToPreviousNodule = () => {
    const previousNoduleIndex =
      nodules.findIndex((nodule) => nodule.id === currentNoduleId) - 1 || 0;

    const newCurrentNoduleId = nodules[previousNoduleIndex].id;

    setCurrentNoduleId(newCurrentNoduleId);
  };

  return (
    <div className="flex flex-col">
      <NoduleStickyBar
        handleNextNodule={goToNextNodule}
        handlePreviousNodule={goToPreviousNodule}
      />

      <NoduleColumn />

      <Button
        onClick={addNodule}
        variant="outline"
        className="w-full bg-transparent"
        size="lg"
        data-tour="add-nodule"
      >
        <Plus className="mr-2 h-4 w-4" />
        Añadir nuevo nódulo
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">{isMac() ? "⌥" : "Alt"} + N</span>
        </kbd>
      </Button>
    </div>
  );
};
