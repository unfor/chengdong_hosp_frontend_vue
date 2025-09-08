import { createApp } from "vue";
import "./index.css";
import "./App.css";
import App from "./App.vue";
import "element-plus/dist/index.css";
import ElementPlus from "element-plus";
import { Clock } from "@element-plus/icons-vue";
import { Calendar } from "@element-plus/icons-vue";
import { House } from "@element-plus/icons-vue";
import { Avatar } from "@element-plus/icons-vue";
import { Tools } from "@element-plus/icons-vue";
import { HomeFilled } from "@element-plus/icons-vue";
import { Key } from "@element-plus/icons-vue";

const app = createApp(App);

app.use(ElementPlus);
app.component("Clock", Clock);
app.component("Calendar", Calendar);
app.component("House", House);
app.component("Avatar", Avatar);
app.component("Tools", Tools);
app.component("HomeFilled", HomeFilled);
app.component("Key", Key);
app.mount("#app");
