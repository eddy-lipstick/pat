// src/components/LanguageWrapper.jsx
import React from 'react';
import { getLangFromUrl } from '../i18n/utils';

const LanguageWrapper = ({ showOn, children, className = '' }) => {
  const currentPath = window.location.pathname;
  const currentLang = currentPath.split('/')[1];

  // Handle both array and string cases for showOn
  const shouldShow = Array.isArray(showOn) ? showOn.includes(currentLang) : showOn === currentLang;

  if (!shouldShow) return null;

  return <div className={className}>{children}</div>;
};

export default LanguageWrapper;
