<template>
  <q-card-section>
    <q-icon v-if="icon" :name="icon" size="md" class="q-mr-sm" />
    <span class="text-uppercase text-body1" style="font-family: monospace;">
      {{ title }}
    </span>
    <slot />
  </q-card-section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    icon: String
  }
}
</script>
