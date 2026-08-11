// ============================================================
// MACROS / REPLY TEMPLATES
// Use {{placeholder}} syntax for dynamic fields.
// Add new templates at the bottom with a unique id.
// ============================================================

window.ESSENTIAL_MACROS = [
  {
    id: 'needs-collab-access',
    label: 'Ask for Collaborator Access (No Code Required)',
    description: 'Use when you need to request collaborator access and no request code is required.',
    body: `Hi there,

My name is {{agent_name}} from the Essential Apps support team. Thank you for reaching out!

To help you with {{issue_summary}}, I'd need to take a closer look at your store's theme and app setup directly. Could you please grant me collaborator access to your store?

Here's how to do it:

1. Go to your Shopify Admin
2. Navigate to Settings > Users and permissions
3. Scroll to the Collaborators section and click "Add collaborator"
4. Enter this email: {{support_email}}
5. Under permissions, please enable:
   {{required_access}}

Once access is granted, I'll jump in and investigate right away.

Please let me know if you have any questions!

Best regards,
{{agent_name}}
Essential Apps Support`
  },

  {
    id: 'needs-collab-code',
    label: 'Ask for Collaborator Request Code',
    description: 'Use when the store has collaborator request code enabled.',
    body: `Hi there,

My name is {{agent_name}} from the Essential Apps support team. Thank you for reaching out!

To look into {{issue_summary}} for you, I'll need to request collaborator access to your store. It looks like your store requires a 4-digit collaborator request code to complete the request.

Here's how to find it:

1. Go to your Shopify Admin
2. Navigate to Settings > Users and permissions
3. Scroll to the Collaborators section
4. Your 4-digit code will be shown under "Require collaborator request code"

Once you share the code with me, I'll send the access request right away, and we'll get this sorted for you as quickly as possible.

Best regards,
{{agent_name}}
Essential Apps Support`
  },

  {
    id: 'app-embed-not-enabled',
    label: 'App Embed Not Enabled',
    description: 'Use when the app embed block is not toggled on in the theme customizer.',
    body: `Hi there,

My name is {{agent_name}} from the Essential Apps support team. Thank you for reaching out!

I believe the reason {{app_name}} is not appearing on your store is that the app embed block has not been enabled in your theme settings.

Here's how to enable it:

1. Go to your Shopify Admin
2. Navigate to Online Store > Themes
3. Click Customize on your active theme
4. In the left panel, click "App embeds"
5. Find "{{app_name}}" and toggle it ON
6. Click Save

Once enabled, please do a hard refresh on your storefront (Ctrl+Shift+R or Cmd+Shift+R on Mac) and the app should appear.

Please let me know if you need any help with these steps!

Best regards,
{{agent_name}}
Essential Apps Support`
  },

  {
    id: 'grey-screen',
    label: 'App Loading Grey Screen Troubleshooting',
    description: 'Use when the merchant sees a grey or blank screen when opening the app.',
    body: `Hi there,

My name is {{agent_name}} from the Essential Apps support team. Thank you for reaching out!

I'm sorry to hear you're seeing a grey or blank screen when opening {{app_name}}. This is usually caused by a browser extension or network setting blocking the app from loading.

Please try the following steps:

1. Open your Shopify Admin in a private/incognito browser window and try opening the app again
2. If that works, a browser extension (ad blocker, VPN, or privacy tool) is likely the cause — try disabling them one by one
3. If the issue persists in incognito, please try a different browser (Chrome, Firefox, Edge)
4. If you're on a corporate network or VPN, try switching to a personal connection

Could you let me know the results of these tests? This will help us narrow down the cause and get you back up and running quickly.

Best regards,
{{agent_name}}
Essential Apps Support`
  },

  {
    id: 'fixed-minutes-timer',
    label: 'Fixed Minutes Timer Disappeared',
    description: 'Use when a countdown timer using the "fixed minutes" type has reached zero and disappeared.',
    body: `Hi there,

My name is {{agent_name}} from the Essential Apps support team. Thank you for reaching out!

I understand your countdown timer is no longer showing. Based on your setup, you're using the Fixed Minutes timer type. This timer starts separately for each visitor and can disappear for that visitor after it reaches zero.

Please first test the storefront in an incognito window or another browser/device. A fresh visitor session should show the timer again.

If you want the timer to continue running after it reaches zero, open the timer's Content tab and change the "Once it ends" behavior to "Repeat the countdown." Save and publish the timer after updating the setting.

Please let me know if you'd like help setting it up, or if you have any questions!

Best regards,
{{agent_name}}
Essential Apps Support`
  },

  {
    id: 'shopify-limitation',
    label: 'Shopify Limitation',
    description: 'Use when the requested feature or behavior is limited by Shopify itself.',
    body: `Hi there,

My name is {{agent_name}} from the Essential Apps support team. Thank you for reaching out!

I appreciate you sharing this with us. After looking into your request, I want to let you know that {{issue_summary}} is unfortunately a limitation of the Shopify platform itself, rather than something specific to {{app_name}}.

Shopify's platform architecture means that {{issue_summary}}, and this is not something that third-party apps are able to override or work around at this time.

I completely understand this may be frustrating, and I'm sorry I don't have a better answer. If Shopify updates their platform capabilities in the future, we'll be sure to take advantage of them.

In the meantime, please don't hesitate to reach out if there's anything else I can help with!

Best regards,
{{agent_name}}
Essential Apps Support`
  },

  {
    id: 'third-party-conflict',
    label: 'Third-Party App Conflict',
    description: 'Use when another app or theme is causing a conflict.',
    body: `Hi there,

My name is {{agent_name}} from the Essential Apps support team. Thank you for reaching out!

After investigating, it appears the issue you're experiencing may be caused by a conflict between {{app_name}} and {{conflicting_app_or_theme}} on your store.

This can happen when two apps modify the same part of your storefront or have overlapping functionality. Unfortunately, we have limited ability to control how other apps behave on your store.

Here are a few things we can try:

1. Temporarily disable {{conflicting_app_or_theme}} to confirm if it's causing the conflict
2. If confirmed, check if that app has settings to adjust the behavior that's interfering
3. Reach out to the support team of {{conflicting_app_or_theme}} to see if there's a compatibility option

I'm happy to assist investigate further if you can grant me collaborator access. Please let me know how you'd like to proceed!

Best regards,
{{agent_name}}
Essential Apps Support`
  },

  {
    id: 'feature-request',
    label: 'Feature Request',
    description: 'Use when the merchant is requesting a feature that does not exist yet.',
    body: `Hi there,

My name is {{agent_name}} from the Essential Apps support team. Thank you for reaching out and for sharing this idea!

I love hearing how merchants want to use {{app_name}}. I've passed your request for {{issue_summary}} along to our product team for consideration.

While I can't make any promises about timelines or whether this will be added to our roadmap, all feedback is genuinely reviewed and helps shape the direction of the app.

In the meantime, if there's a workaround or alternative approach that might help with your use case, I'd be happy to explore that with you.

Thank you again for taking the time to share this with us!

Best regards,
{{agent_name}}
Essential Apps Support`
  },

  {
    id: 'billing-refund',
    label: 'Billing / Refund / App Credits',
    description: 'Use for billing inquiries, unexpected charges, or refund requests.',
    body: `Hi there,

My name is {{agent_name}} from the Essential Apps support team. Thank you for reaching out!

I'm sorry to hear about this billing concern. I understand how frustrating unexpected charges can be.

Here's some important context on how Shopify billing works:

- App subscriptions are billed through Shopify directly, not through our app
- Charges appear on your Shopify invoice under the app name
- If you uninstalled the app mid-cycle, Shopify may have prorated the charge

I've reviewed your account details and {{billing_summary}}.

{{next_step}}

Please note that refunds for Shopify app charges are processed through Shopify's billing system. If you believe a charge was made in error, please also contact Shopify Support directly at support.shopify.com as they have access to your full billing history.

I'm here to help in any way I can. Please let me know if you have any additional questions!

Best regards,
{{agent_name}}
Essential Apps Support`
  },

  {
    id: 'request-review',
    label: 'Request a Review',
    description: 'Use after a successful resolution to ask for a review.',
    body: `Hi there,

I'm really glad we were able to get {{issue_summary}} sorted out for you!

If {{app_name}} has been helpful for your store, we'd truly appreciate it if you could take a moment to leave us a review on the Shopify App Store. Reviews from merchants like you mean the world to our small team and help other store owners discover the app.

You can leave a review here:
{{review_link}}

Thank you so much for your support — we're always here if you need anything!

Best regards,
{{agent_name}}
Essential Apps Support`
  },

  {
    id: 'conversation-opening',
    label: 'Start of Conversation',
    description: 'Short opening response for a new support conversation.',
    body: `Hi there,

Thank you for getting in touch. My name is {{agent_name}}, and I’d be happy to assist you with this.

Best regards,
{{agent_name}}
Essential Apps Support`
  },

  {
    id: 'requested-change-access-no-code',
    label: 'Request Access for a Storefront Change',
    description: 'Use when the merchant asks for a change and no collaborator request code is required.',
    body: `Hi there,

Thank you for reaching out. My name is {{agent_name}}, and I’d be happy to assist with the requested change to {{app_name}}.

To make the change safely, I’ll need collaborator access to the relevant theme and app settings. You will receive an access request shortly. Please enable the following permissions:

{{required_access}}

Once access is granted, please let me know and I’ll begin reviewing the requested change.

Best regards,
{{agent_name}}
Essential Apps Support`
  },

  {
    id: 'requested-change-access-code',
    label: 'Request Collaborator Code for a Change',
    description: 'Use when a requested change requires a 4-digit collaborator request code.',
    body: `Hi there,

Thank you for reaching out. My name is {{agent_name}}, and I’d be happy to assist with the requested change to {{app_name}}.

Before I can send the collaborator access request, please share your 4-digit collaborator request code. You can find it in Shopify Admin under Settings > Users and permissions > Collaborators.

Once I receive the code, I’ll send the access request and begin reviewing the change.

Best regards,
{{agent_name}}
Essential Apps Support`
  },

  {
    id: 'site-speed',
    label: 'Site Speed Explanation',
    description: 'Use when a merchant asks whether an Essential app affects initial page-load speed.',
    body: `Hi there,

Thank you for reaching out. {{app_name}} loads after the storefront’s initial page content and its script is served through Shopify’s CDN. This means the app does not block the initial storefront render in the same way as a script loaded before the page content.

If you are seeing a measurable slowdown, please send the affected URL and the before/after speed-test reports so we can compare the same page, device, and test conditions.

Best regards,
{{agent_name}}
Essential Apps Support`
  },

  {
    id: 'app-code-removal',
    label: 'App Code Removal Request',
    description: 'Use when a merchant asks whether an Online Store 2.0 app left a manually installed theme snippet.',
    body: `Hi there,

My name is {{agent_name}} from Essential Apps, and I’d be happy to clarify this.

{{app_name}} uses Shopify Online Store 2.0 theme app extensions. The storefront integration is added by Shopify when the app embed or app block is enabled; our app does not manually install a permanent theme snippet for that standard setup.

Please disable the app embed or remove the app block in the active theme and save the changes. If you still see app-related storefront output afterwards, send the affected URL and theme name so we can review it.

Best regards,
{{agent_name}}
Essential Apps Support`
  },

  {
    id: 'currency-format-republish',
    label: 'Currency Format and Republish Guidance',
    description: 'Use when a booster displays an unexpected currency symbol, spacing, or format.',
    body: `Hi there,

{{app_name}} reads the Shopify store currency format. Please review it under Shopify Admin > Settings > Store currency and confirm that the symbol and amount formatting are correct.

After changing the Shopify currency format, unpublish and republish the affected booster so the updated format is loaded on the storefront. Then test again in an incognito window.

Best regards,
{{agent_name}}
Essential Apps Support`
  }

  // TODO: Add more reply templates as new common scenarios emerge
];
