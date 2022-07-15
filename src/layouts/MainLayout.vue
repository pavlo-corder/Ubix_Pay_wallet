<template>
  <q-layout class="layout__root">
    <q-header class="z-top">
      <q-toolbar class="header">
        <!-- back btn -->
        <a v-show="btnBack" @click="backRoute" class="header__back">
          <div class="header__backIcon"/>
          <div class="header__backText">Back</div>
        </a>

        <!-- logo -->
        <a v-show="!btnBack" href="/" class="header__logo">
          <img src="~/assets/images/logo.svg" alt="UbixPay">
        </a>
        <a v-show="!btnBack" href="/" class="header__invite">+ Invite a friend</a>
        <!-- menu -->

          <div v-show="!btnBack" :class="`burger ${drawer ? 'burger--close' : ''}`"
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
      <router-view
        :account="account"
        :accounts="accounts"
      />
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
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'
import {useStore} from "vuex";

export default ({
  name: 'MainLayout',
  data(){
    return{
      btnBack: false,
      btnBackRoute: '/'
    }
  },
  methods:{
    backRoute(){
      console.log('clickRouteBack')
      let routBack = this.btnBackRoute
      console.log('routBack', routBack)
      this.btnBack = false
      this.$router.push({ path: '/' })
      // this.$router.push(routBack)
    }
  },
  setup () {
    const $q = useQuasar()
    const drawer = ref(false)
    const $store = useStore()
    // const router = useRouter()

    function toggleDrawer() {
      drawer.value = !drawer.value;
    }


    return {
      account: $store.state.account.account,
      accounts: $store.state.account.accounts,
      current_wallet: $store.state.wallet.current_wallet,
      drawer,
      toggleDrawer,
    }
  },
  mounted(){
    this.$global.$on('BTN_BACK', (data) => {
      // console.log(data)
      if(data.btn_back){
        this.btnBack = true
      }
      if(data.route){
        this.btnBackRoute = data.route
      }

    })
  }
})
</script>
