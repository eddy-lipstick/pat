/**
 * Utilities for handling digital products in the case studies collection
 */

import { getCollection } from 'astro:content';

// Constants
export const DIGITAL_PRODUCT_TAG = 'digital-product';

/**
 * Gets all digital products for a specific language
 * @param {string} lang - The language code ('en' or 'nl')
 * @returns {Promise<Array>} - Array of case studies tagged as digital products
 */
export async function getDigitalProducts(lang) {
  const allCaseStudies = await getCollection('case-studies');
  
  const digitalProducts = allCaseStudies.filter(
    (study) => study.id.startsWith(lang + '/') && 
               study.data.tags.includes(DIGITAL_PRODUCT_TAG)
  );
  
  return digitalProducts;
}

/**
 * Checks if a case study is a digital product
 * @param {Object} caseStudy - The case study object
 * @returns {boolean} - True if it's a digital product
 */
export function isDigitalProduct(caseStudy) {
  return caseStudy?.data?.tags?.includes(DIGITAL_PRODUCT_TAG);
}

/**
 * Gets the live URL for a digital product if available
 * @param {Object} caseStudy - The case study object
 * @returns {string|null} - The live URL or null if not available
 */
export function getProductLiveUrl(caseStudy) {
  return caseStudy?.data?.metadata?.website || null;
}
