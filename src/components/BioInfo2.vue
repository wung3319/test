<template>
  <v-card class="bio-info">
    <v-card-title class="headline">다이버2 안전 및<br> 임무 정보</v-card-title>
    <v-list>
      <!-- 안전정보 -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>안전정보</v-list-item-title>
          <v-list-item-subtitle>맥박: {{ diver2.heartRate }}</v-list-item-subtitle>
          <v-list-item-subtitle>호흡여부: {{ diver2.breathingStatus }}</v-list-item-subtitle>
          <v-list-item-subtitle>수심: {{ diver2.depth }}</v-list-item-subtitle>
          <v-list-item-subtitle>수온: {{ diver2.temperature }}</v-list-item-subtitle>
          <v-list-item-subtitle>공기압: {{ diver2.airPressure }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- 임무정보 -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>임무정보</v-list-item-title>
          <v-list-item-subtitle>속도: {{ diver2.speed }}</v-list-item-subtitle>
          <v-list-item-subtitle>자세: {{ diver2.posture }}</v-list-item-subtitle>
          <v-list-item-subtitle>방위: {{ diver2.direction }}</v-list-item-subtitle>
          <v-list-item-subtitle>위치: {{ diver2.latitude }}, {{ diver2.longitude }}</v-list-item-subtitle>
          <v-list-item-subtitle>잠수시간: {{ diver2.divingTime }}</v-list-item-subtitle>
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
      diver2: {
        heartRate: '68 bpm',
        breathingStatus: '정상',
        depth: '18m',
        temperature: '23°C',
        airPressure: '1 atm',
        speed: '2 m/s',
        posture: '수직',
        direction: '북쪽',
        latitude: '36.9876', // 다이버2의 더미 GPS 좌표
        longitude: '128.3456', // 다이버2의 더미 GPS 좌표
        divingTime: '1시간 30분'
      }
    };
  }
};
</script>

<style scoped>
.bio-info {
  margin-left: 10px;
  padding: 20px;
  background-color: #f3f3f3;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
}
</style>
