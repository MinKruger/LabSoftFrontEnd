<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="background: #1B1C30">
      <q-form @submit.prevent="submit">
        <dialog-header :icon="headerIcon" :title="headerTitle">
          <q-btn
            v-if="innerPartner.id"
            @click="deletePartner"
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
            v-model="innerPartner.nome"
            :rules="[required]"
            placeholder="Nome"
            standout="bg-secondary"
            hide-bottom-space
            outlined
            dense
          />
        </q-card-section>
        <q-card-section>
          <p class="text-subtitle2 text-uppercase">Descrição</p>
          <q-input
            v-model="innerPartner.descricao"
            :rules="[required]"
            placeholder="Digite uma breve descrição"
            standout="bg-secondary"
            input-style="min-height: 5rem"
            hide-bottom-space
            autogrow
            outlined
            dense
          />
        </q-card-section>
        <q-card-section>
          <p class="text-subtitle2 text-uppercase">Logo</p>
          <file-drag-drop
            v-model="innerPartner.logo"
            :rules="[required]"
            hide-bottom-space
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
            :label="innerPartner.id ? 'Salvar' : 'Adicionar'"
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
import { PARTNERS } from 'src/constants/pages'
import { required, validDate } from 'src/utils/rules'

const defaultPartner = {
  nome: '',
  logo: null,
  descricao: ''
}

export default {
  components: { DialogHeader, FileDragDrop },
  props: {
    partner: Object,
    onDelete: Function
  },
  data: () => ({
    headerIcon: PARTNERS.icon,
    innerPartner: { ...defaultPartner }
  }),
  computed: {
    headerTitle () {
      return this.innerPartner.id ? 'Editar Parceiro' : 'Novo Parceiro'
    }
  },
  created () {
    if (this.partner) Object.assign(this.innerPartner, this.partner)
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
      this.innerPartner.logo = this.innerPartner?.logo?.includes('base64')
        ? this.innerPartner.logo.split(',')[1]
        : this.innerPartner.logo

      const partner = this.innerPartner.id
        ? await this.updatePartner(this.innerPartner)
        : await this.storePartner(this.innerPartner)

      this.$emit('ok', partner)
      this.hide()
    },
    onCancelClick () {
      this.hide()
    },
    async storePartner (partner) {
      const { data } = await this.$axios.post('parceiros', partner)

      return data
    },
    async updatePartner (partner) {
      const { data } = await this.$axios.put(`parceiros/${partner.id}`, partner)

      return data
    },
    deletePartner () {
      this.$q
        .dialog({
          title: 'Excluir Parceiro',
          message: 'Deseja realmente excluir este parceiro?',
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
          await this.$axios.delete(`parceiros/${this.innerPartner.id}`)
          this.$q.notify({
            type: 'positive',
            message: 'Atlética excluída com sucesso.'
          })
          this.onDelete && this.onDelete(this.innerPartner)
          this.hide()
        })
    },
    // Rules
    required,
    validDate
  }
}
</script>
