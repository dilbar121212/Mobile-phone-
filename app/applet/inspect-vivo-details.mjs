import fs from 'fs';

async function test() {
  const res = await fetch('https://shop.vivo.com/pk/products/phone', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    }
  });
  const html = await res.text();
  
  // Check for window.__NUXT__
  const nuxtMatch = html.match(/window\.__NUXT__\s*=\s*([\s\S]*?);<\/script>/);
  if (nuxtMatch) {
    console.log('window.__NUXT__ found, length:', nuxtMatch[1].length);
    fs.writeFileSync('nuxt-sample.txt', nuxtMatch[1].slice(0, 10000));
  } else {
    console.log('window.__NUXT__ not found');
  }

  // Look for any JSON-LD or script with type application/json or ld+json
  const scripts = html.match(/<script[^>]*>([\s\S]*?)<\/script>/gi) || [];
  for (const s of scripts) {
    if (s.includes('Y32') || s.includes('phone') || s.includes('price')) {
      console.log('Script snippet mentioning Y32/phone/price:', s.slice(0, 300));
    }
  }

  // Look for product card HTML
  const cardMatches = html.match(/<div[^>]*class="[^"]*product[^"]*"[^>]*>[\s\S]*?<\/div>/gi) || [];
  console.log('Product div matches:', cardMatches.length);
  
  // Search for Y32 surrounding text
  const y32Idx = html.indexOf('Y32');
  if (y32Idx !== -1) {
    console.log('Y32 surrounding context:');
    console.log(html.substring(Math.max(0, y32Idx - 500), Math.min(html.length, y32Idx + 1000)));
  }
}

test();
