// Development-only checks. The deployed site has no Node.js dependency.
// Start: python3 -m http.server 8000 --bind 0.0.0.0
// Run: node scripts/verify.cjs
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = process.env.SITE_URL || 'http://127.0.0.1:8000';
const out = path.resolve(__dirname, '../artifacts');
fs.mkdirSync(out, { recursive: true });
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
  const errors = [], failures = [], results = [];
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    page.on('pageerror', e => errors.push(e.message));
    page.on('response', r => { if (r.url().startsWith(base) && r.status() >= 400) failures.push(r.url()); });
    await context.route('https://wa.me/**', route => route.fulfill({ status: 200, contentType: 'text/html', body: '<title>WhatsApp destination intercepted for testing</title>' }));
    for (const width of [320, 375, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 950 });
      await page.goto(base);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `No horizontal overflow at ${width}px`);
      for (const id of ['home','about','services','visit','student','groups','umrah','contact','faqs']) assert.equal(await page.locator(`#${id}`).count(), 1);
      const missing = await page.locator('a[href^="#"]').evaluateAll(links => links.filter(a => !document.querySelector(a.getAttribute('href'))).map(a => a.getAttribute('href')));
      assert.deepEqual(missing, []);
      results.push(`PASS: ${width}px layout, sections and internal links`);
      if (width === 390 || width === 1440) {
        const name = width === 390 ? 'mobile' : 'desktop';
        await page.screenshot({ path: path.join(out, `${name}-preview.png`) });
        await page.screenshot({ path: path.join(out, `${name}-full.png`), fullPage: true });
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(base);
    await page.locator('.menu-toggle').click();
    assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'true');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
    assert.equal(await page.locator('.menu-toggle').evaluate(el => el === document.activeElement), true);
    await page.locator('.menu-toggle').click();
    await page.locator('#navigation a[href="#contact"]').click();
    assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
    results.push('PASS: mobile menu, Escape, focus return and section navigation');
    await page.locator('summary').first().click();
    assert.equal(await page.locator('details').first().getAttribute('open'), '');
    results.push('PASS: FAQ disclosure opens');
    await page.locator('#name').fill('   ');
    await page.locator('#destination').fill('Malaysia');
    await page.locator('#service').selectOption({ label: 'Visit Visa Consultancy' });
    await page.locator('button[type="submit"]').click();
    assert.equal(await page.locator('#name').evaluate(e => e.checkValidity()), false);
    for (const service of ['Visit Visa Consultancy','Student Visa Consultancy','Group Visits and Tours','Five-Star Umrah']) {
      await page.locator('#name').fill('Ayesha & Ali');
      await page.locator('#destination').fill('Türkiye & UAE');
      await page.locator('#service').selectOption({ label: service });
      await page.locator('#message').fill('Dates: June\n2 adults + 1 child? Budget & details.');
      const popupPromise = page.waitForEvent('popup');
      await page.locator('button[type="submit"]').click();
      const popup = await popupPromise;
      await popup.waitForLoadState();
      const url = new URL(popup.url());
      assert.equal(url.hostname, 'wa.me');
      assert.equal(url.pathname, '/923457777547');
      const message = url.searchParams.get('text');
      for (const value of ['Ayesha & Ali', 'Türkiye & UAE', service, 'Dates: June\n2 adults + 1 child? Budget & details.']) assert.ok(message.includes(value));
      await popup.close();
      assert.ok((await page.locator('#form-status').innerText()).includes('press Send'));
      results.push(`PASS: encoded WhatsApp form enquiry — ${service}`);
    }
    for (const link of await page.locator('a[href^="https://wa.me/"]').all()) {
      const url = new URL(await link.getAttribute('href'));
      assert.equal(url.pathname, '/923457777547');
      assert.ok(url.searchParams.get('text'));
    }
    assert.equal(await page.locator('a[href="tel:+923457777547"]').count(), 1);
    assert.equal(await page.evaluate(() => localStorage.length + sessionStorage.length), 0);
    assert.equal(await context.cookies().then(c => c.length), 0);
    results.push('PASS: WhatsApp links, telephone links and no browser storage/cookies');
    // Optional external development dependency; never included in the hosting ZIP.
    if (process.env.AXE_CORE_PATH) {
      for (const width of [390, 1440]) {
        await page.setViewportSize({ width, height: 950 });
        await page.goto(base);
        await page.addScriptTag({ path: process.env.AXE_CORE_PATH });
        const audit = await page.evaluate(() => axe.run(document, { runOnly: { type:'tag', values:['wcag2a','wcag2aa','wcag21aa'] } }));
        fs.writeFileSync(path.join(out, `accessibility-${width}.json`), JSON.stringify(audit.violations, null, 2));
        assert.deepEqual(audit.violations.map(v => ({ id:v.id, nodes:v.nodes.map(n=>n.target) })), [], `Accessibility at ${width}px`);
        results.push(`PASS: automated WCAG A/AA audit at ${width}px (${audit.passes.length} rule passes)`);
      }
    }
    const noJS = await browser.newContext({ javaScriptEnabled: false, viewport: { width:390, height:844 } });
    const fallback = await noJS.newPage();
    await fallback.goto(base);
    assert.equal(await fallback.locator('noscript a').isVisible(), true);
    assert.equal(await fallback.locator('button[type="submit"]').isDisabled(), true);
    await noJS.close();
    results.push('PASS: no-JavaScript direct WhatsApp fallback');
    assert.deepEqual(errors, []);
    assert.deepEqual(failures, []);
    results.push('PASS: no JavaScript errors or failed local resources');
    fs.writeFileSync(path.join(out, 'test-results.txt'), results.join('\n') + '\n');
    console.log(results.join('\n'));
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exit(1); });
