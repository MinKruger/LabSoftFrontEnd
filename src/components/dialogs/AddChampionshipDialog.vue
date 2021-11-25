<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="background: #1B1C30">
      <q-form @submit.prevent="submit">
        <dialog-header :icon="headerIcon" :title="headerTitle">
          <q-btn
            v-if="innerChampionship.id"
            @click="deleteChampionship"
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
            v-model="innerChampionship.nome"
            label="Nome"
            :rules="[required]"
          />
        </q-card-section>
        <q-card-section>
          <form-field
            v-model.number="innerChampionship.ano"
            label="Ano"
            :rules="[required]"
          />
        </q-card-section>
        <q-card-section>
          <p class="text-subtitle2 text-uppercase text-weight-bold">
            Status
          </p>
          <q-select
            v-model="innerChampionship.status"
            :options="statusOptions"
            :disable="!innerChampionship.id"
            class="bg-secondary"
            input-class="form-input"
            popup-content-class="bg-secondary"
            hide-bottom-space
            map-options
            emit-value
            outlined
            dense
          />
        </q-card-section>
        <q-card-section>
          <p class="text-subtitle2 text-uppercase text-weight-bold">
            Modalidade
          </p>
          <q-select
            v-model="innerChampionship.id_modalidade"
            :options="modalities"
            class="bg-secondary"
            input-class="form-input"
            popup-content-class="bg-secondary"
            option-label="nome"
            option-value="id"
            hide-bottom-space
            map-options
            emit-value
            outlined
            dense
          />
        </q-card-section>
        <q-card-section>
          <p class="text-subtitle2 text-uppercase text-weight-bold">
            Tipo de Evento
          </p>
          <q-select
            v-model="innerChampionship.id_evento"
            :options="events"
            class="bg-secondary"
            input-class="form-input"
            popup-content-class="bg-secondary"
            option-label="nome"
            option-value="id"
            hide-bottom-space
            map-options
            emit-value
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
            label="Salvar"
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
import { AWAITING, statusOptions } from 'src/constants/championships'
import { required } from 'src/utils/rules'

const defaultChampionship = {
  nome: '',
  id_modalidade: null,
  id_evento: null,
  ano: null,
  status: AWAITING
}

export default {
  components: { DialogHeader },
  props: {
    championship: Object,
    onDelete: Function,
    modalities: Array
  },
  data: () => ({
    headerIcon: CHAMPIONSHIPS.icon,
    innerChampionship: { ...defaultChampionship },
    statusOptions,
    events: []
  }),
  computed: {
    headerTitle () {
      return this.innerChampionship.id ? 'Editar Campeonato' : 'Novo Campeonato'
    }
  },
  async created () {
    if (this.championship) {
      Object.assign(this.innerChampionship, this.championship)
    }
    await this.getEvents()
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
    async getEvents () {
      const { data } = await this.$axios.get('eventos')

      this.events = data
    },
    async submit () {
      const championship = this.innerChampionship.id
        ? await this.updateChampionship(this.innerChampionship)
        : await this.storeChampionship(this.innerChampionship)

      this.$emit('ok', championship)
      this.hide()
    },
    onCancelClick () {
      this.hide()
    },
    async storeChampionship (championship) {
      const { data } = await this.$axios.post('campeonatos', championship)

      this.$q.notify({
        type: 'positive',
        message: 'Campeonato cadastrado com sucesso.'
      })

      return data
    },
    async updateChampionship (championship) {
      const { data } = await this.$axios.put(
        `campeonatos/${championship.id}`,
        championship
      )

      this.$q.notify({
        type: 'positive',
        message: 'Campeonato atualizado com sucesso.'
      })

      return data
    },
    deleteChampionship () {
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
