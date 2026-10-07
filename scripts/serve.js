// Minimal static server for the exported site (out/), used by the Playwright tests.
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const ROOT = path.join(__dirname, "..", "out");
const PORT = Number(process.env.PORT ?? 4173);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

// A path that escapes out/ (or a malformed escape) must not reach the filesystem.
function resolve(pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null;
  }

  const file = path.resolve(ROOT, decoded.replace(/^\/+/, ""));
  return file === ROOT || file.startsWith(ROOT + path.sep) ? file : null;
}

function send(res, file) {
  res.writeHead(200, { "Content-Type": TYPES[path.extname(file).toLowerCase()] ?? "application/octet-stream" });

  const stream = fs.createReadStream(file);
  stream.on("error", () => res.writeHead(500).end("Server error"));
  stream.pipe(res);
}

http
  .createServer((req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const file = resolve(url.pathname);
    if (!file) return res.writeHead(400).end("Bad request");

    const target = path.extname(file) ? file : path.join(file, "index.html");
    if (!fs.existsSync(target)) return res.writeHead(404).end("Not found");

    send(res, target);
  })
  .listen(PORT, () => console.log(`serving ${ROOT} on http://localhost:${PORT}`));
