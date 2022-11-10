<template>
  <q-dialog
    v-model="dialog"
    ref="dialogRef"
    @hide="onDialogHide"
    class="dialog z-top"
  >
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
import { useDialogPluginComponent, useQuasar } from "quasar";
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  props: ["idAccount"],
  name: "EditAccount",

  emits: [...useDialogPluginComponent.emits],
  setup() {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();

    const store = useStore();

    const accounts = computed(() => store.getters["account/getAccounts"]);

    const dialog = ref(false);
    const account = ref({});
    const name = ref("");
    const details = ref("");

    onMounted(async () => {
      account.value = accounts.value[0];
      if (account.value.name) {
        name.value = account.value.name;
      }
      if (account.value.details) {
        details.value = account.value.details;
      }
    });

    const onOKClick = () => {
      account.value.name = name.value;
      account.value.details = details.value;
      accounts.value[0] = account.value;
      this.$global.$emit("ACCOUNT_UPDATE", true);
      dialog = false;
    };

    return {
      dialog,
      details,
      dialogRef,
      onDialogHide,

      onOKClick,
      onCancelClick: onDialogCancel,
    };
  },
};
</script>
