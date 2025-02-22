import { LOCALES, DEFAULT_LOCALE } from '@/lib/variables';

export const locales = LOCALES.map(locale => locale.code);
export const defaultLocale = DEFAULT_LOCALE;

export type Locale = (typeof locales)[number]; 