import i18n from "@/i18n";

const mutatsions = {
  changeState(state, { key, value }) {
    state[key] = value;
  },
  changeActiveCoin(state, symbol) {
    state.activeCoin = symbol;
  },
  changeFromNumber(state, number) {
    state.fromNumber = number;
  },
  updateEnabledCoins(state, { action, symbol }) {
    if (action === "add") {
      state.enabledCoins.push(symbol);
    } else if (action === "remove") {
      state.enabledCoins = state.enabledCoins.filter((coin) => coin !== symbol);
    }
  },
  changeTheme(state, theme) {
    state.appSettings.theme = theme;
  },
  changeLang(state, lang) {
    state.appSettings.lang = lang;
    i18n.locale = lang;
  },
  updateRates(state, data) {
    state.coins = state.coins.map((coin) => {
      if (state.enabledCoins.includes(coin.symbol)) {
        coin.rate = data[coin.symbol];
      }
      return coin;
    });
  },
};

export default mutatsions;
