<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin bg-primary news-dialog">
      <q-form @submit.prevent="submit">
        <dialog-header
          :icon="headerIcon"
          :title="innerNews.id ? 'Editar Postagem' : 'Nova Postagem'"
        />
        <q-card-section>
          <form-field
            v-model="innerNews.titulo"
            label="Título"
            :rules="[required]"
          />
        </q-card-section>
        <q-card-section>
          <p class="text-subtitle2 text-uppercase text-weight-bold">Foto</p>
          <file-drag-drop
            v-model="innerNews.imagem"
            :rules="[required]"
            hide-bottom-space
          />
        </q-card-section>
        <q-card-section>
          <p class="text-subtitle2 text-uppercase text-weight-bold">Texto</p>
          <q-editor
            v-model="innerNews.descricao"
            content-class="bg-secondary"
            toolbar-text-color="white"
            toolbar-toggle-color="accent"
            toolbar-bg="primary"
            placeholder="Digite o texto aqui"
          />
        </q-card-section>
        <q-card-section>
          <form-field v-model="innerNews.tags" label="Tags" />
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
            type="submit"
            color="blue"
            :label="innerNews.id ? 'Salvar' : 'Publicar'"
            padding="sm md"
            class="text-weight-bold"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import DialogHeader from 'components/common/DialogHeader.vue'
import FileDragDrop from 'components/common/FileDragDrop.vue'
import { ATHLETICS } from 'src/constants/pages'
import { required } from 'src/utils/rules'

const defaultNews = {
  titulo: '',
  id_usuario: '00000000-0000-0000-0000-000000000000',
  imagem: '',
  descricao: '',
  tags: '',
  tipo: 'NOTICIAS',
  data_evento: new Date().toLocaleDateString('pt-BR')
}

export default {
  components: { DialogHeader, FileDragDrop },
  props: {
    news: Object
  },
  data: () => ({
    headerIcon: ATHLETICS.icon,
    innerNews: { ...defaultNews }
  }),
  created () {
    if (this.news) {
      Object.assign(this.innerNews, this.news)
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
    async submit () {
      const news = this.innerNews.id
        ? await this.updateNews(this.innerNews)
        : await this.storeNews(this.innerNews)

      this.$emit('ok', news)
      this.hide()
    },
    onCancelClick () {
      this.hide()
    },
    async storeNews (news) {
      const { data } = await this.$axios.post('postagens', news)

      return data
    },
    async updateNews (news) {
      const { data } = await this.$axios.put(`postagens/${news.id}`, news)

      return data
    },
    // Rules
    required
  }
}
</script>
