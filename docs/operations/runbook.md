# Runbook: using the planner on your own computer

Everything runs locally: the app in your browser, your planners in the browser's storage, and PDFs
made by your own Google Chrome. Nothing needs an internet connection after the first install.

Prefer not to install Node.js and Chrome? Run the whole site in Docker instead
([deploy.md](deploy.md), A), then open http://localhost:8080:

```bash
docker compose -f deploy/docker/compose.yaml up -d --build
```

The same command works in PowerShell, Terminal (macOS) and any Linux shell. Servers (Docker or
Proxmox) are described in [deploy.md](deploy.md).

Commands below come in two versions: **Windows** (PowerShell, Windows 10 and 11) and **Linux /
macOS** (bash or zsh). Where there is only one block, it works in both.

## Once: set up the computer

You need **Node.js 24** ([nodejs.org](https://nodejs.org), or `brew install node@24` on macOS),
**Git**, and **Google Chrome**. On Linux, Chromium works too (see *When something goes wrong*).

Get the code (pick any folder; the examples use `yapco` in your home folder):

```bash
cd ~
git clone https://github.com/mdyzma/yapco.git
```

**Windows (PowerShell):**

```powershell
corepack enable --install-directory "$env:APPDATA\npm" pnpm   # makes the `pnpm` command available
cd ~\yapco
pnpm install
```

**Linux / macOS:**

```bash
corepack enable            # if it asks for permissions: sudo corepack enable
cd ~/yapco
pnpm install
```

Check it worked: `pnpm --version` prints a version (12.x).

## Every day: start, work, stop

**Start** (one terminal, leave it open):

```bash
cd ~/yapco
pnpm dev
```

(The same in PowerShell; it understands `~` and `/`.)

Wait for `Ready` and `Export service on http://127.0.0.1:8787`, then open
**http://localhost:3000** in Chrome. This one command starts both the app and the PDF export
service.

**Work** in the browser:

| To… | Go to |
|---|---|
| Create a planner, import a JSON file | Dashboard (http://localhost:3000) → *New planner* / *Import JSON…* |
| Change pages, blocks, texts, structure | *Design* |
| Check spreads at real size | *Preview* |
| Write or import quotes | *Content* |
| Fill in missing English/Polish texts | *Translations* |
| Make PDFs, calibration sheet, JSON backups | *Export* |

Changes save by themselves (the designer shows "All changes saved").

**Stop**: press **Ctrl+C** in the terminal (on Windows, answer `Y` if asked). Closing the
terminal also stops it.

> **Always use the same address: `http://localhost:3000`.** Planners are stored per browser *and*
> per address. `http://127.0.0.1:3000`, another browser, a private window, or a hosted site each
> have their own, separate, empty storage. To move planners between them, use JSON files (below).

## Printing a month for the ring binder

1. **Export** → *What to print*: pick the month (e.g. *November 2026*). Months always fill whole
   sheets, so each can be filed on its own.
2. *How you print*:
   - A4 on a duplex printer: **Two-sided, automatic**.
   - A4 on a printer without duplex: **Two-sided, by hand** (you get a fronts file and a backs file).
   - A5 planner on normal A4 paper: **A5 on A4 paper (two per sheet)**.
3. **Create PDF**. The file downloads to your *Downloads* folder, named after the planner and the
   part (e.g. `day-by-day-month-2026-11.pdf`).
4. Print with **Actual size / 100 %**, no "fit to page" (Chrome, Acrobat, Edge, or Preview on
   macOS: untick *Scale to fit*). Two-sided: flip on the **long edge** (A4), or the **short edge**
   for A5-two-per-sheet.
5. A5 two per sheet: cut the whole stack once down the middle (marks at top and bottom), put the
   right-hand pile under the left-hand pile.
6. Punch with a standard **2-hole punch** (80 mm spacing). The binding margin keeps all content
   clear of the holes.

### A5 as a folded booklet

For a sewn or stapled A5 booklet instead of the ring binder: **Export** → *How you print* → **A5
booklet on A4 paper**, and choose the *Sheets per bundle* (4 sheets = 16 pages by default).
Print on both sides, flipping on the **short edge**. The file lists the sheets of each bundle in
order: take each bundle's sheets together, fold them in half along the marks at the top and
bottom, and stack the bundles in order. Then sew or staple each bundle through the fold.

**First time with a printer**, print the **calibration sheet** (Export → *Download calibration
sheet*) on both sides: both rulers must measure exactly 100 mm, and the crosses on the two sides
should line up against the light. For by-hand two-sided printing, it also shows whether the backs
need reverse order (the *Backs in reverse order* option).

## Backups (weekly, and before updating)

Planners live only in this browser. Clearing browsing data for localhost deletes them.

- **Back up**: Export → **Save planner as JSON** (one file per planner; keep them in a folder that
  is backed up, e.g. OneDrive, iCloud Drive or Google Drive).
- **Restore / move**: Dashboard → **Import JSON…** → pick the file. It is added as a new planner, so
  nothing is overwritten.
- **Share only the layout** (no names or dates): Export → *Save template as JSON*. Importing it
  creates a fresh planner from that template.

## Writing quotes

Short version (details in `templates/therapeutic-recovery/README.md`):

- In the app: **Content** → edit quotes side by side, or *Import CSV* from Excel / Google Sheets,
  then *Re-deal quotes* so every day gets one.
- For the template itself (so every new planner gets them), in either shell:

  ```bash
  pnpm --filter @planner/template-therapeutic-recovery quotes:export quotes.csv
  # edit quotes.csv in Excel, Numbers or LibreOffice, save as CSV
  pnpm --filter @planner/template-therapeutic-recovery quotes:import quotes.csv
  ```

## Updating to the latest version

With the app stopped, in either shell:

```bash
cd ~/yapco
git pull
pnpm install
pnpm dev
```

Your planners are not touched by updates (they are in the browser, not in the project folder), but
save JSON backups first anyway. If a page looks broken after updating, reload it with **Ctrl+F5**
(Windows, Linux) or **Cmd+Shift+R** (macOS).

## Checking everything works (optional)

```bash
pnpm check                                          # lint, types, tests, build (a few minutes)
pnpm --filter @planner/export-node test:e2e         # real PDFs in Chrome: exact A4/A5 sizes, holes clear
```

## Command-line PDF (optional)

For a planner saved as JSON, without opening the app (needs `pnpm --filter @planner/web build` once
after each update):

**Windows (PowerShell):**

```powershell
pnpm --filter @planner/export-node pdf "$HOME\Downloads\my-planner.planner.json" --section month:2026-11
```

**Linux / macOS:**

```bash
pnpm --filter @planner/export-node pdf ~/Downloads/my-planner.planner.json --section month:2026-11
```

## When something goes wrong

| Problem | Fix |
|---|---|
| `pnpm` is not recognized / `command not found` | Run the `corepack enable …` line from *Once* again, then open a new terminal. |
| `Port 3000 is in use` | The app is already running in another terminal; use that one, or close it. To find it: Windows `Get-NetTCPConnection -LocalPort 3000` (the `OwningProcess` column), Linux/macOS `lsof -i :3000`. |
| Port 8787 in use | Another export service is still running; close its terminal, or find the process the same way with port 8787. |
| Export says the export service isn't running | You started only the app. Stop it and use `pnpm dev`, or run `pnpm --filter @planner/export-node dev` in a second terminal. Then press *Check again*. |
| `Could not start Chrome` | Install Google Chrome, or point to another Chrome or Chromium before `pnpm dev` (see below). |
| Dashboard is empty | Wrong address or browser (see the note under *Every day*), or browsing data was cleared: import your latest JSON backups. |
| PDF is slightly too small or large on paper | The print dialog is scaling: choose *Actual size* / 100 %. Check with the calibration sheet. |
| Backs are upside down | Choose the other flip edge in the print dialog (long ↔ short). |
| Something else | Stop (Ctrl+C), `pnpm install`, `pnpm dev` again. If it persists, run `pnpm check` and note the first error. |

**Another Chrome or Chromium** (set it in the same terminal, then `pnpm dev`):

**Windows (PowerShell):**

```powershell
$env:CHROME_PATH = "C:\Program Files\Google\Chrome\Application\chrome.exe"
```

**Linux:**

```bash
export CHROME_PATH=/usr/bin/chromium        # or /usr/bin/google-chrome
```

**macOS:**

```bash
export CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
```
