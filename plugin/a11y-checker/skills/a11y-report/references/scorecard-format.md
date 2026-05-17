# Scorecard Format — `a11y-report.md`

Write the file in this exact order. Save after each numbered step.

## Step 1 — Header

```markdown
## Accessibility Test Report

**Website**: {URL}
**Test Date**: {date}
**Tester**: Accessibility Agent
**Standards**: WCAG 2.2 Level AA, EN 301 549, RaWeb
**Component/Page**: {Page}

---
```

## Step 2 — Executive Summary

```markdown
## Executive Summary

**Overall Compliance**: {compliance}% ({passed} passed / {total} total criteria)
**Critical Issues**: {critical} (WCAG Level A violations)
**Major Issues**: {major} (WCAG Level AA violations)
**Enhancement Issues**: {enhancement} (Best practices and Level AAA)

**Priority Recommendations**:

1. {highest-impact issue}
2. {second issue}
3. {third issue}

---
```

Derive the top recommendations from the critical issues list in `summary.json`, ordered by frequency/impact.

## Step 3 — Overall Totals Table

```markdown
## Overall Totals

| Checks | Passed | Failed | Skipped | Compliance |
| ------ | ------ | ------ | ------- | ---------- |
| {n}    | {n}    | {n}    | {n}     | {x}%       |

**Issues by Severity**: Critical: {n} · Major: {n} · Enhancement: {n}

---
```

## Step 4 — Section Results Table

```markdown
## Results by Section

| Section   | Total   | Passed  | Failed  | Skipped | Critical | Major   | Enhancement | Compliance |
| --------- | ------- | ------- | ------- | ------- | -------- | ------- | ----------- | ---------- |
| {label}   | {n}     | {n}     | {n}     | {n}     | {n}      | {n}     | {n}         | {x}%       |
| ...       |         |         |         |         |          |         |             |            |
| **TOTAL** | **{n}** | **{n}** | **{n}** | **{n}** | **{n}**  | **{n}** | **{n}**     | **{x}%**   |
```

Section compliance = section.passed / (section.passed + section.failed) × 100%. If a section has no passed or failed checks (all skipped), write `N/A`.

## Rules

- Do NOT include individual issue IDs, selectors, or remediation text in the scorecard
- One row per section in the order they appear in `summary.json`
- Bold the TOTAL row
