import i18next from 'i18next'

import EN from './en'
import RU from './ru'

i18next.init({
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  react: {
    wait: false,
    nsMode: 'default',
  },
  resources: {
    en: { translation: EN },
    ru: { translation: RU },
  },
})

export default i18next
