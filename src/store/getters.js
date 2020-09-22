const getters = {
  getCoinBySymbol: (state) => (symbol) => {
    return state.coins.find((coin) => coin.symbol === symbol);
  },
  getEnableCoinsData: ({ coins, enabledCoins }) => {
    return coins.filter((coin) => enabledCoins.includes(coin.symbol));
  },
  getAllCoinsData: ({ searchKeyword, coins, enabledCoins }) => {
    searchKeyword = searchKeyword.toLowerCase();
    function compare(a, b) {
      if (enabledCoins.includes(a.symbol) && enabledCoins.includes(b.symbol)) {
        return 0;
      }
      if (enabledCoins.includes(a.symbol) && !enabledCoins.includes(b.symbol)) {
        return -1;
      } else {
        return 1;
      }
    }
    function toLowerCase(string) {
      if (string === null) {
        return "";
      } else {
        return string.toLowerCase();
      }
    }
    let data =
      searchKeyword !== ""
        ? coins.filter((coin) => {
            if (
              toLowerCase(coin.symbol).includes(searchKeyword) ||
              toLowerCase(coin.name).includes(searchKeyword) ||
              toLowerCase(coin.nameCN).includes(searchKeyword) ||
              toLowerCase(coin.countryCode).includes(searchKeyword) ||
              toLowerCase(coin.sign).includes(searchKeyword)
            ) {
              return coin;
            }
          })
        : coins;
    return data.sort(compare);
  },
  isDarkMode: ({ appSettings }) => {
    if (appSettings.theme === "auto") {
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    } else if (appSettings.theme === "dark") {
      return true;
    } else {
      return false;
    }
  },
};

export default getters;
