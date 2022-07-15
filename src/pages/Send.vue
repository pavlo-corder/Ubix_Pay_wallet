<template>
    <main class="q-pt-md">
      <div class="container">
        {{common}}

          <p class="text-subtitle2 q-mb-sm">From</p>

          <q-select
            v-model="model_wallet"
            :label="model_wallet.name"
            filled
            :options="walletOptions"
            behavior="menu"
            :display-value="`Balance: ${model_wallet.balance}`"
            class="input input--borderDark q-mb-md">
            <template v-slot:option="scope">
              <q-item
                v-bind="scope.itemProps">
                <q-item-section side>
                  <q-avatar rounded size="42px" color="blue-transparent" text-color="blue-light">
                    <template v-if="scope.opt.icon">
                      <q-icon :name="scope.opt.icon"/>
                    </template>
                    <template v-else>U</template>
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label caption>{{scope.opt.name}}</q-item-label>
                  <q-item-label class="text-subtitle2 text-bold">{{textPriceAndBlockchain(scope.opt.balance)}}</q-item-label>
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
            type="text"/>

            <button
              v-show="button_set_name"
              @click="addAddressName"
              class="btn btn--transparent q-mb-lg">
              Add this address
            </button>

            <button
              v-show="button_cancel_name"
              @click="cancelAddressName"
              class="btn btn--transparent q-mb-lg">
              Cancel
            </button>

            <button
              v-show="button_save_name"
              @click="savelAddressName"
              class="btn btn--transparent q-mb-lg">
              Save this address
            </button>

            <button
              v-show="button_edit_name"
              @click="editAddressName"
              class="btn btn--transparent q-mb-lg">
              Edit this address
            </button>




          <a class="btn btn--primary">Next</a>


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
          @popup-show="searchAddressMenuWidth = $refs.searchAddressSelect.$el.offsetWidth"
          :popup-content-style="`width: ${searchAddressMenuWidth}px`">
          <template v-if="searchAddress" v-slot:selected>
            <div class="text-ellipsis">
              {{searchAddress.name}}
            </div>
          </template>
          <template v-slot:prepend>
            <q-icon name="search"/>
          </template>
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section v-if="scope.opt.socialNetwork" side>
                <q-icon
                  size="20px"
                  v-if="scope.opt.socialNetwork === 'telegram'"
                  name="img:https://cdn.cdnlogo.com/logos/t/39/telegram.svg"/>
                <q-icon
                  size="20px"
                  v-if="scope.opt.socialNetwork === 'twitter'"
                  name="img:https://cdn.cdnlogo.com/logos/t/96/twitter-icon.svg"/>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-ellipsis">
                  {{scope.opt.socialNetwork ? (scope.opt.socialNetwork === 'telegram' && 'Telegram: ' || scope.opt.socialNetwork === 'twitter' && 'Twitter: ') : ''}}
                  {{scope.opt.name}}
                </q-item-label>
                <q-item-label caption class="text-ellipsis" style="max-width: 100%">{{scope.opt.address}}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </main>
</template>

