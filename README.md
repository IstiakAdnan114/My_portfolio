# Md. Istiak Adnan — Professional Portfolio

[![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-CMS%20%26%20Auth-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

A responsive portfolio and owner-managed content system for **Md. Istiak Adnan**, an Industrial and Production Engineering student at BUET.

**Live website:** [my-portfolio-adnan.vercel.app](https://my-portfolio-adnan.vercel.app/)

## What the website includes

- Home, About, Experience, Skills, Projects, Publications, Blog, Certifications, Notices, Photos, and Contact pages
- Project cover images and multi-image galleries
- Block-based blog posts containing text, headings, quotes, lists, links, and images
- Education details and a categorized IPE course catalogue
- Responsive image lightboxes and mobile-friendly navigation
- Performance-aware animated backgrounds for desktop and mobile devices
- Visitor contact form with a private message inbox for administrators
- Draft, preview, publish, import, and export workflows
- Browser-side image compression before cloud upload
- Supabase authentication, database storage, file storage, and Row Level Security
- Owner-controlled administrator allowlist

## Owner dashboard

The website content can be managed without editing code:

- `/admin` — edit content, images, colors, sections, ordering, drafts, and published data
- `/admin/access` — sign in, sign out, recover or change a password, and manage administrator access

The first authorized account is the **owner**. Only the owner can grant, disable, or restore access for other administrators. Editors can manage portfolio content but cannot manage administrator accounts.

Supabase keeps a refreshable session in the trusted browser, so administrators normally remain signed in until they sign out or their access is revoked. Passwords are handled by Supabase and are never stored in the portfolio content.

## How content updates work

1. Sign in through `/admin/access`.
2. Open `/admin` and edit the required section.
3. Save the work as a draft.
4. Review the draft, then publish it when ready.
5. The public website reads the newly published content from Supabase.

Content published through the dashboard does **not** require a Git commit or a Vercel redeployment. Code, layout, or feature changes still need to be pushed to GitHub so Vercel can deploy them.

Uploaded images are compressed in the browser and stored in the Supabase `portfolio-media` bucket. The CMS saves their public URLs with the published content, allowing the images to appear across devices.

## Technology

| Layer | Technology |
|---|---|
| Interface | React 19, TypeScript, React Router |
| Styling | Tailwind CSS 4 |
| Animation | Motion, OGL, Three.js |
| Content rendering | React Markdown and remark-gfm |
| Backend | Supabase Auth, Postgres, Storage, and RLS |
| Build tool | Vite 6 |
| Hosting | Vercel |

## Project structure

```text
public/images/              Default local images and downloadable assets
src/blog/                   Blog block helpers
src/cms/                    CMS state, Supabase access, messages, image handling
src/components/             Shared interface and visual components
src/components/admin/       Specialized dashboard editors
src/pages/                  Public pages and administrator pages
src/data.ts                 Default/fallback portfolio content
src/App.tsx                 Routes
src/index.css               Global styles and theme rules
supabase/schema.sql         Database, storage, functions, and RLS setup
.env.example                Environment-variable template
vercel.json                 Single-page application route fallback
```

`src/data.ts` supplies the initial/fallback content. Once Supabase is connected, routine content changes should be made through the owner dashboard.

## Run locally

### Requirements

- Node.js 18 or newer
- npm

### Installation

```bash
git clone https://github.com/IstiakAdnan114/My_portfolio.git
cd My_portfolio
npm install
```

Create a local environment file:

```bash
copy .env.example .env.local
```

Add the Supabase project values to `.env.local`, then start the website:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful commands:

```bash
npm run lint       # Type-check the project
npm run build      # Create a production build in dist/
npm run preview    # Preview the production build
```

## Connect Supabase

1. Create or select a Supabase project.
2. Open the Supabase SQL Editor and run [`supabase/schema.sql`](supabase/schema.sql). The script creates the content tables, drafts, messages, administrator allowlist, storage policies, helper functions, and RLS policies. It is designed to be safe to run again after updates.
3. In **Authentication → Users**, create the owner account. Keep public user registration disabled.
4. At the bottom of `schema.sql`, copy the one-time owner bootstrap statement, replace the example address with the exact owner email, and run it.
5. In **Authentication → URL Configuration**, set the deployed website as the Site URL and allow these redirects:
   - `https://your-domain.example/admin/access`
   - `http://localhost:3000/admin/access`
6. Add the following values to `.env.local`:

```dotenv
VITE_SUPABASE_URL="https://YOUR-PROJECT.supabase.co"
VITE_SUPABASE_ANON_KEY="YOUR_PUBLISHABLE_KEY"
VITE_OWNER_EMAIL="your-owner-email@example.com"
```

`VITE_OWNER_EMAIL` only pre-fills the login form; it is not used as a security boundary. The administrator allowlist and database RLS policies enforce access.

### Add another administrator

1. Create or invite that person from **Supabase Authentication → Users**.
2. The new administrator must set and use their own password; the owner's password is not shared.
3. Sign in as the owner at `/admin/access` and authorize the exact email address.
4. The new account receives the `editor` role and cannot manage other administrators.

## Deploy with Vercel

1. Import this GitHub repository into Vercel.
2. Add `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and `VITE_OWNER_EMAIL` under **Project Settings → Environment Variables** for Production and Preview as appropriate.
3. Redeploy after adding or changing environment variables.

Do not upload `.env.local` to GitHub. Vercel receives its own copy of the environment values through its dashboard. The Supabase URL and publishable/anonymous key are designed to be used by browser applications; security is enforced by authentication and RLS.

**Never expose a Supabase secret key or `service_role` key in this repository, a `VITE_` variable, or browser code.**

## Backups and maintenance

- Export a JSON backup from `/admin` after important content updates.
- Keep the exported backup somewhere outside the project folder.
- Test publishing, image uploads, the contact inbox, and administrator access after significant deployments.
- Password recovery and invitation emails use Supabase Auth. Supabase's built-in email service is suitable for light testing but has strict limits; custom SMTP can be configured later if reliable production email delivery is required.
- If an image fails to upload, confirm that Supabase is connected, the user is authorized, and `supabase/schema.sql` has been applied successfully.

## Local demo mode

If the Supabase variables are blank, the dashboard uses local demo mode. Demo content and login state are limited to that browser and are not shared with visitors or other devices. Use Supabase mode for the deployed website.

## Contact

- **Email:** [adnanistiak111@gmail.com](mailto:adnanistiak111@gmail.com)
- **LinkedIn:** [linkedin.com/in/istiak-adnan](https://linkedin.com/in/istiak-adnan)

---

<p align="center">Designed and built by Md. Istiak Adnan © 2026</p>
