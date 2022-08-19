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
          :options="blockchains"
          behavior="menu"
          class="input input--borderDark"
        />
      </div>
      <button @click="createWallet" class="btn btn--primary">Create new wallet</button>
    </div>
  </main>
</template>

<script>
import {computed, ref} from 'vue'
  import axios from "axios";
  import {useStore, mapState} from "vuex";
// import {updateWallets} from "src/store/account/mutations";

  export default {
      name: "StartScreen",
      setup() {
        const $store = useStore()
        return {
          blockchains: [...$store.state.account.account.blockchains],
          model_currency: {...$store.state.account.account.blockchains[0]},
          // account: {...$store.state.account.account},
          updateAccount: (val) => $store.commit('account/update', val),
          updateWallets: (val) => $store.commit('account/updateWallets', val)

        }
      },

      computed:{
        ...mapState({ account: state => state.account.account })
      },
      methods: {
        //TODO: Обязательно вынести в миксин
        createWallet(){

          axios.post(`${process.env. API}/blockchain/create_wallet`, {
            mnemonic: this.phraseToString(this.account.phrase),
            blockchain: this.model_currency,
            wallet_number: 0
          })
            .then((response) => {
              if(response.status === 200 && response.data.success){

                let blockchains = [...this.account.blockchains]

                blockchains.map((item, key) => {

                  if(item.value === this.model_currency.value){
                    this.updateWallets({
                      blockchain: item,
                      wallet: {
                        wallet: response.data.wallet,
                        value: response.data.wallet,
                        label: `Wallet ${item.wallets.length + 1}`,
                        name: `Wallet ${item.wallets.length + 1}`
                      }
                    })

                  }

                })

                this.$router.push('/setupperson')
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

    },
      mounted(){

      // let key_account = localStorage.getItem('key_account')
      // if(key_account){
      //   this.key_account = key_account
      // }
      // let accounts = JSON.parse(localStorage.getItem('accounts'))
      // if(accounts){
      //   this.accounts = accounts
      // }
    }
  }
</script>
