<template>
  <q-card class="row no-wrap bg-secondary" flat>
    <q-img
      width="150px"
      height="150px"
      :src="newsImage"
      style="min-width: 150px"
    >
      <div class="fit news-card-image-gradient" />
    </q-img>
    <div class="q-ml-sm relative-position" style="flex: 1">
      <div class="row">
        <div class="col">
          <div class="q-mb-xs text-caption text-grey-5">
            Postado por {{ news.id_usuario }}
          </div>
          <p class="text-body1 text-weight-bold ellipsis-2-lines">
            {{ news.titulo }}
          </p>
          <q-card-section v-if="tags.length > 0" class="row q-gutter-sm">
            <q-badge
              v-for="tag in tags"
              :key="tag"
              :label="tag"
              :color="getTagColor(tag)"
              class="q-py-xs q-px-sm"
            />
          </q-card-section>
        </div>
        <div class="col-auto">
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
      </div>
      <div class="absolute-bottom-right q-pa-xs text-caption text-grey-5">
        {{ newsEventDate }}
      </div>
    </div>
  </q-card>
</template>

<script>
import { tagsColors } from 'src/constants/news'
import { date } from 'quasar'
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
    newsImage () {
      return this.news.imagem.startsWith('data:')
        ? this.news.imagem
        : 'http://' + this.news.imagem
    },
    tags () {
      return this.news.tags?.split(/\s?,\s?/) || []
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
        .onOk(() => {
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
