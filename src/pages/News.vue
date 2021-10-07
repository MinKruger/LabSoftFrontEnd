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
        clearable
        rounded
      />
      <q-select
        label="Intervalo"
        v-model="intervalFilterBy"
        :options="intervalFilterOptions"
        style="width: 200px"
        standout="bg-secondary"
        popup-content-class="bg-secondary"
        clearable
        rounded
      />
    </div>
    <div class="row q-col-gutter-sm">
      <div
        v-for="_news in news"
        :key="_news.id"
        class="col-12 col-sm-6 col-lg-4"
      >
        <news-card
          @edit="__news => onNewsSubmit(_news, __news)"
          @click.native="openAddNewsDialog(_news)"
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
  intervalFilterOptions
} from 'src/constants/news'

export default {
  components: { PageHeader, NewsCard },
  name: 'News',
  data: () => ({
    headerInfo: NEWS,
    categoryFilterBy: null,
    categoryFilterOptions,
    intervalFilterBy: null,
    intervalFilterOptions,
    news: []
  }),
  async created () {
    await this.getNews()
  },
  methods: {
    async getNews () {
      const { data } = await this.$axios.get('postagens', {
        params: {
          limit: 1000,
          page: 1,
          type: 'Notícia'
        }
      })

      this.news = data.posts
    },
    openAddNewsDialog (selectedNews) {
      this.$q
        .dialog({
          component: AddNewsDialog,
          news: selectedNews
        })
        .onOk(news => this.onNewsSubmit(selectedNews, news))
    },
    async onNewsSubmit (selectedNews, news) {
      await this.getNews()
    }
  }
}
</script>
