<template>
    <div>
        <main class="import">
          <div class="container">
            <h1>You can import wallet by posting your secret set phrase:</h1>            
            <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md"
              >
                <div class="import__grid">
                  <div class="import__grid--left">
                    <div class="import__inputWrap">
                      <q-input v-model="text" class="import__input" />
                    </div>
                  </div>
                </div>

                <div>
                  <q-btn label="Submit" type="submit" color="primary"/>
                  <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
            </q-form>

            <div class="import__grid">
              <div class="import__grid--left">
                <div class="import__inputWrap">
                  <label for="phrase_1">1</label>
                  <input type="text" id="phrase_1" class="import__input">
                </div>

                <div class="import__inputWrap">
                  <label for="phrase_2">2</label>
                  <input type="text" id="phrase_2" class="import__input">
                </div>

                <div class="import__inputWrap">
                  <label for="phrase_3">3</label>
                  <input type="text" id="phrase_3" class="import__input">
                </div>

                <div class="import__inputWrap">
                  <label for="phrase_4">4</label>
                  <input type="text" id="phrase_4" class="import__input">
                </div>

                <div class="import__inputWrap">
                  <label for="phrase_5">5</label>
                  <input type="text" id="phrase_5" class="import__input">
                </div>

                <div class="import__inputWrap">
                  <label for="phrase_6">6</label>
                  <input type="text" id="phrase_6" class="import__input">
                </div>
              </div>

              <div class="import__grid--right">
                <div class="import__inputWrap">
                  <label for="phrase_7">7</label>
                  <input type="text" id="phrase_7" class="import__input">
                </div>

                <div class="import__inputWrap">
                  <label for="phrase_8">8</label>
                  <input type="text" id="phrase_8" class="import__input">
                </div>

                <div class="import__inputWrap">
                  <label for="phrase_9">9</label>
                  <input type="text" id="phrase_9" class="import__input">
                </div>

                <div class="import__inputWrap">
                  <label for="phrase_10">10</label>
                  <input type="text" id="phrase_10" class="import__input">
                </div>

                <div class="import__inputWrap">
                  <label for="phrase_11">11</label>
                  <input type="text" id="phrase_11" class="import__input">
                </div>

                <div class="import__inputWrap">
                  <label for="phrase_12">12</label>
                  <input type="text" id="phrase_12" class="import__input">
                </div>
              </div>
            </div>

            <div class="import__password">
              <input type="text" class="input input--borderDark" placeholder="New password">
            </div>

            <div class="import__password">
              <input type="text" class="input input--borderDark" placeholder="Confirm password">
            </div>

            <a href="/" class="btn btn--primary import__btn">Import</a>
          </div>
        </main>

    </div>
</template>
<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default {
  setup () {
    const $q = useQuasar()

    const name = ref(null)
    const age = ref(null)
    const accept = ref(false)
    return {
      text: ref(''),     

    
      name,
      age,
      accept,

      onSubmit () {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first'
          })
        }
        else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })
        }
      },

      onReset () {
        name.value = null
        age.value = null
        accept.value = false
      }
    }
    }
  }

</script>