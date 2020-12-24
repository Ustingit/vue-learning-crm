<template>
    
<div>
  <div class="page-title">
    <h3>{{ 'ProfileTitle' | localizeFilter }}</h3>
  </div>

  <form class="form" @submit.prevent="onSubmit" >
    <div class="input-field">
      <input
          id="description"
          type="text"
          v-model="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
      >
      <label for="description">{{ 'Name' | localizeFilter }}</label>
      <small
        v-if="$v.name.$dirty && !$v.name.required"
       class="helper-text invalid">
       {{ 'Message_EnterName' | localizeFilter }}
       </small>
    </div>

    <div class="switch">
    <label>
      English
      <input type="checkbox" v-model="isRuLocale" >
      <span class="lever"></span>
      Русский
    </label>
  </div>

    <button class="btn waves-effect waves-light" type="submit">
      {{ 'Refresh' | localizeFilter }}
      <i class="material-icons right">send</i>
    </button>
  </form>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'Profile',
  data: () => ({
    name: '',
    isRuLocale: true
  }),
  computed: {
    ...mapGetters(['info'])
  },
  mounted() {
    this.name = this.info.name
    setTimeout(() => {
      M.updateTextFields()
    }, 0)
  },
  validations: {
    name: { required }
  },
  methods: {
    ...mapActions(['updateInfo']), //
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

       try {
         await this.updateInfo({
           name: this.name,
           locale: this.isRuLocale === true ? 'ru-RU' : 'en-US'
         });
      } catch {}
    }
  },
  metaInfo() {
    return {
      title: this.$title('pageTitle_Profile')
    }
  }
}
</script>

<style scoped>
  .switch {
    margin-bottom: 2rem;
  }
</style>
