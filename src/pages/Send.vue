<template>
  <main class="q-pt-md">
    <div class="container">
      <p class="text-subtitle2 q-mb-sm">From</p>

      <q-select
        filled
        behavior="menu"
        :value="fromWallet"
        class="input input--borderDark q-mb-md"
        :label="currentWallets[fromWallet].name"
        :options="currentWallets"
        :display-value="`Balance: ${currentWallets[fromWallet].balance}`"
        @update:model-value="fromWalletHandler"
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
                {{
                  `${scope.opt.balance} ${currentAccount.current_blockchain.label}`
                }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <p class="text-subtitle2 q-mb-sm">To</p>

      <q-input
        v-model="name"
        ref="address"
        :disable="dasableInput"
        class="input input--borderDark q-mb-sm"
        placeholder="Set this name"
        filled
        :label="address"
        @keyup="changeAddressName"
        @change="changeAddressName"
        type="text"
      />

      <q-btn
        v-show="button_set_name"
        @click="addAddressName"
        class="btn btn--transparent q-mb-lg"
      >
        Add this address
      </q-btn>

      <q-btn
        v-show="button_cancel_name"
        @click="cancelAddressName"
        class="btn btn--transparent q-mb-lg"
      >
        Cancel
      </q-btn>

      <q-btn
        v-show="button_save_name"
        @click="savelAddressName"
        class="btn btn--transparent q-mb-lg"
      >
        Save this address
      </q-btn>

      <q-btn
        v-show="button_edit_name"
        @click="editAddressName"
        class="btn btn--transparent q-mb-lg"
      >
        Edit this address
      </q-btn>

      <q-btn class="btn btn--primary" @click="onNextHandler">Next</q-btn>

      <q-select
        v-model="searchAddress"
        :placeholder="!searchAddress ? 'Search in the address book' : ''"
        filled
        :options="addresses"
        :use-input="!searchAddress"
        behavior="menu"
        hide-dropdown-icon
        clearable
        class="input input--borderDark q-mb-md q-mt-lg"
        ref="searchAddressSelect"
        @popup-show="
          searchAddressMenuWidth = $refs.searchAddressSelect.$el.offsetWidth
        "
        :popup-content-style="`width: ${searchAddressMenuWidth}px`"
      >
        <template v-if="searchAddress" v-slot:selected>
          <div class="text-ellipsis">
            {{ searchAddress.name }}
          </div>
        </template>
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section v-if="scope.opt.socialNetwork" side>
              <q-icon
                size="20px"
                v-if="scope.opt.socialNetwork === 'telegram'"
                name="img:https://cdn.cdnlogo.com/logos/t/39/telegram.svg"
              />
              <q-icon
                size="20px"
                v-if="scope.opt.socialNetwork === 'twitter'"
                name="img:https://cdn.cdnlogo.com/logos/t/96/twitter-icon.svg"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-ellipsis">
                {{
                  scope.opt.socialNetwork
                    ? (scope.opt.socialNetwork === "telegram" &&
                        "Telegram: ") ||
                      (scope.opt.socialNetwork === "twitter" && "Twitter: ")
                    : ""
                }}
                {{ scope.opt.name }}
              </q-item-label>
              <q-item-label
                caption
                class="text-ellipsis"
                style="max-width: 100%"
              >
                {{ scope.opt.address }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
  </main>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "Send",
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const updateCurrentWallet = (wallet) =>
      store.commit("account/updateCurrentWallet", wallet);

    const currentAccount = computed(
      () => store.getters["account/getCurrentAccount"]
    );
    const currentWallets = computed(
      () => store.getters["account/getCurrentWallets"]
    );

    const fromWallet = ref(0);
    const toWallet = ref("");

    const fromWalletHandler = (wallet) => {
      fromWallet.value = currentWallets.value.indexOf(wallet);
      updateCurrentWallet(wallet);
    };

    onMounted(async () => {
      await router.isReady();
      toWallet.value = route.query.to;
      store.dispatch("account/updateBalances");
    });

    const onNextHandler = () => {
      router.push({
        path: "/send/amount",
        query: { to: toWallet.value },
      });
    };

    return {
      currentAccount,
      currentWallets,
      fromWallet,
      toWallet,
      updateCurrentWallet,
      fromWalletHandler,
      onNextHandler,
      searchAddress: ref(null),
      addresses: [
        {
          name: "Alex",
          address: "0x8146ac15542B470770D49Bbd3402741d6febF62F",
          socialNetwork: null,
        },
        {
          name: "tg_account_name",
          address: "0x8146ac15542B470770D49Bbd3402741d6febF62F",
          socialNetwork: "telegram",
        },
        {
          name: "twi_account_name",
          address: "0x8146ac15542B470770D49Bbd3402741d6febF62F",
          socialNetwork: "twitter",
        },
      ],
      searchAddressMenuWidth: 0,
      nicknames: store.state.nicknames.nicknames,
      updateNicknames: (val) => store.commit("nicknames/updateNicknames", val),
    };
  },
  data() {
    return {
      name: "",
      address: "Address",
      dasableInput: true,
      button_set_name: true,
      button_cancel_name: false,
      button_save_name: false,
      button_edit_name: false,

      current_blockchain: {},
    };
  },
  methods: {
    addAddressName() {
      this.button_set_name = false;
      this.button_cancel_name = true;
      this.dasableInput = false;
      setTimeout(() => {
        this.$refs.address.focus();
      }, 200);
    },
    cancelAddressName() {
      this.button_set_name = true;
      this.button_cancel_name = false;
      this.dasableInput = true;
    },
    savelAddressName() {
      this.button_set_name = false;
      this.button_cancel_name = false;
      this.button_save_name = false;
      this.button_edit_name = true;
      this.dasableInput = true;
      this.updateNicknames({
        blockchain: "ETH",
        address: this.address,
        name: this.name,
        socialNetwork: false,
      });
    },
    editAddressName() {
      this.button_set_name = false;
      this.button_cancel_name = false;
      this.button_save_name = true;
      this.button_edit_name = false;
      this.dasableInput = false;
      setTimeout(() => {
        this.$refs.address.focus();
      }, 200);
    },
    changeAddressName() {
      if (this.address !== "") {
        this.button_save_name = true;
        this.button_set_name = false;
        this.button_cancel_name = false;
      } else {
        this.button_save_name = false;
        this.button_set_name = false;
        this.button_cancel_name = true;
      }
    },
    setBtnBack() {
      this.$global.$emit("BTN_BACK", {
        btn_back: true,
        route: "/accounts",
      });
    },
    getNickName() {
      this.nicknames.map((nickname) => {
        if (nickname.address === this.address) {
          this.name = nickname.name;
        }
      });
    },
    nextStep() {},
  },

  mounted() {
    if (this.$route.query.to) {
      this.address = this.$route.query.to;
    }

    this.getNickName();

    setTimeout(() => {
      this.setBtnBack();
    }, 0);
  },
};
</script>
