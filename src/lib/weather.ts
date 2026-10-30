import { LATITUDE, LONGITUDE } from '../data/site';

export interface DayForecast {
  date: string;
  weekday: string;
  code: number;
  tMax: number;
  tMin: number;
  precipSum: number;
  precipProb: number;
  uvMax: number;
  sunrise: string;
  sunset: string;
}

export interface WeatherData {
  current: {
    temp: number;
    apparent: number;
    humidity: number;
    windSpeed: number;
    windDir: number;
    precip: number;
    code: number;
    time: string;
  };
  days: DayForecast[];
  fetchedAt: string;
}

export interface Advice {
  outfit: string[];   // यात्रा पहनावा (出行穿搭)
  activity: string[]; // घूमने की योजना (游玩安排)
  items: string[];    // साथ रखें (随身物品)
  risk: string[];     // ⚠️ सुरक्षा सावधानी (风险提醒，仅在需要时显示)
}

interface WmoInfo {
  hi: string;
  en: string;
  icon: string;
}

const WMO: Record<number, WmoInfo> = {
  0: { hi: 'साफ़ आसमान', en: 'Clear sky', icon: '☀️' },
  1: { hi: 'मुख्यतः साफ़', en: 'Mainly clear', icon: '🌤️' },
  2: { hi: 'आंशिक बादल', en: 'Partly cloudy', icon: '⛅' },
  3: { hi: 'बादल छाए', en: 'Overcast', icon: '☁️' },
  45: { hi: 'कोहरा', en: 'Fog', icon: '🌫️' },
  48: { hi: 'कोहरा (पाला)', en: 'Rime fog', icon: '🌫️' },
  51: { hi: 'हल्की बूंदाबांदी', en: 'Light drizzle', icon: '🌦️' },
  53: { hi: 'बूंदाबांदी', en: 'Drizzle', icon: '🌦️' },
  55: { hi: 'तेज़ बूंदाबांदी', en: 'Dense drizzle', icon: '🌧️' },
  56: { hi: 'बर्फीली बूंदाबांदी', en: 'Freezing drizzle', icon: '🌧️' },
  57: { hi: 'घनी बर्फीली बूंदाबांदी', en: 'Dense freezing drizzle', icon: '🌧️' },
  61: { hi: 'हल्की बारिश', en: 'Slight rain', icon: '🌧️' },
  63: { hi: 'बारिश', en: 'Rain', icon: '🌧️' },
  65: { hi: 'तेज़ बारिश', en: 'Heavy rain', icon: '🌧️' },
  66: { hi: 'बर्फीली बारिश', en: 'Freezing rain', icon: '🌧️' },
  67: { hi: 'तेज़ बर्फीली बारिश', en: 'Heavy freezing rain', icon: '🌧️' },
  71: { hi: 'हल्की बर्फबारी', en: 'Slight snow', icon: '❄️' },
  73: { hi: 'बर्फबारी', en: 'Snow', icon: '❄️' },
  75: { hi: 'तेज़ बर्फबारी', en: 'Heavy snow', icon: '❄️' },
  77: { hi: 'बर्फ के कण', en: 'Snow grains', icon: '❄️' },
  80: { hi: 'छिटपट बारिश', en: 'Rain showers', icon: '🌦️' },
  81: { hi: 'छिटपट बारिश', en: 'Rain showers', icon: '🌧️' },
  82: { hi: 'तेज़ छिटपट बारिश', en: 'Violent rain showers', icon: '⛈️' },
  85: { hi: 'हल्की बर्फीली छिटपट', en: 'Snow showers', icon: '❄️' },
  86: { hi: 'बर्फीली छिटपट', en: 'Heavy snow showers', icon: '❄️' },
  95: { hi: 'आंधी-तूफान', en: 'Thunderstorm', icon: '⛈️' },
  96: { hi: 'ओलावृष्टि', en: 'Hail', icon: '⛈️' },
  99: { hi: 'भारी ओलावृष्टि', en: 'Heavy hail', icon: '⛈️' }
};

export function wmo(code: number): WmoInfo {
  return WMO[code] ?? { hi: 'मौसम जानकारी', en: 'Weather info', icon: '🌡️' };
}

const DIRS_HI = ['उत्तर', 'उत्तर-पूर्व', 'पूर्व', 'दक्षिण-पूर्व', 'दक्षिण', 'दक्षिण-पश्चिम', 'पश्चिम', 'उत्तर-पश्चिम'];
const DIRS_EN = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
export function compass(deg: number, locale: 'hi' | 'en' = 'hi'): string {
  const dirs = locale === 'en' ? DIRS_EN : DIRS_HI;
  return dirs[Math.round(deg / 45) % 8];
}

// किमी/घंटा → बीफ़ोर्ट पवन स्तर (पवन-स्तर ट्रिगर के लिए)
export function beaufort(kmh: number): number {
  const lower = [1, 6, 12, 20, 29, 39, 50, 62, 75, 89, 103, 118];
  let b = 0;
  for (const lim of lower) if (kmh >= lim) b++;
  return Math.min(b, 12);
}

