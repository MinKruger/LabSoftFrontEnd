<template>
  <q-page padding>
    <page-header v-bind="headerInfo">
      <template #after>
        <div class="row q-gutter-sm">
          <q-input
            filled
            v-model="search"
            label="Pesquise pelo nome"
            style="width: 300px"
            dense
          >
            <template #prepend>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn
            v-if="$store.getters['auth/isDCE']"
            @click="() => openAddMatchDialog()"
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
        style="width: 200px"
        standout="bg-secondary"
        popup-content-class="bg-secondary"
        clearable
        hide-bottom-space
        outlined
        dense
      />
      <q-select
        label="Modalidade"
        v-model="sortModalidade"
        :options="modalidadeOptions"
        style="width: 200px"
        standout="bg-secondary"
        popup-content-class="bg-secondary"
        clearable
        hide-bottom-space
        outlined
        dense
      />
      <date-picker
        label="A partir de"
        v-model="sortDate"
        style="width: 200px"
        standout="bg-secondary"
        popup-content-class="bg-secondary"
        hide-bottom-space
        outlined
        dense
      />
    </div>
    <div class="grid-title">
      Acontecendo hoje
    </div>
    <div class="matches-grid">
      <div
        v-for="match in filteredMatches"
        :key="match.id"
        class="col-6 col-sm-4 col-md-2 col-xl-1"
      >
        <match-card
          @click.native="openAddMatchDialog(match)"
          :match="match"
          :athletics="athletics"
          :championships="championships"
        />
      </div>
    </div>
    <div class="grid-title">
      Todos
    </div>
    <div class="matches-grid">
      <div
        v-for="match in filteredMatches"
        :key="match.id"
        class="col-6 col-sm-4 col-md-2 col-xl-1"
      >
        <match-card
          @click.native="openAddMatchDialog(match)"
          :match="match"
          :athletics="athletics"
          :championships="championships"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import PageHeader from 'src/components/common/PageHeader.vue'
import DatePicker from 'src/components/common/DatePicker.vue'
import { MATCHES } from 'src/constants/pages'
import { sortOptions } from 'src/constants/athletics'
import MatchCard from 'src/components/common/MatchCard'
import AddMatchDialog from 'src/components/dialogs/AddMatchDialog.vue'

export default {
  components: { PageHeader, MatchCard, DatePicker },
  name: 'Matches',
  data: () => ({
    headerInfo: MATCHES,
    sortBy: null,
    sortModalidade: null,
    sortDate: null,
    sortOptions,
    matches: [],
    athletics: [],
    championships: [],
    search: ''
  }),
  async created () {
    await this.getAthletics()
    await this.getChampionships()
    await this.getMatches()
  },
  computed: {
    modalidadeOptions () {
      return this.championships.map(e => e.modalidade.nome)
    },
    filteredMatches () {
      const bdMatches = [...this.matches]

      // if (this.search) {
      //   matches = matches.filter(match =>
      //     match.nome
      //       .normalize()
      //       .toUpperCase()
      //       .includes(this.search.normalize().toUpperCase())
      //   )
      // }

      const matches = [
        {
          id: 'x1',
          id_campeonato: '389731b8-e263-41cc-9490-8c3177caf30b',
          data_jogo: '05/11/1998',
          id_fase: 'Grupo',
          id_time1: '77497e0d-2c33-44d9-ae3c-2bf464ea1fe8',
          id_time2: '7bb278fc-5101-4a5b-a001-bc08fdbd1ccb',
          local: 'dale',
          placar1: '50',
          placar2: '120'
        },
        {
          id: 'x2',
          id_campeonato: '389731b8-e263-41cc-9490-8c3177caf30b',
          data_jogo: '05/11/1998',
          id_fase: 'Grupo',
          id_time1: '77497e0d-2c33-44d9-ae3c-2bf464ea1fe8',
          id_time2: '7bb278fc-5101-4a5b-a001-bc08fdbd1ccb',
          local: 'dale',
          placar1: '50',
          placar2: '120'
        },
        {
          id: 'x3',
          id_campeonato: '389731b8-e263-41cc-9490-8c3177caf30b',
          data_jogo: '05/11/1998',
          id_fase: 'Grupo',
          id_time1: '77497e0d-2c33-44d9-ae3c-2bf464ea1fe8',
          id_time2: '7bb278fc-5101-4a5b-a001-bc08fdbd1ccb',
          local: 'dale',
          placar1: '50',
          placar2: '120'
        }
      ]

      return bdMatches.length > 0 ? bdMatches : matches
    }
  },
  methods: {
    async getMatches () {
      const { data } = await this.$axios.get('jogos')
      this.matches = data
    },
    async getChampionships () {
      const { data } = await this.$axios.get('campeonatos', {
        params: {
          limit: Number.MAX_SAFE_INTEGER,
          page: 1
        }
      })

      this.championships = data.campeonatos
    },
    async getAthletics () {
      const { data } = await this.$axios.get('atleticas')
      this.athletics = data
    },
    openAddMatchDialog (match) {
      this.$q
        .dialog({
          component: AddMatchDialog,
          match,
          athletics: this.athletics,
          championships: this.championships,
          onDelete: _match => {
            const index = this.matches.findIndex(a => a.id === _match.id)
            if (index > -1) this.matches.splice(index, 1)
          }
        })
        .onOk(async _match => {
          await this.getMatches()
        })
    }
  }
}
</script>

<style scoped lang="scss">
.grid-title {
  font-size: 20px;
  font-weight: $semibold;
  margin: 18px 0;
  padding-left: 16px;
}
.matches-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
  padding-bottom: 20px;
}
</style>
