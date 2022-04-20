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

          <div :class="`burger ${drawer ? 'burger--close' : ''}`"
               @click="toggleDrawer">
            <div class="burger__line"></div>
            <div class="burger__line"></div>
            <div class="burger__line"></div>
          </div>
      </q-toolbar>
    </q-header>

    <q-drawer
        class="drawer"
        v-model="drawer"
        overlay
        side="right"
        :breakpoint="500"
      >
        <q-list class="drawer__list">
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

import {ref} from 'vue'

export default ({
  name: 'MainLayout',

  setup () {
    const drawer = ref(false)

    function toggleDrawer() {
      drawer.value = !drawer.value;
    }

    return {
      drawer,
      toggleDrawer,
    }
  }
})
</script>
