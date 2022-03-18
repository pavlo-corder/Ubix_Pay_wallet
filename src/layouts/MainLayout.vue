<template>
  <q-layout class="layout__root">
    <q-header class="z-top">
      <q-toolbar class="header">
        <!-- back btn -->
        <div v-if="false" class="header__back">
          <div class="header__backIcon"/>
          <div class="header__backText">Back</div>
        </div>
        <!-- logo -->
        <a href="/" class="header__logo">
          <img src="~/assets/images/logo.svg" alt="UbixPay">
        </a>
        <a href="/" class="header__invite">+ Invite a friend</a>
        <!-- menu -->
        <div :class="`burger ${drawer ? 'burger--close' : ''}`" @click="drawer = !drawer">
          <div class="burger__line"></div>
          <div class="burger__line"></div>
          <div class="burger__line"></div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      overlay
      side="right"
      :breakpoint="500"
    >
      <q-list class="drawer">
        <q-item>
          <q-item-section>
            <a href="#">
              <span class="link--big link--noUnderline">Support</span>
            </a>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <a href="#">
              <span class="link--big link--noUnderline">Backup seed phrase</span>
            </a>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <a href="#">
              <span class="link--big link--noUnderline">A link in several lines to check the interlineation</span>
            </a>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <a href="#">
              <span class="link--big link--noUnderline">Link</span>
            </a>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

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

import {ref} from 'vue'

export default ({
  name: 'MainLayout',

  setup () {
    const drawer = ref(false)

    return {
      drawer
    }
  }
})
</script>
