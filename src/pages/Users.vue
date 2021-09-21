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
    <div class="row q-col-gutter-sm">
      <div
        v-for="user in users"
        :key="user.id"
        class="col-6 col-sm-4 col-md-2 col-xl-1"
      >
        <user-card @click.native="openAddUserDialog(user)" :user="user" />
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
    users: [{ id: 1, name: 'Bernardo' }]
  }),
  async created () {
    const { data } = await this.$axios.get('atletica')
    this.users = data
  },
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
