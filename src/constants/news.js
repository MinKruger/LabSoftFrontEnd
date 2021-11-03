export const NEWS = 'NOTICIAS'
export const EVENTS = 'EVENTOS'
export const MATCHES = 'JOGOS'

export const categoryOptions = Object.freeze([
  { label: 'Notícias', value: NEWS },
  { label: 'Eventos', value: EVENTS },
  { label: 'Jogos', value: MATCHES }
])
export const intervalFilterOptions = Object.freeze([
  { label: 'Últimos 7 dias', value: 7 },
  { label: 'Últimos 30 dias', value: 30 }
])
export const tagsColors = Object.freeze({
  Basquete: 'blue',
  Futsal: 'green',
  Geral: 'orange',
  Vôlei: 'pink',
  Masculino: 'deep-purple-5',
  Feminino: 'yellow'
})
