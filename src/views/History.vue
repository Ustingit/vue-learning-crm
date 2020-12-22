<template>
    
<div>
  <div class="page-title">
    <h3>История записей</h3>
  </div>

  <div class="history-chart">
    <canvas></canvas>
  </div>

  <Loader v-if="loading" />
  <p v-else-if="!records.length" >История пуста. <router-link to="/record" >Добавьте первую запись</router-link></p>
  <section v-else >
    <HistoryTable :records="items" /> 
    <Paginate 
      v-model="page"
      :page-count="pageCount"
      :click-handler="pageChangeHandler"
      :prev-text="'Назад'"
      :next-text="'Вперёд'"
      :container-class="'pagination'"
      :page-class="'waves-effect'"
    >
    /></Paginate>
  </section>
</div>
</template>

<script>
import HistoryTable from './HistoryTable'
import paginationMixin from '@/mixins/pagination.mixin.js'

export default {
  name: 'History',
  mixins: [paginationMixin],
  components: {
    HistoryTable
  }, 
  data: () => ({
    records: [],
    categories: [],
    loading: true
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    var categories = await this.$store.dispatch('fetchCategories')

    this.setupPagination(this.records.map(record => {
      return {
        ...record,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход',
        categoryName: categories.find(x => x.id === record.categoryId).title || '-'
      }
    }))

     this.loading = false
  }
}
</script>
