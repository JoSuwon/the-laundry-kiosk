<template>
  <v-app>
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
};
</script>
