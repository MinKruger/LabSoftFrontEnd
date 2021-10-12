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
            v-model="innerUser.picture"
            :rules="[required]"
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
          <p class="text-subtitle2 text-uppercase">Tipo</p>
         <select v-model="innerUser.type" class="userSelect">
           <option disabled value="">Selecione</option>
            <option>Tipo A</option>
            <option>Tipo B</option>
            <option>Tipo C</option>
          </select>
        </q-card-section>
        <q-card-section>
          <p class="text-subtitle2 text-uppercase">Permissão</p>
          <select v-model="innerUser.permission" class="userSelect">
            <option disabled value="">Selecione</option>
            <option>Permissão A</option>
            <option>Permissão B</option>
            <option>Permissão C</option>
          </select>
        </q-card-section>
        <q-card-section>
          <p class="text-subtitle2 text-uppercase">Atlética</p>
          <select v-model="innerUser.athletic" class="userSelect">
            <option disabled value="">Selecione</option>
            <option>Atletica A</option>
            <option>Atletica B</option>
            <option>Atletica C</option>
          </select>
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
            label="Adicionar"
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
  name: '',
  picture: null,
  email: '',
  type: '',
  permission: '',
  athletic: ''
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
    atletica: ''
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
    submit () {
      console.log(this.innerUser)
      this.$emit('ok', this.innerUser)
      this.hide()
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
        .onOk(() => {
          this.onDelete && this.onDelete(this.innerUser)
          this.hide()
        })
    },
    // Rules
    required
  }
}
</script>
