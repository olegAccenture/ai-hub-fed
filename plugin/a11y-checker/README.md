# a11y-checker — GitHub Copilot CLI Plugin

Comprehensive accessibility testing plugin that runs **WCAG 2.2 (A/AA/AAA)**, **EN 301 549**, and **RaWeb** compliance checks against live web pages and components using a parallel phased architecture with Playwright browser automation.

## What's included

```
plugin/a11y-checker/
├── plugin.json                          # Plugin manifest
├── agents/
│   ├── a11y-checker.agent.md            # Orchestrator — coordinates all phases
│   ├── a11y-batch.agent.md              # Static DOM analysis sub-agent
│   ├── a11y-interactive.agent.md        # Keyboard/form/widget testing sub-agent
│   └── a11y-report-writer.agent.md      # Report generation sub-agent
├── skills/
│   └── a11y-validation/
│       ├── SKILL.md                     # Skill definition and execution phases
│       ├── README.md
│       ├── references/                  # 20 WCAG check-list reference files
│       │   ├── aria-usage.md
│       │   ├── color-contrast.md
│       │   ├── consistent-predictable.md
│       │   ├── content-no-css.md
│       │   ├── custom-widgets.md
│       │   ├── error-prevention.md
│       │   ├── forms-input.md
│       │   ├── help-documentation.md
│       │   ├── html-validation.md
│       │   ├── images-alt-text.md
│       │   ├── keyboard-focus.md
│       │   ├── links-navigation.md
│       │   ├── mobile-touch.md
│       │   ├── motion-animation.md
│       │   ├── multimedia.md
│       │   ├── pdf-documents.md
│       │   ├── responsive-reflow.md
│       │   ├── status-feedback.md
│       │   ├── structure-semantics.md
│       │   └── tables-data.md
│       └── scripts/
│           ├── aggregate-sections.js    # Phase 3.5 aggregation script
│           ├── example-section.json
│           └── example-interactive-flow.json
└── skills/
    └── a11y-report/
        └── SKILL.md                     # Report format spec (scorecard + remediation guides)
```

## Installation

Install the plugin locally from this workspace:

```sh
copilot plugin install ./plugin/a11y-checker
```

Verify it loaded:

```sh
copilot plugin list
```

## Usage

Open a Copilot CLI session and invoke the `a11y-checker` agent:

```
@a11y-checker check the App component at http://localhost:5173
```

The orchestrator will:

1. **Phase 0** — Connect to the browser, navigate to the component URL, prompt you to select which of the 20 test sections to run
2. **Phase 1** — Launch two parallel static DOM batches (Batch A: structure/HTML/ARIA/images/tables; Batch B: color/motion/multimedia/CSS/links)
3. **Phase 2** — Run interactive tests sequentially (user flows, then keyboard/forms/widgets/errors)
4. **Phase 3** — Launch two parallel platform batches (Batch C: responsive/mobile/consistent; Batch D: help/PDF/status)
5. **Phase 3.5** — Aggregate section JSON files into `summary.json`
6. **Phase 4** — Generate four report files (scorecard + three severity remediation guides)

## Output files

All output is written to `./a11y-assessment/{Page}/{dd-mm-yyyy}/`:

| File                              | Description                                   |
| --------------------------------- | --------------------------------------------- |
| `session.json`                    | Run metadata, phase timing, selected sections |
| `sections/*.json`                 | Per-section compact results (intermediate)    |
| `summary.json`                    | Aggregated totals and issue list              |
| `a11y-report.md`                  | Scorecard with compliance % per section       |
| `a11y-critical-remediation.md`    | Critical (WCAG A) issues with fix guidance    |
| `a11y-major-remediation.md`       | Major (WCAG AA) issues with fix guidance      |
| `a11y-enhancement-remediation.md` | Enhancements and best practices               |

## Covered sections (264 checks across 20 sections)

| Section                        | Checks |
| ------------------------------ | ------ |
| Document Structure & Semantics | 21     |
| HTML Code Quality              | 20     |
| ARIA Usage & Implementation    | 26     |
| Images & Alternative Text      | 18     |
| Tables & Data                  | 8      |
| Color & Contrast               | 12     |
| Motion & Animation             | 10     |
| Multimedia & Media             | 13     |
| Content Without CSS            | 12     |
| Links & Navigation             | 15     |
| Keyboard Navigation & Focus    | 24     |
| Forms & Input Controls         | 23     |
| Custom Components & Widgets    | 29     |
| Error Prevention & Recovery    | 12     |
| Responsive & Reflow            | 22     |
| Mobile & Touch                 | 14     |
| Consistent Identification      | 10     |
| Help & Documentation           | 11     |
| PDF & Documents                | 15     |
| Status Messages & Feedback     | 10     |

## Updating the plugin

After modifying any file in this directory, reinstall to refresh the CLI cache:

```sh
copilot plugin install ./plugin/a11y-checker
```

## Uninstalling

```sh
copilot plugin uninstall a11y-checker
```
