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
import { useStore } from "vuex";
import { useQuasar } from "quasar";

import bip39 from "../assets/libs/bip39.min.js";
import hdkey from "../assets/libs/hdkey.min.js";
import { validationPhrase } from "src/helper/ethers-interact";

export default {
  name: "CreateWalletStep2",
  setup() {
    const $store = useStore();
    const $q = useQuasar();

    return {
      account: $store.state.account.account,
      updateAccount: (val) => $store.commit("account/update", val),
    };
  },
  data() {
    return {
      accounts: [],
      key_account: 0,
      countwords: 12,
      mnemonicPhrase: [],
      password: "",
    };
  },
  methods: {
    generateRandomPhrase() {
      let account = { ...this.account };

      const strength = 128;
      const wordList = eval(bip39.wordlists.english);

      const mnemonic = bip39.generateMnemonic(strength, null, wordList);
      this.mnemonicPhrase = mnemonic.split(" ");

      account.phrase = this.mnemonicPhrase;

      const seed = bip39.mnemonicToSeed(mnemonic, null);

      const hdwallet = hdkey.fromMasterSeed(seed);
      const privateExtendedKey = hdwallet.privateExtendedKey();
      const publicExtendedKey = hdwallet.publicExtendedKey();

      account.privateExtendedKey = privateExtendedKey;
      account.publicExtendedKey = publicExtendedKey;
      account.confirmPhrase = false;

      this.updateAccount(account);
    },
    savePhrase() {
      if (validationPhrase(this.mnemonicPhrase)) {
        this.accounts[this.key_account].phrase = this.mnemonicPhrase;
        localStorage.setItem("accounts", JSON.stringify(this.accounts));
        this.$router.push("/createwalletstep3");
      }
    },
    showAlertSkip() {
      this.$q.notify({
        message:
          'Transaction status: <span class="notification__msg notification__msg--positive">success</span>',
        html: true,
      });
    },
  },
  mounted() {
    let key_account = localStorage.getItem("key_account");
    if (key_account) {
      this.key_account = key_account;
    }
    let accounts = JSON.parse(localStorage.getItem("accounts"));
    if (accounts) {
      this.accounts = accounts;
    }
    this.generateRandomPhrase();
  },
};
</script>
