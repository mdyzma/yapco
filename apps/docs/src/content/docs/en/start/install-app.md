---
title: Install as an app and use offline
description: Install YAPCO from the browser and use it without a connection.
sidebar:
  order: 4
---

YAPCO is a *progressive web app*: the browser can install it like a desktop or phone app, and
after the first visit it opens and works without a connection.

## Install

- **Chrome or Edge on a computer**: the install icon at the right of the address bar, or the menu
  → *Cast, save and share* → *Install page as app*.
- **Android (Chrome)**: menu → *Add to home screen* → *Install*.
- **iPhone and iPad (Safari)**: *Share* → *Add to Home Screen*.

Installing needs HTTPS (a hosted site) or `localhost`. Browsers do not offer it on a plain
`http://` address in your LAN.

## What works offline

| Works offline | Needs a connection |
| --- | --- |
| Dashboard, designer, preview, content, translations | **Create PDF** (the export service) |
| Printing from the browser (*Print view*) | Opening the app for the very first time |
| JSON backups and imports | This documentation |

## Updates

The app checks for a new version each time it opens with a connection, and uses it from the next
visit on. Your planners are not affected by updates.
