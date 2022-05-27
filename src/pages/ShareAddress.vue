<template>
  <main class="q-pt-md">
    <div class="container">
      <div class="q-mb-md text-center text-desktop-left">
        <p class="text-h6 text-bold q-mb-sm">{{account}}</p>
        <p class="text-subtitle2">Address:</p>
        <p class="text-bold text-h6 text-blue text-wrap">{{wallet}}</p>
      </div>

      <div class="row justify-center flex-desktop-left q-mb-lg">
        <div class="text-center bg-white q-pa-md">
          <qrcode-vue
            :value="'0x8146ac15542B470770D49Bbd3402741d6febF62F'"
            :size="140"
            render-as="svg"/>
        </div>
      </div>

<!--      <a class="btn btn&#45;&#45;primary q-mb-sm" @click="() => copy('something')">Copy to clipboard</a>-->
<!--      <a class="btn q-mb-sm">Save as image</a>-->
<!--      <a class="btn q-mb-md">Share link</a>-->

      <router-link to="/accounts" class="btn btn--transparent q-mb-lg">Close</router-link>

    </div>
  </main>
</template>

<script>
  import {copyToClipboard, useQuasar} from "quasar";
  import QrcodeVue from 'qrcode.vue'

  export default {
    name: "ShareAddress",
    components: {QrcodeVue},
    setup() {

      const $q = useQuasar()

      function copy(text) {
        copyToClipboard(text)
        $q.notify({
          message: 'Copied to clipboard!'
        })
      }

      return {
        identifiers: [
          {
            socialNetwork: 'telegram',
            id: '@telegram_acc'
          },
          {
            socialNetwork: 'instagram',
            id: '@insta_acc'
          },
          {
            socialNetwork: 'twitter',
            id: '@twitter_acc'
          }
        ],
        copied: false,
        copy,
      }
    },
    data(){
      return{
        account: '',
        wallet: ''
      }
    },
    mounted(){
      console.log(this.$route.query)
      this.account = this.$route.query.account
      this.wallet = this.$route.query.wallet
    }
  }
</script>
