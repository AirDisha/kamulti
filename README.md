# Inna Iankina — Kundalini Website

## GitHub Pages Setup
1. Upload all files to a GitHub repository
2. Go to Settings → Pages → Source: Deploy from branch → main → / (root)
3. Your site will be at: `https://yourusername.github.io/repository-name/`

## Before Going Live — Replace These Placeholders

### Facebook Pixel (in every HTML file)
Search: `YOUR_PIXEL_ID`
Replace with your actual Pixel ID from: Facebook Ads Manager → Events Manager → Pixels

### Google Tag Manager (in every HTML file)
Search: `GTM-XXXXXXX`
Replace with your GTM container ID from: tagmanager.google.com

### PayPal (in individual-ru.html, individual-en.html, sessions-ru.html, sessions-en.html)
Uncomment the PayPal SDK script tag and replace `YOUR_PAYPAL_CLIENT_ID`

### Stripe
GitHub Pages is static — Stripe requires a server for checkout sessions.
Options:
- Use Stripe Payment Links (no server needed) — replace btn href with your Stripe Payment Link URL
- Use Netlify Functions or Vercel for server-side Stripe

### Contact Form
The form currently shows a success message client-side.
To actually receive emails, sign up at formspree.io and replace the form action:
`<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" ...>`

### Contact Details
Search and replace: `your_telegram`, `hello@innayankina.com`

## Facebook Conversions API Note
Full server-side Conversions API requires a server (not available on GitHub Pages).
The GTM container included allows server-side tagging via GTM's Server container.
For basic tracking, the client-side Facebook Pixel already covers:
- PageView (automatic)
- InitiateCheckout (payment button clicks)
- Lead (contact form submissions)
