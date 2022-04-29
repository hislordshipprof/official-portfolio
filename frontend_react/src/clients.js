import sanityClient from '@sanity/client'
import imageURLBuilder from '@sanity/image-url'


export const client = sanityClient({
  projectId:process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: true,
  apiVersion: "2022-02-01",
  token: process.env.REACT_APP_SANITY_TOKEN,
});

//this builder is useful for our images we will be using
const builder = imageURLBuilder(client)
//we can now use the builder to build a url for an image
export const urlFor = (source) => builder.image(source)