<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-drawer"
      :width="275"
    >
      <div class="text-center">
        <q-img src="logo.png" width="50%" />
      </div>
      <q-list class="q-pa-md">
        <drawer-item
          v-for="link in drawerLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-btn
          v-if="isAuth"
          @click="logout"
          label="Sair"
          flat
          color="white"
          class="q-mt-sm text-weight-bold q-px-md full-width"
        />
        <template v-else>
          <q-btn
            :to="{ name: 'Login' }"
            label="Entrar"
            flat
            color="white"
            class="q-mt-sm text-weight-bold q-px-md full-width"
          />
          <q-btn
            :to="{ name: 'Signup' }"
            label="Registrar-se"
            flat
            color="white"
            class="q-mt-sm text-weight-bold q-px-md full-width"
          />
        </template>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import DrawerItem from 'components/layout/DrawerItem.vue'
import * as PAGE from 'src/constants/pages'

export default {
  name: 'MainLayout',
  components: { DrawerItem },
  computed: {
    ...mapGetters({
      isAuth: 'auth/isAuthenticated',
      isDCE: 'auth/isDCE'
    }),
    drawerLinks () {
      const links = [
        {
          ...PAGE.HOME,
          to: { name: 'Home' }
        }
      ]

      if (this.isAuth) {
        links.push(
          {
            ...PAGE.ATHLETICS,
            to: { name: 'Athletics' }
          },
          {
            ...PAGE.CHAMPIONSHIPS,
            to: { name: 'Championships' }
          },
          {
            ...PAGE.MATCHES,
            to: { name: 'Matches' }
          },
          {
            ...PAGE.PLAYERS,
            to: { name: 'Players' }
          },
          {
            ...PAGE.NEWS,
            to: { name: 'News' }
          },
          {
            ...PAGE.PARTNERS,
            to: { name: 'Partners' }
          }
        )
      }

      if (this.isDCE) {
        links.push({
          ...PAGE.USERS,
          to: { name: 'Users' }
        })
      }

      return links
    },
    leftDrawerOpen: {
      get () {
        return this.$store.getters['layout/getLeftDrawerOpen']
      },
      set (val) {
        this.$store.commit('layout/setLeftDrawerOpen', val)
      }
    }
  },
  methods: {
    async logout () {
      await this.$store.dispatch('auth/logout')
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style lang="scss">
.bg-drawer {
  background: rgba($secondary, 0.7);
}

* {
  font-family: $font;
}
</style>
