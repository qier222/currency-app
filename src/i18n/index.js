import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const messages = {
  en: {
    search: "Search",
    theme: "Theme",
    languages: "Languages",
    light: "Light",
    dark: "Dark",
    system: "System",
    feedback: "Feedback",
    about: "About",
  },
  cn: {
    search: "搜索",
    theme: "主题",
    languages: "语言",
    light: "亮色模式",
    dark: "黑暗模式",
    system: "跟随系统",
    feedback: "反馈和建议",
    about: "关于本应用",
  },
};

const i18n = new VueI18n({
  locale: "en",
  messages,
});

export default i18n;
