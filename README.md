# Essential Shopify Support Dashboard

Internal support tool for the Essential Apps support team. Shopify only.

## How to Open

1. Download or clone this folder to your computer.
2. Open `index.html` in your browser (Chrome or Firefox recommended).
3. No server, no install, no dependencies needed.

## How to Use

1. Open the dashboard; the **Workflow** tab is the default starting point.
2. Click an app in the left sidebar; its related snippets appear immediately below the app and issue selector.
3. Select the issue type from the dropdown.
4. Review likely causes and recommended fixes, then follow the investigation checklist.
5. Copy the console command, snippets, or reply template as needed.
6. Use **Ticket references** to search stored sample tickets by app, issue, tag, customer wording, diagnosis, and resolution.
7. Use **Snippets** filters to narrow by app or type.
8. Use the **Reply templates** tab to browse and copy all macros.
9. Use the **Updates** tab to store app-assigned internal updates.
10. Use **Guided Case Triage** to record the merchant, store, expected and actual behavior, affected reference, environment, access, troubleshooting, and evidence.
11. Review the generated ticket summary, diagnosis, missing evidence, merchant response, and engineering escalation.
12. For feature requests, open the selected app's filtered Savio view, search before creating a duplicate, and copy the request package.
13. Click **Copy full package** (top right) to copy the app, issue, access, checklist, reply, notes, and complete case-triage package.

Case Triage is browser-local and deterministic. It does not send merchant data to an API, edit Shopify data, or synchronize with HelpScout, Slack, or Savio. Savio and Help Center buttons open the authoritative sources in a separate tab.

The app-specific Related Snippets card and Generated Case Outputs section are collapsible to keep the workflow compact.

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
| `data/playbooks.js` | Case categories, statuses, limitations, internal procedures, Help Center links, aliases, and app-filtered Savio links |

`triage.js` generates browser-local summaries, diagnoses, replies, and engineering escalations. `enhancements.js` contains optional sidebar ordering and update-detail behavior.

## New App Knowledge Sources

- Essential Subscriptions: `https://essentials-docs.helpscoutdocs.com/collection/214-essential-subscriptions-app`
- Essential Free Gifts & BOGO: `https://essentials-docs.helpscoutdocs.com/collection/249-essential-free-gifts-bogo`
- Essential Checkout: `https://essentials-docs.helpscoutdocs.com/collection/266-essential-checkout`

The provisional collaborator access lists for these apps are marked for internal confirmation in the UI. Confirm them before sending an access request.

The Workflow knowledge card also contains the feature-request intake, 5-star review attribution, Preorder shop-information, and storefront geolocation procedures from the updated support documentation.

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
- `{{agent_name}}` — value entered in Guided Case Triage
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
  favicon.svg       ← Browser-tab icon
  styles.css        ← All styles
  app.js            ← All UI logic
  data/
    apps.js         ← App definitions + access rules
    issues.js       ← Issue types + causes
    checklists.js   ← Investigation steps per issue
    snippets.js     ← CSS, JS, Liquid, console snippets
    macros.js       ← Reply templates
    tickets.js      ← Sample ticket references
    playbooks.js    ← Case categories, resources, limitations, procedures
  triage.js         ← Guided case generation
  enhancements.js  ← Sidebar ordering and update detail UI
  README.md
  AGENTS.md
```
