<template>
    <div>
        <main class="create-wallet">
            <div class="container">
                <h1 class="text-center">Create wallet</h1>

                <!-- start stepper
                .stepper__step--active - active step (blue dot)
                .stepper__step--complete -- complete step (green dot & check icon)
                -->
                <div class="stepper create-wallet__stepper">
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
                        v-model="password"
                        lazy-rules
                        :rules="Required"
                        ref="fldPasswordChange"
                        class="input input--borderDark"
                        filled :type="isPwd2 ? 'password' : 'text'"
                        label="New password"
                        />
                    <q-input
                        v-model="confirmPassword"
                        lazy-rules ref="fldPasswordChangeConfirm"
                        :rules="ConfirmPWD"
                        label="Confirm password"
                        filled
                        class="input input--borderDark"
                        :type="isPwd3 ? 'password' : 'text'"
                        />
                </q-form>

                <router-link to="/createwalletstep2" class="btn btn--primary create-wallet__btn">Create new wallet</router-link>
            </div>
        </main>
    </div>
</template>
<script>
import { ref } from 'vue'

export default({
  name: "CreateWalletStep1",
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
