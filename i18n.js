import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "profile": "Profile",
          "preferences": "Preferences",
          "darkMode": "Dark Mode",
          "emailNotifications": "Email Notifications",
          "pushNotifications": "Push Notifications",
          "language": "Language",
        },
      },
      id: {
        translation: {
          "profile": "Profil",
          "preferences": "Preferensi",
          "darkMode": "Mode Gelap",
          "emailNotifications": "Notifikasi Email",
          "pushNotifications": "Notifikasi Push",
          "language": "Bahasa",
        },
      },
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
