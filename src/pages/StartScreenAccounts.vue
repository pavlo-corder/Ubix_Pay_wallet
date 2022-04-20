<template>
  <main class="start-screen">
    <div class="container desktop-2-cols-container">
      <div>
        <!-- Persons carousel -->
        <q-carousel
          v-model="carousel"
          swipeable
          animated
          control-type="outline"
          control-color="blue"
          transition-prev="jump-right"
          transition-next="jump-left"
          class="start-screen__carousel">
          <q-carousel-slide :name="0" class="start-screen__slide">
            <q-card flat class="start-screen__person">
              <q-item class="q-pa-none">
                <q-item-section>
                  <q-item-label caption>name</q-item-label>
                  <q-item-label class="text-h6 text-bold q-mb-sm">Mr. Evil Genius</q-item-label>
                  <q-item-label caption>Social networks linked:</q-item-label>
                  <q-item-label class="text-body2">0</q-item-label>
                  <q-item-label>
                    <a href="#" class="link--big">Setup your person</a>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-card>
          </q-carousel-slide>
          <q-carousel-slide :name="1" class="start-screen__slide">
            <q-card flat class="start-screen__person">
              <q-item class="q-pa-none">
                <q-item-section>
                  <q-item-label caption>name</q-item-label>
                  <q-item-label class="text-h6 text-bold q-mb-sm">Mr. Elton John</q-item-label>
                  <q-item-label caption>Social networks linked:</q-item-label>
                  <q-item-label class="text-body2">1</q-item-label>
                  <q-item-label>
                    <a href="#" class="link--big">Setup your person</a>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-card>
          </q-carousel-slide>
          <q-carousel-slide :name="2" class="start-screen__slide">
            <q-card flat class="start-screen__person">
              <q-item class="q-pa-none">
                <q-item-section>
                  <q-item-label caption>name</q-item-label>
                  <q-item-label class="text-h6 text-bold q-mb-sm">Mr. John Doe</q-item-label>
                  <q-item-label caption>Social networks linked:</q-item-label>
                  <q-item-label class="text-body2">2</q-item-label>
                  <q-item-label>
                    <a href="#" class="link--big">Setup your person</a>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-card>
          </q-carousel-slide>

          <div class="q-pt-md">
            <q-carousel-control position="bottom" :offset="[8,8]" class="start-screen__carousel"/>
          </div>
        </q-carousel>
        <!-- Persons carousel navigation -->
        <div class="row justify-center q-my-md">
          <q-option-group
            v-model="carousel"
            :options="carouselOptions"
            color="primary"
            inline dense/>
        </div>

        <!-- Person add buttons -->

        <a class="btn q-mb-md" @click="createAccount">Add another person</a>
      </div>

      <div>
        <!-- Account controls -->
        <div class="row items-center q-mb-md q-gutter-sm">
          <q-select
            v-model="currency"
            filled
            :options="currencyOptions"
            behavior="menu"
            class="input input--borderDark col-auto"/>
          <q-select
            v-model="account"
            filled
            :options="accountsOptions"
            behavior="menu"
            class="input input--borderDark col-grow"/>
          <q-btn round unelevated color="primary" :icon="matAdd"/>
        </div>
      </div>

      <div>
        <h1 class="q-mt-lg q-mb-md">Send</h1>

        <!-- Wallet -->
        <p class="text-subtitle2 text-bold q-mb-sm">Walletubix-1</p>
        <q-field
          class="input input--borderDark full-width"
          filled
          :icon-right="matIosShare">
          <template v-slot:append>
            <q-icon :name="matIosShare"/>
          </template>
          <template v-slot:control>
            Address
          </template>
        </q-field>

        <div class="row q-my-sm q-gutter-sm">
          <a class="btn col" @click="showNotifPositive">Send</a>
          <a class="btn col" @click="showNotifNegative">Receive</a>
          <a class="btn col" @click="showNotifInfo">Link</a>
        </div>

        <!-- Tokens list -->
        <q-list class="q-pb-md">
          <q-item class="q-pl-none">
            <q-item-section side>
              <q-avatar rounded size="56px" color="blue-transparent" text-color="blue-light">
                U
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Balance:</q-item-label>
              <q-item-label class="text-subtitle2 text-bold">65,458 UBX</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn round unelevated color="grey-gradient" text-color="dark" :icon="matChevronRight"/>
            </q-item-section>
          </q-item>
          <q-item class="q-pl-none">
            <q-item-section side>
              <q-avatar rounded size="56px" color="blue-transparent" text-color="blue-light">
                <q-icon name="img:https://cdn.cdnlogo.com/logos/e/39/ethereum.svg"/>
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Balance:</q-item-label>
              <q-item-label class="text-subtitle2 text-bold">65,458 UBX</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn round unelevated color="grey-gradient" text-color="dark" :icon="matChevronRight"/>
            </q-item-section>
          </q-item>
          <q-item class="q-pl-none">
            <q-item-section side>
              <q-avatar rounded size="56px" color="blue-transparent" text-color="blue-light">
                <q-icon name="img:https://cdn.cdnlogo.com/logos/e/39/ethereum.svg"/>
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Balance:</q-item-label>
              <q-item-label class="text-subtitle2 text-bold">65,458 UBX</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn round unelevated color="grey-gradient" text-color="dark" :icon="matChevronRight"/>
            </q-item-section>
          </q-item>
        </q-list>

        <a class="btn btn--primary q-mb-lg" @click="importToken">Import tokens</a>
      </div>
    </div>
  </main>
