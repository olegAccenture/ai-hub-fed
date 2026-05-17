---
name: a11y-report
description: Report format specification for accessibility assessment reports. Defines the exact markdown structure, tables, and pass/fail/skipped categorisation rules for a11y-report.md and remediation guides.
---

# Accessibility Report Skill

Use this skill when writing accessibility assessment reports from `summary.json` data.

## References

Load the relevant reference file before writing each output:

| Task                                        | Reference file                       |
| ------------------------------------------- | ------------------------------------ |
| Writing `a11y-report.md` (scorecard)        | `references/scorecard-format.md`     |
| Writing `a11y-*-remediation.md` files       | `references/remediation-format.md`   |
| Applying PASSED / FAILED / SKIPPED status   | `references/test-categorisation.md`  |
| Formatting individual section result blocks | `references/section-block-format.md` |

## Workflow

1. Read `{sessionDir}/summary.json` — this is the **only** data source
2. Load the relevant reference file(s) for the output you are writing
3. Write the output file following the reference exactly
4. Do NOT invent findings, add fix guidance, or include data not present in `summary.json`
