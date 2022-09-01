<template>
  <main class="q-pt-md">
    <div class="container">
      <div class="q-mb-md text-center text-desktop-left">
        <p class="text-h6 text-bold q-mb-sm">UBX Account #1</p>
        <p class="text-subtitle2">Address:</p>
        <p class="text-bold text-h6 text-blue text-wrap">
          0x8146ac15542B470770D49Bbd3402741d6febF62F
        </p>
      </div>

      <a class="btn btn--primary q-mb-lg" @click="chooseIdentifier"
        >Link identifier</a
      >

      <p class="text-subtitle2 text-bold q-mb-sm">
        Identifiers linked to the account:
      </p>

      <q-list class="input input--borderDark q-mb-md" separator>
        <q-item v-for="acc in identifiers" v-bind:key="acc.id">
          <q-item-section side>
            <q-icon
              v-if="acc.socialNetwork === 'telegram'"
              size="20px"
              name="img:https://cdn.cdnlogo.com/logos/t/39/telegram.svg"
            />
            <q-icon
              v-if="acc.socialNetwork === 'twitter'"
              size="20px"
              name="img:https://cdn.cdnlogo.com/logos/t/96/twitter-icon.svg"
            />
            <q-icon
              v-if="acc.socialNetwork === 'instagram'"
              size="20px"
              name="img:https://cdn.cdnlogo.com/logos/i/92/instagram.svg"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-ellipsis">
              <span style="text-transform: capitalize"
                >{{ acc.socialNetwork }}: &nbsp;</span
              >
              <span>{{ acc.id }}</span>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </main>
</template>

<script>
import ChooseIdentifier from "components/ChooseIdentifier";
import { useQuasar } from "quasar";

export default {
  name: "LinkAccount",
  setup() {
    const $q = useQuasar();

    function chooseIdentifier() {
      $q.dialog({
        component: ChooseIdentifier,
      })
        .onOk(() => {})
        .onCancel(() => {})
        .onDismiss(() => {});
    }

    return {
      identifiers: [
        {
          socialNetwork: "telegram",
          id: "@telegram_acc",
        },
        {
          socialNetwork: "instagram",
          id: "@insta_acc",
        },
        {
          socialNetwork: "twitter",
          id: "@twitter_acc",
        },
      ],
      chooseIdentifier,
    };
  },
};
</script>
