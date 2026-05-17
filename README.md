# AI Hub FED — GitHub Copilot CLI Plugin Marketplace

A curated marketplace of GitHub Copilot CLI plugins for the FED team. Each plugin extends Copilot CLI with specialised agents, skills, and tools that integrate directly into your development workflow.

## How to register this marketplace

```sh
copilot plugin marketplace add olegAccenture/ai-hub-fed
```

Verify it was added:

```sh
copilot plugin marketplace list
```

Browse all available plugins:

```sh
copilot plugin marketplace browse ai-hub-fed
```

---

## Available Plugins

### `a11y-checker` — Accessibility Testing

Comprehensive accessibility testing plugin that runs **264 checks across 20 sections** against live web pages using a parallel phased architecture with Playwright Extension browser automation.

**Standards covered**: WCAG 2.2 (Level A / AA / AAA), EN 301 549, RaWeb

#### Install

```sh
copilot plugin install a11y-checker@ai-hub-fed
```

Or install directly from source:

```sh
copilot plugin install olegAccenture/ai-hub-fed:plugin/a11y-checker
```

#### Verify installation

```sh
copilot plugin list
```

#### Usage

Open a Copilot CLI session and run:

```
@a11y-checker check the App component at http://localhost:5173
```

The orchestrator will guide you through section selection and run all testing phases automatically.

#### Prerequisites

- Chrome / Edge / Chromium with the [Playwright Extension](https://chromewebstore.google.com/detail/playwright-extension/mmlmfjhmonkocbjadbfplnigmagldckm) installed
- Node.js (for `npx @playwright/mcp@latest`)

#### Uninstall

```sh
copilot plugin uninstall a11y-checker
```

---
