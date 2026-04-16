# @neuctra/ui-cli

[![npm version](https://img.shields.io/npm/v/@neuctra/ui-cli.svg?style=flat-square)](https://www.npmjs.com/package/@neuctra/ui-cli)
[![npm downloads](https://img.shields.io/npm/dm/@neuctra/ui-cli.svg?style=flat-square)](https://www.npmjs.com/package/@neuctra/ui-cli)
[![GitHub license](https://img.shields.io/github/license/neuctra/ui.svg?style=flat-square)](https://github.com/neuctra/ui/blob/main/LICENSE)
[![Node.js Version](https://img.shields.io/node/v/@neuctra/ui-cli.svg?style=flat-square)](https://nodejs.org/en/)

Official command-line interface for **Neuctra UI** - a modern, accessible React component library with automatic theme setup and dark mode support.

## 🎯 Features

- ⚡ **One-Command Setup** - Initialize Neuctra UI in seconds
- 🎨 **Automatic Theme Configuration** - CSS variables, light/dark modes, Tailwind integration
- 🌙 **Dark Mode Support** - System preference detection with localStorage persistence
- 📦 **Zero Configuration** - Works with Vite, Create React App, and other build tools
- 🔧 **Auto-Wrapping** - Automatically wraps your entry point with ThemeProvider
- 📱 **TypeScript Ready** - Full support for .tsx projects
- ♿ **Accessible** - WCAG compliant components and theme switching
- 🚀 **Production Ready** - Used in production by Neuctra

## 📦 Installation

### Global Installation

```bash
npm install -g @neuctra/ui-cli
```

Then use anywhere:
```bash
neuctra-ui init
```

### Local Installation

```bash
npm install --save-dev @neuctra/ui-cli
```

Then use with npx:
```bash
npx neuctra-ui init
```

## 🚀 Quick Start

In your React project directory:

```bash
neuctra-ui init
```

This automatically:

1. **Installs @neuctra/ui** package
2. **Configures your CSS** with theme tokens:
   - CSS custom properties (--primary, --background, etc.)
   - Light and dark theme support
   - Tailwind v4 @theme integration
3. **Creates ThemeContext** at `src/contexts/ThemeContext.jsx`
4. **Wraps entry point** with `<ThemeProvider>`
5. **Enables dark mode** with system preference detection

### Result

Your app now has:
- ✅ Neuctra UI components imported and ready
- ✅ Automatic theme switching
- ✅ Persistent theme preference
- ✅ System dark mode support

## 💻 Commands

### Initialize Project

```bash
neuctra-ui init
```

Sets up Neuctra UI in your current project.

### Show Help

```bash
neuctra-ui -h
neuctra-ui --help
```

### Show Version

```bash
neuctra-ui -v
neuctra-ui --version
```

## 🎨 Using Neuctra UI Components

After initialization, import components:

```jsx
import { Button, Input, Card, Modal, Tabs } from '@neuctra/ui';

export function App() {
  return (
    <div className="p-4">
      <Button variant="primary">Click me</Button>
      <Input placeholder="Enter text..." />
      <Card>Card content</Card>
    </div>
  );
}
```

## 🌓 Theme Control

Use the `useTheme()` hook in any component:

```jsx
import { useTheme } from './contexts/ThemeContext';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="p-2 rounded bg-muted">
      {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}
```

### Theme API

```js
const { isDark, toggleTheme, setTheme } = useTheme();

// isDark: boolean - Current theme state
// toggleTheme: () => void - Switch between light/dark
// setTheme: (theme: 'light' | 'dark') => void - Set specific theme
```

## 📋 CSS Theme Tokens

After initialization, your CSS includes:

### Light Theme (`:root`)
```css
--primary: #00c214;
--primary-foreground: #ffffff;
--background: #ffffff;
--foreground: #0f172a;
--muted: #f1f5f9;
--border: #e2e8f0;
--input: #e2e8f0;
--destructive: #ef4444;
```

### Dark Theme (`.dark` class)
```css
--primary: #00c214;
--background: #0a0a0a;
--foreground: #ffffff;
--muted: #1f2937;
--border: #1f2937;
--input: #1f2937;
```

All tokens automatically apply to your UI through Tailwind CSS.

## 🛠️ Project Requirements

- **Node.js** >= 16.0.0
- **React** >= 16.8.0 (hooks required)
- **Tailwind CSS** >= 3.0 (v4 recommended)
- **Vite**, **Create React App**, or equivalent build tool

## ❓ Troubleshooting

### "No CSS file found"

**Solution:** Create a CSS file in one of these locations:
- `src/index.css`
- `src/app.css`
- `app/globals.css`
- `index.css`

Then run `neuctra-ui init` again.

### "Entry file not auto-wrapped"

**Solution:** Manually wrap your App with ThemeProvider:

```jsx
// src/main.jsx
import { ThemeProvider } from './contexts/ThemeContext';
import App from './App';

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
```

### "Theme not applying"

**Solution:** Verify:
1. CSS file is imported in entry point
2. Tailwind CSS is configured
3. App is wrapped with `<ThemeProvider>`
4. Browser cache is cleared

## 📱 Supported Environments

| Platform | Support | Notes |
|----------|---------|-------|
| Node 16+ | ✅ Full | LTS versions recommended |
| Node 18+ | ✅ Optimized | Latest stable |
| npm 7+ | ✅ Supported | |
| pnpm | ✅ Compatible | |
| yarn | ✅ Compatible | |
| Windows | ✅ Full | All features work |
| macOS | ✅ Full | All features work |
| Linux | ✅ Full | All features work |

## 📦 Package Size

- **Unpacked:** ~50 KB
- **Gzipped:** ~12 KB
- **Dependencies:** 1 (fs-extra)

## 🔄 Update CLI

```bash
# Global
npm update -g @neuctra/ui-cli

# Local
npm update @neuctra/ui-cli
```

## 🚀 Publishing to npm (For Maintainers)

### Prerequisites

1. Create npm account at [npmjs.com](https://www.npmjs.com/signup)
2. Authenticate locally:
   ```bash
   npm login
   npm whoami  # Verify
   ```

### Publish Steps

```bash
# 1. Verify package contents
npm pack --dry-run

# 2. Update version (semantic versioning)
npm version patch  # 0.1.0 → 0.1.1 (bugfix)
npm version minor  # 0.1.0 → 0.2.0 (feature)
npm version major  # 0.1.0 → 1.0.0 (breaking)

# 3. Push to Git
git push
git push --tags

# 4. Publish!
npm publish

# 5. Verify
npm view @neuctra/ui-cli
```

### Post-Publish Verification

```bash
# Install globally to test
npm install -g @neuctra/ui-cli

# Test the command
neuctra-ui --version
neuctra-ui init

# Check on npm
npm info @neuctra/ui-cli
```

## 🐛 Bug Reports & Features

Found a bug? Have a feature request?

- **GitHub Issues:** https://github.com/neuctra/ui/issues
- **Bug Report:** https://github.com/neuctra/ui/issues/new?template=bug_report.md
- **Feature Request:** https://github.com/neuctra/ui/issues/new?template=feature_request.md

## 📚 Documentation

- [Neuctra UI Docs](https://neuctra.dev)
- [GitHub Repository](https://github.com/neuctra/ui)
- [Component Library](https://www.npmjs.com/package/@neuctra/ui)
- [Issue Tracker](https://github.com/neuctra/ui/issues)

## 🤝 Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature/my-feature`
5. Submit a pull request

For major changes, please open an issue first to discuss.

## 📄 License

MIT © 2024 Neuctra. See [LICENSE](LICENSE) for details.

## 🙏 Changelog

### v0.1.0 (Initial Release)

- ✨ Automatic project initialization
- ✨ CSS theme configuration with Tailwind integration
- ✨ ThemeContext generation with dark mode support
- ✨ Entry point auto-wrapping with ThemeProvider
- ✨ System dark mode preference detection
- ✨ localStorage persistence for theme preference
- ✨ Support for Vite, Create React App, and other build tools

## 💬 Support

- 📧 **Email:** support@neuctra.dev
- 🌐 **Website:** [neuctra.dev](https://www.neuctra.com)
---

**Made with ❤️ by Neuctra**

**Ready to start?** Run `neuctra-ui init` in your React project! 🚀
