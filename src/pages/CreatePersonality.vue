<template>
  <main class="start-screen">
    <div class="container">
      <h1>
        You can<br />
        <a class="link" href="#">create your digital personality</a>
      </h1>

      <p class="start-screen__subtitle">
        <a href="#" class="link--big">What is it?</a>
      </p>

      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md q-mb-md">
        <q-input
          v-model="name"
          class="input input--borderDark"
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
        <button class="btn btn--primary">Create personality</button>
      </q-form>
    </div>
  </main>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "CreatePersonality",
  setup() {
    const $store = useStore();
    return {
      name: ref(""),
      details: ref(""),
      account: { ...$store.state.account.account },
      updateAccount: (val) => $store.commit("account/update", val),
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      if (this.name.length > 2) {
        this.account.name = this.name;
        this.account.details = this.details;
        this.updateAccount(this.account);
        this.$router.push("/accounts");
      }
    },
    onReset() {},
  },
};
</script>
