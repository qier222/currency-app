import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import vuescroll from "vuescroll";
import "./registerServiceWorker";
import store from "@/store";
import i18n from "@/i18n";
import "@/assets/imgs/svg";

Vue.use(Vuex);
Vue.use(vuescroll);
Vue.config.productionTip = false;

new Vue({
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
