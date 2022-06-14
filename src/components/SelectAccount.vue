<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" position="bottom" class="dialog z-top">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <q-list separator>
          <q-item v-for="(account, key) in accounts" :key="key">
            <q-item-section avatar side>
              <q-avatar color="primary"/>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-h6 text-bold q-mb-sm">{{account.name}}</q-item-label>
              <q-item-label caption>{{account.details}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
  import { useDialogPluginComponent } from 'quasar'
  import {ref} from "@vue/reactivity";

  export default {
    name: "SelectAccount",
    props: {

    },

    emits: [
      ...useDialogPluginComponent.emits
    ],

    setup () {

      const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
      const accounts = ref(JSON.parse(localStorage.getItem('accounts')))
      console.log(accounts.value)
      // dialogRef      - Vue ref to be applied to QDialog
      // onDialogHide   - Function to be used as handler for @hide on QDialog
      // onDialogOK     - Function to call to settle dialog with "ok" outcome
      //                    example: onDialogOK() - no payload
      //                    example: onDialogOK({ /*.../* }) - with payload
      // onDialogCancel - Function to call to settle dialog with "cancel" outcome

      return {
        // This is REQUIRED;
        // Need to inject these (from useDialogPluginComponent() call)
        // into the vue scope for the vue html template
        dialogRef,
        onDialogHide,

        // other methods that we used in our vue html template;
        // these are part of our example (so not required)
        onOKClick () {
          // on OK, it is REQUIRED to
          // call onDialogOK (with optional payload)
          onDialogOK()
          // or with payload: onDialogOK({ ... })
          // ...and it will also hide the dialog automatically
        },

        // we can passthrough onDialogCancel directly
        onCancelClick: onDialogCancel,
        accounts
      }
    }
  }
</script>

<style scoped>

</style>
