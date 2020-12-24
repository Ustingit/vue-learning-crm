<template>
    
<div>
  <div class="page-title">
    <h3>Новая запись</h3>
  </div>

  <Loader v-if="loading" />
  <p v-else-if="!categories.length" >Доступные категории отсутствуют. <router-link to="/categories" >добавить категорию</router-link></p>
  <form v-else class="form" @submit.prevent="onSubmit" >
    <div class="input-field" >
      <select ref="select" v-model="currenctCategory" >
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

    <p>
      <label>
        <input v-model="type"
            class="with-gap"
            name="type"
            type="radio"
            value="income"
        />
        <span>Доход</span>
      </label>
    </p>

    <p>
      <label>
        <input v-model="type"
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
        />
        <span>Расход</span>
      </label>
    </p>

    <div class="input-field">
      <input
          id="amount"
          type="number"
          v-model.number="sum"
          :class="{invalid: ($v.sum.$dirty && !$v.sum.minValue || $v.sum.$dirty && !$v.sum.required)}"
      >
      <label for="amount">Сумма</label>
      <span v-if="$v.sum.$dirty && !$v.sum.required" class="helper-text invalid">Введите сумму</span>
      <span v-else-if="$v.sum.$dirty && !$v.sum.minValue" class="helper-text invalid">Минимальное значение {{$v.sum.$params.minValue.min}}</span>
    </div>

    <div class="input-field">
      <input
      v-model.trim="description"
          id="description"
          type="text"
          :class="{invalid: $v.description.$dirty && !$v.description.required}"
      >
      <label for="description">Описание</label>
      <span v-if="$v.description.$dirty && !$v.description.required" class="helper-text invalid">Введите описание</span>
    </div>

    <button class="btn waves-effect waves-light" type="submit">
      Создать
      <i class="material-icons right">send</i>
    </button>
  </form>
</div>

</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

import Loader from '../components/app/Loader.vue';
export default {
  components: { Loader },
  name: 'Record',
  validations: {
        description: { required },
        sum: { required, minValue: minValue(1) }
  },
  data: () => ({
    categories: [],
    loading: true,
    select: null,
    currenctCategory: null,
    type: 'outcome',
    sum: 1,
    description: ''
  }),
  computed: {
    ...mapGetters(['info']),  // here we call getter "info" u cdan fin it in store an then spread it here
    canCreateRecord() {
      if (this.type === 'income') {
        return true
      }

      return this.info.bill >= this.sum
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false

    if (this.categories.length) {
      this.currenctCategory = this.categories[0].id
    }

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields()
    }, 0)
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try{
        if (this.canCreateRecord) {
          await this.$store.dispatch('createRecord', {
            type: this.type,
            sum: this.sum,
            description: this.description,
            categoryId: this.currenctCategory,
            date: new Date().toJSON() // to allow the firebae correctly handle th date
          })

          const bill = this.type === 'income' ? this.sum + this.info.bill : this.info.bill - this.sum;
          await this.$store.dispatch('updateInfo', {bill})
          this.$message('Запись добавлена')
          this.$v.$reset()
          this.sum = 1
          this.description = ''
        } else {
          this.$message(`Недостаточно средств на счёте. Доступно: ${this.sum - this.info.bill}`)
        }
      } catch(e) {}
    }
  },
  metaInfo() {
    return {
      title: this.$title('pageTitle_Record')
    }
  }
}
</script>
