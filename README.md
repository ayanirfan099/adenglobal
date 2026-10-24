# ADEN GLOBAL — static business website

Responsive black-and-gold English website: Home, About, four detailed services, enquiry process, FAQs and Contact. Production needs only static shared hosting. No Node server, database, API or build is required.

## Preview

Open `index.html` directly, or run `python3 -m http.server 8000 --bind 0.0.0.0` from this directory. The standalone `artifacts/adenglobal-preview.html` embeds all assets for a single-file preview.

## Editable content

- `index.html`: English copy, services, FAQ answers, metadata and visible contact details.
- `styles.css`: palette variables at the top, typography and responsive layout.
- `script.js`: WhatsApp number, message formatting and mobile navigation.
- `assets/mark.svg`: new globe mark inspired by the reference; not an extracted original logo.
- `assets/journey.webp`: generated illustrative landscape, not a promised destination or package.
- Visit and Student Visa cards use image backgrounds: save the supplied airport image as `assets/visit-visa.jpg` and the library image as `assets/student-visa.jpg`. Their inline backgrounds and `service-card--image` modifier enable the navy overlay and hover treatment. Group Tours and Umrah retain their plain black-and-gold backgrounds for now. For those cards, reuse the modifier and add the matching inline image path (`assets/group-tours.jpg` or `assets/umrah.jpg`). Run `python3 scripts/package.py` after saving images; it includes the referenced JPEGs in both ZIPs and embeds them in the standalone preview, reporting any missing files.
- `docs/DEPLOYMENT.md`: Roman Urdu upload instructions and launch checklist.
- `docs/VALIDATION.md`: test scope and limitations.

If changing the phone, update every `tel:` and `wa.me` link in HTML as well as `WHATSAPP_NUMBER` in JavaScript and the test expectations. No domain ownership is assumed. Add canonical and absolute social image metadata only after confirming the domain.

## Enquiries

The form opens a URL-encoded WhatsApp message. The visitor must press Send in WhatsApp. No server submission, browser storage, cookies, analytics, uploads or payments. With JavaScript disabled, the submit button stays disabled and a direct WhatsApp link is shown. Hosting may retain ordinary access logs; WhatsApp applies its own privacy terms.

## Build deliverables

Run `python3 scripts/package.py`. The resulting hosting ZIP has `index.html`, CSS, JavaScript and `assets/` at its root. Do not upload the entire source repository to hosting.

## Optional development checks

Start the server, then run `node scripts/verify.cjs`. Requires Playwright and Chromium (the prepared environment uses `/usr/bin/chromium`). Override `SITE_URL` and `CHROMIUM_PATH` if needed. For accessibility checks, install axe-core outside the checkout:

```sh
npm install --prefix /tmp/aden-tools --cache /tmp/aden-npm-cache axe-core --no-audit --no-fund --ignore-scripts
AXE_CORE_PATH=/tmp/aden-tools/node_modules/axe-core/axe.min.js node scripts/verify.cjs
```

Tests intercept WhatsApp navigation and never send a real message. Reports and screenshots go into `artifacts/`. Test tools are not production dependencies.
