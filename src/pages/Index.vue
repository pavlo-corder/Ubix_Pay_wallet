<template>
  <main class="welcome">
    <div class="container">
      <h1 class="welcome__title">
        Welcome<br />
        to <a href="/" class="welcome__link">ubix pay</a>,<br />
        first digital wallet implementing<br />
        the concept of<br />
        self-ownership!
      </h1>

      <h2 class="welcome__subtitle">To start you can</h2>
      <router-link to="/createwalletstep1" class="btn btn--primary welcome__btn"
        >create new wallet</router-link
      >
      <div class="text-h5 text-center q-my-md">Or</div>
      <router-link to="/import" class="btn">import existing wallet</router-link>
      <div class="text-h5 text-center q-my-md">Or</div>
      <router-link to="/importprivate" class="btn">import existing privatkey</router-link>
    </div>
  </main>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import account from "src/store/account";

export default defineComponent({
  name: "PageIndex",
});
</script>
