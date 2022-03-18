<template>
  <main class="q-pt-md">
    <div class="container">
      <div class="q-mb-xl text-center">
        <p class="text-subtitle2">Address:</p>
        <p class="text-bold text-h6 text-blue text-wrap">0x8146ac15542B470770D49Bbd3402741d6febF62F</p>
      </div>
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md q-mb-md">
        <q-input
          v-model="name"
          class="input input--borderDark"
          filled
          label="Enter nickname"
          type="text"/>
        <q-input
          v-model="details"
          class="input input--borderDark"
          filled
          label="Enter memo"
          type="textarea"/>
      </q-form>

      <a class="btn btn--primary q-mb-sm">Add and proceed</a>
      <a class="btn btn--transparent">Back</a>
    </div>
  </main>
</template>

<script>
    export default {
        name: "AddAddress"
    }
</script>
