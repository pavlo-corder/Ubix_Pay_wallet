<template>
  <div>
    <main class="import">
      <div class="container">
        <h1>
          You can import your wallet by filling in your secret seed-phrase:
        </h1>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <div class="import__grid">
            <div class="import__grid--left">
              <div
                v-for="(tg1, key) in text_group_1"
                :key="key"
                class="import__inputWrap"
              >
                <input-phrase
                  :number="key"
                  :phrase="tg1.value"
                  :isPassword="true"
                  @phrase="phraseFromInput"
                ></input-phrase>
              </div>
            </div>
            <div class="import__grid--right">
              <div
                v-for="(tg2, key) in text_group_2"
                :key="key"
                class="import__inputWrap"
              >
                <input-phrase
                  :number="key + 6"
                  :phrase="tg2.value"
                  :isPassword="true"
                  @phrase="phraseFromInput"
                ></input-phrase>
              </div>
            </div>
          </div>
          <q-input
            v-model="model_password"
            lazy-rules
            :rules="[
              (val) => (val !== null && val !== '') || 'The required field',
              (val) => val.length >= 8 || 'Please use maximum 8 characters',
            ]"
            class="input-password"
            filled
            :type="isPwd ? 'password' : 'text'"
            label="New password"
          />
          <q-input
            v-model="model_confirmpassword"
            lazy-rules
            :rules="[
              (val) => (val !== null && val !== '') || 'The required field',
              (val) => val.length >= 8 || 'Please use maximum 8 characters',
              (val) => val == model_password || 'Different passwords',
            ]"
            label="Confirm password"
            filled
            class="input-password"
            :type="isPwd2 ? 'password' : 'text'"
          />
          <button
            style="width: calc(100% - 16px)"
            class="btn btn--primary import__btn"
          >
            Import
          </button>
          <router-link to="/" class="btn q-mt-lg">Cancel</router-link>
        </q-form>
      </div>
    </main>
  </div>
</template>
<script>
import { useStore } from "vuex";
import InputPhrase from "components/InputPhrase";
import {
  createWalletFromMnenomic,
  validationPhrase,
} from "../helper/ethers-interact";
export default {
  name: "Import",
  components: {
    InputPhrase,
  },
  setup() {
    const $store = useStore();
    return {
      account: $store.state.account.account,
      updateAccount: (val) => $store.commit("account/update", val),
      updateWallets: (val) => $store.commit("account/updateWallets", val),
      updateCurrentWallet: (val) =>
        $store.commit("account/updateCurrentWallet", val),
      updateCurrentBlockchain: (val) =>
        $store.commit("account/updateCurrentBlockchain", val),
    };
  },
  data() {
    return {
      mnemonicPhrase: [],
      count_phrase: 12,
      text_group_1: [
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" },
      ],
      text_group_2: [
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" },
      ],
      model_password: "",
      model_confirmpassword: "",
      isPwd: true,
      isPwd2: true,
    };
  },
  methods: {
    phraseFromInput(data) {
      if (data.number <= 5) {
        this.text_group_1[data.number].value = data.phrase;
      }
      if (data.number >= 6 && data.number <= 11) {
        this.text_group_2[data.number - 6].value = data.phrase;
      }
    },
    onSubmit() {
      this.mnemonicPhrase = [];
      this.text_group_1.forEach((item) => {
        this.mnemonicPhrase.push(item.value);
      });
      this.text_group_2.forEach((item) => {
        this.mnemonicPhrase.push(item.value);
      });
      if (validationPhrase(this.mnemonicPhrase)) {
        let account = { ...this.account };
        account.phrase = this.mnemonicPhrase;
        account.password = this.model_password;
        account.confirmPhrase = true;
        this.updateAccount(account);
        this.updateCurrentBlockchain(account.blockchains[0]);
        this.createWallet();
        this.$router.push("/setupperson");
      } else {
        alert("Invalid Mnenomic");
      }
    },
    onReset() {},
    createWallet() {
      const createdEthWallet = createWalletFromMnenomic(
        this.account.phrase,
        0,
        60
      );
      const createdUBXWallet = createWalletFromMnenomic(
        this.account.phrase,
        0,
        713
      );

      this.updateWallets(createdEthWallet);
      this.updateWallets(createdUBXWallet);
    },
  },
};
</script>
