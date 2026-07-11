# portfolio

Static portfolio website for Lakanapohn Sinparu. The site is built as plain HTML and CSS, with a small amount of vanilla JavaScript for the thesis slideshow and optional Cloudinary image delivery.

## Page structure

The current site keeps its pages at the repository root for GitHub Pages compatibility:

- `index.html` — homepage and work overview
- `about.html` — biography and background
- `contact.html` — contact information
- `art-work.html` — art work placeholder page
- `cartographic-design.html` — cartographic design project page
- `landscape-work.html` — landscape architecture work category
- `msc-work.html` — geoinformatics work category
- `spatial-analysis.html` — spatial analysis placeholder page
- `thesis.html` — thesis project slideshow
- `style.css` — shared site styles

## Local preview

No build step, Node.js, bundler, server-side code, database, or CMS is required. Preview the site with any static file server, for example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/` in a browser.

## GitHub Pages deployment

Because all HTML pages are root-relative to this repository and use relative links such as `about.html`, the site can be hosted from a standard GitHub Pages repository URL without server-side routing.

## Cloudinary image migration

Local `src` paths remain in the HTML as fallbacks until each image has been uploaded and tested in Cloudinary. The optional Cloudinary enhancement is configured in:

- `assets/js/cloudinary-config.js`
- `assets/js/cloudinary.js`

To migrate an image:

1. Upload the image to Cloudinary.
2. Set `cloudName` in `assets/js/cloudinary-config.js` to the public Cloudinary cloud name.
3. Add the matching public ID to the relevant image as `data-cloudinary-public-id="portfolio/folder/image-name"`.
4. Keep the original local `src` in place until the Cloudinary URL and responsive `srcset` have been tested.
5. Remove large local image files only after the Cloudinary URLs are confirmed working and after that removal is reviewed separately.

Never commit an API secret, `CLOUDINARY_URL`, upload credential, authentication signature, private token, or other private Cloudinary credential. This static site only needs public delivery configuration.

## Cloudinary configuration checklist

- [ ] Replace `REPLACE_WITH_CLOUD_NAME` in `assets/js/cloudinary-config.js`.
- [ ] Upload each image listed in `CLOUDINARY_MIGRATION.md`.
- [ ] Fill each HTML `data-cloudinary-public-id` with the tested public ID.
- [ ] Confirm the local fallback `src` still works until local files are intentionally removed later.
- [ ] Confirm no secrets or private tokens have been committed.
