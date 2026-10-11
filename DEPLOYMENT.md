# Deployment guide

## 1. Provision services

- **PostgreSQL:** provision a managed production database (for example Neon, Supabase, or Vercel Postgres). Keep a separate database for development and production.
- **Stripe:** create a Stripe account. Start in test mode; enable Checkout, set up a webhook endpoint, and test successful, failed, and abandoned sessions. Add `checkout.session.completed` to the webhook event selection.
- **Resend:** create an API key, verify the sending domain, and configure an approved `EMAIL_FROM` address.
- **Google OAuth:** optional. Configure an OAuth consent screen and client. Add local callback `http://localhost:3000/api/auth/callback/google` and production callback `https://YOUR_DOMAIN/api/auth/callback/google`.
- **Vercel:** import the repository and use the detected Next.js build settings.

## 2. Configure Vercel

Set the following environment variables for Preview and Production as appropriate:

- `DATABASE_URL` — pooled PostgreSQL URL supported by your provider.
- `AUTH_SECRET` — unique random value (`openssl rand -base64 32`).
- `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL` — deployed canonical HTTPS origin.
- `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` — only when Google sign-in is enabled.
- `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` — use `sk_test_`/test webhook secret for staging, `sk_live_`/live secret for production.
- `RESEND_API_KEY`, `EMAIL_FROM` — verified sender.
- `ADMIN_EMAIL`, `ADMIN_PASSWORD` — bootstrap credentials; use a unique high-entropy password, then rotate it after first login.

Do not put secret values in `NEXT_PUBLIC_*` variables. Never use test credentials in production.

## 3. Database deployment

Use versioned migrations for production. Create an initial migration in a controlled development environment, commit `prisma/migrations`, then configure the Vercel build command to run migrations before build, for example:

```bash
npx prisma migrate deploy && npm run build
```

Set the Prisma seed only for a deliberate one-time bootstrap. Avoid seeding production demo products unless intended. Back up the database and verify restore procedures before launch.

## 4. Stripe webhook

In Stripe Dashboard, add `https://YOUR_DOMAIN/api/webhooks/stripe` as a webhook endpoint. Subscribe to `checkout.session.completed`; copy its signing secret into the production environment and redeploy. Confirm Stripe shows successful deliveries. Do not expose webhook secrets to browser code.

For local development:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## 5. Smoke test before launch

1. Run `npm ci`, `npm run typecheck`, `npm test`, and `npm run build`.
2. Configure Playwright browser binaries, then run `npm run test:e2e` against a test database.
3. Create a customer, verify email, sign out/in, reset password, and test Google OAuth if enabled.
4. Browse/search/filter, select a variant, edit/remove cart lines, and test inventory limits.
5. Redeem valid, expired, and exhausted coupons.
6. Complete Stripe test checkout, confirm webhook delivery, order email, inventory decrement, and account order history. Test canceled and failed payments too.
7. Sign in as admin and create/edit/archive a product; update an order status. Confirm a customer cannot access admin endpoints.
8. Check at viewport widths 360, 768, 1024, and 1440; run Lighthouse on home, shop, product, and login. Review keyboard navigation, contrast, focus visibility, labels, and screen reader output.
9. Verify privacy/terms language, consent behavior, sender identity, analytics disclosures, tax/shipping rules, refund processes, and customer support channels.

## 6. Monitoring and operations

Configure Vercel error monitoring and alerts, Stripe webhook failure notifications, database backups, email delivery monitoring, and uptime checks. Rotate compromised credentials promptly. Establish retention/deletion processes for user data and a documented incident response plan.

## Release caveats

This starter's MFA, tax calculation, shipping-rate selection, return labels/refunds, and reviews workflow need implementation before a real retail launch. The included database rate limiter is a minimal starter; use a hardened atomic/distributed limiter for high traffic. Production security, accessibility, legal compliance, performance, and Lighthouse outcomes depend on actual hosting, keys, product content, and third-party services and must be verified on the deployed environment.
