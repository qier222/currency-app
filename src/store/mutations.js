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
    this.commit("updateTitleBarColor");
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
  updateTitleBarColor(state) {
    let appearance = state.appSettings.theme;
    if (appearance === "auto" || appearance === undefined) {
      appearance = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    document.body.setAttribute("data-theme", appearance);
    document
      .querySelector('meta[name="theme-color"]')
      .setAttribute("content", appearance === "dark" ? "#202124" : "#fff");
  },
};

export default mutatsions;
