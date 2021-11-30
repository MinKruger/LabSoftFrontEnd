<template>
  <q-card class="partner-card fit" flat>
    <q-card-section class="text-center partner-card-header">
      <q-img
        :src="partner.logo"
        width="150px"
        height="150px"
        style="border-radius: 50%"
      />
      <div class="partner-card-tr" />
    </q-card-section>
    <q-card-section class="text-center">
      <p class="text-h6 text-weight-bold">
        {{ partner.titulo }}
      </p>
      <div class="text-caption">
        {{ partner.descricao }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'PartnerCard',
  props: {
    partner: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.partner-card {
  background: #1f2036;
  overflow: hidden;
}

.partner-card-tr {
  position: absolute;
  width: 50px;
  height: 40px;
  transform: rotate(45deg);
  background: $secondary;
  top: -15px;
  right: -20px;
}
</style>
