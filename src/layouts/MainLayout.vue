<template>
  <loader v-if="loading" />
    <div v-else class="app-main-layout">
    
  <Navbar @toggle-navbar="isOpen = !isOpen" />
  <Sidebar v-model="isOpen" :key="locale" />

    <main class="app-content" :class="{full: !isOpen}" >
        <div class="app-page">
            <router-view/>
        </div>
    </main>
  
<div class="fixed-action-btn">
  <router-link class="btn-floating btn-large blue" to="/record" v-tooltip="'Создать новую запись'" >
    <i class="large material-icons">add</i>
  </router-link>
</div>
</div>
</template>

<script>
import messages from '@/common/messages'
import Navbar from '@/components/app/Navbar'
import Sidebar from '@/components/app/Sidebar'
import Loader from '../components/app/Loader.vue'

export default {
  name: 'main-layout',
  components: {
    Navbar, Sidebar
  },
  data: () => ({
    isOpen: true,
    loading: true,
  }),
  async mounted() {
    // if info not exists we need to fetch aditional info about user
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }

    this.loading = false
  },
  computed: {
    error() {
      return this.$store.getters.error
    },
    locale() { //to change the translations after updating language
      return this.$store.getters.info.locale 
    }
  }, 
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Что-то пошло не так')
    }
  }
}
</script>
