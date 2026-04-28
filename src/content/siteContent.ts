export type Artist = {
  name: string
  stage: string
  focus: string
  highlight: string
}

export type Release = {
  title: string
  artist: string
  format: string
  summary: string
  platforms: string[]
}

export type EditorialFeature = {
  category: string
  title: string
  summary: string
}

export type PressResource = {
  title: string
  description: string
}

export const publicNavigation = [
  { to: '/', label: 'Início' },
  { to: '/quem-somos', label: 'Quem Somos' },
  { to: '/servicos', label: 'Serviços' },
  { to: '/artistas', label: 'Artistas' },
  { to: '/lancamentos', label: 'Lançamentos' },
  { to: '/conteudo', label: 'Conteúdo' },
  { to: '/imprensa', label: 'Imprensa' },
  { to: '/contato', label: 'Contato' },
] as const

export const featuredArtists: Artist[] = [
  {
    name: 'Luna Maré',
    stage: 'Pop alternativo',
    focus: 'Reposicionamento de imagem e calendário de singles',
    highlight: 'Projeto com direção criativa, narrativa visual e acompanhamento de campanha.',
  },
  {
    name: 'Aurora Norte',
    stage: 'Indie / MPB',
    focus: 'Estruturação de base de fãs e presença nas plataformas',
    highlight: 'Trabalho orientado para consistência de lançamentos e comunidade recorrente.',
  },
  {
    name: 'Coletivo Linha',
    stage: 'Rap / Cena urbana',
    focus: 'Distribuição, feats estratégicos e amplificação digital',
    highlight: 'Operação integrada entre conteúdo, lançamento e leitura de performance.',
  },
]

export const featuredReleases: Release[] = [
  {
    title: 'Mar Aberto',
    artist: 'Luna Maré',
    format: 'Single',
    summary: 'Campanha com teaser, pré-save, vídeo vertical e sequência editorial de pós-lançamento.',
    platforms: ['Spotify', 'YouTube', 'TikTok'],
  },
  {
    title: 'Cidade Vaga-Lume',
    artist: 'Aurora Norte',
    format: 'EP',
    summary: 'Projeto com construção de conceito, assets visuais e organização da jornada de descoberta.',
    platforms: ['Spotify', 'Deezer', 'YouTube'],
  },
  {
    title: 'Turno da Noite',
    artist: 'Coletivo Linha',
    format: 'Ao vivo',
    summary: 'Lançamento com foco em retenção, conteúdo seriado e ativação de comunidade.',
    platforms: ['YouTube', 'Instagram', 'Spotify'],
  },
]

export const editorialHighlights: EditorialFeature[] = [
  {
    category: 'Radar',
    title: 'O que aprendemos com lançamentos que crescem por recorrência',
    summary: 'Notas editoriais, insights de calendário e hipóteses de distribuição para artistas independentes.',
  },
  {
    category: 'Bastidores',
    title: 'Como a direção artística se conecta com performance nas plataformas',
    summary: 'Conteúdo pensado para mostrar processo, método e decisões por trás de cada campanha.',
  },
  {
    category: 'Notícias',
    title: 'Espaço para anúncios, novos projetos, parcerias e cobertura de marcos',
    summary: 'Uma base editorial para reforçar prova social, frequência e relevância orgânica.',
  },
]

export const pressResources: PressResource[] = [
  {
    title: 'Press kit institucional',
    description: 'Versões curtas e completas da apresentação da Cazimu para imprensa, eventos e parceiros.',
  },
  {
    title: 'Assets de marca e artistas',
    description: 'Logos, fotos, capas e materiais aprovados para divulgação e cobertura editorial.',
  },
  {
    title: 'Lançamentos em destaque',
    description: 'Resumo de releases prioritários, contexto do projeto e links oficiais para escuta.',
  },
]
