<template>
  <q-page padding>
    <page-header v-bind="headerInfo">
      <template #after>
        <div class="row q-gutter-sm">
          <q-input
            v-model="search"
            label="Pesquise pelo nome"
            style="width: 300px"
            filled
            dense
          >
            <template #prepend>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn
            v-if="$store.getters['auth/isDCE']"
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
        style="width: 250px"
        standout="bg-secondary"
        popup-content-class="bg-secondary"
        clearable
        hide-bottom-space
        outlined
        dense
      />
    </div>
    <div class="row q-col-gutter-sm">
      <div
        v-for="athletic in filteredAthletics"
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
import { date } from 'quasar'

const sortByOptions = {
  Alfabética: (a, b) =>
    a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' }),
  'Data Criação': (a, b) =>
    date.extractDate(a.data_criacao, 'DD/MM/YYYY') -
    date.extractDate(b.data_criacao, 'DD/MM/YYYY')
}

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
    search: '',
    // Atléticas
    athletics: []
  }),
  async created () {
    await this.getAthletics()
  },
  computed: {
    filteredAthletics () {
      let athletics = [...this.athletics]

      if (this.search) {
        athletics = athletics.filter(athletic =>
          athletic.nome.includes(this.search)
        )
      }
      if (this.sortBy) athletics.sort(sortByOptions[this.sortBy])

      return athletics
    }
  },
  methods: {
    async getAthletics () {
      const { data } = await this.$axios.get('atleticas')
      this.athletics = data
    },
    openAddAthleticDialog (athletic) {
      if (!this.$store.getters['auth/isDCE']) return
      this.$q
        .dialog({
          component: AddAthleticDialog,
          athletic,
          onDelete: _athletic => {
            const index = this.athletics.findIndex(a => a.id === _athletic.id)
            if (index > -1) this.athletics.splice(index, 1)
          }
        })
        .onOk(async _athletic => {
          await this.getAthletics()
        })
    }
  }
}
</script>
