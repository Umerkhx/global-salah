import { countriesData } from '@/lib/CountriesAndcities';

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\w-]+/g, '');
}

export async function GET(): Promise<Response> {
  const baseUrl = 'https://globalsalah.com/tr';

  const staticPages = [
    '',
    'about-us',
    'forum',
    'blogs',
    'contact-us',
    'duas',
    'qaza-namaz-calculator',
    'zakat-calculator',
    'inheritance-calculator',
    'qibla-finder',
    'islamic-calender',
    'ramadan-calender',
    'makkah-tv',
    'madina-tv',
    'sahih-bukhari',
    'sahih-muslim',
    'jamia-tirmazi',
    'sunan-abu-dawood',
    'sunan-nisai',
    '99-names-of-allah',
    'terms-and-conditions',
    'privacy-policy',
  ];

  const staticUrls = staticPages.map(
    (page) => `${baseUrl}/${page}`
  );

  // --- Dynamic Pages (countries + cities) ---
  const dynamicUrls: string[] = [];

  for (const [country, data] of Object.entries(countriesData)) {
    const countrySlug = slugify(country);
    dynamicUrls.push(`${baseUrl}/countries/${countrySlug}`);

    data.cities.forEach((city) => {
      const citySlug = slugify(city.name);
      dynamicUrls.push(`${baseUrl}/countries/${countrySlug}/${citySlug}`);
    });
  }

  const allUrls = [...staticUrls, ...dynamicUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls
    .map(
      (url) => `<url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`
    )
    .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
