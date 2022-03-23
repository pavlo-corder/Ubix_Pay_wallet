<template>
  <main class="start-screen">
    <div class="container">
      <h1>Set up your person</h1>
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md q-mb-md q-mt-md">
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

        <h2 class="text-black q-mt-lg">External identifiers</h2>
        <div>
          <a class="link--big">What is it?</a>
        </div>

        <a class="btn btn--primary btn--autoWidth">Link external identifiers</a>
      </q-form>

      <q-list class="input input--borderDark q-mb-md" separator>
        <q-item
          v-for="acc in identifiers"
          v-bind:key="acc.id">
          <q-item-section side>
            <q-icon v-if="acc.socialNetwork === 'telegram'" size="20px" name="img:https://cdn.cdnlogo.com/logos/t/39/telegram.svg"/>
            <q-icon v-if="acc.socialNetwork === 'twitter'" size="20px" name="img:https://cdn.cdnlogo.com/logos/t/96/twitter-icon.svg"/>
            <q-icon v-if="acc.socialNetwork === 'instagram'" size="20px" name="img:https://cdn.cdnlogo.com/logos/i/92/instagram.svg"/>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-ellipsis">
              <span style="text-transform: capitalize">{{acc.socialNetwork}}: &nbsp;</span>
              <span>{{acc.id}}</span>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </main>
</template>

<script>
  import {ref} from 'vue'

  export default {
    name: "SetUpPerson",
    setup() {
      return {
        name: ref(''),
        details: ref(''),
        identifiers: [
          {
            socialNetwork: 'telegram',
            id: '@telegram_acc'
          },
          {
            socialNetwork: 'instagram',
            id: '@insta_acc'
          },
          {
            socialNetwork: 'twitter',
            id: '@twitter_acc'
          }
        ]
      }
    }
  }
</script>
