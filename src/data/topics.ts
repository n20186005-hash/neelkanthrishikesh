/**
 * 40-पृष्ठ विस्तार के लिए आँकड़ा-चालित विषय रजिस्ट्री।
 * प्रत्येक विषय के पास hi (हिन्दी) व en (अंग्रेज़ी) दोनों भाषाओं में सामग्री है।
 * नई पृष्ठ जोड़ने के लिए केवल इस सूची में प्रविष्टि डालें — रूटिंग व TopicPage स्वतः उत्पन्न करते हैं।
 *
 * E-E-A-T नीति: कोई काल्पनिक मूल्य/समय/सेवा न लिखें; असत्यापित तथ्य "स्थानीय रूप से जाँचें" के साथ चिह्नित करें।
 */

import { absUrl } from './site';
import type { Locale } from '../lib/ui';

export type GroupKey =
  | 'temple'
  | 'transport'
  | 'decision'
  | 'food'
  | 'nearby'
  | 'itinerary';

export interface TopicSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  callout?: string;
}

export interface TopicFaq {
  q: string;
  a: string;
}

export interface TopicContent {
  kicker: string;
  h1: string;
  lead: string;
  facts?: [string, string][];
  sections: TopicSection[];
  faqs: TopicFaq[];
  updated: string;
}

export interface Topic {
  slug: string;
  group: GroupKey;
  hi: TopicContent;
  en: TopicContent;
  related: string[];
}

export const GROUP_LABELS: Record<Locale, Record<GroupKey, string>> = {
  hi: {
    temple: 'मंदिर व संस्कृति',
    transport: 'यात्रा व मार्ग',
    decision: 'यात्री निर्णय',
    food: 'शाकाहारी भोजन',
    nearby: 'आस-पास के स्थल',
    itinerary: 'यात्रा-योजना'
  },
  en: {
    temple: 'Temple & culture',
    transport: 'Travel & routes',
    decision: 'Visitor decisions',
    food: 'Vegetarian food',
    nearby: 'Nearby places',
    itinerary: 'Itineraries'
  }
};

const UPDATED = '30 अक्टूबर 2026';
const UPDATED_EN = '30 October 2026';

