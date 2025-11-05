import { ModeToggle } from "@/components/theme/ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Globe, HelpCircle, Keyboard, Settings } from "lucide-react";
import { useState } from "react";

export const CustomHeader = () => {
  const [idioma, setIdioma] = useState("Español");

  return (
    <header className="border-b bg-card">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <img
            src="/logos/sendimust.svg"
            alt="SENDIMUST"
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <h1 className="text-xl font-semibold text-foreground">SENDIMUST</h1>
        </div>

        <nav className="flex items-center gap-2">
          <ModeToggle />

          {/* Traducciones */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Globe className="mr-2 h-4 w-4" />
                {idioma}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setIdioma("Español")}>
                Español
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIdioma("English")}>
                English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Configuración */}
          <Button variant="ghost" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Configuración
          </Button>

          {/* Atajos */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" data-tour="shortcuts-menu">
                <Keyboard className="mr-2 h-4 w-4" />
                Atajos
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-2">
                <h3 className="mb-2 font-semibold text-sm">
                  Atajos de teclado
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Invertir orden de T y CC
                    </span>
                    <kbd className="rounded bg-muted px-2 py-1 text-xs font-mono">
                      Ctrl + I
                    </kbd>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Ayuda */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" data-tour="help-menu">
                <HelpCircle className="mr-2 h-4 w-4" />
                Ayuda
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Ver tour de nuevo</DropdownMenuItem>
              <DropdownMenuItem>Documentación</DropdownMenuItem>
              <DropdownMenuItem>Soporte</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
};
