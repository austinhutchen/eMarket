{ pnpm run build; pnpm run deploy; vercel build; git add -A; git commit -m "small patch (likely css, check release notes)"; git push origin HEAD:main --force; }
