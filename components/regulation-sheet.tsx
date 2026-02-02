import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CalendarDays, FileText, ExternalLink, Star, Info } from "lucide-react"
import { useState } from "react"

interface Regulation {
  id: string
  number: string
  title: string
  description: string
  type: string
  status: string
  theme: string
  tags: string
  date: string
  url: string
}

interface RegulationSheetProps {
  regulation: Regulation | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RegulationSheet({ regulation, open, onOpenChange }: RegulationSheetProps) {
  // Estados para controlar o Mockup de Avaliação
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  if (!regulation) return null

  // Lógica do Mockup de Envio
  const handleSubmitReview = () => {
    if (rating === 0) return // Não envia sem nota

    setIsSubmitting(true)
    
    // Simula um tempo de processamento de 1 segundo
    setTimeout(() => {
      setIsSubmitting(false)
      setShowFeedback(true)
      // Limpa a mensagem após 6 segundos (opcional)
      // setTimeout(() => setShowFeedback(false), 6000) 
    }, 1000)
  }

  // Reseta os estados quando fecha a janela
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setTimeout(() => {
        setRating(0)
        setComment("")
        setShowFeedback(false)
      }, 300)
    }
    onOpenChange(open)
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader className="mb-6 space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant={regulation.status.toLowerCase() === "vigente" ? "default" : "destructive"} className="uppercase">
              {regulation.status}
            </Badge>
            <span className="text-sm text-muted-foreground capitalize flex items-center gap-1">
              <FileText className="h-3 w-3" />
              {regulation.type}
            </span>
          </div>
          
          <SheetTitle className="text-xl leading-snug text-blue-950">
            {regulation.title}
          </SheetTitle>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground border-b border-slate-100 pb-4">
             <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                Publicado em: {regulation.date}
             </div>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">Ementa / Descrição</h3>
            <SheetDescription className="text-slate-700 text-base leading-relaxed">
              {regulation.description}
            </SheetDescription>
          </div>

          <div>
             <h3 className="font-semibold text-slate-900 mb-2">Palavras-chave</h3>
             <div className="flex flex-wrap gap-2">
                {regulation.tags.split(',').map((tag, i) => (
                  <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md border border-slate-200">
                    {tag.trim()}
                  </span>
                ))}
             </div>
          </div>

          <div className="pt-4 pb-2">
            <Button className="w-full bg-blue-700 hover:bg-blue-800" size="lg" asChild>
              <a href={regulation.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Acessar Documento Original
              </a>
            </Button>
          </div>

          {/* --- SEÇÃO DE AVALIAÇÃO (MOCKUP) --- */}
          <div className="border-t border-slate-200 pt-6 mt-6">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              Avalie este documento
              <span className="text-[10px] font-normal text-slate-400 border border-slate-200 px-1.5 rounded">BETA</span>
            </h3>

            {!showFeedback ? (
              <div className="space-y-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
                {/* Estrelas */}
                <div className="flex flex-col items-center gap-2 mb-2">
                   <div className="flex gap-1">
                     {[1, 2, 3, 4, 5].map((star) => (
                       <button
                         key={star}
                         type="button"
                         className="focus:outline-none transition-transform hover:scale-110"
                         onMouseEnter={() => setHoverRating(star)}
                         onMouseLeave={() => setHoverRating(0)}
                         onClick={() => setRating(star)}
                       >
                         <Star 
                           className={`h-8 w-8 transition-colors ${
                             star <= (hoverRating || rating) 
                               ? "fill-yellow-400 text-yellow-400" 
                               : "text-slate-300"
                           }`} 
                         />
                       </button>
                     ))}
                   </div>
                   <span className="text-xs font-medium text-slate-500">
                     {rating > 0 ? ["Péssimo", "Ruim", "Regular", "Bom", "Excelente"][rating - 1] : "Selecione uma nota"}
                   </span>
                </div>

                {/* Campo de Comentário */}
                <div className="space-y-2">
                  <Textarea 
                    placeholder="Deixe um comentário sobre a relevância deste regulamento..." 
                    className="bg-white resize-none text-sm"
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>

                {/* Botão de Envio */}
                <Button 
                  variant="outline" 
                  className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800"
                  disabled={rating === 0 || isSubmitting}
                  onClick={handleSubmitReview}
                >
                  {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
                </Button>
              </div>
            ) : (
              /* --- MENSAGEM DE FEEDBACK (TOAST ESTÁTICO) --- */
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-full shrink-0">
                    <Info className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-blue-900">Funcionalidade em desenvolvimento</h4>
                    <p className="text-xs text-blue-700 leading-relaxed">
                      O recurso de avaliações e comentários está em processo de implementação e, em breve, estará disponível apenas para usuários logados.
                    </p>
                    <p className="text-[10px] text-blue-500 mt-2 font-medium">
                      Obrigado por testar nossa versão Beta!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </SheetContent>
    </Sheet>
  )
}
