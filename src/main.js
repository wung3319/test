// main.js
import { createApp } from 'vue/dist/vue.esm-bundler.js'; // Vue를 import합니다.
import App from './App.vue';
import { loadFonts } from './plugins/webfontloader.js';
import vuetify from './plugins/vuetify'; // Vuetify 플러그인 임포트
import WebRTCComponent from './components/WebRTCComponent.vue';

// Vue 애플리케이션 생성 및 설정
const app = createApp(App);
app.component('WebRTCComponent', WebRTCComponent); // WebRTCComponent를 전역으로 등록합니다.
app.use(vuetify); // Vuetify 사용
app.mount('#app'); // 애플리케이션을 마운트합니다. 서버에서 정적 파일로 제공될 것입니다.

loadFonts(); // 폰트를 로드합니다.
