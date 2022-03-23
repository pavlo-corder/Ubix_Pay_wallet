<template>
  <main class="q-pt-md">
    <div class="container">
      <q-form>
        <p class="text-subtitle2 q-mb-sm">From</p>
        <q-select
          v-model="wallet"
          :label="wallet.name"
          filled
          :options="walletOptions"
          behavior="menu"
          :display-value="`Balance: ${wallet.balance}`"
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
                <q-item-label class="text-subtitle2 text-bold">{{scope.opt.balance}}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <p class="text-subtitle2 q-mb-sm">To</p>

        <q-input v-model="recipient.address" readonly filled class="input input--borderDark q-mb-sm" label-slot>
          <template v-slot:prepend v-if="recipient.socialNetwork">
            <q-item-section side class="q-pr-none">
              <q-icon v-if="recipient.socialNetwork === 'telegram'" size="20px" name="img:https://cdn.cdnlogo.com/logos/t/39/telegram.svg"/>
              <q-icon v-if="recipient.socialNetwork === 'twitter'" size="20px" name="img:https://cdn.cdnlogo.com/logos/t/96/twitter-icon.svg"/>
            </q-item-section>
          </template>
          <template v-slot:label>
            <q-item-section>
              <q-item-label class="text-ellipsis">
                {{recipient.socialNetwork ? (recipient.socialNetwork === 'telegram' && 'Telegram: ' || recipient.socialNetwork === 'twitter' && 'Twitter: ') : ''}}
                {{recipient.name}}
              </q-item-label>
            </q-item-section>
          </template>
        </q-input>

        <h2 class="text-dark text-center q-mt-lg q-mb-md">Amount<br>0.5 ETH</h2>


        <q-card flat class="start-screen__person q-mb-md">
          <q-item class="q-pa-none">
            <q-item-section>
              <q-item-label class="text-body2">Estimated gas fee (?) $10 0.001 ETH </q-item-label>
              <q-item-label caption class="q-mb-sm text-grey">Max fee: 0.002 ETH</q-item-label>
              <q-item-label class="text-body2">Total:</q-item-label>
              <q-item-label class="text-body2">$1010 0.501 ETH</q-item-label>
              <q-item-label caption class="text-grey">Max amount: 0.502 ETH</q-item-label>
            </q-item-section>
          </q-item>
        </q-card>

        <a class="btn btn--primary">Next</a>
      </q-form>
    </div>
  </main>
</template>

<script>
  import {ref} from "vue";

  export default {
    name: "SendFinal",
    setup() {
      return {
        wallet: ref({
          name: 'Wallet1',
          balance: '45,256 UBX',
          icon: null
        }),
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
        address: ref(''),
        recipient: {
          name: 'tg_account_name',
          address: '0x8146ac15542B470770D49Bbd3402741d6febF62F',
          socialNetwork: 'telegram'
        }
      }
    }
  }
</script>
