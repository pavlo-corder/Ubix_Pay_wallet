<template>
  <main class="q-pt-md">
    <div class="container">
      <div class="q-mb-md text-center text-desktop-left">
        <p class="text-h6 text-bold q-mb-sm">Receive ETH</p>
        <p class="text-subtitle2">ETH Deposit Address:</p>
        <p class="text-bold text-h6 text-blue text-wrap">0x8146ac15542B470770D49Bbd3402741d6febF62F</p>
      </div>

      <div class="row justify-center flex-desktop-left q-mb-md q-gutter-md">
        <q-btn
          size="12px"
          round
          flat
          icon="content_copy"
          class="bg-white text-primary"
          @click="() => copy('something')"/>
        <q-btn
          size="12px"
          round
          flat
          :icon="matIosShare"
          class="bg-white text-primary"/>
      </div>

      <div class="row justify-center flex-desktop-left q-mb-lg">
        <div class="text-center bg-white q-pa-md">
          <qrcode-vue
            :value="'0x8146ac15542B470770D49Bbd3402741d6febF62F'"
            :size="140"
            render-as="svg"/>
        </div>
      </div>

      <a class="btn btn--primary q-mb-sm">Request payment</a>
      <a class="btn q-mb-sm">Save as image</a>

      <a class="btn btn--transparent q-mb-lg">Close</a>

    </div>
  </main>
</template>

<script>
  import {matIosShare} from '@quasar/extras/material-icons'
  import {copyToClipboard, useQuasar} from "quasar";
  import QrcodeVue from 'qrcode.vue'

  export default {
    name: "ReceiveCoins",
    components: {QrcodeVue},
    created() {
      this.matIosShare = matIosShare
    },
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
        copy
      }
    }
  }
</script>
