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
    search: '',
    news: []
  }),
  async created () {
    await this.getAthletics()
    await this.getChampionships()
    await this.getMatches()
    await this.getNews()
  },
  computed: {
    filteredNews () {
      return [...this.news]
    },
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
