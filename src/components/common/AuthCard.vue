<template>
  <q-card class="bg-primary login-card rounded-borders" flat>
    <slot />
  </q-card>
</template>

<script>
export default {
  name: 'AuthCard'
}
</script>

<style lang="scss">
.login-card {
  border: 2px solid $accent;
  box-shadow: 0 0 40px 10px rgba($accent, 0.2) !important;
  width: 400px;
}
</style>
