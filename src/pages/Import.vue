<template>
    <div>
        <main class="import">
          <div class="container">
            <h1>You can import wallet by posting your secret set phrase:</h1>
            <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md"
              >
                <!-- import__grid -->
                <div class="import__grid">
                  <!-- import__grid--left -->
                  <div class="import__grid--left">
                    <!-- import__inputWrap -->
                    <div v-for="(tg1, key) in text_group_1" :key="key" class="import__inputWrap">
                      <label for="">{{key+1}}</label>
                      <q-input v-model="tg1.value" class="import__input" dense borderless/>
                    </div>
                  </div>
                  <!-- import__grid--left -->
                  <div class="import__grid--right">
                    <div v-for="(tg2, key) in text_group_2" :key="key" class="import__inputWrap">
                      <label for="">{{key+7}}</label>
                      <q-input v-model="tg2.value" class="import__input" dense borderless/>
                    </div>
                  </div>
                </div>
                <!-- import__grid -->
                  <q-input
                    v-model="model_password"
                    lazy-rules
                    :rules="[
                          val => val !== null && val !== '' || 'The required field',
                          val => val.length >= 8 || 'Please use maximum 8 characters'
                        ]"
                    class="input-password"
                    filled :type="isPwd ? 'password' : 'text'"
                    label="New password"
                    />
                  <q-input
                    v-model="model_confirmpassword"
                    lazy-rules
                    :rules="[
                          val => val !== null && val !== '' || 'The required field',
                          val => val.length >= 8 || 'Please use maximum 8 characters',
                          val => val == model_password || 'Different passwords'
                        ]"
                    label="Confirm password"
                    filled
                    class="input-password"
                    :type="isPwd2 ? 'password' : 'text'"
                    />

                <button class="btn btn--primary import__btn">Import</button>

<!--                 <a href="/accounts" class="btn btn&#45;&#45;primary import__btn">Import</a>-->
            </q-form>

          </div>
        </main>

    </div>
</template>
<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import axios from "axios";

export default {
  name: "Import",
  data(){
    return{
      account: {
        id: 0,
        phrase: [],
        confirmPhrase: false,
        password: "",
        name: "",
        details: "",
        blockchains: []
      },
      blockchains: [
        {
          label:'ETH',
          value: 60,
          wallets: []
        }
      ],
      mnemonicPhrase: [],
      count_phrase: 12,
      text_group_1: [
        {value: 'trouble'},
        {value: 'segment'},
        {value: 'nice'},
        {value: 'patrol'},
        {value: 'say'},
        {value: 'laundry'}
      ],
      text_group_2: [
        {value: 'lunch'},
        {value: 'weasel'},
        {value: 'royal'},
        {value: 'motor'},
        {value: 'midnight'},
        {value: 'royal'}
      ],
      model_password: '12345678',
      model_confirmpassword: '12345678',
      isPwd: true,
      isPwd2: true
    }
  },
  methods: {
    onSubmit(){

      this.mnemonicPhrase = []

      this.text_group_1.map((item) => {
        this.mnemonicPhrase.push(item.value)
      })
      this.text_group_2.map((item) => {
        this.mnemonicPhrase.push(item.value)
      })
      console.log('this.validationPhrase()',this.validationPhrase())

      if(this.validationPhrase()){

        console.log('Phrase valid')

        this.account.phrase = this.mnemonicPhrase
        this.account.password = this.model_password
        this.account.confirmPhrase = true

        console.log(this.account)

        //Получение кошелька
       this.createWallet()







      }
      // let accounts = []
      // let key_account = 0
      // this.account.password = this.model_password
      // accounts.push(this.account)
      // localStorage.setItem('accounts', JSON.stringify(accounts))
      // localStorage.setItem('key_account', key_account)
      // this.$router.push('/accounts')
    },
    onReset () {

    },
    createWallet(){


        axios.post(`${process.env. API}/create_wallet`, {
          mnemonic: this.phraseToString(this.mnemonicPhrase),
          blockchain: this.blockchains[0],
          wallet_number: 0
        })
          .then((response) => {
            //
            if(response.status === 200 && response.data.success){

              this.account.id = new Date().getTime()

              this.blockchains.map((item) => {
                if(item.label === 'ETH'){
                  let countWallets = item.wallets.length
                  item.wallets.push({
                    wallet: response.data.wallet,
                    value: response.data.wallet,
                    label: `Account ${countWallets + 1}`,
                    name: `Account ${countWallets + 1}`
                  })

                }
              })

              this.account.blockchains = this.blockchains
              let accounts = []
              accounts.push(this.account)
              localStorage.setItem('accounts', JSON.stringify(accounts))
              this.$router.push('/setupperson')
            }


          })
          .catch((error) => {
            console.error(error);
            return false
          })

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
  computed: {



  },

  mounted(){
    // let first = 1
    // console.log('submit', (`${this.texts.text+first}`))
  }
}


</script>
