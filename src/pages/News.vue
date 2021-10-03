<template>
  <q-page padding>
    <page-header v-bind="headerInfo">
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
          @click="() => openAddNewsDialog()"
          label="Adicionar"
          color="blue"
          class="text-weight-bold q-px-md"
        />
      </div>
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
        style="width: 175px"
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
    news: [
      {
        id: 1,
        posted_by: 'João Romalho',
        title: 'Atléticas da UVV fazem parceria com atléticas da Ufes',
        sport: 'Basquete',
        gender: 'Masculino',
        created_at: '2021-20-09',
        photo_url:
          'https://www.seculodiario.com.br/images/p/35250/UVV_Fachada_Divulgao.jpg'
      }
    ]
  }),
  methods: {
    openAddNewsDialog () {
      //
    }
  }
}
</script>
