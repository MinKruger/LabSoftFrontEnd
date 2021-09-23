<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="background: #1B1C30">
      <q-form @submit.prevent="submit">
        <dialog-header :title="headerTitle" :icon="headerIcon" />
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
import { USERS } from 'src/constants/pages'
import { required } from 'src/utils/rules'

const defaultUser = {
  name: '',
  email: ''
}

export default {
  components: { DialogHeader },
  props: {
    user: Object
  },
  data: () => ({
    headerIcon: USERS.icon,
    innerUser: { ...defaultUser }
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
      this.$emit('ok', this.innerAthletic)
      this.hide()
    },
    onCancelClick () {
      this.hide()
    },
    // Rules
    required
  }
}
</script>
