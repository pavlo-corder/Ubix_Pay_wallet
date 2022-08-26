<template>
  <main class="start-screen">
    <div class="container">
      <h1>
        You can<br />
        <a class="link" href="#">create your digital personality</a>
      </h1>

      <p class="start-screen__subtitle">
        <a href="#" class="link--big">What is it?</a>
      </p>
      <div class="q-mb-md">
        <q-select
          v-model="model_currency"
          filled
          :options="blockchains"
          behavior="menu"
          class="input input--borderDark"
        />
      </div>
      <q-btn @click="createWallet" class="btn btn--primary">
        Create new wallet
      </q-btn>
    </div>
  </main>
</template>

<script>
import { useStore, mapState } from "vuex";
import { createWalletFromMnenomic } from "src/helper/ethers-interact";

export default {
  name: "StartScreen",
  setup() {
    const $store = useStore();
    return {
      blockchains: [...$store.state.account.account.blockchains],
      model_currency: { ...$store.state.account.account.blockchains[0] },
      updateAccount: (val) => $store.commit("account/update", val),
      updateWallets: (val) => $store.commit("account/updateWallets", val),
      updateCurrentWallet: (val) =>
        $store.commit("account/updateCurrentWallet", val),
    };
  },

  computed: {
    ...mapState({ account: (state) => state.account.account }),
  },
  methods: {
    createWallet() {
      const createdWallet = createWalletFromMnenomic(this.account.phrase);

      let blockchains = [...this.account.blockchains];

      blockchains.map((item, key) => {
        if (item.value === this.model_currency.value) {
          this.updateWallets(createdWallet);
          this.updateCurrentWallet(createdWallet);
        }
      });
      this.$router.push("/setupperson");
    },
  },
  mounted() {},
};
</script>