export const TOPICS: Topic[] = [
  // 01 — temple-guide
  {
    slug: 'temple-guide',
    group: 'temple',
    related: ['darshan-timings', 'history', 'facilities-and-etiquette', 'rishikesh-to-neelkanth'],
    hi: {
      kicker: 'मंदिर परिचय',
      h1: 'नीलकंठ महादेव मंदिर: पूरी दर्शन विज्ञप्ति',
      lead: 'ऋषिकेश के निकट स्थित यह शिव-तीर्थ कैसे पहुँचें, कितना समय रखें और दर्शन की तैयारी क्या हो — एक साथ जानें।',
      facts: [
        ['स्थान', 'ऋषिकेश के निकट, पहाड़ी तीर्थ'],
        ['दर्शन समय', 'सोम–रवि 05:00–18:00*'],
        ['प्रवेश', 'सामान्य प्रवेश निःशुल्क* (स्थानीय जाँचें)'],
        ['गूगल रेटिंग', '4.7/5 · 43,178 समीक्षाएँ*']
      ],
      sections: [
        {
          heading: 'मंदिर कहाँ है?',
          paragraphs: [
            'पौड़ी गढ़वाल जिला प्रशासन इसे ऋषिकेश के निकट नीलकंठ तीर्थ के रूप में बताता है। Google Maps का प्रदर्शित पता "38JR+C7F, Kotdwar – Pauri Rd" दिखाता है; यात्रा के लिए सही स्थल-पिन (30.0811°N, 78.3407°E) मिलाएँ, न कि केवल पता-पाठ।',
            'यहाँ दूरी, सही पिन और दर्शन की तैयरी का एक साथ संग्रह है। हम मंदिर प्रबंधन या कोई बुकिंग सेवा नहीं हैं — यह एक स्वतंत्र यात्री मार्गदर्शिका है।'
          ]
        },
        {
          heading: 'कितना समय रखें?',
          paragraphs: [
            'दर्शन व परिसर घूमने के लिए 1–3 घंटे एक व्यावहारिक अनुमान है (कतार का वादा नहीं)। सड़क और पर्व-भीड़ के लिए अतिरिक्त समय जोड़ें और वापसी का साधन पहले तय करें।'
          ]
        },
        {
          heading: 'यात्रा का सर्वोत्तम क्रम',
          bullets: [
            'सुबह जल्दी निकलें ताकि धूप, भीड़ व वापसी की गर्मी से बचें।',
            'पहले दर्शन, फिर परिसर व जलपान, अंत में वापसी की योजना बनाएँ।',
            'मौसम व सड़क की स्थिति यात्रा से पहले स्थानीय सूचना से जाँचें।'
          ],
          callout: '*दूरी व समय: पुराना जिला विवरण व Google Maps (20 अक्टूबर 2026)। खुले मार्ग, प्रवेश व सेवा की पुष्टि यात्रा से पहले करें।'
        }
      ],
      faqs: [
        {
          q: 'नीलकंठ महादेव मंदिर ऋषिकेश से कितनी दूर है?',
          a: 'मार्ग-दूरी के संदर्भ भिन्न हैं: बैराज होकर लगभग 32 किमी, राम झूला होकर लगभग 22 किमी। विस्तार "ऋषिकेश से नीलकंठ" पृष्ठ पर देखें।'
        },
        {
          q: 'क्या प्रवेश निःशुल्क है?',
          a: 'सामान्य प्रवेश का वर्तमान आधिकारिक शुल्क स्रोत नहीं मिला; मंदिर की सूचना जाँचें। दान, प्रसाद व निजी सेवाएँ अलग हो सकती हैं।'
        },
        {
          q: 'क्या वरिष्ठ नागरिक या बच्चे जा सकते हैं?',
          a: 'हाँ, परंतु सीढ़ियाँ, ढलान व पहुँच की वर्तमान पुष्टि नहीं है। "परिवार व वरिष्ठ" पृष्ठ व "सुगम्यता" पृष्ठ देखें।'
        },
        {
          q: 'सबसे अच्छा समय कौन सा है?',
          a: 'अक्टूबर–मार्च शांत व सुखद है; श्रावण व महाशिवरात्रि में भीड़ रहती है। विस्तार "सर्वोत्तम समय" पृष्ठ देखें।'
        }
      ],
      updated: UPDATED
    },
    en: {
      kicker: 'Temple overview',
      h1: 'Neelkanth Mahadev Temple: the complete visitor brief',
      lead: 'A Shiva pilgrimage near Rishikesh — how to reach it, how long to plan, and how to prepare for darshan, all in one place.',
      facts: [
        ['Location', 'Hill shrine near Rishikesh'],
        ['Darshan hours', 'Mon–Sun 05:00–18:00*'],
        ['Entry', 'General entry free* (verify locally)'],
        ['Google rating', '4.7/5 · 43,178 reviews*']
      ],
      sections: [
        {
          heading: 'Where is the temple?',
          paragraphs: [
            'The Pauri Garhwal district administration lists it as the Nilkanth tirtha near Rishikesh. Google Maps shows the displayed address "38JR+C7F, Kotdwar – Pauri Rd"; for navigation use the correct pin (30.0811°N, 78.3407°E), not just the address text.',
            'This page collects distance, the right pin, and darshan preparation together. We are not the temple management or a booking service — this is an independent visitor guide.'
          ]
        },
        {
          heading: 'How much time to keep?',
          paragraphs: [
            'Plan 1–3 hours for darshan and the surroundings (no queue guarantee). Add extra time for road and festival crowds, and arrange your return transport beforehand.'
          ]
        },
        {
          heading: 'Best order of visit',
          bullets: [
            'Start early to avoid heat, crowds and the hot return journey.',
            'Darshan first, then the complex and refreshments, then plan the return.',
            'Check weather and road conditions locally before travelling.'
          ],
          callout: '*Distance and timings: older district note and Google Maps (20 Oct 2026). Verify open route, entry and services before travel.'
        }
      ],
      faqs: [
        {
          q: 'How far is Neelkanth Mahadev Temple from Rishikesh?',
          a: 'Route distances vary: about 32 km via the Barrage route, about 22 km via Ram Jhula. See the "Rishikesh to Neelkanth" page for detail.'
        },
        {
          q: 'Is entry free?',
          a: 'No current official fee source for general entry was found; check the temple notice. Donations, prasad and private services may be separate.'
        },
        {
          q: 'Can seniors and children go?',
          a: 'Yes, but stair, slope and access details are not confirmed. See the "Family & seniors" and "Accessibility" pages.'
        },
        {
          q: 'When is the best time?',
          a: 'October–March is calm and pleasant; Shravan and Maha Shivratri are crowded. See the "Best time to visit" page.'
        }
      ],
      updated: UPDATED_EN
    }
  },

  // 02 — darshan-timings
  {
    slug: 'darshan-timings',
    group: 'temple',
    related: ['temple-guide', 'facilities-and-etiquette', 'best-time-to-visit', 'crowds-and-queue-tips'],
    hi: {
      kicker: 'दर्शन व्यवस्था',
      h1: 'दर्शन का समय व पूजा-अनुष्ठान',
      lead: 'दर्शन खुलने का समय, आरती विंडो और व्यावहारिक सुझाव — स्थानीय जाँच के साथ।',
      facts: [
        ['सूचीबद्ध समय', 'सोम–रवि 05:00–18:00*'],
        ['आरती/पर्व', 'समय स्थानीय व्यवस्था से जाँचें'],
        ['प्रवेश', 'सामान्य दर्शन निःशुल्क*']
      ],
      sections: [
        {
          heading: 'वर्तमान दर्शन समय',
          paragraphs: [
            '20 अक्टूबर 2026 को Google Maps लिस्टिंग में सोमवार से रविवार 05:00–18:00 दिखा। यह एक तृतीय-पक्ष स्नैपशॉट है; आरती, पर्व और वास्तविक प्रवेश का समय स्थानीय व्यवस्था से फिर जाँचें।'
          ],
          callout: 'मंदिर प्रबंधन ने इस मार्गदर्शिका को कोई आधिकारिक समय नहीं दिया है। यात्रा के ठीक पहले मंदिर की बोर्ड/फ़ोन सूचना देखें।'
        },
        {
          heading: 'भीड़ व कतार',
          paragraphs: [
            'सावन (श्रावण) व महाशिवरात्रि में कतार लंबी हो सकती है। सुबह जल्दी या दोपहर के बाद जाने से इंतज़ार कम हो सकता है।',
            'त्योहारों में विशेष पूजा व अतिरिक्त शटर हो सकते हैं; समय स्थानीय रूप से पुष्ट करें।'
          ]
        },
        {
          heading: 'दर्शन की तैयारी',
          bullets: [
            'मोबाइल व मूल्यवान वस्तु सीमित रखें; कतार में सुरक्षा व्यवस्था का पालन करें।',
            'प्रसाद/चढ़ावा अपने साथ या परिसर में मिल सकता है — मंदिर की सूचना जाँचें।',
            'बच्चों व वरिष्ठों के लिए छाया व पानी की व्यवस्था रखें।'
          ]
        }
      ],
      faqs: [
        {
          q: 'मंदिर के दर्शन का समय क्या है?',
          a: '20 अक्टूबर 2026 को Google Maps में सोम–रवि 05:00–18:00 दिखा। यह स्नैपशॉट है; आरती व पर्व का समय स्थानीय रूप से जाँचें।'
        },
        {
          q: 'क्या सुबह की आरती होती है?',
          a: 'आरति वेळ व पर्व-विशेष व्यवस्था मंदिर प्रबंधन से भिन्न हो सकती है; यात्रा से पहले मंदिर की सूचना देखें।'
        },
        {
          q: 'क्या ऑनलाइन बुकिंग है?',
          a: 'इस मार्गदर्शिका को कोई आधिकारिक ऑनलाइन बुकिंग लिंक नहीं मिला। केवल मंदिर की आधिकारिक सूचना पर भरोसा करें।'
        }
      ],
      updated: UPDATED
    },
    en: {
      kicker: 'Darshan schedule',
      h1: 'Darshan timings & puja arrangements',
      lead: 'When darshan opens, the aarti window and practical tips — with a local-verification note.',
      facts: [
        ['Listed hours', 'Mon–Sun 05:00–18:00*'],
        ['Aarti/festivals', 'Check locally'],
        ['Entry', 'General darshan free*']
      ],
      sections: [
        {
          heading: 'Current darshan hours',
          paragraphs: [
            'On 20 Oct 2026 the Google Maps listing showed Monday–Sunday 05:00–18:00. This is a third-party snapshot; re-check aarti, festival and actual entry times with the local management.'
          ],
          callout: 'The temple management has not given this guide any official timing. Check the temple board / phone notice just before travel.'
        },
        {
          heading: 'Crowds and queues',
          paragraphs: [
            'During Shravan and Maha Shivratri the queue can be long. Going early morning or after midday may reduce waiting.',
            'Festivals may have special pujas and extra shutters; confirm locally.'
          ]
        },
        {
          heading: 'Preparing for darshan',
          bullets: [
            'Keep mobiles and valuables minimal; follow security arrangements in the queue.',
            'Prasad/offerings may be available with you or in the complex — check the temple notice.',
            'Arrange shade and water for children and seniors.'
          ]
        }
      ],
      faqs: [
        {
          q: 'What are the darshan timings?',
          a: 'On 20 Oct 2026 Google Maps showed Mon–Sun 05:00–18:00. This is a snapshot; verify aarti and festival times locally.'
        },
        {
          q: 'Is there a morning aarti?',
          a: 'Aarti timing and festival arrangements may differ by management; check the temple notice before travel.'
        },
        {
          q: 'Is there online booking?',
          a: 'This guide found no official online booking link. Rely only on the temple’s official notice.'
        }
      ],
      updated: UPDATED_EN
    }
  },

  // 03 — history
  {
    slug: 'history',
    group: 'temple',
    related: ['samudra-manthan', 'architecture', 'darshan-timings', 'temple-guide'],
    hi: {
      kicker: 'इतिहास व पृष्ठभूमि',
      h1: 'नीलकंठ महादेव मंदिर का इतिहास',
      lead: 'मंदिर की ज्ञात पृष्ठभूमि, पौराणिक संदर्भ और ऐतिहासिक स्रोत — स्पष्ट अलगाव के साथ।',
      sections: [
        {
          heading: 'ज्ञात ऐतिहासिक संदर्भ',
          paragraphs: [
            'पौड़ी गढ़वाल जिला प्रशासन का पृष्ठ (अंतिम अद्यतन 6 अप्रैल 2018) मंदिर व मार्ग-दूरी का संदर्भ देता है। यह प्रशासनिक स्रोत है, न कि मंदिर का स्वयं का प्राचीन इतिहास।',
            'मंदिर की स्थापना-तिथि व निर्माण-क्रम के बारे में विभिन्न कथाएँ प्रचलित हैं; इन्हें "इतिहास" न मानकर "धार्मिक परंपरा" में रखें।'
          ],
          callout: 'इस पृष्ठ पर "इतिहास" केवल प्रामाणिक/प्रशासनिक स्रोतों से है; धार्मिक कथाएँ "Samudra Manthan" पृष्ठ पर अलग रखी गई हैं।'
        },
        {
          heading: 'स्थानीय महत्व',
          paragraphs: [
            'यह स्थान ऋषिकेश की तीर्थ-यात्रा में शामिल किया जाता है और क्षेत्रीय शिव-भक्ति का महत्वपूर्ण केंद्र है। पर्यटन पोर्टल व जिला प्रशासन दोनों इसे एक प्रमुख तीर्थ के रूप में उल्लेख करते हैं।'
          ]
        }
      ],
      faqs: [
        {
          q: 'मंदिर कितना पुराना है?',
          a: 'निर्माण-तिथि के बारे में विश्वसनीय ऐतिहासिक लेख सीमित हैं; प्रशासनिक पृष्ठ 2018 का है। सटीक प्राचीन तिथि के लिए आधिकारिक स्रोत देखें।'
        },
        {
          q: 'क्या यह रामायण/महाभारत से जुड़ा है?',
          a: 'धार्मिक परंपराएँ अलग-अलग हैं; कथाओं को ऐतिहासिक तथ्य मत मानें। संबंधित कथा "Samudra Manthan" पृष्ठ पर है।'
        }
      ],
      updated: UPDATED
    },
    en: {
      kicker: 'History & background',
      h1: 'History of Neelkanth Mahadev Temple',
      lead: 'The known background of the temple, mythological context and historical sources — kept clearly separate.',
      sections: [
        {
          heading: 'Known historical references',
          paragraphs: [
            'The Pauri Garhwal district administration page (last updated 6 April 2018) provides a reference for the temple and route distances. This is an administrative source, not the temple’s own ancient history.',
            'Various stories circulate about the founding and construction; treat them as "tradition", not verified "history".'
          ],
          callout: 'On this page "history" comes only from authentic/administrative sources; religious stories are kept separate on the "Samudra Manthan" page.'
        },
        {
          heading: 'Local significance',
          paragraphs: [
            'The site is included in the Rishikesh pilgrimage circuit and is an important centre of regional Shiva devotion. Both the tourism portal and the district administration mention it as a major tirtha.'
          ]
        }
      ],
      faqs: [
        {
          q: 'How old is the temple?',
          a: 'Reliable historical records on the construction date are limited; the administrative page is from 2018. Check official sources for a precise ancient date.'
        },
        {
          q: 'Is it linked to the Ramayana/Mahabharata?',
          a: 'Religious traditions vary; do not treat stories as historical fact. The related legend is on the "Samudra Manthan" page.'
        }
      ],
      updated: UPDATED_EN
    }
  },

  // 08 — facilities-and-etiquette
  {
    slug: 'facilities-and-etiquette',
    group: 'temple',
    related: ['darshan-timings', 'temple-guide', 'accessibility-guide', 'vegetarian-food-near-temple'],
    hi: {
      kicker: 'सुविधाएँ व शिष्टाचार',
      h1: 'सुविधाएँ, वस्त्र व दर्शन शिष्टाचार',
      lead: 'क्या ले जाएँ, कैसे तैयारी करें और परिसर में क्या ध्यान रखें — स्थानीय पुष्टि के साथ।',
      sections: [
        {
          heading: 'वस्त्र व तैयारी',
          paragraphs: [
            'मंदिर परिसर में विनम्र वस्त्र (ढका हुआ शरीर) अपेक्षित है। जूते बाहर उतारें; जूता-स्थल की व्यवस्था परिसर में पूछें।',
            'प्रसाद, चढ़ावा व दान की व्यवस्था मंदिर की सूचना से जाँचें।'
          ]
        },
        {
          heading: 'सुविधाओं की स्थिति',
          bullets: [
            'पार्किंग/ड्रॉप-पॉइंट: आज की क्षमता, शुल्क व वाहन-प्रतिबंध स्थानीय व्यवस्था से पूछें।',
            'शौचालय व पेयजल: पहुँच व उपलब्धता मौके पर पूछें।',
            'सुगम्यता: सीढ़ियाँ, ढलान व सहायता की पुष्टि नहीं है — "सुगम्यता" पृष्ठ देखें।'
          ],
          callout: 'इन सुविधाओं की वर्तमान उपलब्धता, शुल्क व पहुँच की पुष्टि इस साइट ने नहीं की है। मौके की व्यवस्था पूछें और वैकल्पिक योजना रखें।'
        },
        {
          heading: 'फ़ोटो व व्यवहार',
          paragraphs: [
            'गर्भगृह/मुख्य प्रतिमा की फ़ोटो की अनुमति स्थानीय नियम से भिन्न हो सकती है — पहले पूछें।',
            'शांति बनाए रखें, कतार का सम्मान करें और अन्य तीर्थयात्रियों का ध्यान रखें।'
          ]
        }
      ],
      faqs: [
        {
          q: 'क्या जूते उतारने होते हैं?',
          a: 'हाँ, परिसर में जूते बाहर उतारने की परंपरा है; जूता-स्थल की व्यवस्था मौके पर पूछें।'
        },
        {
          q: 'क्या पार्किंग मिलेगी?',
          a: 'पार्किंग की वर्तमान उपलब्धता व शुल्क की पुष्टि नहीं हुई है; "स्व-ड्राइव व पार्किंग" पृष्ठ व मौके की व्यवस्था देखें।'
        },
        {
          q: 'क्या फ़ोटो लेना ठीक है?',
          a: 'गर्भगृह की फ़ोटो की अनुमति नियम से भिन्न हो सकती है; पहले पूछें।'
        }
      ],
      updated: UPDATED
    },
    en: {
      kicker: 'Facilities & etiquette',
      h1: 'Facilities, dress & darshan etiquette',
      lead: 'What to carry, how to prepare and what to observe at the complex — with local confirmation.',
      sections: [
        {
          heading: 'Dress and preparation',
          paragraphs: [
            'Modest clothing (covered body) is expected in the temple complex. Remove shoes outside; ask about the shoe area on site.',
            'Check the temple notice for prasad, offerings and donation arrangements.'
          ]
        },
        {
          heading: 'Facility status',
          bullets: [
            'Parking/drop-point: today’s capacity, fee and vehicle restrictions — ask locally.',
            'Toilets and drinking water: ask on site about access and availability.',
            'Accessibility: stairs, slope and assistance are not confirmed — see the "Accessibility" page.'
          ],
          callout: 'This site has not confirmed current availability, fee or access of these facilities. Ask the on-site arrangement and keep a backup plan.'
        },
        {
          heading: 'Photos and conduct',
          paragraphs: [
            'Permission for photos of the sanctum/main idol may vary by local rule — ask first.',
            'Keep quiet, respect the queue and be mindful of other pilgrims.'
          ]
        }
      ],
      faqs: [
        {
          q: 'Do we remove shoes?',
          a: 'Yes, shoes are removed outside the complex; ask about the shoe area on site.'
        },
        {
          q: 'Is parking available?',
          a: 'Current availability and fee of parking are not confirmed; see the "Self-drive & parking" page and the on-site arrangement.'
        },
        {
          q: 'Is it okay to take photos?',
          a: 'Sanctum photography permission may vary by rule; ask first.'
        }
      ],
      updated: UPDATED_EN
    }
  },

  // 09 — rishikesh-to-neelkanth
  {
    slug: 'rishikesh-to-neelkanth',
    group: 'transport',
    related: ['ram-jhula-to-neelkanth', 'taxi-shared-jeep', 'self-drive-and-parking', 'neelkanth-trek'],
    hi: {
      kicker: 'यात्रा मार्ग',
      h1: 'ऋषिकेश से नीलकंठ की दूरी व मार्ग',
      lead: 'दो मुख्य सड़क मार्गों की तुलना, अनुमानित समय और कौन-सा मार्ग चुनें — स्थानीय जाँच के साथ।',
      facts: [
        ['बैराज मार्ग', 'लगभग 32 किमी*'],
        ['राम झूला मार्ग', 'लगभग 22 किमी*'],
        ['पैदल मार्ग', 'लगभग 12 किमी (वन)*']
      ],
      sections: [
        {
          heading: 'दो मुख्य सड़क मार्ग',
          paragraphs: [
            'जिला प्रशासन के पुराने विवरण में बैराज होकर 32 किमी और राम झूला होकर 22 किमी बताए गए हैं। ये विभिन्न आरंभ-बिंदु या मार्ग की दूरी हैं; इन्हें एक निश्चित संख्या न मानें।',
            'वास्तविक वाहन-समय, किराया व सड़क खुली होने की स्थिति अलग से सत्यापित करें — इन्हें स्थायी संख्या के रूप में न दिखाएँ।'
          ]
        },
        {
          heading: 'कौन-सा मार्ग चुनें?',
          bullets: [
            'राम झूला मार्ग आमतौर पर छोटा (≈22 किमी) व ऋषिकेश शहर से जुड़ा है।',
            'बैराज मार्ग लंबा (≈32 किमी) हो सकता है पर सड़क व्यवस्था भिन्न हो सकती है।',
            'पैदल मार्ग (≈12 किमी) पारंपरिक तीर्थ-पैदल मार्ग है; केवल अनुभवी व तैयार यात्रियों के लिए।'
          ],
          callout: '*दूरियाँ: पुराना जिला विवरण। वर्तमान वाहन मार्ग, समय व सेवा की पुष्टि स्थानीय सूचना से करें।'
        },
        {
          heading: 'बिना निजी वाहन के क्या होगा?',
          paragraphs: [
            'टैक्सी, साझा जीप व बस जैसे विकल्प उपलब्ध हो सकते हैं — "टैक्सी व साझा जीप" पृष्ठ देखें। वापसी का साधन पहले तय करें क्योंकि शाम को वाहन कम हो सकते हैं।'
          ]
        }
      ],
      faqs: [
        {
          q: 'ऋषिकेश से नीलकंठ की दूरी कितनी है?',
          a: 'बैराज होकर लगभग 32 किमी, राम झूला होकर लगभग 22 किमी (पुराना जिला विवरण)। वर्तमान सड़क-स्थिति स्थानीय रूप से जाँचें।'
        },
        {
          q: 'ऋषिकेश से नीलकंठ जाने में कितना समय लगता है?',
          a: 'वाहन-समय मार्ग, यातायात व मौसम पर निर्भर करता है; सटीक समय स्थानीय सूचना से जाँचें।'
        },
        {
          q: 'क्या बिना निजी वाहन के जाया जा सकता है?',
          a: 'हाँ — टैक्सी, साझा जीप या बस के विकल्प हो सकते हैं। वापसी की व्यवस्था पहले तय करें।'
        },
        {
          q: 'सबसे छोटा मार्ग कौन सा है?',
          a: 'राम झूला मार्ग लगभग 22 किमी का बताया गया है, पर वास्तविक समय व सड़क-स्थिति भिन्न हो सकती है।'
        }
      ],
      updated: UPDATED
    },
    en: {
      kicker: 'Travel route',
      h1: 'Distance & routes from Rishikesh to Neelkanth',
      lead: 'Comparison of the two main road routes, estimated time and which to choose — with local verification.',
      facts: [
        ['Barrage route', 'about 32 km*'],
        ['Ram Jhula route', 'about 22 km*'],
        ['Walking route', 'about 12 km (forest)*']
      ],
      sections: [
        {
          heading: 'Two main road routes',
          paragraphs: [
            'The older district note mentions 32 km via the Barrage and 22 km via Ram Jhula. These are distances for different start points or routes; do not treat them as one fixed number.',
            'Actual vehicle time, fare and road-open status must be verified separately — do not present them as permanent figures.'
          ]
        },
        {
          heading: 'Which route to choose?',
          bullets: [
            'The Ram Jhula route is generally shorter (≈22 km) and connects from Rishikesh town.',
            'The Barrage route may be longer (≈32 km) but road arrangements differ.',
            'The walking route (≈12 km) is the traditional pilgrimage trail — only for experienced, prepared travellers.'
          ],
          callout: '*Distances: older district note. Confirm current vehicle route, time and service with local information.'
        },
        {
          heading: 'Without a private vehicle?',
          paragraphs: [
            'Options like taxi, shared jeep and bus may be available — see the "Taxi & shared jeep" page. Arrange return transport beforehand as vehicles may be fewer in the evening.'
          ]
        }
      ],
      faqs: [
        {
          q: 'How far is Neelkanth from Rishikesh?',
          a: 'About 32 km via the Barrage, about 22 km via Ram Jhula (older district note). Check current road status locally.'
        },
        {
          q: 'How long does the drive take?',
          a: 'Vehicle time depends on route, traffic and weather; verify exact time with local information.'
        },
        {
          q: 'Can I go without a private vehicle?',
          a: 'Yes — taxi, shared jeep or bus options may exist. Arrange the return beforehand.'
        },
        {
          q: 'Which is the shortest route?',
          a: 'The Ram Jhula route is cited as about 22 km, but actual time and road status may differ.'
        }
      ],
      updated: UPDATED_EN
    }
  },

  // 10 — ram-jhula-to-neelkanth
  {
    slug: 'ram-jhula-to-neelkanth',
    group: 'transport',
    related: ['rishikesh-to-neelkanth', 'swarg-ashram-to-neelkanth', 'taxi-shared-jeep', 'self-drive-and-parking'],
    hi: {
      kicker: 'मार्ग विवरण',
      h1: 'राम झूला से नीलकंठ तक',
      lead: 'राम झूला/स्वर्ग आश्रम क्षेत्र से प्रस्थान, मार्ग व नेविगेशन सुझाव।',
      sections: [
        {
          heading: 'राम झूला से प्रस्थान',
          paragraphs: [
            'राम झूला ऋषिकेश के दक्षिण तट का प्रमुख बिंदु है। यहाँ से नीलकंठ के लिए टैक्सी, साझा जीप या बस मिल सकती है। मार्ग आमतौर पर ≈22 किमी का बताया गया है (पुराना जिला विवरण)।',
            'वास्तविक किराया, समय व सेवा की उपलब्धता स्थानीय रूप से जाँचें; इन्हें स्थायी संख्या न बनाएँ।'
          ]
        },
        {
          heading: 'नेविगेशन सुझाव',
          bullets: [
            'Google Maps पिन (30.0811°N, 78.3407°E) का उपयोग करें, केवल पता-पाठ नहीं।',
            'पहाड़ी सड़क पर नेटवर्क कमज़ोर हो सकता है — ऑफ़लाइन मानचित्र/पिन पहले सेव करें।',
            'वापसी के वाहन पहले से तय करें; शाम को विकल्प कम हो सकते हैं।'
          ]
        }
      ],
      faqs: [
        {
          q: 'राम झूला से नीलकंठ कैसे जाएँ?',
          a: 'टैक्सी, साझा जीप या बस के विकल्प हो सकते हैं। सटीक समय व किराया स्थानीय रूप से जाँचें।'
        },
        {
          q: 'राम झूला से कितनी दूरी है?',
          a: 'पुराने जिला विवरण में राम झूला मार्ग ≈22 किमी बताया गया है; वर्तमान सड़क-स्थिति जाँचें।'
        }
      ],
      updated: UPDATED
    },
    en: {
      kicker: 'Route detail',
      h1: 'From Ram Jhula to Neelkanth',
      lead: 'Departure from the Ram Jhula/Swarga Ashram area, route and navigation tips.',
      sections: [
        {
          heading: 'Starting from Ram Jhula',
          paragraphs: [
            'Ram Jhula is a major point on Rishikesh’s south bank. From here, taxi, shared jeep or bus to Neelkanth may be available. The route is generally cited as about 22 km (older district note).',
            'Verify actual fare, time and service availability locally; do not present them as permanent figures.'
          ]
        },
        {
          heading: 'Navigation tips',
          bullets: [
            'Use the Google Maps pin (30.0811°N, 78.3407°E), not just the address text.',
            'Network may be weak on hill roads — save an offline map/pin first.',
            'Arrange return transport in advance; options may be fewer in the evening.'
          ]
        }
      ],
      faqs: [
        {
          q: 'How to go from Ram Jhula to Neelkanth?',
          a: 'Taxi, shared jeep or bus options may exist. Verify exact time and fare locally.'
        },
        {
          q: 'What is the distance from Ram Jhula?',
          a: 'The older district note cites the Ram Jhula route as about 22 km; check current road status.'
        }
      ],
      updated: UPDATED_EN
    }
  },

  // 16 — taxi-shared-jeep
  {
    slug: 'taxi-shared-jeep',
    group: 'transport',
    related: ['rishikesh-to-neelkanth', 'ram-jhula-to-neelkanth', 'self-drive-and-parking', 'itinerary-without-private-car'],
    hi: {
      kicker: 'यातायात विकल्प',
      h1: 'टैक्सी व साझा जीप',
      lead: 'निजी टैक्सी व साझा जीप के विकल्प, किराया व सवारी की जानकारी — स्थानीय जाँच के साथ।',
      sections: [
        {
          heading: 'विकल्प',
          paragraphs: [
            'ऋषिकेश (राम झूला/स्वर्ग आश्रम) से नीलकंठ के लिए निजी टैक्सी व साझा जीप उपलब्ध हो सकते हैं। बस की सेवा भी समय-समय पर चल सकती है।',
            'किराया, सीट-साझेदारी व चलने का समय स्थानीय ऑपरेटर से भिन्न होते हैं — यात्रा से पहले पूछें।'
          ],
          callout: 'इस मार्गदर्शिका ने कोई निश्चित किराया या ऑपरेटर सूची प्रमाणित नहीं की है। केवल स्थानीय/आधिकारिक सूचना पर भरोसा करें।'
        },
        {
          heading: 'सवारी के सुझाव',
          bullets: [
            'वापसी का वाहन पहले से तय करें; शाम को विकल्प कम हो सकते हैं।',
            'सामान सीमित रखें और ऑपरेटर से मिलने का बिंदु पहले तय करें।',
            'साझा जीप में सीट व समय की पुष्टि करें; अस्पष्ट बुकिंग से बचें।'
          ]
        }
      ],
      faqs: [
        {
          q: 'ऋषिकेश से नीलकंठ के लिए टैक्सी का किराया कितना है?',
          a: 'किराया स्थानीय ऑपरेटर से भिन्न होता है; इस साइट ने निश्चित किराया प्रमाणित नहीं किया। यात्रा से पहले पूछें।'
        },
        {
          q: 'क्या साझा जीप मिलती है?',
          a: 'हाँ, साझा जीप/बस के विकल्प हो सकते हैं, पर समय व उपलब्धता स्थानीय रूप से जाँचें।'
        }
      ],
      updated: UPDATED
    },
    en: {
      kicker: 'Transport options',
      h1: 'Taxi & shared jeep',
      lead: 'Private taxi and shared jeep options, fare and ride information — with local verification.',
      sections: [
        {
          heading: 'Options',
          paragraphs: [
            'From Rishikesh (Ram Jhula / Swarg Ashram) to Neelkanth, private taxis and shared jeeps may be available. A bus service may also run from time to time.',
            'Fare, seat-sharing and departure time vary by local operator — ask before travel.'
          ],
          callout: 'This guide has not certified any fixed fare or operator list. Rely only on local/official information.'
        },
        {
          heading: 'Ride tips',
          bullets: [
            'Arrange return transport in advance; options may be fewer in the evening.',
            'Keep luggage minimal and fix the meeting point with the operator beforehand.',
            'Confirm seat and time in a shared jeep; avoid vague bookings.'
          ]
        }
      ],
      faqs: [
        {
          q: 'What is the taxi fare from Rishikesh to Neelkanth?',
          a: 'Fare varies by local operator; this site has not certified a fixed fare. Ask before travel.'
        },
        {
          q: 'Are shared jeeps available?',
          a: 'Yes, shared jeep/bus options may exist, but verify timing and availability locally.'
        }
      ],
      updated: UPDATED_EN
    }
  },

  // 17 — self-drive-and-parking
  {
    slug: 'self-drive-and-parking',
    group: 'transport',
    related: ['rishikesh-to-neelkanth', 'taxi-shared-jeep', 'facilities-and-etiquette', 'monsoon-road-safety'],
    hi: {
      kicker: 'स्व-ड्राइव',
      h1: 'स्व-ड्राइव व पार्किंग',
      lead: 'खुद गाड़ी ले जाने वालों के लिए मार्ग, पार्किंग व पहाड़ी सड़क सावधानियाँ।',
      sections: [
        {
          heading: 'मार्ग व पार्किंग',
          paragraphs: [
            'स्व-ड्राइव करने वाले ऋषिकेश से निकल सकते हैं (राम झूला मार्ग ≈22 किमी, बैराज मार्ग ≈32 किमी — पुराना जिला विवरण)। पार्किंग की वर्तमान क्षमता, शुल्क व वाहन-प्रतिबंध स्थानीय व्यवस्था से पूछें।',
            'पार्किंग/ड्रॉप-पॉइंट की पुष्टि इस साइट ने नहीं की है; मौके की व्यवस्था पूछें।'
          ]
        },
        {
          heading: 'पहाड़ी सड़क सावधानियाँ',
          bullets: [
            'संकरी, मोड़दार व ढलानदार सड़कों पर धीमी गति व हॉर्न का उपयोग करें।',
            'वर्षा में फिसलन, भूस्खलन व धुंध की संभावना — "मानसून सड़क सुरक्षा" पृष्ठ देखें।',
            'ईंधन, नकदी व ऑफ़लाइन नेटवर्क यात्रा से पहले तैयार करें।'
          ]
        }
      ],
      faqs: [
        {
          q: 'क्या पार्किंग मिलेगी?',
          a: 'पार्किंग की वर्तमान उपलब्धता व शुल्क की पुष्टि नहीं हुई है; मौके की व्यवस्था पूछें।'
        },
        {
          q: 'क्या सड़क ठीक है?',
          a: 'पहाड़ी सड़क मौसम पर निर्भर करती है; वर्षा/कोहरे में सावधानी व "मानसून सड़क सुरक्षा" पृष्ठ देखें।'
        }
      ],
      updated: UPDATED
    },
    en: {
      kicker: 'Self-drive',
      h1: 'Self-drive & parking',
      lead: 'Route, parking and hill-road cautions for those driving themselves.',
      sections: [
        {
          heading: 'Route and parking',
          paragraphs: [
            'Self-drivers can start from Rishikesh (Ram Jhula route ≈22 km, Barrage route ≈32 km — older district note). Ask the local arrangement about current parking capacity, fee and vehicle restrictions.',
            'This site has not confirmed parking/drop-point; ask the on-site arrangement.'
          ]
        },
        {
          heading: 'Hill-road cautions',
          bullets: [
            'On narrow, winding and sloping roads, keep low speed and use the horn at bends.',
            'Risk of slipperiness, landslides and fog in rain — see the "Monsoon road safety" page.',
            'Prepare fuel, cash and offline network before travel.'
          ]
        }
      ],
      faqs: [
        {
          q: 'Is parking available?',
          a: 'Current availability and fee of parking are not confirmed; ask the on-site arrangement.'
        },
        {
          q: 'Is the road fine?',
          a: 'Hill roads depend on weather; take care in rain/fog and see the "Monsoon road safety" page.'
        }
      ],
      updated: UPDATED_EN
    }
  },

  // 18 — neelkanth-trek
  {
    slug: 'neelkanth-trek',
    group: 'transport',
    related: ['rishikesh-to-neelkanth', 'self-drive-and-parking', 'best-time-to-visit', 'monsoon-road-safety'],
    hi: {
      kicker: 'पैदल तीर्थ',
      h1: 'नीलकंठ पैदल मार्ग (ट्रेक)',
      lead: 'पारंपरिक वन-पैदल मार्ग की कठिनाई, जलपान व सुरक्षा — केवल तैयार यात्रियों के लिए।',
      facts: [
        ['पैदल दूरी', 'लगभग 12 किमी (वन)*'],
        ['कठिनाई', 'मध्यम–कठिन (पहाड़ी)'],
        ['सुझाव', 'अनुभवी व तैयार यात्री']
      ],
      sections: [
        {
          heading: 'मार्ग परिचय',
          paragraphs: [
            'जिला प्रशासन के पुराने विवरण में 12 किमी वन-पैदल मार्ग का उल्लेख है। इसे आज खुला या सुरक्षित होने का प्रमाण न मानें; स्थानीय अनुमति, मौसम व वापसी की व्यवस्था पहले जाँचें।'
          ],
          callout: '*12 किमी: पुराना जिला विवरण। वर्तमान मार्ग-खुली व सुरक्षा की पुष्टि स्थानीय रूप से करें; अकेले व अनुभवहीन यात्रा न करें।'
        },
        {
          heading: 'तैयारी व सुरक्षा',
          bullets: [
            'पर्याप्त पानी, खाना व प्रथम-उपचार सामग्री रखें।',
            'उचित जूते, टोपी व बारिश का उपकरण साथ रखें।',
            'सुबह जल्दी निकलें, शाम से पहले वापसी की योजना बनाएँ।',
            'मानसून/कोहरे में मार्ग टालें; वन्यजीव व स्लिप-खतरे से सावधान रहें।'
          ]
        }
      ],
      faqs: [
        {
          q: 'नीलकंठ तक पैदल जाना कितना कठिन है?',
          a: 'पुराने विवरण में ≈12 किमी वन-मार्ग है; कठिनाई पहाड़ी व मौसम पर निर्भर करती है। केवल तैयार यात्री जाएँ।'
        },
        {
          q: 'क्या पहली बार वाले जा सकते हैं?',
          a: 'अनुभवहीन व अकेले यात्रा की सिफ़ारिश नहीं है; स्थानीय अनुमति व मौसम पहले जाँचें।'
        }
      ],
      updated: UPDATED
    },
    en: {
      kicker: 'Walking pilgrimage',
      h1: 'Neelkanth trek route',
      lead: 'Difficulty, refreshments and safety of the traditional forest trail — for prepared travellers only.',
      facts: [
        ['Walking distance', 'about 12 km (forest)*'],
        ['Difficulty', 'Moderate–hard (hill)'],
        ['Advice', 'Experienced, prepared travellers']
      ],
      sections: [
        {
          heading: 'Route overview',
          paragraphs: [
            'The older district note mentions a 12 km forest walking route. Do not assume it is open or safe today; check local permission, weather and return arrangement first.'
          ],
          callout: '*12 km: older district note. Confirm current route-open and safety locally; do not trek alone or inexperienced.'
        },
        {
          heading: 'Preparation and safety',
          bullets: [
            'Carry enough water, food and a first-aid kit.',
            'Wear proper shoes, a hat and rain gear.',
            'Start early and plan to return before evening.',
            'Avoid the trail in monsoon/fog; beware wildlife and slip hazards.'
          ]
        }
      ],
      faqs: [
        {
          q: 'How hard is the walk to Neelkanth?',
          a: 'The older note cites ≈12 km forest route; difficulty depends on hills and weather. Only prepared travellers should go.'
        },
        {
          q: 'Can first-timers go?',
          a: 'Inexperienced or solo trekking is not advised; check local permission and weather first.'
        }
      ],
      updated: UPDATED_EN
    }
  },

  // 20 — best-time-to-visit
  {
    slug: 'best-time-to-visit',
    group: 'decision',
    related: ['crowds-and-queue-tips', 'monsoon-road-safety', 'darshan-timings', 'temple-guide'],
    hi: {
      kicker: 'यात्रा का समय',
      h1: 'नीलकंठ जाने का सर्वोत्तम समय',
      lead: 'मौसम, भीड़ व त्योहार के अनुसार सर्वोत्तम मौसम व समय का चयन।',
      sections: [
        {
          heading: 'मौसम अनुसार',
          paragraphs: [
            'अक्टूबर–मार्च शांत, सुखद व सुरक्षित यात्रा के लिए उपयुक्त है। अप्रैल–जून गर्मी बढ़ सकती है; जुलाई–सितंबर मानसून में सड़क व ट्रेक सावधानी चाहिए।'
          ]
        },
        {
          heading: 'भीड़ व त्योहार',
          bullets: [
            'श्रावण (सावन) व महाशिवरात्रि में विशेष भीड़ रहती है।',
            'सप्ताहांत व छुट्टियों में भी कतार लंबी हो सकती है।',
            'सुबह जल्दी या सप्ताह में जाने से इंतज़ार कम हो सकता है।'
          ]
        },
        {
          heading: 'दिन व समय',
          paragraphs: [
            'सुबह के घंटे (दर्शन-खुलने के आसपास) धूप व भीड़ से बचने के लिए अच्छे हैं। गर्मी के महीनों में दोपहर की चरम गर्मी से बचें।'
          ]
        }
      ],
      faqs: [
        {
          q: 'नीलकंठ जाने का सबसे अच्छा महीना कौन सा है?',
          a: 'अक्टूबर–मार्च शांत व सुखद माना जाता है। मानसून (जुलाई–सितंबर) में सड़क/ट्रेक सावधानी रखें।'
        },
        {
          q: 'क्या मानसून में जा सकते हैं?',
          a: 'जा सकते हैं, पर वर्षा में फिसलन, धुंध व सड़क-बंद होने का खतरा रहता है; "मानसून सड़क सुरक्षा" पृष्ठ देखें।'
        }
      ],
      updated: UPDATED
    },
    en: {
      kicker: 'When to go',
      h1: 'Best time to visit Neelkanth',
      lead: 'Choose the best season and time by weather, crowds and festivals.',
      sections: [
        {
          heading: 'By weather',
          paragraphs: [
            'October–March is suitable for calm, pleasant and safer travel. April–June can get hotter; July–September (monsoon) needs road and trek caution.'
          ]
        },
        {
          heading: 'Crowds and festivals',
          bullets: [
            'Shravan (Sawan) and Maha Shivratri see special crowds.',
            'Weekends and holidays may also have long queues.',
            'Going early morning or on a weekday may reduce waiting.'
          ]
        },
        {
          heading: 'Day and time',
          paragraphs: [
            'Early hours (around darshan opening) are good to avoid heat and crowds. In hot months avoid the midday peak.'
          ]
        }
      ],
      faqs: [
        {
          q: 'Which month is best to visit Neelkanth?',
          a: 'October–March is considered calm and pleasant. In monsoon (Jul–Sep) take road/trek caution.'
        },
        {
          q: 'Can we go in monsoon?',
          a: 'Yes, but rain brings slipperiness, fog and risk of road closure; see the "Monsoon road safety" page.'
        }
      ],
      updated: UPDATED_EN
    }
  },

  // 25 — vegetarian-food-near-temple
  {
    slug: 'vegetarian-food-near-temple',
    group: 'food',
    related: ['breakfast-before-darshan', 'lunch-after-darshan', 'neelkanth-road-food-stops', 'facilities-and-etiquette'],
    hi: {
      kicker: 'भोजन',
      h1: 'मंदिर के निकट शाकाहारी भोजन',
      lead: 'दर्शन के पहले/बाद खाने के विकल्प, स्थान व ध्यान — प्रामाणिकता के साथ।',
      sections: [
        {
          heading: 'मंदिर के निकट',
          paragraphs: [
            'मंदिर परिसर व उसके आस-पास छोटे शाकाहारी भोजन-स्थल, चाय/नाश्ता व प्रसाद-केंद्र हो सकते हैं। वास्तविक संचालन, समय व मेनू स्थानीय रूप से जाँचें — इन्हें स्थायी सूची न बनाएँ।',
            'यहाँ किसी विशेष दुकान/रेस्तराँ का नाम या मूल्य प्रमाणित नहीं किया गया है; केवल स्थानीय सूचना पर भरोसा करें।'
          ],
          callout: 'खाने की वास्तविक उपलब्धता, समय व मूल्य यात्रा के दिन भिन्न हो सकते हैं — मौके पर पूछें।'
        },
        {
          heading: 'सुझाव',
          bullets: [
            'दर्शन से पहले हल्का नाश्ता रखें ताकि यात्रा आरामदायक रहे।',
            'परिसर में शाकाहारी विकल्प को प्राथमिकता दें (तीर्थ-क्षेत्र)।',
            'पानी व स्वच्छता सामग्री अपने साथ रखें।'
          ]
        }
      ],
      faqs: [
        {
          q: 'मंदिर के पास भोजन मिलता है?',
          a: 'हाँ, परिसर के आस-पास छोटे शाकाहारी विकल्प हो सकते हैं; वास्तविक समय व मेनू स्थानीय रूप से जाँचें।'
        },
        {
          q: 'क्या मांसाहारी भोजन मिलेगा?',
          a: 'तीर्थ-क्षेत्र होने के कारण शाकाहारी विकल्प अधिक संभावित हैं; विशिष्ट उपलब्धता मौके पर पूछें।'
        }
      ],
      updated: UPDATED
    },
    en: {
      kicker: 'Food',
      h1: 'Vegetarian food near the temple',
      lead: 'Options before/after darshan, location and cautions — with authenticity notes.',
      sections: [
        {
          heading: 'Near the temple',
          paragraphs: [
            'Small vegetarian food spots, tea/snacks and prasad counters may exist in and around the complex. Verify actual operation, timing and menu locally — do not treat as a permanent list.',
            'No specific shop/restaurant name or price is certified here; rely only on local information.'
          ],
          callout: 'Actual food availability, timing and price may differ on the day of travel — ask on site.'
        },
        {
          heading: 'Tips',
          bullets: [
            'Have a light snack before darshan so the trip stays comfortable.',
            'Prefer vegetarian options in the complex (pilgrimage area).',
            'Carry your own water and hygiene supplies.'
          ]
        }
      ],
      faqs: [
        {
          q: 'Is food available near the temple?',
          a: 'Yes, small vegetarian options may exist around the complex; verify actual timing and menu locally.'
        },
        {
          q: 'Is non-vegetarian food available?',
          a: 'Being a pilgrimage area, vegetarian options are more likely; ask on site for specific availability.'
        }
      ],
      updated: UPDATED_EN
    }
  },

  // 36 — half-day-darshan
  {
    slug: 'half-day-darshan',
    group: 'itinerary',
    related: ['full-day-rishikesh', 'itinerary-without-private-car', 'rishikesh-to-neelkanth', 'best-time-to-visit'],
    hi: {
      kicker: 'यात्रा-योजना',
      h1: 'नीलकंठ महादेव: अर्ध-दिवस दर्शन योजना',
      lead: 'सुबह की छोटी यात्रा — प्रस्थान, दर्शन व वापसी का व्यावहारिक क्रम।',
      facts: [
        ['कुल समय', '4–6 घंटे (अनुमान)'],
        ['शुरुआत', 'सुबह जल्दी (भीड़ से पहले)'],
        ['शामिल', 'यात्रा + दर्शन + वापसी']
      ],
      sections: [
        {
          heading: 'अर्ध-दिवस क्रम',
          paragraphs: [
            'सुबह जल्दी ऋषिकेश (राम झूला) से प्रस्थान करें। आने-जाने का समय मार्ग व यातायात पर निर्भर करता है — स्थानीय रूप से जाँचें।',
            'दर्शन व परिसर में 1–3 घंटे रखें; फिर वापसी की योजना बनाएँ ताकि दोपहर से पहले ऋषिकेश लौट सकें।'
          ]
        },
        {
          heading: 'क्या रखें',
          bullets: [
            'पानी, टोपी व हल्का नाश्ता।',
            'मोबाइल व मूल्यवान वस्तु सीमित रखें।',
            'वापसी का वाहन पहले से तय करें।'
          ]
        },
        {
          heading: 'किसे उपयुक्त',
          paragraphs: [
            'यह योजना समय-सीमित यात्रियों, परिवार व वरिष्ठों के लिए उपयुक्त है जो मुख्य दर्शन पूरा करना चाहते हैं। पैदल ट्रेक चाहने वाले "नीलकंठ ट्रेक" पृष्ठ देखें।'
          ]
        }
      ],
      faqs: [
        {
          q: 'अर्ध-दिवस में नीलकंठ जा सकते हैं?',
          a: 'हाँ, सुबह जल्दी निकलकर दर्शन व वापसी 4–6 घंटे में संभव है (समय मार्ग पर निर्भर)।'
        },
        {
          q: 'क्या पैदल जाना शामिल है?',
          a: 'यह क्रम वाहन-यात्रा के लिए है; पैदल ट्रेक अलग विकल्प है।'
        }
      ],
      updated: UPDATED
    },
    en: {
      kicker: 'Itinerary',
      h1: 'Neelkanth Mahadev: half-day darshan plan',
      lead: 'A short morning trip — a practical sequence of departure, darshan and return.',
      facts: [
        ['Total time', '4–6 hours (estimate)'],
        ['Start', 'Early morning (before crowds)'],
        ['Includes', 'Travel + darshan + return']
      ],
      sections: [
        {
          heading: 'Half-day sequence',
          paragraphs: [
            'Depart early morning from Rishikesh (Ram Jhula). Travel time depends on route and traffic — verify locally.',
            'Keep 1–3 hours for darshan and the complex; then plan the return so you are back in Rishikesh before noon.'
          ]
        },
        {
          heading: 'What to carry',
          bullets: [
            'Water, a hat and a light snack.',
            'Keep mobiles and valuables minimal.',
            'Arrange return transport in advance.'
          ]
        },
        {
          heading: 'Who it suits',
          paragraphs: [
            'This plan suits time-bound travellers, families and seniors who want to complete the main darshan. Trek-seekers see the "Neelkanth trek" page.'
          ]
        }
      ],
      faqs: [
        {
          q: 'Can we do Neelkanth in half a day?',
          a: 'Yes, departing early, darshan and return can fit in 4–6 hours (time depends on route).'
        },
        {
          q: 'Does it include walking?',
          a: 'This sequence is for vehicle travel; the walking trek is a separate option.'
        }
      ],
      updated: UPDATED_EN
    }
  }
];

export function topicSlugs(): string[] {
  return TOPICS.map((t) => t.slug);
}

export function getTopic(slug: string): Topic | undefined {
  return TOPICS.find((t) => t.slug === slug);
}

/** विषय के लिए hreflang वैकल्पिक (hi + en + x-default → hi) */
export function topicAlternates(slug: string): { lang: string; href: string }[] {
  return [
    { lang: 'hi-IN', href: absUrl(`/${slug}/`) },
    { lang: 'en', href: absUrl(`/en/${slug}/`) },
    { lang: 'x-default', href: absUrl(`/${slug}/`) }
  ];
}

export function labelForLink(slug: string, locale: Locale): string {
  const t = getTopic(slug);
  if (!t) return slug;
  return locale === 'en' ? t.en.h1 : t.hi.h1;
}
