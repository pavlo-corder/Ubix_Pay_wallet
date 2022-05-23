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
                    Confirm your secret seedphrase by choosing words in a correct order:
                </div>

                <div class="seed-phrase create-wallet__seed-phrase">
                    <div
                      v-for="(phraseCheck, key) in mnemonicPhraseCheck"
                      :key="key"
                      class="seed-phrase__word"
                    >{{phraseCheck}}</div>
                </div>

                <div class="phrase-suggestions create-wallet__seed-phrase">
                    <div v-for="(phraseRandom, key) in mnemonicPhraseRandom"
                       :key="key"
                       @click="checkWord(phraseRandom, key)"
                       class="phrase-suggestions__word"
                       :class="{  'phrase-suggestions__word--selected': phraseRandom.check  }"
                    >{{phraseRandom.word}}</div>
                </div>

              <button
                @click="clearTable"
                class="btn btn--transparent create-wallet__btn">Clear</button>

                <button
                   @click="buttonNextStep"
                   class="btn btn--primary create-wallet__btn"
                  :class="{disabled: dasableNextStep}"
                >Next</button>
                <a href="/" class="btn btn--transparent create-wallet__btn">Skip for now</a>
            </div>
        </main>
    </div>
</template>
<script>

import {useStore} from "vuex";

export default({
  name: "CreateWalletStep3",
  setup () {
    const $store = useStore()

    return {
      account: $store.state.account.account,
      updateAccount: (val) => $store.commit('account/update', val)
    }
  },
  data(){
    return{
      accounts: [],
      key_account: 0,
      mnemonicPhraseCheck: [],
      mnemonicPhraseStore: [],
      mnemonicPhraseRandom: [],
      dasableNextStep: true
    }
  },
  methods: {
    checkWord(item, key){
      if(!item.check){
        this.mnemonicPhraseRandom.map((word) => {
          if(word.word === item.word ){
            word.check = true
          }
        })
        this.mnemonicPhraseCheck.push(item.word)
      }
      console.log('this.mnemonicPhraseCheck', this.mnemonicPhraseCheck)
      this.nextStep()
    },
    clearTable(){
      this.mnemonicPhraseCheck = []
      this.mnemonicPhraseRandom.map((item) => {
        item.check = false
      })
    },
    nextStep(){

      if(this.mnemonicPhraseCheck.length === this.mnemonicPhraseStore.length){

        if(this.validation()){
          this.dasableNextStep = false

        }else{
          console.error('Not walid phrase')
        }

      }
    },
    validation() {
      for(let key in this.mnemonicPhraseStore){
        if(this.mnemonicPhraseStore[key] !== this.mnemonicPhraseCheck[key]){
          return false
        }
      }
      return true
    },
    buttonNextStep(){
      if(!this.dasableNextStep){

        let account = {...this.account}
        account.confirmPhrase = true
        this.updateAccount(account)

        this.$router.push('/startscreen')

      }
    }
  },
  mounted(){

    let account = {...this.account}

    let phraseStore = account.phrase

    if(phraseStore){

      this.mnemonicPhraseStore = phraseStore
      // console.log('phraseStore  ', this.mnemonicPhraseStore)

      let phraseStoreRandom = [...phraseStore]
      let randomPhrase = phraseStoreRandom.sort(() => Math.random() - 0.5)
      randomPhrase.map((word) => {
        this.mnemonicPhraseRandom.push({
          'word': word,
          'check': false
        })
      })
    }
  }
});
</script>
