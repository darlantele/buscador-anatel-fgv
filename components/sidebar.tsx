import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface SidebarProps {
  selectedThemes: string[]
  selectedTypes: string[]
  selectedStatus: string[]
  onThemeChange: (theme: string, checked: boolean) => void
  onTypeChange: (type: string, checked: boolean) => void
  onStatusChange: (status: string, checked: boolean) => void
}

export function Sidebar({
  selectedThemes,
  selectedTypes,
  selectedStatus,
  onThemeChange,
  onTypeChange,
  onStatusChange,
}: SidebarProps) {
  
  // LISTA DE TEMAS ESTRATÉGICA (Com nomes amigáveis)
  const themes = [
    "Serviço Móvel (SMP)",       // Adicionado
    "Banda Larga (SCM)",         // Adicionado
    "Radiofrequência",
    "Radiodifusão",
    "Consumidor",
    "Outorga",
    "Sanções",
    "Satélite",
    "Interconexão",
    "Segurança Cibernética",
    "Espectro"
  ]

  const types = ["Resolução", "Lei", "Decreto"]
  const statuses = ["Vigente", "Revogado"]

  return (
    <div className="w-64 flex-shrink-0 border-r bg-slate-50/50 hidden md:block h-[calc(100vh-64px)] sticky top-16">
      <ScrollArea className="h-full py-6 px-4">
        <div className="space-y-6">
          
          {/* SEÇÃO 1: SITUAÇÃO */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground/90">Situação</h3>
            <div className="space-y-2">
              {statuses.map((status) => (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox
                    id={`status-${status}`}
                    checked={selectedStatus.includes(status)}
                    onCheckedChange={(checked) => onStatusChange(status, checked as boolean)}
                  />
                  <Label htmlFor={`status-${status}`} className="text-sm font-normal leading-none cursor-pointer">
                    {status}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* SEÇÃO 2: TIPO */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground/90">Tipo de Documento</h3>
            <div className="space-y-2">
              {types.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={selectedTypes.includes(type)}
                    onCheckedChange={(checked) => onTypeChange(type, checked as boolean)}
                  />
                  <Label htmlFor={`type-${type}`} className="text-sm font-normal leading-none cursor-pointer">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* SEÇÃO 3: ASSUNTOS */}
          <Accordion type="single" collapsible defaultValue="themes" className="w-full">
            <AccordionItem value="themes" className="border-none">
              <AccordionTrigger className="py-2 text-sm font-semibold hover:no-underline">
                Assuntos e Temas
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  {themes.map((theme) => (
                    <div key={theme} className="flex items-center space-x-2">
                      <Checkbox
                        id={`theme-${theme}`}
                        checked={selectedThemes.includes(theme)}
                        onCheckedChange={(checked) => onThemeChange(theme, checked as boolean)}
                      />
                      <Label htmlFor={`theme-${theme}`} className="text-sm font-normal leading-none cursor-pointer">
                        {theme}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        </div>
      </ScrollArea>
    </div>
  )
}