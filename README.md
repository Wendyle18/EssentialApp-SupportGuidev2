# Essential Shopify Support Dashboard

Internal support tool for the Essential Apps support team. Shopify only.

## How to Open

1. Download or clone this folder to your computer.
2. Open `index.html` in your browser (Chrome or Firefox recommended).
3. No server, no install, no dependencies needed.

## How to Use

1. Open the **Snippets** tab (default) to browse all snippets grouped by app.
2. Click an app in the left sidebar for the investigation workflow.
3. Select the issue type from the dropdown.
4. Review likely causes and recommended fixes, then follow the investigation checklist.
5. Copy the console command, snippets, or reply template as needed.
6. Use **Ticket references** to search stored sample tickets by app, issue, tag, customer wording, diagnosis, and resolution.
7. Use **Snippets** filters to narrow by app or type.
8. Use the **Reply templates** tab to browse and copy all macros.
9. Use the **Updates** tab to store app-assigned internal updates.
10. Click **Copy full package** (top right) to copy a complete summary including app, issue, access, checklist, commands, reply, and your notes.
11. Use **Storefront Scanner** in the Workflow tab when storefront evidence is needed:
    - Select the app and issue.
    - Copy **Essential Shopify Storefront Scanner**.
    - Paste it into DevTools Console on the merchant's Shopify storefront.
    - Copy the generated JSON report, or let the scanner copy it automatically.
    - Paste the JSON into the dashboard and click **Analyze Scanner Report**.
    - Copy the diagnostic summary or full troubleshooting package.

The scanner is read-only. It checks storefront DOM, loaded scripts, safe Shopify globals, Essential globals, placements, visibility, `/cart.js`, and safe cart item summaries. It does not edit theme code, mutate cart contents, call Shopify Admin APIs, or use any Essential internal API.

Locally added apps, ticket references, and updates are stored in this browser using `localStorage`. They are not written back to `/data/*.js`. Use **Add Ticket** and **Add Update** to add records in modals; custom apps also show these actions in the Workflow tab.

## How to Edit Content

All content lives in `/data/`. Edit these files in any text editor:

| File | What it controls |
|------|-----------------|
| `data/apps.js` | App names, slugs, required collaborator access |
| `data/issues.js` | Issue categories, status chips, likely causes, recommended fixes |
| `data/checklists.js` | Step-by-step investigation checklists per issue |
| `data/snippets.js` | CSS, JS, Liquid, console, class snippets |
| `data/macros.js` | Reply templates with `{{placeholder}}` syntax |
| `data/tickets.js` | Static sample ticket references for agent lookup |
| `data/scannerScripts.js` | Read-only copy-paste storefront scanner scripts |
| `data/diagnosticRules.js` | Data-driven scanner analyzer mappings and rules |

Each file has comments explaining how to add new entries.

## Adding a New App

In `data/apps.js`, add a new object to the `ESSENTIAL_APPS` array:

```js
{
  id: 'my-new-app',           // unique slug, no spaces
  name: 'My New App Name',
  slug: 'my-new-app',
  consoleKey: 'window.myAppConfigs',  // or null if none
  access: [
    'Themes',
    'Edit theme code',
    'Manage and install apps and channels',
    'Products'
  ]
}
```

## Adding a New Issue

In `data/issues.js`, add to `ESSENTIAL_ISSUES`:

```js
{
  id: 'my-issue',
  label: 'My Issue Label',
  appIds: ['my-new-app'], // or ['all'] for generic issues
  status: 'setup',   // setup | theme | shopify-limit | conflict | needs-access | needs-dev
  causes: ['Cause one', 'Cause two'],
  fixes: ['Step agents can take to resolve', 'Another fix step'],
  checklistId: 'my-checklist-key',  // must exist in checklists.js
  macroId: 'macro-id'               // must exist in macros.js
}
```

Then add the matching checklist in `data/checklists.js` and macro in `data/macros.js`.

## Adding a Snippet

In `data/snippets.js`, add to `ESSENTIAL_SNIPPETS`:

```js
{
  id: 'unique-id',
  label: 'Human-readable label',
  type: 'css',    // css | js | liquid | html | console | class
  appId: 'app-slug',   // or null for generic
  tags: ['tag1', 'tag2'],
  description: 'Optional short note',
  code: 'your code here'
}
```

## Adding a Sample Ticket

In `data/tickets.js`, add to `ESSENTIAL_TICKETS`:

```js
{
  id: 'ticket-short-description',
  title: 'Human-readable ticket title',
  appId: 'essential-preorder-presale',
  issueId: 'preorder-button-not-showing',
  tags: ['theme', 'app-embed'],
  customerSummary: 'What the merchant reported',
  diagnosis: 'What support found',
  resolution: 'What fixed it or what was explained',
  reply: 'Copy-ready reply sample',
  source: 'Internal sample'
}
```

Do not include merchant secrets, passwords, API keys, access tokens, or private customer data.

## Reply Template Placeholders

Templates use `{{placeholder}}` syntax. These fill in automatically when you select an app and issue:
- `{{app_name}}` — selected app name from the sidebar
- `{{issue_summary}}` — selected issue label from the dropdown
- `{{required_access}}` — collaborator permissions for the selected app
- `{{support_email}}` — default support email

Still manual until you type or paste them:
- `{{store_url}}` — merchant's Shopify store URL
- `{{customer_email}}` — merchant's email
- `{{next_step}}` — what happens next
- `{{billing_summary}}` — billing context
- `{{conflicting_app_or_theme}}` — the conflicting app or theme name
- `{{review_link}}` — app store review link

## File Structure

```
essential-shopify-support-dashboard/
  index.html        ← Open this in your browser
  styles.css        ← All styles
  app.js            ← All UI logic
  data/
    apps.js         ← App definitions + access rules
    issues.js       ← Issue types + causes
    checklists.js   ← Investigation steps per issue
    snippets.js     ← CSS, JS, Liquid, console snippets
    macros.js       ← Reply templates
    tickets.js      ← Sample ticket references
    scannerScripts.js
    diagnosticRules.js
  README.md
  AGENTS.md
```
