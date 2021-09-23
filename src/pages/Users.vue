<template>
  <q-page padding>
    <page-header v-bind="headerInfo">
      <template #after>
        <div class="row q-gutter-sm">
          <q-input filled label="Pesquise pelo nome" style="width: 300px" dense>
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
    <div
        v-for="user in users"
        :key="user.id"
        class="users-grid"
      >
      <user-card @click.native="openAddUserDialog(user)" :user="user" />
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
    users: [
      {
        id: 1,
        name: 'Nome Sobrenome',
        email: 'emailqualquer@hotmail.com',
        type: 'Tipo de permissão',
        athletic: 'Nome da atlética',
        picture: 'picture1.png'
      }
    ]
  }),
  // async created () {
  //   const { data } = await this.$axios.get('atletica')
  //   this.users = data
  // },
  methods: {
    openAddUserDialog (user) {
      this.$q
        .dialog({
          component: AddUserDialog,
          user
        })
        .onOk(async _user => {
          // if (_user.id) {
          //   Object.assign(athletic, _user)
          // } else {
          //   this.athletics.push({
          //     ..._user,
          //     id: this.athletics.length + 1
          //   })
          // }
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
}

</style>
