<!-- DiverNavigation1.vue-->
<template>
  <v-card class="diver-navigation">
    <v-card-title class="headline">다이버#1 네비게이션 VIEW(해저 맵 중첩 뷰)
</v-card-title>
    <v-img class="map" src="../assets/seafloor_map.png"></v-img>
  </v-card>
</template>
  
  <script>
  export default {
    name: 'DiverNavigation1'
  }
  </script>

  
  
  <style scoped>

.diver-navigation {
  padding: 20px;
  background-color: #f3f3f3;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

  .map {
  margin: 0 auto;
  width: 600px;
}
  </style>