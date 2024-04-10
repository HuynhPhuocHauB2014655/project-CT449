<script>
import AppHeader from "@/components/AppHeader.vue";
export default {
  components: {
    AppHeader,
  },
};
</script>

<template>
  <div id="container">
    <AppHeader />
    <div class="container" id="body">
      <router-view />
    </div>
  </div>
</template>
<style scoped>
#container {
  background-image: url("assets/background.png");
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
#body{
  min-height: 80vh;
  display: flex;
  flex-direction: column;
}
.content{
  background: rgba(0, 0, 0, 0.5);
}
</style>