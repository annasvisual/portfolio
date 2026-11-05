# Anna Kovtun — portfolio

A custom, responsive, buildless portfolio. HTML, CSS and a small contact configuration script. No framework, package installation or build step required.

## Preview
Open `index.html` in a browser. For a local server, run `python3 -m http.server 8000` from this folder and visit http://localhost:8000.

## Before sharing
1. Set your email, full LinkedIn URL and CV path in `script.js`. Empty entries are hidden, and a clear “coming soon” message is shown until a contact is configured.
2. Add your real CV PDF to `assets/` and set `cv` to `assets/anna-kovtun-cv.pdf`. No invented CV or contact details are included.
3. Review the project copy in `index.html`. It is based only on the supplied project descriptions. Problem statements provide editorial framing; they should be checked against your experience. Outcomes deliberately avoid unsupported business impact, launch claims and metrics. Add verified results, dates, links or supporting evidence when available.
4. The project panels are typographic illustrations, not product screenshots or official brand identities.

## GitHub Pages
Upload the contents of this folder to your repository, keeping `index.html` at the repository root. In the repository, choose **Settings → Pages → Deploy from a branch → main → / (root)** and save. Alternatively, put these files in `/docs` and choose that folder. Relative asset paths support project repositories as well as a user site. No custom domain or build workflow is needed.

## Editing
- Content and case studies: `index.html` (native `<details>` work without JavaScript).
- Layout, colors, typography and responsive rules: `styles.css`.
- Contact links: `script.js`.
- Icon and CV: `assets/`.

Google Fonts supplies DM Sans and Manrope; system fonts are used when offline. No tracking, cookies or analytics are included. Keyboard focus, skip navigation, reduced motion and mobile layouts are supported.
