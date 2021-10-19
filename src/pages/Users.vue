<template>
  <q-page padding>
    <page-header v-bind="headerInfo">
      <template #after>
        <div class="row q-gutter-sm">
          <q-input filled v-model="search" label="Pesquise pelo nome" style="width: 300px" dense>
            <template #prepend>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn
            @click="() => openAddUserDialog()"
            label="Adicionar"
            color="blue"
            class="text-weight-bold q-px-md"
          />
        </div>
      </template>
    </page-header>
    <div class="users-grid">
      <div
        v-for="user in filteredUsers"
        :key="user.id"
        class="col-6 col-sm-4 col-md-2 col-xl-1"
      >
      <user-card @click.native="openAddUserDialog(user)" :user="user" :athletics="athletics" />
      </div>
    </div>
  </q-page>
</template>

<script>
import PageHeader from 'src/components/common/PageHeader.vue'
import UserCard from 'src/components/common/UserCard'
import { USERS } from 'src/constants/pages'
import AddUserDialog from 'src/components/dialogs/AddUserDialog.vue'

export default {
  components: { PageHeader, UserCard },
  name: 'Users',
  data: () => ({
    headerInfo: USERS,
    users: [],
    athletics: [],
    search: ''
  }),
  async created () {
    await this.getAthletics()
    await this.getUsers()
  },
  computed: {
    filteredUsers () {
      let users = [...this.users]

      if (this.search) {
        users = users.filter(athletic =>
          athletic.nome.includes(this.search)
        )
      }

      return users
    }
  },
  methods: {
    async getUsers () {
      const { data } = await this.$axios.get('usuarios')
      this.users = data.filter(e => e.permissao !== 'aluno')
    },
    async getAthletics () {
      const { data } = await this.$axios.get('atleticas')
      this.athletics = data
    },
    openAddUserDialog (user) {
      this.$q
        .dialog({
          component: AddUserDialog,
          user,
          athletics: this.athletics,
          onDelete: _user => {
            const index = this.users.findIndex(a => a.id === _user.id)
            if (index > -1) this.users.splice(index, 1)
          }
        })
        .onOk(async _user => {
          await this.getUsers()
        })
    }
  }
}
</script>

<style scoped lang="scss">
.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(209px, 1fr));
  gap: 16px;
  padding-bottom: 20px;
}

</style>
