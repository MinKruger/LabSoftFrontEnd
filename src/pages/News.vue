<template>
  <q-page padding>
    <page-header v-bind="headerInfo">
      <template #after>
        <div class="row q-gutter-sm">
          <q-input filled label="Pesquise notícias" style="width: 300px" dense>
            <template #prepend>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn
            @click="() => openAddNewsDialog()"
            label="Nova Postagem"
            color="blue"
            class="text-weight-bold q-px-md"
          />
        </div>
      </template>
    </page-header>
    <div class="row q-gutter-sm q-mb-md">
      <q-select
        label="Categoria"
        v-model="categoryFilterBy"
        :options="categoryFilterOptions"
        style="width: 175px"
        standout="bg-secondary"
        popup-content-class="bg-secondary"
        map-options
        emit-value
        rounded
      />
      <q-select
        label="Intervalo"
        v-model="intervalFilterBy"
        :options="intervalFilterOptions"
        style="width: 200px"
        standout="bg-secondary"
        popup-content-class="bg-secondary"
        map-options
        emit-value
        clearable
        rounded
      />
    </div>
    <div class="row q-col-gutter-sm">
      <div
        v-for="_news in filteredNews"
        :key="_news.id"
        class="col-12 col-sm-6 col-lg-4"
      >
        <news-card
          @edit="__news => onNewsSubmit(_news, __news)"
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
import NewsCard from 'components/common/NewsCard.vue'
import AddNewsDialog from 'components/dialogs/AddNewsDialog.vue'

import { NEWS } from 'src/constants/pages'
import {
  categoryFilterOptions,
  intervalFilterOptions,
  NEWS as NEWS_ENUM
} from 'src/constants/news'
import ShowNewsDialog from 'src/components/dialogs/ShowNewsDialog.vue'
import { date } from 'quasar'

export default {
  components: { PageHeader, NewsCard },
  name: 'News',
  data: () => ({
    headerInfo: NEWS,
    categoryFilterBy: NEWS_ENUM,
    categoryFilterOptions,
    intervalFilterBy: null,
    intervalFilterOptions,
    news: []
  }),
  computed: {
    filteredNews () {
      let news = [...this.news]

      if (this.intervalFilterBy) {
        const now = new Date()
        news = news.filter(
          _news =>
            date.getDateDiff(now, new Date(_news.created_at), 'days') <=
            this.intervalFilterBy
        )
      }

      return news
    }
  },
  async created () {
    await this.getNews()
  },
  methods: {
    async getNews () {
      const { data } = await this.$axios.get('postagens', {
        params: {
          limit: Number.MAX_SAFE_INTEGER,
          page: 1,
          type: this.categoryFilterBy
        }
      })

      this.news = data.posts
    },
    openAddNewsDialog () {
      this.$q
        .dialog({
          component: AddNewsDialog
        })
        .onOk(this.onNewsSubmit)
    },
    openShowNewsDialog (selectedNews) {
      this.$q.dialog({ component: ShowNewsDialog, news: selectedNews })
    },
    async onNewsSubmit (selectedNews, news) {
      await this.getNews()
    }
  },
  watch: {
    async categoryFilterBy () {
      await this.getNews()
    }
  }
}
</script>
