import sanityClient from '@sanity/client'
import imageURLBuilder from '@sanity/image-url'


export const client = sanityClient({
  projectId: "l3wd7476",
  dataset: "production",
  useCdn: true,
  apiVersion: "",
  token: "",
});