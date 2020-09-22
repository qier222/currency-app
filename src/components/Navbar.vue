<template>
  <div
    class="navbar"
    :style="{
      backdropFilter: isDarkMode
        ? 'blur(12px) brightness(112%)'
        : 'blur(12px) brightness(98%)',
    }"
  >
    <div class="logo">Currency<span>App</span></div>
    <div class="menu">
      <div
        class="menu-item"
        @click="showManageCoins = !showManageCoins"
        v-clickoutside="handleManageCoinsClose"
      >
        <svg-icon icon-class="add" style="transform: scale(0.9);" />
        <transition name="fade">
          <ManageCoins v-show="showManageCoins" />
        </transition>
      </div>
      <div
        class="menu-item"
        @click="showSettings = !showSettings"
        v-clickoutside="handleSettingsClose"
      >
        <svg-icon icon-class="settings" />
        <transition name="fade">
          <SettingsPanel v-show="showSettings" />
        </transition>
      </div>
      <div
        class="menu-item"
        @click="showMenu = !showMenu"
        v-clickoutside="handleMenuClose"
      >
        <svg-icon icon-class="menu" />
        <transition name="fade">
          <div class="menu-panel" v-show="showMenu">
            <div class="item">{{ $t("feedback") }}</div>
            <div class="item">{{ $t("about") }}</div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ManageCoins from "./ManageCoins";
import SettingsPanel from "./SettingsPanel";
export default {
  name: "Navbar",
  data() {
    return {
      showMenu: false,
      showSettings: false,
      showManageCoins: false,
    };
  },
  components: {
    ManageCoins,
    SettingsPanel,
  },
  computed: {
    ...mapGetters(["isDarkMode"]),
  },
  methods: {
    handleMenuClose() {
      this.showMenu = false;
    },
    handleSettingsClose() {
      this.showSettings = false;
    },
    handleManageCoinsClose() {
      this.showManageCoins = false;
    },
  },
  directives: {
    clickoutside: {
      bind: function(el, binding) {
        function documentHandler(e) {
          if (el.contains(e.target)) {
            return false;
          }
          if (binding.expression) {
            binding.value(e);
          }
        }
        el._vueClickOutside_ = documentHandler;
        document.addEventListener("click", documentHandler);
      },
      unbind: function(el) {
        document.removeEventListener("click", el._vueClickOutside_);
        delete el._vueClickOutside_;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  backdrop-filter: blur(12px) brightness(98%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  color: var(--font-color);
  position: fixed;
  top: 8px;
  right: 6px;
  left: 6px;
  border-radius: 12px;
}

.logo {
  margin-left: 12px;
  font-size: 24px;
  color: var(--font-color);
  span {
    font-weight: 600;
  }
}

.menu {
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 50%;
  list-style: none;
  padding: 0;

  .menu-item {
    cursor: pointer;
    height: 36px;
    width: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    color: var(--button-color);

    i {
      user-select: none;
    }

    .svg-icon {
      height: 24px;
    }

    &:hover {
      background: var(--primary-bg-color);
      transition: 0.6s;
      .svg-icon {
        color: var(--primary-color);
        transition: 0.6s;
      }
    }
  }
}

.menu-panel {
  position: fixed;
  background: var(--menu-bg-color);
  top: 50px;
  right: 7px;
  user-select: none;
  color: var(--font-color);
  border: 1px solid rgb(0, 0, 0, 0.05);
  box-sizing: border-box;
  box-shadow: 0 10px 16px -4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 6px;
  cursor: default;
}
.item {
  cursor: pointer;
  padding: 10px 14px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  &:hover {
    border-radius: 6px;
    background: var(--primary-bg-color);
    color: var(--primary-color);
    transition: all 0.2s;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity ease-in-out 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
