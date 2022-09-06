<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" class="dialog z-top">
    <q-card class="q-dialog-plugin bg-white-dark">
      <q-card-section>
        <span class="q-dialog__title">Do you want to log out of your wallet?</span>
      </q-card-section>
      <q-card-actions>
        <a class="btn btn--primary q-mb-sm" @click="onCancelClick">No</a>
        <a class="btn btn--transparent" @click="onOKClick">Yes</a>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
  import {ref} from "vue";
  import {useDialogPluginComponent} from 'quasar'

  export default {
    name: "LogOut",
    emits: [
      ...useDialogPluginComponent.emits
    ],
    setup() {
      const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

      return {
        dialogRef,
        onDialogHide,

        onOKClick: onDialogOK,
        onCancelClick: onDialogCancel
      }
    }
  }
</script>
