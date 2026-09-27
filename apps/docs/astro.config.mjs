import starlight from '@astrojs/starlight';
import { defineConfig, passthroughImageService } from 'astro/config';

// The documentation site, served at /docs next to the app (Caddy in the Proxmox container).
// Polish is the root language (/docs/), English lives under /docs/en/.
export default defineConfig({
  base: '/docs',
  image: { service: passthroughImageService() },
  integrations: [
    starlight({
      title: { pl: 'YAPCO · Dokumentacja', en: 'YAPCO · Documentation' },
      logo: { light: './src/assets/apple.svg', dark: './src/assets/apple-dark.svg', alt: 'YAPCO' },
      favicon: '/favicon.svg',
      defaultLocale: 'root',
      locales: {
        root: { label: 'Polski', lang: 'pl' },
        en: { label: 'English', lang: 'en' },
      },
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/mdyzma/yapco' }],
      customCss: ['./src/styles/theme.css'],
      editLink: { baseUrl: 'https://github.com/mdyzma/yapco/edit/main/apps/docs/' },
      sidebar: [
        {
          label: 'Pierwsze kroki',
          translations: { en: 'Getting started' },
          items: [{ autogenerate: { directory: 'start' } }],
        },
        {
          label: 'Własny serwer',
          translations: { en: 'Self-hosting' },
          items: [{ autogenerate: { directory: 'self-hosting' } }],
        },
        {
          label: 'Poradniki',
          translations: { en: 'How-to guides' },
          items: [{ autogenerate: { directory: 'guides' } }],
        },
        {
          label: 'Dla programistów',
          translations: { en: 'Developers' },
          items: [{ autogenerate: { directory: 'developers' } }],
        },
      ],
    }),
  ],
});
