export const cvInstallCommands = {
  development: "source ~/.nvm/nvm.sh && npm run dev",
  playwrightChromium: "source ~/.nvm/nvm.sh && npx playwright install chromium",
} as const;
