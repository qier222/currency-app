<template>
  <div id="app" :data-theme="appSettings.theme">
    <Navbar />
    <main>
      <CoinBox
        v-for="coin in getEnableCoinsData"
        :key="coin.symbol"
        :coin="coin"
      />
    </main>
    <footer>
      <div>
        Last update at
        <span>{{
          new Date(this.$store.state.lastUpdateTime).toLocaleString()
        }}</span>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import CoinBox from "./components/CoinBox";
import Navbar from "./components/Navbar";

export default {
  name: "App",
  data() {
    return {
      fetchRatesTimer: null,
    };
  },
  components: {
    CoinBox,
    Navbar,
  },
  computed: {
    ...mapState(["appSettings"]),
    ...mapGetters(["getEnableCoinsData"]),
  },
  beforeMount() {
    this.$i18n.locale = this.appSettings.lang;
  },
  mounted() {
    this.$store.dispatch("fetchRates");
    if (this.fetchRatesTimer) {
      clearInterval(this.fetchRatesTimer);
    } else {
      this.fetchRatesTimer = setInterval(() => {
        this.$store.dispatch("fetchRates");
      }, 60000);
    }
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

:root {
  --primary-color: #1b4dfe;
  --primary-bg-color: #edf5fd;
  --font-color: #000;
  --placeholder-color: rgba(0, 0, 0, 0.6);
  --button-color: #7d7d7d;
  --bg-color: #fff;
  --menu-bg-color: #fff;
}

[data-theme="dark"] {
  --primary-color: #3f8cff;
  --primary-bg-color: #35383c;
  --font-color: #fff;
  --placeholder-color: rgba(255, 255, 255, 0.6);
  --button-color: #666;
  --bg-color: #202124;
  --menu-bg-color: #28292c;
}

[data-theme="auto"] {
  @media (prefers-color-scheme: dark) {
    --primary-color: #3f8cff;
    --primary-bg-color: #35383c;
    --font-color: #fff;
    --placeholder-color: rgba(255, 255, 255, 0.6);
    --button-color: #666;
    --bg-color: #202124;
    --menu-bg-color: #28292c;
  }
}

body {
  margin: 0;
}
body::-webkit-scrollbar {
  display: none;
}
#app,
input,
select {
  font-family: "Barlow", sans-serif;
}
#app {
  background: var(--bg-color);
  transition: all 0.4s;
  min-height: 100vh;
}
main {
  padding-top: 68px;
}
footer {
  margin: {
    top: 36px;
  }
  padding: {
    bottom: 16px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--font-color);
  font-size: 12px;
  span {
    font-weight: 500;
  }
}
</style>
