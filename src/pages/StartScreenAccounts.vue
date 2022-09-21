<template>
  <main class="start-screen">
    <div class="container desktop-2-cols-container">
      <div>
        <q-carousel
          v-model="carousel"
          swipeable
          animated
          control-type="outline"
          control-color="blue"
          transition-prev="jump-right"
          transition-next="jump-left"
          class="start-screen__carousel"
        >
          <q-carousel-slide
            v-for="(account, key) in accounts"
            :key="key"
            :name="0"
            class="start-screen__slide"
            @click="selectAccount"
          >
            <q-card flat class="start-screen__person">
              <q-item class="q-pa-none">
                <q-item-section>
                  <q-item-label caption>
                    {{ account.details }}
                  </q-item-label>
                  <q-item-label class="text-h6 text-bold q-mb-sm"
                    >{{ account.name }}
                  </q-item-label>
                  <q-item-label caption>Social networks linked:</q-item-label>
                  <q-item-label class="text-body2">{{ key }}</q-item-label>
                  <q-item-label>
                    <router-link
                      to="/setupperson"
                      class="link--big cursor-pointer"
                    >
                      Setup your person
                    </router-link>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-card>
          </q-carousel-slide>

          <div class="q-pt-md">
            <q-carousel-control
              position="bottom"
              :offset="[8, 8]"
              class="start-screen__carousel"
            />
          </div>
        </q-carousel>
        <div class="row justify-center q-my-md">
          <q-option-group
            v-model="carousel"
            :options="carouselOptions"
            color="primary"
            inline
            dense
          />
        </div>
        <a class="btn q-mb-md" @click="createAccount">Add another person</a>
      </div>

      <div>
        <div class="row items-center q-mb-md q-gutter-sm">
          <q-select
            v-model="model_blockchain"
            filled
            :options="blockchainsList"
            :display-value="model_blockchain?.label"
            @update:model-value="changeBlockchain"
            behavior="menu"
            class="input input--borderDark col-auto"
          />

          <q-select
            v-model="model_wallet"
            filled
            :options="walletsList"
            :display-value="model_wallet?.label"
            @update:model-value="changeWallet"
            behavior="menu"
            class="input input--borderDark col-grow"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label>{{ scope.opt.label }}</q-item-label>
                  <q-item-label caption>
                    {{ getElipseText(scope.opt.wallet) }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-btn
            @click="createWallet"
            round
            unelevated
            color="primary"
            :icon="matAdd"
          />
        </div>
      </div>

      <q-dialog v-model="removeTokenModal.visible" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <span class="q-ml-sm">Are you sure you want to remove token?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn
              @click="confirmDeleteToken"
              flat
              label="Yes"
              color="primary"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <div>
        <h1 class="q-mt-lg q-mb-md">Send</h1>

        <!-- Wallet -->
        <p class="text-subtitle2 text-bold q-mb-sm">Walletubix-1</p>
        <q-input v-model="model_wallet_to" lazy-rules label="Wallet" filled>
          <template v-slot:append>
            <q-icon :name="matIosShare" />
          </template>
        </q-input>

        <div class="row q-my-sm q-gutter-sm">
          <q-btn class="btn col" @click="sendTransaction">Send</q-btn>
          <q-btn class="btn col" to="/receivecoins">Receive</q-btn>
          <q-btn class="btn col" @click="showNotifInfo">Link</q-btn>
        </div>

        <!-- tokenList list -->
        <q-list class="q-pb-md">
          <q-item
            v-for="token in tokenList"
            v-show="token.wallet"
            :key="token.symbol"
            class="q-pl-none"
          >
            <q-item-section side>
              <q-btn
                class="q-pa-none"
                :to="`/accountdetails?wallet=${currentWallet?.wallet}&token=${token?.address}`"
              >
                <q-avatar
                  rounded
                  size="56px"
                  color="blue-transparent"
                  text-color="blue-light"
                >
                  <q-icon
                    v-show="token.symbol === 'ETH'"
                    name="img:https://cdn.cdnlogo.com/logos/e/39/ethereum.svg"
                  />
                  <q-avatar
                    v-show="token.symbol === 'UBX'"
                    rounded
                    size="56px"
                    color="blue-transparent"
                    text-color="blue-light"
                  >
                    U
                  </q-avatar>
                  <q-avatar
                    v-show="token.symbol !== 'UBX' && token.symbol !== 'ETH'"
                    rounded
                    size="40px"
                    color="blue-transparent"
                    text-color="blue-light"
                  >
                    {{ token.type === "erc20" ? "T" : "NFT" }}
                  </q-avatar>
                </q-avatar></q-btn
              >
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Balance:</q-item-label>
              <q-item-label class="text-subtitle2 text-bold">
                {{
                  token.type === "erc20" || token.type === "coin"
                    ? numberConverter(token.balance, 2)
                    : token.balance
                }}
                {{ token.symbol }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn
                v-if="token.type === 'erc20'"
                round
                unelevated
                color="grey-gradient"
                @click="(e) => clickTrashToken(e, token.address)"
                text-color="dark"
                :icon="matDeleteForever"
              />
            </q-item-section>
            <q-item-section side>
              <q-btn
                round
                unelevated
                color="grey-gradient"
                @click="showWallet"
                text-color="dark"
                :icon="matChevronRight"
              />
            </q-item-section>
          </q-item>
        </q-list>

        <a class="btn btn--primary q-mb-lg" @click="importToken">
          Import tokens
        </a>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import {
  matAdd,
  matIosShare,
  matChevronRight,
  matDeleteForever,
} from "@quasar/extras/material-icons";
import ImportToken from "components/ImportToken";
import AddAccount from "components/AddAccount";
import SelectAccount from "components/SelectAccount";

import { getElipseText, numberConverter } from "src/helper/formater";
import { useQuasar } from "quasar";
import {
  createWalletFromMnenomic,
  getEtherBalance,
  getTokenBalance,
} from "src/helper/ethers-interact";
import { useRouter } from "vue-router";

export default {
  name: "Accounts",
  created() {
    this.matAdd = matAdd;
    this.matIosShare = matIosShare;
    this.matChevronRight = matChevronRight;
  },
  setup() {
    const quasar = useQuasar();

    const store = useStore();
    const router = useRouter();

    const removeTokenModal = ref({ visible: false });

    const tokenList = ref([]);

    const currentWallet = computed(
      () => store.getters["account/getCurrentWallet"]
    );
    const account = computed(() => store.getters["account/getCurrentAccount"]);

    const currentTokens = computed(
      () => store.getters["account/getCurrentTokens"]
    );
    const accounts = computed(() => store.getters["account/getAccounts"]);
    const model_blockchain = ref({});

    const model_wallet = ref({});

    const blockchainsList = computed(
      () => store.getters["account/getBlockchains"]
    );

    const walletsList = computed(
      () => store.getters["account/getCurrentWallets"]
    );
    const currentBlockchain = computed(
      () => store.getters["account/getCurrentBlockchain"]
    );
    const model_wallet_to = ref("");

    const carouselOptions = ref([]);

    const updateAccount = (val) => store.commit("account/update", val);
    const updateCurrentWallet = (val) =>
      store.commit("account/updateCurrentWallet", val);
    const updateCurrentBlockchain = (val) =>
      store.commit("account/updateCurrentBlockchain", val);
    const updateWallets = (val) => store.commit("account/updateWallets", val);
    const refreshTokenList = () => {
      tokenList.value = [];
      tokenList.value = tokenList.value.concat(
        currentTokens.value
          .map((token) => {
            return {
              ...token,
              balance: 0,
              wallet: true,
            };
          })
          .filter((token) => token.symbol !== "")
      );
    };
    onMounted(async () => {
      setData();
      model_blockchain.value =
        currentBlockchain.value || blockchainsList.value[0];
      model_wallet.value = currentWallet.value;
      refreshTokenList();
      fetchBalance();
    });

    const editAccount = (key) => {
      router.push("/setupperson");
    };

    const createAccount = () => {
      quasar
        .dialog({
          component: AddAccount,
        })
        .onOk((data) => {
          console.log("OK", data);
        })
        .onCancel(() => {
          console.log("Cancel");
        })
        .onDismiss(() => {});
    };

    const importToken = () => {
      quasar
        .dialog({
          component: ImportToken,
        })
        .onOk(() => {})
        .onCancel(() => {})
        .onDismiss(() => {});
    };

    const showNotifPositive = () => {
      quasar.notify({
        message:
          'Transaction status: <span class="notification__msg notification__msg--positive">success</span>',
        html: true,
      });
    };

    const showNotifWarning = () => {
      quasar.notify({
        message:
          'Transaction status: <span class="notification__msg notification__msg--warning">warning</span>',
        html: true,
      });
    };

    const showNotifInfo = () => {
      quasar.notify({
        message:
          'Transaction status: <span class="notification__msg notification__msg--info">info</span>',
        html: true,
      });
    };

    const selectAccount = () => {
      quasar
        .dialog({
          component: SelectAccount,
        })
        .onOk(() => {})
        .onCancel(() => {})
        .onDismiss(() => {});
    };

    const showWallet = () => {
      router.push({
        path: "/shareaddress",
        query: {
          wallet: currentWallet.value.wallet,
          account: currentWallet.value.label,
        },
      });
    };

    const selectedToken = ref("");
    const clickTrashToken = (e, address) => {
      e.stopPropagation();
      removeTokenModal.value.visible = true;
      selectedToken.value = address;
    };

    const confirmDeleteToken = () => {
      store.commit("account/removeCustomToken", {
        address: selectedToken.value,
        type: "erc20",
      });
      window.location.reload();
    };

    const setData = () => {
      carouselOptions.value = [];
      accounts.value.map((item, key) => {
        if (accounts.value.length > 1) {
          carouselOptions.value.push({
            label: "",
            value: key,
          });
        }
      });
    };

    const createWallet = () => {
      let count_wallets = walletsList.value.length;

      // return;
      const createdWallet = createWalletFromMnenomic(
        account.value.phrase,
        count_wallets,
        model_blockchain.value.value
      );

      blockchainsList.value.map((item) => {
        if (item.label === model_blockchain.value.label) {
          updateWallets(createdWallet);
        }
      });
      updateCurrentWallet(createdWallet);
      model_wallet.value = createdWallet;

      model_blockchain.value = currentBlockchain.value;
      setData();
      fetchBalance();
    };

    const fetchBalance = async () => {
      console.log(tokenList.value);
      const balances = await Promise.all(
        tokenList.value.map((token) =>
          getTokenBalance(token, model_wallet.value.value)
        )
      );

      console.log(balances);

      tokenList.value.map((token, index) => {
        token.balance = balances[index] / 10 ** token.decimals;
      });
    };

    const changeWallet = (wallet) => {
      model_wallet.value = wallet;
      updateCurrentWallet(wallet);
      fetchBalance();
    };
    const changeBlockchain = (blockchain) => {
      model_blockchain.value = blockchain;
      model_wallet.value = blockchain.wallets[0];

      updateCurrentBlockchain(blockchain);
      updateCurrentWallet(model_wallet.value);
      refreshTokenList();
      setData();
      fetchBalance();
    };

    const sendTransaction = () => {
      router.push({
        path: "/send",
        query: { to: model_wallet_to.value },
      });
    };

    return {
      currency: ref("ETH"),
      carousel: 0,
      carouselOptions: [],

      blockchainsList,
      walletsList,
      tokenList,
      currentWallet,

      model_wallet_to,
      model_wallet,
      model_blockchain,

      editAccount,
      createAccount,
      importToken,
      showNotifPositive,
      showNotifWarning,
      showNotifInfo,
      selectAccount,

      clickTrashToken,
      removeTokenModal,
      confirmDeleteToken,
      showWallet,
      numberConverter,

      getElipseText,

      account,
      accounts,

      matDeleteForever,

      createWallet,
      changeWallet,
      changeBlockchain,
      sendTransaction,
    };
  },
};
</script>
