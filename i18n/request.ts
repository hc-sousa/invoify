import { getRequestConfig } from 'next-intl/server';
import { locales } from '@/i18n.config';

export default getRequestConfig(async ({ locale }) => {
  const messages = (await import(`../messages/${locale}/index.json`)).default;

  return {
    messages
  };
}); 