import LanguageDetector from 'i18next-browser-languagedetector'
import i18next from 'i18next'
import EN from './en'
import RU from './ru'

i18next.use(LanguageDetector).init({
  // debug: true,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  react: {
    wait: false,
    nsMode: 'default',
    // bindI18n: 'languageChanged loaded',
    // bindStore: 'added removed',
  },
  resources: {
    en: { translation: EN },
    ru: { translation: RU },
  },
})

export default i18next
