<template>
  <q-page padding>
    <page-header v-bind="headerInfo">
    </page-header>
    <div class="grid-title">
      Jogos recentes
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
          :phases="phases"
          :championships="championships"
        />
      </div>
    </div>
    <div class="grid-title">
      Últimas notícias
    </div>
    <div class="news-grid">
      <div
        v-for="_news in filteredNews"
        :key="_news.id"
      >
        <news-card
          @edit="__news => onNewsSubmit(_news, __news)"
          @delete="onNewsDelete"
          @click.native="openShowNewsDialog(_news)"
          class="cursor-pointer"
          :news="_news"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import PageHeader from 'src/components/common/PageHeader.vue'
import { HOME } from 'src/constants/pages'
import { sortOptions } from 'src/constants/athletics'
import MatchCard from 'src/components/common/MatchCard'
import AddMatchDialog from 'src/components/dialogs/AddMatchDialog.vue'
import ShowNewsDialog from 'src/components/dialogs/ShowNewsDialog.vue'
import NewsCard from 'components/common/NewsCard.vue'

export default {
  components: { PageHeader, MatchCard, NewsCard },
  name: 'Matches',
  data: () => ({
    headerInfo: HOME,
    sortBy: null,
    sortModalidade: null,
    sortDate: null,
    sortOptions,
    matches: [],
    athletics: [],
    championships: [],
    phases: [],
    search: '',
    news: []
  }),
  async created () {
    await this.getAthletics()
    await this.getChampionships()
    await this.getMatches()
    await this.getNews()
    await this.getPhases()
  },
  computed: {
    filteredNews () {
      return [...this.news]
    },
    modalidadeOptions () {
      return this.championships.map(e => e.modalidade.nome)
    },
    filteredMatches () {
      let matches = [...this.matches]

      matches = matches.filter(
        match => {
          const selectedDate = new Date()
          selectedDate.setDate(selectedDate.getDate() - 30)

          const matchDate = new Date(match.data_jogo.split('/').reverse().join('-'))
          matchDate.setDate(matchDate.getDate() + 1)

          return matchDate > selectedDate
        }
      )

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
    },
    async getNews () {
      const { data } = await this.$axios.get('postagens', {
        params: {
          limit: Number.MAX_SAFE_INTEGER,
          page: 1,
          type: 'NOTICIAS'
        }
      })

      this.news = data.posts
    },
    openShowNewsDialog (selectedNews) {
      this.$q.dialog({
        component: ShowNewsDialog,
        news: selectedNews,
        parent: this
      })
    },
    async onNewsSubmit (selectedNews, news) {
      await this.getNews()
    },
    onNewsDelete (news) {
      this.news.splice(this.news.indexOf(news), 1)
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
.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 16px;
  padding-bottom: 20px;
}
</style>
