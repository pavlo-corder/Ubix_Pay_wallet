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
            @update:model-value="changeBlockchain"
            behavior="menu"
            class="input input--borderDark col-auto"
          />

          <q-select
            v-model="model_wallet"
            filled
            :options="walletsList"
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
            :to="`/accountdetails?wallet=${currentWallet?.wallet}`"
          >
            <q-item-section side>
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
              </q-avatar>
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
                @click="clickTrashToken(token.address)"
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
import { loadAccountWithEncryption } from "src/store/account";

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
    const currentTokens = computed(
      () => store.getters["account/getCurrentTokens"]
    );

    onMounted(async () => {
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
    });

    function editAccount(key) {
      router.push("/setupperson");
    }

    function createAccount() {
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
    }

    function importToken() {
      quasar
        .dialog({
          component: ImportToken,
        })
        .onOk(() => {})
        .onCancel(() => {})
        .onDismiss(() => {});
    }

    function showNotifPositive() {
      quasar.notify({
        message:
          'Transaction status: <span class="notification__msg notification__msg--positive">success</span>',
        html: true,
      });
    }

    function showNotifWarning() {
      quasar.notify({
        message:
          'Transaction status: <span class="notification__msg notification__msg--warning">warning</span>',
        html: true,
      });
    }

    function showNotifInfo() {
      quasar.notify({
        message:
          'Transaction status: <span class="notification__msg notification__msg--info">info</span>',
        html: true,
      });
    }

    function selectAccount() {
      quasar
        .dialog({
          component: SelectAccount,
        })
        .onOk(() => {})
        .onCancel(() => {})
        .onDismiss(() => {});
    }

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
    const clickTrashToken = (address) => {
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

    return {
      currency: ref("ETH"),
      carousel: 0,
      carouselOptions: [],

      tokenList,
      currentWallet,

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

      account: store.state.account.account,
      updateAccount: (val) => store.commit("account/update", val),
      updateCurrentWallet: (val) =>
        store.commit("account/updateCurrentWallet", val),
      updateCurrentBlockchain: (val) =>
        store.commit("account/updateCurrentBlockchain", val),
      updateWallets: (val) => store.commit("account/updateWallets", val),

      matDeleteForever,
    };
  },
  data() {
    return {
      accounts: [],
      model_blockchain: {},
      model_wallet: {},

      blockchainsList: [],
      walletsList: [],
      model_wallet_to: "",
    };
  },
  methods: {
    async fetchBalance() {
      const balances = await Promise.all(
        this.tokenList.map((token) =>
          getTokenBalance(token, this.model_wallet.value)
        )
      );

      this.tokenList.map((token, index) => {
        token.balance = balances[index] / 10 ** token.decimals;
      });
    },
    createWallet() {
      let count_wallets = this.model_blockchain.wallets.length;

      const createdWallet = createWalletFromMnenomic(
        this.account.phrase,
        count_wallets
      );
      let account = { ...this.account };
      let blockchains = [...this.account.blockchains];

      blockchains.map((item) => {
        if (item.label === this.model_blockchain.label) {
          this.updateWallets(createdWallet);
        }
      });
      this.updateCurrentWallet(createdWallet);
      this.model_wallet = createdWallet;
      this.setData();
      this.fetchBalance();
    },
    changeWallet(wallet) {
      this.model_wallet = wallet;
      this.updateCurrentWallet(wallet);
      this.fetchBalance();
    },
    changeBlockchain(blockchain) {
      this.model_blockchain = blockchain;
      this.updateCurrentBlockchain(blockchain);
      this.setData();
      this.fetchBalance();
    },
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
    setData() {
      this.accounts = [];

      this.carouselOptions = [];
      this.walletsList = [];

      this.model_blockchain = {};
      this.model_wallet = {};

      this.accounts = loadAccountWithEncryption();

      let account = { ...this.account };

      this.accounts.map((item, key) => {
        if (this.accounts.length > 1) {
          this.carouselOptions.push({
            label: "",
            value: key,
          });
        }
      });

      this.blockchainsList = account.blockchains;
      this.model_blockchain = account.blockchains[0];

      this.walletsList = this.model_blockchain.wallets;
      this.model_wallet = this.account.current_wallet;
    },
    sendTransaction() {
      this.$router.push({
        path: "/send",
        query: { to: this.model_wallet_to },
      });
    },
    setTransactionNumberWallet() {
      let account = { ...this.account };
      this.updateAccount(account);
    },
  },
  mounted() {
    this.$global.$on("ACCOUNT_UPDATE", (data) => {
      if (data) {
        this.setData();
      }
    });
    this.setData();
    this.fetchBalance();
  },
};
</script>
