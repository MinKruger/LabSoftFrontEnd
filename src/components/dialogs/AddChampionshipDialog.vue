<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="background: #1B1C30">
      <q-form @submit.prevent="submit">
        <dialog-header :icon="headerIcon" :title="headerTitle">
          <q-btn
            v-if="innerChampionship.id"
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
          <form-field
            v-model="innerChampionship.titulo"
            label="Nome"
            :rules="[required]"
          />
        </q-card-section>
        <q-card-section>
          <form-field
            v-model="innerChampionship.modalidade"
            label="Modalidade"
            :rules="[required]"
          />
        </q-card-section>
        <q-card-section>
          <form-field
            v-model="innerChampionship.descricao"
            label="Descrição"
            input-style="min-height: 7em"
            :rules="[required]"
            autogrow
          />
        </q-card-section>
        <q-card-section>
          <p class="text-subtitle2 text-uppercase text-weight-bold">
            Tipo de Evento
          </p>
          <q-select
            v-model="innerChampionship.tipo"
            :options="typeOptions"
            :rules="[required]"
            class="bg-secondary"
            input-class="form-input"
            popup-content-class="bg-secondary"
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
import { CHAMPIONSHIPS } from 'src/constants/pages'
import { typeOptions } from 'src/constants/championships'
import { required } from 'src/utils/rules'

const defaultChampionship = {
  titulo: '',
  modalidade: '',
  descricao: '',
  tipo: null
}

export default {
  components: { DialogHeader },
  props: {
    championship: Object,
    onDelete: Function
  },
  data: () => ({
    headerIcon: CHAMPIONSHIPS.icon,
    innerChampionship: { ...defaultChampionship },
    typeOptions
  }),
  computed: {
    headerTitle () {
      return this.innerChampionship.id ? 'Editar Campeonato' : 'Nova Campeonato'
    }
  },
  created () {
    if (this.championship) {
      Object.assign(this.innerChampionship, this.championship)
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
      const athletic = this.innerChampionship.id
        ? await this.updateAthletic(this.innerChampionship)
        : await this.storeAthletic(this.innerChampionship)

      this.$emit('ok', athletic)
      this.hide()
    },
    onCancelClick () {
      this.hide()
    },
    async storeChampionship (championship) {
      const { data } = await this.$axios.post('atleticas', championship)

      return data
    },
    async updateChampionship (championship) {
      const { data } = await this.$axios.put(
        `campeonatos/${championship.id}`,
        championship
      )

      return data
    },
    deleteAthletic () {
      this.$q
        .dialog({
          title: 'Excluir Campeonato',
          message: 'Deseja realmente excluir este campeonato?',
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
          await this.$axios.delete(`campeonatos/${this.innerChampionship.id}`)
          this.$q.notify({
            type: 'positive',
            message: 'Campeonato excluída com sucesso.'
          })
          this.onDelete && this.onDelete(this.innerChampionship)
          this.hide()
        })
    },
    // Rules
    required
  }
}
</script>
