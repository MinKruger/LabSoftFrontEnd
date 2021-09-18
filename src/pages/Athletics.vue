<template>
  <q-page padding>
    <page-header v-bind="headerInfo">
      <template #after>
        <div class="row q-gutter-sm">
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
            @click="() => openAddAthleticDialog()"
            label="Adicionar"
            color="blue"
            class="text-weight-bold q-px-md"
          />
        </div>
      </template>
    </page-header>
    <div class="row q-gutter-sm q-mb-md">
      <q-select
        label="Ordem"
        v-model="sortBy"
        :options="sortOptions"
        style="width: 175px"
        standout="bg-secondary"
        popup-content-class="bg-secondary"
        clearable
        rounded
      />
      <q-select
        label="Universidade"
        v-model="filterUniversity"
        :options="universityOptions"
        style="width: 175px"
        standout="bg-secondary"
        popup-content-class="bg-secondary"
        clearable
        rounded
      />
    </div>
    <div class="row q-col-gutter-sm">
      <div
        v-for="athletic in athletics"
        :key="athletic.id"
        class="col-6 col-sm-4 col-md-2 col-xl-1"
      >
        <athletic-card
          @click.native="openAddAthleticDialog(athletic)"
          class="cursor-pointer"
          :athletic="athletic"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import PageHeader from 'src/components/common/PageHeader.vue'
import AthleticCard from 'src/components/common/AthleticCard.vue'

import { ATHLETICS } from 'src/constants/pages'
import { sortOptions } from 'src/constants/athletics'
import AddAthleticDialog from 'src/components/dialogs/AddAthleticDialog.vue'

const athletics = [
  { id: 1, name: 'Milton Campos', created_at: '2021-09-18' },
  { id: 2, name: 'Medicina Claretiano', created_at: '2021-09-18' }
]

export default {
  components: { PageHeader, AthleticCard },
  name: 'Athletics',
  data: () => ({
    headerInfo: ATHLETICS,
    // Filtros
    sortBy: null,
    sortOptions,
    filterUniversity: null,
    universityOptions: ['UVV'],
    // Atléticas
    athletics
  }),
  methods: {
    openAddAthleticDialog (athletic) {
      this.$q
        .dialog({
          component: AddAthleticDialog,
          athletic
        })
        .onOk(_athletic => {
          if (_athletic.id) {
            Object.assign(athletic, _athletic)
          } else {
            this.athletics.push({
              ..._athletic,
              id: this.athletics.length + 1
            })
          }
        })
    }
  }
}
</script>
