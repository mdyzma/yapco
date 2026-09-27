---
title: Where your data lives
description: Planners are kept only in your browser; what the server sees and what it does not.
sidebar:
  order: 5
---

YAPCO has no accounts and no server database.

- **Planners** are stored in your browser's own storage (IndexedDB), per browser and per
  address. Nobody else can see them, including the person who runs the site.
- **PDF creation** sends the pages you print to the export service on the same site. It renders
  them in a headless Chrome and sends the PDF back. It keeps nothing and logs no planner content.
- **The PDF** downloads to your own *Downloads* folder. No copy stays on the server.
- **No analytics, no cookies, no trackers.**

## What this means for you

- **Clearing your browsing data deletes your planners.** Keep
  [JSON backups](/docs/en/guides/backups/).
- A planner made on your laptop is not on your phone. Move it with a JSON file.
- Sharing the site's address shares the empty app, never your planners: everyone who opens it
  gets their own.

The app's *Privacy* page (the link at the bottom of the dashboard) has the full notice.
