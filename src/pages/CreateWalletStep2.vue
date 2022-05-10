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
          if(response.data){
            this.mnemonicPhrase = response.data
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    savePhrase(){
      if(this.validationPhrase()){
        localStorage.setItem('phrase', JSON.stringify(this.mnemonicPhrase))
        this.$router.push('/createwalletstep3')
      }
    },
    validationPhrase(){

      const resultValidate = async () => {

        await axios.post('http://localhost:3000/validation_phrase', {
          'mnemonic': this.phraseToString(this.mnemonicPhrase)
        })
          .then((response) => {
            if(response.data.success){
              return response.data.success
            }
          })
          .catch((error) => {
            console.error(error);
          })
      }

      return resultValidate()

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
    }
  },
  mounted(){
    //TODO: отрефакторить и вынести в отдельный модуль
    this.generateRandomPhrase()
  }
});
</script>
