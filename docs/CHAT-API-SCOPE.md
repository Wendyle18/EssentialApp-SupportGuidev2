# Scope: Inline Chat via OpenAI API (Essential App Support)

This document scopes a **backend + OpenAI API** flow so the dashboard **Ask** panel can show ChatGPT-style replies **inside the tool**, instead of only embedding the ChatGPT project URL.

Current tool rules (`AGENTS.md`): no backend, no secrets in repo, no frontend calls to external APIs. **This feature requires explicit team approval** and a small server component.

---

## Problem

| Approach | Inline replies in dashboard? | Uses Custom GPT project (`g-p-…`)? |
|----------|----------------------------|-------------------------------------|
| Embed ChatGPT URL (current) | Yes, but in ChatGPT’s UI | Yes |
| Local `/data/` search (removed) | Yes, but not GPT | No |
| **OpenAI API + backend** | **Yes, in our chat UI** | **Partial** — see below |

OpenAI does **not** expose Custom GPT project URLs (`g-p-69df0fd78cac8191b773464ef5f1b27f-essential-app-support`) as a public “chat this project” API. The backend would use **Chat Completions** (or **Responses API**) with a **system prompt** copied from your GPT project instructions, plus **dashboard context** injected each turn.

---

## Goals

1. Agent types in the dashboard chat box and gets a **written reply in the panel** (steps to reproduce, fixes, next actions).
2. Replies follow **Essential App Support** tone and rules (from GPT instructions, not hard-coded in frontend).
3. **No API keys** in `index.html`, `app.js`, or git — keys live only on the server.
4. Optional: still link **Open in ChatGPT project** for edge cases the API does not handle.

---

## Non-goals (v1)

- Replacing or syncing with ChatGPT project conversation history automatically.
- Uploading merchant store data to OpenAI (only text the agent types + dashboard context).
- Write access to Shopify or merchant stores.
- npm/bundler for the existing static dashboard (backend may use Node or Python separately).

---

## Recommended architecture

```
┌─────────────────────┐      HTTPS POST       ┌──────────────────────┐
│  Support Dashboard  │  /api/support-chat  │  Small backend       │
│  (static HTML/JS)   │ ──────────────────► │  (Node or Python)    │
│  localhost or file  │ ◄────────────────── │                      │
└─────────────────────┘      JSON reply      │  OPENAI_API_KEY env  │
                                             └──────────┬───────────┘
                                                        │
                                                        ▼
                                             OpenAI Chat Completions API
                                             (model + system prompt)
```

### Backend responsibilities

1. **Authenticate** callers (v1 options below).
2. **Build prompt**: system instructions + selected app/issue from request body + matched checklist/fixes from a **shared issue index** (or receive pre-built context from client).
3. **Call OpenAI** with conversation `messages[]` (multi-turn in session).
4. **Return** assistant text + optional metadata (matched `issueId`, citations).
5. **Rate limit** and log errors (no full merchant PII in logs if policy requires redaction).

### Frontend changes (after approval)

1. Restore a **message list** UI (user / assistant bubbles).
2. On Send: `fetch(BACKEND_URL + '/api/support-chat', { method: 'POST', body: … })`.
3. Show loading state; render assistant markdown/plain text.
4. **Config**: `data/chat-assistant.js` → `apiBaseUrl` (e.g. `https://support-api.internal.company.com`), not the API key.
5. Keep **Copy dashboard context** and optional **Open GPT project** link.

**Important:** Opening `index.html` as `file://` will block `fetch` to another origin. Agents would use either:
- dashboard hosted on same origin as API (e.g. internal static host), or
- local dev: `npx serve` + local API with CORS — documented in README.

---

## OpenAI integration details

### Model

- **Suggested:** `gpt-4o-mini` for cost/latency; `gpt-4o` for harder tickets.
- Configurable via server env `OPENAI_MODEL`.

### System prompt source

1. Export instructions from **Essential App Support** Custom GPT (GPT builder → Instructions).
2. Store in repo as `data/gpt-system-prompt.js` (or `.txt` loaded by server only — **do not** put secrets there).
3. Append rules: Shopify-only, no promises on unreleased features, prefer dashboard checklists, reproduction steps format.

