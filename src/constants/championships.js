export const IN_PROGRESS = 'ANDAMENTO'
export const TERMINATED = 'ENCERRADO'
export const CANCELLED = 'CANCELADO'
export const AWAITING = 'AGUARDANDO'

export const statusOptions = Object.freeze([
  { label: 'Andamento', value: IN_PROGRESS },
  { label: 'Encerrado', value: TERMINATED },
  { label: 'Cancelado', value: CANCELLED },
  { label: 'Aguardando', value: AWAITING }
])

export const modalityColors = Object.freeze({
  'Basquete Masculino': 'blue',
  'Futsal Masculino': 'green-6',
  'Futsal Feminino': 'green-6',
  'Basquete Feminino': 'blue',
  'Volei Masculino': 'pink-6',
  'Counter Strike Global Offensive': 'amber-6',
  'Volei Feminino': 'pink-6',
  'League Of Legends': 'blue-grey-6'
})

export const sortOptions = Object.freeze(['Alfabética'])
