import i18n from 'i18next';
import EnglishTranslation from "./locales/en/englishTranslation.json"
import KoreanTranslation from "./locales/ko/koreanTranslation.json"
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import AuthStorage from '../AuthStorage';

const resources = {
  en: {
    translation: EnglishTranslation
  },
  ko: {
    translation: KoreanTranslation
  }
};

i18n.use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector).init({
    // resources: resources,
    // debug: true,
    // interpolation: {
    //   escapeValue: false, // not needed for react as it escapes by default
    // },

    resources,
    detection: {
      order: ['cookie', 'localStorage', 'htmlTag'],
      caches: ['cookie', 'localStorage']
    },


    // lng: 'ko',
    // lng: AuthStorage.getLang(),
  }, function (err, t) {
    // initialized and ready to go!
    // console.log("Ready to go!");
  });

export default i18n;