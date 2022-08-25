<template>
  <main class="start-screen">
    <div class="container desktop-2-cols-container">
      <div>
        <!-- Persons carousel -->
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
          <a class="btn col" @click="sendTransaction">Send</a>
          <a class="btn col" @click="showNotifNegative">Receive</a>
          <a class="btn col" @click="showNotifInfo">Link</a>
        </div>

        <!-- Tokens list -->
        <q-list class="q-pb-md">
          <q-item
            v-for="token in tokens"
            v-show="token.wallet"
            :key="token.label"
            class="q-pl-none"
          >
            <q-item-section side>
              <q-avatar
                rounded
                size="56px"
                color="blue-transparent"
                text-color="blue-light"
              >
                <q-icon
                  v-show="token.label === 'ETH'"
                  name="img:https://cdn.cdnlogo.com/logos/e/39/ethereum.svg"
                />
                <q-avatar
                  v-show="token.label === 'UBX'"
                  rounded
                  size="56px"
                  color="blue-transparent"
                  text-color="blue-light"
                >
                  U
                </q-avatar>
                <q-avatar
                  v-show="token.label === 'BTC'"
                  rounded
                  size="56px"
                  color="blue-transparent"
                  text-color="blue-light"
                >
                  B
                </q-avatar>
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Balance:</q-item-label>
              <q-item-label class="text-subtitle2 text-bold"
                >{{ token.balance }} {{ token.label }}</q-item-label
              >
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

        <a class="btn btn--primary q-mb-lg" @click="importToken"
          >Import tokens</a
        >
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { useStore } from "vuex";
import {
  matAdd,
  matIosShare,
  matChevronRight,
} from "@quasar/extras/material-icons";
import ImportToken from "components/ImportToken";
import AddAccount from "components/AddAccount";
import EditAccount from "components/EditAccount";
import SelectAccount from "components/SelectAccount";
import { updateWallets } from "src/store/account/mutations";
import { getElipseText } from "src/helper/formater";
import { useQuasar } from "quasar";
import {
  createWalletFromMnenomic,
  getEtherBalance,
} from "src/helper/ethers-interact";

export default {
  name: "Accounts",
  created() {
    this.matAdd = matAdd;
    this.matIosShare = matIosShare;
    this.matChevronRight = matChevronRight;
  },
  setup() {
    const $q = useQuasar();

    const $store = useStore();

    function editAccount(key) {
      this.$router.push("/setupperson");
    }

    function createAccount() {
      $q.dialog({
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
      $q.dialog({
        component: ImportToken,
      })
        .onOk(() => {})
        .onCancel(() => {})
        .onDismiss(() => {});
    }

    function showNotifPositive() {
      $q.notify({
        message:
          'Transaction status: <span class="notification__msg notification__msg--positive">success</span>',
        html: true,
      });
    }

    function showNotifNegative() {
      $q.notify({
        message:
          'Transaction status: <span class="notification__msg notification__msg--negative">fail</span>',
        html: true,
      });
    }

    function showNotifWarning() {
      $q.notify({
        message:
          'Transaction status: <span class="notification__msg notification__msg--warning">warning</span>',
        html: true,
      });
    }

    function showNotifInfo() {
      $q.notify({
        message:
          'Transaction status: <span class="notification__msg notification__msg--info">info</span>',
        html: true,
      });
    }

    function selectAccount() {
      $q.dialog({
        component: SelectAccount,
      })
        .onOk(() => {})
        .onCancel(() => {})
        .onDismiss(() => {});
    }

    return {
      currency: ref("ETH"),
      carousel: 0,
      carouselOptions: [],

      editAccount,
      createAccount,
      importToken,
      showNotifPositive,
      showNotifNegative,
      showNotifWarning,
      showNotifInfo,
      selectAccount,

      getElipseText,

      account: $store.state.account.account,
      updateAccount: (val) => $store.commit("account/update", val),
      updateCurrentWallet: (val) =>
        $store.commit("account/updateCurrentWallet", val),
      updateCurrentBlockchain: (val) =>
        $store.commit("account/updateCurrentBlockchain", val),
      updateWallets: (val) => $store.commit("account/updateWallets", val),
    };
  },
  data() {
    return {
      accounts: [],
      model_blockchain: {},
      model_wallet: {},
      tokens: [
        {
          label: "ETH",
          balance: "0.0",
          wallet: true,
        },
        // {
        //   label: "BTC",
        //   balance: 0,
        //   wallet: false,
        // },
        // {
        //   label: "UBX",
        //   balance: 0,
        //   wallet: false,
        // },
      ],
      blockchainsList: [],
      walletsList: [],
      model_wallet_to: "",
    };
  },
  methods: {
    async fetchBalance() {
      const balance = await getEtherBalance(this.model_wallet.value);
      this.tokens.map((item) => {
        if (item.label === "ETH") {
          item.balance = balance;
          item.wallet = this.model_wallet.value;
        }
      });
    },
    createWallet() {
      console.log(this.account.phrase);
      let count_wallets = this.model_blockchain.wallets.length;

      console.log("count_wallets", this.account.phrase);
      const createdWallet = createWalletFromMnenomic(
        this.account.phrase,
        count_wallets
      );

      let account = { ...this.account };

      let name_wallet = `Wallet ${count_wallets + 1}`;

      let new_wallet = {
        label: name_wallet,
        name: name_wallet,
        balance: 0,
        numberWallet: count_wallets,
        value: createdWallet.wallet,
        wallet: createdWallet.wallet,
        privateKey: createdWallet.privateKey,
      };

      let blockchains = [...this.account.blockchains];
      console.log("blockchains", blockchains);

      blockchains.map((item) => {
        if (item.label === this.model_blockchain.label) {
          console.log("new_wallet", new_wallet);
          this.updateWallets(new_wallet);
        }
      });
      this.updateAccount(account);
      this.updateCurrentWallet(new_wallet);
      this.setData();
      this.model_wallet = new_wallet;
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

      this.accounts = JSON.parse(localStorage.getItem("accounts"));

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
      this.model_wallet = this.model_blockchain.wallets[0];

      this.model_wallet = this.account.current_wallet;
    },
    showWallet() {
      this.$global.$emit("WALLET_SHOW", {});
      this.$router.push({
        path: "/shareaddress",
        query: {
          wallet: this.model_wallet.value.wallet,
          account: this.model_wallet.label,
        },
      });
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
