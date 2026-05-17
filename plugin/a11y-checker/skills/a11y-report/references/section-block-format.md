# Section Result Block Format

Each section in the scorecard uses this exact structure.

## Template

```markdown
### Section N: {Section Name}

**Summary Table:**

| Total Tests | Passed | Failed | Skipped | Critical | Major | Enhancement |
| ----------- | ------ | ------ | ------- | -------- | ----- | ----------- |
| {n}         | {n}    | {n}    | {n}     | {n}      | {n}   | {n}         |

#### ✅ PASSED ({passed}/{total})

- ✅ {check description}
- ✅ {check description}

#### ❌ FAILED ({failed}/{total})

- ❌ **[{SEVERITY} - WCAG {criterion} Level {level}]** {check description}
  - **Result**: {specific finding with DOM evidence}
  - **Impact**: {user impact description}

#### ⊘ SKIPPED ({skipped}/{total})

- ⊘ {check description}
  - **Reason**: {why it could not be executed}
```

## Zero-skipped shorthand

When a section has no skipped tests, replace the `⊘ SKIPPED` block with:

```markdown
#### ⊘ SKIPPED (0/{total})

_(No tests were skipped in this section — all applicable elements were present on the page)_
```

## Example

```markdown
### Section 1: Document Structure & Semantics

**Summary Table:**

| Total Tests | Passed | Failed | Skipped | Critical | Major | Enhancement |
| ----------- | ------ | ------ | ------- | -------- | ----- | ----------- |
| 21          | 12     | 9      | 0       | 6        | 2     | 1           |

#### ✅ PASSED (12/21)

- ✅ Page has unique, descriptive title
- ✅ HTML lang attribute is present and correct
- ✅ Page has exactly one h1 element

#### ❌ FAILED (9/21)

- ❌ **[CRITICAL - WCAG 3.1.2 Level AA]** Content in other languages has lang attribute
  - **Result**: Spanish testimonial lacks `lang="es"` attribute
  - **Impact**: Screen readers may mispronounce foreign language content

- ❌ **[MAJOR - WCAG 3.1.2 Level AA]** Foreign language passages marked with lang attribute
  - **Result**: English words/passages in French page not marked
  - **Impact**: Screen readers won't switch pronunciation

#### ⊘ SKIPPED (0/21)

_(No tests were skipped in this section — all applicable elements were present on the page)_
```

## Rules

- `Total Tests` = Passed + Failed + Skipped (always)
- List PASSED items as plain bullets — no detail needed
- List FAILED items with Result + Impact — evidence is required
- List SKIPPED items with Reason — always explain why
- Sections appear in the order defined in `summary.json`
