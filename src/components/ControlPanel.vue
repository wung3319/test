<!-- ControlPanel.vue-->
<template>
  <v-card class="control-panel">
    <v-card-title class="headline">Control Panel</v-card-title>
    <v-container>
      <v-row align="center">
        <v-col cols="12" sm="8" md="6">
          <v-text-field v-model="command.message" label="Enter command here" outlined></v-text-field>
        </v-col>
        <v-col cols="12" sm="4" md="3" class="send-buttons">
          <v-btn class="send-button" color="success" @click="sendCommand('diver1')">Diver 1</v-btn>
          <div class="spacer"></div>
          <v-btn class="send-button" color="success" @click="sendCommand('diver2')">Diver 2</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'ControlPanel',
  data() {
    return {
      command: { message: '', target: '' }
    };
  },
  methods: {
    sendCommand(target) {
      console.log('Command sent to', target, ':', this.command.message);
      this.$emit('command-submitted', { message: this.command.message, target: target });
      this.command.message = ''; // 입력 필드 초기화
    }
  }
};
</script>

<style scoped>
.headline {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
}

.control-panel {
  padding: 20px;
  background-color: #f3f3f3;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.send-buttons {
  display: flex;
  align-items: center;
}

.send-button {
  flex: 1;
  margin-right: 10px;
}

.spacer {
  flex: 0 0 10px; /* 간격 크기 조절 */
}
</style>
