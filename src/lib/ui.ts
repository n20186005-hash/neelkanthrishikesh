/**
 * द्विभाषी UI शब्दकोश (हिन्दी + अंग्रेज़ी)।
 * नेविगेशन, फ़ुटर, लेबल और भाषा-स्विच जैसे सभी इंटरफ़ेस पाठ यहाँ रखें।
 * किसी भी .astro फ़ाइल में भाषा-विशिष्ट UI स्ट्रिंग हार्डकोड न करें।
 */

export type Locale = 'hi' | 'en';

export const LOCALES: Locale[] = ['hi', 'en'];

export interface NavItem {
  label: string;
  href: string;
}

export interface UiDict {
  htmlLang: string;
  ogLocale: string;
  dir: 'ltr' | 'rtl';
  siteName: string;
  skip: string;
  nav: NavItem[];
  cta: string;
  ctaHref: string;
  footerTagline: string;
  footerNote: string;
  footerLegal: NavItem[];
  footerDisclaimer: string;
  languageName: string;
}

export const UI: Record<Locale, UiDict> = {
  hi: {
    htmlLang: 'hi-IN',
    ogLocale: 'hi_IN',
    dir: 'ltr',
    siteName: 'नीलकंठ महादेव यात्री मार्गदर्शिका',
    skip: 'मुख्य सामग्री पर जाएँ',
    nav: [
      { label: 'परिचय', href: '/#परिचय' },
      { label: 'इतिहास', href: '/#इतिहास' },
      { label: 'यात्रा', href: '/#यात्रा' },
      { label: 'सुविधाएँ', href: '/#सुविधाएँ' },
      { label: 'मानचित्र', href: '/#मानचित्र' },
      { label: 'मौसम', href: '/#मौसम' },
      { label: 'सवाल', href: '/#सवाल' },
      { label: 'स्रोत', href: '/#स्रोत' }
    ],
    cta: 'यात्रा योजना',
    ctaHref: '/#यात्रा',
    footerTagline:
      'यह वेबसाइट एक स्वतंत्र, गैर-लाभकारी पर्यटक सूचना मार्गदर्शिका परियोजना है और किसी सरकारी संस्था या आधिकारिक संगठन से संबद्ध नहीं है।',
    footerNote:
      'मंदिर के परिचय और पुरानी मार्ग-दूरी का जिला प्रशासन से मिलान किया गया है। दैनिक समय और सड़क स्थिति स्थानीय सूचना से फिर जाँचें।',
    footerLegal: [
      { label: 'गोपनीयता नीति', href: '/privacy/' },
      { label: 'सेवा की शर्तें', href: '/terms/' },
      { label: 'कुकी सेटिंग', href: '/cookies/' }
    ],
    footerDisclaimer:
      'महत्वपूर्ण यात्रा निर्णय लेने से पहले संबंधित आधिकारिक स्रोत से ताज़ा जानकारी सत्यापित करें।',
    languageName: 'English'
  },
  en: {
    htmlLang: 'en',
    ogLocale: 'en_US',
    dir: 'ltr',
    siteName: 'Neelkanth Mahadev Temple Visitor Guide',
    skip: 'Skip to main content',
    nav: [
      { label: 'Intro', href: '/en/#introduction' },
      { label: 'History', href: '/en/#history' },
      { label: 'Getting there', href: '/en/#getting-there' },
      { label: 'Facilities', href: '/en/#facilities' },
      { label: 'Map', href: '/en/#map' },
      { label: 'Weather', href: '/en/#weather' },
      { label: 'FAQ', href: '/en/#faq' },
      { label: 'Sources', href: '/en/#sources' }
    ],
    cta: 'Plan your visit',
    ctaHref: '/en/#getting-there',
    footerTagline:
      'This website is an independent, non-profit tourist information guide and is not affiliated with any government body or official organisation.',
    footerNote:
      'The temple introduction and older route distances were cross-checked with the district administration. Daily timings and road conditions should be re-verified locally before travel.',
    footerLegal: [
      { label: 'Privacy Policy', href: '/en/privacy/' },
      { label: 'Terms of Service', href: '/en/terms/' },
      { label: 'Cookie Settings', href: '/en/cookies/' }
    ],
    footerDisclaimer:
      'Verify fresh information from the relevant official source before making any important travel decision.',
    languageName: 'हिन्दी'
  }
};

/** दिए गए पथ व उसकी भाषा से दूसरी भाषा का पथ बनाएँ (भाषा-स्विच हेतु) */
export function counterpartPath(path: string, locale: Locale): string {
  const norm = path === '' ? '/' : path;
  if (locale === 'hi') {
    return norm === '/' ? '/en/' : `/en${norm}`;
  }
  // en -> hi
  if (norm === '/en/' || norm === '/en') return '/';
  if (norm.startsWith('/en/')) return norm.slice(3) || '/';
  return '/';
}

/** ह्रेफ़लैंग वैकल्पिक — वर्तमान पथ से hi/en/x-default तीनों URL बनाएँ */
export function hreflangAlternates(path: string): { lang: string; href: string }[] {
  const norm = path === '' ? '/' : path;
  const hi = norm === '/' ? '/' : norm;
  const en = norm === '/' ? '/en/' : `/en${norm}`;
  return [
    { lang: 'hi-IN', href: hi },
    { lang: 'en', href: en },
    { lang: 'x-default', href: hi }
  ];
}
