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
    news: [
      {
        id: 1,
        posted_by: 'João Romalho',
        title: 'Atléticas da UVV fazem parceria com atléticas da Ufes',
        tags: 'Basquete, Masculino',
        created_at: '2021-20-09',
        photo:
          'https://www.seculodiario.com.br/images/p/35250/UVV_Fachada_Divulgao.jpg',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec odio est, dignissim et arcu vel, semper pellentesque quam. Proin gravida, ante vel viverra auctor, ante leo varius ligula, nec viverra tellus augue at est. Etiam eget dolor lectus. Mauris dictum ligula non risus euismod, at tempus augue fermentum. Nunc leo velit, ornare id nibh sit amet, volutpat luctus velit. Aliquam non pulvinar nulla. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed eu velit tortor. Sed consequat placerat porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Fusce vulputate tellus in odio venenatis, malesuada volutpat nunc pulvinar. Maecenas mattis facilisis tortor, congue dictum tortor consectetur quis. Morbi arcu magna, placerat eu erat et, gravida ultricies quam. Phasellus mollis ligula libero, varius tincidunt nulla suscipit nec. Aenean eleifend metus metus, at eleifend massa volutpat ac. Aenean consectetur erat quis nunc maximus consequat. Aliquam cursus ante quam, eu condimentum risus iaculis vel.'
      }
    ]
  }),
  methods: {
    openAddNewsDialog (selectedNews) {
      this.$q
        .dialog({
          component: AddNewsDialog,
          news: selectedNews
        })
        .onOk(news => this.onNewsSubmit(selectedNews, news))
    },
    onNewsSubmit (selectedNews, news) {
      console.log({ selectedNews, news })
      if (news.id) {
        Object.assign(selectedNews, news)
      } else {
        this.news.push(news)
      }
    }
  }
}
</script>
