<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    position="bottom"
    class="dialog z-top"
  >
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <q-list separator>
          <q-item v-for="(account, key) in accounts" :key="key">
            <q-item-section avatar side>
              <q-avatar color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-h6 text-bold q-mb-sm">{{
                account.name
              }}</q-item-label>
              <q-item-label caption>{{ account.details }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from "quasar";
import { computed, ref } from "@vue/reactivity";
import { useStore } from "vuex";

export default {
  name: "SelectAccount",
  props: {},

  emits: [...useDialogPluginComponent.emits],

  setup() {
    const store = useStore();
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();
    const accounts = computed(() => store.getters["account/getAccounts"]);

    return {
      accounts,
      dialogRef,
      onDialogHide,

      onOKClick() {
        onDialogOK();
      },

      onCancelClick: onDialogCancel,
    };
  },
};
</script>

<style scoped></style>
