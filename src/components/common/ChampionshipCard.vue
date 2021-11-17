<template>
  <q-card class="championship-card full-height" flat>
    <q-card-section class="relative-position overflow-hidden">
      <p class="text-h6 text-weight-bold ellipsis-2-lines q-mb-xs q-pr-lg">
        {{ championship.nome }}
      </p>
      <p class="text-body1 text-weight-bold text-grey-4 q-mb-xs">
        {{ championship.ano }}
        <q-badge v-bind="modalityProps" class="q-ml-sm" />
      </p>
      <div v-if="$store.getters['auth/isDCE']" class="absolute-top-right">
        <q-btn @click.stop icon="more_vert" size="sm" round flat>
          <q-menu>
            <q-card class="bg-secondary">
              <q-list>
                <q-item @click="editChampionship" clickable>
                  <q-item-section side>
                    <q-icon name="edit" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      Editar
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </q-menu>
        </q-btn>
      </div>
    </q-card-section>
    <q-card-section class="championship-winner text-center">
      <div v-if="championship.vencedor" class="flex flex-center">
        <q-img src="championships/trophy.png" width="40px" height="44px" />
        <div class="q-ml-sm text-left">
          <p class="text-weight-bold text-yellow q-mb-xs">
            Vencedor
          </p>
          <p class="text-weight-bold q-mb-none">
            {{ championship.vencedor }}
          </p>
        </div>
      </div>
      <p v-else class="text-body1">{{ championshipStatus }}</p>
    </q-card-section>
  </q-card>
</template>

<script>
import { statusOptions, modalityColors } from 'src/constants/championships'
import AddChampionshipDialog from '../dialogs/AddChampionshipDialog.vue'

export default {
  name: 'ChampionshipCard',
  props: {
    championship: {
      type: Object,
      required: true
    },
    modalities: Array
  },
  computed: {
    championshipStatus () {
      return statusOptions.find(
        status => status.value === this.championship.status
      )?.label
    },
    modalityProps () {
      return {
        label: this.championship.modalidade.nome,
        color: modalityColors[this.championship.modalidade.nome]
      }
    }
  },
  methods: {
    editChampionship () {
      this.$q
        .dialog({
          component: AddChampionshipDialog,
          championship: this.championship,
          modalities: this.modalities
        })
        .onOk(championship => this.$emit('edit', championship))
    }
  }
}
</script>

<style lang="scss">
.championship-card {
  background: rgba($secondary, 0.5);
  overflow: hidden;

  .championship-winner {
    background: rgba($secondary, 0.7);
  }
}
</style>
