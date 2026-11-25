import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

const port = Number(process.env.PORT || 3000);
const files = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['index.html', 'text/html; charset=utf-8']],
  ['/favicon.svg', ['favicon.svg', 'image/svg+xml']],
  ['/robots.txt', ['robots.txt', 'text/plain; charset=utf-8']],
]);

const server = createServer(async (request, response) => {
  const path = new URL(request.url, 'http://localhost').pathname;
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    return response.end();
  }
  if (path === '/health') {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    return response.end(request.method === 'HEAD' ? undefined : 'ok');
  }
  const file = files.get(path);
  if (!file) {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    return response.end(request.method === 'HEAD' ? undefined : 'Not found');
  }
  try {
    const body = await readFile(new URL(`./public/${file[0]}`, import.meta.url));
    response.writeHead(200, {
      'Content-Type': file[1],
      'Content-Length': body.length,
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Content-Security-Policy': "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; script-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'none'",
    });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch (error) {
    console.error('Unable to serve page:', error.message);
    response.writeHead(500);
    response.end();
  }
});

server.listen(port, '0.0.0.0', () => console.log(`Yakino is ready at http://localhost:${port}`));
for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
