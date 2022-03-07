import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import store from "./store";
// import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-vue/dist/bootstrap-vue.css";

// Make BootstrapVue available throughout your project
// Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
// Vue.use(IconsPlugin);

// createApp(App).use(store, router).mount("#app");
const app = createApp(App);
app.use(router);
app.mount("#app");
