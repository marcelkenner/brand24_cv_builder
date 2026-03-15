# Style and conventions
- Follow `AGENTS.md` in repo root.
- Prefer smallest valid diffs, explicit interfaces, and repository evidence over generic patterns.
- For TypeScript, model invariants in types: readonly objects, narrow unions, discriminated unions over boolean bags, avoid `any`, avoid broad assertions.
- Keep files small: no file over 500 lines; split files when they approach 400 lines. Prefer small focused modules and components.
- Update docs for behavior changes and add tests for changed behavior.
- For Node/NPM shell commands, prefix with `source ~/.nvm/nvm.sh && ...`.
- Use Serena for repo understanding and Context7 for current library guidance when needed.