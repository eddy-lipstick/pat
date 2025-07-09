# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Patroon Legal Design website (https://www.patroon.nl) - a multilingual Astro-based web application for a legal design consultancy specializing in litigation visuals, contract redesign, and legal design training.

## Technology Stack

- **Framework**: Astro v5.7.10
- **UI**: React v19 for interactive components
- **Styling**: Tailwind CSS with custom design tokens
- **Language**: TypeScript with strict mode
- **Content**: MDX for enhanced content authoring
- **Animations**: Framer Motion
- **Components**: Radix UI primitives via shadcn/ui

## Common Development Commands

```bash
# Development
npm run dev         # Start development server (localhost:4321)
npm run build       # Build for production to ./dist/
npm run preview     # Preview production build locally

# Utilities
npm run generate-og # Generate Open Graph images for case studies
npm run astro check # Type-check the project
```

## Architecture

### Directory Structure

```
src/
├── components/     # UI components (Astro & React)
│   ├── ui/        # shadcn/ui components
│   └── ...        # Feature-specific components
├── content/       # Content collections (MDX/MD)
├── layouts/       # Page layouts
├── pages/         # File-based routing
│   └── [lang]/    # Language-based routes
├── i18n/          # Internationalization
├── lib/           # Utilities and helpers
└── styles/        # Global styles
```

### Key Architectural Patterns

1. **Content Collections**: All content is managed through Astro's content collections with Zod schema validation. Collections include: case-studies, articles, team, training, tools, news, approach, courses, and lessons.

2. **Internationalization**: 
   - Languages: Dutch (nl, default) and English (en)
   - URL structure: `/[lang]/path` (Dutch paths omit language prefix)
   - Translation keys in `src/i18n/ui.ts`
   - Content duplication per language in content collections

3. **Routing**: 
   - Dynamic language-based routing via `[lang]` parameter
   - Middleware redirects root to Dutch by default
   - Static paths generation for all content

4. **Component Strategy**:
   - Astro components for static content
   - React components with `client:*` directives for interactivity
   - Selective hydration for performance

### Important Files

- `astro.config.mjs`: Site configuration and integrations
- `tailwind.config.mjs`: Custom design system configuration
- `src/lib/utils.ts`: Common utilities including `cn()` for className merging
- `src/i18n/utils.ts`: i18n helper functions
- `src/content/config.ts`: Content collection schemas

## Special Features

1. **Bubble Map**: Interactive case study visualization at `/src/components/BubbleMap.tsx`
2. **Course System**: Learning management features in `/src/pages/[lang]/courses/`
3. **OG Image Generation**: Custom script at `/scripts/generate-og-images.ts`
4. **Team Expertise**: Tag-based filtering system for team members

## Code Conventions

- Use TypeScript for all new code
- Import aliases: `@/` maps to `./src/`
- Tailwind classes with custom design tokens (feitlijn-purple, feitlijn-yellow)
- Component files use PascalCase
- Utility functions use camelCase
- Content files use kebab-case

## Performance Considerations

- Images are optimized through Astro's Image component
- Lazy loading for off-screen content
- Minimal client-side JavaScript through selective hydration
- Static site generation for all pages

## Security Notes

- No API keys or secrets should be committed
- Form submissions should be validated
- User input must be sanitized
- CORS headers configured in hosting environment