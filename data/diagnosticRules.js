// ============================================================
// STOREFRONT DIAGNOSTIC RULES
// Data-driven rules used by app.js to analyze scanner JSON.
// Add rules here instead of hard-coding issue-specific copy in app.js.
// ============================================================

window.ESSENTIAL_APP_DIAGNOSTICS = {
  appGlobals: {
    'essential-countdown-timer': ['essentialCountdownTimerConfigs'],
    'essential-free-shipping': ['essentialOrderValueBoosterConfigs'],
    'essential-announcement-bar': ['essentialAnnouncementConfigs'],
    'essential-trust-badges-icons': ['essentialBannersConfigs'],
    'essential-upsell-cross-sell': ['essentialUpsellConfigs'],
    'essential-preorder-presale': ['essentialPreorderConfigs'],
    'essential-cart-drawer': ['essentialCartConfigs', 'essentialCartApi'],
    'essential-loyalty': ['essentialLoyaltyConfig'],
    'essential-estimated-delivery': ['essentialEstimetedDeliveryConfigs'],
    'essential-sticky-add-to-cart': ['essentialCartConfigs'],
    'sticky-atc': ['essentialCartConfigs'],
    'rockit-discounts-sales': [],
    'essential-ai-blog': [],
    'ai-seo': []
  },

  appPlacements: {
    'essential-countdown-timer': [
      '.essential-countdown-timer-placement',
      '.countdown-timer-block',
      '.essential-countdown-top-bar',
      '.countdown-timer-side-cart',
      '.essential_countdown_timer'
    ],
    'essential-free-shipping': [
      '.essential-free-shipping-bar',
      '.essential-order-value-booster-placement',
      '.order-value-booster-side-cart',
      '.order-value-booster-block',
      '.free_shipping_card',
      '[class*="free_shipping_card"]',
      '[class*="free_shipping_card_wrapper"]',
      '[class*="free_shipping_card_progress"]'
    ],
    'essential-announcement-bar': [
      '.essential-announcement-bar-placement',
      '.essential-announcement-bar-side-cart',
      '.essential_annoucement_bar_wrapper'
    ],
    'essential-trust-badges-icons': [
      '.essential-banners-default-placement',
      '.essential-banners-block-side-cart-top',
      '.essential-banners-block-side-cart-bottom',
      '[data-banner]',
      '.icon-block-container'
    ],
    'essential-upsell-cross-sell': [
      '.essential-upsell-default-placement',
      '.essential-upsell-side-cart-top',
      '.essential-upsell-side-cart-bottom',
      '.essential-upsell-frequently-bought-together-default-placement',
      '.essential-upsell-cross-sell-default-placement',
      '.essential-upsell-product-addon-block',
      '[data-essential-upsell-element]'
    ],
    'essential-preorder-presale': [
      '.essential-preorder-initial-prices-container',
      '.essential-preorder-initial-add-to-cart-button',
      '.essential-preorder-extra-add-to-cart-button',
      '.essential-preorder-product-page-badge-container',
      '.essential-preorder-bis-button-placement'
    ],
    'essential-cart-drawer': [
      '.placement_side_cart',
      '.essential-cart-custom-add-to-cart-element'
    ],
    'essential-loyalty': [
      'a[href="#essential-loyalty-trigger"]'
    ],
    'essential-estimated-delivery': [
      '.essential-estimated-delivery-block-liquid'
    ],
    'essential-sticky-add-to-cart': [
      '.essential-cart-custom-add-to-cart-element'
    ],
    'sticky-atc': [
      '.essential-cart-custom-add-to-cart-element'
    ],
    'rockit-discounts-sales': [
      '.rockit-sales-manager-timer-embed',
      '.rockit-sales-manager-savings-widget-container'
    ]
  },

  appScriptChecks: {
    'rockit-discounts-sales': 'rockit',
    'essential-upsell-cross-sell': 'essential'
  },

  rules: [
    {
      id: 'missing-global-no-essential-scripts',
      label: 'Missing app global and no Essential scripts',
      confidence: 'High',
      category: 'Setup issue',
      summary: 'The selected app global was not detected, and no Essential storefront scripts were found. The app likely is not loading on this page and needs setup confirmation.',
      cause: 'The selected app likely is not loading on this storefront page.',
      nextSteps: [
        'Confirm the app is installed and enabled on the active theme.',
        'Check the app embed or app block in Shopify theme editor.',
        'Re-scan the exact affected product or cart page after setup is confirmed.'
      ],
      merchantAngle: 'The app does not appear to be loading on this page yet, so we need to verify the app embed or block setup first.',
      internalNote: 'Scanner found missing selected app global and zero Essential scripts. Needs setup/access confirmation.',
      escalation: 'Not needed yet. Escalate only if the embed is enabled and scripts still do not load.',
      devEscalationNeeded: false,
      accessNeeded: true
    },
    {
      id: 'missing-global-essential-script-exists',
      label: 'Missing app global but Essential script exists',
      confidence: 'Medium',
      category: 'Script issue',
      summary: 'An Essential script appears to be present, but the selected app global was not detected. This is possibly a script execution, targeting, or configuration issue and needs confirmation.',
      cause: 'The storefront may load an Essential script, but the selected app configuration is not exposed on this page.',
      nextSteps: [
        'Confirm the selected app is targeted to this product, page, market, and theme.',
        'Check Console and Network for blocked or failed Essential script resources.',
        'Compare the same app setup on a clean theme preview if possible.'
      ],
      merchantAngle: 'The app script may be present, but the selected app configuration is not available on this page yet.',
      internalNote: 'Scanner found Essential script presence but missing selected app global. Needs targeting/script execution confirmation.',
      escalation: 'Escalate if targeting and embed setup are confirmed but the global still does not initialize.',
      devEscalationNeeded: true,
      accessNeeded: true
    },
    {
      id: 'missing-selected-app-global',
      label: 'Selected app global is missing',
      confidence: 'Medium',
      category: 'Setup issue',
      summary: 'The selected app global was not detected. This likely means the app is not loading or not targeted on this page, but setup needs confirmation.',
      cause: 'The selected app does not appear to be loaded on this storefront page.',
      nextSteps: [
        'Confirm the app embed or app block is enabled in the active theme.',
        'Verify the selected app is installed and configured for this product or page.',
        'If the embed is enabled but the global is still missing, collect Console and Network screenshots.'
      ],
      merchantAngle: 'The app script does not appear to be loading on this page yet. We need to verify the theme app embed or block setup.',
      internalNote: 'Scanner did not find the expected window global for the selected app.',
      escalation: 'Escalate only if the app is enabled in Shopify and the script still does not load.',
      devEscalationNeeded: false,
      accessNeeded: true
    },
    {
      id: 'global-exists-placement-missing',
      label: 'App global exists but placement is missing',
      confidence: 'Medium',
      category: 'Theme issue',
      summary: 'The selected app appears to be loaded, but the expected placement was not detected. This is likely a theme setup or placement issue.',
      cause: 'The app configuration is present, but no matching storefront placement was found.',
      nextSteps: [
        'Check whether the app block or manual placement was added to the current template.',
        'Verify targeting rules for the product, collection, cart drawer, or page type.',
        'Add the correct app block or placement snippet if the setup is incomplete.'
      ],
      merchantAngle: 'The app configuration is present, but the theme does not currently show the matching placement on this page.',
      internalNote: 'Expected global exists, expected placement selectors are all zero.',
      escalation: 'Usually support/setup issue. Escalate only after placement and targeting are confirmed.',
      devEscalationNeeded: false,
      accessNeeded: true
    },
    {
      id: 'essential-element-hidden',
      label: 'Essential element exists but is hidden by CSS',
      confidence: 'High',
      category: 'CSS issue',
      summary: 'An Essential element exists in the DOM, but scanner visibility checks show it is likely hidden or zero-sized. This is likely a CSS/theme visibility issue.',
      cause: 'An Essential element exists in the DOM but is hidden, zero-sized, transparent, or otherwise not visible.',
      nextSteps: [
        'Inspect the hidden selector in DevTools Elements panel.',
        'Check whether theme CSS or a third-party app overrides display, visibility, opacity, size, or stacking.',
        'Apply the smallest relevant CSS override snippet or escalate with the selector and screenshot.'
      ],
      merchantAngle: 'The app element is present, but the theme styling appears to be hiding it.',
      internalNote: 'Visibility scan found a hidden Essential selector.',
      escalation: 'Escalate if the selector cannot be restored with a standard CSS fix.',
      devEscalationNeeded: false,
      accessNeeded: true
    },
    {
      id: 'product-form-missing',
      label: 'Product form missing',
      confidence: 'High',
      category: 'Theme issue',
      summary: 'The page appears product-related, but no standard Shopify product form was detected. This likely prevents app logic from attaching correctly and needs theme confirmation.',
      cause: 'The theme does not expose a standard Shopify product form on this page.',
      nextSteps: [
        'Confirm the merchant tested on the exact product page where the issue occurs.',
        'Inspect whether the theme uses form[action*="/cart/add"] or a custom product form.',
        'Test the same product in a clean theme preview if available.'
      ],
      merchantAngle: 'The page may not expose the standard Shopify product form the app expects, so we need to check the theme integration.',
      internalNote: 'Scanner found productFormsFound = 0 on a product-related issue.',
      escalation: 'Escalate if this is a product page and the theme uses custom product markup the app cannot detect.',
      devEscalationNeeded: true,
      accessNeeded: true
    },
    {
      id: 'atc-button-missing',
      label: 'Add to Cart button missing',
      confidence: 'High',
      category: 'Theme issue',
      summary: 'The scanner did not detect a standard Add to Cart button. This is likely a theme integration issue for apps that attach to the ATC flow.',
      cause: 'The theme does not expose a detectable Add to Cart button on this page.',
      nextSteps: [
        'Confirm the product is available and the Add to Cart button is visible to the merchant.',
        'Inspect the button markup and required app-specific classes.',
        'Add the documented class or placement snippet when the theme uses a custom ATC button.'
      ],
      merchantAngle: 'The app may not be able to attach because the storefront button markup is custom or missing.',
      internalNote: 'Scanner found addToCartButtonsFound = 0 for a product/ATC issue.',
      escalation: 'Escalate if adding the documented class or placement does not resolve it.',
      devEscalationNeeded: false,
      accessNeeded: true
    },
    {
      id: 'preorder-atc-class-missing',
      label: 'Preorder Add to Cart class missing',
      confidence: 'High',
      category: 'Theme issue',
      summary: 'Essential Preorder appears to be loaded, but the required Add to Cart button class was not detected. This is likely a theme integration issue and needs confirmation in the theme markup.',
      cause: 'The Preorder app is loaded, but required Add to Cart integration classes are missing.',
      nextSteps: [
        'Inspect the product Add to Cart button in DevTools.',
        'Add the documented Preorder initial or extra Add to Cart class to the correct button.',
        'Re-scan the product page and confirm the class selector is detected.'
      ],
      merchantAngle: 'The preorder app appears to load, but the theme button needs the required integration class so the app can attach correctly.',
      internalNote: 'Preorder global exists, but initial/extra ATC class placement selectors are missing.',
      escalation: 'Escalate if the correct class is present but Preorder still does not attach.',
      devEscalationNeeded: false,
      suggestedSnippetIds: ['class-preorder-initial-atc', 'class-preorder-extra-atc'],
      accessNeeded: true
    },
    {
      id: 'upsell-script-type-issue',
      label: 'Essential Upsell script type issue',
      confidence: 'Medium',
      category: 'Script issue',
      summary: 'An upsell-related script appears to have an unexpected script type. It may be present but not executing correctly, which needs confirmation in Console and Network.',
      cause: 'An upsell-related script appears to use an unexpected script type.',
      nextSteps: [
        'Inspect the script tag type and source in the theme.',
        'Check whether a theme optimization app rewrote script attributes.',
        'Escalate with scanner JSON and Network screenshot if the script is blocked or not executed.'
      ],
      merchantAngle: 'The upsell script may be present but not executing correctly due to script tag handling.',
      internalNote: 'scripts.possibleUpsellScriptTypeIssue is true.',
      escalation: 'Escalate to dev if confirmed on the active theme.',
      devEscalationNeeded: true,
      accessNeeded: true
    },
    {
      id: 'cart-discounts-detected',
      label: 'Cart discounts detected',
      confidence: 'Medium',
      category: 'Discount issue',
      summary: 'The cart contains discounts or line-level discount allocations. Pricing differences are possibly caused by Shopify/app discount interaction and need settings confirmation.',
      cause: 'The cart contains discounts or line-level discount allocations that may explain pricing differences.',
      nextSteps: [
        'Compare the cart item prices with Shopify Discounts and app discount settings.',
        'Check whether the selected issue is caused by expected Shopify discount behavior.',
        'Ask for a screenshot of the cart and discount setup if the numbers still do not match.'
      ],
      merchantAngle: 'The cart already contains discounts, so the displayed price may be affected by Shopify discount calculations.',
      internalNote: 'Scanner found cart or line-level discounts in /cart.js.',
      escalation: 'Escalate only if discounts are incorrect after settings are verified.',
      devEscalationNeeded: false,
      accessNeeded: false
    },
    {
      id: 'upsell-properties-visible',
      label: 'Essential Upsell properties visible in cart',
      confidence: 'Medium',
      category: 'Cart issue',
      summary: 'Upsell-related line item properties are present in cart data. If the merchant sees them in the cart UI, this is likely theme line-item property rendering.',
      cause: 'Upsell-related line item properties are present in cart data.',
      nextSteps: [
        'Confirm whether these properties are expected for the selected upsell flow.',
        'If properties are visible to customers, use the relevant hide-properties theme guidance.',
        'Check whether the theme prints private line item properties.'
      ],
      merchantAngle: 'The cart contains upsell line item properties. The theme may be exposing them in the cart UI.',
      internalNote: 'At least one cart item has upsell property keys.',
      escalation: 'Usually theme output behavior. Escalate only if the app creates incorrect properties.',
      devEscalationNeeded: false,
      suggestedSnippetIds: ['upsell-line-item-property-liquid'],
      accessNeeded: true
    },
    {
      id: 'preorder-properties-visible',
      label: 'Preorder properties visible in cart',
      confidence: 'Medium',
      category: 'Cart issue',
      summary: 'Preorder-related line item properties are present in cart data. If visible to the merchant/customer, this is likely a theme cart rendering issue.',
      cause: 'Preorder-related line item properties are present in cart data.',
      nextSteps: [
        'Confirm whether preorder properties are expected for this product.',
        'If visible in the cart, check whether the theme hides private line item properties.',
        'Verify preorder settings and product targeting.'
      ],
      merchantAngle: 'The preorder metadata is present in the cart. The theme may be displaying line item properties that should stay hidden.',
      internalNote: 'At least one cart item has preorder property keys.',
      escalation: 'Escalate if properties are wrong or generated for non-preorder items.',
      devEscalationNeeded: false,
      suggestedSnippetIds: ['preorder-line-item-property-liquid'],
      accessNeeded: true
    },
    {
      id: 'visible-essential-properties',
      label: 'Visible Essential item properties possible',
      confidence: 'Medium',
      category: 'Cart issue',
      summary: 'Essential line item properties are present in cart data. If they are visible in the storefront cart, this is likely a theme cart rendering issue.',
      cause: 'The cart contains Essential-related line item property keys.',
      nextSteps: [
        'Confirm whether the merchant can see these properties in the cart UI.',
        'Inspect the cart item property loop in the theme.',
        'Use the closest line item property hiding snippet if the theme exposes internal properties.'
      ],
      merchantAngle: 'The cart includes internal app metadata. If it is visible in the cart, the theme may need to hide those line item properties.',
      internalNote: 'Scanner found Essential-related property keys in /cart.js. Visibility in UI still needs confirmation.',
      escalation: 'Escalate only if properties are wrong or visible after theme hiding is applied.',
      devEscalationNeeded: false,
      suggestedSnippetIds: ['upsell-line-item-property-liquid', 'preorder-line-item-property-liquid'],
      accessNeeded: true
    },
    {
      id: 'cart-drawer-api-missing',
      label: 'Cart Drawer selected but Essential Cart API is missing',
      confidence: 'High',
      category: 'Setup issue',
      summary: 'Essential Cart Drawer is selected, but essentialCartApi was not detected. The drawer likely is not loaded or enabled on this page.',
      cause: 'Essential Cart Drawer API was not found on the storefront.',
      nextSteps: [
        'Confirm Essential Cart Drawer is installed and enabled on the active theme.',
        'Check app embed status and cart drawer placement.',
        'Collect Console and Network screenshots if enabled but still missing.'
      ],
      merchantAngle: 'The cart drawer API is not available on this page, so the drawer integration cannot be verified yet.',
      internalNote: 'cartDrawer.hasEssentialCartApi is false.',
      escalation: 'Escalate if enabled app embed still does not create essentialCartApi.',
      devEscalationNeeded: true,
      suggestedSnippetIds: ['cart-api-reference'],
      accessNeeded: true
    },
    {
      id: 'product-form-or-atc-missing',
      label: 'Product form or Add to Cart missing',
      confidence: 'High',
      category: 'Theme issue',
      summary: 'The page does not expose a standard Shopify product form or Add to Cart control. This is likely a theme integration issue for product-page apps.',
      cause: 'The page does not expose a standard Shopify product form or Add to Cart control.',
      nextSteps: [
        'Verify the merchant tested on a product page, not a collection or custom landing page.',
        'Check whether the theme uses a non-standard product form.',
        'Escalate with theme details if the app depends on missing product form markup.'
      ],
      merchantAngle: 'The page does not appear to expose a standard Shopify Add to Cart form for the app to attach to.',
      internalNote: 'Scanner found no form[action*="/cart/add"] or Add to Cart button.',
      escalation: 'Escalate if this is a product page and the theme uses custom product form markup.',
      devEscalationNeeded: true,
      accessNeeded: true
    },
    {
      id: 'grey-screen-needs-screenshots',
      label: 'App loading grey screen needs screenshots',
      confidence: 'Medium',
      category: 'Script issue',
      summary: 'Grey screen or loading issues cannot be confirmed from scanner data alone. This likely needs Console and Network screenshots.',
      cause: 'Grey screen or loading issues usually require Console and Network evidence from the failing page.',
      nextSteps: [
        'Ask for full-page screenshot, Console screenshot, and Network screenshot filtered by essential or rockit.',
        'Check browser extensions, VPN, firewall, and ad blockers.',
        'Reproduce in incognito and another browser.'
      ],
      merchantAngle: 'For loading screens we need browser Console and Network evidence to see what failed to load.',
      internalNote: 'Issue wording suggests grey/loading screen; scanner cannot see previous network failures.',
      escalation: 'Escalate after screenshots show a failing app resource.',
      devEscalationNeeded: false,
      accessNeeded: false
    },
    {
      id: 'feature-request-savio',
      label: 'Feature request',
      confidence: 'High',
      category: 'Setup issue',
      summary: 'The selected issue is a feature request, not a scanner-detectable storefront defect.',
      cause: 'This is a product request rather than a storefront defect.',
      nextSteps: [
        'Log or search the request in Savio: https://www.savio.io/app/feature-requests?state=ALL_ACTIVE',
        'Reply with current behavior and avoid promising release dates.'
      ],
      merchantAngle: 'We can pass this request to the product team for consideration, but cannot promise timing.',
      internalNote: 'Use Savio for feature tracking.',
      escalation: 'No dev escalation unless requested by product.',
      devEscalationNeeded: false,
      accessNeeded: false
    },
    {
      id: 'shopify-limitation',
      label: 'Shopify limitation',
      confidence: 'Medium',
      category: 'Shopify limitation',
      summary: 'The selected issue is likely limited by Shopify platform behavior and needs expectation-setting rather than a storefront fix.',
      cause: 'The selected issue is likely constrained by Shopify platform behavior.',
      nextSteps: [
        'Explain the Shopify limitation plainly.',
        'Offer the closest available workaround if one exists.',
        'Avoid promising behavior that third-party apps cannot control.'
      ],
      merchantAngle: 'This behavior is controlled by Shopify, so the app cannot fully override it.',
      internalNote: 'Selected issue is categorized as a Shopify limitation.',
      escalation: 'No dev escalation unless the app behaves differently from documented limitations.',
      devEscalationNeeded: false,
      accessNeeded: false
    },
    {
      id: 'third-party-conflict',
      label: 'Third-party conflict isolation test',
      confidence: 'Medium',
      category: 'Third-party app conflict',
      summary: 'The selected issue may be caused by theme code or another app. This needs an isolation test before claiming a root cause.',
      cause: 'The selected issue may be caused by theme code or another app changing storefront behavior.',
      nextSteps: [
        'Test on Dawn or a clean theme preview.',
        'Temporarily disable likely conflicting app embeds if merchant approves.',
        'Compare Console and Network behavior between active theme and clean theme.'
      ],
      merchantAngle: 'We need to isolate whether another app or theme script is interfering with this app.',
      internalNote: 'Selected issue is categorized as a conflict.',
      escalation: 'Escalate after a clean-theme comparison shows the Essential app still fails.',
      devEscalationNeeded: false,
      accessNeeded: true
    },
    {
      id: 'geolocation-verification',
      label: 'Geolocation issue needs country or VPN verification',
      confidence: 'Medium',
      category: 'Setup issue',
      summary: 'The selected issue appears location-related. The scanner can support evidence, but country or VPN verification is still needed.',
      cause: 'Location-targeted behavior must be verified from the affected country or with reliable VPN evidence.',
      nextSteps: [
        'Ask the merchant for affected country, expected rule, and screenshot.',
        'Verify with VPN or location-specific test if available.',
        'Check whether Shopify Markets or currency settings affect the result.'
      ],
      merchantAngle: 'We need to verify the storefront from the affected location to confirm the targeting behavior.',
      internalNote: 'Issue wording suggests geolocation or country targeting.',
      escalation: 'Escalate only after location-specific evidence is collected.',
      devEscalationNeeded: false,
      accessNeeded: false
    }
  ]
};
