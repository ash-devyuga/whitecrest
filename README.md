# WhiteCrest Immigration — Website

A static, single-page website for WhiteCrest Immigration, a Canadian immigration consultancy.

## Stack

- Plain HTML, CSS, and JavaScript
- Google Fonts (Inter + Playfair Display)
- Phosphor Icons (lightweight icon set)
- No build step required

## Local Development

Open `index.html` directly in a browser, or use any local server:

```bash
# Option 1 — Python
python3 -m http.server 8000

# Option 2 — Node (npx)
npx serve .

# Option 3 — VS Code
# Install the "Live Server" extension and click "Go Live"
```

Then visit `http://localhost:8000` (or the port shown).

## Deploy to GitHub Pages

### Option A — Deploy from a branch

1. Push this folder to a GitHub repository (e.g., `whitecrest`).
2. Go to **Settings → Pages**.
3. Under **Source**, select the branch (e.g., `main`) and folder (`/ (root)`).
4. Click **Save**. The site will be live at `https://<username>.github.io/whitecrest/` within a few minutes.

### Option B — Deploy with GitHub Actions (recommended)

1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages → Source** and select **GitHub Actions**.
3. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - id: deployment
        uses: actions/deploy-pages@v4
```

4. Push the workflow file. The site deploys automatically on every push to `main`.

### Custom Domain

1. In **Settings → Pages**, enter your custom domain.
2. Add a CNAME DNS record pointing to `<username>.github.io`.
3. Optionally create a `CNAME` file in the repo root with your domain name.

## Customization

- **Colors & fonts**: Edit CSS custom properties in `:root` at the top of `styles.css`.
- **Content**: Edit text directly in `index.html`.
- **Contact form**: The form is UI-only. To make it functional, integrate with Formspree, Netlify Forms, or a similar service.
- **Images**: Replace the placeholder visuals in the About section and Hero with real photography.
