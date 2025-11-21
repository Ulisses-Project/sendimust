import { ChevronLeft, ChevronRight, MapPin, Ruler, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { use, useContext, useState } from "react";
import { NoduleContext } from "@/context/NoduleContext";
import type { Nodule } from "@/types/nodule/nodule.type";
import { useDimensions } from "@/context/DimensionsContext";
import { LanguageContext } from "@/context/LanguageContext";
import { getTiRadsColor } from "@/lib/helpers/tirads";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface NoduleStickyBarProps {
  handlePreviousNodule: (currentNoduleIndex: number) => void;
  handleNextNodule: (currentNoduleIndex: number) => void;
}

export const NoduleStickyBar = ({
  handleNextNodule,
  handlePreviousNodule,
}: NoduleStickyBarProps) => {
  const { nodules, currentNoduleId, removeNodule } = use(NoduleContext);
  const { dimensions } = useDimensions();
  const { t } = useContext(LanguageContext);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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

  const hasLocation = currentNodule.location.length > 0;
  const hasDimensions =
    currentNodule.ap !== "" ||
    currentNodule.cc !== "" ||
    currentNodule.t !== "";
  const hasComposition = currentNodule.composition !== "cannotBeAssessed";

  const handleDelete = (type: "delete" | "biopsy") => {
    removeNodule(currentNoduleId, type);
    setIsDeleteDialogOpen(false);
  };

  return (
    <div
      className="sticky top-0 z-20 border-b bg-background/60 backdrop-blur-xl border-border/40 shadow-sm transition-all duration-200"
      data-tour="nodule-header"
    >
      <div className="px-4 py-3 md:px-6">
        <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 md:gap-6 overflow-x-auto no-scrollbar py-1">
            <Badge
              variant="secondary"
              className="text-sm px-3 py-1 font-semibold shrink-0 bg-primary/10 text-primary hover:bg-primary/15 border-transparent transition-colors"
            >
              Nódulo {currentNoduleId}
            </Badge>

            <div className="flex items-center gap-4 md:gap-6 text-sm whitespace-nowrap">
              {/* Lobe - Always visible as it has a default and is primary */}
              <div className="flex items-center gap-2.5 group">
                <div className="p-1.5 rounded-full bg-muted/50 group-hover:bg-muted transition-colors">
                  <MapPin className="h-3.5 w-3.5 text-primary/80" />
                </div>
                <div className="flex flex-col leading-none gap-0.5">
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Lóbulo
                  </span>
                  <span className="font-medium text-foreground/90">
                    {t(`nodule.lobe.${currentNodule.lobe}`)}
                  </span>
                </div>
              </div>

              {hasLocation && (
                <>
                  <div className="h-6 w-px bg-border/40" />
                  <div className="flex flex-col leading-none gap-0.5">
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Localización
                    </span>
                    <span className="font-medium text-foreground/90">
                      {currentNodule.location
                        .map((loc) => t(`nodule.location.${loc}`))
                        .join(", ")}
                    </span>
                  </div>
                </>
              )}

              {hasDimensions && (
                <>
                  <div className="h-6 w-px bg-border/40" />
                  <div className="flex items-center gap-2.5 group">
                    <div className="p-1.5 rounded-full bg-muted/50 group-hover:bg-muted transition-colors">
                      <Ruler className="h-3.5 w-3.5 text-primary/80" />
                    </div>
                    <div className="flex flex-col leading-none gap-0.5">
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                        Medidas (mm)
                      </span>
                      <span className="font-medium text-foreground/90">
                        {formattedDimensions}
                      </span>
                    </div>
                  </div>
                </>
              )}

              {hasComposition && (
                <>
                  <div className="h-6 w-px bg-border/40" />
                  <div className="flex flex-col leading-none gap-0.5">
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Composición
                    </span>
                    <span className="font-medium text-foreground/90">
                      {t(`nodule.composition.${currentNodule.composition}`)}
                    </span>
                  </div>
                </>
              )}

              <div className="h-6 w-px bg-border/40" />

              {/* TI-RADS */}
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  TI-RADS
                </span>
                <Badge
                  className={cn(
                    "text-white border-0 px-2.5 py-0.5 text-xs font-bold shadow-sm transition-transform hover:scale-105",
                    !currentNodule.tiRads && "bg-muted text-muted-foreground"
                  )}
                  style={
                    currentNodule.tiRads
                      ? {
                          backgroundColor: getTiRadsColor(currentNodule.tiRads),
                        }
                      : undefined
                  }
                >
                  {currentNodule.tiRads || "-"}
                </Badge>
              </div>
            </div>
          </div>

          <div
            className="flex items-center gap-1 shrink-0 pl-2 border-l border-border/40"
            data-tour="nodule-navigation"
          >
            <AlertDialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors mr-1"
                  disabled={nodules.length <= 1}
                  title="Eliminar nódulo"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Eliminar nódulo?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Seleccione una opción para eliminar el nódulo{" "}
                    {currentNoduleId}.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete("biopsy")}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Biopsiar
                  </AlertDialogAction>
                  <AlertDialogAction
                    onClick={() => handleDelete("delete")}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    Eliminar (Error)
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <div className="flex items-center bg-muted/30 rounded-md p-0.5 border border-border/30">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 hover:bg-background hover:shadow-sm transition-all"
                onClick={() => handlePreviousNodule(currentNoduleIndex)}
                disabled={currentNoduleIndex === 0}
                title="Nódulo anterior (Alt + ←)"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 hover:bg-background hover:shadow-sm transition-all"
                onClick={() => handleNextNodule(currentNoduleIndex)}
                disabled={currentNoduleIndex === nodules.length - 1}
                title="Nódulo siguiente (Alt + →)"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
