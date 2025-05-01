/**
 * Utilities for handling digital studio products
 */

import { getCollection } from 'astro:content';

/**
 * Gets all digital studio products for a specific language
 * @param {string} lang - The language code ('en' or 'nl')
 * @returns {Promise<Array>} - Array of digital studio products
 */
export async function getDigitalStudioProducts(lang) {
  const allProducts = await getCollection('digital-studio');

  const langProducts = allProducts.filter((product) => product.id.startsWith(lang + '/'));

  return langProducts;
}

/**
 * Gets featured digital studio products for a specific language
 * @param {string} lang - The language code ('en' or 'nl')
 * @param {number} limit - Maximum number of products to return (default: 3)
 * @returns {Promise<Array>} - Array of featured digital studio products
 */
export async function getFeaturedDigitalStudioProducts(lang, limit = 3) {
  const allProducts = await getDigitalStudioProducts(lang);

  // First get products explicitly marked as featured
  const featuredProducts = allProducts.filter((product) => product.data.featured);

  // If we don't have enough featured products, add more until we reach the limit
  if (featuredProducts.length < limit) {
    const nonFeatured = allProducts.filter((product) => !product.data.featured);
    return [...featuredProducts, ...nonFeatured].slice(0, limit);
  }

  return featuredProducts.slice(0, limit);
}

/**
 * Gets the live URL for a digital studio product if available
 * @param {Object} product - The digital studio product object
 * @returns {string|null} - The live URL or null if not available
 */
export function getProductLiveUrl(product) {
  return product?.data?.metadata?.website || null;
}
