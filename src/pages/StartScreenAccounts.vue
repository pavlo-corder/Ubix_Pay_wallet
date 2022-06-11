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
          class="start-screen__carousel">
          <q-carousel-slide v-for="(account, key) in accounts" :key="key" :name="0" class="start-screen__slide">
            <q-card flat class="start-screen__person">
              <q-item class="q-pa-none">
                <q-item-section>
                  <q-item-label caption>{{account.details}}</q-item-label>
                  <q-item-label class="text-h6 text-bold q-mb-sm">{{account.name}}</q-item-label>
                  <q-item-label caption>Social networks linked:</q-item-label>
                  <q-item-label class="text-body2">{{key}}</q-item-label>
                  <q-item-label>
                    <router-link to="/setupperson" class="link--big cursor-pointer">Setup your person</router-link>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-card>
          </q-carousel-slide>

          <div class="q-pt-md">
            <q-carousel-control position="bottom" :offset="[8,8]" class="start-screen__carousel"/>
          </div>
        </q-carousel>
        <!-- Persons carousel navigation -->
        <div class="row justify-center q-my-md">
          <q-option-group
            v-model="carousel"
            :options="carouselOptions"
            color="primary"
            inline dense/>
        </div>

        <!-- Person add buttons -->

        <a class="btn q-mb-md" @click="createAccount">Add another person</a>
      </div>

      <div>
        <!-- Account controls -->
        <div class="row items-center q-mb-md q-gutter-sm">

          <q-select
            v-model="model_blockchain"
            filled
            :options="blockchainsList"
            @update:model-value="changeBlockchain"
            behavior="menu"
            class="input input--borderDark col-auto"/>

          <q-select
            v-model="model_wallet"
            filled
            :options="walletsList"
            @update:model-value="changeWallet"
            behavior="menu"
            class="input input--borderDark col-grow"/>

          <q-btn
            @click="createWallet"
            round unelevated color="primary"
            :icon="matAdd"/>

        </div>
      </div>

      <div>
        <h1 class="q-mt-lg q-mb-md">Send</h1>

        <!-- Wallet -->
        <p class="text-subtitle2 text-bold q-mb-sm">Walletubix-1</p>
        <q-input
          v-model="model_wallet_to"
          lazy-rules

          label="Wallet"
          filled

        >
          <template v-slot:append>

            <q-icon :name="matIosShare"/>
          </template>
        </q-input>


<!--        <q-field-->
<!--          class="input input&#45;&#45;borderDark full-width"-->
<!--          filled-->
<!--          :icon-right="matIosShare">-->

<!--          <template v-slot:append>-->

<!--            <q-icon :name="matIosShare"/>-->
<!--          </template>-->

<!--        </q-field>-->

        <div class="row q-my-sm q-gutter-sm">
          <a class="btn col" @click="sendTransaction">Send</a>
          <a :href="`/send?to=${model_wallet_to}`">Send2</a>
          <a class="btn col" @click="showNotifNegative">Receive</a>
          <a class="btn col" @click="showNotifInfo">Link</a>
        </div>

        <!-- Tokens list -->
        <q-list class="q-pb-md">
          <q-item v-for="token in tokens" v-show="token.wallet" :key="token.label" class="q-pl-none">
            <q-item-section side>
              <q-avatar rounded size="56px" color="blue-transparent" text-color="blue-light">
                <q-icon v-show="token.label === 'ETH'" name="img:https://cdn.cdnlogo.com/logos/e/39/ethereum.svg"/>
                <q-avatar v-show="token.label === 'UBX'" rounded size="56px" color="blue-transparent" text-color="blue-light">
                  U
                </q-avatar>
                <q-avatar v-show="token.label === 'BTC'" rounded size="56px" color="blue-transparent" text-color="blue-light">
                  B
                </q-avatar>
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Balance:</q-item-label>
              <q-item-label class="text-subtitle2 text-bold">{{token.balance}} {{token.label}}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn round unelevated color="grey-gradient" @click="showWallet(token, model_wallet)" text-color="dark" :icon="matChevronRight"/>
            </q-item-section>
          </q-item>
        </q-list>

        <a class="btn btn--primary q-mb-lg" @click="importToken">Import tokens</a>
      </div>
    </div>
  </main>
</template>

