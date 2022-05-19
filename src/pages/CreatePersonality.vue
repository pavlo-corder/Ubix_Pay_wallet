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
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md q-mb-md">
        <q-input
          v-model="name"
          class="input input--borderDark"
          filled
          label="Enter your name"
          type="text"
        />
        <q-input
          v-model="details"
          class="input input--borderDark"
          filled
          label="Any details you'd like to share"
          type="textarea"
        />
        <button class="btn btn--primary">Create personality</button>

      </q-form>

    </div>
  </main>
</template>

<script>
  import { ref } from 'vue'


  export default {
      name: "CreatePersonality",
      setup() {
        return {
          name: ref(''),
          details: ref('')
        }
      },
    data(){
        return{
          accounts: []
        }
    },
      methods: {
        onSubmit(e){
          e.preventDefault()
         if(this.name.length > 2){
           this.accounts[0].name = this.name
           this.accounts[0].details = this.details
           localStorage.setItem('accounts', JSON.stringify(this.accounts))
           this.$router.push('/accounts')
         }
        },
        onReset(){

        }
      },
      mounted() {
        this.accounts = JSON.parse(localStorage.getItem('accounts'))

      }
  }
</script>
