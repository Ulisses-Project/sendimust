import { useEffect, useContext } from "react";
import { NoduleContext } from "@/context/NoduleContext";

/**
 * Hook personalizado para manejar atajos de teclado globales
 * Usa Alt (Option en Mac) para evitar conflictos con el navegador
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
      const isAlt = event.altKey;

      // Crear nuevo nódulo: Alt + N
      // Usamos event.code "KeyN" porque en Mac Option+N genera caracteres especiales (˜)
      if (isAlt && event.code === "KeyN") {
        event.preventDefault();
        addNodule();
        return;
      }

      // Solo continuar si se presiona Alt para navegación
      if (!isAlt) return;

      // Alt + Left Arrow: Nódulo anterior
      if (event.code === "ArrowLeft") {
        event.preventDefault();
        const currentIndex = nodules.findIndex((n) => n.id === currentNoduleId);
        if (currentIndex > 0) {
          setCurrentNoduleId(nodules[currentIndex - 1].id);
        }
        return;
      }

      // Alt + Right Arrow: Nódulo siguiente
      if (event.code === "ArrowRight") {
        event.preventDefault();
        const currentIndex = nodules.findIndex((n) => n.id === currentNoduleId);
        if (currentIndex < nodules.length - 1) {
          setCurrentNoduleId(nodules[currentIndex + 1].id);
        }
        return;
      }

      // Alt + Backspace/Delete: Eliminar nódulo actual
      if (event.code === "Backspace" || event.code === "Delete") {
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

export const isMac = () => {
  return (
    typeof window !== "undefined" &&
    navigator.platform.toUpperCase().indexOf("MAC") >= 0
  );
};
