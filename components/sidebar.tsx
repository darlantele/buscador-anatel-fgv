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
    // MUDANÇAS PARA "ESTICAR":
    // 1. 'top-16': Diminuí o espaço do topo (ficou mais perto do cabeçalho).
    // 2. 'max-h-[calc(100vh-5rem)]': Aumentei a altura máxima (vai mais perto do chão).
    <aside className="w-64 sticky top-18 h-fit max-h-[calc(100vh-5rem)] bg-white border-r border-slate-200 flex flex-col hidden md:flex text-slate-700 rounded-lg ml-2 shadow-sm border overflow-hidden">
      
      {/* Scrollbar invisível mantida */}
      <div className="p-3 space-y-4 flex-1 overflow-y-auto custom-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        
        {/* Seção de Status */}
        <div className="space-y-2">
          <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider">Situação</h3>
          <div className="space-y-1">
            {statusList.map((status) => (
              <div key={status} className="flex items-center space-x-2">
                <Checkbox 
                  id={`status-${status}`} 
                  checked={selectedStatus.includes(status)}
                  onCheckedChange={(checked) => onStatusChange(status, checked as boolean)}
                  className="h-3.5 w-3.5"
                />
                <Label htmlFor={`status-${status}`} className="text-xs font-medium cursor-pointer">
                  {status}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-slate-100" />

        {/* Seção de Tipos */}
        <div className="space-y-2">
          <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider">Tipo de Documento</h3>
          <div className="space-y-1">
            {types.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox 
                  id={`type-${type}`} 
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={(checked) => onTypeChange(type, checked as boolean)}
                  className="h-3.5 w-3.5"
                />
                <Label htmlFor={`type-${type}`} className="text-xs font-medium cursor-pointer">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-slate-100" />

        {/* Seção de Temas */}
        <div className="space-y-2">
          <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider">Assuntos e Temas</h3>
          <div className="space-y-1">
            {themes.map((theme) => (
              <div key={theme} className="flex items-center space-x-2">
                <Checkbox 
                  id={`theme-${theme}`} 
                  checked={selectedThemes.includes(theme)}
                  onCheckedChange={(checked) => onThemeChange(theme, checked as boolean)}
                  className="h-3.5 w-3.5"
                />
                <Label htmlFor={`theme-${theme}`} className="text-xs font-medium cursor-pointer leading-tight">
                  {theme}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-slate-100 mt-2" />

        {/* Card Fale com a Anatel */}
        <div className="pt-1">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 shadow-sm">
            <div className="flex items-center gap-1.5 mb-1.5">
              <MessageCircleQuestion className="h-3.5 w-3.5 text-blue-600" />
              <h4 className="font-semibold text-xs text-blue-950">Fale com a Anatel</h4>
            </div>
            
            <p className="text-[10px] text-slate-600 mb-2 leading-tight">
              Dúvidas ou elogios? Fale com a equipe técnica.
            </p>
            
            <a 
              href="https://www.gov.br/anatel/pt-br/canais_atendimento" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] font-bold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
            >
              Canais de atendimento
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
          </div>
        </div>
        
      </div>
    </aside>
  )
}