<template>
  <main class="q-pt-md">
    <div class="container">
      <q-form>
        <p class="text-subtitle2 q-mb-sm">From</p>
        <q-select
          readonly
          filled
          behavior="menu"
          class="input input--borderDark q-mb-md"
          v-model="currentWallet"
          :label="currentWallet.name"
          :options="walletOptions"
          :display-value="`Balance: ${tokenBalance} ${currentToken?.symbol}`"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section side>
                <q-avatar
                  rounded
                  size="42px"
                  color="blue-transparent"
                  text-color="blue-light"
                >
                  <template v-if="scope.opt.icon">
                    <q-icon :name="scope.opt.icon" />
                  </template>
                  <template v-else>U</template>
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label caption>{{ scope.opt.name }}</q-item-label>
                <q-item-label class="text-subtitle2 text-bold">
                  {{ scope.opt.balance }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <p class="text-subtitle2 q-mb-sm">To</p>

        <q-input
          v-model="toWallet"
          readonly
          filled
          class="input input--borderDark q-mb-sm"
          label-slot
        >
          <template v-slot:prepend v-if="recipient.socialNetwork">
            <q-item-section side class="q-pr-none">
              <q-icon
                v-if="recipient.socialNetwork === 'telegram'"
                size="20px"
                name="img:https://cdn.cdnlogo.com/logos/t/39/telegram.svg"
              />
              <q-icon
                v-if="recipient.socialNetwork === 'twitter'"
                size="20px"
                name="img:https://cdn.cdnlogo.com/logos/t/96/twitter-icon.svg"
              />
            </q-item-section>
          </template>
          <template v-slot:label>
            <q-item-section>
              <q-item-label class="text-ellipsis">
                {{
                  recipient.socialNetwork
                    ? (recipient.socialNetwork === "telegram" &&
                        "Telegram: ") ||
                      (recipient.socialNetwork === "twitter" && "Twitter: ")
                    : ""
                }}
                {{ recipient.name }}
              </q-item-label>
            </q-item-section>
          </template>
        </q-input>

        <h2 class="text-dark text-center text-desktop-left q-mt-lg q-mb-md">
          Amount<br />{{ amountCoin }} {{ currentToken?.symbol }}
        </h2>

        <q-card flat class="start-screen__person q-mb-md">
          <q-item class="q-pa-none">
            <q-item-section>
              <q-item-label class="text-body2">
                Estimated gas fee (?) ${{
                  (
                    (feeData?.maxFeePerGas * estimatedGas * coinPrice) /
                    10 ** currentToken?.decimals
                  ).toFixed(3)
                }}
                {{
                  (
                    (feeData?.maxFeePerGas * estimatedGas) /
                    10 ** currentToken?.decimals
                  ).toFixed(currentBlockchain.label === "UBX" ? 0 : 4)
                }}
                {{ currentBlockchain.label }}
              </q-item-label>
              <q-item-label caption class="q-mb-sm text-grey">
                Max fee:
                {{
                  (
                    (feeData?.maxFeePerGas *
                      estimatedGas *
                      (currentBlockchain.label === "UBX" ? 1 : 2)) /
                    10 ** currentToken?.decimals
                  ).toFixed(currentBlockchain.label === "UBX" ? 0 : 4)
                }}
                {{ currentBlockchain.label }}
              </q-item-label>
              <q-item-label class="text-body2">Total:</q-item-label>
              <q-item-label class="text-body2">
                ${{
                  (
                    (parseFloat(
                      (feeData?.maxFeePerGas * estimatedGas) /
                        10 ** currentToken?.decimals
                    ) +
                      parseFloat(
                        currentToken?.address === NULL_ADDRESS ? amountCoin : 0
                      )) *
                    coinPrice
                  ).toFixed(3)
                }}
                -
                {{
                  currentToken?.address === NULL_ADDRESS
                    ? `${(
                        parseFloat(
                          (feeData?.maxFeePerGas * estimatedGas) /
                            10 ** currentToken?.decimals
                        ) + parseFloat(amountCoin)
                      ).toFixed(currentBlockchain.label === "UBX" ? 0 : 4)} ${
                        currentBlockchain.label
                      }`
                    : `${amountCoin} ${currentToken?.symbol} +  ${(
                        (feeData?.maxFeePerGas * estimatedGas) /
                        10 ** currentToken?.decimals
                      ).toFixed(4)} ${currentBlockchain.label}`
                }}
              </q-item-label>
              <q-item-label caption class="text-grey">
                Max amount:
                {{
                  currentToken?.address === NULL_ADDRESS
                    ? (
                        parseFloat(
                          (feeData?.maxFeePerGas *
                            (currentBlockchain.label === "UBX" ? 1 : 2) *
                            estimatedGas) /
                            10 ** currentToken?.decimals
                        ) + parseFloat(amountCoin)
                      ).toFixed(4)
                    : `${amountCoin} ${currentToken?.symbol} +  ${(
                        (feeData?.maxFeePerGas *
                          estimatedGas *
                          currentBlockchain.label ===
                        "UBX"
                          ? 1
                          : 2) /
                        10 ** currentToken?.decimals
                      ).toFixed(currentBlockchain.label === "UBX" ? 0 : 4)} ${
                        currentBlockchain.label
                      }`
                }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-card>

        <a class="btn btn--primary" @click="onSumbitTransaction">Send</a>
      </q-form>
    </div>
  </main>
</template>

<script>
import { useQuasar } from "quasar";
import {
  fetchEtherPrice,
  getEstimatedGas,
  getFeeData,
  getTokenBalance,
  submitSendCoinTransaction,
} from "src/helper/ethers-interact";

import {
  getUbixTokenBalances,
  submitSendUbxTransaction,
} from "src/helper/ubx-interact";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { NULL_ADDRESS } from "src/helper/constants";

export default {
  name: "SendFinal",
  setup() {
    const quasar = useQuasar();

    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const toWallet = ref("");
    const fromWallet = ref("");
    const token = ref({});
    const amountCoin = ref(0);

    const intervalId = ref(-1);
    const feeData = ref({});
    const estimatedGas = ref({});
    const coinPrice = ref(1);

    const currentWallet = computed(
      () => store.getters["account/getCurrentWallet"]
    );
    const tokenBalance = ref(0);
    const currentBlockchain = computed(
      () => store.getters["account/getCurrentBlockchain"]
    );

    const currentToken = ref({});

    // const currentToken = computed(() => {
    //   const result = store.getters["account/getCurrentTokens"];
    //   return result?.find((item) => item.address === token.value);
    // });

    onMounted(async () => {
      await router.isReady();
      fromWallet.value = route.query.from;
      toWallet.value = route.query.to;
      amountCoin.value = route.query.amount;
      token.value = route.query.token;

      if (currentBlockchain.value.label === "ETH") {
        console.log("ETH token");
        currentToken.value = currentTokens.value.find(
          (item) => item.address === token.value
        );
      } else {
        const _temp = await getUbixTokenBalances(fromWallet.value);
        currentToken.value = _temp.find((item) => item.symbol === token.value);
        tokenBalance.value = currentToken.value.balance;
      }

      fetchBalance();

      [coinPrice.value, estimatedGas.value, feeData.value] = await Promise.all([
        fetchEtherPrice(currentBlockchain.value.label),
        getEstimatedGas(
          token.value,
          currentWallet.value,
          toWallet.value,
          amountCoin.value * 10 ** currentToken.value.decimals,
          currentBlockchain.value.label
        ),
        getFeeData(currentToken.value?.symbol),
      ]);

      intervalId.value = setInterval(async () => {
        [coinPrice.value, feeData.value] = await Promise.all([
          fetchEtherPrice(currentBlockchain.value.label),
          getFeeData(currentToken.value?.symbol),
        ]);
      }, 10000);
    });

    const fetchBalance = async () => {
      if (currentBlockchain.value.label === "ETH") {
        const balance = await getTokenBalance(
          currentToken.value,
          fromWallet.value
        );

        tokenBalance.value = balance / 10 ** currentToken.value.decimals;
      }
    };

    onUnmounted(() => {
      clearInterval(intervalId.value);
    });

    const onSumbitTransaction = async () => {
      if (currentBlockchain.value.label === "UBX") {
        const transactionObj = await submitSendUbxTransaction(
          currentWallet.value,
          toWallet.value,
          amountCoin.value * 10 ** currentToken.value.decimals,
          currentToken.value
        );

        if (transactionObj) {
          quasar.notify({
            message:
              'Transaction failed: <span class="notification__msg notification__msg--negative">Error</span>',
            html: true,
          });
          return;
        }

        quasar.notify({
          message:
            'Transaction status: <span class="notification__msg notification__msg--warning">Pending</span>',
          html: true,
        });
        router.push("/accounts");
        return;
      }
      try {
        const transactionObj = await submitSendCoinTransaction(
          currentWallet.value,
          toWallet.value,
          amountCoin.value * 10 ** currentToken.value.decimals,
          currentToken.value
        );

        quasar.notify({
          message:
            'Transaction status: <span class="notification__msg notification__msg--warning">Pending</span>',
          html: true,
        });
        await transactionObj.wait();
        quasar.notify({
          message:
            'Transaction status: <span class="notification__msg notification__msg--positive">Success</span>',
          html: true,
        });

        store.dispatch("account/updateBalances");
        router.push("/accounts");
      } catch (error) {
        console.log(error);
      }
    };

    return {
      toWallet,
      amountCoin,
      currentWallet,
      tokenBalance,
      currentBlockchain,
      estimatedGas,
      feeData,
      coinPrice,
      currentToken,
      NULL_ADDRESS,
      walletOptions: [currentWallet],

      recipient: {
        name: "tg_account_name",
        address: toWallet.value,
        socialNetwork: "telegram",
      },
      onSumbitTransaction,
    };
  },
};
</script>
