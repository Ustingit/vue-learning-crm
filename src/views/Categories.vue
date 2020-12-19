<template>
    
<div>
  <div class="page-title">
    <h3>Категории</h3>
  </div>
  <section>
    <div class="row">
      <CategoryCreate @created="onCreate" />
      <CategoryEdit />
    </div>
  </section>
</div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate';
import CategoryEdit from '@/components/CategoryEdit';

export default {
  name: 'Categories',
  components: {
    CategoryCreate, CategoryEdit
  },
  methods: {
    onCreate(category) {
      this.categories.push(category)
      console.log(this.categories)
    }
  },
  data: () => ({
    categories: []
  })
}
</script>
