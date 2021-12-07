<template>
  <q-page padding>
    <page-header v-bind="headerInfo">
      <template #after>
        <div class="row q-gutter-sm">
          <q-input
            filled
            v-model="search"
            label="Pesquise pelo local"
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
        label="Modalidade"
        v-model="modalityFilterBy"
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
        v-for="match in todayMatches"
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
          :phases="phases"
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
    modalityFilterBy: null,
    sortDate: null,
    sortOptions,
    matches: [],
    athletics: [],
    championships: [],
    phases: [],
    search: ''
  }),
  async created () {
    await this.getAthletics()
    await this.getChampionships()
    await this.getMatches()
    await this.getPhases()
  },
  computed: {
    modalidadeOptions () {
      return [...new Set(this.championships.map(e => e.modalidade.nome))]
    },
    todayMatches () {
      return this.filteredMatches.filter(match => {
        const todayDate = new Date()
        const matchDate = new Date(match.data_jogo.split('/').reverse().join('-'))
        matchDate.setDate(matchDate.getDate() + 1)

        return todayDate.toDateString() === matchDate.toDateString()
      })
    },
    filteredMatches () {
      let matches = [...this.matches]

      if (this.search) {
        matches = matches.filter(match =>
          match.local
            .normalize()
            .toUpperCase()
            .includes(this.search.normalize().toUpperCase())
        )
      }

      if (this.modalityFilterBy) {
        matches = matches.filter(
          match => {
            const championship = this.championships.find(e => e.id === match.id_campeonato)

            return championship.modalidade.nome === this.modalityFilterBy
          }
        )
      }

      if (this.sortDate) {
        matches = matches.filter(
          match => {
            const selectedDate = new Date(this.sortDate.split('/').reverse().join('-'))
            selectedDate.setDate(selectedDate.getDate() + 1)

            const matchDate = new Date(match.data_jogo.split('/').reverse().join('-'))
            matchDate.setDate(matchDate.getDate() + 1)

            return matchDate > selectedDate
          }
        )
      }

      return matches
    }
  },
  methods: {
    async getMatches () {
      const { data } = await this.$axios.get('jogos')
      this.matches = data
    },
    async getPhases () {
      const { data } = await this.$axios.get('fases')
      this.phases = data
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
          phases: this.phases,
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
