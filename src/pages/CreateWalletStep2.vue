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
                    <div class="stepper__step stepper__step--active">
                        <div class="stepper__circle"></div>
                        <span class="stepper__text">Step 2</span>
                    </div>
                    <div class="stepper__step">
                        <div class="stepper__circle"></div>
                        <span class="stepper__text">Step 3</span>
                    </div>
                </div>
                <!-- stepper end -->

                <div class="warning create-wallet__warning">
                     Save your secret seedphase in a safe place and don't share it with anyone!
                </div>

                <div class="seed-phrase create-wallet__seed-phrase">
                    <div v-for="(phrase, key) in mnemonicPhrase" :key="key" class="seed-phrase__word">{{phrase}}</div>
                </div>

                <button @click="savePhrase" class="btn btn--primary create-wallet__btn">Next</button>
<!--                <router-link to="/createwalletstep3" class="btn btn&#45;&#45;primary create-wallet__btn">Next</router-link>-->
                <a href="/" class="btn btn--transparent create-wallet__btn">Skip for now</a>
            </div>
        </main>
    </div>
</template>
<script>
import { ref } from 'vue'
import axios from 'axios'
import {useStore} from "vuex";

import bip39 from '../assets/libs/bip39.min.js'
import hdkey from '../assets/libs/hdkey.min.js'

export default({
  name: "CreateWalletStep2",
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
      countwords: 12,
      mnemonicPhrase: [],
      password: ''
    }
  },
  methods: {

    generateRandomPhrase() {

      let account = {...this.account}

      const strength = 128;
      const wordList = eval(bip39.wordlists.english)

      const mnemonic = bip39.generateMnemonic(strength, null, wordList)
      // console.log('phrase', mnemonic)
      this.mnemonicPhrase = mnemonic.split(' ')

      account.phrase = this.mnemonicPhrase

      // const seedHex = bip39.mnemonicToSeedHex(mnemonic, null);
      // console.log('seedHex', seedHex)
      const seed = bip39.mnemonicToSeed(mnemonic, null);
      // console.log('seed', seedHex)

      // const randomNumber = bip39.mnemonicToEntropy(mnemonic, wordList);
      // console.log('randomNumber', randomNumber)

      // const isMnemonicValid = bip39.validateMnemonic(mnemonic, wordList);
      // console.log('isMnemonicValid', isMnemonicValid)

      // const numberOfWords = (parseInt(strength) + (strength / 32)) / 11;
      // console.log('numberOfWords', numberOfWords)

      const hdwallet = hdkey.fromMasterSeed(seed);
      const privateExtendedKey= hdwallet.privateExtendedKey();
      const publicExtendedKey= hdwallet.publicExtendedKey();

      account.privateExtendedKey = privateExtendedKey
      account.publicExtendedKey = publicExtendedKey
      account.confirmPhrase = false

      this.updateAccount(account)


    },
    savePhrase(){
      if(this.validationPhrase()){
        this.accounts[this.key_account].phrase = this.mnemonicPhrase
        localStorage.setItem('accounts', JSON.stringify(this.accounts))
        this.$router.push('/createwalletstep3')
      }
    },
    validationPhrase(){

      const resultValidate = async () => {

        await axios.post(`${process.env. API}/validation_phrase`, {
          'mnemonic': this.phraseToString(this.mnemonicPhrase)
        })
          .then((response) => {
            if(response.data.success){
              return response.data.success
            }
          })
          .catch((error) => {
            console.error(error);
          })
      }

      return resultValidate()

    },
    //TODO: Обязательно вынести в миксин
    phraseToString(phrase){
      let string = ''
      phrase.map((item, key) => {
        if(key === 0){
          string += `${item}`
        }else{
          string += ` ${item}`
        }
      })
      return string
    }
  },
  mounted(){
    let key_account = localStorage.getItem('key_account')
    if(key_account){
      this.key_account = key_account
    }
    let accounts = JSON.parse(localStorage.getItem('accounts'))
    if(accounts){
      this.accounts = accounts
    }
    //TODO:Нужно прояснить ситуацию с паролем, он должен принимать участие в root
    // this.password = localStorage.getItem('password')
    // console.log('this.password', this.password)
    //TODO: отрефакторить и вынести в отдельный модуль
    this.generateRandomPhrase()
  }
});
</script>
