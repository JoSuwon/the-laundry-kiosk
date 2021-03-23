<template>
  <v-app style="overflow:hidden">
    <div class="wrap">
      <StateBar />
      <div class="contents">
        <router-view />
      </div>
    </div>
  </v-app>
</template>

<script>
import StateBar from '@/components/StateBar.vue';
export default {
  name: 'App',
  components: {
    StateBar,
  },
  data() {
    return {
      ignoreIdlePageName: [
        'AdminLogin',
        'Home',
        'Detail',
        'Error',
      ],
    };
  },
  onIdle() {
    const { name } = this.$route;
    if(this.ignoreIdlePageName.includes(name)) return;
    this.$router.replace({ name: 'Home' });
  },
};
</script>

<style lang="scss" scoped>

</style>
