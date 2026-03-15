import { defineConfig } from "@playwright/test";

const port = 3101;

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 60_000,
  use: {
    baseURL: `http://127.0.0.1:${port}`,
  },
  webServer: {
    command: `bash -lc 'source ~/.nvm/nvm.sh && npm run build && PORT=${port} npm run start'`,
    port,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
