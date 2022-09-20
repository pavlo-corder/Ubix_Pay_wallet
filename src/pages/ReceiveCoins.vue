<template>
  <main class="q-pt-md">
    <div class="container">
      <div class="q-mb-md text-center text-desktop-left">
        <p class="text-h6 text-bold q-mb-sm">Receive ETH</p>
        <p class="text-subtitle2">ETH Deposit Address:</p>
        <p class="text-bold text-h6 text-blue text-wrap">
          {{ currentWallet?.wallet }}
        </p>
      </div>

      <div class="row justify-center flex-desktop-left q-mb-md q-gutter-md">
        <q-btn
          size="12px"
          round
          flat
          icon="content_copy"
          class="bg-white text-primary"
          @click="() => copy(currentWallet?.wallet)"
        />
        <q-btn
          size="12px"
          round
          flat
          :icon="matIosShare"
          class="bg-white text-primary"
        />
      </div>

      <div class="row justify-center flex-desktop-left q-mb-lg">
        <div class="text-center bg-white q-pa-md">
          <qrcode-vue
            :value="currentWallet?.wallet"
            :size="140"
            render-as="svg"
          />
        </div>
      </div>

      <a class="btn btn--primary q-mb-sm">Request payment</a>
      <a class="btn q-mb-sm">Save as image</a>

      <q-btn class="btn btn--transparent q-mb-lg" to="/">Close</q-btn>
    </div>
  </main>
</template>

<script>
import { matIosShare } from "@quasar/extras/material-icons";
import { copyToClipboard, useQuasar } from "quasar";
import QrcodeVue from "qrcode.vue";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "ReceiveCoins",
  components: { QrcodeVue },
  setup() {
    const quasar = useQuasar();
    const store = useStore();

    const currentWallet = computed(
      () => store.getters["account/getCurrentWallet"]
    );

    function copy(text) {
      copyToClipboard(text);
      quasar.notify({
        message: "Copied to clipboard!",
      });
    }

    return {
      matIosShare,
      copy,
      currentWallet,
    };
  },
};
</script>
