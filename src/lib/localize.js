import pt from '../i18n/pt.json';
import en from '../i18n/en.json';

const DICTS = { pt, en };

export function getDict(locale) {
  return DICTS[locale] || DICTS.pt;
}

export function elementLabel(locale, key) {
  return getDict(locale).elements[key] || key;
}

export function familyLabel(locale, key) {
  return getDict(locale).family[key] || key;
}

export function typeLabel(locale, key) {
  return getDict(locale).type[key] || key;
}

export function categoryLabel(locale, key) {
  return getDict(locale).categories[key] || key;
}

export function localizedName(locale, item) {
  if (locale === 'en') return item.nameEn ?? item.name ?? item.namePt;
  return item.namePt ?? item.name;
}

export function localizedDesc(locale, item) {
  if (locale === 'en') return item.descEn ?? item.desc ?? '';
  return item.descPt ?? item.desc ?? '';
}
