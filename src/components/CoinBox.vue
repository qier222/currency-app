<template>
  <div
    class="currency-box"
    :class="{ active: active }"
    @click="changeActiveCoin"
  >
    <div class="container">
      <div class="flag-block">
        <svg-icon
          class="flag"
          :style="{ height: coin.type === 'crypto' ? '32px' : '' }"
          :iconClass="
            coin.type === 'crypto'
              ? coin.symbol.toLowerCase()
              : coin.countryCode.toLowerCase()
          "
        ></svg-icon>
        <span class="symbol">{{ coin.symbol }}</span>
      </div>
      <div class="input-block">
        <input
          ref="numberInput"
          :placeholder="placeholderNumber"
          :value="active ? fromString : number"
          @input="updateFromString"
        />
        <div class="coin-name" ref="coinName">
          <span class="expression-result">{{ expressionResult }}</span>
          <span class="name">{{ coinName }}</span>
          <span class="sign">{{ coin.sign }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { Parser } from "expr-eval";

export default {
  name: "CoinBox",
  props: {
    coin: Object,
  },
  data() {
    return {
      fromString: "", // 输入的需要转换到其他货币的字符串
      prevFromString: "", // 上面的字符串的历史记录
      expressionResult: null,
    };
  },
  computed: {
    ...mapState(["activeCoin", "fromNumber", "appSettings"]),
    ...mapGetters(["getCoinBySymbol"]),
    active() {
      return this.activeCoin === this.coin.symbol;
    },
    number() {
      if (this.fromNumber === null) {
        return null;
      } else {
        let num = this.fromNumber * this.coin.rate;
        return this.active
          ? this.formatNumber(num)
          : this.formatNumber(num).toLocaleString();
      }
    },
    placeholderNumber() {
      if (this.active) {
        return 100;
      }
      let num =
        (100 / this.getCoinBySymbol(this.activeCoin).rate) * this.coin.rate;
      return this.coin.type === "crypto"
        ? this.formatNumber(num)
        : this.formatNumber(num.toFixed(2));
    },
    coinName() {
      return this.appSettings.lang === "cn" && this.coin.nameCN !== ""
        ? this.coin.nameCN
        : this.coin.name;
    },
  },
  methods: {
    formatNumber(num) {
      if (Number.isInteger(num)) {
        return num;
      }
      if (String(num).length - (String(num).indexOf(".") + 1) > 8) {
        return num.toFixed(8);
      }
      return num;
    },
    updateFromString(e) {
      let digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
      let operators = ["+", "-", "*", "/"];
      let eValue = e.target.value;

      // console.log(`---------------${eValue}`);
      // console.log(e);

      let updateNumber = (string) => {
        if (operators.includes(string.charAt(string.length - 1))) {
          string = string.substr(0, string.length - 1);
        }
        let fromNumber = Parser.evaluate(string) / this.coin.rate;
        this.$store.commit("changeFromNumber", fromNumber);
      };

      let updateString = (string) => {
        this.fromString = string;
        this.prevFromString = this.fromString;
      };

      let updateExpressionResult = (string) => {
        if (!string.match(/[\\-\\+\\*\\/]/)) {
          this.expressionResult = null;
          return;
        }
        if (operators.includes(string.charAt(string.length - 1))) {
          string = string.substr(0, string.length - 1);
        }
        let number = Parser.evaluate(string);
        this.expressionResult = Number.isInteger(number)
          ? number
          : number.toFixed(2);
      };

      if (digits.includes(e.data)) {
        // console.log(`输入了数字 ${e.data}`);
        if (this.fromString.includes(".") && e.data === ".") {
          // console.log("重复输入了小数点，回滚");
          this.fromString = this.prevFromString;
          this.$forceUpdate();
          return;
        }
      } else if (operators.includes(e.data)) {
        // console.log("输入了运算符");
        if (
          operators.includes(
            this.prevFromString.charAt(this.prevFromString.length - 1)
          )
        ) {
          // console.log("重复输入了运算符，回滚");
          this.fromString = this.prevFromString;
          this.$forceUpdate();
          return;
        }
      } else if (e.inputType === "deleteContentBackward") {
        // console.log("按下了删除按钮");
        if (eValue === "") {
          // console.log("删除了最后的字符，恢复number为初始状态");
          this.prevFromString = "";
          this.fromString = "";
          this.$store.commit("changeFromNumber", null);
          return;
        }
      } else {
        // console.log("未命中任何规则，回滚");
        this.fromString = this.prevFromString;
        this.$forceUpdate();
        return;
      }

      // console.log("更新数据");
      updateNumber(eValue);
      updateString(eValue);
      updateExpressionResult(eValue);
    },
    changeActiveCoin() {
      if (!this.active) {
        if (this.number !== null) {
          // console.log(typeof this.number);
          this.fromString = this.number;
        }
        this.$store.commit("changeActiveCoin", this.coin.symbol);

        this.$refs.coinName.focus();
        setTimeout(() => {
          this.$refs.numberInput.focus();
        }, 500);
      } else {
        this.$refs.numberInput.focus();
      }
    },
  },
  created() {
    if (this.coin.type === "crypto") {
      this.iconUrl = `/assets/images/cryptos/${this.coin.symbol.toLowerCase()}.svg`;
    } else {
      this.iconUrl = `/assets/images/flags/4x3/${this.coin.countryCode.toLowerCase()}.svg`;
    }
  },
  updated() {
    if (!this.active) {
      this.expressionResult = null;
      this.prevFromString = "";
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 54px;
  display: flex;
  justify-content: space-between;
  padding: 12px 12px;
  color: var(--font-color);
}

.flag-block {
  display: flex;
  align-items: center;
  user-select: none;

  .flag {
    height: 28px;
    width: 38px;
    border-radius: 4px;
  }
  .symbol {
    font-weight: 600;
    font-size: 18px;
    margin: {
      left: 12px;
    }
  }
}
.input-block {
  display: flex;
  flex-direction: column;
  flex: 2;
  justify-content: center;

  input {
    font-family: "Barlow", sans-serif;
    color: var(--font-color);
    text-align: right;
    font-weight: 500;
    font-size: 22px;
    border: none;
    caret-color: var(--primary-color);
    background: transparent;
    cursor: default;
    padding: {
      left: 12px;
      right: 0;
    }
    &:focus {
      outline: none;
    }
    &::selection {
      background: var(--primary-color);
      color: #edf5fd;
    }
    &::placeholder {
      color: var(--placeholder-color);
    }
  }
  .coin-name {
    text-align: right;
    font-size: 12px;
    color: #808b96;
    user-select: none;
    .expression-result {
      font-weight: 500;
    }
    .name {
      margin-left: 2px;
    }
    .sign {
      margin-left: 2px;
    }
  }
}

.active {
  background: var(--primary-bg-color);
  border-radius: 12px;
  margin: 0px 6px;
  transition: margin 0.4s;
  input {
    color: var(--primary-color);
  }
}
</style>
