// ============================================================
// SUPPORT PLAYBOOK DATA
// Shared case categories, statuses, known limitations, and links.
// Keep URLs authoritative and update lastReviewed when content is checked.
// ============================================================

window.ESSENTIAL_ROOT_CAUSES = [
  { id: 'configuration', label: 'Configuration issue' },
  { id: 'theme-conflict', label: 'Theme or third-party conflict' },
  { id: 'shopify-limitation', label: 'Shopify limitation' },
  { id: 'product-limitation', label: 'Product limitation or missing feature' },
  { id: 'app-bug', label: 'Genuine application bug' },
  { id: 'feature-request', label: 'Feature request' }
];

window.ESSENTIAL_CASE_STATUSES = [
  'Needs merchant information',
  'Needs access',
  'Configuration guidance',
  'Known limitation',
  'Feature request logged',
  'Engineering investigation',
  'Waiting for engineering',
  'Ready for merchant retest',
  'Waiting for merchant',
  'Resolved'
];

window.ESSENTIAL_KNOWN_LIMITATIONS = [
  {
    id: 'native-shopify-pricing',
    category: 'Pricing and cart',
    title: 'Native Shopify pricing',
    summary: 'Essential Upsell reads Shopify product and variant pricing. Prices stored only in custom metafields are not automatically displayed.',
    workaround: 'Use Shopify native variant pricing or confirm that an explicit integration exists before promising compatibility.'
  },
  {
    id: 'cart-drawer-replacement',
    category: 'Pricing and cart',
    title: 'Cart drawer replacement',
    summary: 'Essential Cart Drawer replaces the current drawer and may conflict with stores that depend on custom cart pricing or promotion logic.',
    workaround: 'Use standalone Free Shipping and Upsell widgets when replacing the merchant drawer is not appropriate.'
  },
  {
    id: 'checkout-discount-rules',
    category: 'Checkout and discounts',
    title: 'Shopify discount combinations',
    summary: 'Shopify discount-combination rules can remove or override an app reward or discount.',
    workaround: 'Reproduce with the exact cart, campaign, customer type, and discount code before escalating.'
  },
  {
    id: 'accelerated-checkout',
    category: 'Checkout and discounts',
    title: 'Accelerated checkout eligibility',
    summary: 'Accelerated checkout and some payment methods may skip required cart attributes or post-purchase eligibility.',
    workaround: 'Test the standard checkout and record the exact payment method used.'
  },
  {
    id: 'loyalty-flow-differences',
    category: 'Loyalty',
    title: 'Separate loyalty flows',
    summary: 'Verification codes, referral rewards, signup rewards, customer synchronization, and marketing consent are separate processes.',
    workaround: 'Confirm which flow the merchant means and validate its own configuration and customer record.'
  },
  {
    id: 'mobile-reflow',
    category: 'Mobile and layout',
    title: 'Responsive mobile layout',
    summary: 'Mobile widgets may intentionally reflow to one column or a compact layout.',
    workaround: 'Treat unsupported fixed desktop layouts as customization or feature requests rather than defects.'
  }
];

window.ESSENTIAL_INTERNAL_PROCEDURES = [
  {
    id: 'feature-request-intake',
    appIds: ['all'],
    title: 'Feature request intake',
    summary: 'Separate a missing capability from a defect, search Savio before adding a request, and never promise a delivery date.',
    steps: [
      'Confirm that the requested behavior is not already supported or documented.',
      'Search Savio using the app name and the merchant use case.',
      'Add evidence to an existing request when one matches; otherwise create a new request.',
      'Record the use case, current limitation, closest workaround, affected ticket, and evidence.',
      'Tell the merchant the request is documented without suggesting a release date.'
    ],
    links: [
      { label: 'Open all active Savio requests', url: 'https://www.savio.io/app/feature-requests?state=ALL_ACTIVE' }
    ]
  },
  {
    id: 'five-star-review-attribution',
    appIds: ['all'],
    title: '5-star review attribution',
    summary: 'Attribute a qualifying HelpScout review to the colleague whose recent app-specific support most directly produced the result.',
    steps: [
      'Find the merchant in Shopify Partners and copy the .myshopify.com domain.',
      'Search HelpScout for that domain and confirm the conversation concerns the reviewed app.',
      'Confirm that the conversation is within the 10-day eligibility window.',
      'Credit the colleague who made or escalated the last fix; for informational cases, credit the last colleague who supplied the relevant app guidance.',
      'When both a fix and informational guidance were supplied by different colleagues, credit the fix.',
      'Add the HelpScout conversation link to the tracker and increment the correct colleague once.'
    ],
    links: [
      { label: 'Watch the review attribution walkthrough', url: 'https://www.loom.com/share/b88d30e2765d4296856078abbf40272f' },
      { label: 'Open the 5-star review tracker', url: 'https://docs.google.com/spreadsheets/d/1-hm-p62Ffk1iO5C_Xl_0ZGyPrD16XnrOz3RobrceLCA/edit?usp=sharing' }
    ]
  },
  {
    id: 'preorder-shop-info',
    appIds: ['essential-preorder-presale'],
    title: 'Inspect Preorder shop information',
    summary: 'Use the app internal shop-information view to understand store configuration when preorder behavior is unclear.',
    steps: [
      'Open the affected merchant inside the Preorder app.',
      'Append /app/shop-info to the current app URL.',
      'Compare the shop information with the affected product, inventory, location, and campaign setup.',
      'Record only the relevant findings in the ticket; do not paste unrelated merchant data.'
    ]
  },
  {
    id: 'geolocation-verification',
    appIds: ['essential-free-shipping', 'essential-announcement-bar'],
    title: 'Verify storefront geolocation',
    summary: 'Confirm the country detected by the storefront environment separately from the country configured in targeting rules.',
    steps: [
      'Open the storefront and Developer Tools while geolocation targeting is active.',
      'Find the console line “FSB Client Country: [country]”; no console command is needed.',
      'Compare the detected country with the intended VPN or test location.',
      'If they differ, investigate the IP change or caching before changing app targeting.'
    ]
  }
];

