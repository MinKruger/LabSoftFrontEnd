<template>
  <q-card class="row no-wrap bg-secondary" flat>
    <q-img
      width="150px"
      height="150px"
      :src="news.photo_url"
      style="min-width: 150px"
    >
      <div class="fit news-card-image-gradient" />
    </q-img>
    <div class="q-ml-sm relative-position">
      <div class="row">
        <div class="col">
          <div class="q-mb-xs text-caption text-grey-5">
            Postado por {{ news.posted_by }}
          </div>
          <p class="text-body1 text-weight-bold ellipsis-2-lines">
            {{ news.title }}
          </p>
          <div class="row q-gutter-x-sm">
            <q-badge v-bind="sportChip" class="q-py-xs q-px-sm" />
            <q-badge
              v-if="news.gender"
              v-bind="genderChip"
              class="q-py-xs q-px-sm"
            />
          </div>
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
      <div class="absolute-bottom-right q-pa-sm text-caption text-grey-5">
        {{ newsCreatedAt }}
      </div>
    </div>
  </q-card>
</template>

<script>
import { gendersColors, sportsColors } from 'src/constants/news'
import { date } from 'quasar'

export default {
  name: 'NewsCard',
  props: {
    news: {
      type: Object,
      required: true
    }
  },
  computed: {
    sportChip () {
      return {
        label: this.news.sport,
        color: sportsColors[this.news.sport]
      }
    },
    genderChip () {
      return {
        label: this.news.gender,
        color: gendersColors[this.news.gender]
      }
    },
    newsCreatedAt () {
      return date.formatDate(
        date.extractDate(this.news.created_at, 'YYYY-MM-DD'),
        'DD, MMMM [de] YYYY'
      )
    }
  },
  methods: {
    editNews () {
      //
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
