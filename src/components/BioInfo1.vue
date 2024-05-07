<template>
  <v-card class="bio-info">
    <v-card-title class="headline">다이버1 안전 및<br> 임무 정보</v-card-title>
    <v-list>
      <!-- 안전정보 -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>안전정보</v-list-item-title>
          <v-list-item-subtitle>맥박: {{ diver1.heartRate }}</v-list-item-subtitle>
          <v-list-item-subtitle>호흡여부: {{ diver1.breathingStatus }}</v-list-item-subtitle>
          <v-list-item-subtitle>수심: {{ diver1.depth }}</v-list-item-subtitle>
          <v-list-item-subtitle>수온: {{ diver1.temperature }}</v-list-item-subtitle>
          <v-list-item-subtitle>공기압: {{ diver1.airPressure }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- 임무정보 -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>임무정보</v-list-item-title>
          <v-list-item-subtitle>속도: {{ diver1.speed }}</v-list-item-subtitle>
          <v-list-item-subtitle>자세: {{ diver1.posture }}</v-list-item-subtitle>
          <v-list-item-subtitle>방위: {{ diver1.direction }}</v-list-item-subtitle>
          <v-list-item-subtitle>위치: {{ diver1.latitude }}, {{ diver1.longitude }}</v-list-item-subtitle>
          <v-list-item-subtitle>잠수시간: {{ diver1.divingTime }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'BioInfo',
  data() {
    return {
      diver1: {
        heartRate: '72 bpm',
        breathingStatus: '정상',
        depth: '20m',
        temperature: '25°C',
        airPressure: '1 atm',
        speed: '2 m/s',
        posture: '수직',
        direction: '북쪽',
        latitude: '37.1234', // 다이버1의 더미 GPS 좌표
        longitude: '127.5678', // 다이버1의 더미 GPS 좌표
        divingTime: '1시간 30분'
      }
    };
  }
};
</script>

<style scoped>
.bio-info {
  margin-right: 10px;
  padding: 20px;
  background-color: #f3f3f3;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
}
</style>
