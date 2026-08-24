# Sun Exports Website

This folder contains the complete static website for **Sun Exports** – a manufacturer and exporter of cocopeat, cocohusk chips, cocopeat grow bags, and coir pitch from Dindigul, Tamil Nadu, India.

## Website Structure
- `index.html` – Home page
- `about.html` – About us
- `products.html` – Products overview
- `cocopeat.html`, `coir-fiber.html`, `coir-yarn.html`, `coir-pith.html` – Individual product pages
- `quality.html` – Quality certifications
- `export-markets.html` – Export markets served
- `contact.html` – Contact form (uses Formspree – replace `YOUR_FORM_ID` with your actual Formspree ID)
- `/css/styles.css` – Main stylesheet
- `/js/main.js` – Interactive components (mobile menu, language selector, etc.)
- `/assets/` – Images (logos, badges, etc.)
- `/videos/` – Hero video (`hero-video.mp4`)

## How to Run Locally

1. **Prerequisites**: You only need a web browser. No build step is required.
2. Open any HTML file (e.g., `index.html`) directly in your browser, or
3. Run a simple local server to avoid CORS issues with the video/assets:
   ```bash
   # Using Python (if installed)
   python -m http.server 8000
   # Then open http://localhost:8000 in your browser
   ```
   Or with Node.js: yout 
   ```bash
   npx http-server . -p 8000
   ```

## Deploying to a Live Domain

You can deploy this static site to any static‑hosting service (Netlify, Vercel, GitHub Pages, Cloudflare Pages, Firebase Hosting, or traditional FTP/shared hosting). Below are step‑by‑step guides for the most common options.

### Option 1: Netlify (Recommended – free tier, custom domain, HTTPS)

1. **Create a GitHub repository**
   - Sign in to [GitHub](https://github.com).
   - Click **New** → name it (e.g., `sun-exports-site`) → Public/Private → **Create repository**.
   - Do **not** initialize with a README (we’ll push our existing folder).

2. **Push the site to GitHub**
   Open Git Bash / Git‑shell in the folder `D:\client works\sun exports\sun-exports-site` and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Sun Exports website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/sun-exports-site.git
   git push -u origin main
   ```

3. **Connect to Netlify**
   - Go to [Netlify](https://app.netlify.com) and sign up / log in.
   - Click **New site from Git** → **GitHub** → authorize Netlify → select your repository.
   - Build settings:
     - **Build command**: leave blank (no build step)
     - **Publish directory**: `.` (the root of the repo)
   - Click **Deploy site**.
   - Netlify will give you a random subdomain (e.g., `sun-exports.netlify.app`). Your site is live!

4. **Add a Custom Domain**
   - Buy a domain (e.g., `sunexports.co.in`) from any registrar (GoDaddy, Namecheap, Google Domains, etc.).
   - In Netlify dashboard → **Domain settings** → **Custom domains** → **Add custom domain**.
   - Enter your domain and follow the DNS instructions (usually add a CNAME or A record pointing to Netlify’s servers).
   - Netlify will automatically provision an SSL certificate (HTTPS) once DNS propagates.

### Option 2: Vercel

1. Push the repository to GitHub as above.
2. Go to [Vercel](https://vercel.com) → **New Project** → Import your GitHub repo.
3. Vercel will detect it’s a static site; keep the default settings (Output directory: `.`).
4. Click **Deploy**.
5. Add a custom domain in **Project Settings → Domains** and follow the DNS steps. Vercel also provides free HTTPS.

### Option 3: GitHub Pages (Free, but limited to `username.github.io` or a custom domain with fewer features)

1. Push the repo to GitHub (as above).
2. In the repo → **Settings** → **Pages**.
   - Source: `Deploy from a branch` → `main` branch → `/ (root)`.
   - Click **Save**.
3. GitHub will publish the site at `https://<username>.github.io/sun-exports-site/`.
4. To use a custom domain:
   - In the same Pages settings, under **Custom domain**, enter your domain (e.g., `www.sunexports.co.in`).
   - Save; GitHub will show the required DNS records (usually an A record pointing to GitHub’s IPs).
   - Configure those records at your domain registrar.
   - GitHub will automatically enable HTTPS (may take a few minutes).

### Option 4: Traditional FTP / Shared Hosting

1. Compress the entire folder (`sun-exports-site`) into a ZIP file.
2. Log into your hosting control panel (cPanel, Plesk, etc.) or connect via FTP/SFTP.
3. Upload the ZIP to the `public_html` (or `www`) directory and extract it.
   - Ensure the `index.html` is directly inside the public folder (not inside a subfolder named `sun-exports-site` unless you want that as a subpath).
4. If your host provides a file manager, you can upload the files directly.
5. Point your domain’s document root to the folder containing `index.html`.
6. Enable SSL via your hosting provider’s Let’s Encrypt or SSL installer.

## Important Notes

- **Formspree**: The contact form in `contact.html` uses Formspree. Replace `YOUR_FORM_ID` in the form’s `data-formspree` attribute with your actual Formspree form ID (you can create a free form at [formspree.io](https://formspree.io)).
- **Asset paths**: All assets (CSS, JS, images, videos) are referenced with relative paths (`css/`, `js/`, `assets/`, `videos/`). As long as the folder structure stays intact, the site will work anywhere.
- **Video size**: The hero video (`hero-video.mp4`) is ~22 MB. If your hosting has strict file‑size limits, consider hosting the video on a CDN (YouTube, Vimeo, or AWS CloudFront) and replace the `<source>` tag with the external URL.
- **Language selector**: The built‑in language switcher uses Google Translate widget (hidden by default). It works out‑of‑the‑box; no extra setup needed.
- **SEO**: The `<head>` already includes Open Graph tags, JSON‑LD organization schema, and meta descriptions. Verify your domain in Google Search Console after launch.

## Troubleshooting

- **404 on assets**: Double‑check that the folder names (`css`, `js`, `assets`, `videos`) match exactly (case‑sensitive on some Linux‑based hosts).
- **Video not playing**: Ensure the video file is present and the MIME type is served correctly (most servers serve `.mp4` as `video/mp4`).
- **Form not submitting**: Verify your Formspree ID is correct and that you have confirmed the email address in Formspree.

---

Your Sun Exports website is now ready to be shared with the world! 🌞
