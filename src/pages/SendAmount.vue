<template>
  <main class="q-pt-md">
    <div class="container">
      <q-form>
        <div class="row justify-between items-center q-mb-md q-gutter-sm">
          <div class="col-6">
            <q-select
              v-model="currency"
              filled
              :options="currencyOptions"
              behavior="menu"
              class="input input--borderDark"
            />
          </div>
          <div class="col-auto">
            <span class="link link--big" @click="onClickMax">Use max</span>
          </div>
        </div>

        <div class="row q-mb-md q-gutter-sm items-center">
          <div class="col">
            <q-input
              filled
              class="input input--borderDark"
              type="number"
              :max="currentWallet.balance"
              v-model="amountCoin"
              @update:model-value="onChangeAmountCoin"
            />
          </div>
          <div class="col-auto">
            <q-icon name="swap_horiz" size="20px"></q-icon>
          </div>
          <div class="col">
            <q-input
              filled
              prefix="$"
              class="input input--borderDark"
              type="number"
              v-model="amountDollar"
              @update:model-value="onChangeAmountDollar"
            />
          </div>
        </div>

        <p class="row items-center q-mb-lg">
          <span class="text-caption text-grey-dark">Balance:&nbsp;</span>
          <span class="text-bold text-h6">
            {{ parseFloat(currentWallet.balance).toFixed(4) }} {{ currency }}
          </span>
        </p>
        <q-btn class="btn btn--primary" @click="onNextHandler">Next</q-btn>
      </q-form>
    </div>
  </main>
</template>

<script>
import { computed } from "@vue/reactivity";
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { fetchEtherPrice, getFeeData } from "src/helper/ethers-interact";

export default {
  name: "SendAmount",
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const feeData = ref({});
    const coinPrice = ref(1);
    const amountCoin = ref(0);
    const amountDollar = ref(0);

    const intervalId = ref(-1);
    const toWallet = ref("");

    onMounted(async () => {
      await router.isReady();
      toWallet.value = route.query.to;

      coinPrice.value = await fetchEtherPrice();
      feeData.value = await getFeeData();
      intervalId.value = setInterval(async () => {
        coinPrice.value = await fetchEtherPrice();
        feeData.value = await getFeeData();
      }, 10000);
    });

    onUnmounted(() => {
      clearInterval(intervalId.value);
    });

    const currentWallet = computed(
      () => store.getters["account/getCurrentWallet"]
    );
    const currentBlockchain = computed(
      () => store.getters["account/getCurrentBlockchain"]
    );

    const onChangeAmountCoin = (coin) => {
      if (coin.length === 0) amountCoin.value = 0;
      amountDollar.value = (amountCoin.value * coinPrice.value).toFixed(3);
    };

    const onChangeAmountDollar = (dollar) => {
      if (dollar.length === 0) amountDollar.value = 0;
      amountCoin.value = (amountDollar.value / coinPrice.value).toFixed(4);
    };

    const onClickMax = () => {
      if (feeData.value.maxFeePerGas) {
        const estimatedTxFee = feeData.value.maxFeePerGas * 21000;
        amountCoin.value = (
          currentWallet.value.balance -
          (estimatedTxFee * 2) / 10 ** 18
        ).toFixed(4);
        onChangeAmountCoin(amountCoin.value);
      }
    };

    const onNextHandler = () => {
      router.push({
        path: "/send/final",
        query: { to: toWallet.value, amount: amountCoin.value },
      });
    };

    return {
      currentWallet,
      currentBlockchain,
      currency: ref("ETH"),
      currencyOptions: ["ETH", "UBX"],
      feeData,
      coinPrice,
      onChangeAmountCoin,
      onChangeAmountDollar,
      onClickMax,
      amountCoin,
      amountDollar,
      onNextHandler,
    };
  },
};
</script>
