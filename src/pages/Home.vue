<template>
  <q-page padding>
    <page-header v-bind="headerInfo" />
  </q-page>
</template>

<script>
import PageHeader from 'src/components/common/PageHeader.vue'
import { HOME } from 'src/constants/pages'

export default {
  components: { PageHeader },
  name: 'Home',
  data: () => ({
    headerInfo: HOME
  })
}
</script>
