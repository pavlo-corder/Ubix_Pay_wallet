<template>
  <q-layout class="layout__root">
    <q-header>
      <q-toolbar class="header">
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        /> -->
          <a href="/" class="header__logo">
            <img src="~/assets/images/logo.svg" alt="UbixPay">
          </a>
          <a href="/" class="header__invite">+ Invite a friend</a>
      </q-toolbar>
    </q-header>

    <!-- <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer> -->

    <q-page-container class="layout__main">
      <router-view />
    </q-page-container>
    <!-- footer -->
    <footer class="footer footer--terms">
      <div class="container">
        <p>© 2020 Ubix pay </p>
      </div>
    </footer>
    <!-- footer -->
  </q-layout>
</template>

<script>
// import EssentialLink from 'components/EssentialLink.vue'

// const linksList = [
//   {
//     title: 'Docs',
//     caption: 'quasar.dev',
//     icon: 'school',
//     link: 'https://quasar.dev'
//   },
//   {
//     title: 'Github',
//     caption: 'github.com/quasarframework',
//     icon: 'code',
//     link: 'https://github.com/quasarframework'
//   },
//   {
//     title: 'Discord Chat Channel',
//     caption: 'chat.quasar.dev',
//     icon: 'chat',
//     link: 'https://chat.quasar.dev'
//   },
//   {
//     title: 'Forum',
//     caption: 'forum.quasar.dev',
//     icon: 'record_voice_over',
//     link: 'https://forum.quasar.dev'
//   },
//   {
//     title: 'Twitter',
//     caption: '@quasarframework',
//     icon: 'rss_feed',
//     link: 'https://twitter.quasar.dev'
//   },
//   {
//     title: 'Facebook',
//     caption: '@QuasarFramework',
//     icon: 'public',
//     link: 'https://facebook.quasar.dev'
//   },
//   {
//     title: 'Quasar Awesome',
//     caption: 'Community Quasar projects',
//     icon: 'favorite',
//     link: 'https://awesome.quasar.dev'
//   }
// ]

// import { defineComponent, ref } from 'vue'

export default ({
  name: 'MainLayout',

  // components: {
  //   EssentialLink
  // },

  setup () {
    // const leftDrawerOpen = ref(false)

    // return {
    //   essentialLinks: linksList,
    //   leftDrawerOpen,
    //   toggleLeftDrawer () {
    //     leftDrawerOpen.value = !leftDrawerOpen.value
    //   }
    // }
  }
})
</script>
