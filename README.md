# N&N International @ ASH Spare Parts

A premium, fully static market showcase for **ASH Spare Parts Market** — presented by **Dr. Nadeem Nazir & Associates**.

> **Vendor directory removed:** the vendor directory and all 525 vendor records were removed on 2026-11-23 at the owner's request. **This site no longer lists any vendor, shop, phone number or address.** It presents the market's spare-parts categories and practical guides only.

- Brand: **N&N international** — sub-brand **@ashspareparts** (typography only, no logo image)
- Purpose: present the spare-parts categories of ASH Spare Parts Market and help visitors understand the trade. **This is a showcase, not a shop.** No prices are shown anywhere, and there is no shopping cart.
- Stack: HTML5, CSS3, vanilla JavaScript. No build step, no framework, no backend. Classic scripts (no ES modules), so pages also open directly from `file://`.

## Pages

| Page | Contents |
|---|---|
| `index.html` | Hero, About, Spare Parts Catalog (10 categories), Why Choose Us, FAQ accordion, Blog listing, Contact form |
| `blog.html` | Blog listing + Add New Blog manager (localStorage) |
| `blog-understanding-automotive-spare-parts-market.html` | Blog 01 (full article) |
| `blog-complete-guide-exploring-spare-parts-vendors.html` | Blog 02 (full article) |

## Project structure

```
nn-international-ash-spare-parts/
├── index.html
├── blog.html
├── blog-understanding-automotive-spare-parts-market.html
├── blog-complete-guide-exploring-spare-parts-vendors.html
├── README.md
├── IMAGE-CREDITS.md
└── assets/
    ├── css/
    │   ├── style.css
    │   └── responsive.css
    ├── js/
    │   ├── catalog.js        # 10 catalog categories + catalog rendering
    │   ├── blogs.js          # built-in blogs + local blog manager (localStorage)
    │   ├── main.js           # header/nav, FAQ accordion
    │   └── contact.js        # contact form validation + FormSubmit delivery to mianjabbar2004@gmail.com, mailto fallback
    └── images/
        ├── hero/             # hero photograph
        ├── branding/         # Dr Nadeem portrait + shop-shelves photograph
        ├── categories/       # 10 real product photographs
        └── blogs/            # blog cover photographs
```

## Setup & deploy

No installation is needed.

**Local preview:**

```bash
cd nn-international-ash-spare-parts
python3 -m http.server 8000
# open http://localhost:8000/
```

