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

                <div class="create-wallet__info">
                    Confirm your secret seedphrase by choosing words in a correct order:
                </div>

                <div class="seed-phrase create-wallet__seed-phrase">
                    <div class="seed-phrase__word">eat</div>
                    <div class="seed-phrase__word">buns</div>
                </div>

                <div class="phrase-suggestions create-wallet__seed-phrase">
                  <div class="phrase-suggestions__word">eat</div>
                  <div class="phrase-suggestions__word phrase-suggestions__word--selected">buns</div>
                  <div class="phrase-suggestions__word">these</div>
                  <div class="phrase-suggestions__word">soft</div>
                  <div class="phrase-suggestions__word">eat</div>
                  <div class="phrase-suggestions__word phrase-suggestions__word--selected">eat</div>
                  <div class="phrase-suggestions__word">french</div>
                  <div class="phrase-suggestions__word">eat</div>
                  <div class="phrase-suggestions__word">eat</div>
                  <div class="phrase-suggestions__word">have</div>
                  <div class="phrase-suggestions__word">eat</div>
                  <div class="phrase-suggestions__word">eat</div>
                </div>

                <a href="/#/createwalletstep3" class="btn btn--primary create-wallet__btn disabled" >Next</a>
                <a href="/" class="btn btn--transparent create-wallet__btn">Skip for now</a>
            </div>
        </main>
    </div>
</template>
<script>

export default({
  name: "CreateWalletStep3",
});
</script>
