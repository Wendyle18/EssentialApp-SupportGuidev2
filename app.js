// ============================================================
// ESSENTIAL SHOPIFY SUPPORT DASHBOARD — app.js
// All UI logic. Reads from window.ESSENTIAL_* globals.
// Keep functions small and named clearly.
// ============================================================

(function () {
  'use strict';

  // ---- State ------------------------------------------------
  var STORAGE_KEYS = {
    apps: 'essentialSupport.customApps',
    tickets: 'essentialSupport.customTickets',
    updates: 'essentialSupport.updates'
  };

  var state = {
    selectedAppId: null,
    selectedIssueId: null,
    internalNotes: '',
    snippetSearch: '',
    snippetFilterApp: 'all',
    snippetFilterType: 'all',
    macroSearch: '',
    macroFilter: 'all',
    ticketSearch: '',
    ticketFilterApp: 'all',
    ticketFilterIssue: 'all',
    updateFilterApp: 'all',
    customApps: [],
    customTickets: [],
    updates: [],
    scannerReport: null,
    scannerAnalysis: null
  };

  // ---- Helpers ----------------------------------------------

  function el(id) {
    return document.getElementById(id);
  }

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  function qsa(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function loadStoredArray(key) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      return [];
    }
  }

  function saveStoredArray(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      // Keep the current session usable even if browser storage is unavailable.
    }
  }

  function slugify(text) {
    return (text || '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function uniqueId(prefix, label, existingIds) {
    var base = slugify(label) || prefix;
    var id = prefix ? prefix + '-' + base : base;
    var i = 2;
    while (existingIds.includes(id)) {
      id = (prefix ? prefix + '-' : '') + base + '-' + i;
      i += 1;
    }
    return id;
  }

  function copyText(text, btn) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(function () {
      var original = btn.textContent;
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(function () {
        btn.textContent = original;
        btn.classList.remove('copied');
      }, 1800);
    }).catch(function () {
      // Fallback for older browsers
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      var original = btn.textContent;
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(function () {
        btn.textContent = original;
        btn.classList.remove('copied');
      }, 1800);
    });
  }

  function getApps() {
    return (window.ESSENTIAL_APPS || []).concat(state.customApps || []);
  }

  function getTickets() {
    return (window.ESSENTIAL_TICKETS || []).concat(state.customTickets || []);
  }

  function getApp(id) {
    return getApps().find(function (a) { return a.id === id; }) || null;
  }

  function isCustomApp(id) {
    return (state.customApps || []).some(function (app) { return app.id === id; });
  }

  function getIssue(id) {
    return (window.ESSENTIAL_ISSUES || []).find(function (i) { return i.id === id; }) || null;
  }

  function getIssuesForApp(appId) {
    return (window.ESSENTIAL_ISSUES || []).filter(function (issue) {
      var ids = issue.appIds || [];
      return ids.includes('all') || ids.includes(appId);
    }).sort(function (a, b) {
      return a.label.localeCompare(b.label);
    });
  }

  function getChecklist(id) {
    return (window.ESSENTIAL_CHECKLISTS || {})[id] || [];
  }

  function getMacro(id) {
    return (window.ESSENTIAL_MACROS || []).find(function (m) { return m.id === id; }) || null;
  }

  function getSnippetsForApp(appId) {
    return (window.ESSENTIAL_SNIPPETS || []).filter(function (s) {
      return s.appId === appId || s.appId === null;
    });
  }

  function getTicketSearchText(ticket) {
    var app = getApp(ticket.appId);
    var issue = getIssue(ticket.issueId);
    return [
      ticket.title,
      app ? app.name : ticket.appId,
      issue ? issue.label : ticket.issueId,
      ticket.customerSummary,
      ticket.diagnosis,
      ticket.resolution,
      ticket.reply,
      ticket.source,
      (ticket.tags || []).join(' ')
    ].join(' ').toLowerCase();
  }

  function statusChip(status) {
    var map = {
      'setup': { label: 'Setup Issue', cls: 'chip-setup' },
      'theme': { label: 'Theme Issue', cls: 'chip-theme' },
      'shopify-limit': { label: 'Shopify Limitation', cls: 'chip-shopify' },
      'conflict': { label: 'Third-Party Conflict', cls: 'chip-conflict' },
      'needs-access': { label: 'Needs Access', cls: 'chip-access' },
      'needs-dev': { label: 'Needs Dev Team', cls: 'chip-dev' }
    };
    var info = map[status] || { label: status, cls: 'chip-default' };
    return '<span class="chip ' + info.cls + '">' + escapeHtml(info.label) + '</span>';
  }

  function typeLabel(type) {
    var map = {
      'console': 'Console',
      'css': 'CSS',
      'js': 'JS',
      'liquid': 'Liquid',
      'html': 'HTML',
      'class': 'Class'
    };
    return map[type] || type;
  }

  function categoryLabel(category) {
    var map = {
      access: 'Access',
      setup: 'Setup',
      conflict: 'Conflict',
      billing: 'Billing',
      feature: 'Feature',
      review: 'Review'
    };
    return map[category] || 'Reply';
  }

  // Default support email for collaborator templates
  var SUPPORT_EMAIL = 'support@essential-apps.com';

  // ---- Macro placeholders (filled from selected app / issue) ---

  function getMacroContext() {
    var app = getApp(state.selectedAppId);
    var issue = getIssue(state.selectedIssueId);
    var accessList = app && app.access ? app.access : [];

    return {
      app_name: app ? app.name : null,
      issue_summary: issue ? issue.label : null,
      required_access: accessList.length
        ? accessList.map(function (a) { return '   ' + a; }).join('\n')
        : null,
      support_email: SUPPORT_EMAIL,
      store_url: null,
      customer_email: null,
      billing_summary: null,
      next_step: null,
      conflicting_app_or_theme: null,
      review_link: app && app.reviewLink ? app.reviewLink : null
    };
  }

  function applyMacroPlaceholders(text) {
    if (!text) return '';
    var ctx = getMacroContext();
    return text.replace(/\{\{([a-z_]+)\}\}/g, function (match, key) {
      if (Object.prototype.hasOwnProperty.call(ctx, key) && ctx[key]) {
        return ctx[key];
      }
      return match;
    });
  }

  // ---- Render: App List -------------------------------------

  function renderAppList() {
    var apps = getApps();
    var list = el('app-list');
    if (!list) return;

    list.innerHTML = apps.map(function (app) {
      var active = state.selectedAppId === app.id ? ' active' : '';
      var deleteButton = isCustomApp(app.id)
        ? '<button class="app-delete-btn" type="button" data-delete-app-id="' + escapeHtml(app.id) + '" title="Delete app" aria-label="Delete ' + escapeHtml(app.name) + '">&times;</button>'
        : '';
      return '<li class="app-item' + active + '" data-app-id="' + escapeHtml(app.id) + '">' +
        '<span class="app-item-name">' + escapeHtml(app.name) + '</span>' +
        deleteButton +
        '</li>';
    }).join('');

    qsa('.app-item', list).forEach(function (item) {
      item.addEventListener('click', function () {
        var appId = this.getAttribute('data-app-id');
        selectApp(appId);
      });
    });

    qsa('[data-delete-app-id]', list).forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var appId = this.getAttribute('data-delete-app-id');
        state.customApps = (state.customApps || []).filter(function (app) {
          return app.id !== appId;
        });
        saveStoredArray(STORAGE_KEYS.apps, state.customApps);

        if (state.selectedAppId === appId) {
          state.selectedAppId = null;
          state.selectedIssueId = null;
          state.snippetFilterApp = 'all';
          state.ticketFilterApp = 'all';
          state.updateFilterApp = 'all';
        }

        refreshDataViews();
        renderAll();
      });
    });
  }

  // ---- Render: Issue Selector -------------------------------

  function renderIssueSelector() {
    var container = el('issue-selector');
    if (!container) return;

    if (!state.selectedAppId) {
      container.innerHTML = '<p class="placeholder-msg">Select an app to see issue options.</p>';
      return;
    }

    container.innerHTML =
      '<label for="issue-select">Select Issue</label>' +
      '<select id="issue-select">' +
      '<option value="">— Pick an issue —</option>' +
      getIssuesForApp(state.selectedAppId).map(function (issue) {
        var sel = state.selectedIssueId === issue.id ? ' selected' : '';
        return '<option value="' + escapeHtml(issue.id) + '"' + sel + '>' + escapeHtml(issue.label) + '</option>';
      }).join('') +
      '</select>';

    var sel = el('issue-select');
    if (sel) {
      sel.addEventListener('change', function () {
        selectIssue(this.value || null);
      });
    }
  }

  function renderFeatureRequestPanel() {
    var panel = el('feature-request-panel');
    if (!panel) return;

    if (state.selectedIssueId !== 'feature-request') {
      panel.innerHTML = '';
      panel.hidden = true;
      return;
    }

    var savioUrl = 'https://www.savio.io/app/feature-requests?state=ALL_ACTIVE';
    panel.hidden = false;
    panel.innerHTML =
      '<div class="section-header">' +
      '<h3>Feature Request Tracker</h3>' +
      '<button class="btn-copy btn-sm" data-copy-text="' + escapeHtml(savioUrl) + '">Copy Savio link</button>' +
      '</div>' +
      '<p class="savio-note">Reference link:</p>' +
      '<a href="' + escapeHtml(savioUrl) + '" target="_blank" rel="noopener" class="savio-link">' + escapeHtml(savioUrl) + '</a>';

    wireUpCopyButtons(panel);
  }

  // ---- Render: App Header -----------------------------------

  function renderAppHeader() {
    var header = el('app-header');
    if (!header) return;

    var app = getApp(state.selectedAppId);
    if (!app) {
      header.innerHTML = '<p class="placeholder-msg">Select an app from the sidebar to get started.</p>';
      return;
    }

    header.innerHTML =
      '<div class="workflow-header-row">' +
      '<div>' +
      '<h2>' + escapeHtml(app.name) + '</h2>' +
      (isCustomApp(app.id)
        ? '<p>Custom app. Add references or updates below to build its workflow knowledge base.</p>'
        : '') +
      '</div>' +
      (isCustomApp(app.id)
        ? '<div class="workflow-actions">' +
          '<button type="button" class="btn-secondary" data-open-modal="ticket-modal">Add Ticket</button>' +
          '<button type="button" class="btn-secondary" data-open-modal="update-modal">Add Update</button>' +
          '</div>'
        : '') +
      '</div>';
  }

  // ---- Render: Access Panel ---------------------------------

  function renderAccess() {
    var panel = el('access-panel');
    if (!panel) return;

    var app = getApp(state.selectedAppId);
    if (!app) {
      panel.innerHTML = '';
      return;
    }

    var accessList = (app.access || []).map(function (a) {
      return '<li>' + escapeHtml(a) + '</li>';
    }).join('');

    var accessText = (app.access || []).join('\n');

    panel.innerHTML =
      '<details class="access-details">' +
      '<summary>Required Collaborator Access</summary>' +
      '<div class="section-header access-details-header">' +
      '<h3>Required Collaborator Access</h3>' +
      '<button class="btn-copy btn-sm" data-copy-text="' + escapeHtml(accessText) + '">Copy All</button>' +
      '</div>' +
      '<ul class="access-list">' + accessList + '</ul>' +
      '</details>';

    wireUpCopyButtons(panel);
  }

  // ---- Render: Issue Detail ----------------------------------

  function renderIssueDetail() {
    var panel = el('issue-detail');
    if (!panel) return;

    var issue = getIssue(state.selectedIssueId);
    if (!issue) {
      panel.innerHTML = state.selectedAppId
        ? '<p class="placeholder-msg">Select an issue above to see the investigation guide.</p>'
        : '';
      return;
    }

    var causesHtml = (issue.causes || []).map(function (c) {
      return '<li>' + escapeHtml(c) + '</li>';
    }).join('');

    var fixesHtml = (issue.fixes || []).map(function (f) {
      return '<li>' + escapeHtml(f) + '</li>';
    }).join('');

    var fixesText = (issue.fixes || []).map(function (f) {
      return '  • ' + f;
    }).join('\n');

    var checklistItems = getChecklist(issue.checklistId);
    var checklistHtml = checklistItems.map(function (item, i) {
      var cid = 'chk-' + issue.id + '-' + i;
      return '<li class="checklist-item">' +
        '<input type="checkbox" id="' + cid + '">' +
        '<label for="' + cid + '">' + escapeHtml(item) + '</label>' +
        '</li>';
    }).join('');

    var checklistText = checklistItems.map(function (item, i) {
      return '[ ] ' + item;
    }).join('\n');

    var macro = getMacro(issue.macroId);
    var macroHtml = '';
    if (macro) {
      var resolvedMacro = applyMacroPlaceholders(macro.body);
      var macroHint = '';
      if (!state.selectedAppId && /\{\{app_name\}\}/.test(macro.body)) {
        macroHint = '<p class="macro-hint">Select an app in the sidebar to fill app-specific details.</p>';
      } else if (/\{\{[a-z_]+\}\}/.test(resolvedMacro)) {
        macroHint = '<p class="macro-hint">Some placeholders still need manual input before sending.</p>';
      }
      macroHtml =
        '<div class="subsection macro-subsection">' +
        '<div class="section-header">' +
        '<h4>' + escapeHtml(macro.label) + '</h4>' +
        '<button class="btn-copy btn-sm" data-copy-text="' + escapeHtml(resolvedMacro) + '">Copy Reply</button>' +
        '</div>' +
        macroHint +
        '<pre class="code-block macro-preview">' + escapeHtml(resolvedMacro) + '</pre>' +
        '</div>';
    }

    // Console command for this app
    var app = getApp(state.selectedAppId);
    var consoleHtml = '';
    if (app && app.consoleKey) {
      consoleHtml =
        '<div class="subsection">' +
        '<div class="section-header">' +
        '<h4>Quick Console Check</h4>' +
        '<button class="btn-copy btn-sm" data-copy-text="' + escapeHtml(app.consoleKey) + '">Copy</button>' +
        '</div>' +
        '<pre class="code-block console-block">' + escapeHtml(app.consoleKey) + '</pre>' +
        '</div>';
    }

    panel.innerHTML =
      '<div class="issue-top">' +
      statusChip(issue.status) +
      '<h3>' + escapeHtml(issue.label) + '</h3>' +
      '</div>' +

      '<div class="subsection">' +
      '<h4>Likely Causes</h4>' +
      '<ul class="causes-list">' + causesHtml + '</ul>' +
      '</div>' +

      (fixesHtml
        ? '<div class="subsection">' +
          '<div class="section-header">' +
          '<h4>Recommended Fixes</h4>' +
          '<button class="btn-copy btn-sm" data-copy-text="' + escapeHtml(fixesText) + '">Copy Fixes</button>' +
          '</div>' +
          '<ul class="fixes-list">' + fixesHtml + '</ul>' +
          '</div>'
        : '') +

      '<div class="subsection">' +
      '<div class="section-header">' +
      '<h4>Investigation Checklist</h4>' +
      '<button class="btn-copy btn-sm" data-copy-text="' + escapeHtml(checklistText) + '">Copy Checklist</button>' +
      '</div>' +
      '<ul class="checklist">' + checklistHtml + '</ul>' +
      '</div>' +

      consoleHtml +
      macroHtml;

    wireUpCopyButtons(panel);
  }

  // ---- Render: Snippets Panel --------------------------------

  function getFilteredSnippets() {
    var snippets = window.ESSENTIAL_SNIPPETS || [];
    var search = state.snippetSearch.toLowerCase().trim();
    var filterApp = state.snippetFilterApp;
    var filterType = state.snippetFilterType;

    return snippets.filter(function (s) {
      var matchApp = filterApp === 'all' || s.appId === filterApp || (filterApp === 'generic' && !s.appId);
      var matchType = filterType === 'all' || s.type === filterType;
      var matchSearch = !search ||
        s.label.toLowerCase().includes(search) ||
        s.code.toLowerCase().includes(search) ||
        (s.description || '').toLowerCase().includes(search) ||
        (s.tags || []).some(function (t) { return t.toLowerCase().includes(search); });
      return matchApp && matchType && matchSearch;
    });
  }

  function renderSnippetCard(s, showAppName) {
    var appNameHtml = '';
    if (showAppName) {
      var appName = 'All Apps';
      if (s.appId) {
        var app = getApp(s.appId);
        appName = app ? app.name : s.appId;
      }
      appNameHtml = '<span class="snippet-app-name">' + escapeHtml(appName) + '</span>';
    }
    return '<div class="snippet-card">' +
      '<div class="snippet-card-header">' +
      '<div class="snippet-meta">' +
      '<span class="snippet-type-badge type-' + escapeHtml(s.type) + '">' + typeLabel(s.type) + '</span>' +
      appNameHtml +
      '</div>' +
      '<button type="button" class="btn-copy btn-sm" data-copy-text="' + escapeHtml(s.code) + '">Copy</button>' +
      '</div>' +
      '<div class="snippet-label">' + escapeHtml(s.label) + '</div>' +
      (s.description ? '<div class="snippet-description">' + escapeHtml(s.description) + '</div>' : '') +
      '<pre class="code-block">' + escapeHtml(s.code) + '</pre>' +
      '</div>';
  }

  function groupSnippetsByApp(snippets) {
    var apps = getApps();
    var byApp = {};
    var groups = [];
    var used = {};

    snippets.forEach(function (s) {
      var key = s.appId || '__generic__';
      if (!byApp[key]) byApp[key] = [];
      byApp[key].push(s);
    });

    apps.forEach(function (a) {
      if (byApp[a.id] && byApp[a.id].length) {
        groups.push({ appId: a.id, appName: a.name, snippets: byApp[a.id] });
        used[a.id] = true;
      }
    });

    Object.keys(byApp).forEach(function (key) {
      if (key === '__generic__' || used[key]) return;
      var app = getApp(key);
      groups.push({
        appId: key,
        appName: app ? app.name : key,
        snippets: byApp[key]
      });
    });

    if (byApp.__generic__ && byApp.__generic__.length) {
      groups.push({
        appId: null,
        appName: 'All Apps / Generic',
        snippets: byApp.__generic__
      });
    }

    return groups;
  }

  function renderSnippetsPanel() {
    var snippetBody = el('snippets-body');
    if (!snippetBody) return;

    var filtered = getFilteredSnippets();
    var groupByApp = state.snippetFilterApp === 'all';

    if (!filtered.length) {
      snippetBody.innerHTML = '<p class="placeholder-msg">No snippets match your search.</p>';
      return;
    }

    var snippetsHtml;

    if (groupByApp) {
      var groups = groupSnippetsByApp(filtered);
      snippetsHtml = groups.map(function (g) {
        return '<section class="snippet-app-section">' +
          '<h3 class="snippet-app-section-title">' + escapeHtml(g.appName) +
          ' <span class="snippet-app-section-count">' + g.snippets.length + '</span></h3>' +
          '<div class="snippet-app-section-grid">' +
          g.snippets.map(function (s) { return renderSnippetCard(s, false); }).join('') +
          '</div></section>';
      }).join('');
    } else {
      snippetsHtml = '<div class="snippets-flat-grid">' +
        filtered.map(function (s) { return renderSnippetCard(s, true); }).join('') +
        '</div>';
    }

    snippetBody.innerHTML = snippetsHtml;
    wireUpCopyButtons(snippetBody);
  }

  // ---- Render: Workflow tab related snippets -----------------

  function renderWorkflowSnippets() {
    var container = el('workflow-snippets');
    if (!container) return;

    if (!state.selectedAppId) {
      container.innerHTML = '<p class="placeholder-msg">Select an app to see related snippets.</p>';
      return;
    }

    var snippets = (window.ESSENTIAL_SNIPPETS || []).filter(function (s) {
      return s.appId === state.selectedAppId;
    });

    if (!snippets.length) {
      container.innerHTML = '<p class="placeholder-msg">No app-specific snippets for this app yet.</p>';
      return;
    }

    container.innerHTML = snippets.map(function (s) {
      return '<div class="workflow-snippet-item">' +
        '<div class="workflow-snippet-head">' +
        '<div class="workflow-snippet-title">' +
        '<span class="snippet-type-badge type-' + escapeHtml(s.type) + '">' + typeLabel(s.type) + '</span>' +
        '<span class="workflow-snippet-name">' + escapeHtml(s.label) + '</span>' +
        '</div>' +
        '<button type="button" class="btn-copy btn-sm" data-copy-text="' + escapeHtml(s.code) + '">Copy</button>' +
        '</div>' +
        (s.description ? '<div class="workflow-snippet-desc">' + escapeHtml(s.description) + '</div>' : '') +
        '<pre class="code-block">' + escapeHtml(s.code) + '</pre>' +
        '</div>';
    }).join('');

    wireUpCopyButtons(container);
  }

  // ---- Render: Snippet Filters ------------------------------

  function renderSnippetFilters() {
    var apps = getApps();
    var filterAppSel = el('filter-app');
    if (filterAppSel) {
      filterAppSel.innerHTML =
        '<option value="all"' + (state.snippetFilterApp === 'all' ? ' selected' : '') + '>All Apps</option>' +
        '<option value="generic"' + (state.snippetFilterApp === 'generic' ? ' selected' : '') + '>Generic / All Apps</option>' +
        apps.map(function (a) {
          var selected = state.snippetFilterApp === a.id ? ' selected' : '';
          return '<option value="' + escapeHtml(a.id) + '"' + selected + '>' + escapeHtml(a.name) + '</option>';
        }).join('');
    }
  }

  // ---- Render: Ticket References ----------------------------

  function getFilteredTickets() {
    var tickets = getTickets();
    var search = state.ticketSearch.toLowerCase().trim();

    return tickets.filter(function (ticket) {
      var matchApp = state.ticketFilterApp === 'all' || ticket.appId === state.ticketFilterApp;
      var matchIssue = state.ticketFilterIssue === 'all' || ticket.issueId === state.ticketFilterIssue;
      var matchSearch = !search || getTicketSearchText(ticket).includes(search);
      return matchApp && matchIssue && matchSearch;
    });
  }

  function renderTicketFilters() {
    var apps = getApps();
    var issues = window.ESSENTIAL_ISSUES || [];
    var appSelect = el('ticket-filter-app');
    var issueSelect = el('ticket-filter-issue');

    if (appSelect) {
      appSelect.innerHTML =
        '<option value="all">All Apps</option>' +
        apps.map(function (app) {
          var selected = state.ticketFilterApp === app.id ? ' selected' : '';
          return '<option value="' + escapeHtml(app.id) + '"' + selected + '>' + escapeHtml(app.name) + '</option>';
        }).join('');
    }

    if (issueSelect) {
      var visibleIssues = state.ticketFilterApp === 'all'
        ? issues
        : getIssuesForApp(state.ticketFilterApp);

      issueSelect.innerHTML =
        '<option value="all">All Issues</option>' +
        visibleIssues.map(function (issue) {
          var selected = state.ticketFilterIssue === issue.id ? ' selected' : '';
          return '<option value="' + escapeHtml(issue.id) + '"' + selected + '>' + escapeHtml(issue.label) + '</option>';
        }).join('');
    }
  }

  function renderEntryFormOptions() {
    var apps = getApps();
    var ticketApp = el('new-ticket-app');
    var ticketIssue = el('new-ticket-issue');
    var updateApp = el('new-update-app');
    var updateFilter = el('update-filter-app');

    var appOptions = apps.map(function (app) {
      return '<option value="' + escapeHtml(app.id) + '">' + escapeHtml(app.name) + '</option>';
    }).join('');

    if (ticketApp) {
      var currentTicketApp = ticketApp.value || (apps[0] && apps[0].id) || '';
      ticketApp.innerHTML = appOptions;
      ticketApp.value = currentTicketApp;
    }

    if (ticketIssue) {
      var appId = ticketApp ? ticketApp.value : '';
      var issues = appId ? getIssuesForApp(appId) : [];
      ticketIssue.innerHTML = issues.map(function (issue) {
        return '<option value="' + escapeHtml(issue.id) + '">' + escapeHtml(issue.label) + '</option>';
      }).join('');
    }

    if (updateApp) {
      var currentUpdateApp = updateApp.value || (apps[0] && apps[0].id) || '';
      updateApp.innerHTML = appOptions;
      updateApp.value = currentUpdateApp;
    }

    if (updateFilter) {
      updateFilter.innerHTML =
        '<option value="all">All Apps</option>' +
        apps.map(function (app) {
          var selected = state.updateFilterApp === app.id ? ' selected' : '';
          return '<option value="' + escapeHtml(app.id) + '"' + selected + '>' + escapeHtml(app.name) + '</option>';
        }).join('');
    }
  }

  function renderTicketCard(ticket) {
    var app = getApp(ticket.appId);
    var issue = getIssue(ticket.issueId);
    var tagsHtml = (ticket.tags || []).map(function (tag) {
      return '<span class="ticket-tag">' + escapeHtml(tag) + '</span>';
    }).join('');

    return '<article class="ticket-card">' +
      '<div class="ticket-card-top">' +
      '<div>' +
      '<h3>' + escapeHtml(ticket.title) + '</h3>' +
      '<p>' + escapeHtml(app ? app.name : ticket.appId) + ' · ' + escapeHtml(issue ? issue.label : ticket.issueId) + '</p>' +
      '</div>' +
      '<button class="btn-copy btn-sm" data-copy-text="' + escapeHtml(ticket.reply) + '">Copy Reply</button>' +
      '</div>' +
      '<div class="ticket-tags">' + tagsHtml + '</div>' +
      '<dl class="ticket-detail-grid">' +
      '<div><dt>Customer wording</dt><dd>' + escapeHtml(ticket.customerSummary) + '</dd></div>' +
      '<div><dt>Diagnosis</dt><dd>' + escapeHtml(ticket.diagnosis) + '</dd></div>' +
      '<div><dt>Resolution</dt><dd>' + escapeHtml(ticket.resolution) + '</dd></div>' +
      '</dl>' +
      '<div class="ticket-reply">' +
      '<div class="ticket-reply-label">Sample reply</div>' +
      '<p>' + escapeHtml(ticket.reply) + '</p>' +
      '</div>' +
      (ticket.source ? '<div class="ticket-source">' + escapeHtml(ticket.source) + '</div>' : '') +
      '</article>';
  }

  function renderTicketsPanel() {
    var container = el('ticket-results');
    if (!container) return;

    var tickets = getFilteredTickets();

    if (!tickets.length) {
      container.innerHTML = '<p class="placeholder-msg">No ticket references match these filters.</p>';
      return;
    }

    container.innerHTML =
      '<div class="ticket-count">' + tickets.length + ' reference' + (tickets.length === 1 ? '' : 's') + '</div>' +
      tickets.map(renderTicketCard).join('');

    wireUpCopyButtons(container);
  }

  // ---- Render: Updates --------------------------------------

  function renderUpdatesPanel() {
    var container = el('updates-list');
    if (!container) return;

    var updates = (state.updates || []).filter(function (update) {
      return state.updateFilterApp === 'all' || update.appId === state.updateFilterApp;
    });

    if (!updates.length) {
      container.innerHTML = '<p class="placeholder-msg">No updates stored yet.</p>';
      return;
    }

    container.innerHTML = updates.map(function (update) {
      var app = getApp(update.appId);
      return '<article class="ticket-card update-card">' +
        '<div class="ticket-card-top">' +
        '<div>' +
        '<h3>' + escapeHtml(update.title) + '</h3>' +
        '<p>' + escapeHtml(app ? app.name : update.appId) + ' · ' + escapeHtml(update.createdAt || '') + '</p>' +
        '</div>' +
        '<button class="btn-copy btn-sm" data-copy-text="' + escapeHtml(update.body) + '">Copy Update</button>' +
        '</div>' +
        '<p class="update-body">' + escapeHtml(update.body) + '</p>' +
        '</article>';
    }).join('');

    wireUpCopyButtons(container);
  }

  // ---- Render: Macro Selector --------------------------------

  function getMacroCategory(macro) {
    var text = (macro.id + ' ' + macro.label + ' ' + macro.description).toLowerCase();
    if (text.includes('collab') || text.includes('access') || text.includes('code')) return 'access';
    if (text.includes('embed') || text.includes('grey') || text.includes('timer')) return 'setup';
    if (text.includes('conflict') || text.includes('limitation')) return 'conflict';
    if (text.includes('billing') || text.includes('refund')) return 'billing';
    if (text.includes('feature')) return 'feature';
    if (text.includes('review')) return 'review';
    return 'setup';
  }

  function getFilteredMacros() {
    var search = state.macroSearch.toLowerCase().trim();
    return (window.ESSENTIAL_MACROS || []).filter(function (macro) {
      var category = getMacroCategory(macro);
      var haystack = [
        macro.label,
        macro.description,
        macro.body
      ].join(' ').toLowerCase();

      var matchCategory = state.macroFilter === 'all' || category === state.macroFilter;
      var matchSearch = !search || haystack.includes(search);
      return matchCategory && matchSearch;
    });
  }

  function renderMacroList() {
    var container = el('macro-list');
    if (!container) return;

    var app = getApp(state.selectedAppId);
    var hintHtml = app
      ? '<p class="macros-context-banner">Reply templates are using <strong>' + escapeHtml(app.name) + '</strong> for app-specific details' +
        (state.selectedIssueId
          ? ' and the selected issue summary.'
          : '. Select an issue on Workflow to fill issue-specific details.')
      + '</p>'
      : '<p class="macros-context-banner">Select an app in the sidebar to auto-fill app name and access permissions.</p>';

    var macros = getFilteredMacros();
    if (!macros.length) {
      container.innerHTML = hintHtml + '<p class="placeholder-msg">No reply templates match these filters.</p>';
      return;
    }

    container.innerHTML = hintHtml + macros.map(function (m) {
      var resolved = applyMacroPlaceholders(m.body);
      var category = getMacroCategory(m);
      return '<div class="snippet-card">' +
        '<div class="snippet-card-header">' +
        '<div class="snippet-meta"><span class="snippet-type-badge type-macro">' + escapeHtml(categoryLabel(category)) + '</span></div>' +
        '<button class="btn-copy btn-sm" data-copy-text="' + escapeHtml(resolved) + '">Copy</button>' +
        '</div>' +
        '<div class="snippet-label">' + escapeHtml(m.label) + '</div>' +
        '<div class="snippet-description">' + escapeHtml(m.description) + '</div>' +
        '<pre class="code-block macro-preview">' + escapeHtml(resolved) + '</pre>' +
        '</div>';
    }).join('');

    wireUpCopyButtons(container);
  }

  // ---- Storefront Scanner -----------------------------------

  function getScannerScript() {
    return (((window.ESSENTIAL_SCANNER_SCRIPTS || {}).storefront || {}).code) || '';
  }

  function getDiagnosticRule(id) {
    return ((window.ESSENTIAL_APP_DIAGNOSTICS || {}).rules || []).find(function (rule) {
      return rule.id === id;
    }) || null;
  }

  function getExpectedGlobals(appId) {
    return (((window.ESSENTIAL_APP_DIAGNOSTICS || {}).appGlobals || {})[appId]) || [];
  }

  function getExpectedPlacements(appId) {
    return (((window.ESSENTIAL_APP_DIAGNOSTICS || {}).appPlacements || {})[appId]) || [];
  }

  function hasGlobal(report, name) {
    var info = ((report || {}).essentialGlobals || {})[name];
    return !!(info && info.exists);
  }

  function placementCount(report, selector) {
    var placements = (report || {}).placements || {};
    return Number(placements[selector] || 0);
  }

  function expectedPlacementTotal(report, appId) {
    return getExpectedPlacements(appId).reduce(function (sum, selector) {
      return sum + placementCount(report, selector);
    }, 0);
  }

  function getHiddenEssentialEvidence(report, appId) {
    var visibility = (report || {}).visibility || {};
    var expected = getExpectedPlacements(appId);
    var selectors = expected.length ? expected : Object.keys(visibility).filter(function (selector) {
      return selector.indexOf('essential') !== -1 || selector.indexOf('rockit') !== -1;
    });

    return selectors.filter(function (selector) {
      return (visibility[selector] || []).some(function (item) {
        return item && item.isProbablyHidden;
      });
    }).slice(0, 6);
  }

  function issueText(issue) {
    if (!issue) return '';
    return [
      issue.id,
      issue.label,
      issue.status,
      (issue.causes || []).join(' '),
      (issue.fixes || []).join(' ')
    ].join(' ').toLowerCase();
  }

  function issueLooksProductPage(issue) {
    var text = issueText(issue);
    return /product|add to cart|button|preorder|sticky|upsell|widget|placement/.test(text);
  }

  function issueLooksDiscount(issue) {
    return /discount|price|compare|sale|cart/.test(issueText(issue));
  }

  function issueLooksGreyScreen(issue) {
    return /grey|gray|loading|blank|network|console/.test(issueText(issue));
  }

  function issueLooksGeolocation(issue) {
    return /geo|country|location|market|currency|vpn/.test(issueText(issue));
  }

  function cartHasDiscounts(report) {
    var cart = (report || {}).cart || {};
    if (Number(cart.total_discount || 0) > 0) return true;
    if (Number(cart.cart_level_discount_applications_count || 0) > 0) return true;
    return (cart.items || []).some(function (item) {
      return Number(item.total_discount || 0) > 0 ||
        Number(item.line_level_discount_allocations_count || 0) > 0;
    });
  }

  function cartHasProperty(report, propName) {
    return (((report || {}).cart || {}).items || []).some(function (item) {
      return !!item[propName];
    });
  }

  function cartHasEssentialPropertyKeys(report) {
    return (((report || {}).cart || {}).items || []).some(function (item) {
      return (item.propertyKeys || []).some(function (key) {
        return /essential/i.test(key);
      });
    });
  }

  function hasEssentialScripts(report) {
    var scripts = (report || {}).scripts || {};
    if (Number(scripts.essentialScripts || 0) > 0) return true;
    return (scripts.items || []).some(function (script) {
      return !!script.isEssential;
    });
  }

  function getRootCauseCategory(rule) {
    if (rule.category) return rule.category;
    if (rule.accessNeeded) return 'Needs access';
    return 'Needs dev team';
  }

  function getDevEscalationNeeded(rule) {
    if (typeof rule.devEscalationNeeded === 'boolean') return rule.devEscalationNeeded;
    return /escalate/i.test(rule.escalation || '');
  }

  function addDiagnostic(findings, ruleId, evidence) {
    var rule = getDiagnosticRule(ruleId);
    if (!rule) return;
    findings.push({
      id: rule.id,
      label: rule.label,
      confidence: rule.confidence,
      summary: rule.summary || rule.cause,
      rootCauseCategory: getRootCauseCategory(rule),
      cause: rule.cause,
      evidence: evidence || [],
      nextSteps: rule.nextSteps || [],
      suggestedSnippetIds: rule.suggestedSnippetIds || [],
      merchantAngle: rule.merchantAngle,
      internalNote: rule.internalNote,
      escalation: rule.escalation,
      devEscalationNeeded: getDevEscalationNeeded(rule),
      accessNeeded: !!rule.accessNeeded
    });
  }

  function sortDiagnostics(findings) {
    var priority = {
      'missing-global-no-essential-scripts': 10,
      'missing-global-essential-script-exists': 12,
      'essential-element-hidden': 15,
      'preorder-atc-class-missing': 16,
      'cart-drawer-api-missing': 18,
      'global-exists-placement-missing': 20,
      'product-form-missing': 22,
      'atc-button-missing': 24,
      'upsell-script-type-issue': 26,
      'cart-discounts-detected': 30,
      'upsell-properties-visible': 34,
      'preorder-properties-visible': 34,
      'visible-essential-properties': 36,
      'grey-screen-needs-screenshots': 40,
      'geolocation-verification': 42,
      'shopify-limitation': 44,
      'third-party-conflict': 46,
      'feature-request-savio': 48
    };

    findings.sort(function (a, b) {
      return (priority[a.id] || 100) - (priority[b.id] || 100);
    });
  }

  function getSnippet(id) {
    return (window.ESSENTIAL_SNIPPETS || []).find(function (snippet) {
      return snippet.id === id;
    }) || null;
  }

  function getSuggestedSnippets(appId, issue, finding) {
    var text = issueText(issue);
    var byId = {};
    var snippets = [];
    var dynamicIds = [];

    (finding.suggestedSnippetIds || []).forEach(function (id) {
      dynamicIds.push(id);
    });

    if (finding.id === 'global-exists-placement-missing') {
      var placementMap = {
        'essential-upsell-cross-sell': ['placement-upsell-default', 'placement-upsell-side-cart-top', 'placement-upsell-side-cart-bottom', 'placement-upsell-addon'],
        'essential-countdown-timer': ['placement-countdown-product', 'placement-countdown-by-id'],
        'essential-announcement-bar': ['placement-announcement-default', 'placement-announcement-side-cart'],
        'essential-free-shipping': ['placement-free-shipping-side-cart'],
        'essential-trust-badges-icons': ['placement-trust-badges'],
        'essential-estimated-delivery': ['placement-estimated-delivery'],
        'essential-loyalty': ['placement-loyalty-trigger', 'placement-loyalty-product'],
        'rockit-discounts-sales': ['placement-rockit-timer']
      };
      dynamicIds = dynamicIds.concat(placementMap[appId] || []);
    }

    if (finding.id === 'atc-button-missing' && appId === 'essential-preorder-presale') {
      dynamicIds = dynamicIds.concat(['class-preorder-initial-atc', 'class-preorder-extra-atc']);
    }

    dynamicIds.forEach(function (id) {
      var snippet = getSnippet(id);
      if (snippet && !byId[snippet.id]) {
        byId[snippet.id] = true;
        snippets.push(snippet);
      }
    });

    (window.ESSENTIAL_SNIPPETS || []).forEach(function (snippet) {
      var snippetText = [
        snippet.label,
        snippet.description,
        snippet.type,
        (snippet.tags || []).join(' ')
      ].join(' ').toLowerCase();
      var matches = (snippet.appId === appId || snippet.appId === null) &&
        text && text.split(/\s+/).some(function (word) {
          return word.length > 4 && snippetText.indexOf(word) !== -1;
        });
      if (matches && !byId[snippet.id] && snippets.length < 5) {
        byId[snippet.id] = true;
        snippets.push(snippet);
      }
    });

    return snippets.map(function (snippet) {
      return {
        id: snippet.id,
        label: snippet.label,
        type: typeLabel(snippet.type)
      };
    });
  }

  function analyzeScannerReport(report) {
    var app = getApp(state.selectedAppId);
    var issue = getIssue(state.selectedIssueId);
    var appId = app ? app.id : null;
    var findings = [];
    var expectedGlobals = appId ? getExpectedGlobals(appId) : [];
    var expectedGlobalExists = expectedGlobals.some(function (name) {
      return hasGlobal(report, name);
    });
    var placementTotal = appId ? expectedPlacementTotal(report, appId) : 0;
    var hiddenSelectors = appId ? getHiddenEssentialEvidence(report, appId) : [];
    var essentialScriptsFound = hasEssentialScripts(report);

    if (appId && expectedGlobals.length && !expectedGlobalExists) {
      var globalEvidence = expectedGlobals.map(function (name) {
        return 'essentialGlobals.' + name + '.exists: false';
      });
      globalEvidence.push('scripts.essentialScripts: ' + Number((((report || {}).scripts || {}).essentialScripts) || 0));
      addDiagnostic(
        findings,
        essentialScriptsFound ? 'missing-global-essential-script-exists' : 'missing-global-no-essential-scripts',
        globalEvidence
      );
    }

    if (appId && expectedGlobalExists && getExpectedPlacements(appId).length && placementTotal === 0) {
      addDiagnostic(findings, 'global-exists-placement-missing', expectedGlobals.filter(function (name) {
        return hasGlobal(report, name);
      }).map(function (name) {
        return 'essentialGlobals.' + name + '.exists: true';
      }).concat(getExpectedPlacements(appId).map(function (selector) {
        return 'placements["' + selector + '"]: 0';
      }).slice(0, 8)));
    }

    if (appId === 'essential-preorder-presale' && expectedGlobalExists) {
      var preorderInitialAtc = placementCount(report, '.essential-preorder-initial-add-to-cart-button');
      var preorderExtraAtc = placementCount(report, '.essential-preorder-extra-add-to-cart-button');
      if (preorderInitialAtc === 0 && preorderExtraAtc === 0) {
        addDiagnostic(findings, 'preorder-atc-class-missing', [
          'essentialGlobals.essentialPreorderConfigs.exists: true',
          'placements[".essential-preorder-initial-add-to-cart-button"]: 0',
          'placements[".essential-preorder-extra-add-to-cart-button"]: 0'
        ]);
      }
    }

    if (hiddenSelectors.length) {
      addDiagnostic(findings, 'essential-element-hidden', hiddenSelectors.map(function (selector) {
        var sample = (((report || {}).visibility || {})[selector] || [])[0] || {};
        return selector + ' hidden check: display=' + (sample.display || 'unknown') +
          ', visibility=' + (sample.visibility || 'unknown') +
          ', opacity=' + (sample.opacity || 'unknown') +
          ', size=' + (sample.width || 0) + 'x' + (sample.height || 0);
      }));
    }

    if (appId === 'essential-upsell-cross-sell' && ((report.scripts || {}).possibleUpsellScriptTypeIssue)) {
      addDiagnostic(findings, 'upsell-script-type-issue', ['scripts.possibleUpsellScriptTypeIssue: true']);
    }

    if (issueLooksDiscount(issue) && cartHasDiscounts(report)) {
      addDiagnostic(findings, 'cart-discounts-detected', [
        'cart.total_discount: ' + ((((report || {}).cart || {}).total_discount) || 0),
        'cart discount applications: ' + ((((report || {}).cart || {}).cart_level_discount_applications_count) || 0)
      ]);
    }

    if (cartHasProperty(report, 'hasEssentialUpsellProperties')) {
      addDiagnostic(findings, 'upsell-properties-visible', ['At least one cart item has Essential Upsell property keys.']);
    }

    if (cartHasProperty(report, 'hasEssentialPreorderProperties')) {
      addDiagnostic(findings, 'preorder-properties-visible', ['At least one cart item has preorder property keys.']);
    }

    if (cartHasEssentialPropertyKeys(report)) {
      addDiagnostic(findings, 'visible-essential-properties', ['At least one cart item has Essential-related property keys in /cart.js.']);
    }

    if (appId === 'essential-cart-drawer' && !(((report || {}).cartDrawer || {}).hasEssentialCartApi)) {
      addDiagnostic(findings, 'cart-drawer-api-missing', ['cartDrawer.hasEssentialCartApi: false']);
    }

    if (issueLooksProductPage(issue) && (((report || {}).page || {}).likelyPageType || '').indexOf('product') !== -1) {
      var productFormsFound = Number((((report || {}).page || {}).productFormsFound) || 0);
      var addToCartButtonsFound = Number((((report || {}).page || {}).addToCartButtonsFound) || 0);
      if (productFormsFound === 0) {
        addDiagnostic(findings, 'product-form-missing', [
          'page.likelyPageType: ' + ((((report || {}).page || {}).likelyPageType) || 'unknown'),
          'page.productFormsFound: 0'
        ]);
      }
      if (addToCartButtonsFound === 0) {
        addDiagnostic(findings, 'atc-button-missing', [
          'page.likelyPageType: ' + ((((report || {}).page || {}).likelyPageType) || 'unknown'),
          'page.addToCartButtonsFound: 0'
        ]);
      }
    }

    if (issueLooksGreyScreen(issue)) {
      addDiagnostic(findings, 'grey-screen-needs-screenshots', ['Scanner warning: old Console/Network errors require screenshots.']);
    }

    if (issue && issue.id === 'feature-request') {
      addDiagnostic(findings, 'feature-request-savio', ['Selected issue is Feature Request.']);
    }

    if (issue && issue.status === 'shopify-limit') {
      addDiagnostic(findings, 'shopify-limitation', ['Selected issue status: shopify-limit.']);
    }

    if (issue && issue.status === 'conflict') {
      addDiagnostic(findings, 'third-party-conflict', ['Selected issue status: conflict.']);
    }

    if (issueLooksGeolocation(issue)) {
      addDiagnostic(findings, 'geolocation-verification', ['Selected issue wording suggests country, market, currency, or geolocation targeting.']);
    }

    if (!findings.length) {
      findings.push({
        id: 'no-strong-match',
        label: 'No strong scanner match',
        confidence: 'Low',
        summary: 'The scanner did not find a strong direct match. The issue is possible, but needs confirmation with the normal checklist and screenshots.',
        rootCauseCategory: 'Needs access',
        cause: 'The scanner did not find a direct match for the selected app and issue.',
        evidence: [
          'Page type: ' + ((((report || {}).page || {}).likelyPageType) || 'unknown'),
          'Expected placement count: ' + placementTotal,
          'Runtime errors during scan: ' + (((report || {}).runtimeErrors || []).length)
        ],
        nextSteps: [
          'Use the existing investigation checklist for the selected issue.',
          'Compare the active theme against Dawn or a clean theme preview.',
          'Collect Console and Network screenshots if the issue is visual or loading-related.'
        ],
        merchantAngle: 'The scanner did not find a clear storefront signal yet, so we need to continue with the normal checklist.',
        internalNote: 'No diagnostic rule matched strongly.',
        escalation: 'Escalate only after checklist evidence is collected.',
        devEscalationNeeded: false,
        accessNeeded: !!(app && app.access && app.access.length)
      });
    }

    sortDiagnostics(findings);

    var top = findings[0];
    return {
      appName: app ? app.name : 'No app selected',
      issueLabel: issue ? issue.label : 'No issue selected',
      scannedUrl: (((report || {}).meta || {}).url) || '',
      scannedAt: (((report || {}).meta || {}).scannedAt) || '',
      summary: top.summary,
      likelyCause: top.cause,
      confidence: top.confidence,
      rootCauseCategory: top.rootCauseCategory,
      evidence: top.evidence || [],
      nextSteps: top.nextSteps || [],
      snippets: getSuggestedSnippets(appId, issue, top),
      merchantAngle: top.merchantAngle,
      internalNote: top.internalNote,
      escalation: top.escalation,
      devEscalationNeeded: top.devEscalationNeeded,
      accessNeeded: top.accessNeeded,
      findings: findings
    };
  }

  function formatScannerAnalysis(analysis) {
    if (!analysis) return '';
    var parts = [];
    parts.push('=== STOREFRONT SCANNER DIAGNOSTIC SUMMARY ===');
    parts.push('APP: ' + analysis.appName);
    parts.push('ISSUE: ' + analysis.issueLabel);
    if (analysis.scannedUrl) parts.push('SCANNED URL: ' + analysis.scannedUrl);
    if (analysis.scannedAt) parts.push('SCANNED AT: ' + analysis.scannedAt);
    parts.push('\nSUMMARY: ' + analysis.summary);
    parts.push('CONFIDENCE: ' + analysis.confidence);
    parts.push('LIKELY ROOT CAUSE CATEGORY: ' + analysis.rootCauseCategory);
    parts.push('ACCESS NEEDED: ' + (analysis.accessNeeded ? 'Yes' : 'No'));

    if (analysis.evidence.length) {
      parts.push('\n--- EVIDENCE ---');
      analysis.evidence.forEach(function (item) { parts.push('  - ' + item); });
    }

    if (analysis.nextSteps.length) {
      parts.push('\n--- NEXT STEPS ---');
      analysis.nextSteps.forEach(function (item) { parts.push('  - ' + item); });
    }

    if (analysis.snippets.length) {
      parts.push('\n--- SUGGESTED SNIPPET / FIX ---');
      analysis.snippets.forEach(function (item) {
        parts.push('  - ' + item.id + ': ' + item.label + ' (' + item.type + ')');
      });
    }

    parts.push('\nMERCHANT REPLY ANGLE: ' + analysis.merchantAngle);
    parts.push('INTERNAL NOTE: ' + analysis.internalNote);
    if (analysis.devEscalationNeeded) {
      parts.push('DEV ESCALATION SUMMARY: ' + analysis.escalation);
    }

    if (analysis.findings.length > 1) {
      parts.push('\n--- OTHER SIGNALS ---');
      analysis.findings.slice(1).forEach(function (finding) {
        parts.push('  - ' + finding.label + ' (' + finding.confidence + ', ' + finding.rootCauseCategory + ')');
      });
    }

    return parts.join('\n');
  }

  function renderScannerResults() {
    var container = el('scanner-results');
    if (!container) return;

    var analysis = state.scannerAnalysis;
    if (!analysis) {
      container.innerHTML = '<p class="placeholder-msg">Paste a scanner report and analyze it to see likely cause, evidence, next steps, snippets, reply angle, internal note, and escalation guidance.</p>';
      return;
    }

    var evidenceHtml = (analysis.evidence || []).map(function (item) {
      return '<li>' + escapeHtml(item) + '</li>';
    }).join('');
    var stepsHtml = (analysis.nextSteps || []).map(function (item) {
      return '<li>' + escapeHtml(item) + '</li>';
    }).join('');
    var snippetsHtml = (analysis.snippets || []).length
      ? analysis.snippets.map(function (item) {
        return '<li><code>' + escapeHtml(item.id) + '</code> - ' + escapeHtml(item.label) + ' <span class="scanner-confidence">' + escapeHtml(item.type) + '</span></li>';
      }).join('')
      : '<li>No direct snippet match. Use the selected issue checklist.</li>';
    var otherFindingsHtml = (analysis.findings || []).slice(1).map(function (finding) {
      return '<li>' + escapeHtml(finding.label) + ' <span class="scanner-confidence">' + escapeHtml(finding.confidence) + ' / ' + escapeHtml(finding.rootCauseCategory) + '</span></li>';
    }).join('');
    var escalationHtml = analysis.devEscalationNeeded
      ? '<h4>Dev escalation summary</h4><p>' + escapeHtml(analysis.escalation) + '</p>'
      : '';

    container.innerHTML =
      '<div class="scanner-result-top">' +
      '<span class="chip chip-theme">' + escapeHtml(analysis.confidence) + ' confidence</span>' +
      '<span class="scanner-access">Category: ' + escapeHtml(analysis.rootCauseCategory) + '</span>' +
      '<span class="scanner-access">Access needed: ' + (analysis.accessNeeded ? 'Yes' : 'No') + '</span>' +
      '</div>' +
      '<h4>Summary</h4>' +
      '<p>' + escapeHtml(analysis.summary) + '</p>' +
      '<h4>Evidence</h4>' +
      '<ul>' + evidenceHtml + '</ul>' +
      '<h4>Likely root cause category</h4>' +
      '<p>' + escapeHtml(analysis.rootCauseCategory) + '</p>' +
      '<h4>Recommended next steps</h4>' +
      '<ul>' + stepsHtml + '</ul>' +
      '<h4>Suggested snippet / fix</h4>' +
      '<ul>' + snippetsHtml + '</ul>' +
      '<h4>Suggested merchant reply angle</h4>' +
      '<p>' + escapeHtml(analysis.merchantAngle) + '</p>' +
      '<h4>Internal note</h4>' +
      '<p>' + escapeHtml(analysis.internalNote) + '</p>' +
      escalationHtml +
      (otherFindingsHtml ? '<h4>Other signals</h4><ul>' + otherFindingsHtml + '</ul>' : '');
  }

  function renderScannerError(message) {
    var container = el('scanner-results');
    if (!container) return;
    container.innerHTML =
      '<div class="scanner-error">' +
      '<strong>Scanner report could not be analyzed.</strong>' +
      '<p>' + escapeHtml(message) + '</p>' +
      '</div>';
  }

  function analyzeScannerInput() {
    var input = el('scanner-json-input');
    var raw = input ? input.value.trim() : '';
    if (!raw) {
      renderScannerError('Paste the scanner JSON report first.');
      return false;
    }
    try {
      state.scannerReport = JSON.parse(raw);
      state.scannerAnalysis = analyzeScannerReport(state.scannerReport);
      renderScannerResults();
      return true;
    } catch (err) {
      state.scannerReport = null;
      state.scannerAnalysis = null;
      renderScannerError('Invalid JSON: ' + err.message);
      return false;
    }
  }

  function initScannerPanel() {
    var script = getScannerScript();
    var preview = el('scanner-script-preview');
    var copyBtn = el('copy-scanner-script');
    var refreshBtn = el('refresh-scanner-panel');
    var analyzeBtn = el('analyze-scanner-report');
    var copySummaryBtn = el('copy-diagnostic-summary');
    var copyPackageBtn = el('copy-troubleshooting-package');

    if (preview) preview.textContent = script;

    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        copyText(script, copyBtn);
      });
    }

    if (refreshBtn) {
      refreshBtn.addEventListener('click', function () {
        var latestScript = getScannerScript();
        var input = el('scanner-json-input');
        if (preview) preview.textContent = latestScript;
        if (!input || !input.value.trim()) {
          state.scannerReport = null;
          state.scannerAnalysis = null;
          renderScannerResults();
          return;
        }
        analyzeScannerInput();
      });
    }

    if (analyzeBtn) {
      analyzeBtn.addEventListener('click', function () {
        analyzeScannerInput();
      });
    }

    if (copySummaryBtn) {
      copySummaryBtn.addEventListener('click', function () {
        copyText(formatScannerAnalysis(state.scannerAnalysis), copySummaryBtn);
      });
    }

    if (copyPackageBtn) {
      copyPackageBtn.addEventListener('click', function () {
        copyText(buildFullPackage(), copyPackageBtn);
      });
    }
  }

  // ---- Wire up copy buttons ---------------------------------

  function wireUpCopyButtons(root) {
    qsa('[data-copy-text]', root).forEach(function (btn) {
      // Remove old listener by cloning
      var fresh = btn.cloneNode(true);
      btn.parentNode.replaceChild(fresh, btn);
      fresh.addEventListener('click', function () {
        copyText(fresh.getAttribute('data-copy-text'), fresh);
      });
    });
  }

  // ---- Copy Full Package ------------------------------------

  function buildFullPackage() {
    var app = getApp(state.selectedAppId);
    var issue = getIssue(state.selectedIssueId);
    var notes = (el('internal-notes') || {}).value || '';

    var parts = [];

    parts.push('=== ESSENTIAL SHOPIFY SUPPORT PACKAGE ===\n');

    if (app) {
      parts.push('APP: ' + app.name);
    }

    if (issue) {
      parts.push('ISSUE: ' + issue.label);
      parts.push('STATUS: ' + issue.status);
    }

    if (app && app.access && app.access.length) {
      parts.push('\n--- REQUIRED ACCESS ---');
      app.access.forEach(function (a) { parts.push('  • ' + a); });
    }

    if (issue) {
      var checklistItems = getChecklist(issue.checklistId);
      if (checklistItems.length) {
        parts.push('\n--- INVESTIGATION CHECKLIST ---');
        checklistItems.forEach(function (item) { parts.push('[ ] ' + item); });
      }

      if (issue.causes && issue.causes.length) {
        parts.push('\n--- LIKELY CAUSES ---');
        issue.causes.forEach(function (c) { parts.push('  • ' + c); });
      }

      if (issue.fixes && issue.fixes.length) {
        parts.push('\n--- RECOMMENDED FIXES ---');
        issue.fixes.forEach(function (f) { parts.push('  • ' + f); });
      }
    }

    if (app && app.consoleKey) {
      parts.push('\n--- CONSOLE COMMAND ---');
      parts.push(app.consoleKey);
    }

    if (issue && issue.macroId) {
      var macro = getMacro(issue.macroId);
      if (macro) {
        parts.push('\n--- REPLY TEMPLATE: ' + macro.label + ' ---');
        parts.push(applyMacroPlaceholders(macro.body));
      }
    }

    if (app) {
      var appUpdates = (state.updates || []).filter(function (update) {
        return update.appId === app.id;
      });
      if (appUpdates.length) {
        parts.push('\n--- APP UPDATES ---');
        appUpdates.forEach(function (update) {
          parts.push(update.title + ': ' + update.body);
        });
      }
    }

    if (notes.trim()) {
      parts.push('\n--- INTERNAL NOTES ---');
      parts.push(notes.trim());
    }

    if (state.scannerAnalysis) {
      parts.push('\n' + formatScannerAnalysis(state.scannerAnalysis));
    }

    return parts.join('\n');
  }

  // ---- Actions ----------------------------------------------

  function selectApp(appId) {
    state.selectedAppId = appId;
    state.selectedIssueId = null;
    state.snippetFilterApp = appId;
    state.ticketFilterApp = appId;
    state.ticketFilterIssue = 'all';
    state.updateFilterApp = appId;
    if (state.scannerReport) {
      state.scannerAnalysis = analyzeScannerReport(state.scannerReport);
    }
    renderAll();
    renderScannerResults();
    renderSnippetFilters();
    renderTicketFilters();
    renderSnippetsPanel();
    renderTicketsPanel();
    renderUpdatesPanel();
    activateTab('workflow');
    // Scroll main panel to top
    var main = el('main-panel');
    if (main) main.scrollTop = 0;
  }

  function selectIssue(issueId) {
    state.selectedIssueId = issueId;
    if (state.scannerReport) {
      state.scannerAnalysis = analyzeScannerReport(state.scannerReport);
      renderScannerResults();
    }
    renderFeatureRequestPanel();
    renderIssueDetail();
    renderMacroList();
  }

  function renderAll() {
    renderAppList();
    renderIssueSelector();
    renderAppHeader();
    renderAccess();
    renderFeatureRequestPanel();
    renderIssueDetail();
    renderWorkflowSnippets();
    renderMacroList();
    renderEntryFormOptions();
    renderUpdatesPanel();
  }

  // ---- Search and filter ------------------------------------

  function initLocalData() {
    state.customApps = loadStoredArray(STORAGE_KEYS.apps);
    state.customTickets = loadStoredArray(STORAGE_KEYS.tickets);
    state.updates = loadStoredArray(STORAGE_KEYS.updates);
  }

  function openModal(id) {
    var modal = el(id);
    if (!modal) return;

    renderEntryFormOptions();
    if (state.selectedAppId) {
      var ticketApp = el('new-ticket-app');
      var updateApp = el('new-update-app');
      if (id === 'ticket-modal' && ticketApp) {
        ticketApp.value = state.selectedAppId;
        renderEntryFormOptions();
      }
      if (id === 'update-modal' && updateApp) {
        updateApp.value = state.selectedAppId;
      }
    }

    modal.hidden = false;
    document.body.classList.add('modal-open');
    var firstField = qs('input, select, textarea, button', modal);
    if (firstField) firstField.focus();
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
  }

  function closeAllModals() {
    qsa('.modal-backdrop').forEach(closeModal);
  }

  function refreshDataViews() {
    renderAppList();
    renderSnippetFilters();
    renderTicketFilters();
    renderEntryFormOptions();
    renderSnippetsPanel();
    renderTicketsPanel();
    renderUpdatesPanel();
    renderMacroList();
  }

  function initEntryForms() {
    var addAppForm = el('add-app-form');
    if (addAppForm) {
      addAppForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = el('new-app-name');
        var name = input ? input.value.trim() : '';
        if (!name) return;

        var ids = getApps().map(function (app) { return app.id; });
        var id = uniqueId('', name, ids);
        state.customApps.push({
          id: id,
          name: name,
          slug: id,
          consoleKey: null,
          access: ['Themes', 'Edit theme code', 'Manage and install apps and channels']
        });
        saveStoredArray(STORAGE_KEYS.apps, state.customApps);
        input.value = '';
        refreshDataViews();
        selectApp(id);
      });
    }

    var ticketApp = el('new-ticket-app');
    if (ticketApp) {
      ticketApp.addEventListener('change', renderEntryFormOptions);
    }

    var addTicketForm = el('add-ticket-form');
    if (addTicketForm) {
      addTicketForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var title = (el('new-ticket-title') || {}).value || '';
        var appId = (el('new-ticket-app') || {}).value || '';
        var issueId = (el('new-ticket-issue') || {}).value || '';
        var tags = ((el('new-ticket-tags') || {}).value || '').split(',').map(function (tag) {
          return tag.trim();
        }).filter(Boolean);

        var ticket = {
          id: uniqueId('ticket', title, getTickets().map(function (t) { return t.id; })),
          title: title.trim(),
          appId: appId,
          issueId: issueId,
          tags: tags,
          customerSummary: ((el('new-ticket-summary') || {}).value || '').trim(),
          diagnosis: ((el('new-ticket-diagnosis') || {}).value || '').trim(),
          resolution: ((el('new-ticket-resolution') || {}).value || '').trim(),
          reply: ((el('new-ticket-reply') || {}).value || '').trim(),
          source: 'Local entry'
        };

        if (!ticket.title || !ticket.appId || !ticket.issueId || !ticket.customerSummary || !ticket.diagnosis || !ticket.resolution || !ticket.reply) return;

        state.customTickets.unshift(ticket);
        saveStoredArray(STORAGE_KEYS.tickets, state.customTickets);
        addTicketForm.reset();
        renderEntryFormOptions();
        renderTicketsPanel();
        closeAllModals();
      });
    }

    var addUpdateForm = el('add-update-form');
    if (addUpdateForm) {
      addUpdateForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var title = ((el('new-update-title') || {}).value || '').trim();
        var appId = (el('new-update-app') || {}).value || '';
        var body = ((el('new-update-body') || {}).value || '').trim();
        if (!title || !appId || !body) return;

        state.updates.unshift({
          id: uniqueId('update', title, state.updates.map(function (u) { return u.id; })),
          title: title,
          appId: appId,
          body: body,
          createdAt: new Date().toLocaleDateString()
        });
        saveStoredArray(STORAGE_KEYS.updates, state.updates);
        addUpdateForm.reset();
        renderEntryFormOptions();
        renderUpdatesPanel();
        closeAllModals();
      });
    }
  }

  function initSearchAndFilters() {
    var searchBox = el('snippet-search');
    if (searchBox) {
      searchBox.addEventListener('input', function () {
        state.snippetSearch = this.value;
        renderSnippetsPanel();
      });
    }

    var filterApp = el('filter-app');
    if (filterApp) {
      filterApp.addEventListener('change', function () {
        state.snippetFilterApp = this.value;
        renderSnippetsPanel();
      });
    }

    var filterType = el('filter-type');
    if (filterType) {
      filterType.addEventListener('change', function () {
        state.snippetFilterType = this.value;
        renderSnippetsPanel();
      });
    }

    var macroSearch = el('macro-search');
    if (macroSearch) {
      macroSearch.addEventListener('input', function () {
        state.macroSearch = this.value;
        renderMacroList();
      });
    }

    var macroFilter = el('macro-filter');
    if (macroFilter) {
      macroFilter.addEventListener('change', function () {
        state.macroFilter = this.value;
        renderMacroList();
      });
    }

    var ticketSearch = el('ticket-search');
    if (ticketSearch) {
      ticketSearch.addEventListener('input', function () {
        state.ticketSearch = this.value;
        renderTicketsPanel();
      });
    }

    var ticketFilterApp = el('ticket-filter-app');
    if (ticketFilterApp) {
      ticketFilterApp.addEventListener('change', function () {
        state.ticketFilterApp = this.value;
        state.ticketFilterIssue = 'all';
        renderTicketFilters();
        renderTicketsPanel();
      });
    }

    var ticketFilterIssue = el('ticket-filter-issue');
    if (ticketFilterIssue) {
      ticketFilterIssue.addEventListener('change', function () {
        state.ticketFilterIssue = this.value;
        renderTicketsPanel();
      });
    }

    var updateFilterApp = el('update-filter-app');
    if (updateFilterApp) {
      updateFilterApp.addEventListener('change', function () {
        state.updateFilterApp = this.value;
        renderUpdatesPanel();
      });
    }
  }

  // ---- Tab switching ----------------------------------------

  function activateTab(target) {
    qsa('.tab-btn').forEach(function (tab) {
      tab.classList.toggle('active', tab.getAttribute('data-tab') === target);
    });

    qsa('.tab-panel').forEach(function (panel) {
      panel.classList.toggle('active', panel.id === 'tab-' + target);
    });
  }

  function initTabs() {
    var tabs = qsa('.tab-btn');

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = this.getAttribute('data-tab');
        activateTab(target);
      });
    });
  }

  function initModals() {
    document.addEventListener('click', function (e) {
      var openBtn = e.target.closest('[data-open-modal]');
      if (openBtn) {
        openModal(openBtn.getAttribute('data-open-modal'));
        return;
      }

      if (e.target.matches('[data-close-modal]')) {
        closeModal(e.target.closest('.modal-backdrop'));
        return;
      }

      if (e.target.classList && e.target.classList.contains('modal-backdrop')) {
        closeModal(e.target);
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAllModals();
    });
  }

  // ---- Internal notes ---------------------------------------

  function initInternalNotes() {
    var notesEl = el('internal-notes');
    if (notesEl) {
      notesEl.addEventListener('input', function () {
        state.internalNotes = this.value;
      });
    }

    var clearBtn = el('clear-notes');
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        var notesEl = el('internal-notes');
        if (notesEl) notesEl.value = '';
        state.internalNotes = '';
      });
    }

    var copyNotesBtn = el('copy-notes');
    if (copyNotesBtn) {
      copyNotesBtn.addEventListener('click', function () {
        var notesEl = el('internal-notes');
        copyText((notesEl || {}).value || '', copyNotesBtn);
      });
    }
  }

  // ---- Copy full package button ------------------------------

  function initCopyPackage() {
    var btn = el('copy-full-package');
    if (btn) {
      btn.addEventListener('click', function () {
        var text = buildFullPackage();
        copyText(text, btn);
      });
    }
  }

  // ---- Global search (header) -------------------------------

  function initGlobalSearch() {
    var input = el('global-search');
    if (!input) return;

    input.addEventListener('input', function () {
      var q = this.value.toLowerCase().trim();
      if (!q) {
        el('global-search-results') && (el('global-search-results').innerHTML = '');
        return;
      }

      var matchedIssues = [], matchedSnippets = [], matchedMacros = [], matchedTickets = [];

      // Issues: match label, causes, or fixes
      (window.ESSENTIAL_ISSUES || []).forEach(function (i) {
        var inLabel  = i.label.toLowerCase().includes(q);
        var inCauses = (i.causes || []).some(function (c) { return c.toLowerCase().includes(q); });
        var inFixes  = (i.fixes || []).some(function (f) { return f.toLowerCase().includes(q); });
        if (inLabel || inCauses || inFixes) matchedIssues.push(i);
      });

      // Snippets: match label, code, description, or tags
      (window.ESSENTIAL_SNIPPETS || []).forEach(function (s) {
        if (s.label.toLowerCase().includes(q) ||
            s.code.toLowerCase().includes(q) ||
            (s.description || '').toLowerCase().includes(q) ||
            (s.tags || []).some(function (t) { return t.toLowerCase().includes(q); })) {
          matchedSnippets.push(s);
        }
      });

      // Macros: match label, description, or body
      (window.ESSENTIAL_MACROS || []).forEach(function (m) {
        if (m.label.toLowerCase().includes(q) ||
            (m.description || '').toLowerCase().includes(q) ||
            m.body.toLowerCase().includes(q)) {
          matchedMacros.push(m);
        }
      });

      // Ticket references: match title, tags, summary, diagnosis, resolution, or sample reply
      getTickets().forEach(function (ticket) {
        if (getTicketSearchText(ticket).includes(q)) matchedTickets.push(ticket);
      });

      renderGlobalSearchResults(matchedIssues, matchedSnippets, matchedMacros, matchedTickets, q);
    });
  }

  function renderGlobalSearchResults(issues, snippets, macros, tickets, q) {
    var container = el('global-search-results');
    if (!container) return;

    if (!issues.length && !snippets.length && !macros.length && !tickets.length) {
      container.innerHTML = '<div class="search-result-empty">No results for "' + escapeHtml(q) + '"</div>';
      return;
    }

    var html = '';

    if (issues.length) {
      html += '<div class="search-result-group-label">Issues</div>';
      html += issues.slice(0, 5).map(function (i) {
        return '<div class="search-result-item search-result-issue" data-issue-id="' + escapeHtml(i.id) + '">' +
          statusChip(i.status) +
          '<span class="search-result-label">' + escapeHtml(i.label) + '</span>' +
          '</div>';
      }).join('');
    }

    if (snippets.length) {
      html += '<div class="search-result-group-label">Snippets</div>';
      html += snippets.slice(0, 4).map(function (s) {
        return '<div class="search-result-item">' +
          '<span class="snippet-type-badge type-' + s.type + '">' + typeLabel(s.type) + '</span>' +
          '<span class="search-result-label">' + escapeHtml(s.label) + '</span>' +
          '<button class="btn-copy btn-xs" data-copy-text="' + escapeHtml(s.code) + '">Copy</button>' +
          '</div>';
      }).join('');
    }

    if (macros.length) {
      html += '<div class="search-result-group-label">Reply Templates</div>';
      html += macros.slice(0, 3).map(function (m) {
        return '<div class="search-result-item">' +
          '<span class="snippet-type-badge type-macro">Reply</span>' +
          '<span class="search-result-label">' + escapeHtml(m.label) + '</span>' +
          '<button class="btn-copy btn-xs" data-copy-text="' + escapeHtml(applyMacroPlaceholders(m.body)) + '">Copy</button>' +
          '</div>';
      }).join('');
    }

    if (tickets.length) {
      html += '<div class="search-result-group-label">Ticket References</div>';
      html += tickets.slice(0, 4).map(function (ticket) {
        return '<div class="search-result-item search-result-ticket" data-ticket-app-id="' + escapeHtml(ticket.appId) + '" data-ticket-issue-id="' + escapeHtml(ticket.issueId) + '">' +
          '<span class="snippet-type-badge type-macro">Ticket</span>' +
          '<span class="search-result-label">' + escapeHtml(ticket.title) + '</span>' +
          '</div>';
      }).join('');
    }

    container.innerHTML = html;
    wireUpCopyButtons(container);

    qsa('.search-result-issue', container).forEach(function (item) {
      item.addEventListener('click', function () {
        var issueId = this.getAttribute('data-issue-id');
        selectIssue(issueId);
        // Switch to workflow tab
        var workflowTab = qs('[data-tab="workflow"]');
        if (workflowTab) workflowTab.click();
        container.innerHTML = '';
        document.getElementById('global-search').value = '';
      });
    });

    qsa('.search-result-ticket', container).forEach(function (item) {
      item.addEventListener('click', function () {
        state.ticketFilterApp = this.getAttribute('data-ticket-app-id') || 'all';
        state.ticketFilterIssue = this.getAttribute('data-ticket-issue-id') || 'all';
        state.ticketSearch = '';
        var ticketSearch = el('ticket-search');
        if (ticketSearch) ticketSearch.value = '';
        renderTicketFilters();
        renderTicketsPanel();
        var ticketsTab = qs('[data-tab="tickets"]');
        if (ticketsTab) ticketsTab.click();
        container.innerHTML = '';
        document.getElementById('global-search').value = '';
      });
    });
  }

  // ---- Boot -------------------------------------------------

  function init() {
    initLocalData();
    renderSnippetFilters();
    renderTicketFilters();
    renderAll();
    renderSnippetsPanel();
    renderTicketsPanel();
    renderUpdatesPanel();
    initTabs();
    initModals();
    initEntryForms();
    initSearchAndFilters();
    initInternalNotes();
    initCopyPackage();
    initGlobalSearch();
    initScannerPanel();

    // Close global search results on outside click
    document.addEventListener('click', function (e) {
      var resultsEl = el('global-search-results');
      var searchEl = el('global-search');
      if (resultsEl && searchEl && !searchEl.contains(e.target) && !resultsEl.contains(e.target)) {
        resultsEl.innerHTML = '';
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
