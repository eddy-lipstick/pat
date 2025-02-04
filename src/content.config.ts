import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const LANGUAGES = ['en', 'nl'] as const;

// Constants
const PILLARS = ['Tech', 'Legal', 'Design'] as const;
const STAKEHOLDERS = [
  'Toezichthouders',
  'Rechters en arbiters',
  'Investeerders',
  'Bestuur',
  'Klanten',
  'Sales team',
  "Collega's",
  'Algemene publiek',
] as const;

const timelineEntrySchema = z.object({
  phase: z.string(),
  description: z.string(),
  imageUrl: z.string().optional(),
});

// Shared schemas
const imageSchema = z.object({
  url: z.string(),
  alt: z.string().min(1, 'Alt text is required'),
  width: z.number().optional(),
  height: z.number().optional(),
});

// Modern case study components schemas
const heroVideoSchema = z.object({
  src: z.string(),
  poster: z.string(),
  title: z.string(),
});

const metadataSchema = z.object({
  client: z.string(),
  date: z.string(),
  relatedSkills: z.array(z.string()), // Changed from services
  website: z.string().optional(),
});

const expandableContentSchema = z.object({
  title: z.string(),
  firstParagraph: z.string(),
  remainingText: z.array(z.string()),
});

const quoteSchema = z.object({
  quote: z.string(),
  author: z.string(),
  role: z.string(),
});

const mediaSchema = z.object({
  src: z.string(),
  alt: z.string(),
  type: z.enum(['full', 'grid', 'slider']),
});

const beforeAfterSchema = z.object({
  beforeImage: z.string(),
  afterImage: z.string(),
  alt: z.string(),
});

const caseStudySchema = z.object({
  // Core fields
  title: z.string().min(1),
  introduction: z.string(),
  cover_image: z
    .object({
      src: z.string(),
      alt: z.string().default('Case study cover image'),
    })
    .optional(),

  // Core metadata
  metadata: z.object({
    client: z.string(),
    date: z.string(),
    relatedSkills: z.array(z.string()),
    website: z.string().optional(),
  }),

  // Language field (optional since it's determined by folder structure)
  language: z.enum(LANGUAGES).optional(),

  // Display settings
  featured: z.boolean().default(false),
  show_on_landing: z.boolean().default(false),

  // Tags for filtering/organization
  tags: z.array(z.string()).default([]),

  // Modern components (keep existing schemas)
  heroVideo: heroVideoSchema.optional(),
  expandableContent: z.array(expandableContentSchema).optional(),
  quotes: z
    .object({
      first: quoteSchema.optional(),
      second: quoteSchema.optional(),
    })
    .optional(),
  images: z.array(mediaSchema).optional(),
  beforeAfter: z.array(beforeAfterSchema).optional(),
  teamMember: reference('team').optional(),
  timeline: z
    .object({
      entries: z.array(timelineEntrySchema),
    })
    .optional(),

  // Optional field to reference the translation in other language
  translationRef: z.string().optional(),
});

const courseSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  instructor: z.string(),
  coverImage: z.string(),
  duration: z.string(),
  lessonsCount: z.number(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  level: z.enum(['beginner', 'Tips van Dielis', 'advanced']),
  tags: z.array(z.string()),
  updatedDate: z.coerce.date(),
  publishedDate: z.coerce.date(),
});

const teamSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().min(1),
  profileImage: z.string().optional(),
  expertise: z.array(z.string()).min(1),
  socialLinks: z
    .object({
      linkedin: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
      github: z.string().optional(),
      twitter: z.string().optional(),
    })
    .optional(),
  education: z.string().optional(),
  featured: z.boolean().default(false),
});

const articleSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  publishDate: z.coerce.date(),
  author: reference('team'),
  tags: z.array(z.string()).min(1),
  coverImage: z.string().optional(),
  featured: z.boolean().default(false),
  relatedCaseStudies: z.array(reference('case-studies')).optional(),
  readingTime: z.number().optional(),
});

const testimonialSchema = z.object({
  quote: z.string(),
  author: z.string(),
  role: z.string(),
  company: z.string().optional(),
  image: z.string().optional(),
});

const trainingSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  publishDate: z.coerce.date(),

  // Training specific info
  duration: z.string(), // e.g., "4 hours", "1 day"
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  maxParticipants: z.number().optional(),
  language: z.enum(['nl', 'en']).default('nl'),
  location: z.enum(['online', 'in-person', 'hybrid']),
  price: z.string().optional(),

  // Content organization
  learningObjectives: z.array(z.string()),
  modules: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      duration: z.string().optional(),
    }),
  ),

  // Related content
  trainers: z
    .array(
      z.union([
        // Accept both string IDs and object references
        z.string(),
        z.object({
          id: z.string(),
        }),
      ]),
    )
    .optional(),
  prerequisites: z.array(z.string()).optional(),
  includes: z.array(z.string()).optional(), // What's included in the training

  // Social proof
  testimonials: z.array(testimonialSchema).optional(),

  // Media and metadata
  coverImage: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  tags: z.array(z.string()).min(1),
  featured: z.boolean().default(false),

  // Upcoming dates
  upcomingDates: z
    .array(
      z.object({
        date: z.coerce.date(),
        spots: z.number().optional(),
        location: z.string().optional(),
      }),
    )
    .optional(),
});
const approachSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  pillar: z.enum(PILLARS),

  methodology: z.array(z.string()).min(1),
  benefits: z.object({
    description: z.string().min(1),
    metrics: z.array(z.string()).min(1),
  }),
  featuredCases: z
    .array(
      z.object({
        title: z.string().min(1),
        result: z.string().min(1),
        slug: z.string().min(1),
      }),
    )
    .optional(),
  order: z.number().optional(),
  icon: z.string().optional(),
  translations: z
    .object({
      en: z.string().optional(),
      nl: z.string().optional(),
    })
    .optional(),
});

const lessonSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  videoUrl: z.string().url(),
  duration: z.string(), // Format: "MM:SS"
  order: z.number(),
  draft: z.boolean().default(false),
});

// Update the news schema to include language support
const newsSchema = z.object({
  title: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  type: z.enum(['speaking', 'award', 'news', 'project']),
  featured: z.boolean(),
  summary: z.string(),
  labels: z.array(z.string()),
  link: z.string().url().optional(),
  // Add language field
  language: z.enum(LANGUAGES).default('nl'),
  // Optional reference to the translation in other language
  translationRef: z.string().optional(),
  image: z
    .object({
      src: z.string(),
      alt: z.string(),
    })
    .optional(),
});

// Export collections with new loader pattern
export const collections = {
  'case-studies': defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}', // This will match files in language subdirectories
      base: './src/content/case-studies',
    }),
    schema: caseStudySchema,
  }),
  team: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}', // This will match files in language subdirectories
      base: './src/content/team',
    }),
    schema: teamSchema,
  }),

  articles: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/content/articles',
    }),
    schema: articleSchema,
  }),

  training: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/content/training',
    }),
    schema: trainingSchema,
  }),

  approach: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/content/approach',
    }),
    schema: approachSchema,
  }),

  news: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/content/news',
    }),
    schema: newsSchema,
  }),

  courses: defineCollection({
    loader: glob({
      pattern: '**/index.{md,mdx}',
      base: './src/content/learn/courses',
    }),
    schema: courseSchema,
  }),

  lessons: defineCollection({
    loader: glob({
      pattern: '**/lessons/*.{md,mdx}', // Changed pattern
      base: './src/content/learn/courses',
    }),
    schema: lessonSchema,
  }),
};

export type SupportedLanguage = (typeof LANGUAGES)[number];
