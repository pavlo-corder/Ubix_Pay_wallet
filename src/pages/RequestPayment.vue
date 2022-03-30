<template>
  <main class="start-screen">
    <div class="container">
      <h1>Request payment</h1>

      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-mb-md">
        <q-input
          v-model="amount"
          class="input input--borderDark q-mb-md"
          filled
          label="Enter amount"
          type="number"
        />
        <p class="text-subtitle2 q-mb-sm">Select coin</p>
        <q-select
          v-model="currency"
          filled
          :options="currencyOptions"
          behavior="menu"
          class="input input--borderDark q-mb-md"
        />

        <a href="/" class="btn btn--primary">Request</a>
      </q-form>
    </div>
  </main>
</template>

<script>
  import { ref } from 'vue'

  export default {
      name: "RequestPayment",
      setup() {
        return {
          amount: ref(null),
          currency: ref('ETH'),
          currencyOptions: ['ETH', 'ETH1', 'ETH2']
        }
      }
  }
</script>
