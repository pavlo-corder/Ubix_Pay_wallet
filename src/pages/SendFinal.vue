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
          :display-value="`Balance: ${currentWallet.balance}`"
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
          Amount<br />{{ amountCoin }} ETH
        </h2>

        <q-card flat class="start-screen__person q-mb-md">
          <q-item class="q-pa-none">
            <q-item-section>
              <q-item-label class="text-body2">
                Estimated gas fee (?) ${{
                  (
                    (feeData?.maxFeePerGas * 21000 * coinPrice) /
                    10 ** 18
                  ).toFixed(3)
                }}
                {{ ((feeData?.maxFeePerGas * 21000) / 10 ** 18).toFixed(4) }}
                ETH
              </q-item-label>
              <q-item-label caption class="q-mb-sm text-grey">
                Max fee:
                {{
                  ((feeData?.maxFeePerGas * 21000 * 2) / 10 ** 18).toFixed(4)
                }}
                ETH
              </q-item-label>
              <q-item-label class="text-body2">Total:</q-item-label>
              <q-item-label class="text-body2"
                >${{
                  (
                    (parseFloat((feeData?.maxFeePerGas * 21000) / 10 ** 18) +
                      parseFloat(amountCoin)) *
                    coinPrice
                  ).toFixed(3)
                }}
                {{
                  (
                    parseFloat((feeData?.maxFeePerGas * 21000) / 10 ** 18) +
                    parseFloat(amountCoin)
                  ).toFixed(4)
                }}
                ETH</q-item-label
              >
              <q-item-label caption class="text-grey">
                Max amount:
                {{
                  (
                    parseFloat((feeData?.maxFeePerGas * 2 * 21000) / 10 ** 18) +
                    parseFloat(amountCoin)
                  ).toFixed(4)
                }}
                ETH
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
  getFeeData,
  submitSendCoinTransaction,
} from "src/helper/ethers-interact";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "SendFinal",
  setup() {
    const quasar = useQuasar();

    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const toWallet = ref("");
    const amountCoin = ref(0);

    const intervalId = ref(-1);
    const feeData = ref({});
    const coinPrice = ref(1);

    const currentWallet = computed(
      () => store.getters["account/getCurrentWallet"]
    );

    onMounted(async () => {
      await router.isReady();
      toWallet.value = route.query.to;
      amountCoin.value = route.query.amount;

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

    const onSumbitTransaction = async () => {
      try {
        const transactionObj = await submitSendCoinTransaction(
          currentWallet.value,
          toWallet.value,
          amountCoin.value
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
      } catch (error) {}
    };

    return {
      toWallet,
      amountCoin,
      currentWallet,
      feeData,
      coinPrice,
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
