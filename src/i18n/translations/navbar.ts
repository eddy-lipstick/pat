// src/i18n/translations/navbar.ts

export const navbarTranslations = {
  en: {
    projects: 'Case Studies',
    digitalProducts: 'Tools',
    about: {
      title: 'About us',
      approach: 'Approach',
      team: 'Team',
      news: 'News',
    },
    learn: {
      title: 'Learn',
      training: 'Training offers',
      blog: 'Blog',
    },
    contact: 'Contact',
  },
  nl: {
    projects: 'Case Studies',
    digitalProducts: 'Tools',
    about: {
      title: 'Over ons',
      approach: 'Aanpak',
      team: 'Team',
      news: 'Nieuws',
    },
    learn: {
      title: 'Leren',
      training: 'Trainingsaanbod',
      blog: 'Blog',
      visualDissection: 'Visuele snijtafel',
      tipsFromDiel: 'Tips van Diel',
    },
    contact: 'Contact',
  },
};

// Define a type for the language keys
type LangKey = keyof typeof navbarTranslations;

// Helper function to get navigation items based on language
export const getNavItems = (currentLang: string, currentPath: string) => {
  // Assert that currentLang is a valid key
  const t = navbarTranslations[currentLang as LangKey];

  const learnChildren = [
    { label: t.learn.training, href: `/${currentLang}/learn/training` },
    { label: t.learn.blog, href: `/${currentLang}/learn/articles` },
  ];

  // Add Dutch-only items
  if (currentLang === 'nl') {
    // Access Dutch translations directly here to satisfy TypeScript
    const nlLearn = navbarTranslations.nl.learn;
    learnChildren.push({
      label: nlLearn.visualDissection,
      href: `/learn/courses/visuele-snijtafel`,
    });
    learnChildren.push({
      label: 'Tips van Dielis',
      href: `/learn/courses/tips-van-diel`,
    });
  }
  return [
    {
      label: t.projects,
      href: `/${currentLang}/case-studies`,
    },
    {
      label: t.digitalProducts,
      href: `/${currentLang}/tools`,
    },
    {
      label: t.about.title,
      href: `/${currentLang}/about`,
      children: [
        { label: t.about.title, href: `/${currentLang}/about` },
        { label: t.about.approach, href: `/${currentLang}/approach` },
        { label: t.about.team, href: `/${currentLang}/team` },
        { label: t.about.news, href: `/${currentLang}/news` },
      ],
    },
    {
      label: t.learn.title,
      href: `/${currentLang}/learn`,
      children: learnChildren,
    },
    {
      label: t.contact,
      href: `/${currentLang}/contact`,
      isCTA: true,
    },
    {
      label: currentLang.toUpperCase(),
      icon: 'Globe',
      children: [
        {
          label: 'English',
          href: currentPath.replace(/^\/[a-z]{2}/, '/en'),
          active: currentLang === 'en',
        },
        {
          label: 'Nederlands',
          href: currentPath.replace(/^\/[a-z]{2}/, '/nl'),
          active: currentLang === 'nl',
        },
      ],
    },
  ];
};
