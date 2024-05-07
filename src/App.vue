<!-- App.vue-->
<template>
  <v-app>
    <div class="grid-container">
      <div class="grid-item">
        <DiverView1 :command="diver1Command" />
      </div>
      <div class="grid-item grid-item-split">
        <BioInfo1 />
        <BioInfo2 />
      </div>
      <div class="grid-item">
        <DiverView2 :command="diver2Command" />
      </div>
      <div class="grid-item">
        <Navigation1 />
      </div>
      <div class="grid-item">
        <ControlPanel @command-submitted="handleCommandSubmitted" />
      </div>
      <div class="grid-item">
        <Navigation2 />
      </div>
      <div class="grid-item">
        <WebRTCComponent />
      </div>
    </div>
  </v-app>
</template>

<script>
import DiverView1 from './components/DiverView1.vue';
import DiverView2 from './components/DiverView2.vue';
import BioInfo1 from './components/BioInfo1.vue';
import BioInfo2 from './components/BioInfo2.vue';
import Navigation1 from './components/DiverNavigation1.vue';
import Navigation2 from './components/DiverNavigation2.vue';
import ControlPanel from './components/ControlPanel.vue';
import WebRTCComponent from './components/WebRTCComponent.vue';

export default {
  name: 'App',
  components: {
    DiverView1,
    DiverView2,
    BioInfo1,
    BioInfo2,
    Navigation1,
    Navigation2,
    ControlPanel,
    WebRTCComponent
  },
  data() {
    return {
      diver1Command: '',
      diver2Command: ''
    };
  },
  methods: {
    handleCommandSubmitted(command) {
      // 각 다이버에게 전송
      if (command.target === 'diver1') {
        this.diver1Command = command.message;
      } else if (command.target === 'diver2') {
        this.diver2Command = command.message;
      }
    }
  }
};
</script>

<style>
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  /* 높이를 1fr로 설정하여 그리드 단일로 크기를 조정 */
  gap: 10px;
  height: 100vh;
  padding: 10px;
  background-color: #f0f0f0;
}

.grid-item {
  background: #FFF;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow: hidden;
}

.grid-item-split {
  display: flex;
  flex-direction: row;
  /* 수직 분할을 위한 설정 */
}

.headline {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
</style>