Pages also open by double-clicking `index.html` (file:// works — all scripts are classic scripts and all assets are relative).

**Deploy:** upload the whole folder to any static host (GitHub Pages, Netlify, Vercel, or any web server). There is nothing to build and no server-side code.

## Spare Parts Catalog

The catalog on `index.html` lists ten component categories, each with a short factual description and a real photograph:

Engine Parts · Suspension Parts · Brake Components · Electrical Components · Filters · Clutch & Transmission · Body Parts · Cooling System · Steering Components · Automotive Accessories

Catalog cards are informational only — image, title and description. There are no buttons, no prices, no stock or availability claims. Where no specific photograph existed for a category (Suspension Parts, Steering Components, Automotive Accessories), the card uses a real shop/shelves photograph and says so in the card and in its alt text.

## Adding a blog

**Built-in blogs** (visible to everyone): add a full article page following the pattern of the two existing article pages, then add its entry to the `BUILTIN` array in `assets/js/blogs.js` (title, excerpt, date, category, image, slug).

**Local blogs** (this browser only): on `blog.html`, click **Add New Blog**, fill in title, category, excerpt, cover image (chosen from photographs already on the site) and article content, then **Publish**. The blog is saved in `localStorage` under key `nn_ash_blogs_local` and appears in the listing on `blog.html` only, in this browser on this device. It can be edited or deleted from there. Built-in blogs cannot be edited or deleted. The page states this plainly next to the manager. A future backend/CMS can replace `loadLocalBlogs` / `saveLocalBlogs` in `assets/js/blogs.js` without changing the listing code.

## Contact form

Messages go to **mianjabbar2004@gmail.com** (supplied by the site owner on 2026-11-23). The form validates Name, Email, Phone (optional), Subject and Message; on a valid submit it POSTs the message as JSON to the FormSubmit AJAX endpoint `https://formsubmit.co/ajax/mianjabbar2004@gmail.com` (free service, no account or API key) and shows success only when the service answers OK. **One-time activation (owner-only step):** the first submission makes FormSubmit email mianjabbar2004@gmail.com a confirmation link — the owner must click it once, otherwise FormSubmit holds submissions. After that, every message arrives in the inbox automatically. If the request fails (offline, blocked, service down), the form shows an "Open in Email App" link plus a "Copy message" button, with a `mailto:` link to the same address prefilled. No submission is faked. To change the destination address, edit `CONTACT_EMAIL` in `assets/js/contact.js` only. A backend can replace the FormSubmit step there later.

## Images

All photographs are real photographs stored locally in `assets/images/` — no external image is hotlinked at runtime. Full source, author and licence for every image: see `IMAGE-CREDITS.md`.

- Hero: interior of an Advance Auto Parts store (Harrison Keely, CC BY 4.0).
- About: shelves of boxed auto parts (Visitor7, CC BY-SA 3.0).
- Dr Nadeem Nazir portrait: supplied by the project owner, used unaltered; no bio, qualifications or achievements are claimed for him anywhere on the site.
- Catalog: 10 verified Wikimedia Commons photographs of real components. Where no specific photograph existed for a category (Suspension Parts, Steering Components, Automotive Accessories), the card uses a real shop/shelves photograph and says so in the card and in its alt text — it never claims the photograph shows that component.

## Honest limitations

1. **The vendor directory and all vendor records were removed on 2026-11-23 at the owner's request.** This site lists no vendor, shop, phone number or address. The vendor data file was deleted and the vendor images folder was removed.
2. **Contact delivery depends on FormSubmit (formsubmit.co), a free third-party service.** Messages are sent to mianjabbar2004@gmail.com; the owner must complete the one-time activation click (see "Contact form" above). No project phone number is published on the site.
3. **No Dubai section in this build.** Dubai content belonged to the earlier grain-market build and no Dubai vendor data was supplied for ASH Spare Parts.
4. **No market history, establishment date, partnerships or achievements are stated**, because none were supplied. The site does not claim them.
5. **Locally added blogs are browser-only** (see "Adding a blog"). They are not published to other visitors.

## Testing

Tested 2026-11-23, after the vendor-directory removal (see TESTING section below for the method and counts). Summary: `node --check` clean on all 4 remaining JS files; all 4 pages return HTTP 200, all referenced assets return HTTP 200; no vendor data remains anywhere in the site (see grep results); jsdom DOM smoke test passed (catalog renders 10 cards with no buttons, FAQ, blog manager round-trip, contact validation + mailto, hamburger, zero JS errors).

### TESTING (2026-11-23, post-removal)

- `node --check` on `assets/js/catalog.js`, `blogs.js`, `main.js`, `contact.js` — **4/4 pass, no errors**.
- Served with `python3 -m http.server`; `curl` on all 4 pages — **4/4 HTTP 200**. `curl` on every asset referenced in the HTML (2 CSS, 4 JS, 5 images) — **11/11 HTTP 200**. `curl` on every image file on disk (10 category photos, hero, portrait, shelves, 2 blog covers) — **15/15 HTTP 200**.
- Grep for vendor-data markers across the whole folder (html/js/css/md) — the old data-file name, the vendor-data global, the old directory/modal class names, a known shop name, the old shop count, the old vendors anchor, the old CTA text and the old details-button text — **0 hits**, except the single removal-history sentence at the top of this README. The word "vendor" survives only as generic guide wording in the two blog article bodies (no vendor names, phones or addresses anywhere) — see the removal report for the exact locations.
- jsdom DOM smoke test (jsdom installed locally for the test in `/tmp`, not part of the site): **35/35 checks passed** — catalog renders 10 cards with no buttons and all 10 category titles; no Vendors nav/footer link, no `#vendors` link, no "Explore Vendors" text anywhere; hero heading and CTA correct; no vendor section/modal/toolbar in the DOM; no `tel:`/`wa.me` links; FAQ has 6 questions, expands and collapses; hamburger toggles the nav; footer tagline and DigiNixIT link verified; blog listing shows the 2 built-in blogs with no edit/delete buttons; localStorage add → appears, Read → full article shown, edit → title changes, delete → removed, empty blog form rejected; contact form rejects a bad email (that test predates the FormSubmit wiring — re-test after the 2026-11-23 contact change).
- Contact delivery (2026-11-23): `node --check` clean on the rewritten `contact.js`; the FormSubmit AJAX endpoint and mailto fallback both point to mianjabbar2004@gmail.com (verified by grep). **Live end-to-end delivery was NOT verified from this machine:** the AJAX POST timed out twice from this VM, and a plain curl POST was rejected by FormSubmit for having no referer (curl is not a browser). The one-time activation must therefore be completed by submitting the form once from the live site in a real browser — see "Contact form" above.
- Manual checks: sticky header, smooth-scroll nav, active nav state, responsive layouts at 1280 / 820 / 390 px widths with no horizontal scroll.
