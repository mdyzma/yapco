import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { layoutProject } from '../src/lib/pages';
import { readImport } from '../src/lib/transfer';

/**
 * Files saved by released versions keep importing (ADR-0012). `fixtures/v<version>/` holds
 * files exactly as that version's Export screen saved them: planners ("Save planner as JSON")
 * and templates ("Save template as JSON"). Never edit or reformat them; when the saved shape
 * changes, add a migration (packages/planner-schema/src/migrations) so these still load, and
 * add a new folder for the new version.
 */
const FIXTURES = join(__dirname, 'fixtures');
const files = readdirSync(FIXTURES, { recursive: true })
  .map(String)
  .filter((f) => f.endsWith('.json'))
  .sort();

describe('files saved by released versions still import', () => {
  it('has fixtures', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  for (const file of files) {
    it(file, () => {
      const imported = readImport(readFileSync(join(FIXTURES, file), 'utf8'));
      if (imported.kind === 'error') throw new Error(`${file}: ${imported.message}`);
      if (file.endsWith('.planner.json')) {
        expect(imported.kind).toBe('project');
        if (imported.kind !== 'project') return;
        // It still lays out, and every generated page finds its page template.
        const layout = layoutProject(imported.project);
        expect(layout.pages.length).toBeGreaterThan(0);
        const missing = layout.pages.filter((p) => p.page.instance && !p.template);
        expect(missing.map((p) => p.page.instance?.templateId)).toEqual([]);
      } else {
        expect(imported.kind).toBe('template');
      }
    });
  }
});
