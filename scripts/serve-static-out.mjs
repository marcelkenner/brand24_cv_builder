import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";

const defaultPort = 4173;
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp3": "audio/mpeg",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const args = process.argv.slice(2);
const rootDirectory = path.resolve(process.cwd(), args[0] ?? "out");
const port = resolvePort(args.slice(1));

const server = http.createServer(async (request, response) => {
  const requestPath = new URL(request.url ?? "/", "http://127.0.0.1").pathname;
  const filePath = await resolveFilePath(requestPath);

  if (!filePath) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  response.writeHead(200, {
    "content-type":
      contentTypes[path.extname(filePath)] ?? "application/octet-stream",
  });
  createReadStream(filePath).pipe(response);
});

server.listen(port, "127.0.0.1", () => {
  process.stdout.write(
    `Serving ${rootDirectory} at http://127.0.0.1:${port}\n`,
  );
});

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

async function resolveFilePath(requestPath) {
  const normalizedPath = path.normalize(decodeURIComponent(requestPath));
  const candidates = getCandidatePaths(normalizedPath);

  for (const candidate of candidates) {
    if (!candidate.startsWith(rootDirectory)) {
      continue;
    }

    if (await fileExists(candidate)) {
      return candidate;
    }
  }

  return null;
}

function getCandidatePaths(requestPath) {
  const absolutePath = path.join(rootDirectory, requestPath);

  return [
    absolutePath,
    `${absolutePath}.html`,
    path.join(absolutePath, "index.html"),
    path.join(rootDirectory, "404.html"),
  ];
}

async function fileExists(filePath) {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
}

function resolvePort(args) {
  const portFlagIndex = args.indexOf("--port");
  const rawPort =
    portFlagIndex >= 0 ? args[portFlagIndex + 1] : process.env.PORT ?? `${defaultPort}`;
  const parsedPort = Number.parseInt(rawPort ?? `${defaultPort}`, 10);

  return Number.isFinite(parsedPort) ? parsedPort : defaultPort;
}

function shutdown() {
  server.close(() => {
    process.exit(0);
  });
}
