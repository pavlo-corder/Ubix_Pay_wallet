<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" class="dialog z-max">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <q-toolbar-title class="q-dialog__title">Import token</q-toolbar-title>
      </q-card-section>
      <q-card-section>
        <q-input
          v-model="contract"
          class="input input--borderDark q-mb-sm"
          filled
          label="Token address contract"
          type="text"
        />
        <q-input
          v-model="symbol"
          class="input input--borderDark q-mb-sm"
          filled
          label="Token symbol"
          type="text"
        />
        <q-input
          v-model="decimal"
          class="input input--borderDark"
          filled
          label="Token decimal"
          type="text"
        />
      </q-card-section>

      <q-card-actions>
        <a class="btn btn--primary q-mb-sm" @click="onCancelClick">Import tokens</a>
        <a class="btn btn--transparent create-wallet__btn" @click="onOKClick">Skip for now</a>
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
    import {ref} from "vue";
    import { useDialogPluginComponent } from 'quasar'

    export default {
      name: "ImportToken",
      emits: [
        ...useDialogPluginComponent.emits
      ],
      setup () {
        const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

        return {
          contract: ref(''),
          symbol: ref(''),
          decimal: ref(''),

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
