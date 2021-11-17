<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="background: #1B1C30">
      <q-form @submit.prevent="submit">
        <dialog-header :icon="headerIcon" :title="headerTitle">
          <q-btn
            v-if="innerMatch.id"
            @click="deleteMatch"
            icon="o_delete_forever"
            class="absolute-top-right"
            color="pink"
            style="top: 10px; right: 10px"
            flat
            round
          />
        </dialog-header>
        <q-card-section class="double-column">
          <div class="field">
            <p class="text-subtitle2 text-uppercase">Campeonato</p>
            <q-select
              v-model="innerMatch.id_campeonato"
              :rules="[required]"
              :options="campeonatoOptions"
              placeholder="Selecione"
              standout="bg-secondary"
              hide-bottom-space
              outlined
              dense
            />
          </div>
          <div class="field">
            <p class="text-subtitle2 text-uppercase">Fase</p>
            <q-select
              v-model="innerMatch.id_fase"
              :rules="[required]"
              :options="faseOptions"
              placeholder="Selecione"
              standout="bg-secondary"
              hide-bottom-space
              outlined
              dense
            />
          </div>
        </q-card-section>
        <q-card-section class="double-column">
          <div class="field">
            <p class="text-subtitle2 text-uppercase">Atlética 1</p>
            <q-select
              v-model="innerMatch.id_time1"
              :rules="[required]"
              :options="atleticaOptions"
              placeholder="Selecione"
              standout="bg-secondary"
              hide-bottom-space
              outlined
              dense
            />
          </div>
          <div class="field">
            <p class="text-subtitle2 text-uppercase">Placar 1</p>
            <q-input
              v-model="innerMatch.placar1"
              mask="###"
              :rules="[required]"
              placeholder="Placar 1"
              standout="bg-secondary"
              hide-bottom-space
              outlined
              dense
            />
          </div>
        </q-card-section>
        <q-card-section class="double-column">
          <div class="field">
            <p class="text-subtitle2 text-uppercase">Atlética 2</p>
            <q-select
              v-model="innerMatch.id_time2"
              :rules="[required]"
              :options="atleticaOptions"
              placeholder="Selecione"
              standout="bg-secondary"
              hide-bottom-space
              outlined
              dense
            />
          </div>
          <div class="field">
            <p class="text-subtitle2 text-uppercase">Placar 2</p>
            <q-input
              v-model="innerMatch.placar2"
              mask="###"
              :rules="[required]"
              placeholder="Placar 1"
              standout="bg-secondary"
              hide-bottom-space
              outlined
              dense
            />
          </div>
        </q-card-section>
        <q-card-section class="double-column">
          <div class="field">
            <p class="text-subtitle2 text-uppercase">Data do jogo</p>
            <date-picker
              v-model="innerMatch.data_jogo"
              :rules="[required]"
              standout="bg-secondary"
              hide-bottom-space
              outlined
              dense
            />
          </div>
          <div class="field">
            <p class="text-subtitle2 text-uppercase">Hora do jogo</p>
            <q-input
              mask="##:##"
              standout="bg-secondary"
              hide-bottom-space
              outlined
              dense
            />
          </div>
        </q-card-section>
        <q-card-section>
          <p class="text-subtitle2 text-uppercase">Local</p>
          <q-input
            v-model="innerMatch.local"
            placeholder="Local do jogo"
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
            :label="innerMatch.id ? 'Salvar' : 'Adicionar'"
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
import DatePicker from 'src/components/common/DatePicker.vue'
import { MATCHES } from 'src/constants/pages'
import { required } from 'src/utils/rules'

const defaultMatch = {
  id: '',
  nome: '',
  foto: null,
  email: '',
  permissao: '',
  id_atletica: '',
  instagram: ''
}

export default {
  components: { DialogHeader, DatePicker },
  props: {
    match: Object,
    athletics: Array,
    championships: Array,
    onDelete: Function
  },
  data: () => ({
    headerIcon: MATCHES.icon,
    innerMatch: { ...defaultMatch },
    permissao: '',
    id_atletica: '',
    faseOptions: ['Grupo', 'Oitavas', 'Quartas', 'Semifinal', 'Final']
  }),
  computed: {
    headerTitle () {
      return this.innerMatch.id ? 'Editar Jogo' : 'Novo Jogo'
    },
    atleticaOptions () {
      return this.athletics.map(e => {
        return {
          label: e.nome,
          value: e.id,
          description: e.nome
        }
      })
    },
    campeonatoOptions () {
      return this.championships.map(e => {
        return {
          label: e.nome,
          value: e.id,
          description: e.nome
        }
      })
    }
  },
  created () {
    if (this.match) {
      Object.assign(this.innerMatch, this.match)

      this.innerMatch.id_campeonato = this.campeonatoOptions.find(e => e.value === this.innerMatch.id_campeonato)

      this.innerMatch.id_time1 = this.atleticaOptions.find(e => e.value === this.innerMatch.id_time1)
      this.innerMatch.id_time2 = this.atleticaOptions.find(e => e.value === this.innerMatch.id_time2)
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
        id_time1: this.innerMatch?.id_time1?.value ? this.innerMatch?.id_time1?.value : '',
        id_time2: this.innerMatch?.id_time2?.value ? this.innerMatch?.id_time2?.value : '',
        data_jogo: this.innerMatch.data_jogo,
        placar1: this.innerMatch.placar1,
        placar2: this.innerMatch.placar2,
        local: this.innerMatch.local,
        id_fase: this.innerMatch.id_fase
      }

      const match = this.innerMatch.id
        ? await this.updateMatch({ payload, id: this.innerMatch.id })
        : await this.storeMatch(payload)

      this.$emit('ok', match)
      this.hide()
    },
    async storeMatch (match) {
      const { data } = await this.$axios.post('jogos', match)

      return data
    },
    async updateMatch ({ payload, id }) {
      const { data } = await this.$axios.put(
        `jogos/${id}`,
        payload
      )

      return data
    },
    onCancelClick () {
      this.hide()
    },
    deleteMatch () {
      this.$q
        .dialog({
          title: 'Excluir Jogo',
          message: 'Deseja realmente excluir este jogo?',
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
          await this.$axios.delete(`jogos/${this.innerMatch.id}`)
          this.$q.notify({
            type: 'positive',
            message: 'Atlética excluída com sucesso.'
          })
          this.onDelete && this.onDelete(this.innerMatch)
          this.hide()
        })
    },
    // Rules
    required
  }
}
</script>
<style scoped lang="scss">
.q-card__section {
  &.double-column {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 16px;
  }
  &.three-columns {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
    gap: 16px;
  }
}
</style>
