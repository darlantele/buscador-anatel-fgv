"use client"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { RegulationCard } from "@/components/regulation-card"
import { RegulationSheet } from "@/components/regulation-sheet"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

// --- CONFIGURAÇÃO DO SUPABASE ---
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// --- TIPOS ---
export type Regulation = {
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

// --- SINÔNIMOS DE TEMAS (DICIONÁRIO TURBINADO 🚀) ---
// Aqui está a correção para os filtros funcionarem
const themeSynonyms: Record<string, string[]> = {
  "Banda Larga (SCM)": ["scm", "banda larga", "multimídia", "comunicação multimídia", "internet"],
  "Serviço Móvel (SMP)": ["smp", "móvel", "pessoal", "celular", "5g", "4g", "imtel"],
  
  "Radiodifusão": ["radiodifusão", "tv", "rádio", "fm", "am", "retransmissão", "rtv", "sbt", "digital"],
  "Consumidor": ["consumidor", "usuário", "atendimento", "direitos", "acessibilidade", "qualidade", "rgc"],
  "Outorga": ["outorga", "licença", "autorização", "rgo", "regulamento geral de outorgas", "licenciamento", "permissão"],
  "Sanções": ["sanções", "multa", "rasa", "pad", "infrações", "processo sancionador"],
  "Satélite": ["satélite", "orbital", "estação terrena", "segmento espacial", "banda ka", "banda ku"],
  "Interconexão": ["interconexão", "interoperabilidade", "eild", "unbundling", "exploração industrial", "vu-m", "tarifas"],
  "Segurança Cibernética": ["ciber", "segurança", "cibernética", "segurança da informação", "crítica", "gt-ciber"],
  "Espectro": ["espectro", "radiofrequência", "canalização", "faixa", "destinação", "rle"],
  "Radiofrequência": ["radiofrequência", "espectro", "rf", "frequência", "equipamentos"]
}

// --- AUXILIAR: EXTRAIR DATA DO TEXTO ---
function extractDate(titulo: string, anoPadrao: number): string {
  const mapMeses: { [key: string]: string } = {
    "janeiro": "01", "fevereiro": "02", "março": "03", "abril": "04", "maio": "05", "junho": "06",
    "julho": "07", "agosto": "08", "setembro": "09", "outubro": "10", "novembro": "11", "dezembro": "12"
  }
  const regex = /de\s+(\d{1,2})\s+de\s+([a-zA-ZçÇ]+)/i
  const match = titulo.match(regex)
  if (match) {
    const dia = match[1].padStart(2, '0')
    const nomeMes = match[2].toLowerCase()
    const mes = mapMeses[nomeMes]
    if (mes) return `${dia}/${mes}/${anoPadrao}`
  }
  return `01/01/${anoPadrao}`
}

// --- AUXILIAR: CONVERTER STRING PARA DATA REAL ---
function parseDateString(dateStr: string): Date {
  const [day, month, year] = dateStr.split('/').map(Number)
  return new Date(year, month - 1, day)
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedThemes, setSelectedThemes] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string[]>([])
  
  const [selectedRegulation, setSelectedRegulation] = useState<Regulation | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const [regulations, setRegulations] = useState<Regulation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const hasActiveFilters = searchQuery.length > 0 || selectedThemes.length > 0 || selectedTypes.length > 0 || selectedStatus.length > 0

  const handleReset = () => {
    setSearchQuery("")
    setSelectedThemes([])
    setSelectedTypes([])
    setSelectedStatus([])
  }

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      
      let query = supabase
        .from('regulamentos')
        .select('*')
        .order('ano', { ascending: false }) 

      if (searchQuery) {
        const term = searchQuery.trim()
        query = query.or(`titulo.ilike.%${term}%,ementa.ilike.%${term}%,palavras_chave.ilike.%${term}%,numero.ilike.%${term}%`)
      } else if (!hasActiveFilters) {
        // Trazemos 50 itens para garantir ordenação correta das últimas
        query = query.limit(50)
      } else {
        query = query.limit(100)
      }

      if (selectedTypes.length > 0) {
        const filterString = selectedTypes.map(t => `tipo.ilike.%${t}%`).join(',')
        query = query.or(filterString)
      }

      const { data, error } = await query

      if (error) {
        console.error("Erro ao buscar:", error)
      } else if (data) {
        const mappedData: Regulation[] = data.map((item: any) => ({
          id: item.id.toString(),
          number: item.numero && item.numero !== "S/N" 
            ? `${item.tipo} nº ${item.numero}/${item.ano}`
            : `${item.tipo} de ${item.ano}`,
          title: item.titulo,
          description: item.ementa && item.ementa.length > 5 
            ? item.ementa 
            : "Clique para visualizar os detalhes deste documento oficial.",
          type: item.tipo,
          status: item.situacao || "Vigente", 
          theme: "Geral", 
          tags: item.palavras_chave ? item.palavras_chave.toLowerCase() : "", 
          date: extractDate(item.titulo, item.ano),
          url: item.url
        }))

        // Ordenação Real
        mappedData.sort((a, b) => {
          const dateA = parseDateString(a.date)
          const dateB = parseDateString(b.date)
          return dateB.getTime() - dateA.getTime()
        })

        // Top 10 na Home
        if (!hasActiveFilters) {
          setRegulations(mappedData.slice(0, 10))
        } else {
          setRegulations(mappedData)
        }
      }
      setIsLoading(false)
    }

    const timer = setTimeout(() => {
      fetchData()
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery, selectedTypes]) 

  const filteredRegulations = regulations.filter((reg) => {
    const matchesStatus = selectedStatus.length === 0 || selectedStatus.some(s => reg.status.toLowerCase().includes(s.toLowerCase()))
    
    const matchesTheme = selectedThemes.length === 0 || selectedThemes.some(theme => {
      const keywords = themeSynonyms[theme] || [theme.toLowerCase()]
      return keywords.some(keyword => reg.tags.includes(keyword))
    })
    
    return matchesStatus && matchesTheme
  })

  // Handlers
  const handleThemeChange = (theme: string, checked: boolean) => {
    setSelectedThemes((prev) => (checked ? [...prev, theme] : prev.filter((t) => t !== theme)))
  }
  const handleTypeChange = (type: string, checked: boolean) => {
    setSelectedTypes((prev) => (checked ? [...prev, type] : prev.filter((t) => t !== type)))
  }
  const handleStatusChange = (status: string, checked: boolean) => {
    setSelectedStatus((prev) => (checked ? [...prev, status] : prev.filter((s) => s !== status)))
  }
  const handleCardClick = (regulation: Regulation) => {
    setSelectedRegulation(regulation)
    setIsSheetOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} onReset={handleReset} />

      <div className="flex">
        <Sidebar
          selectedThemes={selectedThemes}
          selectedTypes={selectedTypes}
          selectedStatus={selectedStatus}
          onThemeChange={handleThemeChange}
          onTypeChange={handleTypeChange}
          onStatusChange={handleStatusChange}
        />

        <main className="flex-1 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-700">
              {isLoading ? "Atualizando..." : 
               !hasActiveFilters ? "Últimas 10 atualizações regulatórias" :
               `${filteredRegulations.length} documento${filteredRegulations.length !== 1 ? "s" : ""} encontrado${filteredRegulations.length !== 1 ? "s" : ""}`
              }
            </h2>
          </div>

          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
               {[1,2,3,4,5,6].map(i => <div key={i} className="h-40 bg-slate-100 animate-pulse rounded-lg"></div>)}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredRegulations.map((regulation) => (
                <RegulationCard 
                  key={regulation.id} 
                  regulation={regulation} 
                />
              ))}
            </div>
          )}

          {!isLoading && filteredRegulations.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-slate-100 p-6 rounded-full mb-4">
                 <Search className="h-8 w-8 text-slate-400" />
              </div>
              <p className="text-lg font-medium text-muted-foreground">Nenhum resultado encontrado.</p>
              <p className="text-sm text-muted-foreground">Tente remover filtros ou usar termos mais genéricos.</p>
              <Button variant="link" onClick={handleReset} className="mt-2">
                Limpar todos os filtros
              </Button>
            </div>
          )}
        </main>
      </div>
      <RegulationSheet regulation={selectedRegulation} open={isSheetOpen} onOpenChange={setIsSheetOpen} />
    </div>
  )
}