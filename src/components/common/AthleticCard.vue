<template>
  <q-card style="min-height: 500px; background: #1E2036">
    {{ athletic.name }}
  </q-card>
</template>

<script>
export default {
  name: 'AthleticCard',
  props: {
    athletic: {
      type: Object,
      required: true
    }
  }
}
</script>
