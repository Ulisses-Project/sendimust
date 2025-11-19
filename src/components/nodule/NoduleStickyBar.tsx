import { ChevronLeft, ChevronRight, MapPin, Ruler } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { use } from "react";
import { NoduleContext } from "@/context/NoduleContext";
import type { Nodule } from "@/types/nodule/nodule.type";

interface NoduleStickyBarProps {
  handlePreviousNodule: (currentNoduleIndex: number) => void;
  handleNextNodule: (currentNoduleIndex: number) => void;
}

export const NoduleStickyBar = ({
  handleNextNodule,
  handlePreviousNodule,
}: NoduleStickyBarProps) => {
  const { nodules, currentNoduleId } = use(NoduleContext);

  const currentNoduleIndex = nodules.findIndex(
    (nodule) => nodule.id === currentNoduleId
  );

  const currentNodule = nodules.find(
    (nodule) => nodule.id === currentNoduleId
  ) as Nodule;

  return (
    <div
      className="sticky top-0 z-10 border-b bg-linear-to-r from-primary/5 via-primary/10 to-primary/5 backdrop-blur-sm shadow-sm"
      data-tour="nodule-header"
    >
      <div className="px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Badge className="text-base px-3 py-1.5 font-semibold">
              Nódulo {currentNoduleId}
            </Badge>

            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-medium">Lóbulo:</span>
                <span className="text-muted-foreground">
                  {currentNodule.lobe}
                </span>
              </div>

              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-1.5">
                <span className="font-medium">Localización:</span>
                <span className="text-muted-foreground">
                  {currentNodule.location.toString()}
                </span>
              </div>

              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-1.5">
                <Ruler className="h-4 w-4 text-primary" />
                <span className="font-medium">Medidas (mm):</span>
                <span className="text-muted-foreground">
                  {currentNodule.ap +
                    "," +
                    currentNodule.cc +
                    "," +
                    currentNodule.t}
                </span>
              </div>

              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-1.5">
                <span className="font-medium">Composición:</span>
                <Badge className="text-xs capitalize">
                  {currentNodule.composition}
                </Badge>
              </div>

              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-1.5">
                <span className="font-medium">TI-RADS:</span>
                <Badge className="bg-amber-500">TR1</Badge>
              </div>
            </div>
          </div>

          <div
            className="flex items-center gap-2"
            data-tour="nodule-navigation"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePreviousNodule(currentNoduleIndex)}
              disabled={currentNoduleIndex === 0}
              title="Nódulo anterior (Ctrl + ←)"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleNextNodule(currentNoduleIndex)}
              disabled={currentNoduleIndex === nodules.length - 1}
              title="Nódulo siguiente (Ctrl + →)"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
