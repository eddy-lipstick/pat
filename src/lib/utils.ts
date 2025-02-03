import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Add these new i18n utilities
export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang === 'en' || lang === 'nl') return lang;
  return 'nl'; // default language
}

export function useTranslatedPath(lang: string) {
  return function translatePath(path: string) {
    return `/${lang}${path}`;
  };
}

// Optional: helper to handle default translations
export function getTranslation(translations: any, lang: string) {
  return translations[lang] || translations['nl'];
}
