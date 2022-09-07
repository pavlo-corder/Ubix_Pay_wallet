<template>
  <div>
    <main class="create-wallet">
      <div class="container">
        <h1 class="text-center text-desktop-left">Create wallet</h1>

        <div class="stepper create-wallet__stepper flex-desktop-left">
          <div class="stepper__step stepper__step--complete">
            <div class="stepper__circle"></div>
            <span class="stepper__text">Step 1</span>
          </div>
          <div class="stepper__step stepper__step--active">
            <div class="stepper__circle"></div>
            <span class="stepper__text">Step 2</span>
          </div>
          <div class="stepper__step">
            <div class="stepper__circle"></div>
            <span class="stepper__text">Step 3</span>
          </div>
        </div>

        <div class="warning create-wallet__warning">
          Save your secret seed phrase in a safe place and don't share it with
          anyone!
        </div>

        <div class="seed-phrase create-wallet__seed-phrase">
          <div
            v-for="(phrase, key) in mnemonicPhrase"
            :key="key"
            class="seed-phrase__word"
          >
            {{ key + 1 }}. {{ phrase }}
          </div>
        </div>

        <q-btn @click="savePhrase" class="btn btn--primary create-wallet__btn">
          Next
        </q-btn>
      </div>
    </main>
  </div>
</template>
<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

import bip39 from "../assets/libs/bip39.min.js";
import hdkey from "../assets/libs/hdkey.min.js";
import { validationPhrase } from "src/helper/ethers-interact";

import { useRouter } from "vue-router";
export default {
  name: "CreateWalletStep2",
  setup() {
    const store = useStore();
    const router = useRouter();
    const quasar = useQuasar();

    const account = computed(() => store.getters["account/getCurrentAccount"]);

    const mnemonicPhrase = ref([]);

    onMounted(async () => {
      generateRandomPhrase();
    });

    const generateRandomPhrase = () => {
      const strength = 128;
      const wordList = eval(bip39.wordlists.english);

      const mnemonic = bip39.generateMnemonic(strength, null, wordList);
      mnemonicPhrase.value = mnemonic.split(" ");

      account.value.phrase = mnemonicPhrase.value;

      const seed = bip39.mnemonicToSeed(mnemonic, null);

      const hdwallet = hdkey.fromMasterSeed(seed);
      const privateExtendedKey = hdwallet.privateExtendedKey();
      const publicExtendedKey = hdwallet.publicExtendedKey();

      account.value.privateExtendedKey = privateExtendedKey;
      account.value.publicExtendedKey = publicExtendedKey;
      account.value.confirmPhrase = false;

      store.commit("account/update", account.value);
    };

    const savePhrase = () => {
      if (validationPhrase(mnemonicPhrase.value)) {
        account.value.phrase = mnemonicPhrase.value;
        store.commit("account/update", account.value);
        router.push("/createwalletstep3");
      }
    };
    const showAlertSkip = () => {
      quasar.notify({
        message:
          'Transaction status: <span class="notification__msg notification__msg--positive">success</span>',
        html: true,
      });
    };

    return {
      account,
      mnemonicPhrase,
      savePhrase,
      showAlertSkip,
    };
  },
};
</script>
