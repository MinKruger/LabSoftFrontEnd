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
            v-model="innerUser.nome"
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
            hide-bottom-space
          />
        </q-card-section>
         <q-card-section>
          <p class="text-subtitle2 text-uppercase">Email</p>
          <q-input
            v-model="innerUser.email"
            :rules="[required]"
            placeholder="nome@email.com"
            standout="bg-secondary"
            hide-bottom-space
            outlined
            dense
          />
        </q-card-section>
        <q-card-section>
          <p class="text-subtitle2 text-uppercase">Permissão</p>
          <q-select
            @input="innerUser.id_atletica = ''"
            v-model="innerUser.permissao"
            :rules="[required]"
            :options="permissaoOptions"
            placeholder="Selecione"
            standout="bg-secondary"
            hide-bottom-space
            outlined
            dense
          />
        </q-card-section>
        <q-card-section v-if="innerUser.permissao === 'atletica'">
          <p class="text-subtitle2 text-uppercase">Atlética</p>
          <q-select
            v-model="innerUser.id_atletica"
            :options="atleticaOptions"
            placeholder="Selecione"
            standout="bg-secondary"
            hide-bottom-space
            outlined
            dense
          />
        </q-card-section>
        <q-card-section v-if="!innerUser.id">
          <p class="text-subtitle2 text-uppercase">Senha</p>
          <q-input
            type="password"
            v-model="innerUser.senha"
            placeholder="Senha"
            standout="bg-secondary"
            hide-bottom-space
            outlined
            dense
          />
        </q-card-section>
        <q-card-section>
          <p class="text-subtitle2 text-uppercase">Instagram</p>
          <q-input
            v-model="innerUser.instagram"
            placeholder="Instagram"
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
  email: '',
  permissao: '',
  id_atletica: '',
  instagram: '',
  senha: ''
}

export default {
  components: { DialogHeader, FileDragDrop },
  props: {
    user: Object,
    athletics: Array,
    onDelete: Function
  },
  data: () => ({
    headerIcon: USERS.icon,
    innerUser: { ...defaultUser },
    permissao: '',
    id_atletica: '',
    permissaoOptions: [
      'dce1',
      'dce2',
      'dce3',
      'atletica'
    ]
  }),
  computed: {
    headerTitle () {
      return this.innerUser.id ? 'Editar Usuário' : 'Novo Usuário'
    },
    atleticaOptions () {
      return this.athletics.map(e => {
        return {
          label: e.nome,
          value: e.id,
          description: e.nome
        }
      })
    }
  },
  created () {
    if (this.user) {
      Object.assign(this.innerUser, this.user)

      this.innerUser.id_atletica = this.atleticaOptions.find(e => e.value === this.innerUser.id_atletica)
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
      const payload = {
        nome: this.innerUser.nome,
        email: this.innerUser.email,
        foto: this.innerUser?.foto?.includes('base64') ? this.innerUser.foto.split(',')[1] : this.innerUser.foto,
        permissao: this.innerUser.permissao,
        instagram: this.innerUser.instagram,
        senha: this.innerUser.senha
      }

      if (this.innerUser?.id_atletica?.value?.length > 0) {
        payload.id_atletica = this.innerUser?.id_atletica?.value
      }

      const user = this.innerUser.id
        ? await this.updateUser({ payload, id: this.innerUser.id })
        : await this.storeUser(payload)

      this.$emit('ok', user)
      this.hide()
    },
    async storeUser (user) {
      const { data } = await this.$axios.post('usuarios', user)

      return data
    },
    async updateUser ({ payload, id }) {
      const { data } = await this.$axios.put(
        `usuarios/${id}`,
        payload
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
