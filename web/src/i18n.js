import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: 'zh',
    backend: {
      /* translation file path */
      loadPath: `${process.env.PUBLIC_URL}/assets/i18n/{{ns}}/{{lng}}.json`,
    },
    fallbackLng: 'zh-TW',
    debug: process.env.NODE_ENV === 'development',
    /* can have multiple namespace, in case you want to divide a huge translation into smaller pieces and load them on demand */
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },
    react: {
      wait: true,
    },
  });

export default i18n;
