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

My name is Wendyle from the Essential Apps support team. Thank you for reaching out!

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
Wendyle
Essential Apps Support`
  },

  {
    id: 'needs-collab-code',
    label: 'Ask for Collaborator Request Code',
    description: 'Use when the store has collaborator request code enabled.',
    body: `Hi there,

My name is Wendyle from the Essential Apps support team. Thank you for reaching out!

To look into {{issue_summary}} for you, I'll need to request collaborator access to your store. It looks like your store requires a 4-digit collaborator request code to complete the request.

Here's how to find it:

1. Go to your Shopify Admin
2. Navigate to Settings > Users and permissions
3. Scroll to the Collaborators section
4. Your 4-digit code will be shown under "Require collaborator request code"

Once you share the code with me, I'll send the access request right away, and we'll get this sorted for you as quickly as possible.

Best regards,
Wendyle
Essential Apps Support`
  },

  {
    id: 'app-embed-not-enabled',
    label: 'App Embed Not Enabled',
    description: 'Use when the app embed block is not toggled on in the theme customizer.',
    body: `Hi there,

My name is Wendyle from the Essential Apps support team. Thank you for reaching out!

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
Wendyle
Essential Apps Support`
  },

  {
    id: 'grey-screen',
    label: 'App Loading Grey Screen Troubleshooting',
    description: 'Use when the merchant sees a grey or blank screen when opening the app.',
    body: `Hi there,

My name is Wendyle from the Essential Apps support team. Thank you for reaching out!

I'm sorry to hear you're seeing a grey or blank screen when opening {{app_name}}. This is usually caused by a browser extension or network setting blocking the app from loading.

Please try the following steps:

1. Open your Shopify Admin in a private/incognito browser window and try opening the app again
2. If that works, a browser extension (ad blocker, VPN, or privacy tool) is likely the cause — try disabling them one by one
3. If the issue persists in incognito, please try a different browser (Chrome, Firefox, Edge)
4. If you're on a corporate network or VPN, try switching to a personal connection

Could you let me know the results of these tests? This will help us narrow down the cause and get you back up and running quickly.

Best regards,
Wendyle
Essential Apps Support`
  },

  {
    id: 'fixed-minutes-timer',
    label: 'Fixed Minutes Timer Disappeared',
    description: 'Use when a countdown timer using the "fixed minutes" type has reached zero and disappeared.',
    body: `Hi there,

My name is Wendyle from the Essential Apps support team. Thank you for reaching out!

I understand your countdown timer is no longer showing. Based on your setup, it appears you're using the "Fixed Minutes" timer type. This type of timer counts down for a set number of minutes and disappears once it reaches zero for that visitor session.

To keep the timer visible continuously, I'd recommend switching to one of the other timer types:

- **Scheduled**: Set a fixed end date and time (great for sales or events)
- **Daily recurring**: Resets at a set time every day
- **Evergreen**: Each visitor gets their own countdown that resets on each visit

You can update this in the {{app_name}} dashboard under your timer's settings.

Please let me know if you'd like help setting it up, or if you have any questions!

Best regards,
Wendyle
Essential Apps Support`
  },

  {
    id: 'shopify-limitation',
    label: 'Shopify Limitation',
    description: 'Use when the requested feature or behavior is limited by Shopify itself.',
    body: `Hi there,

My name is Wendyle from the Essential Apps support team. Thank you for reaching out!

I appreciate you sharing this with us. After looking into your request, I want to let you know that {{issue_summary}} is unfortunately a limitation of the Shopify platform itself, rather than something specific to {{app_name}}.

Shopify's platform architecture means that {{issue_summary}}, and this is not something that third-party apps are able to override or work around at this time.

I completely understand this may be frustrating, and I'm sorry I don't have a better answer. If Shopify updates their platform capabilities in the future, we'll be sure to take advantage of them.

In the meantime, please don't hesitate to reach out if there's anything else I can help with!

Best regards,
Wendyle
Essential Apps Support`
  },

  {
    id: 'third-party-conflict',
    label: 'Third-Party App Conflict',
    description: 'Use when another app or theme is causing a conflict.',
    body: `Hi there,

My name is Wendyle from the Essential Apps support team. Thank you for reaching out!

After investigating, it appears the issue you're experiencing may be caused by a conflict between {{app_name}} and {{conflicting_app_or_theme}} on your store.

This can happen when two apps modify the same part of your storefront or have overlapping functionality. Unfortunately, we have limited ability to control how other apps behave on your store.

Here are a few things we can try:

1. Temporarily disable {{conflicting_app_or_theme}} to confirm if it's causing the conflict
2. If confirmed, check if that app has settings to adjust the behavior that's interfering
3. Reach out to the support team of {{conflicting_app_or_theme}} to see if there's a compatibility option

I'm happy to assist investigate further if you can grant me collaborator access. Please let me know how you'd like to proceed!

Best regards,
Wendyle
Essential Apps Support`
  },

  {
    id: 'feature-request',
    label: 'Feature Request',
    description: 'Use when the merchant is requesting a feature that does not exist yet.',
    body: `Hi there,

My name is Wendyle from the Essential Apps support team. Thank you for reaching out and for sharing this idea!

I love hearing how merchants want to use {{app_name}}. I've passed your request for {{issue_summary}} along to our product team for consideration.

While I can't make any promises about timelines or whether this will be added to our roadmap, all feedback is genuinely reviewed and helps shape the direction of the app.

In the meantime, if there's a workaround or alternative approach that might help with your use case, I'd be happy to explore that with you.

Thank you again for taking the time to share this with us!

Best regards,
Wendyle
Essential Apps Support`
  },

  {
    id: 'billing-refund',
    label: 'Billing / Refund / App Credits',
    description: 'Use for billing inquiries, unexpected charges, or refund requests.',
    body: `Hi there,

My name is Wendyle from the Essential Apps support team. Thank you for reaching out!

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
Wendyle
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
Wendyle
Essential Apps Support`
  }

  // TODO: Add more reply templates as new common scenarios emerge
];
