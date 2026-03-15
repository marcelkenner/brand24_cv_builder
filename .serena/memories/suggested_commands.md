# Suggested commands
Run from `/home/marcel/src/cv-builder`.

- Install deps: `source ~/.nvm/nvm.sh && npm install`
- Start dev server: `source ~/.nvm/nvm.sh && npm run dev`
- Lint: `source ~/.nvm/nvm.sh && npm run lint`
- Production build: `source ~/.nvm/nvm.sh && npm run build`
- Start production server: `source ~/.nvm/nvm.sh && npm run start`
- Install Chromium for Playwright PDF work: `source ~/.nvm/nvm.sh && npx playwright install chromium`
- Optional hermetic browser install: `source ~/.nvm/nvm.sh && PLAYWRIGHT_BROWSERS_PATH=0 npx playwright install chromium`
- Useful Linux commands: `git status --short`, `find src -maxdepth 3 -type f | sort`, `sed -n '1,200p' <file>`, `rg <pattern> <path>`.