<script>
  import axios from "axios";
  import { ref } from 'vue'
  import {matAdd, matIosShare, matChevronRight} from '@quasar/extras/material-icons'
  import { useQuasar } from 'quasar'
  import ImportToken from "components/ImportToken";
  import AddAccount from "components/AddAccount";
  import EditAccount from "components/EditAccount";
  import {useStore} from "vuex";
  import {updateWallets} from "src/store/account/mutations";

  export default {
    name: "Accounts",
    created() {
      this.matAdd = matAdd
      this.matIosShare = matIosShare
      this.matChevronRight = matChevronRight
    },
    setup() {
      const $q = useQuasar()

      const $store = useStore()

      function editAccount (key) {
        console.log(key)
        this.$router.push('/setupperson')
        // $q.dialog({
        //   componentProps: {
        //     idAccount: key
        //   },
        //   component: EditAccount
        // }).onOk(() => {
        //   // console.log('OK')
        // }).onCancel(() => {
        //   // console.log('Cancel')
        // }).onDismiss(() => {
        //   // console.log('I am triggered on both OK and Cancel')
        // })
      }

      function createAccount () {
        $q.dialog({
          component: AddAccount
        }).onOk((data) => {
          console.log('OK', data)
        }).onCancel(() => {
          console.log('Cancel')
        }).onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })
      }

      function importToken () {
        $q.dialog({
          component: ImportToken
        }).onOk(() => {
          // console.log('OK')
        }).onCancel(() => {
          // console.log('Cancel')
        }).onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })
      }

      function showNotifPositive() {
        $q.notify({
          //needs sanitizing!!!
          message: 'Transaction status: <span class="notification__msg notification__msg--positive">success</span>',
          html: true
        })
      }

      function showNotifNegative() {
        $q.notify({
          //needs sanitizing!!!
          message: 'Transaction status: <span class="notification__msg notification__msg--negative">fail</span>',
          html: true
        })
      }

      function showNotifWarning() {
        $q.notify({
          //needs sanitizing!!!
          message: 'Transaction status: <span class="notification__msg notification__msg--warning">warning</span>',
          html: true
        })
      }

      function showNotifInfo() {
        $q.notify({
          //needs sanitizing!!!
          message: 'Transaction status: <span class="notification__msg notification__msg--info">info</span>',
          html: true
        })
      }

      return {
        currency: ref('ETH'),
        carousel: 0,
        carouselOptions: [],

        editAccount,
        createAccount,
        importToken,
        showNotifPositive,
        showNotifNegative,
        showNotifWarning,
        showNotifInfo,

        account: $store.state.account.account,
        updateAccount: (val) => $store.commit('account/update', val),
        updateCurrentWallet: (val) => $store.commit('account/updateCurrentWallet', val),
        updateCurrentBlockchain: (val) => $store.commit('account/updateCurrentBlockchain', val),
        updateWallets: (val) => $store.commit('account/updateWallets', val)

      }
    },
    data(){
      return{
        accounts: [],
        model_blockchain: {},
        model_wallet: {},
        tokens: [
          {
            label: 'ETH',
            balance: '0.000000000000000',
            wallet: true
          },
          {
            label: 'BTC',
            balance: 0,
            wallet: false
          },
          {
            label: 'UBX',
            balance: 0,
            wallet: false
          }
        ],
        blockchainsList: [],
        walletsList: [],
        model_wallet_to: ''
      }
    },
    methods:{
      getBalance(){
        axios.post(`${process.env. API}/blockchain/get_balance`, {
          wallet: this.model_wallet.value,
          blockchain: 'ETH'
        })
        .then((response) => {
          console.log(response.data.success)
          // this.tokens = response.data.tokens
          if(response.data.success){
            this.tokens.map((item) => {
              if(item.label === response.data.value.label ){
                item.balance = response.data.value.balance
                item.wallet = response.data.value.wallet
              }
            })
          }
        })
        .catch((error) => {
          console.error(error);
        })
      },
      //TODO: Обязательно вынести в миксин
      createWallet(){

        // this.accounts.

        console.log(this.model_blockchain)
        //
        let count_wallets = (this.model_blockchain.wallets.length)

        console.log('count_wallets', count_wallets)


        let mnemonic = this.phraseToString(this.account.phrase)

        //
        axios.post(`${process.env. API}/blockchain/create_wallet`, {
          mnemonic: mnemonic,
          blockchain: {
            label: this.model_blockchain.label,
            value: this.model_blockchain.value
          },
          count_wallets: count_wallets,
          create_number_wallet: count_wallets
        })
          .then((response) => {
            console.log(response)
            if(response.status === 200 && response.data.success){

              let account = {...this.account}

              let name_wallet = `Wallet ${count_wallets + 1}`

              let new_wallet = {
                label: name_wallet,
                name: name_wallet,
                balance: 0,
                numberWallet: count_wallets,
                value: response.data.wallet,
                wallet: response.data.wallet
              }

              //
              // console.log('new_wallet', new_wallet, account.blockchains)
              //
              let blockchains = [...this.account.blockchains]
              //
              console.log('blockchains', blockchains)

              blockchains.map((item) => {

                if(item.label === this.model_blockchain.label){
                  console.log('new_wallet', new_wallet)
                  // let itemBlockchain = {...item}
                  // console.log('itemBlockchain', itemBlockchain)
                  // let wallets = [...itemBlockchain.wallets]
                  // console.log('wallets', wallets)
                  // wallets.push(new_wallet)
                  // console.log('wallets.push', wallets)
                  // item.wallets = wallets
                  // blockchains[key].wallets = wallets
                  // console.log('added new wallet')

                  this.updateWallets(new_wallet)

                }

              })
              //
              // console.log('blockchains', blockchains)
              //
              // // account.blockchains = blockchains
              //
              // console.log('account update wallets', account)

              this.updateAccount(account)
              this.updateCurrentWallet(new_wallet)
              this.setData()
              this.model_wallet = new_wallet
              this.getBalance()

              // this.accounts[0].blockchains.map((blockchain) => {
              //   if(blockchain.value === this.model_blockchain.value){
              //
              //     console.log('blockchain.wallets', blockchain.wallets)
              //     blockchain.wallets.push({
              //       wallet: response.data.wallet,
              //       value: response.data.wallet,
              //       label: `Account ${wallet_number + 1}_`,
              //       name: `Account ${wallet_number + 1}_`
              //     })
              //
              //   }
              // })
              // localStorage.setItem('accounts', JSON.stringify(this.accounts))
              // this.setData()
            }
          })
          .catch((error) => {
            console.error(error);
          })
      },
      changeWallet(wallet){
        this.model_wallet = wallet
        this.updateCurrentWallet(wallet)
        console.log('this.model_wallet', this.model_wallet)
        this.getBalance()
      },
      changeBlockchain(blockchain){
        this.model_blockchain = blockchain
        this.updateCurrentBlockchain(blockchain)
        this.setData()
        this.getBalance()

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
      setData(){
        this.accounts = []

        this.carouselOptions = []
        this.walletsList = []

        this.model_blockchain = {}
        this.model_wallet = {}

        this.accounts = JSON.parse(localStorage.getItem('accounts'))

        let account = {...this.account}

        // console.log(this.accounts)
        this.accounts.map(( item, key ) => {

          if(this.accounts.length > 1){
            this.carouselOptions.push({
              label: '',
              value: key
            })
          }

        })

        this.blockchainsList = account.blockchains
        this.model_blockchain = account.blockchains[0]

        // let current_blockchain = {...account.current_blockchain}
        // this.model_blockchain = {
        //   label: current_blockchain.label,
        //   name: current_blockchain.name,
        //   wallets: [...current_blockchain.wallets]
        // }


        this.walletsList = this.model_blockchain.wallets
        this.model_wallet = this.model_blockchain.wallets[0]


        console.log('current_blockchain', {...account.current_blockchain})

        // item.blockchains.map((blockchain) => {
        //
        //   if(blockchain.label === this.model_blockchain.label){
        //
        //   }
        //   this.blockchainsList.push({
        //     label: blockchain.label,
        //     value: blockchain.value,
        //   })
        //
        //   this.model_blockchain = item.blockchains[0]
        //   this.model_blockchain.wallets.map((wallet) => {
        //     this.walletsList.push({
        //       label: wallet.name,
        //       value: wallet.wallet,
        //       numberWallet: wallet.numberWallet
        //     })
        //   })
        //
        //   //
        // })
        //
        this.model_wallet = this.account.current_wallet
        //
      },
      showWallet(token, model_wallet){
        console.log(token, model_wallet)
        this.$global.$emit(('WALLET_SHOW'), {
          'wallet': token.wallet
        })
        this.$router.push({
          path: '/shareaddress',
          query: {
            'wallet': token.wallet,
            'account': model_wallet.label
          }
        })
      },
      sendTransaction(){

        console.log(this.model_blockchain)
        console.log(this.model_wallet)
        this.$router.push({
          path: '/send',
          query: { to: this.model_wallet_to }
        })

        // POST TRANSACTION
        // axios.post(`${process.env. API}/blockchain/send_transaction`, {
        //   wallet_provider: this.model_blockchain.value,
        //   wallet_number: this.model_wallet.numberWallet,
        //   wallet_to: this.model_wallet_to
        // })
        //   .then((response) => {
        //     console.log(response.data.success)
        //     if(response.data.success){
        //       this.showNotifPositive()
        //
        //     }
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //   })
      },
      setTransactionNumberWallet(){
        let account = {...this.account}
        this.updateAccount(account)
        // this.model_wallet_to
      }
    },
    mounted(){
      this.$global.$on('ACCOUNT_UPDATE', (data) => {
        if(data){
          this.setData()
        }
      })
      // useQuasar.$on('UPDATE_ACCOUNT', (data) => {
      //   console.log(data)
      // })
      this.setData()
      this.getBalance()
      // console.log(this.walletsList)
    }
  }
</script>
