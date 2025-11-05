import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  FileBarChart,
  FileText,
  Plus,
  Upload,
} from "lucide-react";

export const CustomFooter = () => {
  return (
    <footer className="border-t bg-card p-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex gap-2">
          <Button variant="outline" disabled>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Anterior
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Cargar
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="default" data-tour="generate-report">
            <FileText className="mr-2 h-4 w-4" />
            Generar Informe
          </Button>
          <Button variant="default">
            <FileBarChart className="mr-2 h-4 w-4" />
            Generar Pictograma
          </Button>
          <Button variant="secondary">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo
          </Button>

          <Button variant="outline" data-tour="next-button">
            Siguiente
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </footer>
  );
};