<script>
  import {ref} from 'vue'
  import {useStore} from "vuex";
  import axios from "axios";
  // import {getBalance} from "src/store/wallet/mutations";

  export default {
      name: "Send",
      props: ['account'],
      setup() {

        const $store = useStore()

        return {

          searchAddress: ref(null),
          addresses: [
            {
              name: 'Alex',
              address: '0x8146ac15542B470770D49Bbd3402741d6febF62F',
              socialNetwork: null
            },
            {
              name: 'tg_account_name',
              address: '0x8146ac15542B470770D49Bbd3402741d6febF62F',
              socialNetwork: 'telegram'
            },
            {
              name: 'twi_account_name',
              address: '0x8146ac15542B470770D49Bbd3402741d6febF62F',
              socialNetwork: 'twitter'
            }
          ],
          searchAddressMenuWidth: 0,
          // account: $store.state.account.account,
          nicknames: $store.state.nicknames.nicknames,
          // current_wallet: $store.state.wallet.current_wallet,
          updateNicknames: (val) => $store.commit('nicknames/updateNicknames', val),
          getBalance: (val) => $store.dispatch('wallet/getBalance', val)

        }
      },
      data(){
        return{
          name: '',
          address: 'Address',

          dasableInput: true,

          button_set_name: true,
          button_cancel_name: false,
          button_save_name: false,
          button_edit_name: false,

          current_wallet: {},
          current_blockchain: {},
          model_wallet: {},
          walletOptions: [
            {
              name: 'Wallet1',
              balance: '45,256 UBX',
              icon: null
            },
            {
              name: 'Wallet2',
              balance: '65,256 UBX',
              icon: "img:https://cdn.cdnlogo.com/logos/e/39/ethereum.svg"
            }
          ],

        }
      },
      methods: {

        // getBalance(wallet){
        //
        //   axios.post(`${process.env. API}/blockchain/get_balance`, {
        //     wallet: wallet,
        //     blockchain: 'ETH'
        //   })
        //   .then((response) => {
        //     if(response.data.success){
        //       console.log('response.data.value.balance', response.data.value.balance)
        //       this.wallet.balance = `${response.data.value.balance} ${response.data.value.label}`
        //     }
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //   })
        //
        // },
        // getBalances(wallets){
        //
        //   axios.post(`${process.env. API}/blockchain/get_balances`, {
        //     wallets: wallets,
        //     blockchain: 'ETH'
        //   })
        //     .then((response) => {
        //       if(response.data.success){
        //         console.log('response.data.value.balance', response.data.value.balance)
        //         this.wallet.balance = `${response.data.value.balance} ${response.data.value.label}`
        //       }
        //     })
        //     .catch((error) => {
        //       console.error(error);
        //     })
        //
        // },
        addAddressName(){
          this.button_set_name = false
          this.button_cancel_name = true
          this.dasableInput = false
          setTimeout(() => {
            this.$refs.address.focus()
          }, 200)
        },
        cancelAddressName(){
          this.button_set_name = true
          this.button_cancel_name = false
          this.dasableInput = true
        },
          savelAddressName(){
          this.button_set_name = false
          this.button_cancel_name = false
          this.button_save_name = false
          this.button_edit_name = true
          this.dasableInput = true
          this.updateNicknames({
            blockchain: 'ETH',
            address: this.address,
            name: this.name,
            socialNetwork: false
          })
        },
        editAddressName(){
          this.button_set_name = false
          this.button_cancel_name = false
          this.button_save_name = true
          this.button_edit_name = false
          this.dasableInput = false
          setTimeout(() => {
            this.$refs.address.focus()
          }, 200)
        },
        changeAddressName(){
          if(this.address !== '') {
            this.button_save_name = true
            this.button_set_name = false
            this.button_cancel_name = false
          }else{
            this.button_save_name = false
            this.button_set_name = false
            this.button_cancel_name = true
          }
        },
        setBtnBack(){
          this.$global.$emit('BTN_BACK', {
            btn_back: true,
            route: '/accounts'
          })
        },
        getNickName(){
          this.nicknames.map((nickname) => {
            if(nickname.address === this.address){
              this.name = nickname.name
            }
          })
        },
        setData(){

            let account = {...this.account}
            let blockchains = [...account.blockchains]

            this.current_blockchain = {...account.current_blockchain}

            // console.log('account.current_wallet', {...account.current_wallet} )

            this.model_wallet = {...account.current_wallet}

            // this.getBalance(this.model_wallet.wallet)

            let wallets = []

            blockchains.map((blockchain) => {
              if(blockchain.label === this.current_blockchain.label){

                wallets = [...blockchain.wallets]

                let wal = []
                //
                wallets.map(({...wallet}) => {

                  console.log('current_blockchain.label', this.current_blockchain.label)
                  // console.log({...wallet.wallet})
                  // wallet.balance = `0.0000 ${current_blockchain.label}`


                  this.getBalance({
                      blockchain: this.current_blockchain.label,
                      wallet: {...wallet.wallet}
                    }).then((response) => {
                      console.log('response balance', response)

                    if(response.data.success){
                      wallet.balance = response.data.value.balance
                    }
                  })

                  wal.push(wallet)

                })


                console.log(wal)
                //
                this.walletOptions = wal
                // this.getBalances(wal)
                //
              }
            })


        },
        nextStep(){

        },
        textPriceAndBlockchain(price){
          return `${price} ${this.current_blockchain.label}`
        }
      },

      mounted(){
        //
        // console.log('{...account.current_blockchain}', {...this.account.current_blockchain})

        this.setData()

        if(this.$route.query.to){
          this.address = this.$route.query.to
          // this.getBalance(this.current_wallet.wallet)
        }

        this.getNickName()

        setTimeout(()=>{
          this.setBtnBack()
        }, 0)

      }
  }
</script>
