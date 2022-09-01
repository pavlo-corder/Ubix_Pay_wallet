<template>
  <main class="start-screen">
    <div class="container">
      <h1>Set up your person</h1>
      <q-form class="q-gutter-md q-mb-md q-mt-md">
        <q-input
          v-model="name"
          @keyup="changeInput"
          class="input input--borderDark"
          filled
          label="Enter your name"
          type="text"
        />
        <q-input
          v-model="details"
          @keyup="changeInput"
          class="input input--borderDark"
          filled
          label="Any details you'd like to share"
          type="textarea"
        />

        <h2 class="text-black q-mt-lg">External identifiers</h2>
        <div>
          <a class="link--big">What is it?</a>
        </div>

        <a
          class="btn btn--primary btn--autoWidth"
          @click="chooseIdentityProvider"
          >Link external identifiers</a
        >
      </q-form>

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
import { ref } from "vue";
import { useQuasar } from "quasar";
import ChooseIdentityProvider from "components/ChooseIdentityProvider";
import { useStore } from "vuex";

export default {
  name: "SetUpPerson",
  data() {
    return {
      name: ref(""),
      details: ref(""),
    };
  },
  setup() {
    const $q = useQuasar();
    const $store = useStore();

    function chooseIdentityProvider() {
      $q.dialog({
        component: ChooseIdentityProvider,
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
      chooseIdentityProvider,
      account: $store.state.account.account,
      updateAccount: (val) => $store.commit("account/update", val),
    };
  },
  methods: {
    changeInput() {
      let account = { ...this.account };

      account.name = this.name;
      account.details = this.details;
      console.log(account);
      this.updateAccount(account);
    },
    setBtnBack() {
      this.$global.$emit("BTN_BACK", {
        btn_back: true,
        route: "/accounts",
      });
    },
  },
  mounted() {
    this.name = this.account.name;
    this.details = this.account.details;

    console.log("account mounted  ", this.account);

    setTimeout(() => {
      this.setBtnBack();
    }, 0);
  },
};
</script>
