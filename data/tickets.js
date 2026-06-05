// ============================================================
// SAMPLE TICKETS DATA
// Add internal support examples here. These are static references
// for agents and are safe to edit in a text editor.
//
// Required fields:
//   id, title, appId, issueId, tags, customerSummary, diagnosis,
//   resolution, reply, source
//
// appId must match data/apps.js.
// issueId should match data/issues.js when possible.
// Do not include private customer data, store passwords, tokens,
// API keys, or merchant secrets.
// ============================================================

window.ESSENTIAL_TICKETS = [
  {
    id: 'ticket-preorder-button-not-showing-dawn',
    title: 'Preorder button hidden after theme switch',
    appId: 'essential-preorder-presale',
    issueId: 'preorder-button-not-showing',
    tags: ['theme-switch', 'app-embed', 'product-page'],
    customerSummary: 'Merchant switched themes and the preorder button stopped replacing the Add to Cart button.',
    diagnosis: 'The new live theme did not have the Essential Preorder app embed enabled, so the storefront config never loaded.',
    resolution: 'Enabled the app embed in Theme Customizer, confirmed the campaign was active, then hard-refreshed the product page.',
    reply: 'The preorder button was not showing because the app embed was disabled on the new theme. I enabled it, saved the theme, and confirmed the preorder button is loading again on the product page.',
    source: 'Internal sample'
  },
  {
    id: 'ticket-free-shipping-currency-market',
    title: 'Free shipping bar using the wrong currency',
    appId: 'essential-free-shipping',
    issueId: 'currency-issue',
    tags: ['markets', 'currency', 'cart'],
    customerSummary: 'Merchant expected the free shipping threshold to display in the buyer market currency.',
    diagnosis: 'The bar was configured with a fixed threshold that did not match the active Shopify Markets currency behavior.',
    resolution: 'Adjusted the app currency settings and explained that Shopify Markets conversion can affect the displayed threshold.',
    reply: 'The free shipping bar was using the configured threshold rather than the expected market-specific amount. I adjusted the currency setup and confirmed the cart bar now reflects the correct storefront behavior.',
    source: 'Internal sample'
  },
  {
    id: 'ticket-countdown-fixed-minutes-session',
    title: 'Fixed minutes timer disappears after first visit',
    appId: 'essential-countdown-timer',
    issueId: 'fixed-minutes-not-showing',
    tags: ['fixed-minutes', 'cookies', 'testing'],
    customerSummary: 'Merchant reported that a fixed minutes countdown appeared once and then disappeared during testing.',
    diagnosis: 'The timer had already completed for that browser session, which is expected for fixed minutes campaigns.',
    resolution: 'Tested in incognito to confirm the timer appeared for a fresh session and sent guidance on how fixed minutes timers work.',
    reply: 'The timer is working as expected. Fixed minutes timers are session-based, so after the countdown finishes in one browser session it will not restart there. Testing in an incognito window shows the fresh visitor experience.',
    source: 'Internal sample'
  },
  {
    id: 'ticket-cart-drawer-third-party-checkout',
    title: 'Checkout button redirected by another app',
    appId: 'essential-cart-drawer',
    issueId: 'checkout-button-redirect',
    tags: ['checkout', 'third-party-conflict', 'cart-drawer'],
    customerSummary: 'Merchant said the cart drawer checkout button opened a subscription checkout instead of Shopify checkout.',
    diagnosis: 'A third-party subscription app was rewriting the checkout URL after the cart drawer rendered.',
    resolution: 'Identified the conflicting script, documented the behavior, and advised testing with the third-party checkout app disabled.',
    reply: 'The cart drawer checkout button is being modified by a third-party checkout/subscription script after our drawer loads. Please test with that app disabled or contact the checkout app team so they can stop rewriting this button.',
    source: 'Internal sample'
  },
  {
    id: 'ticket-feature-request-savio',
    title: 'Merchant requested custom widget placement option',
    appId: 'essential-trust-badges-icons',
    issueId: 'feature-request',
    tags: ['feature-request', 'savio', 'placement'],
    customerSummary: 'Merchant wanted a new dashboard setting for placing badges in a custom product-page location.',
    diagnosis: 'The requested no-code placement option did not exist in the app settings.',
    resolution: 'Checked Savio for an existing request, logged the use case, and sent the feature request reply without promising a timeline.',
    reply: 'Thanks for sharing this use case. This placement option is not currently available as a dashboard setting, so I have logged it as a feature request for product review. I cannot promise a timeline, but your example helps the team evaluate demand.',
    source: 'Internal sample'
  }
];
