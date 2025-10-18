import sanityClient from '@sanity/client'
import imageURLBuilder from '@sanity/image-url'

// Sanity client configuration
export const client = sanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: process.env.REACT_APP_SANITY_DATASET || "production",
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production, disable in development
  apiVersion: process.env.REACT_APP_SANITY_API_VERSION || "2022-02-01",
  token: process.env.REACT_APP_SANITY_TOKEN, // Use environment variable for token
  withCredentials: false, // Prevent CORS credential issues
});

// Image URL builder for Sanity images
const builder = imageURLBuilder(client);

// Export URL builder function for Sanity images
export const urlFor = (source) => builder.image(source);