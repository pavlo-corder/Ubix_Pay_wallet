<template>
  <main class="start-screen">
    <div class="container">
      <q-card flat class="start-screen__person">
        <q-item class="q-pa-none">
          <q-item-section>
            <q-item-label caption>name</q-item-label>
            <q-item-label class="text-h6 text-bold q-mb-sm">Mr. John Doe</q-item-label>
            <q-item-label caption>Social networks linked:</q-item-label>
            <q-item-label class="text-body2">2</q-item-label>
          </q-item-section>
        </q-item>
      </q-card>

      <p class="start-screen__subtitle">
        <a href="#" class="link--big">Set-up your person</a>
      </p>

<!--      <div class="select start-screen__select">-->
<!--        <div class="select__current">ETH</div>-->
<!--      </div>-->
      <div class="q-mb-md">
        <q-select
          v-model="currency"
          filled
          :options="currencyOptions"
          behavior="menu"
          class="input input--borderDark"
        />
      </div>


      <a href="/" class="btn btn--primary">Create new wallet</a>
    </div>
  </main>
</template>

<script>
  import { ref } from 'vue'

  export default {
      name: "StartScreen",
      setup() {
        return {
          currency: ref('ETH'),
          currencyOptions: ['ETH', 'ETH1', 'ETH2']
        }
      }
  }
</script>
