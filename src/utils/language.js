// src/utils/language.js
import { languages, defaultLanguage } from '../i18n/config';

// Check if the language is valid
export function isValidLanguage(lang) {
  return Object.keys(languages).includes(lang);
}

// Get language from URL
export function getLanguageFromURL(url) {
  const [, lang] = url.pathname.split('/');
  return isValidLanguage(lang) ? lang : defaultLanguage;
}

// Check if content should be shown for current language
export function shouldShowForLanguage(currentLang, showOn) {
  if (Array.isArray(showOn)) {
    return showOn.includes(currentLang);
  }
  return currentLang === showOn;
}

// Get language-specific styles (matching your Tailwind theme)
export function getLanguageSpecificStyles(lang) {
  const styles = {
    en: {
      primary: 'text-primary-600 bg-primary-50',
      secondary: 'text-secondary bg-secondary-foreground',
    },
    nl: {
      primary: 'text-feitlijn-purple-600 bg-feitlijn-purple-50',
      secondary: 'text-feitlijn-yellow bg-feitlijn-yellow-50',
    },
  };

  return styles[lang] || styles[defaultLanguage];
}
