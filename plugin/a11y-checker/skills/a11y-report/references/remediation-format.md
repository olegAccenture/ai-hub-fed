# Remediation Guide Format — `a11y-{severity}-remediation.md`

Write the file in this exact order. Save after each numbered step.

## Step 1 — Header

```markdown
## Accessibility {Critical | Major | Enhancement} Remediation Report

**Website**: {URL}
**Test Date**: {date}
**Severity**: {Critical | Major | Enhancement}
**Total Issues**: {n}

---
```

## Step 2 — Issue List

For each issue at the specified severity (in the order they appear in `summary.json`):

```markdown
## {id} — {check}

- **WCAG**: {wcag}
- **Section**: {section}
- **Finding**: {detail}
- **Selector**: `{selector}`
```

## Zero-issues case

If there are no issues at the specified severity, write the header (Step 1) followed by:

```markdown
No {severity} issues found.
```

## Rules

- Do NOT include fix sections, code examples, acceptance criteria, or remediation instructions
- The report documents **findings only** — not solutions
- One file per severity level: `a11y-critical-remediation.md`, `a11y-major-remediation.md`, `a11y-enhancement-remediation.md`
- Issues are pre-sorted in `summary.json`: critical first, then major, then enhancement — preserve that order within each file
