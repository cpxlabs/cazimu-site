export type Artist = {
  slug: string
  name: string
  stage: string
  focus: string
  highlight: string
  summary: string
  goals: string[]
}

export type Release = {
  slug: string
  title: string
  artist: string
  artistSlug: string
  format: string
  year: string
  summary: string
  campaign: string
  platforms: string[]
  embedUrl: string
}

export type EditorialFeature = {
  slug: string
  category: string
  title: string
  summary: string
  format: string
  audience: string
}

export type PressResource = {
  title: string
  description: string
  action: string
}

export type SeoEntry = {
  title: string
  description: string
}

export const defaultSeo: SeoEntry = {
  title: 'Cazimu - Music House',
  description:
    'Cazimu é uma music house para artistas independentes com operação orientada a artistas, lançamentos, conteúdo e imprensa.',
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
    slug: 'luna-mare',
    name: 'Luna Maré',
    stage: 'Pop alternativo',
    focus: 'Reposicionamento de imagem e calendário de singles',
    highlight: 'Projeto com direção criativa, narrativa visual e acompanhamento de campanha.',
    summary:
      'Artista em fase de consolidação de estética e recorrência, com trabalho orientado à construção de catálogo pop com assinatura visual forte.',
    goals: [
      'Organizar calendário de lançamento em ondas trimestrais',
      'Conectar repertório, imagem e conteúdo vertical',
      'Fortalecer descoberta em streaming e short video',
    ],
  },
  {
    slug: 'aurora-norte',
    name: 'Aurora Norte',
    stage: 'Indie / MPB',
    focus: 'Estruturação de base de fãs e presença nas plataformas',
    highlight: 'Trabalho orientado para consistência de lançamentos e comunidade recorrente.',
    summary:
      'Projeto com narrativa intimista e repertório autoral, desenhado para aprofundar comunidade e presença editorial em torno da artista.',
    goals: [
      'Transformar escuta em relacionamento de longo prazo',
      'Criar identidade editorial para ciclos de EP',
      'Expandir presença em playlists e imprensa nichada',
    ],
  },
  {
    slug: 'coletivo-linha',
    name: 'Coletivo Linha',
    stage: 'Rap / Cena urbana',
    focus: 'Distribuição, feats estratégicos e amplificação digital',
    highlight: 'Operação integrada entre conteúdo, lançamento e leitura de performance.',
    summary:
      'Coletivo com operação de lançamentos seriados, pensado para integrar comunidade, collabs e performance digital contínua.',
    goals: [
      'Criar calendário de feats e ativações recorrentes',
      'Conectar conteúdo de bastidor e performance ao vivo',
      'Usar dados de retenção para priorizar formatos de lançamento',
    ],
  },
]

export const featuredReleases: Release[] = [
  {
    slug: 'mar-aberto',
    title: 'Mar Aberto',
    artist: 'Luna Maré',
    artistSlug: 'luna-mare',
    format: 'Single',
    year: '2026',
    summary:
      'Campanha com teaser, pré-save, vídeo vertical e sequência editorial de pós-lançamento.',
    campaign:
      'Uma campanha desenhada para apresentar nova fase de posicionamento, com trilha de conteúdo em três atos e foco em recorrência de descoberta.',
    platforms: ['Spotify', 'YouTube', 'TikTok'],
    embedUrl: 'https://www.youtube.com/embed/abc123',
  },
  {
    slug: 'cidade-vaga-lume',
    title: 'Cidade Vaga-Lume',
    artist: 'Aurora Norte',
    artistSlug: 'aurora-norte',
    format: 'EP',
    year: '2026',
    summary:
      'Projeto com construção de conceito, assets visuais e organização da jornada de descoberta.',
    campaign:
      'O EP foi estruturado como arco narrativo para aumentar profundidade de consumo e distribuir a atenção entre singles, faixa foco e bastidores.',
    platforms: ['Spotify', 'Deezer', 'YouTube'],
    embedUrl: 'https://www.youtube.com/embed/def456',
  },
  {
    slug: 'turno-da-noite',
    title: 'Turno da Noite',
    artist: 'Coletivo Linha',
    artistSlug: 'coletivo-linha',
    format: 'Ao vivo',
    year: '2025',
    summary:
      'Lançamento com foco em retenção, conteúdo seriado e ativação de comunidade.',
    campaign:
      'Formato ao vivo usado como peça de comunidade e prova de palco, conectado a cortes curtos, bastidores e reaproveitamento em séries semanais.',
    platforms: ['YouTube', 'Instagram', 'Spotify'],
    embedUrl: 'https://www.youtube.com/embed/ghi789',
  },
]

