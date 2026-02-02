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
import { CalendarDays, FileText, ExternalLink } from "lucide-react" // Removi Star e Info para garantir
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
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [showFeedback, setShowFeedback] = useState(false)

  if (!regulation) return null

  const handleSubmit = () => {
     setShowFeedback(true)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader className="mb-6 space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant={regulation.status.toLowerCase() === "vigente" ? "default" : "destructive"}>
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
        </SheetHeader>

        <div className="space-y-6">
          <SheetDescription className="text-slate-700 text-base">
            {regulation.description}
          </SheetDescription>

          <Button className="w-full bg-blue-700 hover:bg-blue-800" asChild>
            <a href={regulation.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Acessar Documento Original
            </a>
          </Button>

          {/* ÁREA DE AVALIAÇÃO SIMPLIFICADA */}
          <div className="border-t pt-6 mt-6 bg-slate-50 p-4 rounded-lg">
            <h3 className="font-bold text-slate-900 mb-3">Avaliação (Mockup)</h3>
            
            {!showFeedback ? (
              <div className="space-y-3">
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button 
                      key={num} 
                      onClick={() => setRating(num)}
                      className={`h-8 w-8 rounded-full border ${rating >= num ? 'bg-yellow-400 border-yellow-500' : 'bg-white border-slate-300'}`}
                    >
                      {/* Estrela feita com caractere simples para evitar erro de ícone */}
                      ★ 
                    </button>
                  ))}
                </div>
                <Textarea 
                  placeholder="Deixe seu comentário..." 
                  className="bg-white"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button onClick={handleSubmit} variant="outline" className="w-full">
                  Enviar Avaliação
                </Button>
              </div>
            ) : (
              <div className="p-3 bg-blue-100 text-blue-800 rounded text-sm border border-blue-200">
                <strong>Funcionalidade em desenvolvimento:</strong><br/>
                Em breve disponível apenas para usuários logados.
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
