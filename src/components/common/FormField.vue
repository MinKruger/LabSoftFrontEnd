<template>
  <div>
    <p class="text-subtitle2 text-uppercase text-weight-bold">{{ label }}</p>
    <q-input
      v-model="inputVal"
      :rules="rules"
      :placeholder="placeholder || label"
      :type="type"
      :autogrow="autogrow"
      :input-style="inputStyle"
      standout="bg-secondary"
      class="bg-secondary"
      input-class="form-input"
      hide-bottom-space
      outlined
      dense
    />
  </div>
</template>

<script>
export default {
  name: 'FormField',
  props: {
    value: String,
    rules: Array,
    label: String,
    placeholder: String,
    type: String,
    autogrow: Boolean,
    inputStyle: String
  },
  computed: {
    inputVal: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
