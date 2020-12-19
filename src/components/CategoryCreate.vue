<template>
      <div class="col s12 m6">
        <div>
          <div class="page-subtitle">
            <h4>Создать</h4>
          </div>

          <form @submit.prevent="onSubmit" >
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
              Создать
              <i class="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'

export default {
    name: 'CreateCategory',
    methods: {
        async onSubmit() {
            if (this.$v.$invalid) {
                this.$v.$touch();
                return
            }

            try{
               var createdCategory = await this.$store.dispatch('createCategory', {
                title: this.name,
                limit: this.limit
                })

                this.name = ''
                this.limit = 100
                this.$v.$reset()
                this.$message('Категория была создана!')

                this.$emit('created', createdCategory)
            } catch(e) {}
        }
    },
    data: () => ({
        name: '',
        limit: 100
    }),
    validations: {
        name: { required },
        limit: { required, minValue: minValue(100) }
    },
    mounted() {
        M.updateTextFields()
    }
}
</script>
