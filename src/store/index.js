import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import initState from "./initState";

if (localStorage.getItem("state") === null) {
  localStorage.setItem("state", JSON.stringify(initState));
  localStorage.setItem("isInitData", "yes");
}

Vue.use(Vuex);
const saveToLocalStorage = (store) => {
  if (localStorage.getItem("isInitData") === "yes") {
    axios
      .get("/api/currency/all")
      .then(function (response) {
        store.state.coins = response.data.data;
        localStorage.setItem("state", JSON.stringify(store.state));
        localStorage.setItem("isInitData", "no");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  store.state.fromNumber = null;
  store.state.searchKeyword = "";
  store.subscribe((mutation, state) => {
    if (mutation.type !== "changeState") {
      localStorage.setItem("state", JSON.stringify(state));
    }
  });
};

const store = new Vuex.Store({
  state: JSON.parse(localStorage.getItem("state")),
  getters,
  mutations,
  actions,
  plugins: [saveToLocalStorage],
});

export default store;
