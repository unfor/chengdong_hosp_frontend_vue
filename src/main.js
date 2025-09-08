import { createApp } from "vue";
import './index.css';
import './App.css'
import App from "./App.vue";
import "element-plus/dist/index.css";
import ElementPlus from "element-plus";
import { Clock } from "@element-plus/icons-vue";

const app = createApp(App);

app.use(ElementPlus);
app.component("Clock", Clock);
app.mount("#app");
