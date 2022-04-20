<template>
  <main class="q-pt-md">
    <div class="container">
      <div class="q-mb-md text-center text-desktop-left">
        <p class="text-bold text-h6 text-blue">65,458 ETH</p>
        <p class="text-subtitle2 text-bold">1000 $</p>
      </div>

      <div class="row justify-center q-mb-md">
        <a class="col btn btn--primary btn--autoWidth btn--justify-start">
          <q-icon name="north_east"/>
          Send
        </a>
        <a class="col btn btn--autoWidth">Receive</a>
      </div>

      <p class="text-subtitle2 text-bold q-mb-md">Transactions</p>
      <div
        class="q-mb-lg"
        v-for="transactionsPerDay in transactions"
        v-bind:key="transactionsPerDay.timestamp">
        <p class="text-caption text-grey-dark q-mb-sm">
          {{moment(timestamp).format('D MMM YYYY')}}
        </p>
        <q-list class="input input--borderDark q-mb-md" separator>
          <q-item
            v-for="tx in transactionsPerDay.txns"
            v-bind:key="tx">
            <q-item-section>
              <q-item-label>
                {{tx.type === 'received' ? 'Received' : 'Sent'}}&nbsp;
                {{tx.coin}}&nbsp;
                {{tx.confirmed ? 'Confirmed' : 'Not confirmed'}}
              </q-item-label>
              <q-item-label caption>
                {{tx.confirmed ? 'Confirmed' : 'Not confirmed'}}
              </q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-item-label>{{tx.amount}}&nbsp;{{tx.coin}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>


      <a class="btn q-mb-sm">Full info on block explorer</a>
      <a class="btn btn--transparent q-mb-lg">Close</a>
    </div>
  </main>
</template>

<script>
  import moment from 'moment'

  export default {
    name: "AccountDetails",
    setup() {
      return {
        transactions: [
          {
            timestamp: '2022-03-30T14:21:23+00:00',
            txns: [
              {
                type: 'sent',
                confirmed: true,
                amount: 0.5,
                coin: 'ETH'
              },
              {
                type: 'received',
                confirmed: true,
                amount: 0.5,
                coin: 'ETH'
              },
              {
                type: 'received',
                confirmed: false,
                amount: 0.5,
                coin: 'ETH'
              }
            ]
          },
          {
            timestamp: '2022-03-30T14:21:23+00:00',
            txns: [
              {
                type: 'sent',
                confirmed: true,
                amount: 0.5,
                coin: 'ETH'
              },
              {
                type: 'received',
                confirmed: true,
                amount: 0.5,
                coin: 'ETH'
              }
            ]
          },
          {
            timestamp: '2022-03-30T14:21:23+00:00',
            txns: [
              {
                type: 'sent',
                confirmed: true,
                amount: 0.5,
                coin: 'ETH'
              },
              {
                type: 'received',
                confirmed: true,
                amount: 0.5,
                coin: 'ETH'
              }
            ]
          }
        ],
        moment
      }
    }
  }
</script>
