# Website upload karne ka tareeqa

## Preview

`artifacts/adenglobal-preview.html` download karke browser mein kholein. Is ek file mein website aur images shamil hain. Asal source `index.html`, `styles.css`, `script.js` aur `assets/` mein hai. Desktop aur mobile screenshots bhi `artifacts/` mein hain.

## cPanel ya standard shared hosting

1. `artifacts/adenglobal-shared-hosting.zip` download karein. Koi paid API, database ya Node server zaroori nahi.
2. Hosting panel mein sahi domain ka document root confirm karein. cPanel ke primary domain ka folder aam tor par `public_html` hota hai; addon domain ka folder mukhtalif ho sakta hai.
3. Agar pehle se website hai to uski files ka backup lein. Purani website bina backup overwrite na karein.
4. File Manager mein document root kholein, ZIP upload karein aur wahin extract karein. `index.html` seedha `public_html/index.html` par hona chahiye, kisi extra folder ke andar nahi.
5. Saath `styles.css`, `script.js` aur `assets/` folder bhi hon. Extract karne ke baad ZIP delete kar dein. Source repository, scripts aur private documents public folder mein upload na karein.
6. Hosting ka free SSL certificate enable karein. Certificate active hone ke baad hosting panel se HTTPS redirect enable karein.
7. Website khol kar images, menu, phone links aur chaaron services ke WhatsApp buttons check karein. Form se message WhatsApp mein review karein; Send dabana aapki marzi hai.
8. Mobile aur desktop par dobara dekhein. Purana design dikh raha ho to browser aur hosting cache clear karein.

3GB storage ke muqablay mein yeh website bohat chhoti hai. Hosting ko sirf HTML, CSS, JavaScript aur WebP/SVG files serve karni hain. Domain final hone se pehle live publication zaroori nahi.

## Content updates

Copy, services, FAQs aur visible contact `index.html` mein; rang `styles.css` ke shuru mein; WhatsApp message `script.js` mein edit karein. Number badlein to HTML ke tamam phone aur WhatsApp links bhi badlein. Phir `python3 scripts/package.py` chala kar naya ZIP banayein.

## Launch se pehle missing details

- Final domain aur hosting document root.
- Naya supplied logo aur About photo ab shamil hain. Original logo `branding/logo-original.png` mein preserved hai; hosting ke liye optimised `assets/logo.webp` use hota hai.
- Har service ka final scope aur available destinations.
- Consultation fees, timings, quotation process aur cancellation/refund terms.
- Umrah ke actual arrangements, ratings, inclusions aur applicable authorisations ki tasdeeq; website par kisi hotel ya authorisation ka daawa nahi.
- Office address, business email aur social accounts sirf confirm hone par add karein; abhi public website par nahi hain.

Domain final hone par canonical URL, og:url aur absolute social sharing image metadata add karwana behtar hai. Koi service buy nahi ki gayi aur website kisi live domain par publish nahi hui.
