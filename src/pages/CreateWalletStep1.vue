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
                        :rules="Required"
                        ref="fldPasswordChange"
                        class="input input--borderDark"
                        filled
                        :type="isPwd2 ? 'password' : 'text'"
                        label="New password"

                        />
                    <q-input
                        v-model="model_confirmpassword"
                        lazy-rules
                        ref="fldPasswordChangeConfirm"
                        :rules="ConfirmPWD"
                        label="Confirm password"
                        filled
                        class="input input--borderDark"
                        :type="isPwd3 ? 'password' : 'text'"
                        />
                </q-form>
              <button
                @click="createWallet"
                class="btn btn--primary create-wallet__btn"
              >Create new wallet</button>

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
      isPwd2: true,
      isPwd3: true,
      model_password: '',
      model_confirmpassword: ''
    }
  },
  methods: {
    createWallet(){
      if(this.model_password === this.model_confirmpassword){
        localStorage.setItem('password', JSON.stringify(this.model_password))
        this.$router.push('/createwalletstep2')
      }
    }
  },
  computed: {
  ConfirmPWD() {
    return [
        (v) => !!v || "The required field",
        (v) => v == this.$refs.fldPasswordChange.value || "Different passwords"
        ]
    },
    Required() {
        return [(v) => !!v || 'The required field']
    }
  },
  setup () {
    return {
      password: ref(''),
      confirmPassword: ref(''),
    }
  }
});
</script>