let cache: { at: number; data: WeatherData } | null = null;
const TTL = 30 * 60 * 1000;

const fmt = new Intl.DateTimeFormat('hi-IN', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  timeZone: 'Asia/Kolkata'
});

export async function getWeather(): Promise<WeatherData | null> {
  const now = Date.now();
  if (cache && now - cache.at < TTL) return cache.data;
  try {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}` +
      `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,uv_index_max,sunrise,sunset` +
      `&timezone=Asia%2FKolkata&forecast_days=7&wind_speed_unit=kmh`;
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    const j = (await res.json()) as any;
    const currentKeys = ['temperature_2m','apparent_temperature','relative_humidity_2m','wind_speed_10m','wind_direction_10m','precipitation','weather_code'];
    const dailyKeys = ['weather_code','temperature_2m_max','temperature_2m_min','precipitation_sum','precipitation_probability_max','uv_index_max'];
    if (!j || !j.current || !j.daily || !currentKeys.every(k => Number.isFinite(j.current[k])) ||
        typeof j.current.time !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(j.current.time) ||
        !Array.isArray(j.daily.time) || j.daily.time.length !== 7 ||
        !j.daily.time.every((v: unknown) => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v)) ||
        !dailyKeys.every(k => Array.isArray(j.daily[k]) && j.daily[k].length === 7 && j.daily[k].every(Number.isFinite)) ||
        !['sunrise','sunset'].every(k => Array.isArray(j.daily[k]) && j.daily[k].length === 7 && j.daily[k].every((v: unknown) => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(v)))) return null;
    const currentEpoch = Date.parse(j.current.time + '+05:30');
    if (!Number.isFinite(currentEpoch) || Math.abs(now - currentEpoch) > 6 * 60 * 60 * 1000) return null;
    const cur = j.current;
    const d = j.daily;
    const days: DayForecast[] = (d.time as string[]).map((date: string, i: number) => ({
      date,
      weekday: fmt.format(new Date(date + 'T00:00:00+05:30')),
      code: d.weather_code[i],
      tMax: Math.round(d.temperature_2m_max[i]),
      tMin: Math.round(d.temperature_2m_min[i]),
      precipSum: Math.round((d.precipitation_sum[i] ?? 0) * 10) / 10,
      precipProb: d.precipitation_probability_max[i] ?? 0,
      uvMax: Math.round((d.uv_index_max?.[i] ?? 0) * 10) / 10,
      sunrise: (d.sunrise[i] as string).slice(11, 16),
      sunset: (d.sunset[i] as string).slice(11, 16)
    }));
    const data: WeatherData = {
      current: {
        temp: Math.round(cur.temperature_2m),
        apparent: Math.round(cur.apparent_temperature),
        humidity: cur.relative_humidity_2m,
        windSpeed: Math.round(cur.wind_speed_10m),
        windDir: cur.wind_direction_10m,
        precip: cur.precipitation ?? 0,
        code: cur.weather_code,
        time: cur.time
      },
      days,
      fetchedAt: new Date().toISOString()
    };
    cache = { at: now, data };
    return data;
  } catch {
    return null;
  }
}

// मौसम-आधारित यात्री सुझाव इंजन — पहाड़ी/तीर्थ स्थल (आउटडोर, ऊँचाई) संदर्भ में।
// नोट: कोई आधिकारिक "चेतावनी" फ़ीड नहीं है; 'risk' मौजूदा मौसम से व्युत्पन्न सुरक्षा सावधानी है।
export function buildAdvice(w: WeatherData): Advice {
  const cur = w.current;
  const d0 = w.days[0];
  const code = cur.code;
  const prob = d0?.precipProb ?? 0;
  const tMax = d0?.tMax ?? cur.temp;
  const tMin = d0?.tMin ?? cur.temp;
  const uv = d0?.uvMax ?? 0;
  const windB = beaufort(cur.windSpeed);
  const humid = cur.humidity;

  const outfit: string[] = [];
  const activity: string[] = [];
  const items: string[] = [];
  const risk: string[] = [];

  const add = (arr: string[], v: string) => { if (v && !arr.includes(v)) arr.push(v); };

  // ☀️ तापमान / पराबैंगनी (UV)
  if (tMax >= 32) {
    add(outfit, 'तापमान अधिक है; हल्के, ढीले और साँस लेने वाले कपड़े पहनें');
    add(activity, 'दोपहर (लगभग 12–3 बजे) की धूप व गर्मी से बचें; सुबह या शाम को यात्रा करें');
    add(items, 'सनस्क्रीन'); add(items, 'टोपी'); add(items, 'पर्याप्त पानी');
  }
  if (uv >= 5) {
    add(outfit, 'पराबैंगनी (UV) तेज़ है, खुले में सुरक्षा ज़रूरी');
    add(items, 'सनस्क्रीन'); add(items, 'धूप का चश्मा'); add(items, 'टोपी');
  }
  // ❄️ निम्न तापमान / दिन-रात अंतर
  if (tMax <= 10) {
    add(outfit, 'तापमान कम है, गर्म कपड़े पहनें');
    add(items, 'मोटा जैकेट'); add(items, 'स्कार्फ');
  }
  if (tMax - tMin > 8) {
    add(outfit, 'दिन-रात का तापमान अंतर बड़ा है; ऊपरी कपड़ा (जैकेट/स्वेटर) साथ रखें ताकि पहन-उतार सकें');
  }
  if (tMin <= 4) {
    add(items, 'रात के लिए गर्म कपड़ा');
  }

  // 💨 पवन (बीफ़ोर्ट)
  if (windB >= 7) {
    add(risk, 'तेज़ हवा: ऊँचाई, खुली चोटियों, झूलते पुलों और पेड़ों से दूर रहें; खुली पहाड़ी गतिविधियाँ प्रभावित हो सकती हैं');
    add(outfit, 'हवा तेज़ है, हवा-रोधी जैकेट उपयोगी; टोपी उड़ सकती है');
  } else if (windB >= 5) {
    add(outfit, 'हवा काफ़ी है; टोपी/काग़ज़ उड़ सकते हैं, ढीली पोशाक से बचें');
    add(activity, 'खुले/ऊँचे स्थानों पर सावधानी बरतें');
    add(items, 'हवा-रोधी जैकेट');
  }

  // 🌂 वर्षा / बादल
  const heavyRain = code === 65 || code === 82;
  const storm = code === 95 || code === 96 || code === 99;
  const windy = windB >= 5;
  if (prob >= 60) {
    add(outfit, `बारिश की संभावना ${prob}% है — छाता या रेनकोट साथ रखें`);
    add(activity, 'भीड़ व बारिश से बचने के लिए सुबह जल्दी निकलें; खुले पैदल मार्ग की जगह मंदिर परिसर को प्राथमिकता दें');
    // हवा या भारी बारिश में लंबा छाता असुविधाजनक — रेनकोट बेहतर
    if (windy || heavyRain || storm) add(items, 'रेनकोट');
    else add(items, 'छाता / रेनकोट');
  }
  if (code === 51 || code === 53 || code === 55 || code === 61 || code === 80 || code === 81) {
    add(activity, 'हल्की बूंदाबांदी में रास्ते फिसलन भरे हो सकते हैं; पैदल ट्रेक पर धीमी गति रखें');
    if (!windy) add(items, 'मुड़ने वाला छाता');
  }
  if (code === 63) {
    add(activity, 'बारिश में खुले स्थानों पर ध्यान रखें; गीली सीढ़ियों/पत्थरों पर सावधानी');
    add(items, 'रेनकोट');
  }
  if (heavyRain) {
    add(risk, 'भारी बारिश: घाटियों, नदी-नालों और भीड़ वाली पैदल पगडंडियों से दूर रहें — मिट्टी खिसकने का खतरा हो सकता है');
    add(activity, 'खुली पहाड़ी सैर टालें; सुरक्षित/आवरित स्थान चुनें');
    add(items, 'रेनकोट');
  }
  if (storm) {
    add(risk, 'आंधी-तूफान/बिजली: पहाड़ी चोटी, ऊँचे पेड़ों और खुले स्थानों से दूर रहें; ऊँचाई वाली पैदल यात्रा न करें');
    add(activity, 'जल-संबंधित या ऊँचाई वाली गतिविधियाँ बंद रहने की संभावना है; तेज़ हवा/बिजली में सुरक्षित शरण लें');
  }

  // ☁️ साफ़ / बादल
  if (code === 0 || code === 1) {
    add(outfit, 'मौसम साफ़ है — हल्के और आरामदायक कपड़े');
    add(activity, 'साफ़ मौसम में पैदल मार्ग व परिसर का आनंद लें; सुबह की रोशनी फोटो के लिए बेहतरीन है');
    if (uv < 5) add(items, 'सनस्क्रीन');
  }
  if (code === 3) {
    add(outfit, 'बादल छाए हैं, रोशनी नरम है');
    add(activity, 'बिना तेज़ धूप के लंबी खुली सैर के लिए उपयुक्त');
  }

  // 🌫️ कोहरा
  if (code === 45 || code === 48) {
    add(risk, 'कोहरे में दृश्यता कम हो सकती है — पहाड़ी सड़कों पर धीमी गति व सावधानी');
    add(activity, 'कोहरे में ऊँचाई/दृश्य वाली सैर टालें');
    add(items, 'मास्क (यदि धुंध/धूल हो)');
  }

  // आर्द्रता सुखदता
  if (humid >= 80) add(items, 'नमी अधिक — अतिरिक्त पानी');
  if (humid > 0 && humid <= 30) add(items, 'हवा शुष्क — चिकित्सकीय लिप बाम');

  return { outfit, activity, items, risk };
}
