# Validation of the first version

Service card image update: the four original JPEGs from the uploaded ZIP are included at `assets/visit-visa.jpg`, `assets/student-visa.jpg`, `assets/group-tours.jpg`, and `assets/umrah.jpg`. Files were visually matched to their services, rather than relying on ZIP entry order, and copied without recompression. The shared navy gradient now uses 0.68/0.84 alpha, with hover opacity 0.90, to reveal more of the images. Mobile/desktop checks use these real assets.

About photo and logo update: the original travel photo is now included at `assets/about-journey.jpg`. The supplied logo PNG is preserved under `branding/`; `assets/logo.webp` is a web-optimised export used for the website branding. CSS frames the golden globe while the wordmark/tagline remain readable HTML. Both new website assets are included in the hosting ZIP and embedded in the standalone preview. Screenshots and browser checks are refreshed with the actual uploaded files.

Browser: installed Chromium, controlled with Playwright. Automated accessibility: axe-core, WCAG 2 A/AA and 2.1 AA tags. This is a useful baseline, not a full accessibility certification.

Passed:

- Responsive layout at 320, 375, 390, 768, 1024 and 1440 CSS pixels, without horizontal page overflow.
- All nine principal section targets and every internal anchor resolve.
- Mobile menu opens, closes on navigation and Escape, and restores focus on Escape.
- FAQ disclosure opens; native details/summary elements support keyboard use.
- Required form fields reject whitespace-only input.
- All four service choices open WhatsApp for +923457777547 with the selected service, name, destination and message.
- Unicode, ampersands, plus signs, question marks and newlines survive URL encoding.
- All static WhatsApp links use an approved contact number and a prefilled message. Contact has one call and one WhatsApp link for each of +923457777547 and +923455003104.
- Click-tested the original seven visible direct WhatsApp links (header, primary contact, floating button and four services), plus the added secondary-contact link: each opens the correct prefilled WhatsApp URL. External navigation was intercepted; no real enquiry was sent.
- No local/session storage or cookies created during the checks.
- Mobile and desktop axe audits: zero violations, 29 rule passes in each tested state.
- No-JavaScript state shows a direct WhatsApp link and disables form submission.
- No JavaScript errors or failing local assets in the browser run.
- Desktop and mobile screenshots visually reviewed.
- Black-and-gold theme: expanded FAQs on desktop and mobile, plus the open mobile menu, also passed automated WCAG A/AA checks without violations.

The test intercepts WhatsApp navigation. No enquiry was sent, and no message delivery or recipient response is claimed. Actual WhatsApp app handoff depends on the visitor's device, installed app/login and network.

Production hosting, DNS, HTTPS, real-device iOS/Android behaviour, Safari, Firefox, search indexing, social sharing previews and independent screen-reader review have not been tested. No live domain was connected or published. Metadata includes a descriptive title, description, language, viewport and Open Graph text; domain-specific canonical and social image URLs await a confirmed domain.

Screenshots and the exact automated results are in `artifacts/`. Regenerate them after content/layout changes.

Packaging: ZIP integrity and exact root file list passed. Extracted hosting files were served from an independent directory and browser-checked successfully. The standalone preview was served and checked with working scripts, no asset errors and only one HTTP request (all assets embedded). Opening file:// URLs is blocked by the managed environment's browser policy, so direct offline opening could not be tested here; no browser policy was changed.
