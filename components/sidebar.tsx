import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ExternalLink, MessageCircleQuestion } from "lucide-react"

interface SidebarProps {
  selectedThemes: string[]
  selectedTypes: string[]
  selectedStatus: string[]
  onThemeChange: (theme: string, checked: boolean) => void
  onTypeChange: (type: string, checked: boolean) => void
  onStatusChange: (status: string, checked: boolean) => void
}

const themes = [
  "Serviço Móvel (SMP)",
  "Banda Larga (SCM)",
  "Radiofrequência",
  "Radiodifusão",
  "Consumidor",
  "Outorga",
  "Satélite",
  "Segurança Cibernética",
]

const types = ["Resolução", "Lei", "Decreto"]
const statusList = ["Vigente", "Revogado"]

export function Sidebar({
  selectedThemes,
  selectedTypes,
  selectedStatus,
  onThemeChange,
  onTypeChange,
  onStatusChange,
}: SidebarProps) {
  return (
    <aside className="w-64 sticky top-16 h-fit max-h-[calc(100vh-5rem)] bg-white border-r border-slate-200 flex flex-col hidden md:flex text-slate-700 rounded-lg ml-2 shadow-sm border overflow-hidden">
      
      {/* MUDANÇA: Padding reduzido de p-3 para p-2.5 e espaço entre seções reduzido para space-y-2 */}
      <div className="p-2.5 space-y-2 flex-1 overflow-y-auto custom-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        
        {/* Seção de Status */}
        <div className="space-y-1">
          <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider pl-1 mb-1">Situação</h3>
          <div className="space-y-0"> {/* Removido espaço extra entre itens */}
            {statusList.map((status) => (
              <div 
                key={status} 
                // MUDANÇA: py-1 (altura menor) e text-[11px] (fonte levemente menor)
                className="flex items-center space-x-2 py-1 px-1.5 rounded-md hover:bg-slate-100 hover:translate-x-1 transition-all duration-200 cursor-pointer group"
                onClick={() => onStatusChange(status, !selectedStatus.includes(status))}
              >
                <Checkbox 
                  id={`status-${status}`} 
                  checked={selectedStatus.includes(status)}
                  onCheckedChange={(checked) => onStatusChange(status, checked as boolean)}
                  className="h-3 w-3 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" // Checkbox menor (w-3)
                />
                <Label 
                  htmlFor={`status-${status}`} 
                  className="text-[11px] font-medium cursor-pointer text-slate-600 group-hover:text-blue-700 transition-colors"
                >
                  {status}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-slate-100 my-1" />

        {/* Seção de Tipos */}
        <div className="space-y-1">
          <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider pl-1 mb-1">Tipo de Documento</h3>
          <div className="space-y-0">
            {types.map((type) => (
              <div 
                key={type} 
                className="flex items-center space-x-2 py-1 px-1.5 rounded-md hover:bg-slate-100 hover:translate-x-1 transition-all duration-200 cursor-pointer group"
                onClick={() => onTypeChange(type, !selectedTypes.includes(type))}
              >
                <Checkbox 
                  id={`type-${type}`} 
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={(checked) => onTypeChange(type, checked as boolean)}
                  className="h-3 w-3 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <Label 
                  htmlFor={`type-${type}`} 
                  className="text-[11px] font-medium cursor-pointer text-slate-600 group-hover:text-blue-700 transition-colors"
                >
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-slate-100 my-1" />

        {/* Seção de Temas */}
        <div className="space-y-1">
          <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider pl-1 mb-1">Assuntos e Temas</h3>
          <div className="space-y-0">
            {themes.map((theme) => (
              <div 
                key={theme} 
                className="flex items-center space-x-2 py-1 px-1.5 rounded-md hover:bg-slate-100 hover:translate-x-1 transition-all duration-200 cursor-pointer group"
                onClick={() => onThemeChange(theme, !selectedThemes.includes(theme))}
              >
                <Checkbox 
                  id={`theme-${theme}`} 
                  checked={selectedThemes.includes(theme)}
                  onCheckedChange={(checked) => onThemeChange(theme, checked as boolean)}
                  className="h-3 w-3 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <Label 
                  htmlFor={`theme-${theme}`} 
                  className="text-[11px] font-medium cursor-pointer text-slate-600 group-hover:text-blue-700 transition-colors leading-tight"
                >
                  {theme}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-slate-100 mt-1 mb-1" />

        {/* Card Fale com a Anatel - Compacto */}
        <div className="pt-0">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-2 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-1.5 mb-1">
              <MessageCircleQuestion className="h-3 w-3 text-blue-600" />
              <h4 className="font-semibold text-[11px] text-blue-950">Fale com a Anatel</h4>
            </div>
            
            <p className="text-[10px] text-slate-600 mb-1.5 leading-tight">
              Dúvidas ou elogios? Fale com a equipe técnica.
            </p>
            
            <a 
              href="https://www.gov.br/anatel/pt-br/canais_atendimento" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] font-bold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 transition-colors"
            >
              Canais de atendimento
              <ExternalLink className="h-2 w-2" />
            </a>
          </div>
        </div>
        
      </div>
    </aside>
  )
}