export const editorialHighlights: EditorialFeature[] = [
  {
    slug: 'recorrencia-em-lancamentos',
    category: 'Radar',
    title: 'O que aprendemos com lançamentos que crescem por recorrência',
    summary:
      'Notas editoriais, insights de calendário e hipóteses de distribuição para artistas independentes.',
    format: 'Análise',
    audience: 'Artistas e equipes em fase de estruturação',
  },
  {
    slug: 'direcao-artistica-e-performance',
    category: 'Bastidores',
    title: 'Como a direção artística se conecta com performance nas plataformas',
    summary:
      'Conteúdo pensado para mostrar processo, método e decisões por trás de cada campanha.',
    format: 'Bastidor',
    audience: 'Times criativos e parceiros estratégicos',
  },
  {
    slug: 'noticias-da-casa',
    category: 'Notícias',
    title: 'Espaço para anúncios, novos projetos, parcerias e cobertura de marcos',
    summary: 'Uma base editorial para reforçar prova social, frequência e relevância orgânica.',
    format: 'Atualização',
    audience: 'Imprensa, mercado e comunidade',
  },
]

export const pressResources: PressResource[] = [
  {
    title: 'Press kit institucional',
    description: 'Versões curtas e completas da apresentação da Cazimu para imprensa, eventos e parceiros.',
    action: 'Solicitar kit',
  },
  {
    title: 'Assets de marca e artistas',
    description: 'Logos, fotos, capas e materiais aprovados para divulgação e cobertura editorial.',
    action: 'Pedir assets',
  },
  {
    title: 'Lançamentos em destaque',
    description: 'Resumo de releases prioritários, contexto do projeto e links oficiais para escuta.',
    action: 'Receber releases',
  },
]

export const pageSeo: Record<string, SeoEntry> = {
  home: {
    title: 'Cazimu - Music House para artistas independentes',
    description:
      'Conheça a arquitetura pública da Cazimu com artistas, lançamentos, conteúdo editorial e frente de imprensa para projetos musicais.',
  },
  about: {
    title: 'Quem Somos - Cazimu',
    description:
      'Saiba como a Cazimu organiza direção artística, lançamento e inteligência de mercado para carreiras autorais.',
  },
  services: {
    title: 'Serviços - Cazimu',
    description:
      'Veja os serviços da Cazimu para artistas independentes: direção, produção, lançamento, distribuição e crescimento de catálogo.',
  },
  artists: {
    title: 'Artistas - Cazimu',
    description:
      'Explore o roster da Cazimu e veja como cada projeto é apresentado por momento, narrativa e objetivo de carreira.',
  },
  releases: {
    title: 'Lançamentos - Cazimu',
    description:
      'Acesse os lançamentos da Cazimu com contexto de campanha, plataformas prioritárias e leitura de catálogo.',
  },
  catalog: {
    title: 'Catálogo - Cazimu',
    description:
      'Descubra o catálogo editorializado da Cazimu sem dependência de admin ou localStorage, com conteúdo versionado no código.',
  },
  content: {
    title: 'Conteúdo - Cazimu',
    description:
      'Veja a frente editorial da Cazimu com análises, bastidores e notícias sobre artistas, lançamentos e mercado.',
  },
  press: {
    title: 'Imprensa - Cazimu',
    description:
      'Acesse a sala de imprensa da Cazimu com press kit, assets e materiais de apoio para mídia e parceiros.',
  },
  contact: {
    title: 'Contato - Cazimu',
    description:
      'Entre em contato com a Cazimu para alinhar direção artística, lançamento, catálogo e próximos passos do projeto.',
  },
}

export function getArtistBySlug(slug: string) {
  return featuredArtists.find((artist) => artist.slug === slug)
}

export function getReleaseBySlug(slug: string) {
  return featuredReleases.find((release) => release.slug === slug)
}

export function getReleasesByArtistSlug(artistSlug: string) {
  return featuredReleases.filter((release) => release.artistSlug === artistSlug)
}
