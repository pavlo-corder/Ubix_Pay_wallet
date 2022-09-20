<template>
  <main class="q-pt-md">
    <div class="container">
      {{ currentWallet }}
      <q-form>
        <div class="row justify-between items-center q-mb-md q-gutter-sm">
          <div class="col-6">
            <q-item>
              <q-item-section side>
                <q-avatar
                  rounded
                  size="42px"
                  color="blue-transparent"
                  text-color="blue-light"
                >
                  <template v-if="currentToken?.icon">
                    <q-icon :name="currentToken?.icon" />
                  </template>

                  <q-icon
                    v-else-if="
                      currentToken?.type === 'coin' &&
                      currentToken?.networkLabel === 'ETH'
                    "
                    name="img:https://cdn.cdnlogo.com/logos/e/39/ethereum.svg"
                  />
                  <template v-else>{{ currentToken?.symbol?.at(0) }}</template>
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label caption>{{ currentToken?.name }}</q-item-label>
                <q-item-label class="text-subtitle2 text-bold">
                  {{ currentToken?.symbol }}
                </q-item-label>
              </q-item-section>
            </q-item>
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
              :max="tokenBalance"
              :min="0"
              v-model="amountCoin"
              @update:model-value="onChangeAmount"
            />
          </div>
          <div class="col-auto" v-if="currentToken?.type === 'coin'">
            <q-icon name="swap_horiz" size="20px"></q-icon>
          </div>
          <div class="col">
            <q-input
              v-if="currentToken?.type === 'coin'"
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
            {{ numberConverter(tokenBalance) }}
            {{ currentToken?.symbol }}
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
import {
  fetchEtherPrice,
  getFeeData,
  getTokenBalance,
} from "src/helper/ethers-interact";
import { numberConverter } from "src/helper/formater";

export default {
  name: "SendAmount",
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const feeData = ref({});
    const coinPrice = ref(0);
    const amountCoin = ref(0);
    const amountDollar = ref(0);

    const intervalId = ref(-1);
    const fromWallet = ref("");
    const toWallet = ref("");
    const token = ref("");
    const tokenBalance = ref(0);

    const currentTokens = computed(
      () => store.getters["account/getCurrentTokens"]
    );
    const currentToken = computed(() => {
      const result = store.getters["account/getCurrentTokens"];
      return result?.find((item) => item.address === token.value);
    });
    // const currentToken = ref({});

    const fetchBalance = async () => {
      const balance = await getTokenBalance(
        currentToken.value,
        fromWallet.value
      );

      tokenBalance.value = balance / 10 ** currentToken.value.decimals;
    };

    const onNextHandler = () => {
      router.push({
        path: "/send/final",
        query: {
          from: fromWallet.value,
          to: toWallet.value,
          token: token.value,
          amount: amountCoin.value,
        },
      });
    };

    onMounted(async () => {
      await router.isReady();
      fromWallet.value = route.query.from;
      toWallet.value = route.query.to;
      token.value = route.query.token;

      fetchBalance();

      coinPrice.value = await fetchEtherPrice("UBX");

      if (currentBlockchain.value.label === "UBX") return;
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

    const onChangeAmount = (coin) => {
      if (coin.length === 0 || coin <= 0) amountCoin.value = 0;
      else amountCoin.value = parseInt(coin);
      amountDollar.value = (amountCoin.value * coinPrice.value).toFixed(3);
    };

    const onChangeAmountDollar = (dollar) => {
      if (dollar.length === 0) amountDollar.value = 0;
      amountCoin.value = (amountDollar.value / coinPrice.value).toFixed(4);
    };

    const onClickMax = () => {
      if (currentBlockchain.value.label === "UBX") {
        amountCoin.value = (tokenBalance.value - 1500).toFixed(4);
        onChangeAmount(amountCoin.value);
        return;
      }
      if (feeData.value.maxFeePerGas) {
        if (currentToken.value.type === "coin") {
          const estimatedTxFee = feeData.value.maxFeePerGas * 21000;
          amountCoin.value = (
            currentWallet.value.balance -
            (estimatedTxFee * 2) / 10 ** 18
          ).toFixed(4);
          onChangeAmount(amountCoin.value);
        } else if (currentToken.value.type === "erc20") {
          console.log(tokenBalance.value);
          onChangeAmount(tokenBalance.value);
        }
      }
    };

    return {
      currentWallet,
      token,
      tokenBalance,
      currentBlockchain,
      currentTokens,
      currentToken,
      feeData,
      coinPrice,
      onChangeAmount,
      onChangeAmountDollar,
      onClickMax,
      amountCoin,
      amountDollar,
      onNextHandler,
      numberConverter,
    };
  },
};
</script>
