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
          <q-input
            v-model="address"
            class="input input--borderDark q-mb-sm"
            filled
            label="Address"
            type="text"/>
          <template v-if="address">
            <a class="btn btn--transparent q-mb-lg">Add this address</a>
          </template>
          <a class="btn btn--primary">Next</a>
        </q-form>

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
  export default {
      name: "Send",
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
          searchAddressMenuWidth: 0
        }
      }
  }
</script>
