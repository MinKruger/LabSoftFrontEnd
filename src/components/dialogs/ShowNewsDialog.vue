<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin bg-primary news-dialog">
      <dialog-header :icon="headerIcon" title="Visualizar Postagem" />
      <q-img width="100%" height="200px" :src="news.photo">
        <div
          class="text-h6 text-weight-bold absolute-bottom"
          style="background: none; z-index: 1"
        >
          {{ news.titulo }}
        </div>
        <div class="fit news-dialog-image-gradient" />
      </q-img>
      <q-card-section>
        <p class="text-grey-4 text-caption">
          Postado por {{ news.id_usuario }}
          •
          {{ newsEventDate }}
        </p>
        <div v-html="news.descricao" />
      </q-card-section>
      <q-card-section v-if="tags.length > 0" class="row q-gutter-x-sm">
        <q-badge
          v-for="tag in tags"
          :key="tag"
          :label="tag"
          :color="getTagColor(tag)"
          class="q-py-xs q-px-sm"
        />
      </q-card-section>
      <q-card-actions align="right" class="q-pa-md">
        <q-btn
          @click="hide"
          color="white"
          label="Fechar"
          padding="sm md"
          class="text-weight-bold"
          outline
        />
        <q-btn
          @click="editNews"
          color="blue"
          label="Editar"
          padding="sm md"
          class="text-weight-bold"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import DialogHeader from 'src/components/common/DialogHeader.vue'
import AddNewsDialog from 'components/dialogs/AddNewsDialog.vue'

import { ATHLETICS } from 'src/constants/pages'
import { tagsColors } from 'src/constants/news'
import { date } from 'quasar'

export default {
  components: { DialogHeader },
  props: {
    news: Object
  },
  data: () => ({
    headerIcon: ATHLETICS.icon
  }),
  computed: {
    newsEventDate () {
      return date.formatDate(
        date.extractDate(this.news.data_evento, 'DD/MM/YYYY'),
        'DD, MMMM [de] YYYY'
      )
    },
    tags () {
      return this.news.tags?.split(/\s*,\s*/) || []
    }
  },
  methods: {
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    onDialogHide () {
      this.$emit('hide')
    },
    onCancelClick () {
      this.hide()
    },
    editNews () {
      this.$q
        .dialog({
          component: AddNewsDialog,
          news: this.news
        })
        .onOk(news => {
          this.$emit('ok', news)
        })
    },
    getTagColor (tag) {
      return tagsColors[tag]
    }
  }
}
</script>

<style lang="scss">
.news-dialog-image-gradient {
  background: linear-gradient(
    to top,
    rgba($secondary, 0.9),
    rgba(0, 0, 0, 0)
  ) !important;
}
</style>
