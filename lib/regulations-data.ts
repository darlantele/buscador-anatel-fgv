export interface Article {
  title: string
  content: string
}

export interface Regulation {
  id: string
  number: string
  title: string
  description: string
  theme: string
  type: string
  status: "vigente" | "revogada"
  publicationDate: string
  articles: Article[]
}

export const regulationsData: Regulation[] = [
  {
    id: "1",
    number: "Resolução nº 632",
    title: "Regulamento Geral de Direitos do Consumidor (RGC)",
    description:
      "Aprova o Regulamento Geral de Direitos do Consumidor de Serviços de Telecomunicações, estabelecendo normas gerais aplicáveis às relações de consumo entre prestadoras de serviços de telecomunicações e consumidores.",
    theme: "consumidor",
    type: "resolucao",
    status: "vigente",
    publicationDate: "07/03/2014",
    articles: [
      {
        title: "Art. 1º - Do Objeto",
        content:
          "Este Regulamento tem por objeto estabelecer regras sobre proteção e defesa dos direitos dos consumidores de serviços de telecomunicações, em observância aos princípios e normas constitucionais, às diretrizes da Lei nº 8.078, de 11 de setembro de 1990 (Código de Defesa do Consumidor) e da Lei Geral de Telecomunicações.",
      },
      {
        title: "Art. 2º - Da Aplicação",
        content:
          "Este Regulamento aplica-se às Prestadoras de Serviços de Telecomunicações de interesse coletivo, independentemente do regime de prestação ou de seu porte, e às suas relações com os consumidores.",
      },
      {
        title: "Art. 3º - Das Definições",
        content:
          "Para fins deste Regulamento, aplicam-se as seguintes definições: I - Consumidor: pessoa natural ou jurídica que utiliza serviço de telecomunicações; II - Prestadora: empresa autorizada ou concessionária que presta serviço de telecomunicações.",
      },
      {
        title: "Art. 4º - Dos Direitos Básicos",
        content:
          "São direitos básicos do consumidor de serviços de telecomunicações: I - acesso e fruição dos serviços dentro dos padrões de qualidade previstos na regulamentação; II - escolha do plano de serviço mais adequado às suas necessidades; III - informação adequada sobre condições de contratação e utilização dos serviços.",
      },
    ],
  },
  {
    id: "2",
    number: "Resolução nº 750",
    title: "Regulamento de Gestão da Qualidade da Prestação do STFC",
    description:
      "Aprova o Regulamento de Gestão da Qualidade da Prestação do Serviço Telefônico Fixo Comutado - STFC, estabelecendo metas de qualidade e indicadores de desempenho para as prestadoras.",
    theme: "telefonia-movel",
    type: "resolucao",
    status: "vigente",
    publicationDate: "15/08/2022",
    articles: [
      {
        title: "Art. 1º - Do Objetivo",
        content:
          "Este Regulamento estabelece as condições e critérios para acompanhamento e controle da gestão da qualidade da prestação do Serviço Telefônico Fixo Comutado - STFC.",
      },
      {
        title: "Art. 2º - Dos Indicadores",
        content:
          "A qualidade da prestação do STFC será avaliada por meio de indicadores de qualidade que medem o desempenho operacional, a satisfação do consumidor e a eficiência na resolução de problemas.",
      },
      {
        title: "Art. 3º - Das Metas",
        content:
          "As prestadoras devem alcançar e manter índices mínimos de qualidade estabelecidos pela Anatel, sob pena de aplicação das sanções previstas na regulamentação.",
      },
    ],
  },
  {
    id: "3",
    number: "Ato nº 1234",
    title: "Requisitos Técnicos de Segurança Cibernética",
    description:
      "Estabelece os requisitos técnicos mínimos de segurança cibernética que devem ser observados pelas prestadoras de serviços de telecomunicações para proteção das redes e dados dos usuários.",
    theme: "banda-larga",
    type: "ato",
    status: "vigente",
    publicationDate: "22/11/2023",
    articles: [
      {
        title: "Art. 1º - Das Disposições Gerais",
        content:
          "Este Ato estabelece requisitos técnicos mínimos de segurança cibernética a serem observados pelas prestadoras de serviços de telecomunicações.",
      },
      {
        title: "Art. 2º - Da Proteção de Dados",
        content:
          "As prestadoras devem implementar medidas de proteção de dados pessoais dos usuários, incluindo criptografia, controle de acesso e monitoramento de ameaças.",
      },
      {
        title: "Art. 3º - Da Notificação de Incidentes",
        content:
          "As prestadoras devem notificar a Anatel sobre incidentes de segurança cibernética no prazo de 24 horas após a detecção.",
      },
    ],
  },
  {
    id: "4",
    number: "Resolução nº 671",
    title: "Regulamento de Uso do Espectro de Radiofrequências",
    description:
      "Aprova o Regulamento sobre o Uso do Espectro de Radiofrequências, definindo as condições de uso, fiscalização e gestão das radiofrequências no território nacional.",
    theme: "espectro",
    type: "resolucao",
    status: "vigente",
    publicationDate: "03/11/2016",
    articles: [
      {
        title: "Art. 1º - Do Objeto",
        content:
          "Este Regulamento estabelece as condições de uso do espectro de radiofrequências, bem como os procedimentos para outorga, fiscalização e controle.",
      },
      {
        title: "Art. 2º - Da Destinação",
        content:
          "O espectro de radiofrequências é um recurso limitado, constituindo-se em bem público, administrado pela Anatel.",
      },
      {
        title: "Art. 3º - Das Autorizações",
        content:
          "A utilização de radiofrequências depende de prévia autorização da Anatel, exceto nos casos de uso em caráter secundário ou quando expressamente dispensado.",
      },
    ],
  },
  {
    id: "5",
    number: "Consulta Pública nº 89",
    title: "Proposta de Regulamento para Serviços de Radiodifusão Digital",
    description:
      "Abre prazo para contribuições sobre a proposta de regulamento que estabelece condições técnicas e operacionais para os serviços de radiodifusão digital no Brasil.",
    theme: "radiodifusao",
    type: "consulta-publica",
    status: "vigente",
    publicationDate: "10/01/2024",
    articles: [
      {
        title: "Seção I - Da Proposta",
        content:
          "A presente Consulta Pública tem por objetivo colher contribuições da sociedade sobre a proposta de regulamento para serviços de radiodifusão digital.",
      },
      {
        title: "Seção II - Do Prazo",
        content:
          "As contribuições poderão ser encaminhadas no prazo de 60 dias a partir da publicação desta Consulta no Diário Oficial da União.",
      },
      {
        title: "Seção III - Da Participação",
        content:
          "Podem participar desta Consulta Pública quaisquer pessoas físicas ou jurídicas, mediante registro no Sistema de Acompanhamento de Consultas Públicas da Anatel.",
      },
    ],
  },
  {
    id: "6",
    number: "Resolução nº 477",
    title: "Regulamento do Serviço Móvel Pessoal - SMP",
    description:
      "Aprova o Regulamento do Serviço Móvel Pessoal - SMP, estabelecendo as condições de prestação do serviço de telecomunicações móvel terrestre de interesse coletivo.",
    theme: "telefonia-movel",
    type: "resolucao",
    status: "revogada",
    publicationDate: "07/08/2007",
    articles: [
      {
        title: "Art. 1º - Do Serviço",
        content:
          "O Serviço Móvel Pessoal é o serviço de telecomunicações móvel terrestre de interesse coletivo que possibilita a comunicação entre Estações Móveis e de Estações Móveis para outras estações.",
      },
      {
        title: "Art. 2º - Da Prestação",
        content:
          "O SMP será prestado no regime privado, mediante prévia autorização da Anatel, e depende de Licença para Funcionamento de Estação.",
      },
    ],
  },
  {
    id: "7",
    number: "Resolução nº 614",
    title: "Regulamento do Serviço de Comunicação Multimídia - SCM",
    description:
      "Aprova o Regulamento do Serviço de Comunicação Multimídia, que define as condições de prestação do serviço de banda larga fixa no Brasil.",
    theme: "banda-larga",
    type: "resolucao",
    status: "vigente",
    publicationDate: "28/05/2013",
    articles: [
      {
        title: "Art. 1º - Da Definição",
        content:
          "Serviço de Comunicação Multimídia é o serviço fixo de telecomunicações de interesse coletivo, prestado em âmbito nacional e internacional.",
      },
      {
        title: "Art. 2º - Das Características",
        content:
          "O SCM possibilita a oferta de capacidade de transmissão, emissão e recepção de informações multimídia, permitindo inclusive o provimento de conexão à internet.",
      },
      {
        title: "Art. 3º - Das Obrigações",
        content:
          "A prestadora de SCM deve manter os padrões de qualidade estabelecidos pela Anatel e assegurar aos usuários acesso às informações sobre o serviço.",
      },
    ],
  },
  {
    id: "8",
    number: "Ato nº 5678",
    title: "Procedimentos de Fiscalização de Radiodifusão",
    description:
      "Define os procedimentos e critérios técnicos para a fiscalização dos serviços de radiodifusão sonora e de sons e imagens.",
    theme: "radiodifusao",
    type: "ato",
    status: "vigente",
    publicationDate: "18/06/2023",
    articles: [
      {
        title: "Art. 1º - Da Fiscalização",
        content:
          "A fiscalização dos serviços de radiodifusão compreende o acompanhamento, controle e avaliação das condições técnicas e operacionais das estações.",
      },
      {
        title: "Art. 2º - Dos Critérios",
        content:
          "Os critérios de fiscalização incluem verificação de potência de operação, qualidade do sinal, cumprimento da grade de programação e respeito às normas técnicas.",
      },
    ],
  },
]

export function getThemeColor(theme: string): string {
  const colors: Record<string, string> = {
    "telefonia-movel": "bg-blue-500 text-white hover:bg-blue-600",
    "banda-larga": "bg-emerald-500 text-white hover:bg-emerald-600",
    radiodifusao: "bg-amber-500 text-white hover:bg-amber-600",
    consumidor: "bg-rose-500 text-white hover:bg-rose-600",
    espectro: "bg-indigo-500 text-white hover:bg-indigo-600",
  }
  return colors[theme] || "bg-gray-500 text-white"
}

export function getThemeLabel(theme: string): string {
  const labels: Record<string, string> = {
    "telefonia-movel": "Telefonia Móvel",
    "banda-larga": "Banda Larga",
    radiodifusao: "Radiodifusão",
    consumidor: "Consumidor",
    espectro: "Espectro",
  }
  return labels[theme] || theme
}

export function getTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    resolucao: "Resolução",
    ato: "Ato",
    "consulta-publica": "Consulta Pública",
  }
  return labels[type] || type
}
