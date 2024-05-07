<!--DiverView1.vue-->
<template>
  <v-card class="diver-view">
    <v-card-title class="headline">다이버1 자세 View</v-card-title>
    <v-img class="camera-feed" src="../assets/diverview.jpg"></v-img>
    <v-card-text class="command-text">Command: {{ command }}</v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'DiverView1',
  props: {
    command: String
  }
}
</script>

<style scoped>

.diver-view {
  padding: 20px;
  background-color: #f3f3f3;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.camera-feed {
  margin: 0 auto;
  width: 400px;
}

.command-text {
  margin-top: 10px;
}
</style>
