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
            v-if="$store.getters['auth/isDCE']"
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
        style="width: 250px"
        standout="bg-secondary"
        popup-content-class="bg-secondary"
        clearable
        hide-bottom-space
        outlined
        dense
      />
      <q-select
        label="Modalidade"
        v-model="modalityFilterBy"
        :options="modalityOptions"
        style="width: 250px"
        standout="bg-secondary"
        popup-content-class="bg-secondary"
        clearable
        hide-bottom-space
        outlined
        dense
        option-label="nome"
        option-value="id"
        map-options
        emit-value
      />
    </div>
    <div class="row q-col-gutter-sm">
      <div
        v-for="championship in filteredChampionships"
        :key="championship.id"
        class="col-12 col-sm-6 col-lg-4"
      >
        <championship-card
          @edit="championship => getChampionships()"
          @click.native="openShowChampionshipDialog(championship)"
          class="cursor-pointer"
          :championship="championship"
          :modalities="modalityOptions"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import PageHeader from 'src/components/common/PageHeader.vue'
import { CHAMPIONSHIPS } from 'src/constants/pages'
import { sortOptions } from 'src/constants/championships'
import ChampionshipCard from 'src/components/common/ChampionshipCard.vue'
import ShowChampionshipDialog from 'src/components/dialogs/ShowChampionshipDialog.vue'
import AddChampionshipDialog from 'src/components/dialogs/AddChampionshipDialog.vue'

const sortByOptions = {
  Alfabética: (a, b) =>
    a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' }),
  Data: (a, b) => b.ano - a.ano
}

export default {
  components: { PageHeader, ChampionshipCard },
  name: 'Championships',
  data: () => ({
    headerInfo: CHAMPIONSHIPS,
    sortBy: null,
    sortOptions,
    modalityFilterBy: null,
    modalityOptions: [],
    search: '',
    championships: []
  }),
  computed: {
    filteredChampionships () {
      let championships = [...this.championships]

      if (this.search) {
        championships = championships.filter(championship =>
          championship.nome
            .normalize()
            .toUpperCase()
            .includes(this.search.normalize().toUpperCase())
        )
      }

      if (this.modalityFilterBy) {
        championships = championships.filter(
          championship => championship.id_modalidade === this.modalityFilterBy
        )
      }

      if (this.sortBy) championships.sort(sortByOptions[this.sortBy])

      return championships
    }
  },
  async created () {
    await Promise.allSettled([this.getChampionships(), this.getModalities()])
  },
  methods: {
    async getChampionships () {
      const { data } = await this.$axios.get('campeonatos', {
        params: {
          limit: Number.MAX_SAFE_INTEGER,
          page: 1
        }
      })

      this.championships = data.campeonatos
    },
    async getModalities () {
      const { data } = await this.$axios.get('modalidades')

      this.modalityOptions = data
    },
    openAddChampionshipDialog (selectedChampionship) {
      this.$q
        .dialog({
          component: AddChampionshipDialog,
          championship: selectedChampionship,
          modalities: this.modalityOptions,
          parent: this
        })
        .onOk(this.getChampionships)
    },
    openShowChampionshipDialog (selectedChampionship) {
      this.$q.dialog({
        component: ShowChampionshipDialog,
        championship: selectedChampionship,
        parent: this
      })
    }
  }
}
</script>
