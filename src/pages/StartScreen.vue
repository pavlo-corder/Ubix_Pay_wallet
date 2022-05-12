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
          v-model="currency"
          filled
          :options="currencyOptions"
          behavior="menu"
          class="input input--borderDark"
        />
      </div>
      <router-link to="/" class="btn btn--primary">Create new wallet</router-link>
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
          currencyOptions: ['BTN', 'ETH', 'UBX']
        }
      }
  }
</script>
