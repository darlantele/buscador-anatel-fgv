import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CalendarDays, FileText, ExternalLink, Star, Info } from "lucide-react"

interface Regulation {
  id: string
  number: string
  title: string
  description: string
  type: string
  status: string
  theme: string
  date: string
  url: string
  tags?: string // Adicionei opcional para evitar erro se faltar
}

interface RegulationCardProps {
  regulation: Regulation
}

export function RegulationCard({ regulation }: RegulationCardProps) {
  // --- LÓGICA DO MOCKUP DE AVALIAÇÃO ---
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const handleSubmitReview = () => {
    if (rating === 0) return
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setShowFeedback(true)
    }, 1000)
  }

  // Resetar ao fechar a janela (opcional, simples)
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setTimeout(() => {
        setRating(0)
        setComment("")
        setShowFeedback(false)
      }, 300)
    }
  }

  // --- LÓGICA VISUAL DO CARD ---
  const statusLower = regulation.status.toLowerCase()
  let badgeVariant: "default" | "destructive" | "secondary" | "outline" = "default"
  let badgeColorClass = "bg-green-600 hover:bg-green-700"

  if (statusLower.includes("revoga")) {
    badgeVariant = "destructive"
    badgeColorClass = "bg-red-500 hover:bg-red-600"
  } else if (statusLower.includes("substitu")) {
    badgeVariant = "secondary"
    badgeColorClass = "bg-amber-500 hover:bg-amber-600 text-white"
  }

  return (
    <Sheet onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        {/* O CARD AGORA É UM BOTÃO QUE ABRE A JANELA */}
        <div className="block h-full group cursor-pointer">
          <Card className="h-full transition-all hover:shadow-lg hover:border-blue-500/40 hover:-translate-y-1 relative overflow-hidden flex flex-col">
            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="w-3 h-3 text-blue-500" />
            </div>

            <CardHeader className="p-4 pb-2">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1 w-full">
                  <CardTitle className="text-sm font-bold leading-snug text-blue-950 group-hover:text-blue-700 transition-colors line-clamp-2 text-left">
                    {regulation.title}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground font-medium text-left">
                    {regulation.number}
                  </p>
                </div>
                <Badge className={`${badgeColorClass} shrink-0 text-[10px] px-1.5 h-5`} variant={badgeVariant}>
                  {regulation.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="p-4 pt-2 flex-1 flex flex-col">
              <p className="mb-3 text-xs text-muted-foreground line-clamp-3 leading-relaxed flex-1 text-left">
                {regulation.description}
              </p>
              
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground mt-auto">
                <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-full">
                  <FileText className="h-3 w-3" />
                  <span>{regulation.type}</span>
                </div>
                <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-full">
                  <CalendarDays className="h-3 w-3" />
                  <span>{regulation.date}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetTrigger>

      {/* --- CONTEÚDO DA JANELA QUE VAI ABRIR --- */}
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader className="mb-6 space-y-4">
          <div className="flex items-center gap-2">
            <Badge className={`${badgeColorClass} uppercase`}>
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

          <div className="pt-4 pb-2">
            <Button className="w-full bg-blue-700 hover:bg-blue-800" size="lg" asChild>
              <a href={regulation.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Acessar Documento Original (PDF)
              </a>
            </Button>
          </div>

          {/* --- AVALIAÇÃO MOCKUP --- */}
          <div className="border-t border-slate-200 pt-6 mt-6">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              Avalie este documento
              <span className="text-[10px] font-normal text-slate-400 border border-slate-200 px-1.5 rounded">BETA</span>
            </h3>

            {!showFeedback ? (
              <div className="space-y-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
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

                <Textarea 
                  placeholder="Deixe um comentário sobre a relevância deste regulamento..." 
                  className="bg-white resize-none text-sm"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

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
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-full shrink-0">
                    <Info className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-blue-900">Funcionalidade em desenvolvimento</h4>
                    <p className="text-xs text-blue-700 leading-relaxed">
                      O recurso de avaliações está sendo implementado e em breve estará disponível para usuários logados.
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
