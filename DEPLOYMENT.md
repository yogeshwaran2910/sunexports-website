# Sun Exports Website Deployment Guide

## Overview
This website is a static HTML/CSS/JavaScript site that can be deployed to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

## Files Structure
```
sun-exports-site/
├── index.html          # Homepage
├── about.html          # About Us
├── products.html       # Products overview
├── cocopeat.html       # Cocopeat product details
├── coir-fiber.html     # Coco husk chips product details
├── coir-yarn.html      # Cocopeat grow bags product details
├── coir-pith.html      # Coir pith/dust product details
├── quality.html        # Quality certifications
├── export-markets.html # Export markets information
├── contact.html        # Contact form
├── blog.html           # Blog index
├── blog/
│   ├── post1.html      # Sample blog post 1
│   └── post2.html      # Sample blog post 2
├── css/
│   └── styles.css      # Main stylesheet
├── js/
│   └── main.js         # JavaScript functionality
├── videos/
│   └── hero-video.mp4  # Hero background video
├── assets/
│   └── images/         # Images (logos, badges, etc.)
├── sitemap.xml         # XML sitemap for SEO
├── robots.txt          # Robots.txt for crawlers
└── DEPLOYMENT.md       # This file
```

## Deployment Instructions

### Option 1: Netlify (Recommended)
1. Push this folder to a Git repository (GitHub, GitLab, or Bitbucket)
2. Connect your repository to Netlify
3. Set build command to: `npm run build` (or leave blank for static site)
4. Set publish directory to: `/` (root of the repo)
5. Deploy!

### Option 2: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts

### Option 3: GitHub Pages
1. Push to a GitHub repository
2. Go to repository Settings → Pages
3. Select the `main` branch and `/` (root) folder
4. Save and wait for deployment

### Option 4: Manual FTP/SFTP
1. Upload all files to your web server's public directory
2. Ensure the directory structure is preserved

## Important Notes

### Form Handling
The contact forms use [Formspree](https://formspree.io/) for handling submissions. To activate:
1. Sign up at [formspree.io](https://formspree.io/)
2. Get your form ID
3. Replace `YOUR_FORM_ID` in the `data-formspree` attribute of each form with your actual Formspree ID
   - Found in: index.html, about.html, cocopeat.html, coir-fiber.html, coir-yarn.html, coir-pith.html, quality.html, export-markets.html, contact.html, blog.html, blog/post1.html, blog/post2.html

### Language Translation
The site uses Google Translate for multilingual support. The language selector in the navigation works out-of-the-box.

### Images and Assets
- The hero video is located at `videos/hero-video.mp4`
- Logo and badge images should be placed in `assets/images/`
- The favicon is embedded as SVG in the HTML head

### SEO
- `sitemap.xml` is included for search engine indexing
- `robots.txt` allows all crawling
- Meta tags are present on each page for title and description
- Open Graph tags are present on the homepage

## Customization

### Colors and Fonts
All design tokens are defined in `css/styles.css` at the top of the file:
- `--color-forest`: Primary dark green
- `--color-gold`: Accent gold
- `--color-cream`: Background off-white
- `--color-white`: Pure white
- `--font-display`: Cormorant Garamond (headings)
- `--font-body`: Outfit (body text)

### Adding More Blog Posts
1. Create a new HTML file in the `blog/` directory
2. Copy the structure from `post1.html` or `post2.html`
3. Update the title, meta description, and content
4. Add a link to the new post in `blog.html` (replace one of the existing sample links or add a new section)

## Testing Locally
To test the site locally:
1. Simply open any `.html` file in your browser
2. For full functionality (forms, translations), serve via a local web server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   ```

## Support
For any issues or questions, contact:
- Email: info@sunexports.co.in
- WhatsApp: +91 9578684630 or +91 9976480745