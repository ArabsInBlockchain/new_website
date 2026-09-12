const fs = require('fs');
const path = require('path');
const https = require('https');

const API_URL = 'https://api.github.com/repos/ArabsInBlockchain/new_website/contents/content/people';
const DATA_DIR = path.join(__dirname, '../src/data');
const OUT_FILE = path.join(DATA_DIR, 'people.json');

// Ensure data dir exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'NodeJS/FetchPeopleScript'
      }
    };
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  try {
    console.log('Fetching people directory list...');
    const files = await fetchJson(API_URL);
    
    if (!Array.isArray(files)) {
      throw new Error('Expected array from GitHub API, got: ' + JSON.stringify(files).substring(0, 100));
    }

    const jsonFiles = files.filter(f => f.name.endsWith('.json'));
    console.log(`Found ${jsonFiles.length} JSON files. Fetching individual data...`);

    const people = [];
    
    // Batch fetch to avoid hitting rate limits too quickly or running out of memory
    const batchSize = 10;
    for (let i = 0; i < jsonFiles.length; i += batchSize) {
      const batch = jsonFiles.slice(i, i + batchSize);
      const promises = batch.map(async (file) => {
        try {
          const personData = await fetchJson(file.download_url);
          if (personData && typeof personData === 'object') {
            personData._filename = file.name;
          }
          return personData;
        } catch (err) {
          console.error(`Failed to fetch ${file.name}:`, err.message);
          return null;
        }
      });
      
      const results = await Promise.all(promises);
      results.forEach(res => {
        if (res) people.push(res);
      });
      console.log(`Processed ${Math.min(i + batchSize, jsonFiles.length)} / ${jsonFiles.length}`);
    }

    // Process and clean data
    const cleanedPeople = people.map(p => {
      // name can be derived from the slug or filename since the JSON doesn't contain a name field
      let nameStr = p.slug || p._filename || 'Unknown';
      if (nameStr.endsWith('.json')) nameStr = nameStr.replace('.json', '');
      nameStr = nameStr.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

      return {
        name: nameStr,
        role: 'Contributor',
        image: p.photo || p.image || '/avatar-placeholder.png', // Fallback
        slug: p.slug || ''
      };
    });

    fs.writeFileSync(OUT_FILE, JSON.stringify(cleanedPeople, null, 2));
    console.log(`Saved ${cleanedPeople.length} people to ${OUT_FILE}`);
  } catch (err) {
    console.error('Error in script:', err);
  }
}

main();
