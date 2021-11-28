<template>
  <q-page padding>
    <page-header v-bind="headerInfo">
      <template #after>
        <div class="row q-gutter-sm">
          <q-input
            v-model="search"
            label="Pesquise pelo nome"
            style="width: 300px"
            filled
            dense
          >
            <template #prepend>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn
            v-if="$store.getters['auth/isDCE']"
            @click="() => openAddPartnerDialog()"
            label="Adicionar"
            color="blue"
            class="text-weight-bold q-px-md"
          />
        </div>
      </template>
    </page-header>
    <div class="row q-col-gutter-sm">
      <div
        v-for="partner in filteredPartners"
        :key="partner.id"
        class="col-12 col-sm-6 col-md-4 col-lg-3 "
      >
        <partner-card
          @click.native="openAddPartnerDialog(partner)"
          class="cursor-pointer"
          :partner="partner"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import PageHeader from 'src/components/common/PageHeader.vue'
import PartnerCard from 'src/components/common/PartnerCard.vue'
import AddPartnerDialog from 'src/components/dialogs/AddPartnerDialog.vue'
import { PARTNERS } from 'src/constants/pages'

const sortByOptions = {
  Alfabética: (a, b) =>
    a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' })
}

export default {
  components: { PageHeader, PartnerCard },
  name: 'Partners',
  data: () => ({
    headerInfo: PARTNERS,
    // Filtros
    sortBy: null,
    sortByOptions,
    search: '',
    // Parceiros
    partners: [
      {
        id: 1,
        nome: 'Outback',
        descricao:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec elementum iaculis libero, non consectetur lectus facilisis et. ',
        logo:
          'https://logodownload.org/wp-content/uploads/2016/09/Outback-logo-9.png'
      }
    ]
  }),
  computed: {
    filteredPartners () {
      let partners = [...this.partners]

      if (this.search) {
        partners = partners.filter(partner =>
          partner.nome
            .normalize()
            .toUpperCase()
            .includes(this.search.normalize().toUpperCase())
        )
      }
      if (this.sortBy) partners.sort(sortByOptions[this.sortBy])

      return partners
    }
  },
  methods: {
    async getPartners () {
      const { data } = await this.$axios.get('parceiros')
      this.partners = data
    },
    openAddPartnerDialog (partner) {
      if (!this.$store.getters['auth/isDCE']) return
      this.$q
        .dialog({
          component: AddPartnerDialog,
          partner,
          onDelete: _partner => {
            const index = this.partners.findIndex(a => a.id === _partner.id)
            if (index > -1) this.partners.splice(index, 1)
          }
        })
        .onOk(async _partner => {
          await this.getParners()
        })
    }
  }
}
</script>
