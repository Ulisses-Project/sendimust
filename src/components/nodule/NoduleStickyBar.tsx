import { ChevronLeft, ChevronRight, MapPin, Ruler } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { use, useContext } from "react";
import { NoduleContext } from "@/context/NoduleContext";
import type { Nodule } from "@/types/nodule/nodule.type";
import { useDimensions } from "@/context/DimensionsContext";
import { LanguageContext } from "@/context/LanguageContext";

interface NoduleStickyBarProps {
  handlePreviousNodule: (currentNoduleIndex: number) => void;
  handleNextNodule: (currentNoduleIndex: number) => void;
}

export const NoduleStickyBar = ({
  handleNextNodule,
  handlePreviousNodule,
}: NoduleStickyBarProps) => {
  const { nodules, currentNoduleId } = use(NoduleContext);
  const { dimensions } = useDimensions();
  const { t } = useContext(LanguageContext);

  const currentNoduleIndex = nodules.findIndex(
    (nodule) => nodule.id === currentNoduleId
  );

  const currentNodule = nodules.find(
    (nodule) => nodule.id === currentNoduleId
  ) as Nodule;

  // Helper to format dimensions based on context order
  const formattedDimensions = dimensions
    .map((dim) => currentNodule[dim.id])
    .join(" x ");

  return (
    <div
      className="sticky top-0 z-10 border-b bg-linear-to-r from-primary/5 via-primary/10 to-primary/5 backdrop-blur-sm shadow-sm"
      data-tour="nodule-header"
    >
      <div className="px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
            <Badge className="text-base px-3 py-1.5 font-semibold shrink-0">
              Nódulo {currentNoduleId}
            </Badge>

            <div className="flex items-center gap-4 text-sm whitespace-nowrap">
              {/* Lobe */}
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                    Lóbulo
                  </span>
                  <span className="font-medium">
                    {t(`nodule.lobe.${currentNodule.lobe}`)}
                  </span>
                </div>
              </div>

              <div className="h-8 w-px bg-border/60" />

              {/* Location */}
              <div className="flex flex-col leading-none">
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                  Localización
                </span>
                <span className="font-medium">
                  {currentNodule.location
                    .map((loc) => t(`nodule.location.${loc}`))
                    .join(", ")}
                </span>
              </div>

              <div className="h-8 w-px bg-border/60" />

              {/* Dimensions */}
              <div className="flex items-center gap-2">
                <Ruler className="h-4 w-4 text-primary" />
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                    Medidas (mm)
                  </span>
                  <span className="font-medium font-mono">
                    {formattedDimensions}
                  </span>
                </div>
              </div>

              <div className="h-8 w-px bg-border/60" />

              {/* Composition */}
              <div className="flex flex-col leading-none">
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                  Composición
                </span>
                <span className="font-medium">
                  {t(`nodule.composition.${currentNodule.composition}`)}
                </span>
              </div>

              <div className="h-8 w-px bg-border/60" />

              {/* TI-RADS */}
              <div className="flex items-center gap-2">
                <span className="font-medium">TI-RADS:</span>
                <Badge className="bg-amber-500 hover:bg-amber-600">TR1</Badge>
              </div>
            </div>
          </div>

          <div
            className="flex items-center gap-2 shrink-0"
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
