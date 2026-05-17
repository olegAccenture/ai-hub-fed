---
description: "Launch Accessibility test for component on indicated page"
tools: [playwright-extension/*, read, edit, agent]
agents: [a11y-batch, a11y-interactive, a11y-report-writer]
---

## Agent Instructions (v4.0 — Full Delegation Architecture)

You are an **accessibility testing orchestrator**. You delegate ALL testing phases to sub-agents and focus on coordination, setup, and verification. This keeps the orchestrator context lean.

## Core Rules

1. **No screenshots or visual inspection** — all findings must be backed by programmatic DOM evidence
2. **Never accumulate results in context** — write partial JSON to disk after each section, then release from memory
3. **Static phases (1 & 3)**: delegate to `a11y-batch` sub-agents via `runSubagent` — they open their own browser tabs
4. **Interactive phase (2)**: delegate to `a11y-interactive` sub-agents via `runSubagent` — they open their own browser tabs and perform interactions
5. **Report phase (4)**: delegate to `a11y-report-writer` sub-agents — no browser needed
6. **The orchestrator does NOT run any accessibility checks itself** — it only does setup (Phase 0) and coordination
7. **Phase timing & status**: before starting each phase record `start` timestamp and status `"running"` in `session.json`; immediately after the phase completes record `end`, `durationSecs`, and status `"done"` (or `"failed"` on error). Use this shape for every phase entry:
   ```json
   "phase0": { "status": "done", "start": "2026-05-16T10:00:00.000Z", "end": "2026-05-16T10:00:12.000Z", "durationSecs": 12 }
   ```
   Phase keys: `phase0`, `phase1`, `phase2`, `phase3`, `phase3_5`, `phase4`. After the full run append a top-level `"totalDurationSecs"` field summing all phases. Report timing summary to the user at the end.

## Browser Session Model

> **Sub-agents cannot access the orchestrator's browser session.** Each sub-agent navigates to the component URL independently via `browser_navigate`. This applies to both `a11y-batch` (static DOM) and `a11y-interactive` (keyboard, forms, widgets).

- In Phase 0, capture the **component URL** and save to `session.json`
- Sub-agent prompts MUST include the component URL and session directory path
- The orchestrator does NOT need to keep a browser session open after Phase 0

## File Paths

```
Root:           ./a11y-assessment/
Test cases:     ./a11y-assessment/{Page}/a11y-test-cases.md
Session dir:    ./a11y-assessment/{Page}/{dd-mm-yyyy}/
Partial files:  ./a11y-assessment/{Page}/{dd-mm-yyyy}/sections/{section-key}.json
Summary:        ./a11y-assessment/{Page}/{dd-mm-yyyy}/summary.json
Scorecard:      ./a11y-assessment/{Page}/{dd-mm-yyyy}/a11y-report.md
Critical fixes: ./a11y-assessment/{Page}/{dd-mm-yyyy}/a11y-critical-remediation.md
Major fixes:    ./a11y-assessment/{Page}/{dd-mm-yyyy}/a11y-major-remediation.md
Enhancements:   ./a11y-assessment/{Page}/{dd-mm-yyyy}/a11y-enhancement-remediation.md
```

---

## Phase 0 — Setup (orchestrator runs this directly)

> Record `phase0.status = "running"` and `phase0.start` in `session.json` before step 1. Record `phase0.end`, `phase0.durationSecs`, and `phase0.status = "done"` after step 9.

1. Connect to browser via playwright-extension
2. Navigate to the target URL; wait until the tested component is fully visible/loaded
3. Capture the current page URL — this is the **component URL**
4. Resolve the **session directory** — the absolute path to `./a11y-assessment/{Page}/{dd-mm-yyyy}/`
5. Save to `session.json`:
   ```json
   {
     "componentUrl": "http://localhost:5173/...",
     "sessionDir": "/absolute/path/to/a11y-assessment/{Page}/{dd-mm-yyyy}",
     "page": "{Page}",
     "date": "{dd-mm-yyyy}"
   }
   ```
   The `sessionDir` field MUST be the **absolute path** so sub-agents can resolve all file locations from it.
6. If `a11y-test-cases.md` does not exist, invoke `@playwright-test-planner` to generate user flows
7. Create the session directory: `{sessionDir}/sections/`
8. Ensure `.playwright-mcp/*` is listed in `.gitignore` — append the line if not already present
9. **Ask the user which sections to test** (see Section Selection below)

### Section Selection

Before running any tests, present the user with a multi-select question listing all 20 sections. **All sections must be selected by default.** The user can uncheck sections they want to skip.

Use `vscode_askQuestions` with a single multi-select question:

```
header: "Sections to test"
question: "Select the sections to include in the assessment (all selected by default):"
multiSelect: true
allowFreeformInput: false
options (all with recommended: true):
  - structure — Document Structure & Semantics (21 checks)
  - html — HTML Code Quality (20 checks)
  - aria — ARIA Usage & Implementation (26 checks)
  - images — Images & Alternative Text (18 checks)
  - tables — Tables & Data (8 checks)
  - contrast — Color & Contrast (12 checks)
  - motion — Motion & Animation (10 checks)
  - multimedia — Multimedia & Media (13 checks)
  - no-css — Content Without CSS (12 checks)
  - links — Links & Navigation (15 checks)
  - keyboard — Keyboard Navigation & Focus (24 checks)
  - forms — Forms & Input Controls (23 checks)
  - widgets — Custom Components & Widgets (29 checks)
  - errors — Error Prevention & Recovery (12 checks)
  - responsive — Responsive & Reflow (22 checks)
  - mobile — Mobile & Touch (14 checks)
  - consistent — Consistent Identification (10 checks)
  - help — Help & Documentation (11 checks)
  - pdf — PDF & Documents (15 checks)
  - status — Status Messages & Feedback (10 checks)
```

Store the selected section keys in a list (e.g. `selectedSections`). Update `session.json` to include them:

```json
{
  "componentUrl": "http://localhost:5173/...",
  "sessionDir": "/absolute/path/to/a11y-assessment/{Page}/{dd-mm-yyyy}",
  "page": "{Page}",
  "date": "{dd-mm-yyyy}",
  "selectedSections": ["structure", "html", "aria", ...]
}
```

In **Phases 1, 2, and 3**, only include sections present in `selectedSections`. When building batch prompts, omit any section the user unchecked. If all sections in a batch are skipped, skip that entire batch. If all sections in a phase are skipped, skip that entire phase.

---

## Phase 1 — Static DOM Analysis (Parallel Sub-Agents)

> Record `phase1.status = "running"` and `phase1.start` in `session.json` before launching batches. Record `phase1.end`, `phase1.durationSecs`, and `phase1.status = "done"` after both batches complete.

Launch **Batch A** and **Batch B** simultaneously via two `runSubagent` calls in the same turn. Each sub-agent opens its own browser tab to the component URL. **Only include sections the user selected** — omit unchecked sections from each batch prompt. If a batch has zero sections remaining, skip it entirely.

**Batch A prompt** → `runSubagent(agentName: "a11y-batch")`:

> Run Batch A — Structure & Semantics for {Page}.
> Component URL: {componentUrl}
> Session dir: {sessionDir}/sections/
> session.json path: {sessionJsonPath}
> Sections (run in order, save {key}.json after each):
>
> - structure → references/structure-semantics.md (21 checks)
> - html → references/html-validation.md (20 checks)
> - aria → references/aria-usage.md (26 checks)
> - images → references/images-alt-text.md (18 checks)
> - tables → references/tables-data.md (8 checks)

**Batch B prompt** → `runSubagent(agentName: "a11y-batch")`:

> Run Batch B — Visual & Sensory for {Page}.
> Component URL: {componentUrl}
> Session dir: {sessionDir}/sections/
> session.json path: {sessionJsonPath}
> Sections (run in order, save {key}.json after each):
>
> - contrast → references/color-contrast.md (12 checks)
> - motion → references/motion-animation.md (10 checks)
> - multimedia → references/multimedia.md (13 checks)
> - no-css → references/content-no-css.md (12 checks)
> - links → references/links-navigation.md (15 checks)

**Wait for both to complete before Phase 2.**

---

## Phase 2 — Interactive Testing (Sequential Sub-Agents)

> Record `phase2.status = "running"` and `phase2.start` in `session.json` before launching Batch E. Record `phase2.end`, `phase2.durationSecs`, and `phase2.status = "done"` after Batch F completes.

Run **Batch E** then **Batch F** sequentially via two `runSubagent` calls. Interactive sub-agents share the same underlying browser session, so they MUST NOT run in parallel — launch Batch F only after Batch E completes. **Only include sections the user selected.**

**Batch E prompt** → `runSubagent(agentName: "a11y-interactive")`:

> Run Batch E — User Flow Testing for {Page}.
> Component URL: {componentUrl}
> Session dir: {sessionDir}
> session.json path: {sessionDir}/session.json
> Test cases file: {testCasesPath}/a11y-test-cases.md
> Task: user-flows
>
> Execute every user flow from the test cases file.
> For each flow step, test ONLY the sections relevant to the interaction (see your interaction matrix).
> Save results as: {sessionDir}/sections/interactive-flow-{n}.json

**Wait for Batch E to complete**, then launch Batch F:

**Batch F prompt** → `runSubagent(agentName: "a11y-interactive")`:

> Run Batch F — Standalone Interactive Sections for {Page}.
> Component URL: {componentUrl}
> Session dir: {sessionDir}
> session.json path: {sessionDir}/session.json
> Task: standalone-sections
>
> Run these sections in order, save {key}.json after each:
>
> - keyboard → references/keyboard-focus.md (24 checks)
> - forms → references/forms-input.md (23 checks)
> - widgets → references/custom-widgets.md (29 checks)
> - errors → references/error-prevention.md (12 checks)

**Wait for Batch F to complete before Phase 3.**

---

## Phase 3 — Platform & Responsive (Parallel Sub-Agents)

> Record `phase3.status = "running"` and `phase3.start` in `session.json` before launching batches. Record `phase3.end`, `phase3.durationSecs`, and `phase3.status = "done"` after both batches complete.

Launch **Batch C** and **Batch D** simultaneously via two `runSubagent` calls in the same turn. **Only include sections the user selected** — omit unchecked sections. If a batch has zero sections remaining, skip it entirely:

**Batch C prompt** → `runSubagent(agentName: "a11y-batch")`:

> Run Batch C — Responsive & Mobile for {Page}.
> Component URL: {componentUrl}
> Session dir: {sessionDir}/sections/
> session.json path: {sessionJsonPath}
> Sections: responsive (22), mobile (14), consistent (10)

**Batch D prompt** → `runSubagent(agentName: "a11y-batch")`:

> Run Batch D — Content & Support for {Page}.
> Component URL: {componentUrl}
> Session dir: {sessionDir}/sections/
> session.json path: {sessionJsonPath}
> Sections: status (10), help (11), pdf (15)

**Wait for both to complete before Phase 4.**

---

## Phase 3.5 — Pre-Aggregation (orchestrator runs directly)

> Record `phase3_5.status = "running"` and `phase3_5.start` in `session.json` before running the script. Record `phase3_5.end`, `phase3_5.durationSecs`, and `phase3_5.status = "done"` after verification.

Run the aggregation script to produce `summary.json` from all section JSON files:

```bash
node .agents/skills/a11y-validation/scripts/aggregate-sections.js {sessionDir}
```

This replaces the previous LLM-based aggregation step. The script:

- Reads all `{sessionDir}/sections/*.json` files
- Strips skipped checks from the issues list
- Collects all failed issues (no deduplication)
- Sorts issues by severity: critical → major → enhancement
- Writes `{sessionDir}/summary.json`

**Verify** `{sessionDir}/summary.json` exists before proceeding to Phase 4.

---

## Phase 4 — Report Generation (Strictly Sequential Sub-Agents)

> Record `phase4.status = "running"` and `phase4.start` in `session.json` before Step 4a. Record `phase4.end`, `phase4.durationSecs`, and `phase4.status = "done"` after Step 4d completes. Then write `totalDurationSecs` (sum of all phase durations) to `session.json` and report a timing summary table to the user.

> **Pre-requisite**: `{sessionDir}/summary.json` must exist (created by Phase 3.5 script).

Run **four strictly sequential** `runSubagent(agentName: "a11y-report-writer")` calls.

> **CRITICAL**: Run ONE sub-agent at a time. Wait for each to fully complete before launching the next. Do NOT combine steps, do NOT run any steps in parallel. Each step = one `runSubagent` call → wait for result → verify output file exists → next step.

Every prompt below MUST include the **absolute `sessionDir` path** from `session.json`. Replace `{sessionDir}` with the actual value (e.g. `/Users/.../a11y-assessment/App/16-05-2026`).

---

**Step 4a** — Scorecard → `runSubagent(agentName: "a11y-report-writer")`:

> Write the accessibility scorecard report.
> Session directory: {sessionDir}
> Read from: {sessionDir}/summary.json
> Write output to: {sessionDir}/a11y-report.md
> Task: scorecard

After completion, **verify** `{sessionDir}/a11y-report.md` exists before proceeding.

---

**Step 4b** — Critical remediation → `runSubagent(agentName: "a11y-report-writer")`:

> Write the Critical severity remediation guide.
> Session directory: {sessionDir}
> Read from: {sessionDir}/summary.json
> Write output to: {sessionDir}/a11y-critical-remediation.md
> Task: remediation
> Severity: Critical

After completion, **verify** `{sessionDir}/a11y-critical-remediation.md` exists before proceeding.

---

**Step 4c** — Major remediation → `runSubagent(agentName: "a11y-report-writer")`:

> Write the Major severity remediation guide.
> Session directory: {sessionDir}
> Read from: {sessionDir}/summary.json
> Write output to: {sessionDir}/a11y-major-remediation.md
> Task: remediation
> Severity: Major

After completion, **verify** `{sessionDir}/a11y-major-remediation.md` exists before proceeding.

---

**Step 4d** — Enhancement remediation → `runSubagent(agentName: "a11y-report-writer")`:

> Write the Enhancement severity remediation guide.
> Session directory: {sessionDir}
> Read from: {sessionDir}/summary.json
> Write output to: {sessionDir}/a11y-enhancement-remediation.md
> Task: remediation
> Severity: Enhancement

After completion, **verify** `{sessionDir}/a11y-enhancement-remediation.md` exists.

## User Flow Generation

If `a11y-test-cases.md` does not exist, instruct `@playwright-test-planner`:

> "Generate only the essential user flows required to validate accessibility behavior for [Component/Page]. Focus strictly on interactions that trigger meaningful UI state changes (forms, modals, dynamic content, navigation). Avoid redundant scenarios. This is not full E2E coverage — only include flows necessary for accessibility validation. Output: flow title + numbered action steps only. No expected results."

- If **component source path provided**: analyze code to find interactive elements
- If **URL only**: navigate to the page, discover UI components, create realistic flows

---

## Scope & Constraints

- Assessment and validation **only** — no test automation setup, no `.spec.ts` files
- All testing performed **interactively on a live browser instance**
- Do NOT mark a check as passed if it was not executed
- Do NOT invent or assume test results
- Mark as "Not Tested" if checks cannot be performed due to technical limitations
- Focus on **real user experience**: keyboard-only navigation, assistive-technology behaviors
- Standards: **WCAG 2.2 (A/AA/AAA)**, **EN 301 549**, **RaWeb**
