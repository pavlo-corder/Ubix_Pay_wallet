<template>
  <main class="start-screen">
    <div class="container">
      <h1>You can<br>
        <a class="link" href="#">create your digital personality</a>
      </h1>

      <p class="start-screen__subtitle">
        <a href="#" class="link--big">What is it?</a>
      </p>

<!--      <div class="select start-screen__select">-->
<!--        <div class="select__current">ETH</div>-->
<!--      </div>-->
      <div class="q-mb-md">
        <q-select
          v-model="model_currency"
          filled
          :options="account.blockchain"
          behavior="menu"
          class="input input--borderDark"
        />
      </div>
      <button @click="createWallet" class="btn btn--primary">Create new wallet</button>
    </div>
  </main>
</template>

<script>
  import { ref } from 'vue'
  import axios from "axios";

  export default {
      name: "StartScreen",
      setup() {
        return {
          model_currency: ref({label:'ETH', value: 60}),
          accounts: [],
          account: {
            blockchains: [
              {
                label:'ETH',
                value: 60,
                wallets: []
              }
            ]
          }
        }
      },
    methods: {
        //TODO: Обязательно вынести в миксин
        createWallet(){
          axios.post(`${process.env. API}/create_wallet`, {
            mnemonic: this.phraseToString(JSON.parse(localStorage.getItem('phrase'))),
            blockchain: this.model_currency,
            wallet_number: 0
          })
            .then((response) => {
              if(response.status === 200 && response.data.success){
                this.account.id = new Date().getTime()
                this.account.blockchains.map((item) => {
                  if(item.value === this.model_currency.value){
                    let countWallets = item.wallets.length
                    item.wallets.push({
                      wallet: response.data.wallet,
                      value: response.data.wallet,
                      label: `Accoucnt ${countWallets + 1}_`,
                      name: `Accoucnt ${countWallets + 1}_`
                    })
                  }
                })

                this.accounts.push(this.account)

                localStorage.setItem('accounts', JSON.stringify(this.accounts))

                // console.log(this.account.blockchain)
                this.$router.push('/createpersonality')
              }
            })
            .catch((error) => {
              console.error(error);
            })
        },
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
        },

    }
  }
</script>
