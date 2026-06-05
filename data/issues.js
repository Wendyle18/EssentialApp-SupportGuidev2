// ============================================================
// ISSUES DATA
// appIds: ['all']     = show for every app (generic issues)
// appIds: ['app-slug']  = show only when that app is selected
// appIds: ['app-a', 'app-b']  = show for both apps
//
// status: 'setup' | 'theme' | 'shopify-limit' | 'conflict' | 'needs-access' | 'needs-dev'
// fixes:       actionable steps agents can take to resolve (shown after Likely Causes)
// checklistId  must match a key in checklists.js
// macroId      must match an id in macros.js
// ============================================================

window.ESSENTIAL_ISSUES = [

  // ============================================================
  // GENERIC — show for all apps
  // ============================================================
  {
    id: 'not-showing',
    label: 'App / Widget Not Showing',
    appIds: ['all'],
    status: 'setup',
    causes: [
      'App embed block not enabled in theme customizer',
      'App block not added to correct template',
      'Placement div missing from theme file',
      'App is paused or inactive in dashboard',
      'Conflicting CSS from theme hiding the element'
    ],
    fixes: [
      'Online Store → Themes → Customize → App embeds → toggle the app ON → Save',
      'Add the app block to the correct template (product, collection, or cart) if required',
      'Confirm the app is active and not paused in the app dashboard',
      'Add the placement div from Snippets if the theme needs custom placement',
      'Inspect the widget in DevTools; apply a CSS override snippet if display:none is applied',
      'Test on Dawn or incognito with other app embeds temporarily off to isolate conflicts'
    ],
    checklistId: 'not-showing',
    macroId: 'app-embed-not-enabled'
  },
  {
    id: 'app-embed-not-enabled',
    label: 'App Embed Not Enabled',
    appIds: ['all'],
    status: 'setup',
    causes: [
      'Merchant never toggled the app embed on in Theme Customizer',
      'Theme was duplicated/switched and embed was not re-enabled',
      'App was re-installed but embed was not re-enabled'
    ],
    fixes: [
      'Theme Customizer → App embeds → find the app block → toggle ON → Save',
      'After a theme switch or reinstall, re-enable the embed on the live theme',
      'Hard refresh the storefront (Ctrl+Shift+R) and run the app console command to confirm load'
    ],
    checklistId: 'app-embed',
    macroId: 'app-embed-not-enabled'
  },
  {
    id: 'custom-placement',
    label: 'Custom Placement Needed',
    appIds: ['all'],
    status: 'theme',
    causes: [
      'Default placement not supported by this theme',
      'Merchant wants widget in a non-standard location',
      'Requires adding a placement div to theme Liquid files'
    ],
    fixes: [
      'Confirm the exact page and position the merchant wants (screenshot helps)',
      'Request collaborator access with theme edit permissions if needed',
      'Add the correct placement div from Snippets to the right Liquid template',
      'Save the theme and verify on the live storefront on desktop and mobile'
    ],
    checklistId: 'custom-placement',
    macroId: 'needs-collab-access'
  },
  {
    id: 'theme-conflict',
    label: 'Theme Conflict',
    appIds: ['all'],
    status: 'theme',
    causes: [
      'Theme CSS overrides app styles',
      'Theme JavaScript interferes with app scripts',
      'Theme uses conflicting class names or IDs',
      'Theme is heavily customized or headless'
    ],
    fixes: [
      'Reproduce on a Dawn theme preview to confirm it is theme-specific',
      'Inspect the widget in DevTools and note overriding CSS rules',
      'Apply the relevant CSS fix snippet from the Snippet Library',
      'Temporarily disable other app embeds to rule out script conflicts',
      'Escalate to dev with theme name, version, and screenshots if CSS cannot resolve it'
    ],
    checklistId: 'theme-conflict',
    macroId: 'third-party-conflict'
  },
  {
    id: 'third-party-conflict',
    label: 'Third-Party App Conflict',
    appIds: ['all'],
    status: 'conflict',
    causes: [
      'Another app modifies the same DOM elements',
      'Duplicate cart or drawer logic from another app',
      'Script loading order conflict',
      "Another app's CSS overrides"
    ],
    fixes: [
      'Ask for a list of recently installed apps and disable them one at a time to isolate',
      'Check the browser console for errors from other app scripts',
      'Test on a clean Dawn theme with only Essential apps enabled',
      'Document the conflicting app name and send the third-party conflict reply template'
    ],
    checklistId: 'third-party-conflict',
    macroId: 'third-party-conflict'
  },
  {
    id: 'grey-screen',
    label: 'App Loading Grey Screen',
    appIds: ['all'],
    status: 'needs-dev',
    causes: [
      'App iframe failed to load',
      'Browser extension blocking scripts',
      'Content Security Policy (CSP) blocking app',
      'Network or firewall issue on merchant side'
    ],
    fixes: [
      'Ask the merchant to test in an incognito window with extensions disabled',
      'Try a different browser and network (not corporate VPN if possible)',
      'Check Shopify status for incidents affecting admin or app iframes',
      'Escalate to dev with store URL, browser, and screenshot if grey screen persists in incognito'
    ],
    checklistId: 'grey-screen',
    macroId: 'grey-screen'
  },
  {
    id: 'needs-collab-access',
    label: 'Needs Collaborator Access',
    appIds: ['all'],
    status: 'needs-access',
    causes: [
      'Cannot diagnose without viewing theme files and app settings',
      'Need to check app embed status, theme code, or app configuration'
    ],
    fixes: [
      'List the exact collaborator permissions needed (see Required Access panel)',
      'Send the collaborator access reply template with the permission list',
      'Submit the request from Partners → store → Actions → Request access',
      'Pause investigation until the merchant approves access'
    ],
    checklistId: 'collab-access',
    macroId: 'needs-collab-access'
  },
  {
    id: 'needs-collab-code',
    label: 'Needs Collaborator Request Code',
    appIds: ['all'],
    status: 'needs-access',
    causes: [
      'Merchant has collaborator request code enabled',
      'Cannot send request without the 4-digit code from merchant'
    ],
    fixes: [
      'Ask the merchant for their 4-digit collaborator request code',
      'Direct them to Shopify Admin → Settings → Users and permissions → Collaborators',
      'Include the code when submitting the collaborator request in Partners'
    ],
    checklistId: 'collab-code',
    macroId: 'needs-collab-code'
  },
  {
    id: 'billing-refund',
    label: 'Billing / Refund Question',
    appIds: ['all'],
    status: 'setup',
    causes: [
      'Merchant charged after trial ended',
      'App was uninstalled but charge still active',
      'App credits not applied correctly',
      'Unexpected charge after plan change'
    ],
    fixes: [
      'Verify install date, trial end, and current billing in the Shopify app listing',
      'Confirm whether the merchant uninstalled and reinstalled (trial may not reset)',
      'Collect store URL, charge date, and amount for billing team escalation',
      'Send the billing/refund reply template — do not promise refunds without billing approval'
    ],
    checklistId: 'billing',
    macroId: 'billing-refund'
  },
  {
    id: 'shopify-limitation',
    label: 'Shopify Limitation',
    appIds: ['all'],
    status: 'shopify-limit',
    causes: [
      'Feature not possible due to Shopify platform restriction',
      'Shopify API or checkout limitation applies',
      'Not something the app can override'
    ],
    fixes: [
      'Confirm the behavior is a documented Shopify platform limit (not an app bug)',
      'Explain the limitation clearly using the Shopify Limitation reply template',
      'Do not promise workarounds the app cannot support',
      'Flag internally if many merchants hit the same limit'
    ],
    checklistId: 'shopify-limit',
    macroId: 'shopify-limitation'
  },
  {
    id: 'feature-request',
    label: 'Feature Request',
    appIds: ['all'],
    status: 'needs-dev',
    causes: [
      'Feature does not currently exist in the app',
      'Merchant is requesting new functionality',
      'Potential roadmap item'
    ],
    fixes: [
      'Check Savio for an existing request before logging a duplicate',
      'Confirm the feature is not available elsewhere in the app settings',
      'Capture the merchant use case and log internally for product review',
      'Send the Feature Request template — never promise a timeline or delivery date'
    ],
    checklistId: 'feature-request',
    macroId: 'feature-request'
  },

  // ============================================================
  // ESSENTIAL PREORDER & PRESALE
  // ============================================================
  {
    id: 'preorder-button-not-showing',
    label: 'Preorder Button Not Showing',
    appIds: ['essential-preorder-presale'],
    status: 'setup',
    causes: [
      'Product not tagged or configured for preorder in app',
      'Preorder campaign set to a future start date',
      'Add to Cart button class not matched by app',
      'Theme uses non-standard ATC button markup'
    ],
    fixes: [
      'Confirm the product/variant is set to preorder in the app dashboard',
      'Check campaign start and end dates — future start dates hide the button until active',
      'Inspect the ATC button class in DevTools and add the preorder class from Snippets if missing',
      'Run window.essentialPreorderConfigs in the console to verify config loaded'
    ],
    checklistId: 'preorder',
    macroId: 'needs-collab-access'
  },
  {
    id: 'back-in-stock-not-sending',
    label: 'Back in Stock Email Not Sending',
    appIds: ['essential-preorder-presale'],
    status: 'setup',
    causes: [
      'Product not configured for back-in-stock alerts in app settings',
      'Email notifications not set up or template inactive',
      'Shopify inventory not updated correctly (app reads Shopify stock)',
      'No subscribers registered for this product'
    ],
    fixes: [
      'Enable back-in-stock for the product in app settings',
      'Confirm email notifications and the template are active',
      'Update inventory in Shopify admin (app reads Shopify stock levels)',
      'Verify subscribers exist for the product in the app dashboard'
    ],
    checklistId: 'back-in-stock',
    macroId: 'needs-collab-access'
  },
  {
    id: 'preorder-button-adds-two-items',
    label: 'Preorder Button Adds Two Items',
    appIds: ['essential-preorder-presale'],
    status: 'setup',
    causes: [
      "Theme's own ATC handler and preorder handler both firing",
      'Missing essential-preorder-skip-click class on secondary ATC button',
      'Duplicate form submit event from theme JS',
      'Sticky ATC button also firing without the skip-click class'
    ],
    fixes: [
      'Add essential-preorder-skip-click to secondary/sticky ATC buttons (see Snippets)',
      'Identify duplicate submit handlers in DevTools → Event Listeners on the form',
      'Test after adding skip-click class on all non-primary ATC buttons',
      'Request theme access if the sticky bar markup is hard to reach'
    ],
    checklistId: 'preorder',
    macroId: 'needs-collab-access'
  },
  {
    id: 'preorder-click-not-working',
    label: 'Preorder Click Does Not Work',
    appIds: ['essential-preorder-presale'],
    status: 'setup',
    causes: [
      'ATC button class not matched — app cannot intercept the click',
      'Theme uses non-standard form submission (custom JS or web component)',
      'JavaScript conflict preventing preorder modal from opening',
      'Variant not set up for preorder in app dashboard'
    ],
    fixes: [
      'Add the correct ATC button class from Snippets so the app can bind the click',
      'Confirm the variant is configured for preorder in the app dashboard',
      'Check the console for JS errors when clicking; disable other apps to isolate',
      'Escalate with theme name if the theme uses custom web components for ATC'
    ],
    checklistId: 'preorder',
    macroId: 'needs-collab-access'
  },
  {
    id: 'notify-me-not-showing',
    label: 'Notify Me Button Not Showing',
    appIds: ['essential-preorder-presale'],
    status: 'setup',
    causes: [
      'Product is in stock — Notify Me only shows for out-of-stock products',
      'Notify Me / back-in-stock feature not enabled in app settings',
      'ATC button class not configured so app cannot detect sold-out state',
      "Theme's sold-out state markup not compatible with app detection"
    ],
    fixes: [
      'Set product inventory to 0 in Shopify admin (or test a sold-out variant)',
      'Enable Notify Me / back-in-stock in app settings',
      'Configure ATC button class so sold-out state is detected',
      'Inspect sold-out markup in DevTools; adjust detection or theme class if needed'
    ],
    checklistId: 'preorder',
    macroId: 'needs-collab-access'
  },
  {
    id: 'preorder-price-not-replacing',
    label: 'Preorder Price Not Replacing Original Price',
    appIds: ['essential-preorder-presale'],
    status: 'theme',
    causes: [
      'Price container element missing essential-preorder-initial-prices-container class',
      'Theme dynamically overwrites price via JS after app sets it',
      'Preorder price field not set in the app campaign settings',
      'Multiple price elements on page — app only targets the first match'
    ],
    fixes: [
      'Add essential-preorder-initial-prices-container to the theme price wrapper (Snippets)',
      'Set the preorder price in the campaign settings in the app dashboard',
      'Check if theme JS rewrites price after load — may need CSS/JS snippet or dev escalation',
      'Ensure only one primary price container has the class on the product page'
    ],
    checklistId: 'preorder',
    macroId: 'needs-collab-access'
  },
  {
    id: 'b2b-preorder-limitation',
    label: 'B2B Preorder Limitation',
    appIds: ['essential-preorder-presale'],
    status: 'shopify-limit',
    causes: [
      'Shopify B2B (Company) orders bypass the standard storefront checkout flow',
      'B2B catalog prices conflict with preorder price overrides',
      'B2B customer accounts use a different cart and checkout API'
    ],
    fixes: [
      'Explain that B2B storefront/checkout flows are not fully supported for preorder overrides',
      'Use the Shopify Limitation reply template — do not promise B2B preorder parity',
      'Log the merchant use case for product if demand is high'
    ],
    checklistId: 'shopify-limit',
    macroId: 'shopify-limitation'
  },

  // ============================================================
  // ESSENTIAL COUNTDOWN TIMER BAR
  // ============================================================
  {
    id: 'countdown-disappeared',
    label: 'Countdown Timer Disappeared',
    appIds: ['essential-countdown-timer'],
    status: 'setup',
    causes: [
      'Fixed minutes timer reached zero and was not reset',
      'Timer campaign end date has passed',
      'Visibility rules (page, product, collection) not matching current page',
      'App embed toggled off accidentally'
    ],
    fixes: [
      'Reset or extend the campaign in the app dashboard if the end date passed',
      'For fixed-minutes timers, clear site cookies or test in incognito for a fresh session',
      'Review visibility rules so the current page/product/collection is included',
      'Re-enable the app embed in Theme Customizer → Save'
    ],
    checklistId: 'countdown',
    macroId: 'fixed-minutes-timer'
  },
  {
    id: 'fixed-minutes-not-showing',
    label: 'Fixed Minutes Timer Not Showing',
    appIds: ['essential-countdown-timer'],
    status: 'setup',
    causes: [
      'Browser session already consumed the fixed-minutes countdown — appears expired',
      'Timer type set to Fixed Minutes but session cookie is still active',
      'Visibility rules not matching the current page being tested',
      'App embed not enabled in theme customizer'
    ],
    fixes: [
      'Test in incognito or clear cookies so the fixed-minutes session resets',
      'Confirm timer type is Fixed Minutes and campaign is active in app settings',
      'Adjust visibility rules to match the page you are testing',
      'Enable app embed and send the Fixed Minutes timer reply template if needed'
    ],
    checklistId: 'countdown',
    macroId: 'fixed-minutes-timer'
  },
  {
    id: 'timer-hidden-css',
    label: 'Timer Hidden by CSS',
    appIds: ['essential-countdown-timer'],
    status: 'theme',
    causes: [
      'Theme CSS applying display:none or visibility:hidden to timer element',
      'z-index conflict placing timer behind other page elements',
      "Theme's header styles overriding timer container positioning",
      'Media query hiding timer on certain screen sizes'
    ],
    fixes: [
      'Inspect the timer element for display:none, visibility, or z-index overrides',
      'Apply a CSS override snippet to restore visibility and stacking',
      'Test mobile and desktop breakpoints in DevTools',
      'Request collab access if theme header CSS must be edited in Liquid'
    ],
    checklistId: 'theme-conflict',
    macroId: 'needs-collab-access'
  },
  {
    id: 'countdown-placement-issue',
    label: 'Countdown Timer Placement Issue',
    appIds: ['essential-countdown-timer'],
    status: 'theme',
    causes: [
      "Default placement not supported by this theme's header structure",
      'Merchant wants timer in a non-standard location on the page',
      'Sticky header conflict pushing timer out of visible area',
      'Requires custom placement div added to Liquid template'
    ],
    fixes: [
      'Add the countdown placement div to the correct Liquid file (Snippets)',
      'Adjust z-index or sticky header offset via CSS snippet if timer is clipped',
      'Confirm placement on live theme after save — test with sticky header on/off'
    ],
    checklistId: 'custom-placement',
    macroId: 'needs-collab-access'
  },

  // ============================================================
  // ROCKIT DISCOUNTS & SALES
  // ============================================================
  {
    id: 'rockit-countdown-not-showing',
    label: 'Rockit Countdown Timer Not Showing',
    appIds: ['rockit-discounts-sales'],
    status: 'setup',
    causes: [
      'Timer embed placement div missing from product template',
      'App embed not enabled in theme customizer',
      'Campaign end date has passed or campaign is inactive',
      'Timer visibility rules do not match the current product'
    ],
    fixes: [
      'Enable Rockit app embed in Theme Customizer → Save',
      'Add timer placement div to the product template if missing',
      'Activate or extend the sale campaign for this product in Rockit dashboard',
      'Match visibility rules to the product being tested'
    ],
    checklistId: 'not-showing',
    macroId: 'needs-collab-access'
  },
  {
    id: 'rockit-sale-timer-issue',
    label: 'Rockit Sale Timer Issue',
    appIds: ['rockit-discounts-sales'],
    status: 'setup',
    causes: [
      'Timer display settings not configured in Rockit dashboard',
      'Theme CSS conflicting with timer styles',
      'Placement div missing or incorrectly positioned',
      'No active sale campaign configured for this product'
    ],
    fixes: [
      'Configure timer display settings and an active campaign in Rockit dashboard',
      'Fix placement div position in the product Liquid template',
      'Apply CSS override from Snippets if theme styles hide the timer',
      'Hard refresh and verify embed is ON on the live theme'
    ],
    checklistId: 'not-showing',
    macroId: 'needs-collab-access'
  },
  {
    id: 'sale-price-not-showing',
    label: 'Sale Price Not Showing',
    appIds: ['rockit-discounts-sales'],
    status: 'setup',
    causes: [
      'Sale campaign not active or product not included in campaign',
      'Compare-at price not set on product in Shopify admin',
      'App embed not enabled or Rockit script not loaded',
      "Theme uses custom price rendering that bypasses Rockit's injection"
    ],
    fixes: [
      'Include the product in an active Rockit sale campaign',
      'Set compare-at price higher than sale price in Shopify admin',
      'Enable app embed and confirm Rockit script loads (console/network tab)',
      'Request collab access if theme uses custom price elements Rockit cannot target'
    ],
    checklistId: 'not-showing',
    macroId: 'needs-collab-access'
  },
  {
    id: 'compare-at-price-issue',
    label: 'Compare-At Price Issue',
    appIds: ['rockit-discounts-sales'],
    status: 'theme',
    causes: [
      'Shopify requires compare-at price to be higher than sale price',
      'Theme displays compare-at price differently from expected format',
      "Rockit price override not applying to all product variants",
      'Script conflict with another discount or pricing app'
    ],
    fixes: [
      'Fix compare-at vs price values in Shopify admin for all variants',
      'Inspect price markup in DevTools — theme may need CSS snippet for layout',
      'Disable other discount apps temporarily to isolate script conflicts',
      'Ensure every variant is included in the Rockit campaign'
    ],
    checklistId: 'theme-conflict',
    macroId: 'needs-collab-access'
  },
  {
    id: 'discount-primary-market',
    label: 'Discount Only Applied to Primary Market Currency',
    appIds: ['rockit-discounts-sales'],
    status: 'shopify-limit',
    causes: [
      'Shopify Markets uses fixed prices per market — not discount-based',
      "Rockit discount is calculated on primary market price, not local market price",
      "Multi-currency display does not reflect Rockit's percentage discount correctly"
    ],
    fixes: [
      'Explain Shopify Markets pricing behavior with the Shopify Limitation template',
      'Document primary vs local market prices the merchant expects',
      'Do not promise market-specific discount display Rockit cannot control',
      'Escalate if merchant needs Markets-aware pricing as a product request'
    ],
    checklistId: 'shopify-limit',
    macroId: 'shopify-limitation'
  },
  {
    id: 'fixed-market-price-overriding',
    label: 'Fixed Market Price Overriding Discounted Price',
    appIds: ['rockit-discounts-sales'],
    status: 'shopify-limit',
    causes: [
      'Shopify Markets fixed price for a specific market overrides all app discounts',
      'Rockit cannot apply percentage discounts when a fixed market price is set',
      'This is a Shopify platform behavior for international market pricing'
    ],
    fixes: [
      'Remove or adjust fixed market prices in Shopify Markets if discounts must show',
      'Explain that fixed market prices override app discounts (Shopify behavior)',
      'Send Shopify Limitation template — Rockit cannot override fixed market prices'
    ],
    checklistId: 'shopify-limit',
    macroId: 'shopify-limitation'
  },
  {
    id: 'sale-badge-not-showing',
    label: 'Sale Badge Not Showing',
    appIds: ['rockit-discounts-sales'],
    status: 'setup',
    causes: [
      'Sale badge not enabled in Rockit settings',
      'App embed not loaded on collection or product page',
      "Theme's own sale badge conflicting with Rockit's badge element",
      'Product does not have an active sale campaign'
    ],
    fixes: [
      'Enable sale badge in Rockit settings',
      'Confirm app embed on collection and product templates',
      'Hide or adjust theme native sale badge CSS if it overlaps Rockit',
      'Assign product to an active sale campaign'
    ],
    checklistId: 'not-showing',
    macroId: 'needs-collab-access'
  },
  {
    id: 'cart-savings-placement',
    label: 'Cart Savings Widget Placement',
    appIds: ['rockit-discounts-sales'],
    status: 'theme',
    causes: [
      "Default placement not compatible with theme's cart template",
      'Cart savings widget placement div missing from cart template',
      'Theme uses AJAX cart without a static placement point',
      'Requires custom placement in cart drawer or cart page Liquid'
    ],
    fixes: [
      'Add cart savings placement div to cart drawer or cart.liquid (Snippets)',
      'Enable Rockit embed on cart-related templates',
      'Test after a full cart refresh (add/remove item) on AJAX themes',
      'Request collab access for drawer themes without a static hook'
    ],
    checklistId: 'custom-placement',
    macroId: 'needs-collab-access'
  },

  // ============================================================
  // E! LOYALTY PROGRAM & REWARDS
  // ============================================================
  {
    id: 'loyalty-referral',
    label: 'Loyalty Referral Question',
    appIds: ['essential-loyalty'],
    status: 'setup',
    causes: [
      'Referral program not enabled in loyalty app settings',
      'Customer not logged in when clicking referral link',
      'Referral widget not visible on storefront',
      'Points not being credited correctly after referral'
    ],
    fixes: [
      'Enable referral program in loyalty app settings',
      'Confirm customer is logged in when using referral links',
      'Enable loyalty app embed and verify widget on storefront',
      'Check points ledger in loyalty dashboard for the referred customer'
    ],
    checklistId: 'loyalty',
    macroId: 'needs-collab-access'
  },
  {
    id: 'loyalty-email-notification',
    label: 'Loyalty Email Notification Question',
    appIds: ['essential-loyalty'],
    status: 'setup',
    causes: [
      'Email notification feature not enabled in loyalty settings',
      'Email template not configured or set to inactive',
      "Merchant's Shopify email settings blocking third-party notification sends",
      'Customer opted out of marketing emails'
    ],
    fixes: [
      'Enable email notifications and activate the template in loyalty settings',
      'Verify customer marketing consent in Shopify customer record',
      'Send a test notification from app settings if available',
      'Check Shopify email deliverability settings if sends still fail'
    ],
    checklistId: 'loyalty',
    macroId: 'needs-collab-access'
  },
  {
    id: 'points-import',
    label: 'Points Import Question',
    appIds: ['essential-loyalty'],
    status: 'setup',
    causes: [
      'CSV format does not match the expected import template',
      'Customer email in import does not match Shopify customer record',
      'Import file has duplicate entries or formatting issues',
      'Points import may override existing points — confirm intent before importing'
    ],
    fixes: [
      'Download and use the official CSV import template from loyalty settings',
      'Match customer emails exactly to Shopify customer records',
      'Remove duplicates and confirm with merchant before import (may override points)',
      'Re-import in smaller batches if the file is large'
    ],
    checklistId: 'loyalty',
    macroId: 'needs-collab-access'
  },
  {
    id: 'points-adjustment',
    label: 'Points Adjustment Question',
    appIds: ['essential-loyalty'],
    status: 'setup',
    causes: [
      'Manual points adjustment requires admin access in loyalty dashboard',
      'Customer account not found or email mismatch in loyalty system',
      'Points change not reflecting due to cache or sync delay',
      'Negative adjustment may reduce points below zero depending on settings'
    ],
    fixes: [
      'Find customer by exact email in loyalty dashboard and adjust points manually',
      'Wait a few minutes and refresh if sync delay — have merchant log out/in',
      'Confirm negative adjustments are allowed in loyalty settings before applying',
      'Document adjustment reason in internal notes for the ticket'
    ],
    checklistId: 'loyalty',
    macroId: 'needs-collab-access'
  },
  {
    id: 'birthday-reward',
    label: 'Birthday Reward Question',
    appIds: ['essential-loyalty'],
    status: 'setup',
    causes: [
      'Birthday field not enabled in customer account settings',
      'Customer did not enter their birthday in the loyalty portal',
      'Birthday reward campaign not active in loyalty settings',
      'Reward triggers on the birthday date — not before'
    ],
    fixes: [
      'Enable birthday field in customer account / loyalty portal settings',
      'Activate birthday reward campaign in loyalty dashboard',
      'Ask customer to save birthday in the loyalty portal before the reward date',
      'Explain rewards trigger on the birthday date, not in advance'
    ],
    checklistId: 'loyalty',
    macroId: 'needs-collab-access'
  },
  {
    id: 'loyalty-widget-placement',
    label: 'Loyalty Widget Placement Issue',
    appIds: ['essential-loyalty'],
    status: 'theme',
    causes: [
      'Default floating widget position conflicts with theme elements',
      'Merchant wants widget embedded inline rather than floating',
      'Custom placement trigger link needs to be added to theme Liquid',
      'z-index conflict with sticky header or cart elements'
    ],
    fixes: [
      'Adjust floating widget position in loyalty settings if available',
      'Add inline placement trigger link/div from Snippets to theme Liquid',
      'Raise z-index via CSS snippet if sticky header covers the widget',
      'Test on mobile with cart drawer and header open'
    ],
    checklistId: 'custom-placement',
    macroId: 'needs-collab-access'
  },

  // ============================================================
  // ESSENTIAL FREE SHIPPING UPSELL
  // ============================================================
  {
    id: 'currency-issue',
    label: 'Free Shipping Bar Currency Issue',
    appIds: ['essential-free-shipping'],
    status: 'shopify-limit',
    causes: [
      'App reads cart currency — may not match display currency',
      'Multi-currency store with Shopify Markets enabled',
      'Threshold set in one currency but store displays another'
    ],
    fixes: [
      'Set the free shipping threshold in the store base currency in app settings',
      'Explain Markets/display currency differences with Shopify Limitation template',
      'Test cart in base currency to confirm threshold logic works',
      'Escalate if merchant requires full Markets-aware thresholds'
    ],
    checklistId: 'currency',
    macroId: 'shopify-limitation'
  },
  {
    id: 'free-shipping-calculation',
    label: 'Free Shipping Bar Not Calculating Correctly',
    appIds: ['essential-free-shipping'],
    status: 'setup',
    causes: [
      'Cart threshold set incorrectly in app settings',
      'App reads cart subtotal before discounts are applied',
      'Cart includes items excluded from free shipping calculation',
      'Multi-currency: threshold set in one currency, cart shows another'
    ],
    fixes: [
      'Correct the threshold amount in free shipping app settings',
      'Test with cart subtotal before discount codes (app reads pre-discount subtotal)',
      'Exclude gift cards or non-qualifying products if settings allow',
      'Align threshold currency with store base currency'
    ],
    checklistId: 'currency',
    macroId: 'needs-collab-access'
  },
  {
    id: 'geolocation-free-shipping',
    label: 'Geolocation Targeting Issue for Free Shipping',
    appIds: ['essential-free-shipping'],
    status: 'setup',
    causes: [
      'Geolocation feature not enabled in app settings',
      'Shopify Markets / geolocation not configured on the store',
      'Targeting rule using incorrect country code',
      'VPN or proxy affecting detected location during testing'
    ],
    fixes: [
      'Enable geolocation targeting in free shipping app settings',
      'Configure Shopify Markets/country rules to match targeting',
      'Verify country codes in targeting rules (ISO format)',
      'Test without VPN; use expected country IP or Markets preview'
    ],
    checklistId: 'not-showing',
    macroId: 'needs-collab-access'
  },
  {
    id: 'free-shipping-cart-drawer',
    label: 'Free Shipping Cart Drawer Placement Issue',
    appIds: ['essential-free-shipping'],
    status: 'theme',
    causes: [
      'Placement div for side cart not added to cart drawer template',
      'App embed enabled but not targeting the side cart correctly',
      "Theme uses non-standard cart drawer structure",
      "Another app's cart drawer replacing the theme cart"
    ],
    fixes: [
      'Add free shipping bar placement div to cart drawer Liquid (Snippets)',
      'Enable app embed on cart drawer / ajax cart templates',
      'Disable conflicting cart drawer apps temporarily to test',
      'Refresh cart after add-to-cart on AJAX themes'
    ],
    checklistId: 'custom-placement',
    macroId: 'needs-collab-access'
  },

  // ============================================================
  // ESSENTIAL ANNOUNCEMENT BAR
  // ============================================================
  {
    id: 'announcement-placement',
    label: 'Announcement Bar Placement Issue',
    appIds: ['essential-announcement-bar'],
    status: 'theme',
    causes: [
      'Theme header structure prevents correct positioning',
      'Bar appearing inside content area instead of top of page',
      'Sticky header conflict pushing bar out of expected position',
      'Custom placement div needed in theme Liquid'
    ],
    fixes: [
      'Add announcement placement div at top of theme.liquid or header section (Snippets)',
      'Adjust CSS z-index/position if sticky header overlaps the bar',
      'Test desktop and mobile after saving the live theme',
      'Request collab access to move div if default embed position is wrong'
    ],
    checklistId: 'announcement-placement',
    macroId: 'needs-collab-access'
  },
  {
    id: 'running-line-issue',
    label: 'Running Line or Rotating Bar Issue',
    appIds: ['essential-announcement-bar'],
    status: 'setup',
    causes: [
      'Running text / ticker feature not enabled in announcement settings',
      'Rotation speed or animation setting causing display glitch',
      'Theme CSS animation conflict overriding announcement bar styles',
      'Only one message configured — need multiple messages for rotation to work'
    ],
    fixes: [
      'Enable running line / ticker in announcement app settings',
      'Add at least two rotating messages if rotation is expected',
      'Slow rotation speed if animation glitches; check theme animation CSS conflicts',
      'Apply CSS snippet if theme overrides announcement animation'
    ],
    checklistId: 'not-showing',
    macroId: 'needs-collab-access'
  },
  {
    id: 'rtl-display-issue',
    label: 'RTL Display Issue',
    appIds: ['essential-announcement-bar'],
    status: 'theme',
    causes: [
      'Theme is set to RTL language but bar text renders left-to-right',
      'CSS direction property not applied to announcement bar element',
      'Font used does not support RTL scripts properly',
      'Requires custom CSS fix or theme-level direction override'
    ],
    fixes: [
      'Add direction: rtl and text-align to announcement bar via CSS snippet',
      'Confirm theme html[dir=rtl] is set for RTL locales',
      'Choose a font that supports the merchant script in announcement settings',
      'Request collab access for theme-level direction overrides if needed'
    ],
    checklistId: 'theme-conflict',
    macroId: 'needs-collab-access'
  },
  {
    id: 'announcement-geolocation',
    label: 'Announcement Geolocation Targeting Issue',
    appIds: ['essential-announcement-bar'],
    status: 'setup',
    causes: [
      'Geolocation targeting not enabled in announcement settings',
      'Country targeting rule using incorrect country code',
      'Shopify Markets not configured for geolocation-based content',
      'VPN or proxy affecting location detection during testing'
    ],
    fixes: [
      'Enable geolocation targeting in announcement settings',
      'Fix country codes in targeting rules',
      'Configure Shopify Markets for the regions being targeted',
      'Test without VPN using Markets country preview'
    ],
    checklistId: 'not-showing',
    macroId: 'needs-collab-access'
  },

  // ============================================================
  // ESSENTIAL TRUST BADGES & ICONS
  // ============================================================
  {
    id: 'icons-layout-issue',
    label: 'Icons Layout Issue',
    appIds: ['essential-trust-badges-icons'],
    status: 'theme',
    causes: [
      'Grid column setting in app not configured correctly',
      'Theme CSS overriding flex/grid layout of badge container',
      'Too many icons selected causing overflow or wrapping issues',
      'Spacing or alignment settings in app need adjustment'
    ],
    fixes: [
      'Adjust column count and spacing in trust badges app settings',
      'Reduce icon count if layout overflows on mobile',
      'Apply CSS flex/grid override snippet from library',
      'Inspect badge container in DevTools for theme width/flex overrides'
    ],
    checklistId: 'theme-conflict',
    macroId: 'needs-collab-access'
  },
  {
    id: 'banner-link-new-tab',
    label: 'Banner Link Opens New Tab',
    appIds: ['essential-trust-badges-icons'],
    status: 'setup',
    causes: [
      'Link target set to _blank in app settings — opens new tab by design',
      'Merchant prefers same-tab navigation — check if this is a configurable setting',
      'Some themes force all external links to open in a new tab'
    ],
    fixes: [
      'Change link target to same tab in app settings if the option exists',
      'Explain _blank behavior if it is intentional for external policies',
      'Check theme global link JS only if app setting cannot change target'
    ],
    checklistId: 'not-showing',
    macroId: 'needs-collab-access'
  },
  {
    id: 'view-counter-question',
    label: 'View Counter Question',
    appIds: ['essential-trust-badges-icons'],
    status: 'setup',
    causes: [
      'View counter shows total product page views, not unique visitors',
      'Counter has a configurable minimum display number — may not show below threshold',
      "Counter not appearing because it hasn't reached the minimum threshold yet",
      'View counter feature may need to be enabled separately in app settings'
    ],
    fixes: [
      'Enable view counter in app settings and set minimum threshold appropriately',
      'Explain counter counts page views, not unique visitors',
      'Lower minimum threshold for testing or wait until traffic exceeds minimum',
      'Verify embed is on product template where counter should appear'
    ],
    checklistId: 'not-showing',
    macroId: 'needs-collab-access'
  },
  {
    id: 'trust-badge-custom-placement',
    label: 'Trust Badge Custom Placement Issue',
    appIds: ['essential-trust-badges-icons'],
    status: 'theme',
    causes: [
      'Default placement not appearing in expected location on this theme',
      'Merchant wants badges in a custom position (e.g. below ATC button)',
      'Requires adding a placement div to product Liquid template',
      "Theme's product form structure prevents default placement from working"
    ],
    fixes: [
      'Add trust badge placement div below ATC or desired spot (Snippets)',
      'Enable app embed on product template',
      'Save theme and verify on live product page',
      'Request collab access if product form structure blocks default embed'
    ],
    checklistId: 'custom-placement',
    macroId: 'needs-collab-access'
  },

  // ============================================================
  // ESSENTIAL UPSELL & CROSS SELL
  // ============================================================
  {
    id: 'discount-not-applied',
    label: 'Discount Not Applied',
    appIds: ['essential-upsell-cross-sell'],
    status: 'shopify-limit',
    causes: [
      'Shopify limits one discount code at checkout (legacy checkout)',
      'Automatic discounts may conflict with app discounts',
      'Discount is set up incorrectly in upsell app settings',
      'Shopify Functions limitation on non-Plus plans'
    ],
    fixes: [
      'Verify discount configuration in upsell app settings',
      'Explain Shopify one-code-at-checkout rule with Shopify Limitation template',
      'Check for conflicting automatic discounts in Shopify admin',
      'Note Plus/Functions requirements if merchant expects advanced stacking'
    ],
    checklistId: 'discount',
    macroId: 'shopify-limitation'
  },
  {
    id: 'upsell-not-showing',
    label: 'Upsell Offer Not Showing',
    appIds: ['essential-upsell-cross-sell'],
    status: 'setup',
    causes: [
      'Upsell offer not configured for this product in app dashboard',
      'App embed not enabled in theme customizer',
      'Placement div missing from product or cart template',
      'Offer visibility rules (collections, tags, variants) not matching'
    ],
    fixes: [
      'Create or assign upsell offer for the product in app dashboard',
      'Enable app embed on product/cart templates',
      'Add upsell placement div from Snippets if missing',
      'Align visibility rules with product tags, collections, or variants'
    ],
    checklistId: 'not-showing',
    macroId: 'needs-collab-access'
  },
  {
    id: 'product-addon-not-adding',
    label: 'Product Add-On Not Adding to Cart',
    appIds: ['essential-upsell-cross-sell'],
    status: 'setup',
    causes: [
      'Add-on product is out of stock',
      'Add-on offer configuration incorrect in app settings',
      'Cart update AJAX call failing — check browser console for errors',
      "Theme's cart refresh not triggering after add-on is added"
    ],
    fixes: [
      'Restock add-on variant or pick an in-stock product in offer settings',
      'Fix add-on offer mapping in upsell dashboard',
      'Check console for failed /cart/add.js requests',
      'Add cart refresh snippet and set window.essentialUpdateCartRefresh = true'
    ],
    checklistId: 'not-showing',
    macroId: 'needs-collab-access'
  },
  {
    id: 'cart-not-refresh-upsell',
    label: 'Cart Does Not Refresh After Upsell Add',
    appIds: ['essential-upsell-cross-sell'],
    status: 'theme',
    causes: [
      'Cart refresh helper script not added to theme.liquid',
      'Theme uses a custom cart update event that app does not listen for',
      "AJAX cart response not triggering app's cart refresh listener",
      'window.essentialUpdateCartRefresh not set to true'
    ],
    fixes: [
      'Add cart refresh JS snippet to theme.liquid per Snippet Library',
      'Set window.essentialUpdateCartRefresh = true before cart events',
      'Test add-on flow and confirm drawer/page cart re-renders',
      'Escalate if theme uses proprietary cart events the snippet cannot hook'
    ],
    checklistId: 'not-showing',
    macroId: 'needs-collab-access'
  },
  {
    id: 'product-image-stretched',
    label: 'Product Image Stretched',
    appIds: ['essential-upsell-cross-sell'],
    status: 'theme',
    causes: [
      "Product image aspect ratio not matching upsell widget's default dimensions",
      'object-fit: cover cropping product image in container',
      'CSS fix needed: set object-fit: contain on the image element',
      'Theme CSS overriding image display styles in upsell widget'
    ],
    fixes: [
      'Apply object-fit: contain CSS snippet on upsell widget images',
      'Inspect image element for theme width/height overrides',
      'Adjust widget image size settings in app if available',
      'Test after CSS change on desktop and mobile'
    ],
    checklistId: 'theme-conflict',
    macroId: 'needs-collab-access'
  },
  {
    id: 'product-title-truncated',
    label: 'Product Title Truncated',
    appIds: ['essential-upsell-cross-sell'],
    status: 'theme',
    causes: [
      'Upsell widget has a fixed width causing long titles to overflow',
      'Theme CSS applying text-overflow: ellipsis to upsell title element',
      'CSS fix needed: unset text-wrap on the title element',
      'Long product names need CSS adjustment'
    ],
    fixes: [
      'Apply title text-wrap / overflow CSS snippet from library',
      'Widen upsell widget container in app style settings if available',
      'Remove theme ellipsis rules targeting upsell title selectors',
      'Suggest shorter product titles only if CSS cannot fix truncation'
    ],
    checklistId: 'theme-conflict',
    macroId: 'needs-collab-access'
  },
  {
    id: 'upsell-line-item-property',
    label: 'Upsell Line Item Property Issue',
    appIds: ['essential-upsell-cross-sell'],
    status: 'needs-dev',
    causes: [
      'Line item properties not being passed when upsell adds to cart',
      "Custom cart attributes required by merchant's fulfillment flow",
      'App may not support arbitrary line item properties without custom config',
      'Requires dev team investigation for custom implementation'
    ],
    fixes: [
      'Document required line item properties and fulfillment workflow',
      'Confirm whether standard upsell add-to-cart supports the property',
      'Escalate to dev team — do not promise custom properties without approval',
      'Pause merchant expectation until dev confirms feasibility'
    ],
    checklistId: 'not-showing',
    macroId: 'needs-collab-access'
  },
  {
    id: 'post-purchase-not-showing',
    label: 'Post-Purchase Offer Not Showing',
    appIds: ['essential-upsell-cross-sell'],
    status: 'setup',
    causes: [
      'Post-purchase upsell feature not enabled or configured in app settings',
      'Post-purchase checkout extension not published in Shopify admin',
      'Product selected for post-purchase offer is out of stock or archived',
      'Shopify plan may not support post-purchase extensions (Plus required for some features)'
    ],
    fixes: [
      'Enable and configure post-purchase offer in upsell app settings',
      'Publish the post-purchase checkout extension in Shopify admin → Checkout',
      'Use an in-stock, active product for the offer',
      'Confirm store plan supports post-purchase; explain limits if not'
    ],
    checklistId: 'not-showing',
    macroId: 'needs-collab-access'
  },

  // ============================================================
  // ESSENTIAL CART DRAWER
  // ============================================================
  {
    id: 'cart-drawer-not-opening',
    label: 'Cart Drawer Not Opening',
    appIds: ['essential-cart-drawer'],
    status: 'theme',
    causes: [
      'App cart drawer embed not enabled in theme customizer',
      "Theme has its own cart drawer conflicting with app's drawer",
      'JavaScript error preventing drawer from initializing — check console',
      "Cart trigger button not linked to app's drawer open event"
    ],
    fixes: [
      'Enable Essential cart drawer embed in Theme Customizer → Save',
      'Disable or bypass theme native cart drawer if both are active',
      'Fix console JS errors before retesting open cart',
      'Wire cart icon to app drawer open handler per Snippets/docs'
    ],
    checklistId: 'cart-drawer',
    macroId: 'third-party-conflict'
  },
  {
    id: 'cart-drawer-slow',
    label: 'Cart Drawer Slow or Laggy',
    appIds: ['essential-cart-drawer'],
    status: 'conflict',
    causes: [
      'Large number of cart items causing slow re-render',
      'Third-party app injecting into cart drawer on every open event',
      'Product images in cart not optimized — large file sizes causing slow load',
      'Network latency in cart API call on merchant side'
    ],
    fixes: [
      'Test with a small cart to see if slowness is item-count related',
      'Disable other apps that inject into cart drawer one at a time',
      'Recommend smaller product images in Shopify admin',
      'Check network tab for slow /cart.js responses on merchant connection'
    ],
    checklistId: 'cart-drawer',
    macroId: 'third-party-conflict'
  },
  {
    id: 'cart-item-not-updating',
    label: 'Cart Item Not Updating',
    appIds: ['essential-cart-drawer'],
    status: 'theme',
    causes: [
      'Cart quantity update AJAX call failing — check browser console for errors',
      'Theme cart form preventing standard quantity update events',
      'Another app intercepting cart update events before they complete',
      'Cart token expired or session issue requiring page refresh'
    ],
    fixes: [
      'Check console for failed cart change API calls when updating quantity',
      'Hard refresh and retest; clear cart session if token expired',
      'Disable conflicting cart apps temporarily',
      'Run window.essentialCartApi in console if documented for this app'
    ],
    checklistId: 'cart-drawer',
    macroId: 'needs-collab-access'
  },
  {
    id: 'cart-drawer-stretched',
    label: 'Cart Drawer Stretched or Too Wide',
    appIds: ['essential-cart-drawer'],
    status: 'theme',
    causes: [
      'Theme CSS applying min-width or width override to drawer container',
      'Sidebar or overlay element expanding to full viewport width',
      "CSS conflict with theme's own drawer styles",
      'Responsive breakpoint causing drawer to go full-width unintentionally'
    ],
    fixes: [
      'Inspect drawer container width/min-width in DevTools',
      'Apply cart drawer width CSS snippet from library',
      'Override theme drawer rules that set width: 100% on desktop',
      'Test breakpoints at 1280px and mobile widths'
    ],
    checklistId: 'theme-conflict',
    macroId: 'needs-collab-access'
  },
  {
    id: 'checkout-button-redirect',
    label: 'Checkout Button Redirect Issue',
    appIds: ['essential-cart-drawer'],
    status: 'theme',
    causes: [
      'Checkout button URL override from another app or theme setting',
      'Custom checkout URL (e.g. ReCharge, CartHook) conflicting with app',
      'Third-party checkout integration overriding standard checkout flow',
      'Shopify checkout URL changed and button target not updated'
    ],
    fixes: [
      'Identify apps/scripts overriding checkout href in DevTools',
      'Disable third-party checkout apps one at a time to isolate',
      'Restore standard /checkout URL on cart drawer button if overridden in theme',
      'Send third-party conflict template naming the conflicting integration'
    ],
    checklistId: 'cart-drawer',
    macroId: 'third-party-conflict'
  },
  {
    id: 'cart-api-question',
    label: 'Cart API Question',
    appIds: ['essential-cart-drawer'],
    status: 'setup',
    causes: [
      'Merchant asking about Shopify cart API capabilities or behavior',
      'Cart.js or custom AJAX cart implementation questions',
      "App's cart API integration documentation needed",
      'Cart API rate limiting or error handling questions'
    ],
    fixes: [
      'Share Shopify Cart API docs link for standard /cart.js behavior',
      'Run window.essentialCartApi on storefront if available for this app',
      'Document merchant question and escalate to dev if behavior is app-specific',
      'Do not modify store cart API from dashboard — read-only guidance only'
    ],
    checklistId: 'cart-drawer',
    macroId: 'needs-collab-access'
  },
  {
    id: 'third-party-checkout-conflict',
    label: 'Third-Party Checkout Conflict',
    appIds: ['essential-cart-drawer'],
    status: 'conflict',
    causes: [
      'Third-party checkout app (ReCharge, Gorgias, etc.) modifying cart flow',
      'Checkout extension conflict with cart drawer behavior',
      'Custom checkout scripts interfering with cart drawer open/close events',
      'Payment app modifying cart state unexpectedly'
    ],
    fixes: [
      'List active checkout/subscription apps and test with them disabled',
      'Confirm Essential cart drawer embed is the only drawer in use',
      'Document conflicting app and send third-party conflict reply',
      'Escalate to dev if checkout extension blocks drawer events'
    ],
    checklistId: 'third-party-conflict',
    macroId: 'third-party-conflict'
  },

  // ============================================================
  // ESSENTIAL ESTIMATED DELIVERY
  // ============================================================
  {
    id: 'estimated-delivery-not-showing',
    label: 'Estimated Delivery Widget Not Showing',
    appIds: ['essential-estimated-delivery'],
    status: 'setup',
    causes: [
      'App embed not enabled in theme customizer',
      'Product not matched by targeting rules in app settings',
      'Placement block not added to product template',
      'Estimated delivery feature not configured for this product or collection'
    ],
    fixes: [
      'Enable estimated delivery app embed on product template',
      'Add app block or placement to product template in Theme Customizer',
      'Include product in targeting rule (collection, tag, or product list)',
      'Configure delivery settings for the product in app dashboard'
    ],
    checklistId: 'not-showing',
    macroId: 'needs-collab-access'
  },
  {
    id: 'delivery-date-calculation',
    label: 'Delivery Date Calculation Issue',
    appIds: ['essential-estimated-delivery'],
    status: 'setup',
    causes: [
      'Processing days or cutoff time set incorrectly in app settings',
      'Weekend or holiday handling not configured',
      'Blocked dates interfering with date calculation',
      'Timezone mismatch between store settings and app delivery settings'
    ],
    fixes: [
      'Set processing days, cutoff, and timezone in delivery app settings',
      'Configure weekend/holiday rules and remove incorrect blocked dates',
      'Align app timezone with Shopify store timezone',
      'Test order placed before vs after cutoff to validate displayed date'
    ],
    checklistId: 'not-showing',
    macroId: 'needs-collab-access'
  },
  {
    id: 'cutoff-time-question',
    label: 'Cutoff Time Question',
    appIds: ['essential-estimated-delivery'],
    status: 'setup',
    causes: [
      'Cutoff time allows same-day delivery only if ordered before a set time',
      'Store timezone vs cutoff rule timezone may differ — check both settings',
      'Cutoff time not applying to all products or collections as expected',
      'Testing after the cutoff shows the next available date — this is correct behavior'
    ],
    fixes: [
      'Set cutoff time and timezone in app to match store operating hours',
      'Explain next-day date after cutoff is expected behavior',
      'Apply cutoff rule to correct product/collection scope in settings',
      'Test an order simulation before and after cutoff in store timezone'
    ],
    checklistId: 'not-showing',
    macroId: 'needs-collab-access'
  },
  {
    id: 'blocked-dates-question',
    label: 'Blocked Dates Question',
    appIds: ['essential-estimated-delivery'],
    status: 'setup',
    causes: [
      'Blocked dates prevent delivery on specific days (holidays, closures)',
      'Blocked dates not configured in app settings yet',
      'Date range overlapping incorrectly with available delivery dates',
      'Blocked dates not updating after removing old entries — may need cache clear'
    ],
    fixes: [
      'Add or remove blocked dates in delivery app settings for holidays/closures',
      'Check blocked ranges do not cover entire delivery window by mistake',
      'Hard refresh product page after editing blocked dates',
      'Explain blocked dates push delivery to the next available day'
    ],
    checklistId: 'not-showing',
    macroId: 'needs-collab-access'
  },
  {
    id: 'product-targeting-issue',
    label: 'Product Targeting Issue',
    appIds: ['essential-estimated-delivery'],
    status: 'setup',
    causes: [
      'Product not included in targeting rule (by collection, tag, or product)',
      'Targeting rule set to exclude all products by mistake',
      'Multiple targeting rules conflicting with each other',
      'Default rule not showing because a more specific rule is overriding it'
    ],
    fixes: [
      'Add product to targeting by collection, tag, or direct product selection',
      'Review rule priority — remove overly broad exclude rules',
      'Simplify conflicting rules so one clear rule applies per product',
      'Set a default rule for products without a specific override'
    ],
    checklistId: 'not-showing',
    macroId: 'needs-collab-access'
  }

  // TODO: Add more issue types as new patterns emerge
];
