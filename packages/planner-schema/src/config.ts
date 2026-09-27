import { z } from 'zod';

// Zod compiles fast validators with `new Function` when it can. The site's Content Security
// Policy forbids that, so validate without it everywhere for the same behaviour in the browser,
// the export service and tests.
z.config({ jitless: true });
