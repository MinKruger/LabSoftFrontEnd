<template>
  <div class="full-width row q-gutter-x-md q-mb-lg overflow-hidden">
    <div
      :class="[
        $q.screen.gt.xs ? 'col-auto' : 'col-12',
        'text-h5',
        'row',
        'items-center',
        'overflow-hidden'
      ]"
    >
      <q-icon
        @click="toggleLeftDrawer"
        v-if="icon"
        :name="icon"
        size="lg"
        class="q-mr-md cursor-pointer"
      />
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
  },
  methods: {
    toggleLeftDrawer () {
      this.$store.commit('layout/toggleLeftDrawerOpen')
    }
  }
}
</script>
