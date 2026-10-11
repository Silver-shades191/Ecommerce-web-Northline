# Northline

A production-oriented e-commerce starter for modern outdoor essentials. Built with Next.js 15 App Router, TypeScript, Tailwind CSS, Prisma/PostgreSQL, Auth.js, Stripe Checkout, and Resend.

> **Launch checklist:** This source is a functional starter, not a certified production deployment. Set real service credentials, configure and test Stripe webhooks, review the legal templates, and complete the QA checklist in [DEPLOYMENT.md](./DEPLOYMENT.md) before accepting live orders. MFA, tax calculation, shipping label creation, automatic refunds, and review moderation are extension points and are not included.

## Features

- Responsive home, shop, category filters, product detail, cart, checkout, login/signup, email verification, password reset, customer account/orders, and admin dashboard.
- Google OAuth and email/password sign-in; verified email required for password sign-in; JWT sessions and customer/admin role checks.
- Local-storage cart and wishlist, product variants, verified-customer reviews, stock reservation, coupon codes, Stripe-hosted payment, order confirmation webhook, and email notifications.
- Prisma schema for products, inventory, reviews, wishlists, carts, coupons, orders, sessions, rate-limit counters, and email tokens.
- Admin product creation and order status updates. Product updates and archive endpoints are available to admins.
- Keyboard focus styles, skip link, reduced-motion support, semantic labels, cookie preference notice, and light/dark theme switch.
- Node.js test-runner and Playwright checks, including Chromium flows and a responsive layout smoke check.

## Requirements

- Node.js 22.6 or newer (Node 22 LTS or 24 recommended)
- PostgreSQL 15+
- Stripe test account and CLI for local webhook forwarding
- Google OAuth credentials (optional for email/password flows)
- Resend API key and verified sender domain (required to deliver real account emails)

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and set `DATABASE_URL`, `AUTH_SECRET`, `NEXTAUTH_URL`, `NEXT_PUBLIC_SITE_URL`, Stripe test keys, Resend credentials, and (optionally) Google OAuth client credentials. Create a secret with `openssl rand -base64 32`.

3. Create a PostgreSQL database named `northline`, then apply the schema and load the catalog:

   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

4. Start the app:

   ```bash
   npm run dev
   ```

   Visit <http://localhost:3000>. Homepage and catalog preview data can render without a database, but account, checkout, and admin actions require a configured database and seed.

5. Configure Stripe webhook forwarding in another terminal:

   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

   Put the printed `whsec_...` value in `STRIPE_WEBHOOK_SECRET`. Use test-mode `sk_test_...` key in `STRIPE_SECRET_KEY`.

## Seed administrator

Defaults are `admin@example.com` and `Change-this-password-123!`. Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` before seeding. The seed script creates a verified admin and demo catalog with prices stored in cents. Change the seeded password immediately and never reuse the example password in a deployed environment.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` | Generate Prisma client and build Next.js |
| `npm run start` | Run production build |
| `npm run typecheck` | TypeScript checks |
| `npm test` | Unit tests (Node test runner) |
| `npm run test:e2e` | Browser checks (Playwright; builds production first) |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Sync schema for local development |
| `npm run db:migrate` | Create/apply a development migration |
| `npm run db:seed` | Add sample products/admin/coupon |

The default Playwright suite runs Chromium. To run Firefox and WebKit as well, set `PLAYWRIGHT_FULL_BROWSER_MATRIX=1` before `npm run test:e2e`; on Windows, Playwright may also require the Microsoft Visual C++ runtime. Install browser binaries when needed:

```bash
npx playwright install chromium firefox webkit
```

## Environment variables

See [.env.example](./.env.example) for the complete template. Never commit `.env`, Stripe secrets, OAuth secrets, or Resend API keys. For preview/production, configure the same names in the Vercel project environment settings. `NEXT_PUBLIC_SITE_URL` must be your canonical HTTPS URL in production.

## Design system

- **Palette:** warm paper, deep pine, charcoal ink, clay accent.
- **Typography:** restrained sans-serif UI with editorial Georgia display headings.
- **Layout:** generous spacing, product photography, clear hierarchy, mobile-first breakpoints at 700px and 1000px.
- **Interaction:** visible keyboard focus, reduced motion, text alternatives, persistent cart, explicit cookie choice, light/dark preference.
- Keep interaction targets comfortably tappable and maintain sufficient contrast when changing colors. Verify final contrast and screen reader behavior with the deployed fonts and imagery.

## Security notes

- Auth.js provides session and OAuth CSRF protections; Next.js API writes use same-origin browser requests and server-side validation. Stripe webhook authenticity is verified with its signature.
- Checkout accepts product IDs and quantities only, reloads authoritative prices/inventory from PostgreSQL, and sends payment to Stripe Checkout. Card details do not enter or persist in this app.
- Auth passwords use bcrypt; verification and reset tokens are random, purpose-scoped, and expire. Rate-limit counters are stored in PostgreSQL.
- Use TLS, secure environment variables, database backups, provider alerting, and a persistent distributed rate-limit solution before scaling. The included PostgreSQL rate limiter is intentionally simple and may need atomic/upsert hardening under high concurrency.
- Admin authorization is checked server-side for dashboard and mutation endpoints. Keep admin credentials private and rotate them.

## Legal and fulfillment

`/privacy`, `/terms`, and `/shipping` are starter templates only. Have counsel adapt them for your business, jurisdiction, retention policy, and fulfillment practices. Shipping label purchase, tracking sync, automated refunds, and customer-initiated returns need a fulfillment provider integration.

## License

Private starter project. Choose and add a license before public distribution.






