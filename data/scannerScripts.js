// ============================================================
// STOREFRONT SCANNER SCRIPTS
// Copy-paste scripts for Shopify storefront DevTools Console use.
// Keep scripts read-only: no mutations, no cart changes, no Admin API.
// ============================================================

window.ESSENTIAL_SCANNER_SCRIPTS = {
  storefront: {
    id: 'essential-shopify-storefront-scanner',
    name: 'Essential Shopify Storefront Scanner',
    schemaVersion: '1.0',
    description: 'Read-only Shopify storefront scanner for Essential Apps support diagnostics.',
    code: `(async function EssentialShopifyStorefrontScanner() {
  'use strict';

  var runtimeErrors = [];
  var warnings = [];
  var startTime = Date.now();

  function onWindowError(event) {
    runtimeErrors.push({
      source: 'window.error',
      message: event && event.message ? String(event.message) : 'Unknown window error',
      stack: event && event.error && event.error.stack ? String(event.error.stack).slice(0, 800) : null
    });
  }

  function onUnhandledRejection(event) {
    var reason = event && event.reason;
    runtimeErrors.push({
      source: 'window.unhandledrejection',
      message: reason && reason.message ? String(reason.message) : String(reason),
      stack: reason && reason.stack ? String(reason.stack).slice(0, 800) : null
    });
  }

  window.addEventListener('error', onWindowError);
  window.addEventListener('unhandledrejection', onUnhandledRejection);

  function addRuntimeError(source, err) {
    runtimeErrors.push({
      source: source,
      message: err && err.message ? String(err.message) : String(err),
      stack: err && err.stack ? String(err.stack).slice(0, 800) : null
    });
  }

  function addWarning(message) {
    warnings.push(String(message));
  }

  function safeRead(source, fn, fallback) {
    try {
      return fn();
    } catch (err) {
      addRuntimeError(source, err);
      return fallback;
    }
  }

  function safeType(value) {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';
    return typeof value;
  }

  function safeSummary(value) {
    var type = safeType(value);
    var summary = { type: type };

    if (type === 'array') {
      summary.length = value.length;
      summary.firstItemType = value.length ? safeType(value[0]) : null;
      return summary;
    }

    if (type === 'object') {
      var keys = Object.keys(value || {});
      summary.keyCount = keys.length;
      summary.sampleKeys = keys.slice(0, 12);
      return summary;
    }

    if (type === 'string') {
      summary.length = value.length;
      summary.preview = value.slice(0, 160);
      return summary;
    }

    if (type === 'number' || type === 'boolean') {
      summary.value = value;
    }

    return summary;
  }

  function count(selector) {
    return safeRead('count ' + selector, function () {
      return document.querySelectorAll(selector).length;
    }, 0);
  }

  function firstTextMatches(selector, matcher) {
    return safeRead('text match ' + selector, function () {
      return Array.from(document.querySelectorAll(selector)).filter(function (node) {
        return matcher((node.textContent || node.value || '').trim());
      }).length;
    }, 0);
  }

  function getShopifyValue(path) {
    return safeRead('Shopify.' + path, function () {
      var ref = window.Shopify;
      path.split('.').forEach(function (part) {
        ref = ref && ref[part];
      });
      return ref === undefined ? null : ref;
    }, null);
  }

  function likelyPageType() {
    if (/\\/products\\//.test(location.pathname)) return 'product';
    if (/\\/collections\\//.test(location.pathname)) return 'collection';
    if (/\\/cart\\/?$/.test(location.pathname)) return 'cart';
    if (count('form[action*="/cart/add"]')) return 'product-like';
    return 'unknown';
  }

  function collectEssentialGlobals() {
    var names = [
      'essentialCountdownTimerConfigs',
      'essentialOrderValueBoosterConfigs',
      'essentialBannersConfigs',
      'essentialAnnouncementConfigs',
      'essentialUpsellConfigs',
      'essentialLoyaltyConfig',
      'essentialPreorderConfigs',
      'essentialCartConfigs',
      'essentialEstimetedDeliveryConfigs',
      'essentialCartApi'
    ];
    var out = {};
    names.forEach(function (name) {
      out[name] = {
        exists: Object.prototype.hasOwnProperty.call(window, name),
        type: safeType(window[name]),
        summary: Object.prototype.hasOwnProperty.call(window, name) ? safeSummary(window[name]) : null
      };
    });
    return out;
  }

  function collectScripts() {
    var scripts = safeRead('scripts', function () {
      return Array.from(document.scripts || []).map(function (script) {
        var src = script.src || '';
        var inlineText = script.src ? '' : (script.textContent || '').slice(0, 400);
        var lower = (src + ' ' + inlineText).toLowerCase();
        return {
          src: src,
          type: script.type || '',
          async: !!script.async,
          defer: !!script.defer,
          isShopifyExtension: src.indexOf('cdn.shopify.com/extensions') !== -1,
          isEssential: lower.indexOf('essential') !== -1,
          isRockit: lower.indexOf('rockit') !== -1,
          isAppEmbed: lower.indexOf('app-embed') !== -1 || lower.indexOf('app embed') !== -1,
          isAppBlock: lower.indexOf('app-block') !== -1 || lower.indexOf('app block') !== -1
        };
      });
    }, []);

    var possibleUpsellScriptTypeIssue = scripts.some(function (script) {
      var src = (script.src || '').toLowerCase();
      return src.indexOf('upsell') !== -1 && script.type && script.type !== 'text/javascript' && script.type !== 'module';
    });

    return {
      total: scripts.length,
      shopifyExtensionScripts: scripts.filter(function (script) { return script.isShopifyExtension; }).length,
      essentialScripts: scripts.filter(function (script) { return script.isEssential; }).length,
      rockitScripts: scripts.filter(function (script) { return script.isRockit; }).length,
      appEmbedScripts: scripts.filter(function (script) { return script.isAppEmbed; }).length,
      appBlockScripts: scripts.filter(function (script) { return script.isAppBlock; }).length,
      possibleUpsellScriptTypeIssue: possibleUpsellScriptTypeIssue,
      items: scripts.filter(function (script) {
        return script.isShopifyExtension || script.isEssential || script.isRockit || script.isAppEmbed || script.isAppBlock;
      }).slice(0, 80)
    };
  }

  var placementSelectors = [
    '.essential-upsell-default-placement',
    '.essential-upsell-side-cart-top',
    '.essential-upsell-side-cart-bottom',
    '.essential-upsell-frequently-bought-together-default-placement',
    '.essential-upsell-cross-sell-default-placement',
    '.essential-upsell-product-addon-block',
    '.essential-upsell-product-addon-default-placement',
    '.essential-upsell-product-addon-add-to-cart-button',
    '[data-essential-upsell-element]',
    '.essential-preorder-initial-prices-container',
    '.essential-preorder-initial-add-to-cart-button',
    '.essential-preorder-extra-add-to-cart-button',
    '.essential-preorder-initial-add-to-cart-text',
    '.essential-preorder-ignore-prevent-default',
    '.essential-preorder-skip-click-initial-add-to-cart-button',
    '.essential-preorder-product-page-badge-container',
    '.essential-preorder-bis-button-placement',
    '.essential-countdown-timer-placement',
    '.countdown-timer-block',
    '.essential-countdown-top-bar',
    '.countdown-timer-side-cart',
    '.essential_countdown_annoucement_bar_wrapper',
    '.essential_countdown_timer',
    '.order-value-booster-side-cart',
    '.order-value-booster-block',
    '.essential-free-shipping-bar',
    '.essential-order-value-booster-placement',
    '.free_shipping_card',
    '[class*="free_shipping_card"]',
    '[class*="free_shipping_card_wrapper"]',
    '[class*="free_shipping_card_progress"]',
    '.placement_side_cart',
    '.essential-announcement-bar-placement',
    '.essential-announcement-bar-side-cart',
    '.essential_annoucement_bar_wrapper',
    '.essential_annoucement_bar_glide__slide',
    '.essential-banners-default-placement',
    '.essential-banners-block-side-cart-top',
    '.essential-banners-block-side-cart-bottom',
    '[data-banner]',
    '.icon-block-container',
    '.essential-estimated-delivery-block-liquid',
    '.rockit-sales-manager-timer-embed',
    '.rockit-sales-manager-savings-widget-container',
    'a[href="#essential-loyalty-trigger"]',
    '[data-pp-anchor]',
    '.essential-cart-custom-add-to-cart-element'
  ];

  function collectPlacements() {
    var out = {};
    placementSelectors.forEach(function (selector) {
      out[selector] = count(selector);
    });
    return out;
  }

  function elementVisibility(node) {
    var style = window.getComputedStyle(node);
    var rect = node.getBoundingClientRect();
    var width = Math.round(rect.width);
    var height = Math.round(rect.height);
    var hasZeroSize = width === 0 || height === 0;
    return {
      display: style.display,
      visibility: style.visibility,
      opacity: style.opacity,
      position: style.position,
      zIndex: style.zIndex,
      width: width,
      height: height,
      overflow: style.overflow,
      hasZeroSize: hasZeroSize,
      isProbablyHidden: style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0 || hasZeroSize
    };
  }

  function collectVisibility() {
    var selectors = placementSelectors.concat([
      'form[action*="/cart/add"]',
      'form[action*="/cart"]',
      'button[type="submit"]',
      '[name="add"]',
      'button[name="add"]',
      'input[name="id"]',
      'select[name="id"]',
      '.shopify-payment-button'
    ]);
    var out = {};
    selectors.forEach(function (selector) {
      out[selector] = safeRead('visibility ' + selector, function () {
        return Array.from(document.querySelectorAll(selector)).slice(0, 3).map(function (node) {
          return elementVisibility(node);
        });
      }, []);
    });
    return out;
  }

  function hasSensitivePropertyKey(key) {
    return /email|phone|address|name|customer|token|secret|password/i.test(String(key));
  }

  function collectCart() {
    return fetch('/cart.js', { credentials: 'same-origin' })
      .then(function (res) {
        if (!res.ok) throw new Error('/cart.js returned ' + res.status);
        return res.json();
      })
      .then(function (cart) {
        return {
          fetchedCartJs: true,
          item_count: cart.item_count,
          total_price: cart.total_price,
          original_total_price: cart.original_total_price,
          total_discount: cart.total_discount,
          cart_level_discount_applications_count: (cart.cart_level_discount_applications || []).length,
          items_count: (cart.items || []).length,
          items: (cart.items || []).slice(0, 20).map(function (item) {
            var propertyKeys = Object.keys(item.properties || {}).filter(function (key) {
              return !hasSensitivePropertyKey(key);
            });
            return {
              product_title: item.product_title,
              variant_title: item.variant_title,
              quantity: item.quantity,
              original_price: item.original_price,
              final_price: item.final_price,
              line_price: item.line_price,
              final_line_price: item.final_line_price,
              total_discount: item.total_discount,
              line_level_discount_allocations_count: (item.line_level_discount_allocations || []).length,
              hasProperties: !!(item.properties && Object.keys(item.properties).length),
              propertyKeys: propertyKeys,
              hasEssentialUpsellProperties: propertyKeys.some(function (key) { return /essential.*upsell|upsell/i.test(key); }),
              hasEssentialPreorderProperties: propertyKeys.some(function (key) { return /essential.*preorder|preorder|presale/i.test(key); }),
              hasSellingPlanAllocation: !!item.selling_plan_allocation
            };
          })
        };
      })
      .catch(function (err) {
        addRuntimeError('fetch /cart.js', err);
        return { fetchedCartJs: false, error: err.message };
      });
  }

  function collectCartDrawer() {
    var api = window.essentialCartApi;
    var methodNames = api && typeof api === 'object'
      ? Object.keys(api).filter(function (key) { return typeof api[key] === 'function'; }).sort()
      : [];
    var out = {
      hasEssentialCartApi: !!api,
      availableMethodNames: methodNames,
      canReadCartData: false,
      item_count: null
    };

    if (api && typeof api.getCartData === 'function') {
      return Promise.resolve()
        .then(function () { return api.getCartData(); })
        .then(function (cart) {
          out.canReadCartData = true;
          out.item_count = cart && cart.item_count;
          return out;
        })
        .catch(function (err) {
          addRuntimeError('essentialCartApi.getCartData', err);
          return out;
        });
    }

    return Promise.resolve(out);
  }

  function collectProductTags() {
    return {
      essentialProductTags: Object.prototype.hasOwnProperty.call(window, 'essentialProductTags')
        ? safeSummary(window.essentialProductTags)
        : { exists: false }
    };
  }

  var report = {
    schemaVersion: '1.0',
    scannerName: 'Essential Shopify Storefront Scanner',
    meta: {
      scannedAt: new Date().toISOString(),
      url: location.href,
      hostname: location.hostname,
      pathname: location.pathname,
      title: document.title,
      userAgent: navigator.userAgent
    },
    shopify: {
      hasWindowShopify: !!window.Shopify,
      shopName: getShopifyValue('shop'),
      themeName: getShopifyValue('theme.name'),
      themeId: getShopifyValue('theme.id'),
      routes: getShopifyValue('routes'),
      moneyFormat: getShopifyValue('money_format'),
      currencyActive: getShopifyValue('currency.active')
    },
    page: {
      likelyPageType: likelyPageType(),
      productFormsFound: count('form[action*="/cart/add"]'),
      cartFormsFound: count('form[action*="/cart"]'),
      addToCartButtonsFound: count('[name="add"], button[name="add"], input[name="add"]') + firstTextMatches('button, input[type="submit"], a', function (text) {
        return /add\\s*(to)?\\s*cart|add to bag|buy now/i.test(text);
      }),
      checkoutButtonsFound: count('[name="checkout"], button[name="checkout"], input[name="checkout"], a[href*="/checkout"]'),
      variantInputsFound: count('input[name="id"], select[name="id"]'),
      productJsonScriptsFound: count('script[type="application/json"], script[type="application/ld+json"]')
    },
    product: {
      productAddForms: count('form[action*="/cart/add"]'),
      cartForms: count('form[action*="/cart"]'),
      submitButtons: count('button[type="submit"], input[type="submit"]'),
      variantIdInputs: count('input[name="id"], select[name="id"]'),
      addNameFields: count('[name="add"], button[name="add"], input[name="add"]'),
      commonAddToCartTextMatches: firstTextMatches('button, input[type="submit"], a', function (text) {
        return /add\\s*(to)?\\s*cart|add to bag|buy now/i.test(text);
      }),
      shopifyBuyButtonSelectors: count('.shopify-payment-button, .shopify-payment-button__button, .shopify-buy__btn')
    },
    essentialGlobals: collectEssentialGlobals(),
    scripts: collectScripts(),
    placements: collectPlacements(),
    visibility: collectVisibility(),
    cart: {},
    cartDrawer: {},
    productTags: collectProductTags(),
    runtimeErrors: runtimeErrors,
    warnings: warnings
  };

  report.cart = await collectCart();
  report.cartDrawer = await collectCartDrawer();
  window.removeEventListener('error', onWindowError);
  window.removeEventListener('unhandledrejection', onUnhandledRejection);
  report.runtimeErrors = runtimeErrors;
  report.warnings = warnings.concat([
    'Runtime errors include scanner execution only. Old Console or Network errors still need screenshots.',
    'Scanner is read-only. It does not add to cart, remove from cart, edit theme code, or call Shopify Admin APIs.',
    'Completed in ' + (Date.now() - startTime) + 'ms.'
  ]);

  var json = JSON.stringify(report, null, 2);
  console.log(json);

  try {
    await navigator.clipboard.writeText(json);
    console.log('Essential Shopify Storefront Scanner: report copied to clipboard.');
  } catch (err) {
    console.warn('Essential Shopify Storefront Scanner: copy failed. Manually copy the JSON above.', err);
  }

  return report;
})();`
  }
};
