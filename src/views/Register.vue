<template>
    <form class="card auth-card" @submit.prevent="onSubmit" >
  <div class="card-content">
    <span class="card-title">Домашняя бухгалтерия</span>
    <div class="input-field">
      <input
          v-model.trim="email"
          id="email"
          type="text"
          :class="{ invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email) }"
      >
      <label for="email">Email</label>
      <small 
        class="helper-text invalid"
        v-if="$v.email.$dirty && !$v.email.required"
        >
        Поле Email не должно быть пустым
        </small>
        <small 
        class="helper-text invalid"
        v-else-if="$v.email.$dirty && !$v.email.email"
        >
        Введите корректный Email
        </small>
    </div>
    <div class="input-field">
      <input
          v-model.trim="password"
          id="password"
          type="password"
          :class="{ invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength) }"
      >
      <label for="password">Пароль</label>
      <small
        v-if="$v.password.$dirty && !$v.password.required"
       class="helper-text invalid">
       Поле Password не должно бть пустым
       </small>
       <small
        v-else-if="$v.password.$dirty && !$v.password.minLength"
       class="helper-text invalid">
       Поле Password должно содержать не менее {{ $v.password.$params.minLength.min }} символов. Текущая длина {{ password.length }}
       </small>
    </div>
    <div class="input-field">
      <input
        v-model.trim="name"
          id="name"
          type="text"
          class="validate"
          :class="{ invalid: $v.name.$dirty && !$v.name.required }"
      >
      <label for="name">Имя</label>
      <small
        v-if="$v.name.$dirty && !$v.name.required"
       class="helper-text invalid">
       Поле Name не должно быть пустым
       </small>
    </div>
    <p>
      <label>
        <input type="checkbox" v-model="agreed" />
        <span>С правилами согласен</span>
      </label>
    </p>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
      >
        Зарегистрироваться
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      Уже есть аккаунт?
      <router-link to="/login" >Войти!</router-link>
    </p>
  </div>
</form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'register',
  data: () => ({
    email: '',
    password: '',
    name: '',
    agreed: false
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required },
    agreed: { checked: v => v },
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
          this.$v.$touch()
          return
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }

      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch {}
    }
  },
  metaInfo() {
    return {
      title: this.$title('pageTitle_Register')
    }
  }
}
</script>
