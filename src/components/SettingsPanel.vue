<template>
  <div class="settings-panel" @click.stop="">
    <div class="item theme">
      <div class="name">{{ $t("theme") }}</div>
      <div class="switcher">
        <div
          class="option"
          :title="$t('light')"
          :class="{ active: appSettings.theme === 'light' }"
          @click="changeTheme('light')"
        >
          <svg-icon class="icon" icon-class="sun" />
        </div>
        <div
          class="option"
          :title="$t('dark')"
          :class="{ active: appSettings.theme === 'dark' }"
          @click="changeTheme('dark')"
        >
          <svg-icon class="icon" icon-class="moon" />
        </div>
        <div
          class="option"
          :title="$t('system')"
          :class="{ active: appSettings.theme === 'auto' }"
          @click="changeTheme('auto')"
        >
          <svg-icon class="icon" icon-class="desktop-computer" />
        </div>
      </div>
    </div>
    <div class="item languages">
      <div class="name">{{ $t("languages") }}</div>
      <div class="selector">
        <select v-model="lang">
          <option value="en">English</option>
          <option value="cn">中文</option>
        </select>
        <svg-icon class="icon" icon-class="drawdown-arrow" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "SettingsPanel",
  computed: {
    ...mapState(["appSettings"]),
    lang: {
      get() {
        return this.appSettings.lang;
      },
      set(lang) {
        if (this.appSettings.lang !== lang) {
          this.$parent.handleSettingsClose();
        }
        this.changeLang(lang);
      },
    },
  },
  methods: {
    ...mapMutations(["changeTheme", "changeLang"]),
  },
};
</script>

<style lang="scss" scoped>
.settings-panel {
  position: fixed;
  background: var(--menu-bg-color);
  top: 50px;
  right: 44px;
  user-select: none;
  border: 1px solid rgb(0, 0, 0, 0.05);
  box-sizing: border-box;
  box-shadow: 0 10px 16px -4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 6px;
  cursor: default;
}
.item {
  padding: 10px 14px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .name {
    color: var(--font-color);
    min-width: 32px;
  }
}

.theme {
  cursor: default;
  padding: 12px 12px 8px 14px;
}

.switcher {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  border-radius: 7px;
  color: var(--button-color);
  padding: {
    left: 24px;
  }
  .option {
    cursor: pointer;
    border-radius: 7px;
    padding: 4px;
    margin: 0 1px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon {
      height: 16px;
      width: 24px;
    }
    &:hover {
      background: var(--primary-bg-color);
      color: var(--primary-color);
    }
  }
  .option.active {
    background: var(--primary-bg-color);
    color: var(--primary-color);
  }
}

.selector {
  position: relative;
  margin-left: 24px;
  .icon {
    color: var(--primary-color);
    cursor: default;
    height: 16px;
    width: 16px;
    position: absolute;
    right: 4px;
    top: 8px;
  }
}
select {
  font-weight: 500;
  font-size: 14px;
  width: 100%;
  border: none;
  padding: 7px 24px 7px 8px;
  border-radius: 8px;
  color: var(--primary-color);
  appearance: none;
  background: var(--primary-bg-color);
  &:focus {
    outline: none;
    background: var(--primary-bg-color);
  }
}
</style>
