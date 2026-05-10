# Analysts Lens — Setup Guide

## Step 1 — Install dependencies
```bash
cd C:\AI_System\analysts-lens
npm install
```

## Step 2 — Create Sanity project
```bash
npm create sanity@latest -- --project analysts-lens --dataset production --template clean
```
→ Choose "Add to existing project" → point to this folder  
→ Note the **Project ID** it prints (you need it for env vars)

## Step 3 — Set up env vars
Copy `.env.local.example` → `.env.local` and fill in:

```env
# Sanity (from Step 2)
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz     ← your project ID
NEXT_PUBLIC_SANITY_DATASET=production

# Supabase (create project at supabase.com)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

## Step 4 — Test locally
```bash
npm run dev
```
- Homepage: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio

## Step 5 — Create GitHub repo + deploy to Vercel
1. Create repo `analysts-lens` on GitHub
2. Push code:
   ```bash
   git init && git add . && git commit -m "init"
   git remote add origin https://github.com/YOUR_USERNAME/analysts-lens.git
   git push -u origin main
   ```
3. Go to vercel.com → Import from GitHub → select `analysts-lens`
4. Add all env vars from `.env.local` in Vercel dashboard
5. Deploy → get your URL (e.g. `analysts-lens.vercel.app`)

## Step 6 — Add Hugo to Sanity
1. Go to sanity.io → your project → Members
2. Invite Hugo's email with **Editor** role
3. Hugo goes to `analysts-lens.vercel.app/studio`
4. He logs in → clicks **New Article** → writes → publishes → live in <30s

## Hugo's workflow (no code, no Git)
```
1. Go to analysts-lens.vercel.app/studio
2. Login with Sanity account
3. Click "Article" → "New"
4. Fill: Title, Category, Excerpt, Cover Image, Body
5. Hit Publish
6. Article is live immediately
```
