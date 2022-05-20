<template>
  <q-dialog v-model="dialog" ref="dialogRef" @hide="onDialogHide" class="dialog z-top">
    <q-card class="q-dialog-plugin bg-white-dark">
      <q-card-section>
        <q-toolbar-title class="q-dialog__title">Edit account</q-toolbar-title>
      </q-card-section>
      <q-card-section>
        <q-input
          v-model="name"
          class="input input--borderDark q-mb-sm"
          filled
          label="Enter your name"
          type="text"
        />
        <q-input
          v-model="details"
          class="input input--borderDark"
          filled
          label="Any details you'd like to share"
          type="textarea"
        />
      </q-card-section>

      <q-card-actions>
        <a class="btn btn--primary q-mb-sm" @click="onOKClick">Save</a>
        <a class="btn btn--transparent" @click="onCancelClick">Cancel</a>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

  import {useDialogPluginComponent, useQuasar} from 'quasar'

  export default {
    props:['idAccount'],
    name: "EditAccount",
    data(){
      return{
        dialog: false,
        accounts: [],
        account: {},
        name: '',
        details: ''
      }
    },
    emits: [
      ...useDialogPluginComponent.emits
    ],
    setup () {
      const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

      return {
        dialogRef,
        onDialogHide,

        onCancelClick: onDialogCancel
      }
    },
    methods:{
      onOKClick () {

        this.account.name = this.name
        this.account.details = this.details
        console.log('account', this.account)
        this.accounts[0] = this.account
        localStorage.setItem('accounts', JSON.stringify(this.accounts))
        this.$global.$emit('ACCOUNT_UPDATE', true)
        this.dialog = false

      },
    },
    mounted() {
      this.accounts = JSON.parse(localStorage.getItem('accounts'))
      this.account = this.accounts[0]
      if(this.account.name){
        this.name = this.account.name
      }
      if(this.account.details){
        this.details = this.account.details
      }
    }
  }
</script>
