<template>
  <div class="manage-coins" @click.stop="">
    <div class="search-box" :class="{ active: searchBoxFocus }">
      <svg-icon class="icon" icon-class="search" />
      <input
        type="text"
        :placeholder="$t('search')"
        @focus="searchBoxFocus = true"
        @blur="searchBoxFocus = false"
        v-model="searchKeyword"
      />
    </div>
    <div class="coins-list">
      <vue-scroll :ops="vueScrollOptions">
        <div
          class="coin"
          v-for="coin in getAllCoinsData"
          :key="coin.symbol"
          @click="
            updateEnabledCoins(coin.symbol, enabledCoins.includes(coin.symbol))
          "
        >
          <div class="coin-info">
            <svg-icon
              class="flag"
              :style="{ height: coin.type === 'crypto' ? '32px' : '' }"
              :iconClass="
                coin.type === 'crypto'
                  ? coin.symbol.toLowerCase()
                  : coin.countryCode.toLowerCase()
              "
            ></svg-icon>
            <div>
              <span
                class="name"
                :style="{ fontWeight: appSettings.lang === 'cn' ? 500 : 600 }"
                >{{
                  appSettings.lang === "cn" && coin.nameCN !== ""
                    ? coin.nameCN
                    : coin.name
                }}</span
              >
              <span class="sign">{{ coin.symbol }}</span>
            </div>
          </div>
          <svg-icon
            class="check-icon"
            icon-class="check"
            v-if="enabledCoins.includes(coin.symbol)"
          />
        </div>
      </vue-scroll>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "ManageCoins",
  data() {
    return {
      searchBoxFocus: false,
      vueScrollOptions: {
        bar: {
          background: "#f3f3f3",
          detectResize: false,
          scrollingX: false,
        },
      },
    };
  },
  computed: {
    ...mapState(["enabledCoins", "appSettings"]),
    ...mapGetters(["getAllCoinsData"]),
    searchKeyword: {
      get() {
        return this.$store.state.searchKeyword;
      },
      set(value) {
        this.$store.commit("changeState", {
          key: "searchKeyword",
          value,
        });
      },
    },
  },
  methods: {
    updateEnabledCoins(symbol, enabled) {
      this.$store.commit("updateEnabledCoins", {
        symbol,
        action: enabled ? "remove" : "add",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.manage-coins {
  position: fixed;
  background: var(--menu-bg-color);
  top: 50px;
  right: 80px;
  user-select: none;
  color: black;
  border: 1px solid rgb(0, 0, 0, 0.05);
  box-sizing: border-box;
  box-shadow: 0 10px 16px -4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  cursor: default;
}

.search-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--primary-bg-color);
  border-radius: 6px;
  margin: 16px;

  .icon {
    color: var(--font-color);
    margin-left: 6px;
    height: 18px;
    width: 18px;
    cursor: default;
  }

  input {
    color: var(--font-color);
    flex: 2;
    padding: {
      top: 5px;
      bottom: 6px;
      right: 6px;
      left: 6px;
    }
    background: transparent;
    font-size: 16px;
    border: none;
    font-weight: 600;

    &:focus {
      outline: none;
    }
    &::placeholder {
      color: var(--placeholder-color);
    }
  }
}

.search-box.active {
  background: var(--primary-bg-color);
  transition: 0.2s;
  svg,
  input {
    transition: 0.2s;
    color: var(--font-color);
  }
}

.coins-list {
  min-width: 240px;
  margin: 8px;
  height: 340px;

  img {
    height: 28px;
    border-radius: 4px;
  }
  .check-icon {
    color: var(--primary-color);
    height: 26px;
    width: 26px;
  }
  .coin {
    padding: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    height: 36px;
    color: var(--font-color);
    .coin-info {
      flex: 2;
      display: flex;
      align-items: center;
      div {
        display: flex;
        flex-direction: column;
        margin-left: 6px;
      }
      .name {
        font-size: 14px;
        margin-top: -2px;
        font-weight: 600;
      }
      .sign {
        font-weight: 500;
        font-size: 12px;
        color: var(--placeholder-color);
      }
      .flag {
        height: 28px;
        width: 38px;
        border-radius: 4px;
      }
    }
    &:hover {
      background: var(--primary-bg-color);
    }
  }
}

.scroller {
  height: 100px;
}
</style>
