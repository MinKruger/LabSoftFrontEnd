<template>
  <q-page padding>
    <page-header v-bind="headerInfo" />
  </q-page>
</template>

<script>
import PageHeader from 'src/components/common/PageHeader.vue'
import { PLAYERS } from 'src/constants/pages'

export default {
  components: { PageHeader },
  name: 'Players',
  data: () => ({
    headerInfo: PLAYERS
  })
}
</script>
