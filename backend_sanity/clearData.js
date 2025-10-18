const sanityClient = require('@sanity/client');

const client = sanityClient({
  projectId: 'l3wd7476',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2022-02-01',
  token: process.env.SANITY_AUTH_TOKEN || 'skC9HZmyj3pbJxiBPwv90Jo5hHgytebCk8X9bpWouQDr72z7026mfAp0WtVWkkTjMIeCha1GJHmmk0mlK4jbjpFkoXMTjvIy8BJjffkGJvqle2bwqK6oiMn7LRPCyHU0Jyq1V0CLIgaiM8Gd9aXGbPuUxs0BkxO7vTaIvaCUxCPGrKVIBwkG'
});

async function clearData() {
  try {
    console.log('🧹 Starting data cleanup...');

    // Document types to clear
    const docTypes = [
      'workExperience',
      'education', 
      'certifications',
      'works',
      'abouts',
      'skills'
    ];

    for (const docType of docTypes) {
      console.log(`🗑️ Clearing ${docType}...`);
      
      // Get all documents of this type
      const documents = await client.fetch(`*[_type == "${docType}"]`);
      
      // Delete each document
      for (const doc of documents) {
        await client.delete(doc._id);
      }
      
      console.log(`✅ Cleared ${documents.length} ${docType} documents`);
    }

    console.log('🎉 All data cleared successfully!');
    console.log('💡 Run "npm run seed" to populate with fresh data.');
    
  } catch (error) {
    console.error('❌ Error clearing data:', error);
  }
}

// Run the cleanup
clearData();
