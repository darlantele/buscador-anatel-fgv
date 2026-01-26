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
      <Card className="h-full cursor-pointer transition-all hover:shadow-lg hover:border-blue-500/40 hover:-translate-y-1 relative overflow-hidden">
        
        <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink className="w-4 h-4 text-blue-500" />
        </div>

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <CardTitle className="text-base font-semibold leading-tight text-blue-950 group-hover:text-blue-700 transition-colors">
                {regulation.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground font-medium">
                {regulation.number}
              </p>
            </div>
            <Badge className={`${badgeColorClass} shrink-0`} variant={badgeVariant}>
              {regulation.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* AQUI ESTÁ A MUDANÇA: title={regulation.description} */}
          <p 
            className="mb-4 text-sm text-muted-foreground line-clamp-3" 
            title={regulation.description} 
          >
            {regulation.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto">
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