</template>

<script>
  import { ref } from 'vue'
  import {matAdd, matIosShare, matChevronRight} from '@quasar/extras/material-icons'
  import { useQuasar } from 'quasar'
  import ImportToken from "components/ImportToken";
  import AddAccount from "components/AddAccount";

  export default {
    name: "StartScreen",
    created() {
      this.matAdd = matAdd
      this.matIosShare = matIosShare
      this.matChevronRight = matChevronRight
    },
    setup() {
      const $q = useQuasar()

      function createAccount () {
        $q.dialog({
          component: AddAccount
        }).onOk(() => {
          // console.log('OK')
        }).onCancel(() => {
          // console.log('Cancel')
        }).onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })
      }

      function importToken () {
        $q.dialog({
          component: ImportToken
        }).onOk(() => {
          // console.log('OK')
        }).onCancel(() => {
          // console.log('Cancel')
        }).onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })
      }

      function showNotifPositive() {
        $q.notify({
          //needs sanitizing!!!
          message: 'Transaction status: <span class="notification__msg notification__msg--positive">success</span>',
          html: true
        })
      }

      function showNotifNegative() {
        $q.notify({
          //needs sanitizing!!!
          message: 'Transaction status: <span class="notification__msg notification__msg--negative">fail</span>',
          html: true
        })
      }

      function showNotifWarning() {
        $q.notify({
          //needs sanitizing!!!
          message: 'Transaction status: <span class="notification__msg notification__msg--warning">warning</span>',
          html: true
        })
      }

      function showNotifInfo() {
        $q.notify({
          //needs sanitizing!!!
          message: 'Transaction status: <span class="notification__msg notification__msg--info">info</span>',
          html: true
        })
      }

      return {
        currency: ref('ETH'),
        currencyOptions: ['ETH', 'ETH1', 'ETH2'],
        carousel: ref(0),
        carouselOptions: [
            {
              label: '',
              value: 0
            },
            {
              label: '',
              value: 1
            },
            {
              label: '',
              value: 2
            }
          ],
        account: ref('Account 1'),
        accountsOptions: ['Account 1', 'Account 2', 'Account 3'],
        createAccount,
        importToken,
        showNotifPositive,
        showNotifNegative,
        showNotifWarning,
        showNotifInfo
      }
    }
  }
</script>
