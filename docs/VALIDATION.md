# Validation of the first version

Visa card image update: Visit Visa references `assets/visit-visa.jpg` and Student Visa references `assets/student-visa.jpg`. Both use the shared `service-card--image` modifier with the exact navy gradient and hover treatment. The supplied images are not available as files in the checkout yet, so final image loading and appearance remain pending until they are saved at those paths. Group Tours and Umrah keep plain black-and-gold backgrounds. Earlier baseline asset checks below predate these image references.

Browser: installed Chromium, controlled with Playwright. Automated accessibility: axe-core, WCAG 2 A/AA and 2.1 AA tags. This is a useful baseline, not a full accessibility certification.

Passed:

- Responsive layout at 320, 375, 390, 768, 1024 and 1440 CSS pixels, without horizontal page overflow.
- All nine principal section targets and every internal anchor resolve.
- Mobile menu opens, closes on navigation and Escape, and restores focus on Escape.
- FAQ disclosure opens; native details/summary elements support keyboard use.
- Required form fields reject whitespace-only input.
- All four service choices open WhatsApp for +923457777547 with the selected service, name, destination and message.
- Unicode, ampersands, plus signs, question marks and newlines survive URL encoding.
- All static WhatsApp links have the correct number and a prefilled message; the contact telephone link has the correct number.
- Click-tested all seven visible direct WhatsApp links (header, contact, floating button and four services): each opens the correct prefilled WhatsApp URL. External navigation was intercepted; no real enquiry was sent.
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
