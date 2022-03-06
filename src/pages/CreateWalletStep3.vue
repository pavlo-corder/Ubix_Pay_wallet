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
                    <div class="stepper__step stepper__step--complete">
                        <div class="stepper__circle"></div>
                        <span class="stepper__text">Step 1</span>
                    </div>
                    <div class="stepper__step stepper__step--complete">
                        <div class="stepper__circle"></div>
                        <span class="stepper__text">Step 2</span>
                    </div>
                    <div class="stepper__step stepper__step--active">
                        <div class="stepper__circle"></div>
                        <span class="stepper__text">Step 3</span>
                    </div>
                </div>
                <!-- stepper end -->

                <q-card class="create-wallet__info">
                    Confirm your secret seedphrase by choosing words in a correct order:
                </q-card>

                <q-card class="seed-phrase create-wallet__seed-phrase">
                    <q-card-section class="seed-phrase__word">eat</q-card-section>
                    <q-card-section class="seed-phrase__word">buns</q-card-section>
                    <q-card-section class="seed-phrase__word">these</q-card-section>
                    <q-card-section class="seed-phrase__word">soft</q-card-section>
                    <q-card-section class="seed-phrase__word">eat</q-card-section>
                    <q-card-section class="seed-phrase__word">eat</q-card-section>
                    <q-card-section class="seed-phrase__word">french</q-card-section>
                    <q-card-section class="seed-phrase__word">eat</q-card-section>
                    <q-card-section class="seed-phrase__word">eat</q-card-section>
                    <q-card-section class="seed-phrase__word">have</q-card-section>
                    <q-card-section class="seed-phrase__word">eat</q-card-section>
                    <q-card-section class="seed-phrase__word">eat</q-card-section>
                </q-card>

                <a href="/#/createwalletstep3" class="btn btn--primary create-wallet__btn">Next</a>
                <a href="/" class="btn btn--transparent create-wallet__btn">Skip for now</a>
            </div>
        </main>
    </div>
</template>
<script>
import { ref } from 'vue'

export default({
  name: "CreateWalletStep3",
});
</script>