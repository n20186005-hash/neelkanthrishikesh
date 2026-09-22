import {
  ADDRESS_HI,
  ALTERNATE_NAMES,
  ATTRACTION_FULL_NAME,
  ATTRACTION_FULL_NAME_HI,
  ATTRACTION_SHORT_NAME,
  CITY_NAME,
  COUNTRY_CODE_2LETTER,
  COUNTRY_NAME,
  DISTRICT_NAME,
  GOVT_TOURISM_URL,
  HERO_IMAGE,
  LATITUDE,
  LONGITUDE,
  MAPS_SHARE_URL,
  MINISTRY_TOURISM_URL,
  NEARBY_LANDMARK_1,
  NEARBY_LANDMARK_2,
  OPENING_HOURS,
  POSTAL_CODE,
  RATING_VALUE,
  REVIEW_COUNT,
  STATE_PROVINCE,
  STREET_ADDRESS,
  TOURIST_TYPE,
  LOCALITY_NAME,
  absUrl,
  SITE_NAME_EN
} from '../data/site';

export interface FaqEntry {
  q: string;
  a: string;
}

/** TouristAttraction (+HinduTemple) — @id, image, hasMap, sameAs सहित */
export function attractionSchema(): Record<string, unknown> {
  const origin = absUrl('/');
  return {
    '@context': 'https://schema.org',
    '@type': ['TouristAttraction', TOURIST_TYPE],
    '@id': absUrl('/#attraction'),
    name: ATTRACTION_FULL_NAME,
    alternateName: ALTERNATE_NAMES,
    description: `Comprehensive visitor guide to ${ATTRACTION_FULL_NAME} in ${CITY_NAME}, ${STATE_PROVINCE}, ${COUNTRY_NAME}. ${ATTRACTION_FULL_NAME_HI} — ${ADDRESS_HI}.`,
    url: origin,
    image: [absUrl(HERO_IMAGE)],
    isAccessibleForFree: true,
    touristType: ['पारिवारिक यात्री', 'तीर्थयात्री', 'प्रकृति/ट्रेकिंग'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: STREET_ADDRESS,
      addressLocality: LOCALITY_NAME,
      addressRegion: STATE_PROVINCE,
      postalCode: POSTAL_CODE,
      addressCountry: COUNTRY_CODE_2LETTER
    },
    geo: { '@type': 'GeoCoordinates', latitude: LATITUDE, longitude: LONGITUDE },
    hasMap: MAPS_SHARE_URL,
    openingHours: OPENING_HOURS,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '05:00',
        closes: '18:00'
      }
    ],
    sameAs: [MAPS_SHARE_URL, GOVT_TOURISM_URL, MINISTRY_TOURISM_URL],
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: `${DISTRICT_NAME}, ${STATE_PROVINCE}, ${COUNTRY_NAME}`
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(RATING_VALUE),
      reviewCount: String(REVIEW_COUNT),
      bestRating: '5',
      worstRating: '1'
    }
  };
}

export function faqSchema(entries: FaqEntry[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': absUrl('/#faq'),
    mainEntity: entries.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a }
    }))
  };
}

export function breadcrumbSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': absUrl('/#breadcrumb'),
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: SITE_NAME_EN, item: absUrl('/') },
      { '@type': 'ListItem', position: 2, name: COUNTRY_NAME, item: absUrl('/') },
      { '@type': 'ListItem', position: 3, name: STATE_PROVINCE, item: absUrl('/') },
      {
        '@type': 'ListItem',
        position: 4,
        name: `${DISTRICT_NAME} · ${CITY_NAME}`,
        item: absUrl('/')
      },
      { '@type': 'ListItem', position: 5, name: ATTRACTION_FULL_NAME, item: absUrl('/') }
    ]
  };
}

export function webSiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': absUrl('/#website'),
    url: absUrl('/'),
    name: SITE_NAME_EN,
    inLanguage: 'hi-IN',
    publisher: { '@id': absUrl('/#attraction') },
    about: { '@id': absUrl('/#attraction') }
  };
}

/** आस-पास के स्थलों के नाम — पाठ और JSON-LD दोनों में समान रखने हेतु */
export const NEARBY = [NEARBY_LANDMARK_1, NEARBY_LANDMARK_2] as const;
export const SHORT_NAME = ATTRACTION_SHORT_NAME;
