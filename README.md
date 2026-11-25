# Yakino — Coming soon

A responsive, accessible coming soon page with a custom animated SVG bloom. No external fonts, trackers, JavaScript bundles, or runtime dependencies.

## Local development

Requires Node.js 22 or later. Run `npm start` and open http://localhost:3000. Use `npm run dev` for automatic server restarts. Set `PORT` to change the default port.

## Coolify deployment

1. In your Coolify project and environment, add a **Public Repository** application (or use your GitHub App for a private repository).
2. Repository: `https://github.com/ilhaansiddique-coder/yakino_agency_portfolio`, branch: `main`.
3. Set **Build Pack** to **Dockerfile**, **Base Directory** to `/`, and **Dockerfile Location** to `/Dockerfile`.
4. Set **Ports Exposes** to `3000`. The app listens on `0.0.0.0:3000`. No host port mapping, install command, build command, or persistent volume is needed.
5. Set the domain to your intended HTTPS domain, and point its DNS A record at the Coolify server. You can use Coolify's generated domain for the first deployment.
6. If configuring a Coolify HTTP health check, use `GET /health`, port `3000`, expected status `200`. The Docker image also includes its own health check.
7. Click **Deploy**, wait for the container to become healthy, and visit the assigned domain. Enable automatic deployments with the Coolify GitHub integration or its generated webhook if desired.

For a private repository, connect a GitHub App or read-only deploy key through Coolify. Never commit GitHub or Coolify credentials.

## Container locally

```sh
docker build -t yakino-coming-soon .
docker run --rm -p 3000:3000 yakino-coming-soon
```

`/health` returns `200 ok`. Unknown paths return `404`, and unsupported HTTP methods return `405`.
