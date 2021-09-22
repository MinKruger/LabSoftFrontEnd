<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="background: #1B1C30">
      <q-form @submit.prevent="submit">
        <dialog-header :icon="headerIcon" :title="headerTitle">
          <q-btn
            v-if="innerAthletic.id"
            @click="deleteAthletic"
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
    athletic: Object,
    onDelete: Function
  },
  data: () => ({
    headerIcon: ATHLETICS.icon,
    innerAthletic: { ...defaultAhletic }
  }),
  computed: {
    headerTitle () {
      return this.innerAthletic.id ? 'Editar Atlética' : 'Nova Atlética'
    }
  },
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
    deleteAthletic () {
      this.$q
        .dialog({
          title: 'Excluir Atlética',
          message: 'Deseja realmente excluir esta atlética?',
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
          this.onDelete && this.onDelete(this.innerAthletic)
          this.hide()
        })
    },
    // Rules
    required,
    validDate
  }
}
</script>
