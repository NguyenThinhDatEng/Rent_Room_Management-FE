import { createApp } from "vue";
import App from "./App.vue";
// global style
import "./assets/styles/global.css";
import "@/assets/styles/icon.css";
// resources
import router from "@/routers/router";
// vuex
import store from "./stores";
/**
 * @description Format input
 * @link {git} https://github.com/devindex/vue-mask
 */
import VueMask from "@devindex/vue-mask";

const app = createApp(App);

import { register } from "@/commons/globalPopup";
register(app);

import { createVfm } from "vue-final-modal";
const vfm = createVfm();
app.use(vfm);

app.use(router);
app.use(store);
app.use(VueMask);

app.mount("#app");
