<template>
      <div class="col s12 m6">
        <div>
          <div class="page-subtitle">
            <h4>Редактировать</h4>
          </div>

          <form @submit.prevent="onSubmit" >
            <div class="input-field" >
              <select ref="select" v-model="currentCategory" >
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{category.title}}
                </option>
              </select>
              <label>Выберите категорию</label>
            </div>

            <div class="input-field">
              <input
                  id="name"
                  type="text"
                  v-model="name"
                  :class="{invalid: $v.name.$dirty && !$v.name.required}"
              >
              <label for="name">Название</label>
              <span v-if="$v.name.$dirty && !$v.name.required" class="helper-text invalid">Введите название категории</span>
            </div>

            <div class="input-field">
              <input
                  id="limit"
                  type="number"
                  v-model.number="limit"
                  :class="{invalid: ($v.limit.$dirty && !$v.limit.required || $v.limit.$dirty && !$v.limit.minValue)}"
              >
              <label for="limit">Лимит</label>
              <span v-if="$v.limit.$dirty && !$v.limit.required" class="helper-text invalid">Введите лимит</span>
              <span v-else-if="$v.limit.$dirty && !$v.limit.minValue" class="helper-text invalid">Минимальное значение {{$v.limit.$params.minValue.min}}</span>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
              Обновить
              <i class="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  created() {
    const {id, title, limit} = this.categories[0]
    this.currentCategory = id
    this.name = title
    this.limit = limit
  },
  watch: {
    currentCategory(value) {
      var {title, limit} = this.categories.find(x => x.id === value);

      this.name = title
      this.limit = limit
    }
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try{
        const newData = {
          id: this.currentCategory,
          title: this.name,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', newData)

        this.$message('Категория успешно обновлена')
        this.$emit('updated', newData)
      } catch(e) {}
    }
  },
  props: {
    categories: {
      required: true,
      type: Array
    }
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields()
  },
  data: () => ({
    select: null,
    currentCategory: null,
    name: '',
    limit: 100
  }),
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  validations: {
        name: { required },
        limit: { required, minValue: minValue(100) }
  }
}
</script>