window.ESSENTIAL_SUPPORT_RESOURCES = {
  lastReviewed: '2026-08-11',
  savioAll: 'https://www.savio.io/app/feature-requests?state=ALL_ACTIVE',
  savioCreate: 'https://www.savio.io/app/feature-request/create/?return=/app/feature-requests',
  apps: {
    'essential-countdown-timer': {
      helpCenterUrl: 'https://essentials-docs.helpscoutdocs.com/collection/1-essential-countdown-timer',
      savioUrl: 'https://www.savio.io/app/feature-requests?state=ALL_ACTIVE&search=Countdown+Timer',
      aliases: ['timer', 'countdown']
    },
    'essential-free-shipping': {
      helpCenterUrl: 'https://essentials-docs.helpscoutdocs.com/collection/20-essential-free-shipping-upsell',
      savioUrl: 'https://www.savio.io/app/feature-requests?state=ALL_ACTIVE&search=Free+Shipping+Upsell',
      aliases: ['free shipping', 'booster', 'order value booster']
    },
    'essential-announcement-bar': {
      helpCenterUrl: 'https://essentials-docs.helpscoutdocs.com/collection/33-essential-announcement-bar',
      savioUrl: 'https://www.savio.io/app/feature-requests?state=ALL_ACTIVE&search=Announcement+Bar',
      aliases: ['announcement', 'banner']
    },
    'essential-trust-badges-icons': {
      helpCenterUrl: 'https://essentials-docs.helpscoutdocs.com/collection/30-essential-trust-badges-icons',
      savioUrl: 'https://www.savio.io/app/feature-requests?state=ALL_ACTIVE&search=Trust+Badges',
      aliases: ['trust badges', 'icons', 'banners']
    },
    'ai-seo': {
      helpCenterUrl: 'https://essentials-docs.helpscoutdocs.com/collection/104-essential-ai-seo-ai-blog-post',
      savioUrl: 'https://www.savio.io/app/feature-requests?state=ALL_ACTIVE&search=AI+Blog',
      aliases: ['ai blog', 'seo']
    },
    'essential-loyalty': {
      helpCenterUrl: 'https://essentials-docs.helpscoutdocs.com/collection/71-essential-loyalty-program-rewards',
      savioUrl: 'https://www.savio.io/app/feature-requests?state=ALL_ACTIVE&search=Loyalty+Program',
      aliases: ['loyalty', 'points', 'rewards']
    },
    'essential-upsell-cross-sell': {
      helpCenterUrl: 'https://essentials-docs.helpscoutdocs.com/collection/58-essential-upsell-cross-sell',
      savioUrl: 'https://www.savio.io/app/feature-requests?state=ALL_ACTIVE&search=Upsell+Cross+Sell',
      aliases: ['upsell', 'cross sell', 'post purchase']
    },
    'sticky-atc': {
      helpCenterUrl: 'https://essentials-docs.helpscoutdocs.com/collection/67-essential-slide-cart-drawer',
      savioUrl: 'https://www.savio.io/app/feature-requests?state=ALL_ACTIVE&search=Sticky+Cart',
      aliases: ['sticky cart', 'sticky add to cart']
    },
    'essential-preorder-presale': {
      helpCenterUrl: 'https://essentials-docs.helpscoutdocs.com/collection/54-essential-preorder-back-in-stock',
      savioUrl: 'https://www.savio.io/app/feature-requests?state=ALL_ACTIVE&search=Preorder+Presale',
      aliases: ['preorder', 'presale', 'back in stock']
    },
    'essential-cart-drawer': {
      helpCenterUrl: 'https://essentials-docs.helpscoutdocs.com/collection/67-essential-slide-cart-drawer',
      savioUrl: 'https://www.savio.io/app/feature-requests?state=ALL_ACTIVE&search=Cart+Drawer+-',
      aliases: ['cart drawer', 'slide cart']
    },
    'essential-estimated-delivery': {
      helpCenterUrl: 'https://essentials-docs.helpscoutdocs.com/collection/179-essential-estimated-delivery-date',
      savioUrl: 'https://www.savio.io/app/feature-requests?state=ALL_ACTIVE&search=Estimated+Delivery',
      aliases: ['delivery date', 'estimated delivery']
    },
    'rockit-discounts-sales': {
      helpCenterUrl: 'https://essentials-docs.helpscoutdocs.com/collection/101-rockit-discounts-sales-app',
      savioUrl: 'https://www.savio.io/app/feature-requests?state=ALL_ACTIVE&search=Rockit+Sales',
      aliases: ['rockit', 'discounts', 'sales']
    },
    'essential-subscriptions': {
      helpCenterUrl: 'https://essentials-docs.helpscoutdocs.com/collection/214-essential-subscriptions-app',
      savioUrl: 'https://www.savio.io/app/feature-requests?state=ALL_ACTIVE&search=Subscriptions+app',
      aliases: ['subscriptions', 'subscription', 'recurring purchase'],
      articles: [
        ['Getting started', 'https://essentials-docs.helpscoutdocs.com/article/218-getting-started-with-essential-subscriptions'],
        ['Create a subscription campaign', 'https://essentials-docs.helpscoutdocs.com/article/219-create-subscription-campaign'],
        ['Customize the subscription widget', 'https://essentials-docs.helpscoutdocs.com/article/220-customise-subscription-widget'],
        ['Set up the customer portal', 'https://essentials-docs.helpscoutdocs.com/article/221-setup-customer-portal'],
        ['Manage subscriptions', 'https://essentials-docs.helpscoutdocs.com/article/222-manage-subscriptions'],
        ['Customer notification emails', 'https://essentials-docs.helpscoutdocs.com/article/224-customer-notification-emails'],
        ['Customize sender email', 'https://essentials-docs.helpscoutdocs.com/article/226-customise-sender-email'],
        ['Billing and inventory settings', 'https://essentials-docs.helpscoutdocs.com/article/227-billing-and-inventory-settings'],
        ['Subscription analytics', 'https://essentials-docs.helpscoutdocs.com/article/228-subscription-analytics'],
        ['Show subscriptions as an upsell', 'https://essentials-docs.helpscoutdocs.com/article/269-show-subscription-as-upsell']
      ]
    },
    'essential-free-gifts-bogo': {
      helpCenterUrl: 'https://essentials-docs.helpscoutdocs.com/collection/249-essential-free-gifts-bogo',
      savioUrl: 'https://www.savio.io/app/feature-requests?state=ALL_ACTIVE&search=BOGO+-+',
      aliases: ['free gifts', 'bogo', 'bxgy', 'gift with purchase'],
      articles: [
        ['Getting started', 'https://essentials-docs.helpscoutdocs.com/article/257-getting-started-with-essential-free-gifts'],
        ['Offer types', 'https://essentials-docs.helpscoutdocs.com/article/258-offer-types'],
        ['Set up BXGY or BOGO', 'https://essentials-docs.helpscoutdocs.com/article/259-setting-up-a-bxgy-or-bogo-offer'],
        ['Set up Spend X Get Gift', 'https://essentials-docs.helpscoutdocs.com/article/260-setting-up-a-spend-x-get-gift-offer'],
        ['Widget placements and design', 'https://essentials-docs.helpscoutdocs.com/article/261-widget-placements-and-design'],
        ['Scheduling, markets, and customer targeting', 'https://essentials-docs.helpscoutdocs.com/article/262-scheduling-and-markets'],
        ['Translations', 'https://essentials-docs.helpscoutdocs.com/article/263-translations'],
        ['Widget not showing', 'https://essentials-docs.helpscoutdocs.com/article/264-troubleshooting-widget-not-showing']
      ]
    },
    'essential-checkout': {
      helpCenterUrl: 'https://essentials-docs.helpscoutdocs.com/collection/266-essential-checkout',
      savioUrl: 'https://www.savio.io/app/feature-requests?state=ALL_ACTIVE&search=Essential+Checkout',
      aliases: ['checkout', 'checkout rules', 'shopify functions'],
      articles: [
        ['Getting started', 'https://essentials-docs.helpscoutdocs.com/article/271-checkout-getting-started'],
        ['Building conditions', 'https://essentials-docs.helpscoutdocs.com/article/272-checkout-conditions'],
        ['Delivery method customizations', 'https://essentials-docs.helpscoutdocs.com/article/273-checkout-delivery-customizations'],
        ['Payment method customizations', 'https://essentials-docs.helpscoutdocs.com/article/274-checkout-payments-customization'],
        ['Validate and block checkout', 'https://essentials-docs.helpscoutdocs.com/article/275-validate-block-checkout'],
        ['Manage and publish rules', 'https://essentials-docs.helpscoutdocs.com/article/276-manage-checkout-rules'],
        ['Troubleshooting and FAQ', 'https://essentials-docs.helpscoutdocs.com/article/277-troubleshooting-faq']
      ]
    }
  }
};
