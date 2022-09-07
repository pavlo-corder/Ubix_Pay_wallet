<template>
  <main class="welcome">
    <div class="container">
      <h1 class="welcome__title">
        Wallet is <br />
        <span class="welcome__link">Locked</span>
      </h1>

      <q-input
        v-model="password"
        lazy-rules
        label="Password"
        type="password"
        filled
      >
        <template v-slot:append>
          <q-icon :name="matIosShare" />
        </template>
      </q-input>

      <q-btn
        @click="unlockWallet"
        class="btn btn--primary create-wallet__unlock"
      >
        Unlock
      </q-btn>
    </div>
  </main>
</template>

<script>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "Locked",
  setup() {
    const store = useStore();
    const router = useRouter();
    const password = ref("");

    const unlockWallet = () => {
      if (password.value.length === 0) return;
      try {
        store.dispatch("account/unlockAccount", password.value);
        router.push("/accounts");
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    };
    return {
      unlockWallet,
      password,
    };
  },
};
</script>
