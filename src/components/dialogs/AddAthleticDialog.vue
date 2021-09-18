<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="background: #1B1C30">
      <q-form @submit.prevent="submit">
        <dialog-header v-bind="headerInfo" />
        <q-card-section>
          <p class="text-subtitle2 text-uppercase">Nome</p>
          <q-input
            v-model="innerAthletic.name"
            :rules="[required]"
            label="Nome"
            standout="bg-secondary"
            hide-bottom-space
            outlined
            dense
          />
        </q-card-section>
        <q-card-section>
          <p class="text-subtitle2 text-uppercase">Logo</p>
          <file-drag-drop
            v-model="innerAthletic.logo"
            :rules="[required]"
            hide-bottom-space
          />
        </q-card-section>
        <q-card-section>
          <p class="text-subtitle2 text-uppercase">Data de Criação</p>
          <date-picker
            v-model="innerAthletic.created_at"
            :rules="[required]"
            label="Data de Criação"
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
import FileDragDrop from 'src/components/common/FileDragDrop.vue'
import DatePicker from 'src/components/common/DatePicker.vue'
import { ATHLETICS } from 'src/constants/pages'
import { required, validDate } from 'src/utils/rules'

const defaultAhletic = {
  name: '',
  logo: null,
  created_at: ''
}

export default {
  components: { DialogHeader, FileDragDrop, DatePicker },
  props: {
    athletic: Object
  },
  data: () => ({
    headerInfo: {
      title: 'Nova Atlética',
      icon: ATHLETICS.icon
    },
    innerAthletic: { ...defaultAhletic }
  }),
  created () {
    if (this.athletic) Object.assign(this.innerAthletic, this.athletic)
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
    required,
    validDate
  }
}
</script>
