# स्रोत और तथ्य-जांच नोट

यह परियोजना स्वतंत्र गैर-लाभकारी पर्यटक सूचना हेतु तैयार की गई है। प्रमुख तथ्य निम्न सार्वजनिक स्रोतों से मिलान किए गए:

- Pauri Garhwal District Administration — Neelkanth Mahadev Temple: दूरी, धार्मिक कथा, तीन घाटियाँ, पैदल मार्ग और विश्राम गृह संबंधी विवरण।
- Pauri Garhwal District Administration — How to Reach: जिला सड़क/बस/टैक्सी, निकटवर्ती रेलहेड और Jolly Grant Airport संदर्भ।
- Uttarakhand Tourism Development Board — Pauri/Khirsu itinerary और राज्य पर्यटन सामग्री: क्षेत्रीय सड़क, रेल और हवाई पहुँच का संदर्भ।
- Ministry of Tourism, Government of India (tourism.gov.in) — राष्ट्रीय पर्यटन/तीर्थ सूचना के आधिकारिक दिशानिर्देश।
- Google Maps listing — स्थान, सामान्य समय और सार्वजनिक रेटिंग का स्नैपशॉट; ये बदल सकते हैं।
- Wikimedia Commons — `NeelKanth Mahadev Temple.JPG`, Rahuldewangan, public domain; वास्तविक Neelkanth Mahadev Temple near Rishikesh photo.

रेटिंग, समय, सड़क स्थिति, शुल्क और सेवाएँ समय के साथ बदल सकती हैं; साइट पर इन्हें सत्यापन-योग्य/परिवर्तनशील सूचना के रूप में लिखा गया है।

## नवीनतम स्नैपशॉट (Google Maps लिस्टिंग, सितंबर 2026)

| फ़ील्ड | मान |
| --- | --- |
| नाम | Shree Neelkanth Mahadev Temple / श्री नीलकण्ठ महादेव मन्दिर |
| श्रेणी | हिन्दू मंदिर |
| रेटिंग | 4.7 (42,893 समीक्षाएँ) |
| पता | 38JR+C7F, Kotdwar - Pauri Rd, Kotdwar, Uttarakhand 249304, India |
| Maps शेयर लिंक | https://maps.app.goo.gl/CJ2iWSAjTeDeUkWH9 |

ये मान `src/data/site.ts` में एक ही स्थान पर रखे गए हैं — JSON-LD, TDK/OG, मानचित्र ब्लॉक और स्रोत अनुभाग उसी फ़ाइल से पढ़ते हैं।

## चित्र

- `public/images/hero.jpg` — उपर्युक्त Wikimedia Commons सार्वजनिक डोमेन फोटो की स्थानीय प्रति (मुखपृष्ठ + JSON-LD `image`)।
- `public/images/og-cover.jpg` — OG/Twitter कार्ड हेतु 1200×630 आवरण चित्र (`scripts/gen-assets.py` से निर्मित)।

## SEO संरचना

- `TouristAttraction` + `HinduTemple` JSON-LD: `@id`, `image`, `alternateName`, `address`, `geo`, `hasMap`, `sameAs`, `isAccessibleForFree`, `aggregateRating`।
- `FAQPage` JSON-LD: 8 प्रश्न, पृष्ठ के FAQ अनुभाग से मेल खाते हैं।
- `BreadcrumbList` + `WebSite` JSON-LD, canonical, `og:image`/`og:image:alt`, hreflang (`hi-IN`, `x-default`)।
