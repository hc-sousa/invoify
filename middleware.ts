import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n.config';

// Variables
import { LOCALES, DEFAULT_LOCALE } from "@/lib/variables";

export default createMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'always'
});

export const config = {
    // Skip all paths that should not be internationalized. This example skips
    // certain folders and all pathnames with a dot (e.g. favicon.ico)
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
