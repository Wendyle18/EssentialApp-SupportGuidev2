// ============================================================
// SNIPPETS DATA
// type: 'css' | 'js' | 'liquid' | 'html' | 'console' | 'class'
// appId: matches app slug in apps.js, or null for generic
// tags: used for filtering
// ============================================================

window.ESSENTIAL_SNIPPETS = [
  // --- Console Commands ---
  {
    id: 'console-countdown',
    label: 'Countdown Timer: Check Config',
    type: 'console',
    appId: 'essential-countdown-timer',
    tags: ['debug', 'console', 'countdown'],
    code: 'window.essentialCountdownTimerConfigs'
  },
  {
    id: 'console-free-shipping',
    label: 'Free Shipping Upsell: Check Config',
    type: 'console',
    appId: 'essential-free-shipping',
    tags: ['debug', 'console', 'free-shipping'],
    code: 'window.essentialOrderValueBoosterConfigs'
  },
  {
    id: 'console-banners',
    label: 'Trust Badges: Check Config',
    type: 'console',
    appId: 'essential-trust-badges-icons',
    tags: ['debug', 'console', 'trust-badges'],
    code: 'window.essentialBannersConfigs'
  },
  {
    id: 'console-announcement',
    label: 'Announcement Bar: Check Config',
    type: 'console',
    appId: 'essential-announcement-bar',
    tags: ['debug', 'console', 'announcement'],
    code: 'window.essentialAnnouncementConfigs'
  },
  {
    id: 'console-upsell',
    label: 'Upsell & Cross Sell: Check Config',
    type: 'console',
    appId: 'essential-upsell-cross-sell',
    tags: ['debug', 'console', 'upsell'],
    code: 'window.essentialUpsellConfigs'
  },
  {
    id: 'console-loyalty',
    label: 'Loyalty: Check Config',
    type: 'console',
    appId: 'essential-loyalty',
    tags: ['debug', 'console', 'loyalty'],
    code: 'window.essentialLoyaltyConfig'
  },
  {
    id: 'console-preorder',
    label: 'Preorder: Check Config',
    type: 'console',
    appId: 'essential-preorder-presale',
    tags: ['debug', 'console', 'preorder'],
    code: 'window.essentialPreorderConfigs'
  },
  {
    id: 'console-cart',
    label: 'Cart Drawer: Check Config',
    type: 'console',
    appId: 'essential-cart-drawer',
    tags: ['debug', 'console', 'cart'],
    code: 'window.essentialCartConfigs'
  },
  {
    id: 'console-delivery',
    label: 'Estimated Delivery: Check Config',
    type: 'console',
    appId: 'essential-estimated-delivery',
    tags: ['debug', 'console', 'delivery'],
    code: 'window.essentialEstimetedDeliveryConfigs'
  },
  {
    id: 'console-cart-api',
    label: 'Cart API: Check Cart State',
    type: 'console',
    appId: 'essential-cart-drawer',
    tags: ['debug', 'console', 'cart', 'api'],
    code: 'window.essentialCartApi'
  },
  {
    id: 'console-product-tags',
    label: 'Product Tags: Check Loaded Tags',
    type: 'console',
    appId: null,
    tags: ['debug', 'console', 'product'],
    code: 'essentialProductTags'
  },
  {
    id: 'console-debugger',
    label: 'Debugger: Pause JS for 1 Second',
    type: 'console',
    appId: null,
    tags: ['debug', 'console', 'general'],
    code: 'setTimeout(function(){debugger;}, 1000)'
  },

  // --- JavaScript Snippets ---
  {
    id: 'upsell-cart-refresh',
    label: 'Upsell: Enable Cart Refresh Helper',
    type: 'js',
    appId: 'essential-upsell-cross-sell',
    tags: ['upsell', 'cart', 'fix', 'js'],
    description: 'Add this to theme.liquid before </body> if upsell widget does not refresh after cart update.',
    code: '<script>window.essentialUpdateCartRefresh = true;</script>'
  },

  // --- CSS Snippets ---
  {
    id: 'upsell-title-wrap',
    label: 'Upsell: Fix Title Text Wrap',
    type: 'css',
    appId: 'essential-upsell-cross-sell',
    tags: ['upsell', 'css', 'fix', 'layout'],
    description: 'Use when upsell product title is being cut off or overflowing.',
    code: '[data-essential-upsell-element="title"] {\n  text-wrap: unset !important;\n}'
  },
  {
    id: 'upsell-image-contain',
    label: 'Upsell: Image Object-Fit Contain',
    type: 'css',
    appId: 'essential-upsell-cross-sell',
    tags: ['upsell', 'css', 'fix', 'image'],
    description: 'Use when upsell product images are being cropped and should show the full product.',
    code: '[data-essential-upsell-element="image-container"] > [data-essential-upsell-element="image"] {\n  object-fit: contain !important;\n}'
  },
  {
    id: 'countdown-center-title-subheading',
    label: 'Countdown Timer: Center Title and Subheading',
    type: 'css',
    appId: 'essential-countdown-timer',
    tags: ['countdown', 'css', 'alignment', 'top-bar'],
    description: 'Centers both title and subheading text in the top bar countdown timer.',
    code: '.essential_countdown_annoucement_bar_wrapper > div > p {\n  text-align: center !important;\n}'
  },
  {
    id: 'countdown-hide-days',
    label: 'Countdown Timer: Hide Days',
    type: 'css',
    appId: 'essential-countdown-timer',
    tags: ['countdown', 'css', 'timer', 'days'],
    description: 'Removes the days unit from the timer display.',
    code: '.essential_countdown_annoucement_bar_wrapper > div > .essential_countdown_timer span:first-child,\n.essential_countdown_annoucement_bar_wrapper > div > .essential_countdown_timer span:nth-child(2) {\n  display: none;\n}\n\n.essential_countdown_annoucement_bar_wrapper > div > .essential_countdown_timer :nth-child(8) {\n  visibility: hidden;\n  display: none;\n}\n\n.essential_countdown_annoucement_bar_wrapper > div > .essential_countdown_timer {\n  grid-template-columns: 1fr 10px 1fr 10px 1fr 10px !important;\n}'
  },
  {
    id: 'countdown-hide-days-hours',
    label: 'Countdown Timer: Hide Days and Hours',
    type: 'css',
    appId: 'essential-countdown-timer',
    tags: ['countdown', 'css', 'timer', 'days', 'hours'],
    description: 'Removes days and hours from the countdown timer display.',
    code: '.essential_countdown_timer span:nth-child(1),\n.essential_countdown_timer span:nth-child(2),\n.essential_countdown_timer span:nth-child(3),\n.essential_countdown_timer span:nth-child(4) {\n  display: none !important;\n}\n\n.essential_countdown_timer :nth-child(8),\n.essential_countdown_timer :nth-child(9) {\n  display: none !important;\n}\n\n.essential_countdown_timer {\n  margin-left: 0 !important;\n  justify-content: center !important;\n  justify-items: center !important;\n  grid-template-columns: 1fr 10px 1fr !important;\n}'
  },
  {
    id: 'trust-badges-two-rows',
    label: 'Trust Badges: Force Two Rows',
    type: 'css',
    appId: 'essential-trust-badges-icons',
    tags: ['trust-badges', 'css', 'layout'],
    description: 'Demo CSS for edge cases where badges need to be forced into two columns/rows. Prefer app Design settings first.',
    code: '.icon-block-container {\n  display: grid !important;\n  grid-template-columns: 1fr 1fr !important;\n}'
  },
  {
    id: 'trust-badges-mobile-smaller',
    label: 'Trust Badges: Smaller on Mobile',
    type: 'css',
    appId: 'essential-trust-badges-icons',
    tags: ['trust-badges', 'css', 'mobile'],
    description: 'Makes badge icons and text smaller on mobile. Adjust pixel values per store.',
    code: '@media screen and (max-width: 767px) {\n  .icon-container {\n    background-size: 24px !important;\n  }\n\n  .title {\n    font-size: 12px !important;\n  }\n\n  .subheading {\n    font-size: 10px !important;\n  }\n}'
  },
  {
    id: 'trust-badges-left-align',
    label: 'Trust Badges: Left Align Icons and Text',
    type: 'css',
    appId: 'essential-trust-badges-icons',
    tags: ['trust-badges', 'css', 'alignment'],
    description: 'Left-aligns the badge icons and text.',
    code: '[data-banner] {\n  padding-left: 0 !important;\n}\n\n.icon-block > .text-container {\n  align-items: baseline !important;\n  text-align: left !important;\n}\n\n.icon-block > .icon-container {\n  margin: unset !important;\n  padding-left: 0 !important;\n}'
  },
  {
    id: 'trust-badges-link-same-tab',
    label: 'Trust Badges: Open Banner Link in Same Tab',
    type: 'js',
    appId: 'essential-trust-badges-icons',
    tags: ['trust-badges', 'js', 'link', 'new-tab'],
    description: 'Add before </head> in theme.liquid to stop icon badge banner buttons or whole-banner links from opening in a new tab.',
    code: '<script>\n  document.addEventListener("DOMContentLoaded", function() {\n    var names = [\'cta-button\', \'cta-whole\'];\n    names.forEach(function(name) {\n      function removeTarget(elements) {\n        Array.from(elements).forEach(function(element) {\n          if (element.getAttribute(\'target\') === \'_blank\') {\n            element.removeAttribute(\'target\');\n          }\n        });\n      }\n      var elementById = document.getElementById(name);\n      if (elementById) {\n        removeTarget([elementById]);\n      }\n      var elementsByClass = document.getElementsByClassName(name);\n      removeTarget(elementsByClass);\n    });\n  });\n</script>'
  },
  {
    id: 'free-shipping-hide-mini-cart-upsell',
    label: 'Free Shipping: Hide Upsell Products in Mini Cart',
    type: 'css',
    appId: 'essential-free-shipping',
    tags: ['free-shipping', 'css', 'mini-cart', 'upsell'],
    description: 'Removes the upsell products section from the cart page booster on the mini cart.',
    code: '.placement_side_cart .upsell_products {\n  display: none !important;\n}'
  },
  {
    id: 'free-shipping-cart-drawer-width',
    label: 'Free Shipping: Fix Stretched Cart Drawer Booster Width',
    type: 'css',
    appId: 'essential-free-shipping',
    tags: ['free-shipping', 'css', 'cart-drawer', 'width'],
    description: 'Fixes cases where the cart page booster makes the cart drawer too wide.',
    code: '.placement_side_cart {\n  margin: auto !important;\n}\n@media (min-width: 2101px) { .placement_side_cart { width: 15vw !important; } }\n@media (min-width: 1750px) and (max-width: 2100px) { .placement_side_cart { width: 18vw !important; } }\n@media (min-width: 1500px) and (max-width: 1749px) { .placement_side_cart { width: 20vw !important; } }\n@media (min-width: 1350px) and (max-width: 1499px) { .placement_side_cart { width: 23vw !important; } }\n@media (min-width: 1150px) and (max-width: 1349px) { .placement_side_cart { width: 26vw !important; } }\n@media (min-width: 1000px) and (max-width: 1149px) { .placement_side_cart { width: 31vw !important; } }\n@media (min-width: 850px) and (max-width: 999px) { .placement_side_cart { width: 36vw !important; } }\n@media (min-width: 790px) and (max-width: 849px) { .placement_side_cart { width: 38vw !important; } }\n@media (min-width: 700px) and (max-width: 789px) { .placement_side_cart { width: 43vw !important; } }\n@media (min-width: 650px) and (max-width: 699px) { .placement_side_cart { width: 49vw !important; } }\n@media (min-width: 549px) and (max-width: 649px) { .placement_side_cart { width: 55vw !important; } }\n@media (min-width: 475px) and (max-width: 549px) { .placement_side_cart { width: 65vw !important; } }\n@media (min-width: 300px) and (max-width: 474px) { .placement_side_cart { width: 90vw !important; } }'
  },
  {
    id: 'upsell-line-item-property-liquid',
    label: 'Upsell: Hide Internal Line Item Property',
    type: 'liquid',
    appId: 'essential-upsell-cross-sell',
    tags: ['upsell', 'liquid', 'line-item-property', 'cart'],
    description: 'Use in cart drawer or cart page when internal Upsell line item properties appear. Replace the existing blank-property unless condition.',
    code: 'From:\n{%- unless p.last == blank -%}\n\nTo:\n{% unless p.first contains \'__essential_upsell\' or p.last == blank %}'
  },
  {
    id: 'preorder-line-item-property-liquid',
    label: 'Preorder: Hide Internal Line Item Property',
    type: 'liquid',
    appId: 'essential-preorder-presale',
    tags: ['preorder', 'liquid', 'line-item-property', 'cart'],
    description: 'Use in cart drawer or cart page when internal Preorder line item properties appear. Replace the existing blank-property unless condition.',
    code: 'From:\n{%- unless p.last == blank -%}\n\nTo:\n{% unless p.first contains \'_essential\' or p.last == blank %}'
  },
  {
    id: 'announcement-simple-center-text',
    label: 'Announcement Bar: Center Simple Bar Text',
    type: 'css',
    appId: 'essential-announcement-bar',
    tags: ['announcement', 'css', 'alignment', 'simple'],
    description: 'Centers title and subheading on the simple announcement bar type.',
    code: '.essential_annoucement_bar_wrapper > div > div > div > div,\n.essential_annoucement_bar_wrapper > div > div > div > p {\n  text-align: center !important;\n}'
  },
  {
    id: 'announcement-rotating-center-text',
    label: 'Announcement Bar: Center Rotating Bar Text',
    type: 'css',
    appId: 'essential-announcement-bar',
    tags: ['announcement', 'css', 'alignment', 'rotating'],
    description: 'Centers title and subheading on the rotating announcement bar type.',
    code: '.essential_annoucement_bar_glide__slide > div > div,\n.essential_annoucement_bar_glide__slide > div > p {\n  text-align: center !important;\n}'
  },
  {
    id: 'announcement-rtl-rotating-fix',
    label: 'Announcement Bar: RTL Multiple Rotating Fix',
    type: 'js',
    appId: 'essential-announcement-bar',
    tags: ['announcement', 'js', 'rtl', 'rotating'],
    description: 'Fixes multiple rotating announcement bars for right-to-left stores such as Israel or Arabic stores.',
    code: '<script>\ndocument.addEventListener(\'DOMContentLoaded\', function() {\n  new MutationObserver(mutations => {\n    mutations.forEach(m => {\n      if (m.type === \'attributes\' && m.attributeName === \'style\' && m.target.style.transform.includes(\'translate3d(-\')) {\n        m.target.style.setProperty(\'transform\', m.target.style.transform.replace(/translate3d\\(-(\\d+)px/g, \'translate3d($1px\'), \'important\');\n      }\n    });\n  }).observe(document.querySelector(\'.essential_annoucement_bar_glide__slides\'), { attributes: true, attributeFilter: [\'style\'], subtree: true });\n});\n</script>'
  },
  {
    id: 'announcement-button-language-path',
    label: 'Announcement Bar: Keep Button on Current Language',
    type: 'js',
    appId: 'essential-announcement-bar',
    tags: ['announcement', 'js', 'language', 'cta'],
    description: 'Add before </head> in theme.liquid. Replace the CTA button class with the merchant-specific class.',
    code: '<script>\ndocument.addEventListener(\'DOMContentLoaded\', function () {\n  setTimeout(() => {\n    const ctaButton = document.querySelector(\'.essential_annoucement_bar_cta_4f016866-e510-4930-93dc-973ec907eb5f\');\n    if (ctaButton) {\n      const currentUrl = window.location.href;\n      const url = new URL(currentUrl);\n      const pathname = url.pathname;\n      const segments = pathname.split(\'/\');\n      const languagePattern = /^[a-z]{2}(?:-[A-Z]{2})?$/;\n      const hasLanguageCode = segments.length > 1 && languagePattern.test(segments[1]);\n      let baseHref = ctaButton.getAttribute(\'href\');\n      if (baseHref.startsWith(\'/\')) {\n        baseHref = baseHref.substring(1);\n      }\n      let newHref;\n      if (hasLanguageCode) {\n        newHref = `/${segments[1]}/${baseHref}`;\n      } else {\n        newHref = `/${baseHref}`;\n      }\n      ctaButton.setAttribute(\'href\', newHref);\n    }\n  }, 500);\n});\n</script>'
  },
  {
    id: 'cart-api-reference',
    label: 'Cart Drawer API: Public API Reference',
    type: 'js',
    appId: 'essential-cart-drawer',
    tags: ['cart-drawer', 'api', 'reference', 'js'],
    description: 'Reference for the public window.essentialCartApi methods. Always check that the API exists before calling it.',
    code: 'if (window.essentialCartApi) {\n  window.essentialCartApi.openCart();\n  window.essentialCartApi.closeCart();\n  window.essentialCartApi.toggleCart();\n  window.essentialCartApi.isOpen();\n  window.essentialCartApi.getCartData();\n  window.essentialCartApi.getItemCount();\n  window.essentialCartApi.refreshCart();\n  window.essentialCartApi.addItem(variantId, quantity, properties);\n  window.essentialCartApi.removeItem(lineItemKey);\n  window.essentialCartApi.updateItemQuantity(lineItemKey, quantity);\n  window.essentialCartApi.clearCart();\n  window.essentialCartApi.onCartOpen(function () {});\n  window.essentialCartApi.onCartClose(function () {});\n  window.essentialCartApi.onCartUpdate(function (cart) {});\n  window.essentialCartApi.onItemAdd(function () {});\n  window.essentialCartApi.onItemRemove(function () {});\n  window.essentialCartApi.onBeforeCheckout(function () { return true; });\n}'
  },
  {
    id: 'cart-api-continue-shopping',
    label: 'Cart Drawer API: Continue Shopping Link',
    type: 'html',
    appId: 'essential-cart-drawer',
    tags: ['cart-drawer', 'api', 'html', 'close-cart'],
    description: 'Adds a continue shopping link that closes the cart drawer instead of navigating away.',
    code: '<div style="text-align: center;">\n  <a href="https://www.pufa.co.il/"\n     class="button continue-shopping"\n     onclick="if (window.essentialCartApi) { event.preventDefault(); window.essentialCartApi.closeCart(); }">\n    Continue shopping\n  </a>\n</div>'
  },
  {
    id: 'cart-api-view-cart-button',
    label: 'Cart Drawer API: Custom View Cart Button',
    type: 'html',
    appId: 'essential-cart-drawer',
    tags: ['cart-drawer', 'api', 'html', 'open-cart'],
    description: 'Creates a custom button anywhere on the page that opens the cart drawer.',
    code: '<button onclick="window.essentialCartApi && window.essentialCartApi.openCart()">\n  View cart\n</button>'
  },
  {
    id: 'cart-api-quick-add',
    label: 'Cart Drawer API: Quick Add Button',
    type: 'html',
    appId: 'essential-cart-drawer',
    tags: ['cart-drawer', 'api', 'html', 'add-item'],
    description: 'Replace 12345678 with the product variant ID. Adds item, then opens cart drawer.',
    code: '<button onclick="window.essentialCartApi && window.essentialCartApi.addItem(12345678, 1).then(() => window.essentialCartApi.openCart())">\n  Add to cart\n</button>'
  },
  {
    id: 'cart-api-live-total',
    label: 'Cart Drawer API: Live Header Cart Count',
    type: 'html',
    appId: 'essential-cart-drawer',
    tags: ['cart-drawer', 'api', 'html', 'cart-count'],
    description: 'Shows a live cart item count in the header.',
    code: '<span id="my-cart-total">0</span>\n<script>\n  if (window.essentialCartApi) {\n    const update = () => {\n      document.getElementById(\'my-cart-total\').textContent = window.essentialCartApi.getItemCount();\n    };\n    update();\n    window.essentialCartApi.onCartUpdate(update);\n  }\n</script>'
  },
  {
    id: 'cart-api-before-checkout-confirm',
    label: 'Cart Drawer API: Confirm Before Checkout',
    type: 'js',
    appId: 'essential-cart-drawer',
    tags: ['cart-drawer', 'api', 'checkout', 'js'],
    description: 'Shows a confirmation prompt before checkout. Returning false blocks checkout.',
    code: '<script>\n  if (window.essentialCartApi) {\n    window.essentialCartApi.onBeforeCheckout(() => {\n      return confirm(\'Ready to check out?\');\n    });\n  }\n</script>'
  },
  {
    id: 'cart-api-open-analytics',
    label: 'Cart Drawer API: Run Analytics on Drawer Open',
    type: 'js',
    appId: 'essential-cart-drawer',
    tags: ['cart-drawer', 'api', 'analytics', 'js'],
    description: 'Runs custom analytics when the cart drawer opens.',
    code: '<script>\n  if (window.essentialCartApi) {\n    window.essentialCartApi.onCartOpen(() => {\n      // your analytics call here, e.g. gtag(\'event\', \'view_cart\')\n      console.log(\'Cart drawer opened\');\n    });\n  }\n</script>'
  },
  {
    id: 'cart-api-auto-close-after-add',
    label: 'Cart Drawer API: Auto-Close After Item Add',
    type: 'js',
    appId: 'essential-cart-drawer',
    tags: ['cart-drawer', 'api', 'auto-close', 'js'],
    description: 'Auto-closes the drawer 5 seconds after an item is added.',
    code: '<script>\n  if (window.essentialCartApi) {\n    window.essentialCartApi.onItemAdd(() => {\n      setTimeout(() => window.essentialCartApi.closeCart(), 5000);\n    });\n  }\n</script>'
  },

  // --- Liquid / HTML Placement Divs ---
  {
    id: 'placement-upsell-default',
    label: 'Upsell: Default Placement Div',
    type: 'liquid',
    appId: 'essential-upsell-cross-sell',
    tags: ['upsell', 'placement', 'liquid'],
    description: 'Add to product.liquid or product template where you want upsell to appear.',
    code: '<div class="essential-upsell-default-placement"></div>'
  },
  {
    id: 'placement-upsell-side-cart-top',
    label: 'Upsell: Side Cart Top Placement',
    type: 'liquid',
    appId: 'essential-upsell-cross-sell',
    tags: ['upsell', 'placement', 'cart', 'liquid'],
    description: 'Add inside the side cart template at the top of cart items.',
    code: '<div class="essential-upsell-side-cart-top"></div>'
  },
  {
    id: 'placement-upsell-side-cart-bottom',
    label: 'Upsell: Side Cart Bottom Placement',
    type: 'liquid',
    appId: 'essential-upsell-cross-sell',
    tags: ['upsell', 'placement', 'cart', 'liquid'],
    description: 'Add inside the side cart template at the bottom, before the checkout button.',
    code: '<div class="essential-upsell-side-cart-bottom"></div>'
  },
  {
    id: 'placement-upsell-addon',
    label: 'Upsell: Product Add-On Block Placement',
    type: 'liquid',
    appId: 'essential-upsell-cross-sell',
    tags: ['upsell', 'placement', 'product', 'liquid'],
    description: 'Use for product add-on style upsell placement.',
    code: '<div class="essential-upsell-product-addon-block"></div>'
  },
  {
    id: 'placement-countdown-product',
    label: 'Countdown Timer: Product Page Placement',
    type: 'liquid',
    appId: 'essential-countdown-timer',
    tags: ['countdown', 'placement', 'liquid', 'product'],
    description: 'Add to product template where the countdown timer should appear.',
    code: '<div class="essential-countdown-timer-placement"></div>'
  },
  {
    id: 'placement-countdown-by-id',
    label: 'Countdown Timer: Placement by Timer ID',
    type: 'liquid',
    appId: 'essential-countdown-timer',
    tags: ['countdown', 'placement', 'liquid', 'id'],
    description: 'Use when placing a specific timer by its ID. Replace TIMER_ID_HERE with the actual timer ID from the app.',
    code: '<div class="countdown-timer-block" countdown-timer-id="TIMER_ID_HERE"></div>'
  },
  {
    id: 'placement-announcement-default',
    label: 'Announcement Bar: Default Placement',
    type: 'liquid',
    appId: 'essential-announcement-bar',
    tags: ['announcement', 'placement', 'liquid'],
    description: 'Add to theme.liquid or header section for default announcement bar placement.',
    code: '<div class="essential-announcement-bar-placement"></div>'
  },
  {
    id: 'placement-announcement-side-cart',
    label: 'Announcement Bar: Side Cart Placement',
    type: 'liquid',
    appId: 'essential-announcement-bar',
    tags: ['announcement', 'placement', 'cart', 'liquid'],
    description: 'Add inside side cart template to show announcement bar in cart drawer.',
    code: '<div class="essential-announcement-bar-side-cart"></div>'
  },
  {
    id: 'placement-free-shipping-side-cart',
    label: 'Free Shipping Bar: Side Cart Placement',
    type: 'liquid',
    appId: 'essential-free-shipping',
    tags: ['free-shipping', 'placement', 'cart', 'liquid'],
    description: 'Add inside side cart template to show free shipping bar in cart.',
    code: '<div class="order-value-booster-side-cart"></div>'
  },
  {
    id: 'placement-trust-badges',
    label: 'Trust Badges: Default Placement',
    type: 'liquid',
    appId: 'essential-trust-badges-icons',
    tags: ['trust-badges', 'placement', 'liquid'],
    description: 'Add to product template where you want trust badges to appear.',
    code: '<div class="essential-banners-default-placement"></div>'
  },
  {
    id: 'placement-estimated-delivery',
    label: 'Estimated Delivery: Block Placement',
    type: 'liquid',
    appId: 'essential-estimated-delivery',
    tags: ['delivery', 'placement', 'liquid'],
    description: 'Add to product template where you want the estimated delivery widget.',
    code: '<div class="essential-estimated-delivery-block-liquid"></div>'
  },
  {
    id: 'placement-rockit-timer',
    label: 'Rockit Sales: Timer Embed Placement',
    type: 'liquid',
    appId: 'rockit-discounts-sales',
    tags: ['rockit', 'placement', 'liquid', 'timer'],
    description: 'Add to product template where the Rockit sales timer should appear.',
    code: '<div class="rockit-sales-manager-timer-embed"></div>'
  },
  {
    id: 'placement-loyalty-trigger',
    label: 'Loyalty: Floating Widget Trigger Link',
    type: 'liquid',
    appId: 'essential-loyalty',
    tags: ['loyalty', 'placement', 'liquid', 'trigger'],
    description: 'Add anywhere to create a link that opens the loyalty floating widget.',
    code: '<a href="#essential-loyalty-trigger"></a>'
  },
  {
    id: 'placement-loyalty-product',
    label: 'Loyalty: Product Points Placement',
    type: 'liquid',
    appId: 'essential-loyalty',
    tags: ['loyalty', 'placement', 'liquid', 'product'],
    description: 'Add to product template to show points preview on product page.',
    code: '<div data-pp-anchor></div>'
  },

  // --- Class Snippets (Preorder) ---
  {
    id: 'class-preorder-initial-atc',
    label: 'Preorder: Initial Add to Cart Button Class',
    type: 'class',
    appId: 'essential-preorder-presale',
    tags: ['preorder', 'class', 'atc'],
    description: 'Add this class to the main Add to Cart button in the product form for preorder to intercept it.',
    code: 'class="essential-preorder-initial-add-to-cart-button"'
  },
  {
    id: 'class-preorder-extra-atc',
    label: 'Preorder: Extra / Sticky Add to Cart Class',
    type: 'class',
    appId: 'essential-preorder-presale',
    tags: ['preorder', 'class', 'atc', 'sticky'],
    description: 'Add to secondary or sticky Add to Cart buttons that should also be intercepted by preorder.',
    code: 'class="essential-preorder-extra-add-to-cart-button"'
  },
  {
    id: 'class-preorder-skip-click',
    label: 'Preorder: Skip Click (Fix Double-Add Issue)',
    type: 'class',
    appId: 'essential-preorder-presale',
    tags: ['preorder', 'class', 'fix', 'double-add'],
    description: 'Add to a button that should NOT be intercepted by preorder (prevents double-adding to cart).',
    code: 'class="essential-preorder-skip-click-initial-add-to-cart-button"'
  },
  {
    id: 'class-preorder-ignore-prevent-default',
    label: 'Preorder: Ignore Prevent Default Class',
    type: 'class',
    appId: 'essential-preorder-presale',
    tags: ['preorder', 'class', 'fix'],
    description: 'Use when the theme prevents default form submission and preorder needs to bypass that.',
    code: 'class="essential-preorder-ignore-prevent-default"'
  },
  {
    id: 'class-preorder-price-container',
    label: 'Preorder: Price Container Class',
    type: 'class',
    appId: 'essential-preorder-presale',
    tags: ['preorder', 'class', 'price'],
    description: 'Add to the price container element for preorder to update displayed price correctly.',
    code: 'class="essential-preorder-initial-prices-container"'
  }

  // TODO: Add more snippets for new fixes, CSS overrides, or liquid placements
];
