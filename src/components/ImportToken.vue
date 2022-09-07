<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" class="dialog z-top">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <q-toolbar-title class="q-dialog__title">Import token</q-toolbar-title>
      </q-card-section>
      <q-card-section>
        <q-input
          v-model="tokenInfo.address"
          class="input input--borderDark q-mb-sm mb-4"
          filled
          label="Token address contract"
          type="text"
          @change="onChangeTokenAddress"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'The required field',
            (val) =>
              val.length == 42 || 'Please use valid token address (42 letters)',
          ]"
        />
        <q-input
          v-model="tokenInfo.symbol"
          class="input input--borderDark q-mb-sm"
          filled
          label="Token symbol"
          type="text"
        />
        <q-input
          v-model="tokenInfo.decimals"
          class="input input--borderDark"
          filled
          label="Token decimal"
          type="text"
        />
      </q-card-section>

      <q-card-actions>
        <a class="btn btn--primary q-mb-sm" @click="omImportToken">
          Import tokens
        </a>
        <a class="btn btn--transparent" @click="onCloseModal">Skip for now</a>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import { useDialogPluginComponent } from "quasar";
import { fetchTokenInformation } from "src/helper/ethers-interact";
import { useStore } from "vuex";
export default {
  name: "ImportToken",
  emits: [...useDialogPluginComponent.emits],

  setup() {
    const store = useStore();

    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();

    const omImportToken = () => {
      store.commit("account/addCustomToken", tokenInfo.value);
      onDialogOK();
      window.location.reload();
    };
    const tokenInfo = ref({
      address: "",
      symbol: "",
      decimals: "",
      type: "ERC20",
    });
    const onChangeTokenAddress = async (e) => {
      const inputValue = e;
      if (inputValue.length === 42) {
        tokenInfo.value = await fetchTokenInformation(inputValue);
      }
    };
    return {
      omImportToken,

      dialogRef,
      onDialogHide,
      onChangeTokenAddress,
      tokenInfo,

      onCloseModal() {
        onDialogOK();
      },

      onCancelClick: onDialogCancel,
    };
  },
};
</script>
