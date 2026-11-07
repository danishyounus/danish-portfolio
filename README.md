# Mohammed Danish Y. — Portfolio

A 3D, motion-aware personal portfolio built with Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion and Three.js.

Every claim on the site is drawn from `content/` and is verifiable. Repositories, demos, screenshots and social profiles stay hidden until real URLs exist.

**Live:** https://danishyounus.vercel.app
**Source:** https://github.com/danishyounus/danish-portfolio

Hosted on Vercel. Every push to `main` deploys to production automatically.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

```bash
npm run build     # production build
npm run start     # serve the production build
npm run typecheck # TypeScript only
```

## Editing content

All copy lives in typed files — no text is hard-coded inside components.

| File | What it controls |
| --- | --- |
| `content/personal.ts` | Name, title, headline, intro, values, social links, portrait paths |
| `content/experience.ts` | Deloitte role and the three industry engagements |
| `content/skills.ts` | Three skill tiers and the six anchors |
| `content/projects.ts` | Seven projects, featured flags, links, screenshots, cover motifs |
| `content/education.ts` | MCA, BCA and the Cranes Varsity PG Diploma |
| `content/certifications.ts` | Eight credential records across four categories |
| `content/site.ts` | Site URL, description, keywords and navigation |
| `content/source/verified-content.md` | Source-of-truth notes for every published fact |

### Rules that the UI enforces

- Only `visible: true` social links with a real URL are rendered.
- Project `repo` / `demo` buttons appear only when the field is a URL.
- Certificate images are shown only when the file exists in `public/`.
- WalkMe expiry is derived from `expires`; past dates show **Renewal due**.
- Direct email is never printed. Enquiries go through the contact form.

## Assets

Portraits and certificate images are installed and served from `public/assets`. Replace a file in place to change it; the components pick it up on the next build.

```
public/assets/portraits/hero-portrait.jpg      # 900×1600 source, displayed 3:4
public/assets/portraits/hero-portrait-480.jpg  # responsive variant
public/assets/portraits/about-portrait.jpg     # 900×1600 source, displayed 4:5
public/assets/portraits/about-portrait-480.jpg # responsive variant
public/assets/certificates/scrum-pspo-ai-essentials.png
public/assets/certificates/walkme-builder-level-1.png
public/assets/certificates/walkme-dap-consultant.png
public/assets/certificates/walkme-dap-advisor.png
public/assets/certificates/forage-tata-data-visualisation.png
public/assets/certificates/forage-british-airways-data-science.png
public/assets/certificates/hp-life-data-science-analytics.png
public/assets/certificates/cranes-varsity-pg-diploma-data-science.png
```

To add project links, edit `content/projects.ts`:

```ts
repo: "https://github.com/…",
demo: "https://…",
screenshots: ["/assets/projects/ott-01.png"],
```

Never add placeholder URLs or generated screenshots. If an asset is missing, the designed cover stays.

## Contact form

`POST /api/contact` validates and rate-limits submissions. It only delivers once all three variables are set:

```
RESEND_API_KEY=…
CONTACT_TO_EMAIL=you@example.com
CONTACT_FROM_EMAIL=portfolio@yourdomain.com
```

Without them the endpoint answers `503 { configured: false }` and the UI states that nothing was sent. No database, account or paid service is required to run the site.

## Deployment (Vercel)

1. Push the repository to GitHub (or run `vercel` from this folder).
2. Import the project in Vercel — framework preset: **Next.js**.
3. Add `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` to Production (and Preview if desired).
4. Add the three contact variables only if the form should deliver mail.
5. Deploy, then verify `/`, `/resume`, `/projects/ott-media-analytics`, `/sitemap.xml`, `/robots.txt` and `/og.png`.

Until `NEXT_PUBLIC_SITE_URL` is set, canonical URLs and JSON-LD point at `http://localhost:3000`.

## Quality scripts

These use the local Chrome installation through `puppeteer-core`.

```bash
node scripts/qa.mjs            # 1440×900 + 390×844 screenshots, overflow and interaction checks
node scripts/qa-breakpoints.mjs # 1024, 768 and 320 layouts with overflow diagnosis
node scripts/qa-routes.mjs     # case study, résumé and contact-form states
node scripts/perf.mjs          # navigation timings, CLS, transfer sizes
node scripts/og.mjs            # regenerate public/og.png (1200×630)
node scripts/diagnose-overflow.mjs # pinpoints any element causing horizontal scroll
```

Screenshots are written to `shots/` (ignored by git).

## Accessibility and motion

- Keyboard focus styles, skip link, labelled controls and focus-restoring dialog.
- `prefers-reduced-motion` is respected, plus a persistent motion toggle in the footer.
- 3D scenes are skipped when WebGL is unavailable; an error boundary and designed static fallbacks prevent a blank page.
- No horizontal overflow at 320, 390, 768, 1024 or 1440 px.

## Technology

Next.js App Router · React 19 · TypeScript · Tailwind CSS · Framer Motion · three / @react-three/fiber / drei · lucide-react · Resend (optional)
