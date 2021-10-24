<template>
  <q-page padding>
    <page-header v-bind="headerInfo">
      <template #after>
        <div class="row q-gutter-sm">
          <q-input
            v-model="search"
            filled
            label="Pesquise Campeonatos"
            style="width: 300px"
            dense
          >
            <template #prepend>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn
            @click="() => openAddChampionshipDialog()"
            label="Novo Campeonato"
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
        label="Modalidade"
        v-model="modalityFilterBy"
        :options="modalityOptions"
        style="width: 175px"
        standout="bg-secondary"
        popup-content-class="bg-secondary"
        clearable
        rounded
      />
    </div>
    <div class="row q-col-gutter-sm">
      <div
        v-for="championship in filteredChampionships"
        :key="championship.id"
        class="col-12 col-sm-6 col-lg-4"
      >
        <championship-card
          @edit="championship => openAddChampionshipDialog(championship)"
          @click.native="openShowChampionshipDialog(championship)"
          class="cursor-pointer"
          :championship="championship"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import PageHeader from 'src/components/common/PageHeader.vue'
import { CHAMPIONSHIPS } from 'src/constants/pages'
import { sortOptions, modalityOptions } from 'src/constants/championships'
import ChampionshipCard from 'src/components/common/ChampionshipCard.vue'
import ShowChampionshipDialog from 'src/components/dialogs/ShowChampionshipDialog.vue'
import AddChampionshipDialog from 'src/components/dialogs/AddChampionshipDialog.vue'

const championships = [
  {
    id: 1,
    titulo: 'Campeonato Dale',
    ano: 2021,
    descricao:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    vencedor: 'Rinocerontes'
  }
]

export default {
  components: { PageHeader, ChampionshipCard },
  name: 'Championships',
  data: () => ({
    headerInfo: CHAMPIONSHIPS,
    sortBy: null,
    sortOptions,
    modalityFilterBy: null,
    modalityOptions,
    search: '',
    championships
  }),
  computed: {
    filteredChampionships () {
      return this.championships
    }
  },
  methods: {
    openAddChampionshipDialog (selectedChampionship) {
      this.$q.dialog({
        component: AddChampionshipDialog,
        championship: selectedChampionship
      })
    },
    openShowChampionshipDialog (selectedChampionship) {
      this.$q.dialog({
        component: ShowChampionshipDialog,
        championship: selectedChampionship
      })
    }
  }
}
</script>
