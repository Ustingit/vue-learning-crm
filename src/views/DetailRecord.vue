<template>
<div>
  <Loader v-if="loading" />
  <div v-else-if="record" >
    <div class="breadcrumb-wrap">
      <a href="/history" class="breadcrumb">История</a>
      <a class="breadcrumb">
        {{ record.type === 'outcome' ? 'Расход' : 'Доход' }}
      </a>
    </div>
    <div class="row">
      <div class="col s12 m6">
        <div class="card" :class="record.type === 'outcome' ? 'red' : 'green'" >
          <div class="card-content white-text">
            <p>Описание: {{record.description}}</p>
            <p>Сумма: {{record.sum | currencyfilter('RUB') }}</p>
            <p>Категория: {{record.categoryName}}</p>

            <small>{{record.date}}</small>
          </div>
        </div>
      </div>
    </div>
  </div>

  <p v-else class="center" >Запись с айди = {{$route.params.id}} не существует</p>
</div>
</template>

<script>
import Loader from '../components/app/Loader.vue'
export default {
  components: { Loader },
  name: 'DetailedRecord',
  data: () => ({
    loading: true,
    record: null
  }),
  async mounted() {
    const id = this.$route.params.id
    if (id) {
      const record = await this.$store.dispatch('fetchRecordById', id)
      const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)
      
      this.record = {
        ...record,
        categoryName: category.title
      }

      this.loading = false
    }
  }
}
</script>