<template>
  <div>
    <main class="import">
      <div class="container">
        <h1 class="q-mb-lg">
          You can import your wallet by filling in your private key:
        </h1>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md q-mt-lg">
          <q-input
            v-model="model_privatekey"
            lazy-rules
            :error="valid_privateKey.state"
            :error-message="valid_privateKey.message"
            :rules="[
              (val) => (val !== null && val !== '') || 'The required field'
            ]"
            label="Insert your private key"
            filled
            :type="isPwd2 ? 'password' : 'text'"
          />
          <div>Password</div>
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
import {createWalletFromPrivateKey} from "src/helper/ethers-interact";
export default {
  name: "Importprivate",
  setup() {
    const $store = useStore();
    return {
      account: $store.state.account.account,
      updateAccount: (val) => $store.commit("account/update", val),
      destroyAccount: (val) => $store.commit("account/destroy", val),
      updateWallets: (val) => $store.commit("account/updateWallets", val),
      updateCurrentWallet: (val) =>
        $store.commit("account/updateCurrentWallet", val),
      updateCurrentBlockchain: (val) =>
        $store.commit("account/updateCurrentBlockchain", val),
    };
  },
  data() {
    return {
      model_privatekey: "",
      valid_privateKey: {
        state: false,
        message: ''
      },
      model_password: "",
      model_confirmpassword: "",
      isPwd: true,
      isPwd2: true,
    };
  },
  methods: {

    onSubmit() {


        let account = { ...this.account };
        // account.phrase = this.mnemonicPhrase;
        account.password = this.model_password;
        account.confirmPhrase = true;
        this.updateAccount(account);
        this.updateCurrentBlockchain(account.blockchains[0]);

        if(this.createWallet()){
          this.$router.push("/setupperson");
        }else{
          this.destroyAccount();
        }

    },
    onReset() {},
    createWallet() {
      const createdEthWallet = createWalletFromPrivateKey(
        this.model_privatekey,
        0,
        60
      );
      const createdUBXWallet = createWalletFromPrivateKey(
        this.model_privatekey,
        0,
        713
      );

      if(createdEthWallet.error || createdUBXWallet.error){
        this.valid_privateKey.state = createdEthWallet.error
        this.valid_privateKey.message = createdEthWallet.message
        return false
      }else{
        this.updateWallets(createdEthWallet);
        this.updateWallets(createdUBXWallet);
        return true
      }


    },
  },
};
</script>
