import { getCollection } from 'astro:content';

export async function getCaseStudies() {
  const caseStudies = await getCollection('case-studies');
  return caseStudies.sort((a, b) => {
    // Sort by year in descending order
    return b.data.year - a.data.year;
  });
}

export async function getFeaturedCaseStudies() {
  const allCaseStudies = await getCaseStudies();
  // Get the 3 most recent case studies
  return allCaseStudies.slice(0, 3);
}

export async function getAllTags() {
  const caseStudies = await getCaseStudies();
  const tags = new Set<string>();
  
  caseStudies.forEach(study => {
    study.data.tags.forEach(tag => tags.add(tag));
  });
  
  return Array.from(tags).sort();
}

export async function getTeamMembers() {
  const teamMembers = await getCollection('team');
  return teamMembers;
}
