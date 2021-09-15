<template>
  <div class="full-width row q-gutter-x-md q-mb-lg">
    <div class="col-auto text-h5 row items-center">
      <q-icon v-if="icon" :name="icon" size="lg" class="q-mr-md" />
      <span class="text-weight-medium">
        {{ title }}
      </span>
    </div>
    <div class="col">
      <slot name="after" />
    </div>
  </div>
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
