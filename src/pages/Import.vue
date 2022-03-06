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
                <!-- import__grid -->
                <div class="import__grid">
                  <!-- import__grid--left -->
                  <div class="import__grid--left">
                    <!-- import__inputWrap -->
                    <div class="import__inputWrap">
                      <label for="">1</label>
                      <q-input v-model="text1" class="import__input" />
                    </div>
                    <!-- import__inputWrap -->
                    <div class="import__inputWrap">
                      <label for="">2</label>
                      <q-input v-model="text2" class="import__input" />
                    </div>
                    <!-- import__inputWrap -->
                    <div class="import__inputWrap">
                      <label for="">3</label>
                      <q-input v-model="text3" class="import__input" />
                    </div>
                    <!-- import__inputWrap -->
                    <div class="import__inputWrap">
                      <label for="">4</label>
                      <q-input v-model="text4" class="import__input" />
                    </div>
                    <!-- import__inputWrap -->
                    <div class="import__inputWrap">
                      <label for="">5</label>
                      <q-input v-model="text5" class="import__input" />
                    </div>
                    <!-- import__inputWrap -->
                    <div class="import__inputWrap">
                      <label for="">6</label>
                      <q-input v-model="text6" class="import__input" />
                    </div>
                    <!-- import__inputWrap -->
                  </div>
                  <!-- import__grid--left -->
                  <div class="import__grid--right">
                      <!-- import__inputWrap -->
                    <div class="import__inputWrap">
                      <label for="">7</label>
                      <q-input v-model="text7" class="import__input" />
                    </div>
                    <!-- import__inputWrap -->
                    <div class="import__inputWrap">
                      <label for="">8</label>
                      <q-input v-model="text8" class="import__input" />
                    </div>
                    <!-- import__inputWrap -->
                    <div class="import__inputWrap">
                      <label for="">9</label>
                      <q-input v-model="text9" class="import__input" />
                    </div>
                    <!-- import__inputWrap -->
                    <div class="import__inputWrap">
                      <label for="">10</label>
                      <q-input v-model="text10" class="import__input" />
                    </div>
                    <!-- import__inputWrap -->
                    <div class="import__inputWrap">
                      <label for="">11</label>
                      <q-input v-model="text11" class="import__input" />
                    </div>
                    <!-- import__inputWrap -->
                    <div class="import__inputWrap">
                      <label for="">12</label>
                      <q-input v-model="text12" class="import__input" />
                    </div>
                    <!-- import__inputWrap -->
                  </div>
                </div>
                <!-- import__grid -->
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
                      
                 <a href="/#/createwalletstep1" class="btn btn--primary import__btn">Import</a>
            </q-form>

          </div>
        </main>

    </div>
</template>
<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default {
  name: "Import",
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
    const $q = useQuasar()

    const name = ref(null)
    const age = ref(null)
    const accept = ref(false)
    return {
      text1: ref(''),     
      text2: ref(''),     
      text3: ref(''),     
      text4: ref(''),     
      text5: ref(''),     
      text6: ref(''),     
      text7: ref(''),     
      text8: ref(''),     
      text9: ref(''),     
      text10: ref(''),     
      text11: ref(''),     
      text12: ref(''),  
      password: ref(''),
      confirmPassword: ref(''),  
    
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