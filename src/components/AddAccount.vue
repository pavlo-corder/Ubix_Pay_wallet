<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" class="dialog z-max">
    <q-card class="q-dialog-plugin bg-white-dark">
      <q-card-section>
        <q-toolbar-title class="q-dialog__title">Create account</q-toolbar-title>
      </q-card-section>
      <q-card-section>
        <q-input
          v-model="password"
          class="input input--borderDark q-mb-sm"
          filled
          label="Create password"
          type="password"
        />
      </q-card-section>

      <q-card-actions>
        <a class="btn btn--primary q-mb-sm" @click="onCancelClick">Create</a>
        <a class="btn btn--transparent create-wallet__btn" @click="onOKClick">Cancel</a>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
  import {ref} from "vue";
  import { useDialogPluginComponent } from 'quasar'

  export default {
    name: "AddAccount",
    emits: [
      ...useDialogPluginComponent.emits
    ],
    setup () {
      const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

      return {
        password: ref(''),

        dialogRef,
        onDialogHide,

        onOKClick () {
          onDialogOK()
        },

        onCancelClick: onDialogCancel
      }
    }
  }
</script>
