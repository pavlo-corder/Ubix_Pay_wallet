<template>
  <main class="start-screen">
    <div class="container">
      <h1>Link to receive 1 ETH</h1>
      <q-input
        v-model="link"
        filled
        autogrow
        type="textarea"
        class="input input--borderDark q-mb-md"
        bottom-slots>
        <template v-slot:append>
          <q-btn
            size="12px"
            round
            flat
            dense
            icon="content_copy" @click="() => copy(link)"></q-btn>
        </template>
      </q-input>

      <div class="row justify-center q-mb-lg">
        <div class="text-center bg-white q-pa-md">
          <qrcode-vue
            :value="link"
            :size="140"
            render-as="svg"/>
        </div>
      </div>

      <a class="btn btn--primary q-mb-sm" @click="() => copy(link)">Copy to clipboard</a>
      <a class="btn q-mb-sm">Save as image</a>
      <a class="btn q-mb-md">Share link</a>

      <a class="btn btn--transparent q-mb-lg">Close</a>
    </div>
  </main>
</template>

<script>
  import { ref } from 'vue'
  import {copyToClipboard, useQuasar} from "quasar";
  import QrcodeVue from "qrcode.vue";

  export default {
      name: "RequestPaymentLink",
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
          link: ref('https://appname.com/send/0x8146ac15542B470770D49Bbd3402741d6febF62Fvalue=1:8146ac15542B47075d4fsf5s95'),
          copy
        }
      }
  }
</script>
