/**
 * The documentation site (apps/docs), served next to the app at /docs: Polish at the root,
 * English under /docs/en/. A plain link, outside the locale routing and the service worker.
 */
export function docsHref(locale: string): string {
  return locale === 'pl' ? '/docs/' : `/docs/${locale}/`;
}
