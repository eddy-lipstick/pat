import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

// Constants
const PILLARS = ["Tech", "Legal", "Design"] as const;
const STAKEHOLDERS = [
  "Toezichthouders",
  "Rechters en arbiters",
  "Investeerders",
  "Bestuur",
  "Klanten",
  "Sales team",
  "Collega's",
  "Algemene publiek",
] as const;

const timelineEntrySchema = z.object({
  phase: z.string(),
  description: z.string(),
  imageUrl: z.string().optional(),
});

// Shared schemas
const imageSchema = z.object({
  url: z.string(),
  alt: z.string().min(1, "Alt text is required"),
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
  type: z.enum(["full", "grid", "slider"]),
});

const beforeAfterSchema = z.object({
  beforeImage: z.string(),
  afterImage: z.string(),
  alt: z.string(),
});

// src/content.config.js
// Collection Schemas
const caseStudySchema = z.object({
  title: z.string().min(1),
  introduction: z.string(),

  // Core metadata
  metadata: z.object({
    client: z.string(),
    date: z.string(),
    relatedSkills: z.array(z.string()), // Changed from services
    website: z.string().optional(),
  }),

  // Display settings
  featured: z.boolean().default(false),
  show_on_landing: z.boolean().default(false),

  // Tags for filtering/organization
  tags: z.array(z.string()).default([]),

  // Modern components
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
  teamMember: reference("team").optional(), // This replaces the old teamMemberSchema
  timeline: z
    .object({
      entries: z.array(timelineEntrySchema),
    })
    .optional(),
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
  author: reference("team"),
  tags: z.array(z.string()).min(1),
  coverImage: z.string().optional(),
  featured: z.boolean().default(false),
  relatedCaseStudies: z.array(reference("case-studies")).optional(),
  readingTime: z.number().optional(),
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
      })
    )
    .optional(),
  order: z.number().optional(),
  icon: z.string().optional(),
});

const newsSchema = z.object({
  title: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  type: z.enum(["speaking", "award", "news", "project"]),
  featured: z.boolean(),
  summary: z.string(),
  labels: z.array(z.string()),
  link: z.string().url().optional(),
  image: z
    .object({
      src: z.string(),
      alt: z.string(),
    })
    .optional(),
});

// Export collections with new loader pattern
export const collections = {
  "case-studies": defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "./src/content/case-studies",
    }),
    schema: caseStudySchema,
  }),

  team: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "./src/content/team",
    }),
    schema: teamSchema,
  }),

  articles: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "./src/content/articles",
    }),
    schema: articleSchema,
  }),

  approach: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "./src/content/approach",
    }),
    schema: approachSchema,
  }),

  news: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "./src/content/news",
    }),
    schema: newsSchema,
  }),
};
