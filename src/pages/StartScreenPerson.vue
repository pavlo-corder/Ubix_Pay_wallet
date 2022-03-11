<template>
  <main class="start-screen">
    <div class="container">
      <q-card flat class="start-screen__person">
        <div>
          <div class="text-caption text-grey-dark">name</div>
          <div class="start-screen__personValue">Mr. Evil Genius</div>
        </div>
        <div>
          <div class="text-caption text-grey-dark">Social networks linked:</div>
          <div class="start-screen__personValue--small">0</div>
        </div>
      </q-card>

      <p class="start-screen__subtitle">
        <a href="#" class="link--big">Setup your person</a>
      </p>

<!--      <div class="select start-screen__select">-->
<!--        <div class="select__current">ETH</div>-->
<!--      </div>-->
      <div class="q-mb-md">
        <q-select
          v-model="currency"
          filled
          :options="currencyOptions"
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
