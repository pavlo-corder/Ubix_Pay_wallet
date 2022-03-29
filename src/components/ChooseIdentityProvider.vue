<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" class="dialog z-top">
    <q-card class="q-dialog-plugin bg-white-dark">
      <q-card-section>
        <q-toolbar-title class="q-dialog__title">{{title}}</q-toolbar-title>
      </q-card-section>
      <q-card-section>
        <q-select
          v-model="provider"
          filled
          label="Select provider"
          :options="providerOptions"
          behavior="menu"
          class="input input--borderDark"
          popup-content-class="z-max"
        />
      </q-card-section>
      <template v-if="provider">
        <q-card-section>
          <div>Twit this text and paste the link to the twit, so we could verify you're the owner of the account:</div>
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="verificationText"
            filled
            type="textarea"
            class="input input--borderDark q-mb-sm"
            :icon="matContentCopy"
            bottom-slots
          >
            <template v-slot:append>
              <q-btn
                size="12px"
                round
                flat
                dense
                icon="content_copy" @click="() => copy(verificationText)"></q-btn>
            </template>
          </q-input>

          <q-input
            v-model="link"
            filled
            class="input input--borderDark"
            label="Your link here"
          />
        </q-card-section>
      </template>

      <q-card-actions>
        <a v-if="provider" class="btn btn--primary q-mb-sm" @click="onOKClick">Verify</a>
        <a class="btn btn--transparent" @click="onCancelClick">Cancel</a>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
  import {ref} from "vue";
  import {useDialogPluginComponent, copyToClipboard, useQuasar} from 'quasar'
  import IdentityLinked from "components/IdentityLinked";

  export default {
    name: "ChooseIdentityProvider",
    emits: [
      ...useDialogPluginComponent.emits
    ],
    setup () {
      const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

      const $q = useQuasar()

      function copy(text) {
        copyToClipboard(text)
        $q.notify({
          message: 'Copied to clipboard!'
        })
      }

      return {
        title: ref('Choose identity provider'),
        password: ref(''),
        provider: ref(null),
        providerOptions: ['Twitter', 'Instagram', 'Telegram'],
        verificationText: ref(''),
        link: ref(''),
        $q: useQuasar(),

        copied: false,
        copy,

        dialogRef,
        onDialogHide,

        onOKClick () {
          onDialogOK()
          $q.dialog({
            component: IdentityLinked
          }).onOk(() => {

          }).onCancel(() => {
            // onDialogOK()
          }).onDismiss(() => {

          })

        },

        onCancelClick: onDialogCancel
      }
    }
  }
</script>
