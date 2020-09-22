import axios from "axios";

const actions = {
  initApp(context) {
    axios
      .get("/api/currency/all")
      .then(function (response) {
        context.commit("changeState", {
          key: "coins",
          value: response.data.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  fetchRates(context) {
    axios
      .get("/api/currency/rate/latest", {
        params: {
          symbols: context.state.enabledCoins.join(","),
        },
      })
      .then(function (response) {
        context.commit("changeState", {
          key: "lastUpdateTime",
          value: new Date().getTime(),
        });
        context.commit("updateRates", response.data.rates);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};

export default actions;
