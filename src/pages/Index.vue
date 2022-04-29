<template>
   <main class="welcome">
      <div class="container">
        <h1 class="welcome__title">Welcome<br>
          to <a href="/" class="welcome__link">ubix pay</a>,<br>
          first digital wallet implementing<br>
          the concept of<br>
          self-ownership!
        </h1>

        <h2 class="welcome__subtitle">To start you can</h2>
        <router-link to="/createwalletstep1" class="btn btn--primary welcome__btn">create new wallet</router-link>
        <h2 class="welcome__subtitle">Or</h2>
        <router-link to="/import" class="btn">import existing wallet</router-link>
      </div>
    </main>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageIndex",
});
</script>
