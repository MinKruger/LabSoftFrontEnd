<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin bg-primary">
      <dialog-header :icon="headerIcon" title="Visualizar Campeonato" />
      <q-card-section>
        <p class="text-h6 text-weight-bold ellipsis-2-lines q-mb-xs q-pr-lg">
          {{ championship.titulo }}
        </p>
        <p class="text-body1 text-weight-bold text-grey-4 q-mb-xs">
          {{ championship.ano }}
        </p>
        <p>
          {{ championship.descricao }}
        </p>
        <div class="bg-secondary q-pa-md rounded-borders">
          <div class="flex flex-center">
            <q-img src="championships/trophy.png" width="40px" height="44px" />
            <div class="q-ml-sm text-body1 text-weight-bold">
              Classificação
            </div>
          </div>
          <q-markup-table class="q-mb-sm bg-secondary" flat>
            <thead>
              <tr>
                <th></th>
                <th>
                  Vitórias
                </th>
                <th>
                  Derrotas
                </th>
                <th>
                  Saldo
                </th>
              </tr>
            </thead>
            <tbody>
              <q-tr
                v-for="(participant, index) in participants"
                :key="index"
                class="text-weight-bold"
              >
                <q-td class="text-center">
                  <span :class="`text-${getPositionColor(participant)}`"
                    >{{ participant.posicao }}º</span
                  >
                </q-td>
                <q-td class="text-center">
                  {{ participant.vitorias }}
                </q-td>
                <q-td class="text-center">
                  {{ participant.derrotas }}
                </q-td>
                <q-td class="text-center">
                  {{ participant.saldo }}
                </q-td>
              </q-tr>
            </tbody>
          </q-markup-table>
        </div>
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
    participants: [
      { posicao: 1, vitorias: 10, derrotas: 2, saldo: 8 },
      { posicao: 2, vitorias: 10, derrotas: 2, saldo: 8 },
      { posicao: 3, vitorias: 10, derrotas: 2, saldo: 8 },
      { posicao: 4, vitorias: 10, derrotas: 2, saldo: 8 }
    ]
  }),
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
    onCancelClick () {
      this.hide()
    },
    getPositionColor (participant) {
      switch (participant.posicao) {
        case 1:
          return 'yellow-7'
        case 2:
          return 'blue-grey-4'
        case 3:
          return 'orange-7'
        default:
          return 'grey-4'
      }
    }
  }
}
</script>
