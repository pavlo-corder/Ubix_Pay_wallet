<template>
    <div>
        <main class="create-wallet">
            <div class="container">
                <h1 class="text-center text-desktop-left">Create wallet</h1>

                <!-- start stepper
                .stepper__step--active - active step (blue dot)
                .stepper__step--complete -- complete step (green dot & check icon)
                -->
                <div class="stepper create-wallet__stepper flex-desktop-left">
                    <div class="stepper__step stepper__step--complete">
                        <div class="stepper__circle"></div>
                        <span class="stepper__text">Step 1</span>
                    </div>
                    <div class="stepper__step stepper__step--active">
                        <div class="stepper__circle"></div>
                        <span class="stepper__text">Step 2</span>
                    </div>
                    <div class="stepper__step">
                        <div class="stepper__circle"></div>
                        <span class="stepper__text">Step 3</span>
                    </div>
                </div>
                <!-- stepper end -->

                <div class="warning create-wallet__warning">
                     Save your secret seedphase in a safe place and don't share it with anyone!
                </div>

                <div class="seed-phrase create-wallet__seed-phrase">
                    <div v-for="(phrase, key) in mnemonicPhrase" :key="key" class="seed-phrase__word">{{phrase}}</div>
                </div>

                <button @click="savePhrase" class="btn btn--primary create-wallet__btn">Next</button>
<!--                <router-link to="/createwalletstep3" class="btn btn&#45;&#45;primary create-wallet__btn">Next</router-link>-->
                <a href="/" class="btn btn--transparent create-wallet__btn">Skip for now</a>
            </div>
        </main>
    </div>
</template>
<script>
import { ref } from 'vue'
import axios from 'axios'

export default({
  name: "CreateWalletStep2",
  data(){
    return{
      countwords: 12,
      mnemonicPhrase: []
    }
  },
  methods: {

    generateRandomPhrase() {
      //TODO: вынести в env
      axios.get('http://localhost:3000/mnemonic')
        .then((response) => {
          console.log(response.data);
          if(response.data){
            this.mnemonicPhrase = response.data
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    savePhrase(){
      localStorage.setItem('phrase', JSON.stringify(this.mnemonicPhrase))
      this.$router.push('/createwalletstep3')
    },
  },
  mounted(){
    //TODO: отрефакторить и вынести в отдельный модуль
    this.generateRandomPhrase()
  }
});
</script>
