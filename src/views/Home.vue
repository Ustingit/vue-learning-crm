<template>
  <div>
<div>
  <div class="page-title">
    <h3>Счет</h3>

    <button class="btn waves-effect waves-light btn-small" @click="refresh" >
      <i class="material-icons">refresh</i>
    </button>
  </div>

  <loader v-if="loading" />
  <div v-else class="row">
    <HomeBill :rates="currency.rates" />
    <HomeCurrency :rates="currency.rates" :date="currency.date" />
  </div>
</div>
  </div>
</template>

<script>
import HomeCurrency from '@/components/HomeCurrency'
import HomeBill from '@/components/HomeBill'
import Loader from '../components/app/Loader.vue';

export default {
  name: 'Home',
  components: {
    HomeCurrency, HomeBill
  },
  data: () => ({
    loading: true,
    currency: null
  }),
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency')
    this.loading = false
  },
  methods: {
    async refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    }
  },
  metaInfo() {
    return {
      title: this.$title('pageTitle_Home')
    }
  }
};
</script>
