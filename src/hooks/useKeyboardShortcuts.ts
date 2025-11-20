import { useEffect, useContext } from "react";
import { NoduleContext } from "@/context/NoduleContext";

/**
 * Hook personalizado para manejar atajos de teclado globales
 * Detecta automáticamente si el usuario está en Mac (Cmd) o Windows/Linux (Ctrl)
 */
export const useKeyboardShortcuts = () => {
  const {
    nodules,
    currentNoduleId,
    setCurrentNoduleId,
    addNodule,
    removeNodule,
  } = useContext(NoduleContext);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isCmdOrCtrl = event.metaKey || event.ctrlKey;

      // Crear nuevo nódulo: Permitir tanto Alt + N como Cmd/Ctrl + N
      if (isCmdOrCtrl && (event.key === "n" || event.key === "N")) {
        event.preventDefault();
        addNodule();
        return;
      }

      // Solo continuar si se presiona Cmd/Ctrl para navegación
      if (!isCmdOrCtrl) return;

      // Cmd/Ctrl + Left Arrow: Nódulo anterior
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        const currentIndex = nodules.findIndex((n) => n.id === currentNoduleId);
        if (currentIndex > 0) {
          setCurrentNoduleId(nodules[currentIndex - 1].id);
        }
        return;
      }

      // Cmd/Ctrl + Right Arrow: Nódulo siguiente
      if (event.key === "ArrowRight") {
        event.preventDefault();
        const currentIndex = nodules.findIndex((n) => n.id === currentNoduleId);
        if (currentIndex < nodules.length - 1) {
          setCurrentNoduleId(nodules[currentIndex + 1].id);
        }
        return;
      }

      // Cmd/Ctrl + Backspace/Delete: Eliminar nódulo actual
      if (event.key === "Backspace" || event.key === "Delete") {
        event.preventDefault();
        if (nodules.length > 1) {
          removeNodule(currentNoduleId, "delete");
        }
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nodules, currentNoduleId, setCurrentNoduleId, addNodule]);
};
