<template>
  <main class="q-pt-md">
    <div class="container">
      <div class="q-mb-md text-center text-desktop-left">
        <p class="text-bold text-h6 text-blue">
          {{ numberConverter(currentToken?.balance, 2)
          }}{{ currentToken?.symbol }}
        </p>
        <p
          v-if="currentToken?.type === 'coin'"
          class="text-subtitle2 text-bold"
        >
          {{ numberConverter(currentToken?.usdValue, 2) }} $
        </p>
      </div>

      <div class="row justify-center q-mb-md">
        <a class="col btn btn--primary btn--autoWidth btn--justify-start">
          <q-icon name="north_east" />
          Send
        </a>
        <q-btn class="col btn btn--autoWidth" to="/receivecoins">Receive</q-btn>
      </div>

      <p class="text-subtitle2 text-bold q-mb-md">Transactions</p>
      <div
        class="q-mb-lg"
        v-for="transactionsPerDay in transactions"
        v-bind:key="transactionsPerDay.timestamp"
      >
        <p class="text-caption text-grey-dark q-mb-sm">
          {{ moment(transactionsPerDay.timestamp).format("D MMM YYYY") }}
        </p>
        <q-list class="input input--borderDark q-mb-md" separator>
          <q-item v-for="tx in transactionsPerDay.txns" v-bind:key="tx">
            <q-item-section>
              <q-item-label>
                {{ tx.type === "received" ? "Received" : "Sent" }}&nbsp;
                {{ tx.coin }}&nbsp;
                {{ tx.confirmed ? "Confirmed" : "Not confirmed" }}
              </q-item-label>
              <q-item-label caption>
                {{ tx.confirmed ? "Confirmed" : "Not confirmed" }}
              </q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-item-label
                >{{ numberConverter(tx.amount, 2) }}&nbsp;{{
                  tx.coin
                }}</q-item-label
              >
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <q-btn
        class="btn q-mb-sm"
        :href="
          currentBlockchain?.label === 'ETH'
            ? `https://etherscan.io/address/${wallet}}`
            : `https://explorer.ubikiri.com/#address/${wallet}`
        "
        target="_blank"
      >
        Full info on block explorer
      </q-btn>
      <q-btn class="btn btn--transparent q-mb-lg" to="/accounts">Close</q-btn>
    </div>
  </main>
</template>

<script>
import moment from "moment";
import {
  fetchEtherPrice,
  getTokenBalance,
  fetchTxHistory,
} from "src/helper/ethers-interact";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { numberConverter } from "src/helper/formater";

export default {
  name: "AccountDetails",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const wallet = ref("");
    const currentToken = ref({});

    const currentTokens = computed(
      () => store.getters["account/getCurrentTokens"]
    );
    const currentWallet = computed(
      () => store.getters["account/getCurrentWallet"]
    );
    const currentBlockchain = computed(
      () => store.getters["account/getCurrentBlockchain"]
    );

    const transactions = ref([]);

    onMounted(async () => {
      await router.isReady();
      wallet.value = route.query.wallet;
      const tokenAddress = route.query.token;
      currentToken.value = currentTokens.value.find(
        (item) => item.address.toLowerCase() === tokenAddress.toLowerCase()
      );

      const [balance, coinPrice, txHistory] = await Promise.all([
        getTokenBalance(currentToken.value, wallet.value),
        fetchEtherPrice(currentBlockchain.value.label),
        fetchTxHistory(currentToken.value, wallet.value),
      ]);

      currentToken.value.balance = balance / 10 ** currentToken.value.decimals;
      currentToken.value.usdValue =
        (balance * coinPrice) / 10 ** currentToken.value.decimals;

      transactions.value = txHistory;
    });
    return {
      transactions,
      wallet,
      currentToken,
      currentWallet,
      moment,
      numberConverter,
    };
  },
};
</script>
