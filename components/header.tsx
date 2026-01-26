import { Search, Info, HelpCircle, Home } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onReset: () => void // Nova função para resetar tudo
}

export function Header({ searchQuery, onSearchChange, onReset }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-6 gap-4">
        
        {/* LOGO DA ANATEL (Clicável para Home) */}
        <div 
          className="flex items-center gap-2 mr-4 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={onReset}
          title="Ir para o Início"
        >
          <div className="flex items-center justify-center">
            <img 
              src="/logo-anatel.png" 
              alt="Anatel" 
              className="h-10 w-auto object-contain" 
            />
          </div>
          <div className="hidden md:block border-l pl-3 ml-2 border-slate-300">
            <h1 className="text-sm font-bold leading-tight text-slate-700">Regulatório</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Busca Inteligente</p>
          </div>
        </div>

        {/* BARRA DE BUSCA */}
        <div className="flex-1 max-w-2xl flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Pesquise por termo, número, assunto ou ementa..."
              className="w-full bg-slate-50 pl-9 focus-visible:ring-blue-600"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          
          {/* BOTÃO HOME (RESTAURAR) */}
          <Button variant="outline" size="icon" onClick={onReset} title="Limpar Filtros e Busca">
            <Home className="h-4 w-4 text-slate-600" />
          </Button>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          
          {/* BOTÃO AJUDA */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" title="Ajuda">
                <HelpCircle className="h-5 w-5 text-muted-foreground" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Como usar o Buscador</DialogTitle>
                <DialogDescription className="pt-4 space-y-3">
                  <p><strong>1. Busca Inteligente:</strong> Digite qualquer termo (ex: "radiodifusão", "multa", "9.472") na barra superior.</p>
                  <p><strong>2. Filtros Laterais:</strong> Use a barra lateral para refinar por Tipo (Lei, Resolução), Situação ou Assunto.</p>
                  <p><strong>3. Dica:</strong> Clique no logo da Anatel ou no ícone da casinha para limpar sua busca.</p>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          {/* BOTÃO SOBRE (COM DESTAQUE) */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-700 hover:bg-blue-800 text-white gap-2 font-semibold shadow-sm">
                <Info className="h-4 w-4" />
                <span className="hidden md:inline">Sobre o Projeto</span>
                <span className="md:hidden">Sobre</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Sobre o Projeto</DialogTitle>
                <DialogDescription className="pt-4 text-justify space-y-4">
                  <p>
                    Este sistema foi desenvolvido como atividade prática da disciplina de 
                    <strong> Introdução à Inteligência Artificial</strong>, parte do programa de 
                    <strong> Pós-graduação em Regulação e Comunicação em Ecossistemas Digitais</strong> da 
                    <strong> Fundação Getúlio Vargas (FGV)</strong>.
                  </p>
                  
                  <div className="bg-slate-50 p-3 rounded-md border text-sm">
                    <strong>Equipe de Desenvolvimento:</strong>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-slate-700">
                      {/* NOMES AQUI */}
                      <li>Ailfran Moraes Martins</li>
                      <li>Darlan Lima Silva</li>
                      <li>Gustavo Nery e Silva</li>
                      <li>Julio Cezar da Silva Marra</li>
                      <li>Luiza Maria Thomazoni Loyola Giacomin</li>
                    </ul>
                  </div>

                  <p className="text-xs text-muted-foreground mt-4 border-t pt-4">
                    O objetivo é demonstrar o uso de inteligência artificial 
                    para facilitar o acesso ao arcabouço regulatório brasileiro de telecomunicações.
                  </p>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

        </div>
      </div>
    </header>
  )
}