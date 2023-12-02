<template>
  <contacts-component />
</template>

<script>
import ContactsComponent from '@/components/index.vue'
export default {
  name: 'App',
  components: {
    ContactsComponent,
  },
}
</script>

<style lang="scss">
@import './assets/styles/index';

#app {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
