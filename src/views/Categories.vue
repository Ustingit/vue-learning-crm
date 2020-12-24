<template>
    
<div>
  <div class="page-title">
    <h3>Категории</h3>
  </div>
  <section>
    <Loader v-if="loading" />
    <div class="row" v-else >
      <CategoryCreate @created="onCreate" />
      <CategoryEdit :categories="categories" @updated="updateCategories" :key="categories.length + updateCount" v-if="categories.length" />
      <p class="center" v-else >Категорий пока нет</p>
    </div>
  </section>
</div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate';
import CategoryEdit from '@/components/CategoryEdit';
import Loader from '../components/app/Loader.vue';

export default {
  name: 'Categories',
  components: {
    CategoryCreate, CategoryEdit
  },
  methods: {
    onCreate(category) {
      this.categories.push(category)
    },
    updateCategories(category) {
      const idx = this.categories.findIndex(x => x.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    }
  },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  metaInfo() {
    return {
      title: this.$title('pageTitle_Categories')
    }
  }
}
</script>
