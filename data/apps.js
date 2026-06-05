// ============================================================
// APPS DATA
// Add new apps to this array. Each app needs:
//   id, name, slug, access (array of required collaborator permissions)
//   reviewLink (optional) — Shopify App Store review URL for {{review_link}} in macros
// id/slug must be stable — they are referenced in issues.js (appIds)
// and snippets.js (appId).
// ============================================================

window.ESSENTIAL_APPS = [
  {
    id: 'essential-countdown-timer',
    name: 'Essential Countdown Timer Bar',
    slug: 'essential-countdown-timer',
    consoleKey: 'window.essentialCountdownTimerConfigs',
    reviewLink: 'https://apps.shopify.com/essential-countdown-timer#modal-show=ReviewListingModal',
    access: [
      'Themes',
      'Edit theme code',
      'Manage and install apps and channels',
      'Products'
    ]
  },
  {
    id: 'essential-free-shipping',
    name: 'Essential Free Shipping Upsell',
    slug: 'essential-free-shipping',
    consoleKey: 'window.essentialOrderValueBoosterConfigs',
    reviewLink: 'https://apps.shopify.com/essential-order-value-booster#modal-show=ReviewListingModal',
    access: [
      'Themes',
      'Edit theme code',
      'Manage and install apps and channels',
      'Products',
      'Manage Settings'
    ]
  },
  {
    id: 'essential-announcement-bar',
    name: 'Essential Announcement Bar',
    slug: 'essential-announcement-bar',
    consoleKey: 'window.essentialAnnouncementConfigs',
    reviewLink: 'https://apps.shopify.com/essential-announcement-bar#modal-show=ReviewListingModal',
    access: [
      'Themes',
      'Edit theme code',
      'Manage and install apps and channels',
      'Products'
    ]
  },
  {
    id: 'essential-trust-badges-icons',
    name: 'Essential Trust Badges & Icons',
    slug: 'essential-trust-badges-icons',
    consoleKey: 'window.essentialBannersConfigs',
    reviewLink: 'https://apps.shopify.com/essential-icon-badge-banners#modal-show=ReviewListingModal',
    access: [
      'Themes',
      'Edit theme code',
      'Manage and install apps and channels',
      'Products'
    ]
  },
  {
    id: 'ai-seo',
    name: 'Essential AI SEO: AI Blog Post',
    slug: 'ai-seo',
    consoleKey: null,
    reviewLink: 'https://apps.shopify.com/essential-seo-ai-blog-writer#modal-show=ReviewListingModal',
    access: [
      'Themes',
      'Edit theme code',
      'Manage and install apps and channels',
      'Blog posts and pages'
    ]
  },
  {
    id: 'essential-loyalty',
    name: 'E! Loyalty Program & Rewards',
    slug: 'essential-loyalty',
    consoleKey: 'window.essentialLoyaltyConfig',
    reviewLink: 'https://apps.shopify.com/essential-loyalty-rewards-program#modal-show=ReviewListingModal',
    access: [
      'Themes',
      'Edit theme code',
      'Manage and install apps and channels',
      'Customers',
      'Orders'
    ]
  },
  {
    id: 'essential-upsell-cross-sell',
    name: 'Essential Upsell & Cross Sell',
    slug: 'essential-upsell-cross-sell',
    consoleKey: 'window.essentialUpsellConfigs',
    reviewLink: 'https://apps.shopify.com/essential-post-purchase-upsell#modal-show=ReviewListingModal',
    access: [
      'Themes',
      'Edit theme code',
      'Manage and install apps and channels',
      'Products',
      'Discounts'
    ]
  },
  {
    id: 'sticky-atc',
    name: 'Essential Sticky Add to Cart',
    slug: 'sticky-atc',
    consoleKey: null,
    access: [
      'Themes',
      'Edit theme code',
      'Manage and install apps and channels',
      'Products',
      'Discounts'
    ]
  },
  {
    id: 'essential-preorder-presale',
    name: 'Essential Preorder & Presale',
    slug: 'essential-preorder-presale',
    consoleKey: 'window.essentialPreorderConfigs',
    reviewLink: 'https://apps.shopify.com/essential-pre-order#modal-show=ReviewListingModal',
    access: [
      'Themes',
      'Edit theme code',
      'Manage and install apps and channels',
      'Products',
      'Orders',
      'Locations'
    ]
  },
  {
    id: 'essential-cart-drawer',
    name: 'Essential Cart Drawer',
    slug: 'essential-cart-drawer',
    consoleKey: 'window.essentialCartConfigs',
    reviewLink: 'https://apps.shopify.com/essential-cart-drawer#modal-show=ReviewListingModal',
    access: [
      'Themes',
      'Edit theme code',
      'Manage and install apps and channels',
      'Products',
      'Discounts'
    ]
  },
  {
    id: 'essential-estimated-delivery',
    name: 'Essential Estimated Delivery',
    slug: 'essential-estimated-delivery',
    consoleKey: 'window.essentialEstimetedDeliveryConfigs',
    reviewLink: 'https://apps.shopify.com/essential-estimated-delivery#modal-show=ReviewListingModal',
    access: [
      'Themes',
      'Edit theme code',
      'Manage and install apps and channels',
      'Products'
    ]
  },
  {
    id: 'rockit-discounts-sales',
    name: 'Rockit Discounts & Sales',
    slug: 'rockit-discounts-sales',
    consoleKey: null,
    access: [
      'Themes',
      'Edit theme code',
      'Manage and install apps and channels',
      'Products',
      'Discounts'
    ]
  }
  // TODO: Add more apps here as they are onboarded to support
];

window.ESSENTIAL_APPS.sort(function (a, b) {
  return a.name.localeCompare(b.name);
});

(function loadUiEnhancements() {
  function appendEnhancementsScript() {
    if (document.querySelector('script[src="enhancements.js"]')) return;

    var script = document.createElement('script');
    script.src = 'enhancements.js';
    script.defer = true;
    document.body.appendChild(script);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(appendEnhancementsScript, 0);
    });
  } else {
    setTimeout(appendEnhancementsScript, 0);
  }
})();
