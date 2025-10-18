import sanityClient from '@sanity/client'
import imageURLBuilder from '@sanity/image-url'

// Sanity client configuration

export const client = sanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID || "l3wd7476",
  dataset: "production",
  useCdn: false, // Disable CDN to avoid caching issues during development
  apiVersion: "2022-02-01",
  // Remove token completely to avoid credentials CORS issue
  // token: process.env.REACT_APP_SANITY_TOKEN || "skC9HZmyj3pbJxiBPwv90Jo5hHgytebCk8X9bpWouQDr72z7026mfAp0WtVWkkTjMIeCha1GJHmmk0mlK4jbjpFkoXMTjvIy8BJjffkGJvqle2bwqK6oiMn7LRPCyHU0Jyq1V0CLIgaiM8Gd9aXGbPuUxs0BkxO7vTaIvaCUxCPGrKVIBwkG",
});

// Image URL builder for Sanity images

//this builder is useful for our images we will be using
const builder = imageURLBuilder(client)
//we can now use the builder to build a url for an image
export const urlFor = (source) => builder.image(source)