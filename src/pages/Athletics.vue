<template>
  <q-page padding>
    <page-header v-bind="headerInfo">
      <template #after>
        <div class="row q-gutter-x-sm">
          <q-input
            filled
            label="Pesquise pelo nome, cor..."
            style="width: 300px"
            dense
          >
            <template #prepend>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn
            label="Adicionar"
            color="blue"
            class="text-weight-bold q-px-md"
          />
        </div>
      </template>
    </page-header>
  </q-page>
</template>

<script>
import PageHeader from 'src/components/common/PageHeader.vue'
import { ATHLETICS } from 'src/constants/pages'

export default {
  components: { PageHeader },
  name: 'Athletics',
  data: () => ({
    headerInfo: ATHLETICS
  })
}
</script>
