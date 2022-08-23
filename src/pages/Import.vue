<template>
  <div>
    <main class="import">
      <div class="container">
        <h1>
          You can import your wallet by filling in your secret seed-phrase:
        </h1>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <!-- import__grid -->
          <div class="import__grid">
            <!-- import__grid--left -->
            <div class="import__grid--left">
              <!-- import__inputWrap -->
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
                <!--                      <label for="">{{key+1}}</label>-->
                <!--                      <q-input v-model="tg1.value" class="import__input" dense borderless/>-->
              </div>
            </div>
            <!-- import__grid--left -->
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
                <!--                      <label for="">{{key+7}}</label>-->
                <!--                      <q-input v-model="tg2.value" class="import__input" dense borderless/>-->
              </div>
            </div>
          </div>
          <!-- import__grid -->
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
        </q-form>
      </div>
    </main>
  </div>
</template>
<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import InputPhrase from "components/InputPhrase";
import { updateCurrentWallet } from "src/store/account/mutations";

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
        { value: "trouble" },
        { value: "segment" },
        { value: "nice" },
        { value: "patrol" },
        { value: "say" },
        { value: "laundry" },
      ],
      text_group_2: [
        { value: "lunch" },
        { value: "weasel" },
        { value: "royal" },
        { value: "motor" },
        { value: "midnight" },
        { value: "royal" },
      ],
      model_password: "12345678",
      model_confirmpassword: "12345678",
      isPwd: true,
      isPwd2: true,
    };
  },
  methods: {
    phraseFromInput(data) {
      console.log(data);
      if (data.number <= 5) {
        this.text_group_1[data.number].value = data.phrase;
      }
      if (data.number >= 6 && data.number <= 11) {
        this.text_group_2[data.number - 6].value = data.phrase;
      }
    },
    onSubmit() {
      this.mnemonicPhrase = [];

      this.text_group_1.map((item) => {
        this.mnemonicPhrase.push(item.value);
      });

      this.text_group_2.map((item) => {
        this.mnemonicPhrase.push(item.value);
      });

      if (validationPhrase(this.mnemonicPhrase)) {
        let account = { ...this.account };

        account.phrase = this.mnemonicPhrase;
        account.password = this.model_password;
        account.confirmPhrase = true;

        //Обновление аккаунта
        this.updateAccount(account);

        this.updateCurrentBlockchain(account.blockchains[0]);

        //Создание кошелька
        this.createWallet();
        this.$router.push("/setupperson");
      } else {
        alert("Invalid Mnenomic");
      }
    },
    onReset() {},
    createWallet() {
      let account = { ...this.account };

      const createdWallet = createWalletFromMnenomic(this.account.phrase);

      account.blockchains.map((blockchain) => {
        if (blockchain.label === account.current_blockchain.label) {
          // let wallet = {
          //   wallet: response.data.wallet,
          //   value: response.data.wallet,
          //   balance: 0,
          //   numberWallet: 0,
          //   label: `Wallet ${blockchain.wallets.length + 1}`,
          //   name: `Wallet ${blockchain.wallets.length + 1}`,
          // };
          const wallet = {
            wallet: createdWallet.wallet,
            value: createdWallet.wallet,
            privateKey: createdWallet.privateKey,
            label: `Wallet ${blockchain.wallets.length + 1}`,
            name: `Wallet ${blockchain.wallets.length + 1}`,
          };

          this.updateWallets(wallet);

          this.updateCurrentWallet(wallet);
        }
      });
    },
    //TODO: Обязательно вынести в миксин
    phraseToString(phrase) {
      let string = "";
      phrase.map((item, key) => {
        if (key === 0) {
          string += `${item}`;
        } else {
          string += ` ${item}`;
        }
      });
      return string;
    },
  },
};
</script>
