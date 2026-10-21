/**
 * एकल-आकर्षण SEO एंटिटी बाइंडिंग: इस फ़ाइल में वे सभी भाषा-निरपेक्ष तथ्य हैं
 * जिन्हें JSON-LD, TDK/OG, मानचित्र एम्बेड और आधिकारिक बाहरी लिंक साझा करते हैं।
 * यदि Google Maps लिस्टिंग, पता, निर्देशांक या रेटिंग बदले तो केवल यही फ़ाइल अद्यतन करें।
 */

export const DOMAIN_NAME = 'neelkanthrishikesh.com';
export const SITE_ORIGIN = `https://${DOMAIN_NAME}`;

/** SEO साइट नाम: आकर्षण + शहर + मार्गदर्शिका */
export const SITE_NAME = 'नीलकंठ महादेव मंदिर ऋषिकेश — यात्री मार्गदर्शिका';
export const SITE_NAME_EN = 'Shree Neelkanth Mahadev Temple Rishikesh — Visitor Guide';

/** आधिकारिक पूरा नाम (Google Knowledge Graph हेतु अंग्रेज़ी रूप भी रखा गया है) */
export const ATTRACTION_FULL_NAME = 'Shree Neelkanth Mahadev Temple';
export const ATTRACTION_FULL_NAME_HI = 'श्री नीलकंठ महादेव मंदिर';
/** डोमेन-अर्थ / प्रचलित संक्षिप्त नाम */
export const ATTRACTION_SHORT_NAME = 'Neelkanth Mahadev Temple';
export const ATTRACTION_SHORT_NAME_HI = 'नीलकंठ महादेव मंदिर';

export const CITY_NAME = 'Rishikesh';
export const CITY_NAME_HI = 'ऋषिकेश';
/** डाक पता में Google लिस्टिंग के अनुसार कस्बा */
export const LOCALITY_NAME = 'Kotdwar';
export const LOCALITY_NAME_HI = 'कोटद्वार';
export const DISTRICT_NAME = 'Pauri Garhwal';
export const DISTRICT_NAME_HI = 'पौड़ी गढ़वाल';
export const STATE_PROVINCE = 'Uttarakhand';
export const STATE_PROVINCE_HI = 'उत्तराखंड';
export const COUNTRY_NAME = 'India';
export const COUNTRY_NAME_HI = 'भारत';
export const COUNTRY_CODE_2LETTER = 'IN';
export const POSTAL_CODE = '249304';
export const PLUS_CODE = '38JR+C7F';
export const STREET_ADDRESS = '38JR+C7F, Kotdwar - Pauri Rd';
export const ADDRESS_HI =
  '38JR+C7F, कोटद्वार–पौड़ी रोड, कोटद्वार, उत्तराखंड 249304, भारत';

export const LATITUDE = 30.0810736;
export const LONGITUDE = 78.340675;

export const MAPS_SHARE_URL = 'https://maps.app.goo.gl/CJ2iWSAjTeDeUkWH9';
export const MAPS_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6149.69039500682!2d78.33810007726768!3d30.081073574905236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390914348dccceb9%3A0x1c2f4c719a505597!2sShree%20Neelkanth%20Mahadev%20Temple!5e1!3m2!1shi!2sin!4v1787621823746!5m2!1shi!2sin';

/** पाठ-स्तर पर एंटिटी नाम (लिप्यंतरण भिन्नताएँ) */
export const ALTERNATE_NAMES = [
  ATTRACTION_SHORT_NAME,
  'Neelkanth Rishikesh',
  'नीलकंठ महादेव मंदिर',
  'श्री नीलकण्ठ महादेव मन्दिर',
  `${CITY_NAME} ${ATTRACTION_FULL_NAME}`
];

export const NEARBY_LANDMARK_1 = { name: 'Patna Waterfall', hi: 'पटना जलप्रपात' };
export const NEARBY_LANDMARK_2 = { name: 'Triveni Ghat, Rishikesh', hi: 'त्रिवेणी घाट, ऋषिकेश' };

/** आधिकारिक (.gov/.nic) बाहरी स्रोत */
export const GOVT_TOURISM_URL = 'https://uttarakhandtourism.gov.in';
export const DISTRICT_ADMIN_URL = 'https://pauri.nic.in/tourist-place/neelkanth-mahadev-temple/';
export const MINISTRY_TOURISM_URL = 'https://tourism.gov.in';
export const COMMONS_IMAGE_URL =
  'https://commons.wikimedia.org/wiki/File:NeelKanth_Mahadev_Temple.JPG';

export const TOURIST_TYPE = 'HinduTemple';
export const RATING_VALUE = 4.7;
export const REVIEW_COUNT = 43120;
export const OPENING_HOURS_HI =
  'प्रतिदिन प्रातः 5:00 से सायं 6:00 तक (यात्रा से पहले सत्यापित करें)';
export const DISTANCE_FROM_RISHIKESH_KM = 32;

export const HERO_IMAGE = '/images/hero.jpg';
export const HERO_IMAGE_ALT = 'नीलकंठ महादेव मंदिर के शिखर और प्रवेश का ऐतिहासिक चित्र, 23 मार्च 2010';

export interface Source {
  name: string;
  url: string;
  note: string;
}

export const SOURCES: Source[] = [
  {
    name: 'Uttarakhand Tourism Development Board — आधिकारिक राज्य पर्यटन पोर्टल',
    url: GOVT_TOURISM_URL,
    note: 'राज्य-स्तरीय पर्यटन मार्ग, ठहराव और सर्किट संबंधी सार्वजनिक सामग्री।'
  },
  {
    name: 'पौड़ी गढ़वाल जिला प्रशासन — Pauri Garhwal District Administration',
    url: DISTRICT_ADMIN_URL,
    note: 'पुराना जिला विवरण (अंतिम अद्यतन 6 अप्रैल 2018): कथा और मार्ग-दूरी का संदर्भ; आज का खुला मार्ग या सेवा उपलब्धता इससे प्रमाणित नहीं होती।'
  },
  {
    name: 'Ministry of Tourism, Government of India — पर्यटन मंत्रालय, भारत सरकार',
    url: MINISTRY_TOURISM_URL,
    note: 'राष्ट्रीय स्तर की नीति, तीर्थ/पर्यटन सूचना और आधिकारिक दिशानिर्देश।'
  },
  {
    name: 'Google Maps — Shree Neelkanth Mahadev Temple लिस्टिंग',
    url: MAPS_SHARE_URL,
    note: '20 अक्टूबर 2026 को जाँची गई तृतीय-पक्ष लिस्टिंग: पता, पिन, 4.7/5 (43,120 समीक्षाएँ) और प्रतिदिन 05:00–18:00। यात्रा/पर्व का समय फिर जाँचें।'
  },
  {
    name: 'Wikimedia Commons — NeelKanth Mahadev Temple.JPG (public domain)',
    url: COMMONS_IMAGE_URL,
    note: 'मुख्य चित्र का स्रोत; छवि अधिकार मूल फोटोग्राफर/लाइसेंसधारक के पास।'
  }
];

/** पूर्ण URL बनाएँ (canonical / OG / JSON-LD @id हेतु) */
export function absUrl(path = '/'): string {
  return new URL(path, SITE_ORIGIN).toString();
}

/** उप-पृष्ठों के शीर्षक में साइट नाम जोड़ें */
export function withSiteName(suffix: string): string {
  return `${suffix} | ${SITE_NAME}`;
}
