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
                <th>
                  #
                </th>
                <th>
                  Atlética
                </th>
                <th>
                  Pontuação
                </th>
              </tr>
            </thead>
            <tbody v-if="participants.length > 0">
              <q-tr
                v-for="(participant, index) in participants"
                :key="index"
                class="text-weight-bold"
              >
                <q-td class="text-center">
                  <span :class="`text-${getPositionColor(participant)}`">
                    {{ index + 1 }}º
                  </span>
                </q-td>
                <q-td class="text-center">
                  {{ participant['atletica.nome'] }}
                </q-td>
                <q-td class="text-center">
                  {{ participant.pontuacao }}
                  <q-btn
                    v-if="$store.getters['auth/isDCE']"
                    size="xs"
                    icon="edit"
                    round
                    flat
                  >
                    <q-menu @show="score = participant.pontuacao">
                      <q-card class="bg-secondary">
                        <q-form @submit="updateScore(participant)">
                          <q-card-section class="row q-gutter-x-sm">
                            <q-input
                              v-model.number="score"
                              :rules="[
                                val => required(val, { allowZero: true })
                              ]"
                              style="width: 75px"
                              standout="bg-secondary"
                              class="bg-secondary"
                              input-class="form-input"
                              hide-bottom-space
                              outlined
                              dense
                            />
                            <div>
                              <q-btn
                                type="submit"
                                label="Salvar"
                                color="blue"
                                padding="sm md"
                                class="text-weight-bold"
                              />
                            </div>
                          </q-card-section>
                        </q-form>
                      </q-card>
                    </q-menu>
                  </q-btn>
                </q-td>
              </q-tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="3" class="text-center">
                  Nenhum participante
                </td>
              </tr>
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
        <q-btn
          v-if="$store.getters['auth/isDCE']"
          @click="editParticipants"
          color="blue"
          label="Editar Participantes"
          padding="sm md"
          class="text-weight-bold"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import DialogHeader from 'src/components/common/DialogHeader.vue'

import { CHAMPIONSHIPS } from 'src/constants/pages'
import { required } from 'src/utils/rules'
import AddChampionshipParticipantDialog from './AddChampionshipParticipantDialog.vue'

export default {
  components: { DialogHeader },
  props: {
    championship: Object
  },
  data: () => ({
    headerIcon: CHAMPIONSHIPS.icon,
    participants: [],
    score: null
  }),
  async created () {
    this.getParticipants()
  },
  methods: {
    async getParticipants () {
      const { data } = await this.$axios.get('campeonatos/participantes', {
        params: {
          id_campeonato: this.championship.id
        }
      })

      this.participants = data.sort((a, b) => b.pontuacao - a.pontuacao)
    },
    editParticipants () {
      this.$q
        .dialog({
          component: AddChampionshipParticipantDialog,
          championship: this.championship,
          parent: this,
          onUpdate: this.getParticipants
        })
        .onDismiss(this.getParticipants)
    },
    async updateScore (participant) {
      await this.$axios.put(`campeonatos/participantes/${participant.id}`, {
        ...participant,
        pontuacao: this.score
      })

      participant.pontuacao = this.score

      this.$q.notify({
        type: 'positive',
        message: 'Pontuação atualizada com sucesso.'
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
    },
    // Rules
    required
  }
}
</script>
