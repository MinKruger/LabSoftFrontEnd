<template>
  <q-card class="row no-wrap bg-secondary full-height" flat>
    <q-img
      v-if="news.imagem"
      width="150px"
      height="150px"
      :src="news.imagem"
      style="min-width: 150px"
    >
      <div class="fit news-card-image-gradient" />
    </q-img>
    <div class="q-ml-sm relative-position overflow-hidden" style="flex: 1">
      <p
        :class="[
          'q-mb-xs',
          'text-caption',
          'ellipsis',
          'text-grey-5',
          'full-width',
          $store.getters['auth/isDCE'] && 'q-pr-lg'
        ]"
      >
        Postado por {{ news.usuario.nome }}
      </p>
      <p class="text-body1 text-weight-bold ellipsis-2-lines q-mb-xs">
        {{ news.titulo }}
      </p>
      <p class="text-caption ellipsis-3-lines" v-html="news.descricao" />
    </div>
    <div v-if="$store.getters['auth/isDCE']" class="absolute-top-right">
      <q-btn @click.stop icon="more_vert" size="sm" round flat>
        <q-menu>
          <q-card class="bg-secondary">
            <q-list>
              <q-item @click="editNews" clickable>
                <q-item-section side>
                  <q-icon name="edit" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    Editar
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item @click="deleteNews" clickable>
                <q-item-section side>
                  <q-icon name="o_delete_forever" color="pink" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    Excluir
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </q-menu>
      </q-btn>
    </div>
    <div class="absolute-bottom-right q-pa-xs text-caption text-grey-5 ">
      {{ newsEventDate }}
    </div>
  </q-card>
</template>

<script>
import { tagsColors } from 'src/constants/news'
import { date } from 'quasar'
import { removeHtmlTags } from 'src/utils'
import AddNewsDialog from 'components/dialogs/AddNewsDialog.vue'

export default {
  name: 'NewsCard',
  props: {
    news: {
      type: Object,
      required: true
    }
  },
  computed: {
    newsEventDate () {
      return date.formatDate(
        date.extractDate(this.news.data_evento, 'DD/MM/YYYY'),
        'DD, MMMM [de] YYYY'
      )
    },
    newsDescription () {
      return removeHtmlTags(this.news.descricao)
    }
  },
  methods: {
    editNews () {
      this.$q
        .dialog({
          component: AddNewsDialog,
          news: this.news
        })
        .onOk(news => this.$emit('edit', news))
    },
    deleteNews () {
      this.$q
        .dialog({
          title: 'Excluir Notícia',
          message: 'Deseja realmente excluir esta notícia?',
          class: 'bg-primary',
          ok: {
            label: 'Excluir',
            color: 'blue',
            padding: 'sm md'
          },
          cancel: {
            color: 'white',
            outline: true,
            padding: 'sm md'
          }
        })
        .onOk(async () => {
          await this.$axios.delete(`postagens/${this.news.id}`)

          this.$q.notify({
            type: 'positive',
            message: 'Notícia excluída com sucesso.'
          })

          this.$emit('delete', this.news)
          this.hide()
        })
    },
    getTagColor (tag) {
      return tagsColors[tag]
    }
  }
}
</script>

<style lang="scss" scoped>
.news-card-image-gradient {
  background-image: linear-gradient(
    to left,
    rgba($secondary, 0.9),
    rgba(0, 0, 0, 0)
  );
}
</style>
