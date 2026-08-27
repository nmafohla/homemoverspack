# HomeMoversPack UK — Moving In Made Simple

A high-performance modern web application for [HomeMoversPack.co.uk](https://homemoverspack.co.uk) — delivering free welcome packs, interactive moving house checklists, exclusive partner discounts from leading UK household brands, and the annual £10,000 Home Makeover prize draw.

---

## 🚀 Key Features

- **The Welcome Pack Showcase**: Overview of physical & digital welcome box perks (tea/coffee first-night break, essentials, guides).
- **Interactive Moving Checklist**: Multi-stage planner (8 weeks before to first week settled) with task completion tracking persisted to `localStorage`, priority badges, and printable PDF export.
- **Exclusive Partner Discounts Directory**: Instant search & category filtering for verified UK deals (Broadband, Home Security, Appliances, Paint, Removals, and Food boxes) with one-click promo code copying.
- **£10,000 Home Makeover Prize Draw**: Validated registration form with celebratory confetti animation and unique entry reference generation.
- **Helpful Video Guides**: Modal-powered video tutorials covering boiler pressure repressurising, address changing, smart home setup, and moving hacks.
- **Digital Magazine Reader**: 2026 edition preview with direct access to full flipbook guide.
- **Mover Reviews & Testimonials**: Verified customer feedback carousel from across the UK.
- **Mover Feedback & Brand Sampling Portals**: Direct feedback collection and B2B brand partnership inquiry workflows.

---

## 🛠️ Architecture & Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server Components & Client Widgets)
- **Language**: [TypeScript](https://www.typescriptlang.org/) with `strict: true` and `noUncheckedIndexedAccess: true`
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Validation**: [Zod](https://zod.dev/)
- **Test Runner**: [Vitest](https://vitest.dev/)
- **Code Quality**: ESLint, Prettier, TypeScript Compiler (`tsc --noEmit`)
- **Hosting / Deployment**: [Vercel](https://vercel.com/)

---

## 📋 Prerequisites

- **Node.js**: `v18.17.0` or higher
- **npm**: `v9.0.0` or higher

---

## 🔑 Environment Variables

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

| Variable               | Description                                           | Default / Example              |
| ---------------------- | ----------------------------------------------------- | ------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | Canonical root URL for metadata and OpenGraph sharing | `https://homemoverspack.co.uk` |
| `CONTACT_EMAIL`        | Official contact and support email address            | `info@homemoverspack.co.uk`    |

---

## 💻 Local Setup & Development

1. **Clone the repository**:

   ```bash
   git clone <repo-url>
   cd clever-lavoisier
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Code Quality

Run all quality checks before committing or pushing:

```bash
# Run unit tests
npm run test

# Run TypeScript typecheck
npm run typecheck

# Run ESLint
npm run lint

# Check code formatting
npm run format:check

# Format files with Prettier
npm run format

# Production build test
npm run build
```

---

## 🚢 Deployment to Vercel

The application is pre-configured for seamless zero-config deployment on Vercel:

1. Import the Git repository in your [Vercel Dashboard](https://vercel.com/new).
2. Framework Preset: **Next.js**.
3. Set any environment variables (e.g. `NEXT_PUBLIC_SITE_URL`).
4. Click **Deploy**.

---

## 📜 License & Compliance

Built for HomeMoversPack UK. Fully compliant with UK GDPR, Data Protection Act 2018, and standard prize draw competition regulations.
