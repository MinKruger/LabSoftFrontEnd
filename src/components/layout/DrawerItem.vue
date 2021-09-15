<template>
  <q-item
    :to="to"
    class="rounded-borders inactive-tab"
    active-class="active-tab"
    clickable
    exact
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label class="text-weight-medium">
        {{ title }}
      </q-item-label>
      <q-item-label v-if="caption" caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      default: ''
    },
    to: {
      type: [Object, String],
      default: '#'
    },
    icon: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
body.body--dark {
  .active-tab {
    color: white !important;
  }

  .inactive-tab {
    color: $secondary;
  }
}
</style>
