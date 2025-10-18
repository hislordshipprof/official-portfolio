const sanityClient = require('@sanity/client');

const client = sanityClient({
  projectId: 'l3wd7476',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2022-02-01',
  token: process.env.SANITY_AUTH_TOKEN || 'skC9HZmyj3pbJxiBPwv90Jo5hHgytebCk8X9bpWouQDr72z7026mfAp0WtVWkkTjMIeCha1GJHmmk0mlK4jbjpFkoXMTjvIy8BJjffkGJvqle2bwqK6oiMn7LRPCyHU0Jyq1V0CLIgaiM8Gd9aXGbPuUxs0BkxO7vTaIvaCUxCPGrKVIBwkG'
});

async function removeDuplicates() {
  console.log('🔍 Finding and removing duplicate entries...');

  try {
    // Get all works/projects
    const works = await client.fetch('*[_type == "works"]');
    console.log(`📊 Found ${works.length} work entries`);

    // Group works by title to find duplicates
    const workGroups = works.reduce((groups, work) => {
      const title = work.title || 'Untitled';
      if (!groups[title]) groups[title] = [];
      groups[title].push(work);
      return groups;
    }, {});

    // Remove duplicates (keep the first, delete the rest)
    for (const [title, workGroup] of Object.entries(workGroups)) {
      if (workGroup.length > 1) {
        console.log(`🔄 Found ${workGroup.length} duplicates of "${title}"`);
        // Keep the first one, delete the rest
        const toDelete = workGroup.slice(1);
        for (const work of toDelete) {
          console.log(`🗑️ Deleting duplicate work: ${work._id} - "${title}"`);
          await client.delete(work._id);
        }
      }
    }

    // Get all education entries
    const education = await client.fetch('*[_type == "education"]');
    console.log(`📊 Found ${education.length} education entries`);

    // Group education by institution + degree to find duplicates
    const educationGroups = education.reduce((groups, edu) => {
      const key = `${edu.institution || 'Unknown'}_${edu.degree || 'Unknown'}_${edu.field || 'Unknown'}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(edu);
      return groups;
    }, {});

    // Remove education duplicates
    for (const [key, eduGroup] of Object.entries(educationGroups)) {
      if (eduGroup.length > 1) {
        console.log(`🔄 Found ${eduGroup.length} duplicate education entries for "${key}"`);
        // Keep the first one, delete the rest
        const toDelete = eduGroup.slice(1);
        for (const edu of toDelete) {
          console.log(`🗑️ Deleting duplicate education: ${edu._id} - "${edu.institution} ${edu.degree}"`);
          await client.delete(edu._id);
        }
      }
    }

    // Get all work experience entries
    const workExperience = await client.fetch('*[_type == "workExperience"]');
    console.log(`📊 Found ${workExperience.length} work experience entries`);

    // Group work experience by company + position to find duplicates
    const workExpGroups = workExperience.reduce((groups, exp) => {
      const key = `${exp.company || 'Unknown'}_${exp.position || 'Unknown'}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(exp);
      return groups;
    }, {});

    // Remove work experience duplicates
    for (const [key, expGroup] of Object.entries(workExpGroups)) {
      if (expGroup.length > 1) {
        console.log(`🔄 Found ${expGroup.length} duplicate work experience entries for "${key}"`);
        // Keep the first one, delete the rest
        const toDelete = expGroup.slice(1);
        for (const exp of toDelete) {
          console.log(`🗑️ Deleting duplicate work experience: ${exp._id} - "${exp.company} ${exp.position}"`);
          await client.delete(exp._id);
        }
      }
    }

    console.log('✅ Successfully removed all duplicate entries!');
    
    // Show final counts
    const finalWorks = await client.fetch('*[_type == "works"]');
    const finalEducation = await client.fetch('*[_type == "education"]');
    const finalWorkExp = await client.fetch('*[_type == "workExperience"]');
    
    console.log('\n📈 Final counts:');
    console.log(`   Works/Projects: ${finalWorks.length}`);
    console.log(`   Education: ${finalEducation.length}`);
    console.log(`   Work Experience: ${finalWorkExp.length}`);

  } catch (error) {
    console.error('❌ Error removing duplicates:', error);
  }
}

removeDuplicates();
