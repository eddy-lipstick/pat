# Digital Products Guide

This document explains how to create and manage digital products on the Patroon website.

## What are Digital Products?

Digital products are case studies that represent ongoing software tools, platforms, or digital solutions that we've developed. Unlike standard case studies that showcase one-time project work, digital products:

- Are ongoing offerings available for use
- Often have live demos or access points
- Can be tried or purchased by visitors

## How to Create a Digital Product

Digital products are managed through the case studies collection with special tagging. Here's how to create one:

1. Create a standard case study in both languages (`en` and `nl`) following the normal case study format.
2. Add the `digital-product` tag to the `tags` array in the frontmatter.
3. If there is a live version available, add the URL to the `metadata.website` field.

### Example Frontmatter

```yaml
---
title: "Your Digital Product Name"
introduction: "A brief description of what your digital product does."

# Cover image
cover_image:
  src: "/images/case-studies/your-product.jpg"
  alt: "Product screenshot or illustration"

# Metadata
metadata:
  client: "Target Users"
  date: "Release Date"
  relatedSkills: ["Relevant", "Skills", "Technologies"]
  website: "https://example.com/your-product" # Link to live product

# Tags - IMPORTANT: include 'digital-product' tag
tags: ["digital-product", "other-relevant-tags"]

# Team member reference - must include language prefix
teamMember: "en/team-member-id"

# Other standard case study fields...
---
```

## Content Structure

The content should follow standard case study structure but with some special considerations:

1. **Focus on the product itself** rather than just the development process
2. **Highlight features and benefits** for potential users
3. **Include usage instructions** or quick-start guidance 
4. **Describe ongoing development** and future roadmap
5. **Include testimonials** from actual users if possible

## How Digital Products are Displayed

Digital products appear in two places:

1. **Digital Products Page** at `/[lang]/digital-solutions` - Only shows case studies with the `digital-product` tag
2. **Case Studies Page** at `/[lang]/case-studies` - Shows all case studies including digital products

The digital products page provides special formatting that:
- Shows a prominent "Try Now" button for products with live URLs
- Presents products in a way that emphasizes they are ongoing offerings

## Helper Functions

You can use these helper functions in your code:

```javascript
import { 
  getDigitalProducts, 
  isDigitalProduct, 
  getProductLiveUrl, 
  DIGITAL_PRODUCT_TAG 
} from '@/lib/products';

// Get all digital products for a language
const products = await getDigitalProducts('en');

// Check if a case study is a digital product
const isProduct = isDigitalProduct(caseStudy);

// Get the live URL for a product (if available)
const liveUrl = getProductLiveUrl(caseStudy);
```

## Tips

1. **Quality images are crucial** - Use high-quality screenshots or illustrations of the product interface
2. **Keep descriptions concise** - Focus on what the product does and its key benefits
3. **Update regularly** - When features change or new testimonials become available
4. **Link between languages** - Use the `translationRef` field to connect English and Dutch versions
5. **Team references** - Always include the language prefix for team member references (e.g., "en/member-id")

## Example

We've added an example digital product called "ContractAnalyzer Pro" that you can reference:
- `/src/content/case-studies/en/contract-analyzer.md`
- `/src/content/case-studies/nl/contract-analyzer.md`
