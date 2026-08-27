# Project Directives

## Vercel Deployment & Domain Policy
- Whenever deploying to Vercel, **ALWAYS** generate and assign a `*.hakili.online` (or `hakili.online`) domain alias rather than relying on default `.vercel.app` URLs.
- Run:
  1. `npx vercel domains add <project-name>.hakili.online <project-name>`
  2. `npx vercel alias set <deployment-url> <project-name>.hakili.online`
- Present `https://<project-name>.hakili.online` as the primary live link to the user.
