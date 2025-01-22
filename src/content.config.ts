import { defineCollection, reference, z } from "astro:content";

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

// Define the image schema for when we need a full image object
const imageSchema = z.object({
  url: z.string(),
  alt: z.string().min(1, "Alt text is required"),
  width: z.number().optional(),
  height: z.number().optional(),
});
// Reference schemas for consistent linking
const authorReference = reference("team");
const caseStudyReference = reference("case-studies");
const articleReference = reference("articles");
const courseReference = reference("courses");

const teamSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().min(1),
  profileImage: z.string().optional(),
  expertise: z.array(z.string()).min(1),
  socialLinks: z
    .object({
      linkedin: z.string().optional(),
      email: z.string().optional(), // Added email
      phone: z.string().optional(), // Added phone
      github: z.string().optional(),
      twitter: z.string().optional(),
    })
    .optional(),
  education: z.string().optional(), // Added education
  featured: z.boolean().default(false),
});

// Case Study schema
const caseStudySchema = z.object({
  title: z.string().min(1),
  date: z.coerce.date(),
  author: z.string(),
  featured: z.boolean().default(false),
  show_on_landing: z.boolean().default(false),
  reading_time: z.number().int().positive(),
  service_category: z.string().optional(),
  tags: z.object({
    industries: z.array(z.string()),
    technologies: z.array(z.string()),
    resource_tags: z.array(z.string()).default([]),
  }),
  cover_image: imageSchema.optional(),
  thumbnail: imageSchema.optional(),
  stakeholder: z.enum(STAKEHOLDERS).nullable().optional(),
  stakholder_bubble_title: z.string().min(1).nullable().optional(),
});
const articleSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  publishDate: z.coerce.date(),
  author: authorReference,
  tags: z.array(z.string()).min(1),
  coverImage: z.string().optional(), // Changed from imageSchema to string
  featured: z.boolean().default(false),
  relatedCaseStudies: z.array(caseStudyReference).optional(),
  readingTime: z.number().optional(), // Add this to match your content
});

const courseSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  publishDate: z.coerce.date(),
  instructor: authorReference,
  duration: z.string().min(1),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  tags: z.array(z.string()).min(1),
  coverImage: z.string().optional(), // Changed from imageSchema to string
  videoUrl: z.string().optional(),
  modules: z
    .array(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        duration: z.string().min(1),
        videoUrl: z.string().optional(),
      })
    )
    .min(1),
  relatedCaseStudies: z.array(caseStudyReference).optional(),
  relatedServices: z.array(z.string()).optional(),
});

const news = defineCollection({
  schema: z
    .object({
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
    })
    .partial({ impact: true }),
});
// Export collections
export const collections = {
  team: defineCollection({
    type: "content",
    schema: teamSchema,
  }),
  articles: defineCollection({
    type: "content",
    schema: articleSchema,
  }),
  courses: defineCollection({
    type: "content",
    schema: courseSchema,
  }),
  "case-studies": defineCollection({
    type: "content",
    schema: caseStudySchema,
  }),
  news: defineCollection({
    type: "content",
    schema: news.schema,
  }),
};
