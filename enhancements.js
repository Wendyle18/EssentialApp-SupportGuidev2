// ============================================================
// UI ENHANCEMENTS
// Sidebar ordering/removal and update detail cards.
// Loaded after the main app has rendered.
// ============================================================

(function () {
  'use strict';

  var STORAGE_KEYS = {
    appOrder: 'essentialSupport.appOrder',
    customApps: 'essentialSupport.customApps',
    customTickets: 'essentialSupport.customTickets',
    updates: 'essentialSupport.updates'
  };

  var isApplyingSidebarOrder = false;
  var draggedAppId = null;

  function el(id) {
    return document.getElementById(id);
  }

  function qsa(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function readArray(key) {
    try {
      var raw = localStorage.getItem(key);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      return [];
    }
  }

  function writeArray(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      // Keep the UI usable if browser storage is unavailable.
    }
  }

  function copyText(text, btn) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(function () {
      var old = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(function () { btn.textContent = old; }, 1400);
    });
  }

  function getAppLabel(item) {
    var label = item.querySelector('.app-item-label');
    return (label ? label.textContent : item.textContent).trim();
  }

  function getSortedItems(items) {
    var savedOrder = readArray(STORAGE_KEYS.appOrder);
    if (savedOrder.length) {
      var indexById = savedOrder.reduce(function (acc, id, index) {
        acc[id] = index;
        return acc;
      }, {});

      return items.slice().sort(function (a, b) {
        var aId = a.getAttribute('data-app-id');
        var bId = b.getAttribute('data-app-id');
        var aKnown = Object.prototype.hasOwnProperty.call(indexById, aId);
        var bKnown = Object.prototype.hasOwnProperty.call(indexById, bId);

        if (aKnown && bKnown) return indexById[aId] - indexById[bId];
        if (aKnown) return -1;
        if (bKnown) return 1;
        return getAppLabel(a).localeCompare(getAppLabel(b));
      });
    }

    return items.slice().sort(function (a, b) {
      return getAppLabel(a).localeCompare(getAppLabel(b));
    });
  }

  function persistCurrentOrder() {
    var list = el('app-list');
    if (!list) return;
    var order = qsa('.app-item', list).map(function (item) {
      return item.getAttribute('data-app-id');
    }).filter(Boolean);
    writeArray(STORAGE_KEYS.appOrder, order);
  }

  function isCustomApp(appId) {
    return readArray(STORAGE_KEYS.customApps).some(function (app) {
      return app && app.id === appId;
    });
  }

  function removeCustomApp(appId) {
    var app = readArray(STORAGE_KEYS.customApps).find(function (item) {
      return item && item.id === appId;
    });
    if (!app) return;

    if (!window.confirm('Delete "' + app.name + '" from recently added apps?')) return;

    writeArray(STORAGE_KEYS.customApps, readArray(STORAGE_KEYS.customApps).filter(function (item) {
      return item && item.id !== appId;
    }));
    writeArray(STORAGE_KEYS.customTickets, readArray(STORAGE_KEYS.customTickets).filter(function (ticket) {
      return ticket && ticket.appId !== appId;
    }));
    writeArray(STORAGE_KEYS.updates, readArray(STORAGE_KEYS.updates).filter(function (update) {
      return update && update.appId !== appId;
    }));
    writeArray(STORAGE_KEYS.appOrder, readArray(STORAGE_KEYS.appOrder).filter(function (id) {
      return id !== appId;
    }));

    window.location.reload();
  }

  function moveItem(item, direction) {
    var sibling = direction < 0 ? item.previousElementSibling : item.nextElementSibling;
    if (!sibling) return;

    if (direction < 0) {
      item.parentNode.insertBefore(item, sibling);
    } else {
      item.parentNode.insertBefore(sibling, item);
    }
    persistCurrentOrder();
  }

  function decorateAppItem(item) {
    var appId = item.getAttribute('data-app-id');
    if (!appId || item.querySelector('.app-item-label')) return;

    var label = item.textContent.trim();
    item.textContent = '';
    item.draggable = true;

    var labelSpan = document.createElement('span');
    labelSpan.className = 'app-item-label';
    labelSpan.textContent = label;
    item.appendChild(labelSpan);

    var controls = document.createElement('span');
    controls.className = 'app-item-controls';
    controls.innerHTML =
      '<button type="button" class="app-order-btn" data-move="up" title="Move up" aria-label="Move up">^</button>' +
      '<button type="button" class="app-order-btn" data-move="down" title="Move down" aria-label="Move down">v</button>';

    if (isCustomApp(appId)) {
      controls.innerHTML += '<button type="button" class="app-delete-btn" title="Delete app" aria-label="Delete app">x</button>';
    }

    item.appendChild(controls);

    controls.addEventListener('click', function (event) {
      event.stopPropagation();
      var target = event.target;
      if (target.matches('[data-move="up"]')) moveItem(item, -1);
      if (target.matches('[data-move="down"]')) moveItem(item, 1);
      if (target.matches('.app-delete-btn')) removeCustomApp(appId);
    });

    item.addEventListener('dragstart', function () {
      draggedAppId = appId;
      item.classList.add('dragging');
    });

    item.addEventListener('dragend', function () {
      draggedAppId = null;
      item.classList.remove('dragging');
      qsa('.app-item.drag-over').forEach(function (node) { node.classList.remove('drag-over'); });
      persistCurrentOrder();
    });

    item.addEventListener('dragover', function (event) {
      if (!draggedAppId || draggedAppId === appId) return;
      event.preventDefault();
      item.classList.add('drag-over');
    });

    item.addEventListener('dragleave', function () {
      item.classList.remove('drag-over');
    });

    item.addEventListener('drop', function (event) {
      var list = el('app-list');
      var dragged = list && list.querySelector('[data-app-id="' + draggedAppId + '"]');
      if (!dragged || dragged === item) return;

      event.preventDefault();
      item.classList.remove('drag-over');
      var rect = item.getBoundingClientRect();
      var afterMidpoint = event.clientY > rect.top + rect.height / 2;
      list.insertBefore(dragged, afterMidpoint ? item.nextSibling : item);
      persistCurrentOrder();
    });
  }

  function applySidebarOrder() {
    var list = el('app-list');
    if (!list || isApplyingSidebarOrder) return;

    isApplyingSidebarOrder = true;
    var sortedItems = getSortedItems(qsa('.app-item', list));
    sortedItems.forEach(decorateAppItem);

    sortedItems.forEach(function (item, index) {
      if (list.children[index] !== item) {
        list.insertBefore(item, list.children[index] || null);
      }
    });
    isApplyingSidebarOrder = false;
  }

  function ensureUpdateDetailModal() {
    if (el('update-detail-modal')) return;

    var modal = document.createElement('div');
    modal.className = 'modal-backdrop';
    modal.id = 'update-detail-modal';
    modal.hidden = true;
    modal.innerHTML =
      '<div class="modal-dialog update-detail-dialog" role="dialog" aria-modal="true" aria-labelledby="update-detail-title">' +
      '<div class="modal-header">' +
      '<div><h2 id="update-detail-title"></h2><p id="update-detail-meta" class="update-detail-meta"></p></div>' +
      '<button type="button" class="modal-close" data-update-detail-close aria-label="Close">&times;</button>' +
      '</div>' +
      '<div id="update-detail-body" class="update-detail-body"></div>' +
      '<button type="button" class="btn-secondary" id="copy-update-detail">Copy Update</button>' +
      '</div>';
    document.body.appendChild(modal);

    modal.addEventListener('click', function (event) {
      if (event.target === modal || event.target.matches('[data-update-detail-close]')) {
        modal.hidden = true;
        document.body.classList.remove('modal-open');
      }
    });

    el('copy-update-detail').addEventListener('click', function () {
      copyText((el('update-detail-body') || {}).textContent || '', this);
    });
  }

  function openUpdateDetail(card) {
    ensureUpdateDetailModal();

    var title = (card.querySelector('h3') || {}).textContent || 'Update';
    var meta = (card.querySelector('.ticket-card-top p') || {}).textContent || '';
    var body = (card.querySelector('.update-body') || {}).textContent || '';

    el('update-detail-title').textContent = title;
    el('update-detail-meta').textContent = meta;
    el('update-detail-body').innerHTML = escapeHtml(body).replace(/\n/g, '<br>');

    el('update-detail-modal').hidden = false;
    document.body.classList.add('modal-open');
  }

  function enhanceUpdatesGrid() {
    var container = el('updates-list');
    if (!container) return;

    container.classList.add('updates-grid');
    qsa('.update-card', container).forEach(function (card) {
      if (card.dataset.updateEnhanced === 'true') return;
      card.dataset.updateEnhanced = 'true';
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', 'Open update details');

      var copyButton = card.querySelector('[data-copy-text]');
      if (copyButton) {
        copyButton.addEventListener('click', function (event) {
          event.stopPropagation();
        });
      }

      card.addEventListener('click', function () {
        openUpdateDetail(card);
      });

      card.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openUpdateDetail(card);
        }
      });
    });
  }

  function injectStyles() {
    if (el('essential-enhancement-styles')) return;

    var style = document.createElement('style');
    style.id = 'essential-enhancement-styles';
    style.textContent = [
      '.app-item { display: flex; align-items: center; gap: 6px; min-height: 36px; }',
      '.app-item-label { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; }',
      '.app-item-controls { display: inline-flex; gap: 3px; opacity: 0; transition: opacity var(--ease); }',
      '.app-item:hover .app-item-controls, .app-item:focus-within .app-item-controls { opacity: 1; }',
      '.app-order-btn, .app-delete-btn { width: 22px; height: 22px; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-muted); cursor: pointer; font-size: 11px; line-height: 1; padding: 0; }',
      '.app-order-btn:hover, .app-delete-btn:hover { background: var(--accent-soft); color: var(--text); border-color: rgba(199, 253, 79, 0.55); }',
      '.app-delete-btn:hover { background: #fdf0f0; border-color: #e8b4b4; color: #9a3d3d; }',
      '.app-item.dragging { opacity: 0.48; }',
      '.app-item.drag-over { outline: 2px solid var(--accent); outline-offset: 2px; }',
      '#updates-list.updates-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px; }',
      '#updates-list.updates-grid .placeholder-msg { grid-column: 1 / -1; }',
      '.update-card { cursor: pointer; min-height: 168px; transition: border-color var(--ease), transform 0.12s ease; }',
      '.update-card:hover, .update-card:focus { border-color: rgba(199, 253, 79, 0.65); transform: translateY(-1px); outline: none; }',
      '.update-card .update-body { display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }',
      '.update-detail-meta { color: var(--text-muted); font-size: 12px; margin-top: 4px; }',
      '.update-detail-body { color: var(--text-secondary); font-size: 14px; line-height: 1.6; margin-bottom: 16px; white-space: normal; }',
      '.update-detail-dialog { width: min(640px, 100%); }',
      '@media (max-width: 900px) { .app-item-controls { opacity: 1; } .app-item { max-width: 280px; } }',
      '@media (max-width: 560px) { #updates-list.updates-grid { grid-template-columns: 1fr; } }'
    ].join('\n');
    document.head.appendChild(style);
  }

  function enhanceRenderedUi() {
    applySidebarOrder();
    enhanceUpdatesGrid();
  }

  function init() {
    injectStyles();
    ensureUpdateDetailModal();
    enhanceRenderedUi();

    var observer = new MutationObserver(enhanceRenderedUi);
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener('keydown', function (event) {
      var modal = el('update-detail-modal');
      if (event.key === 'Escape' && modal && !modal.hidden) {
        modal.hidden = true;
        document.body.classList.remove('modal-open');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(init, 0);
    });
  } else {
    setTimeout(init, 0);
  }
})();
