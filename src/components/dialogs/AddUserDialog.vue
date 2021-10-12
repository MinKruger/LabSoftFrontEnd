<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="background: #1B1C30">
      <q-form @submit.prevent="submit">
        <dialog-header :icon="headerIcon" :title="headerTitle">
          <q-btn
            v-if="innerUser.id"
            @click="deleteUser"
            icon="o_delete_forever"
            class="absolute-top-right"
            color="pink"
            style="top: 10px; right: 10px"
            flat
            round
          />
        </dialog-header>
        <q-card-section>
          <p class="text-subtitle2 text-uppercase">Nome</p>
          <q-input
            v-model="innerUser.name"
            :rules="[required]"
            placeholder="Nome"
            standout="bg-secondary"
            hide-bottom-space
            outlined
            dense
          />
        </q-card-section>
        <q-card-section>
          <p class="text-subtitle2 text-uppercase">Foto</p>
          <file-drag-drop
            v-model="innerUser.foto"
            :rules="[required]"
            hide-bottom-space
          />
        </q-card-section>
         <q-card-section>
          <p class="text-subtitle2 text-uppercase">Email</p>
          <q-input
            v-model="innerUser.login"
            :rules="[required]"
            placeholder="nome@email.com"
            standout="bg-secondary"
            hide-bottom-space
            outlined
            dense
          />
        </q-card-section>
        <q-card-section>
          <p class="text-subtitle2 text-uppercase">Tipo</p>
          <q-select
            v-model="innerUser.tipo"
            :rules="[required]"
            :options="tipoOptions"
            placeholder="Selecione"
            standout="bg-secondary"
            hide-bottom-space
            outlined
            dense
          />
        </q-card-section>
        <q-card-section>
          <p class="text-subtitle2 text-uppercase">Permissão</p>
          <q-select
            v-model="innerUser.permissao"
            :rules="[required]"
            :options="tipoOptions"
            placeholder="Selecione"
            standout="bg-secondary"
            hide-bottom-space
            outlined
            dense
          />
        </q-card-section>
        <q-card-section>
          <p class="text-subtitle2 text-uppercase">Atlética</p>
          <q-select
            v-model="innerUser.atletica"
            :rules="[required]"
            :options="tipoOptions"
            placeholder="Selecione"
            standout="bg-secondary"
            hide-bottom-space
            outlined
            dense
          />
        </q-card-section>
        <q-card-actions align="right" class="q-pa-md">
          <q-btn
            @click="onCancelClick"
            color="white"
            label="Cancelar"
            padding="sm md"
            class="text-weight-bold"
            outline
          />
          <q-btn
            type="submit"
            color="blue"
            :label="innerUser.id ? 'Salvar' : 'Adicionar'"
            padding="sm md"
            class="text-weight-bold"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import DialogHeader from 'src/components/common/DialogHeader.vue'
import FileDragDrop from 'src/components/common/FileDragDrop.vue'
import { USERS } from 'src/constants/pages'
import { required } from 'src/utils/rules'

const defaultUser = {
  id: '',
  nome: '',
  foto: null,
  login: '',
  tipo: '',
  permissao: ''
}

export default {
  components: { DialogHeader, FileDragDrop },
  props: {
    user: Object,
    onDelete: Function
  },
  data: () => ({
    headerIcon: USERS.icon,
    innerUser: { ...defaultUser },
    tipo: '',
    permissao: '',
    atletica: '',
    tipoOptions: [
      'Opção 1',
      'Opção 2'
    ],
    permissaoOptions: [
      'Opção 1',
      'Opção 2'
    ],
    atleticaOptions: [
      'Opção 1',
      'Opção 2'
    ]
  }),
  computed: {
    headerTitle () {
      return this.innerUser.id ? 'Editar Usuário' : 'Novo Usuário'
    }
  },
  created () {
    if (this.user) Object.assign(this.innerUser, this.user)
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
      const payload = {
        login: this.innerUser.login,
        foto: this.innerUser.foto.includes('base64') ? this.innerUser.foto.split(',')[1] : '',
        tipo: this.innerUser.tipo,
        id: this.innerUser.id
      }

      const user = this.innerUser.id
        ? await this.updateUser(payload)
        : await this.storeUser(payload)

      this.$emit('ok', user)
      this.hide()
    },
    async storeUser (user) {
      const { data } = await this.$axios.post('usuarios', user)

      return data
    },
    async updateUser (user) {
      const { data } = await this.$axios.put(
        `usuarios/${user.id}`,
        user
      )

      return data
    },
    onCancelClick () {
      this.hide()
    },
    deleteUser () {
      this.$q
        .dialog({
          title: 'Excluir Usuário',
          message: 'Deseja realmente excluir este usuário?',
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
          await this.$axios.delete(`usuarios/${this.innerUser.id}`)
          this.$q.notify({
            type: 'positive',
            message: 'Atlética excluída com sucesso.'
          })
          this.onDelete && this.onDelete(this.innerUser)
          this.hide()
        })
    },
    // Rules
    required
  }
}
</script>
