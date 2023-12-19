import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locale/en.json";
import ar from "./locale/ar.json";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
