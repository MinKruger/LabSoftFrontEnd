import { date } from 'quasar'

export const required = (val, options, msg) => {
  const defaults = {
    allowZero: false,
    allowEmptyString: false,
    isBoolean: false
  }
  const { allowZero, allowEmptyString, isBoolean } = Object.assign(
    defaults,
    options
  )
  msg ??= 'O campo acima é obrigatório.'

  if (typeof val === 'string') {
    return (allowEmptyString && val === '') || val.trim().length > 0 || msg
  } else if (typeof val === 'number') {
    return (allowZero && val === 0) || !!val || msg
  } else if (typeof val === 'bigint') {
    return (allowZero && val === 0n) || !!val || msg
  } else if (Array.isArray(val)) {
    return val.length > 0 || msg
  } else if (isBoolean === true) {
    return (typeof val !== 'undefined' && val !== null) || msg
  }

  return !!val || msg
}

export const validDate = (val, options, msg) => {
  const defaults = {}
  Object.assign(defaults, options)
  msg ??= 'Por favor, insira uma data válida.'

  return (typeof val === 'string' && date.isValid(val)) || msg
}

export const noPastDate = (val, options, msg) => {
  const defaults = {
    dateMask: 'YYYY-MM-DD'
  }
  const { dateMask } = Object.assign(defaults, options)
  msg ??= 'A data não pode ser anterior.'

  if (typeof val !== 'string') return msg

  const currentDate = date
    .buildDate({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
    .getTime()
  const selectedDate = date.extractDate(`${val} 00:00:00`, dateMask).getTime()

  return selectedDate >= currentDate || msg
}

export const noFutureDate = (val, options, msg) => {
  const defaults = {
    dateMask: 'YYYY-MM-DD'
  }
  const { dateMask } = Object.assign(defaults, options)
  msg ??= 'A data não pode ser futura.'

  if (typeof val !== 'string') return msg

  const currentDate = date
    .buildDate({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
    .getTime()
  const selectedDate = date.extractDate(`${val} 00:00:00`, dateMask).getTime()

  console.log(new Date(currentDate), new Date(selectedDate))

  return selectedDate <= currentDate || msg
}
