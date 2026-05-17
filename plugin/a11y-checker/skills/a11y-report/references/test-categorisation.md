# Test Categorisation Rules

## Status Definitions

| Status  | Symbol | Meaning                                                                           |
| ------- | ------ | --------------------------------------------------------------------------------- |
| PASSED  | ✅     | Test executed — element/feature **meets** accessibility requirements              |
| FAILED  | ❌     | Test executed — element/feature does **NOT** meet accessibility requirements      |
| SKIPPED | ⊘      | Test could **NOT** be executed — required element/feature not present on the page |

## When to Mark PASSED

Mark a test as PASSED when the check was executed and the element/feature satisfies the requirement in full.

## When to Mark FAILED

Mark a test as FAILED when the check was executed and the element/feature violates the requirement. Always include:

- The specific DOM evidence (selector, attribute value, computed property)
- The user impact
- The WCAG criterion and level

## When to Mark SKIPPED

Mark a test as SKIPPED when the required element or interaction pattern is simply **not present** on the page — the check cannot be meaningfully executed. Common reasons:

| Scenario                    | Example reason                            |
| --------------------------- | ----------------------------------------- |
| Element type absent         | "No video players present on tested page" |
| Feature not implemented     | "No search functionality found"           |
| Interaction pattern missing | "No modal dialogs present"                |
| CSS/JS behaviour absent     | "No hover states defined in stylesheet"   |
| Document type absent        | "No PDF links found on page"              |

Never mark SKIPPED just because a test is hard to automate — only when the prerequisite element/context genuinely does not exist.

## Compliance Calculation

```
Overall Compliance = Passed / (Passed + Failed) × 100%
```

- **Skipped tests are excluded** from the compliance percentage
- Skipped count IS included in the "Total Tests" column to show complete coverage scope
- Per-section compliance uses the same formula applied to that section's counts
- If a section has only skipped checks (no passed or failed), compliance = `N/A`
