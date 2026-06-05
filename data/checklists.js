// ============================================================
// CHECKLISTS DATA
// Keyed by checklistId referenced in issues.js
// Each item is a string (step to investigate/verify)
// ============================================================

window.ESSENTIAL_CHECKLISTS = {

  'not-showing': [
    'Confirm which theme is currently live (not a duplicate or backup)',
    'Go to Online Store > Themes > Customize and check if app embed is toggled ON',
    'Check that the app is active/not paused inside the app dashboard',
    'Open browser console on the storefront and run the app\'s console command to confirm it loaded',
    'Check for CSS display:none or visibility:hidden on the widget element (Inspect Element)',
    'Confirm the correct page/template is being tested (product vs collection vs home)',
    'Check if the issue is theme-specific by testing on Dawn or a fresh theme'
  ],

  'app-embed': [
    'Go to Online Store > Themes > Customize',
    'Click "App embeds" in the left panel',
    'Find the app\'s embed block and confirm toggle is ON',
    'Save the theme customizer after enabling',
    'Hard refresh the storefront (Ctrl+Shift+R)',
    'Confirm app loads by running console command on storefront'
  ],

  'custom-placement': [
    'Identify the exact location where the merchant wants the widget',
    'Check if a placement div is already documented for this app (see Snippets)',
    'Request collaborator access to view and edit theme code',
    'Open the relevant Liquid template file (product.liquid, main-product.liquid, etc.)',
    'Add the correct placement div to the template',
    'Verify on storefront after saving'
  ],

  'theme-conflict': [
    'Ask merchant which theme they are using',
    'Reproduce the issue on a Dawn theme or theme preview to isolate',
    'Inspect the widget element in DevTools for overriding CSS rules',
    'Check console for JavaScript errors from theme scripts',
    'Try disabling other app embeds to isolate',
    'Document which theme and version is causing the conflict',
    'Escalate to dev team with theme name, version, and screenshot if cannot resolve via CSS fix'
  ],

  'third-party-conflict': [
    'Ask merchant to list all recently installed or active apps',
    'Disable other apps one by one to isolate the conflict',
    'Check browser console for JS errors from other app scripts',
    'Look for duplicate cart/drawer logic from another app',
    'Check if the conflict is reproducible on a clean Dawn theme',
    'Note the conflicting app name for the escalation or reply'
  ],

  'discount': [
    'Confirm the discount is set up correctly inside the app settings',
    'Check if merchant is also using a Shopify discount code at checkout (only one allowed)',
    'Verify if they are on Shopify Plus (Shopify Functions available)',
    'Check if automatic discounts are enabled in Shopify admin and conflicting',
    'Review Shopify discount stacking limitations with merchant'
  ],

  'cart-drawer': [
    'Confirm app cart drawer embed is enabled in Theme Customizer',
    'Check if theme has its own cart drawer (common in Dawn, Prestige, etc.)',
    'Test with theme cart drawer disabled if possible',
    'Check console for errors when opening cart',
    'Verify cart API responds: run window.essentialCartApi in console',
    'Check if another app is also injecting into the cart drawer'
  ],

  'preorder': [
    'Confirm the product is set to preorder inside the app dashboard',
    'Check start date and end date of the preorder campaign',
    'Confirm the product is in stock or out-of-stock setting matches the trigger',
    'Inspect the Add to Cart button element in DevTools for class name',
    'Check if the theme uses a non-standard ATC button (some themes use forms or custom elements)',
    'Add the correct preorder class if ATC button class is missing',
    'Run window.essentialPreorderConfigs in console to confirm app config loaded'
  ],

  'back-in-stock': [
    'Confirm the product is configured in the app for back-in-stock alerts',
    'Check if email notifications are set up in app settings',
    'Verify that Shopify inventory was actually updated (not just app-level)',
    'Check if there are subscribers registered for this product',
    'Confirm the notification email template is active'
  ],

  'countdown': [
    'Check if timer type is "Fixed Minutes" (resets on each visit) vs scheduled campaign',
    'Verify campaign start and end dates in app settings',
    'Confirm app embed is still enabled in theme customizer',
    'Check visibility rules - which pages/products should show the timer',
    'Run window.essentialCountdownTimerConfigs in console to check loaded config',
    'Check if the timer was set to hide after reaching zero'
  ],

  'currency': [
    'Ask merchant if they have Shopify Markets / multi-currency enabled',
    'Confirm what currency the threshold is set in (inside app settings)',
    'Test with a single-currency cart to see if threshold logic works correctly',
    'Note: app reads cart total in base currency - this may differ from display currency',
    'Escalate to dev if merchant needs Markets-aware currency support'
  ],

  'announcement-placement': [
    'Identify where the bar is currently appearing vs where merchant wants it',
    'Check if theme has a sticky header that pushes bar out of position',
    'Inspect header structure in DevTools to find correct insertion point',
    'Request collaborator access to edit theme files',
    'Add announcement bar placement div to correct location if needed',
    'Test on mobile and desktop after fix'
  ],

  'loyalty': [
    'Confirm referral program is enabled in app loyalty settings',
    'Check if customer needs to be logged in for referral to work',
    'Verify the referral link format is correct',
    'Check if loyalty widget is visible on storefront (check app embed)',
    'Run window.essentialLoyaltyConfig in console to confirm app loaded',
    'Check if points were awarded in the customer\'s loyalty dashboard'
  ],

  'billing': [
    'Check the app\'s billing status inside the Shopify app listing',
    'Confirm when the merchant installed and when trial ended',
    'Check if the merchant uninstalled and reinstalled (new trial may not apply)',
    'Verify if app credits were issued previously',
    'Note: Shopify processes billing - refunds require Shopify Partner approval',
    'Escalate to billing team with store URL, charge date, and amount'
  ],

  'grey-screen': [
    'Ask merchant to try in an incognito/private browser window',
    'Ask merchant to disable browser extensions (ad blockers, VPNs)',
    'Ask merchant to try a different browser',
    'Check if merchant is on a corporate network or VPN that may block scripts',
    'Check Shopify status page for any known incidents',
    'If issue persists in incognito, escalate to dev team with store URL'
  ],

  'collab-access': [
    'Identify which access permissions are needed for this app (see Access section)',
    'Send collaborator access request template to merchant',
    'Store URL to use for request: Partners > [store] > Actions > Request access',
    'Wait for merchant to approve before proceeding'
  ],

  'collab-code': [
    'Explain to merchant they need to provide their 4-digit collaborator request code',
    'Merchant finds this in: Shopify Admin > Settings > Users and permissions > Collaborators',
    'The code is shown under "Require collaborator request code"',
    'Once received, use it when sending the collaborator request'
  ],

  'shopify-limit': [
    'Confirm the limitation is indeed a Shopify platform constraint',
    'Document the specific limitation clearly',
    'Communicate to merchant with a clear explanation (use Shopify Limitation template)',
    'If it affects many merchants, flag internally as potential feature request or workaround'
  ],

  'feature-request': [
    'Confirm the feature does not already exist in a different part of the app',
    'Note the exact merchant use case and what they are trying to achieve',
    'Send the Feature Request reply template',
    'Log the request internally for product team review',
    'Do not promise a timeline or guarantee the feature will be built'
  ]

  // TODO: Add checklists for new issue types as they are added
};
