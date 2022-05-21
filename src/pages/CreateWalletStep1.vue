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
                <div class="stepper__step stepper__step--active">
                    <div class="stepper__circle"></div>
                    <span class="stepper__text">Step 1</span>
                </div>
                <div class="stepper__step">
                    <div class="stepper__circle"></div>
                    <span class="stepper__text">Step 2</span>
                </div>
                <div class="stepper__step">
                    <div class="stepper__circle"></div>
                    <span class="stepper__text">Step 3</span>
                </div>
                </div>
                <!-- stepper end -->
                <q-form
                  @submit="onSubmit"
                  @reset="onReset"
                  class="q-gutter-md q-mb-md"
                >
                    <q-input
                        v-model="model_password"
                        lazy-rules
                        :rules="[
                          val => val !== null && val !== '' || 'The required field',
                          val => val.length >= 8 || 'Please use maximum 8 characters'
                        ]"
                        ref="fldPasswordChange"

                        filled
                        :type="isPwd2 ? 'password' : 'text'"
                        label="New password"

                        />
                    <q-input
                        v-model="model_confirmpassword"
                        lazy-rules
                        ref="fldPasswordChangeConfirm"
                        :rules="[
                          val => val !== null && val !== '' || 'The required field',
                          val => val.length >= 8 || 'Please use maximum 8 characters',
                          val => val == model_password || 'Different passwords'
                        ]"
                        label="Confirm password"
                        filled
                        :type="isPwd3 ? 'password' : 'text'"
                        />

                  <button

                    class="btn btn--primary create-wallet__btn"
                  >Create new wallet</button>
                </q-form>


            </div>
        </main>
    </div>
</template>
<script>
import { ref } from 'vue'


export default({
  name: "CreateWalletStep1",
  data(){
    return{
      account: {
        phrase: [],
        confirmPhrase: false,
        password: "",
        name: "",
        details: "",
        blockchains: []
      },
      isPwd2: true,
      isPwd3: true,
      model_password: '',
      model_confirmpassword: ''
    }
  },
  methods: {
    onSubmit(){
      let accounts = []
      let key_account = 0
      this.account.password = this.model_password
      accounts.push(this.account)
      localStorage.setItem('accounts', JSON.stringify(accounts))
      localStorage.setItem('key_account', key_account)
      this.$router.push('/createwalletstep2')
    }
  }
});
</script>

<style>
.q-field--filled .q-field__control:before,
.q-field--filled.q-field--highlighted .q-field__control:before {
  opacity: 1;
  background: rgb(255 255 255);
  border: 1px solid rgb(204 204 204);
}
</style>
