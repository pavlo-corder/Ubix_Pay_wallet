<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" class="dialog z-top">
    <q-card class="q-dialog-plugin bg-white-dark">
      <q-card-section>
        <q-toolbar-title class="q-dialog__title">Choose identifier:</q-toolbar-title>
      </q-card-section>
      <q-card-section>
        <q-select
          v-model="identity"
          filled
          label="Select provider"
          :options="identityOptions"
          behavior="menu"
          :display-value="identity ? `${identity.socialNetwork}: ${identity.id}` : ''"
          class="input input--borderDark"
          popup-content-class="z-max">
          <template v-slot:option="scope">
            <q-item
              v-bind="scope.itemProps">
              <q-item-section side>
                <q-icon v-if="scope.opt.socialNetwork === 'telegram'" size="20px" name="img:https://cdn.cdnlogo.com/logos/t/39/telegram.svg"/>
                <q-icon v-if="scope.opt.socialNetwork === 'twitter'" size="20px" name="img:https://cdn.cdnlogo.com/logos/t/96/twitter-icon.svg"/>
                <q-icon v-if="scope.opt.socialNetwork === 'instagram'" size="20px" name="img:https://cdn.cdnlogo.com/logos/i/92/instagram.svg"/>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-ellipsis">
                  <span style="text-transform: capitalize">{{scope.opt.socialNetwork}}: &nbsp;</span>
                  <span>{{scope.opt.id}}</span>
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-card-section>

      <q-card-actions>
        <a v-if="identity" class="btn btn--primary q-mb-sm" @click="onOKClick">Link selected id to the account</a>
        <a class="btn btn--transparent" @click="onCancelClick">Cancel</a>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
  import {ref} from "vue";
  import {useDialogPluginComponent} from 'quasar'

  export default {
    name: "ChooseIdentifier",
    emits: [
      ...useDialogPluginComponent.emits
    ],
    setup () {
      const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

      return {
        identity: ref(null),
        identityOptions: [
          {
            socialNetwork: 'telegram',
            id: '@telegram_acc'
          },
          {
            socialNetwork: 'instagram',
            id: '@insta_acc'
          },
          {
            socialNetwork: 'twitter',
            id: '@twitter_acc'
          }
        ],

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
