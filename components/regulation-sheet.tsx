"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar, FileText, Download, ExternalLink } from "lucide-react"
import { type Regulation, getThemeColor, getThemeLabel, getTypeLabel } from "@/lib/regulations-data"

interface RegulationSheetProps {
  regulation: Regulation | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RegulationSheet({ regulation, open, onOpenChange }: RegulationSheetProps) {
  if (!regulation) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl">
        <SheetHeader className="text-left">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge className={getThemeColor(regulation.theme)}>{getThemeLabel(regulation.theme)}</Badge>
            <Badge variant="outline">{getTypeLabel(regulation.type)}</Badge>
            <Badge
              variant={regulation.status === "vigente" ? "default" : "secondary"}
              className={regulation.status === "vigente" ? "bg-accent text-accent-foreground" : ""}
            >
              {regulation.status === "vigente" ? "Vigente" : "Revogada"}
            </Badge>
          </div>
          <SheetTitle className="text-xl">{regulation.number}</SheetTitle>
          <SheetDescription className="text-base font-medium text-primary">{regulation.title}</SheetDescription>
        </SheetHeader>

        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              Publicado em: {regulation.publicationDate}
            </div>
          </div>

          <p className="text-sm text-foreground leading-relaxed">{regulation.description}</p>

          <div className="flex gap-2">
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Baixar PDF
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <ExternalLink className="h-4 w-4" />
              Acessar no DOU
            </Button>
          </div>

          <Separator />

          <div>
            <h3 className="mb-3 font-semibold text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Conteúdo do Regulamento
            </h3>
            <ScrollArea className="h-[400px] rounded-md border p-4">
              <div className="space-y-4 text-sm leading-relaxed">
                {regulation.articles.map((article, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-semibold text-foreground">{article.title}</h4>
                    <p className="text-muted-foreground">{article.content}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
