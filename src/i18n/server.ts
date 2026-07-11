import { cookies } from 'next/headers';
import en from './en.json';
import hi from './hi.json';
import fr from './fr.json';
import es from './es.json';
import zh from './zh.json';
import ar from './ar.json';
import bn from './bn.json';
import ru from './ru.json';
import pt from './pt.json';
import id from './id.json';
import de from './de.json';
import ja from './ja.json';

const dictionaries = {
  en, hi, fr, es, zh, ar, bn, ru, pt, id, de, ja
};

export type Locale = keyof typeof dictionaries;

export function getDictionary(locale: string) {
  return dictionaries[locale as Locale] || en;
}

export function getServerLocale(): string {
  const cookieStore = cookies();
  return cookieStore.get('NEXT_LOCALE')?.value || 'en';
}

export function getServerDictionary() {
  const locale = getServerLocale();
  return getDictionary(locale);
}
