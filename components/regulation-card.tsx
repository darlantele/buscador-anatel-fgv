import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, FileText, ExternalLink } from "lucide-react"

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
}

interface RegulationCardProps {
  regulation: Regulation
  onClick?: () => void
}

export function RegulationCard({ regulation }: RegulationCardProps) {
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
    <a href={regulation.url} target="_blank" rel="noopener noreferrer" className="block h-full group">
      {/* MUDANÇA: Cards um pouco mais compactos com hover shadow */}
      <Card className="h-full cursor-pointer transition-all hover:shadow-lg hover:border-blue-500/40 hover:-translate-y-1 relative overflow-hidden flex flex-col">
        
        <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink className="w-3 h-3 text-blue-500" />
        </div>

        {/* MUDANÇA: Padding reduzido (p-4) para caber mais cards */}
        <CardHeader className="p-4 pb-2">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1 w-full">
              <CardTitle className="text-sm font-bold leading-snug text-blue-950 group-hover:text-blue-700 transition-colors line-clamp-2">
                {regulation.title}
              </CardTitle>
              {/* MUDANÇA: Número um pouco menor e mais discreto */}
              <p className="text-xs text-muted-foreground font-medium">
                {regulation.number}
              </p>
            </div>
            {/* Badge mais compacto */}
            <Badge className={`${badgeColorClass} shrink-0 text-[10px] px-1.5 h-5`} variant={badgeVariant}>
              {regulation.status}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 pt-2 flex-1 flex flex-col">
          <p 
            className="mb-3 text-xs text-muted-foreground line-clamp-3 leading-relaxed flex-1" 
            title={regulation.description} 
          >
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
    </a>
  )
}