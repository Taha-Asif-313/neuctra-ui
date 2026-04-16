# Publishing Guide - @neuctra/ui-cli

Quick reference for publishing the CLI to npm.

## 🚀 5-Minute Publish

### Step 1: Authenticate
```bash
npm login
npm whoami  # Verify success
```

### Step 2: Verify Package
```bash
npm pack --dry-run
```

Check output includes all files (bin/, lib/, templates/, README.md).

### Step 3: Update Version
```bash
# Choose one (semantic versioning):
npm version patch  # 0.1.0 → 0.1.1 (bug fix)
npm version minor  # 0.1.0 → 0.2.0 (new feature)
npm version major  # 0.1.0 → 1.0.0 (breaking change)
```

### Step 4: Push to Git
```bash
git push
git push --tags
```

### Step 5: Publish!
```bash
npm publish
```

### Step 6: Verify
```bash
npm view @neuctra/ui-cli
npm install -g @neuctra/ui-cli
neuctra-ui --version
```

**Done!** ✅

---

## ✅ Pre-Publish Checklist

- [ ] Code is committed: `git status` shows nothing to commit
- [ ] Latest changes: `git pull` shows "Already up to date"
- [ ] Authenticated: `npm whoami` returns your username
- [ ] Package verified: `npm pack --dry-run` looks good
- [ ] Version updated: `npm version [type]` completed
- [ ] Changes pushed: `git push && git push --tags` successful

---

## 📊 Current Status

| Item | Status |
|------|--------|
| package.json | ✅ Production ready |
| README.md | ✅ Complete |
| SEO Keywords | ✅ 20+ keywords |
| Metadata | ✅ Author, repo, bugs, funding |
| Node Engine | ✅ >=16.0.0 |
| npm Access | ✅ public |
| npm Account | ⏳ Create at npmjs.com |

---

## 🔗 Quick Links

- Create npm account: https://www.npmjs.com/signup
- npm login: https://www.npmjs.com/login
- Published package: https://www.npmjs.com/package/@neuctra/ui-cli
- GitHub repo: https://github.com/neuctra/ui

---

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| `npm login` fails | Create account at npmjs.com, verify email |
| `403 Forbidden` | Check `publishConfig.access: "public"` in package.json |
| Package already exists | Update version with `npm version patch` |
| `401 Unauthorized` | Run `npm login` again, verify with `npm whoami` |

---

**All set! Ready to publish whenever you want.** 🎉