### Dashboard context (per request)

Send from client or rebuild on server:

- `selectedAppId`, `selectedIssueId`
- Agent’s question
- Optional: top matched issue checklist + fixes from `issues.js` / `checklists.js` (same logic as today’s `findChatMatches`)

### Custom GPT parity

| GPT project feature | API equivalent |
|--------------------|----------------|
| Instructions | `system` message |
| Knowledge files | v1: manual paste into system prompt summary; v2: Assistants API + vector store |
| Actions / browsing | Not in v1 |
| Memory across team | Server-side session id or client sends `messages` history |

**Assistants API** with a stored assistant id is an alternative if you upload knowledge files once; higher complexity, closer to Custom GPT.

---

## Security and compliance

| Topic | Recommendation |
|-------|----------------|
| API key | `OPENAI_API_KEY` in server env / secrets manager only |
| Who can call API | Internal VPN, API key header `X-Support-Tool-Key`, or SSO proxy |
| CORS | Allow only internal dashboard origin(s) |
| Data sent to OpenAI | Agent question + support context; policy review for merchant URLs/emails in pasted text |
| Logging | Request id, app/issue ids; avoid logging full merchant messages if restricted |
| Retention | Follow company + OpenAI enterprise terms if applicable |

---

## Authentication options (pick one for v1)

1. **Shared secret header** — `X-Api-Key` in dashboard config (rotatable; still weak if dashboard is public).
2. **Internal network only** — API not on public internet.
3. **SSO / OAuth** — dashboard behind company auth; API validates JWT (more work).

---

## API contract (draft)

### `POST /api/support-chat`

**Request**

```json
{
  "message": "Countdown timer disappeared on product page",
  "selectedAppId": "essential-countdown-timer",
  "selectedIssueId": null,
  "history": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}
```

**Response**

```json
{
  "reply": "1. Confirm app embed is ON…\n2. Check visibility rules…",
  "matchedIssueId": "countdown-disappeared",
  "openInWorkflow": true
}
```

**Errors:** `401`, `429`, `502` with safe messages for agents.

---

## Implementation phases

### Phase 0 — Approval (required)

- [ ] Team approves backend + outbound OpenAI calls
- [ ] Legal/security OK with data sent to OpenAI
- [ ] Budget for API usage (per-seat or per-ticket estimate)

### Phase 1 — Minimal backend (1–2 days)

- Node Express or Python FastAPI single endpoint
- Env: `OPENAI_API_KEY`, `OPENAI_MODEL`, `SYSTEM_PROMPT_PATH`
- CORS + shared secret
- Deploy to internal host

### Phase 2 — Dashboard wire-up (0.5–1 day)

- Chat UI messages + `fetch` to `apiBaseUrl`
- Inject dashboard context client-side (reuse `findChatMatches`, `buildChatContextText`)
- Error states: no network, invalid key, rate limit

### Phase 3 — Parity and ops (optional)

- Sync system prompt when GPT project instructions change (checklist in README)
- Assistants API + knowledge files
- Usage dashboard / cost alerts

---

## Hosting options

| Option | Pros | Cons |
|--------|------|------|
| Internal VM / Docker | Simple, full control | Ops overhead |
| Cloud Run / Lambda | Scales to zero | Cold start, CORS setup |
| Cloudflare Worker | Edge, fast | Worker size limits; key in secrets |

---

## Cost rough estimate

- ~500–1500 tokens per turn with context
- `gpt-4o-mini`: low cost per ticket; monitor monthly with OpenAI usage dashboard
- Set `max_tokens` cap on server (e.g. 800) to control spend

---

## What stays unchanged

- Static dashboard data in `/data/*.js`
- No API keys in the repository
- Shopify-only, read-only support rules
- Existing workflow: app → issue → copy package

---

## Decision checklist for the team

1. Approve backend yes/no?
2. Inline chat only on **hosted** dashboard (not `file://`) acceptable?
3. System prompt: who owns updates when GPT project changes?
4. Auth model: internal network vs shared secret vs SSO?
5. Model default: `gpt-4o-mini` vs `gpt-4o`?

Once approved, implementation can start with Phase 1 + 2 without changing merchant-facing store data.
