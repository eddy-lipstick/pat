// src/utils/getComponentLanguage.ts
export function getComponentLanguage(url: URL) {
  // Check if we're on a language path
  const firstSegment = url.pathname.split('/')[1];

  // If we're on a language path (e.g. /en/ or /nl/), use that
  if (firstSegment === 'en' || firstSegment === 'nl') {
    return firstSegment;
  }

  // Otherwise return Dutch as default
  return 'nl';
}
