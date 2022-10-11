<template>
  <div>
    <main class="create-wallet">
      <div class="container">
        <h1 class="text-center text-desktop-left">Create wallet</h1>

        <!-- start stepper
                .stepper__step--active - active step (blue dot)
                .stepper__step--complete -- complete step (green dot & check icon)
                -->
        <div class="stepper create-wallet__stepper flex-desktop-left">
          <div class="stepper__step stepper__step--complete">
            <div class="stepper__circle"></div>
            <span class="stepper__text">Step 1</span>
          </div>
          <div class="stepper__step stepper__step--complete">
            <div class="stepper__circle"></div>
            <span class="stepper__text">Step 2</span>
          </div>
          <div class="stepper__step stepper__step--active">
            <div class="stepper__circle"></div>
            <span class="stepper__text">Step 3</span>
          </div>
        </div>
        <!-- stepper end -->

        <div class="create-wallet__info">
          Confirm your secret seed phrase by choosing words in a correct order:
        </div>

        <div class="seed-phrase create-wallet__seed-phrase">
          <div
            v-for="(phraseCheck, key) in mnemonicPhraseCheck"
            :key="key"
            class="seed-phrase__word"
          >
            {{ phraseCheck }}
          </div>
        </div>

        <div class="phrase-suggestions create-wallet__seed-phrase">
          <div
            v-for="(phraseRandom, key) in mnemonicPhraseRandom"
            :key="key"
            @click="checkWord(phraseRandom, key)"
            class="phrase-suggestions__word"
            :class="{
              'phrase-suggestions__word--selected': phraseRandom.check,
            }"
          >
            {{ phraseRandom.word }}
          </div>
        </div>

        <q-btn
          @click="clearTable"
          class="btn btn--transparent create-wallet__btn"
        >
          Clear
        </q-btn>

        <q-btn
          @click="buttonNextStep"
          class="btn btn--primary create-wallet__btn"
          :class="{ disabled: dasableNextStep }"
        >
          Next
        </q-btn>
        <q-btn
          @click="confirm = true"
          class="btn btn--transparent create-wallet__btn"
        >
          Skip for now
        </q-btn>
      </div>
    </main>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Are you sure you want to continue?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            @click="nextConfirm"
            flat
            label="Yes"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { createWalletFromMnenomic } from "src/helper/ethers-interact";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "CreateWalletStep3",
  setup() {
    const store = useStore();

    return {
      account: computed(() => store.getters["account/getCurrentAccount"]),
      updateAccount: (val) => store.commit("account/update", val),
      updateWallets: (val) => store.commit("account/updateWallets", val),
    };
  },
  data() {
    return {
      confirm: false,
      accounts: [],
      key_account: 0,
      mnemonicPhraseCheck: [],
      mnemonicPhraseStore: [],
      mnemonicPhraseRandom: [],
      dasableNextStep: true,
    };
  },
  methods: {
    createWallet() {
      const createdEthWallet = createWalletFromMnenomic(
        this.account.phrase,
        0,
        60
      );
      const createdUBXWallet = createWalletFromMnenomic(
        this.account.phrase,
        0,
        713
      );

      this.updateWallets(createdEthWallet);
      this.updateWallets(createdUBXWallet);
    },
    checkWord(item, key) {
      if (!item.check) {
        this.mnemonicPhraseRandom.map((word) => {
          if (word.word === item.word) {
            word.check = true;
          }
        });
        this.mnemonicPhraseCheck.push(item.word);
      }

      this.nextStep();
    },
    clearTable() {
      this.mnemonicPhraseCheck = [];
      this.mnemonicPhraseRandom.map((item) => {
        item.check = false;
      });
    },
    nextStep() {
      if (this.mnemonicPhraseCheck.length === this.mnemonicPhraseStore.length) {
        if (this.validation()) {
          this.dasableNextStep = false;
          this.showAlertSuccess();
        } else {
          console.error("Not walid phrase");
          this.showAlertFail();
        }
      }
    },
    validation() {
      for (let key in this.mnemonicPhraseStore) {
        if (this.mnemonicPhraseStore[key] !== this.mnemonicPhraseCheck[key]) {
          return false;
        }
      }
      return true;
    },
    buttonNextStep() {
      if (!this.dasableNextStep) {
        this.createWallet();
        let account = { ...this.account };
        account.confirmPhrase = true;
        this.updateAccount(account);
        this.$router.push("/startscreen");
      }
    },
    nextConfirm() {
      this.createWallet();
      let account = { ...this.account };
      account.confirmPhrase = false;
      this.updateAccount(account);
      this.$router.push("/startscreen");
    },
    showAlertSuccess() {
      this.$q.notify({
        message:
          '<span class="notification__msg notification__msg--positive">SUCCESS</span> Your secret seed phrase confirmed',
        html: true,
      });
    },
    showAlertFail() {
      this.$q.notify({
        message:
          '<span class="notification__msg notification__msg--negative">FAIL</span> Not confirm your secret seed phrase',
        html: true,
      });
    },
  },
  mounted() {
    let account = { ...this.account };

    let phraseStore = account.phrase;

    if (phraseStore) {
      this.mnemonicPhraseStore = phraseStore;

      let phraseStoreRandom = [...phraseStore];
      let randomPhrase = phraseStoreRandom.sort(() => Math.random() - 0.5);
      randomPhrase.map((word) => {
        this.mnemonicPhraseRandom.push({
          word: word,
          check: false,
        });
      });
    }
  },
};
</script>
