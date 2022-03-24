<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" class="dialog z-top">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <q-toolbar-title class="q-dialog__title text-center" style="white-space: inherit;">
          Congratulations!<br>
          You've successfuly linked<br>
          your person to a Twitter account!
        </q-toolbar-title>
      </q-card-section>
      <q-card-actions>
        <a class="btn btn--transparent" @click="onCancelClick">Close</a>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
  import {useDialogPluginComponent} from "quasar";

  export default {
    name: "IdentityLinked",
    emits: [
      ...useDialogPluginComponent.emits
    ],
    setup () {
      const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

      return {
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
