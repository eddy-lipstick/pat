import { languages, defaultLanguage } from './config';

export function getLangFromUrl(url) {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang;
  return defaultLanguage;
}

// Simple path translation helper
export function useTranslatedPath(lang) {
  return function translatePath(path) {
    return `/${lang}${path}`;
  };
}
