# LearnOS — Student Dashboard

A high-fidelity, animated student learning dashboard built with Next.js 14 App Router, Supabase, Tailwind CSS, and Framer Motion.

## Live Demo

> Deployed on Vercel: (https://andaz-kumar-eight.vercel.app/dashboard)
---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| Next.js | 14 (App Router) | Framework, RSC, routing |
| Supabase | ^2.44 | PostgreSQL BaaS, data source |
| Tailwind CSS | ^3.4 | Utility-first styling |
| Framer Motion | ^11 | Animations, spring physics |
| TypeScript | ^5 | Type safety |
| Lucide React | ^0.400 | Icon system |

---

## Architecture & Design Decisions

### Server / Client Split

- **Server Components** (`app/dashboard/page.tsx`): All Supabase data fetching happens here. This keeps secrets on the server, avoids client-side waterfalls, and enables streaming with React Suspense.
- **Client Components** (`"use client"`): Only components that require browser APIs, event listeners, or Framer Motion animations are client components. These are leaf nodes in the tree where possible.
- **Layout** (`app/dashboard/layout.tsx`): The layout is a client component because sidebar collapse state lives here. The page itself (data) is still a server component.

### Data Fetching

`lib/supabase.ts` exports a `fetchCourses()` function called directly in the RSC page. It:
1. Attempts a Supabase query
2. Falls back to static mock data if the DB is unreachable (great for development before Supabase is set up)
3. Logs errors server-side without crashing the UI

### Animation Strategy

- **Zero layout shifts**: All hover states use `transform: scale()` via Framer Motion — no width/height/margin changes that would trigger reflow.
- **Staggered entrance**: `motion.div` containers use `staggerChildren` so tiles animate in sequentially on load.
- **Spring physics**: Card hover uses `type: "spring", stiffness: 300, damping: 20` for a natural feel.
- **`layoutId`**: The sidebar active item background uses `layoutId="activeNavBg"` so it smoothly slides between nav items.
- **Progress bars**: Animated from 0 → value using `useInView` to trigger only when visible, with a cubic-bezier easing.

### Responsive Design

| Breakpoint | Layout |
|---|---|
| `< 768px` | Single column, bottom nav bar |
| `768px – 1024px` | 2-column grid, sidebar icons only |
| `> 1024px` | 3-column bento grid, full sidebar |

---

## Local Setup

```bash
# 1. Clone and install
git clone https://github.com/your-username/learning-dashboard
cd learning-dashboard
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Fill in your Supabase URL and keys

# 3. Set up Supabase (see below)

# 4. Run dev server
npm run dev
```

## Supabase Setup

1. Create a free project at [supabase.com](https://supabase.com)
2. Run this SQL in the Supabase SQL editor:

```sql
create table courses (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  progress integer not null default 0,
  icon_name text not null default 'BookOpen',
  created_at timestamp with time zone default now()
);

-- Seed data
insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns', 75, 'Code2'),
  ('System Design Fundamentals', 42, 'Network'),
  ('TypeScript Deep Dive', 91, 'FileCode'),
  ('Next.js App Router', 58, 'Layers');

-- Enable Row Level Security (optional but recommended)
alter table courses enable row level security;
create policy "Allow public read" on courses for select using (true);
```

3. Copy your project URL and anon key into `.env.local`

---

## Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard:
# NEXT_PUBLIC_SUPABASE_URL
# NEXT_PUBLIC_SUPABASE_ANON_KEY
# SUPABASE_SERVICE_ROLE_KEY
```

---

## Environment Variables

See `.env.example` for required variables. **Never commit `.env.local`.**

| Variable | Required | Exposed to client |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Yes (public) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Yes (public, RLS-protected) |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional | **No — server only** |

---

## Challenges & Solutions

**Challenge**: Framer Motion `AnimatePresence` inside a collapsed sidebar conflicted with `layoutId` animations.  
**Solution**: Separated the active background overlay from text labels so each animates independently.

**Challenge**: Progress bars animating before being visible caused a jarring experience.  
**Solution**: Used `useInView` from Framer Motion with `once: true` to trigger the animation only when the card enters the viewport.

**Challenge**: Server component data fetching with graceful fallback.  
**Solution**: `fetchCourses()` wraps the Supabase call in try/catch and returns static data on failure — the UI always renders.
