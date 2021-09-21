<template>
  <q-card class="bg-user-card" flat>
    <q-card-section>
      {{ user.name }}
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.bg-user-card {
  background: rgba($secondary, 0.5);
}
</style>
