<template>
  <q-input
    ref="input"
    v-model="val"
    :label="label"
    :placeholder="placeholder"
    :rules="getRules"
    :disable="disable"
    :outlined="outlined"
    :filled="filled"
    :standout="standout"
    :dense="dense"
    :lazy-rules="lazyRules"
    :hide-bottom-space="hideBottomSpace"
    mask="##/##/####"
    class="cursor-pointer"
  >
    <template v-slot:append>
      <q-btn
        flat
        icon="event"
        class="cursor-pointer"
        @click.self="() => $refs.date.show()"
      >
        <q-popup-proxy
          ref="date"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date
            :value="val"
            mask="DD/MM/YYYY"
            @input="setDate"
            class="bg-secondary"
          />
        </q-popup-proxy>
      </q-btn>
    </template>
  </q-input>
</template>

<script>
// import { date } from 'quasar'
// import { validDate, noFutureDate, noPastDate } from 'src/utils/rules'

export default {
  name: 'DatePicker',
  props: {
    value: {
      type: String,
      default: ''
    },
    noFutureDate: {
      type: Boolean,
      default: false
    },
    noPastDate: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    filled: {
      type: Boolean,
      default: false
    },
    hideBottomSpace: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array,
      default: () => []
    },
    defaultDate: {
      type: Boolean,
      default: false
    },
    label: String,
    placeholder: String,
    disable: Boolean,
    lazyRules: Boolean,
    standout: [Boolean, String],
    dense: Boolean
  },
  mounted () {
    if (this.defaultDate && !this.value) {
      this.val = new Date().toISOString().split('T')[0]
    }
  },
  computed: {
    val: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    getRules () {
      // const rules = [val => !val || validDate(formatDateVal(val))]

      // if (this.noFutureDate) {
      //   rules.push(val => !val || noFutureDate(formatDateVal(val)))
      // }

      // if (this.noPastDate) {
      //   rules.push(val => !val || noPastDate(formatDateVal(val)))
      // }

      // return [...this.rules, ...rules]
      return [...this.rules]
    }
  },
  methods: {
    setDate (timestamp) {
      if (timestamp === null) return
      try {
        // const timestampFormat = 'DD/MM/YYYY HH:mm:ss'
        // const currentDate = date
        //   .buildDate({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
        //   .getTime()
        // const selectedDate = date
        //   .extractDate(`${timestamp} 00:00:00`, timestampFormat)
        //   .getTime()

        // if (this.noFutureDate && selectedDate > currentDate) {
        //   return this.$q.notify({
        //     color: 'grey-8',
        //     textColor: 'white',
        //     message: 'Não é possível selecionar uma data futura'
        //   })
        // }
        // if (this.noPastDate && selectedDate < currentDate) {
        //   return this.$q.notify({
        //     color: 'grey-8',
        //     textColor: 'white',
        //     message: 'Não é possível selecionar uma data passada'
        //   })
        // }
        this.val = timestamp
        this.$refs.date.hide()
      } catch (err) {
        this.$q.notify({
          color: 'grey-8',
          textColor: 'white',
          icon: 'warning',
          message: 'A data informada não é válida'
        })
      }
    },
    validate () {
      return this.$refs.input.validate()
    }
  }
}
</script>
