<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" class="dialog z-top">
    <q-card class="q-dialog-plugin bg-white-dark">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-card-section>
          <q-toolbar-title class="q-dialog__title"
            >Create account</q-toolbar-title
          >
        </q-card-section>
        <q-card-section>
          <!--          <q-input-->
          <!--            v-model="password"-->
          <!--            class="input input&#45;&#45;borderDark q-mb-sm"-->
          <!--            filled-->
          <!--            label="Create password"-->
          <!--            type="password"-->
          <!--          />-->
          {{ password }}
          <q-input
            v-model="password"
            lazy-rules
            :rules="[
              (val) => (val !== null && val !== '') || 'The required field',
              (val) => val.length >= 8 || 'Please use maximum 8 characters',
            ]"
            class="input-password"
            filled
            :type="isPwd ? 'password' : 'text'"
            label="Create password"
          />
        </q-card-section>

        <q-card-actions>
          <q-btn class="btn btn--primary q-mb-sm">Create</q-btn>
          <a class="btn btn--transparent" @click="onCancelClick">Cancel</a>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import { useDialogPluginComponent } from "quasar";

export default {
  name: "AddAccount",
  emits: [...useDialogPluginComponent.emits],
  setup() {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();

    return {
      isPwd: true,
      password: ref(""),

      dialogRef,
      onDialogHide,

      onOKClick() {
        onDialogOK(this.password);
      },

      onCancelClick: onDialogCancel,
    };
  },
  methods: {
    onSubmit() {
      this.onOKClick();
    },
  },
};
</script>
