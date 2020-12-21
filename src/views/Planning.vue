<template>
    
<div>
  <div class="page-title">
    <h3>Планирование</h3>
    <h4>{{info.bill | currencyfilter('RUB')}}</h4>
  </div>

  <Loader v-if="loading" />
  <p v-else-if="!categories.length" >Категорий пока нет. <router-link to="/categories" >добавить категорию</router-link></p>
  <section v-else >
    <div v-for="cat in categories" :key="cat.id" >
      <p>
        <strong>{{cat.title}}:</strong>
        {{cat.spend | currencyfilter}} из {{cat.limit | currencyfilter}}
      </p>
      <div class="progress" v-tooltip="cat.tooltip" >
        <div
            class="determinate" :class="[cat.progresColor]"
            :style="{width: cat.progresPercent + '%'}"
        ></div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import currencyFilter from '@/filters/currency.filter'

export default {
  name: 'Planning',
  data: () => ({
    loading: true,
    categories: []
  }),
  async mounted() {
    var records = await this.$store.dispatch('fetchRecords')
    var categories = await this.$store.dispatch('fetchCategories')

    this.categories = categories.map(cat => {
      const spend = records
      .filter(x => x.categoryId === cat.id)  //how much money did we spend for currnt category
      .filter(x => x.type === 'outcome')
      .reduce((total, record) => {
        return total += +record.sum //to avoid string concatenation if we got string
      }, 0); 

      const percent = 100 * spend / cat.limit;
      const progresPercent = percent > 100 ? 100 : percent;  //avoi progre more than 100% in case of troubles
      const progresColor = progresPercent < 60 ?
        'green' : 
        progresPercent < 100 
          ? 'yellow'
          : 'red';
        const tooltipValue = cat.limit - spend
        const tooltip = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`

        return {
          ...cat,
          progresPercent,
          progresColor,
          spend,
          tooltip
        }
    })

    this.loading = false
  },
  computed: {
    ...mapGetters(['info']) //we can call this ith name 'info'
  }
}
</script>