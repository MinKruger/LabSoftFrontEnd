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
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import DrawerItem from 'components/layout/DrawerItem.vue'
import * as PAGE from 'src/constants/pages'

const drawerLinks = [
  {
    ...PAGE.HOME,
    to: { name: 'Home' }
  },
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
  },
  {
    ...PAGE.USERS,
    to: { name: 'Users' }
  }
]

export default {
  name: 'MainLayout',
  components: { DrawerItem },
  data () {
    return {
      leftDrawerOpen: false,
      drawerLinks
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
