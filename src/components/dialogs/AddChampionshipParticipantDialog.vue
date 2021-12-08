<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin bg-primary">
      <dialog-header :icon="headerIcon" title="Adicionar Participante" />
      <q-card-section>
        <q-list>
          <q-item v-for="athletic in athletics" :key="athletic.id">
            <q-item-section>
              {{ athletic.nome }}
            </q-item-section>
            <q-item-section side>
              <q-btn
                v-if="isParticipant(athletic)"
                @click="removeParticipant(athletic)"
                icon="close"
                color="negative"
                flat
                round
              >
                <q-tooltip content-class="bg-secondary">
                  Remover Participante
                </q-tooltip>
              </q-btn>
              <q-btn
                v-else
                @click="addParticipant(athletic)"
                icon="check"
                color="positive"
                flat
                round
              >
                <q-tooltip content-class="bg-secondary">
                  Adicionar Participante
                </q-tooltip>
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-actions align="right" class="q-pa-md">
        <q-btn
          @click="hide"
          color="white"
          label="Fechar"
          padding="sm md"
          class="text-weight-bold"
          outline
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import DialogHeader from 'src/components/common/DialogHeader.vue'

import { CHAMPIONSHIPS } from 'src/constants/pages'

export default {
  components: { DialogHeader },
  props: {
    championship: Object
  },
  data: () => ({
    headerIcon: CHAMPIONSHIPS.icon,
    participants: [],
    athletics: []
  }),
  async created () {
    await Promise.allSettled([this.getParticipants(), this.getAthletics()])
  },
  methods: {
    async getParticipants () {
      const { data } = await this.$axios.get('campeonatos/participantes', {
        params: {
          id_campeonato: this.championship.id
        }
      })

      this.participants = data
    },
    async getAthletics () {
      const { data } = await this.$axios.get('atleticas')

      this.athletics = data
    },
    isParticipant (athletic) {
      return (
        this.participants.findIndex(
          participant => participant.id_atletica === athletic.id
        ) > -1
      )
    },
    async addParticipant (athletic) {
      const participant = {
        pontuacao: 0,
        ids_atleticas: [athletic.id],
        id_campeonato: this.championship.id
      }

      await this.$axios.post('campeonatos/participantes', participant)
      await this.getParticipants()

      this.$q.notify({
        type: 'positive',
        message: 'Participante adicionado com sucesso.'
      })
    },
    async removeParticipant (athletic) {
      const participant = this.participants.find(
        participant => participant.id_atletica === athletic.id
      )

      await this.$axios.delete(`campeonatos/participantes/${participant.id}`)
      await this.getParticipants()

      this.$q.notify({
        type: 'positive',
        message: 'Participante removido com sucesso.'
      })
    },
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    onDialogHide () {
      this.$emit('hide')
    },
    onCancelClick () {
      this.hide()
    }
  }
}
</script>
