# Pool Rental Marketplace

![App Preview](https://imgix.cosmicjs.com/785060d0-1742-11f1-95d6-291bc45ac05c-autopilot-photo-1519449556851-5720b33024e7-1772570967699.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern pool rental marketplace built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com). Browse private pools available for rent, explore host profiles, filter by categories, and read authentic customer reviews.

## Features

- 🏊 **Pool Listings** — Browse all available pools with pricing, capacity, amenities, and photo galleries
- 👤 **Host Profiles** — Dedicated pages for each host with bio, photo, and their listed pools
- 🏷️ **Category Browsing** — Filter and explore pools by category
- ⭐ **Customer Reviews** — Star-rated reviews displayed on pool detail pages
- 📱 **Fully Responsive** — Optimized for mobile, tablet, and desktop
- 🚀 **Server-Side Rendering** — Next.js 16 App Router for fast performance and SEO
- 🖼️ **Image Optimization** — All images optimized via imgix parameters

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=69a748eda217504f8377d9f8&clone_repository=69a74a7b971c989d2fca0512)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online marketplace with product listings, seller profiles, categories, and customer reviews.
>
> User instructions: A pool rental marketplace with locations, hosts, reviews."

### Code Generation Prompt

> "Build a Next.js application for an online business called 'Pool Rental Marketplace'. The content is managed in Cosmic CMS with the following object types: hosts, categories, pools, reviews. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A pool rental marketplace with locations, hosts, reviews."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [Cosmic](https://www.cosmicjs.com) — Headless CMS ([docs](https://www.cosmicjs.com/docs))
- [imgix](https://imgix.com/) — Image optimization

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with bucket configured

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd pool-rental-marketplace
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
Create a `.env.local` file with:
```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetching Pools
```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: pools } = await cosmic.objects
  .find({ type: 'pools' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Pool by Slug
```typescript
const { object: pool } = await cosmic.objects
  .findOne({ type: 'pools', slug: 'my-pool' })
  .props(['id', 'title', 'slug', 'metadata', 'content'])
  .depth(1)
```

### Fetching Reviews for a Pool
```typescript
const { objects: reviews } = await cosmic.objects
  .find({ type: 'reviews', 'metadata.pool': poolId })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This app uses the following Cosmic object types:

| Type | Slug | Purpose |
|------|------|---------|
| 🏊 Pools | `pools` | Pool listings with descriptions, pricing, amenities, galleries |
| 👤 Hosts | `hosts` | Host profiles with bios and photos |
| 🏷️ Categories | `categories` | Pool categories for filtering |
| ⭐ Reviews | `reviews` | Customer reviews with star ratings |

## Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy!

### Netlify
1. Push your code to GitHub
2. Import the repository on [Netlify](https://netlify.com)
3. Set build command to `bun run build`
4. Set publish directory to `.next`
5. Add environment variables
6. Deploy!

<!-- README_END -->