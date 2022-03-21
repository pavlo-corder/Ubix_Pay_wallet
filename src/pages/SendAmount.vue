<template>
  <main class="q-pt-md">
    <div class="container">
      <q-form>
        <div class="row justify-between items-center q-mb-md q-gutter-sm">
          <div class="col-6">
            <q-select
              v-model="currency"
              filled
              :options="currencyOptions"
              behavior="menu"
              class="input input--borderDark"/>
          </div>
          <div class="col-auto">
            <a class="link link--big">Use max</a>
          </div>
        </div>

        <div class="row q-mb-md q-gutter-sm items-center">
          <div class="col">
            <q-input
              v-model="amountCoins"
              filled
              class="input input--borderDark"/>
          </div>
          <div class="col-auto">
            <q-icon name="swap_horiz" size="20px"></q-icon>
          </div>
          <div class="col">
            <q-input
              v-model="amountDollars"
              filled
              prefix="$"
              class="input input--borderDark"/>
          </div>
        </div>

        <p class="row items-center">
          <span class="text-caption text-grey-dark">Balance:&nbsp;</span>
          <span class="text-bold text-h6">{{balance}}</span>
        </p>

      </q-form>
    </div>
  </main>
</template>

<script>
  import {ref} from 'vue'

  export default {
    name: "SendAmount",
    setup() {
      return {
        currency: ref('ETH'),
        currencyOptions: ['ETH', 'UBX'],
        amountCoins: ref(.5),
        amountDollars: ref(130),
        balance: 456
      }
    }
  }
</script>
