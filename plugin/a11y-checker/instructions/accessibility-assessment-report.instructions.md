# Example Feedback Report (Updated Format)

## Accessibility Test Report

**Website**: Example Company Website (www.example.com)  
**Test Date**: January 21, 2026  
**Tester**: Accessibility Agent  
**Standards**: WCAG 2.2 Level AA, EN 301 549, RaWeb  
**Pages Tested**: Home, Products, Contact Form, About

---

## Executive Summary

**Overall Compliance**: 62% (114 passed / 185 total criteria)  
**Critical Issues**: 12 (WCAG Level A violations)  
**Major Issues**: 8 (WCAG Level AA violations)  
**Minor Issues**: 5 (Best practices and Level AAA)

**Priority Recommendations**:

1. Fix HTML validation errors (508 errors found)
2. Fix keyboard navigation traps in navigation menu
3. Add missing form labels and error message associations
4. Improve color contrast for body text and UI components
5. Add alt text to product images and fix heading hierarchy

---

## Detailed Test Results

### Section 1: Document Structure & Semantics

**Summary Table:**

| Total Tests | Passed | Failed | Skipped | Critical | Major | Minor |
| ----------- | ------ | ------ | ------- | -------- | ----- | ----- |
| 21          | 12     | 9      | 0       | 6        | 2     | 1     |

#### ✅ PASSED (12/21)

- ✅ Page has unique, descriptive title
- ✅ Page title is specific (not generic)
- ✅ HTML lang attribute is present and correct
- ✅ Page has exactly one h1 element
- ✅ All headings contained in <hn> tags
- ✅ No empty headings
- ✅ Page contains <main> landmark (unique)
- ✅ Page has appropriate <header> with role="banner"
- ✅ Navigation uses <nav> with role="navigation"
- ✅ Footer uses <footer> with role="contentinfo"
- ✅ Lists use proper markup (ul, ol, dl)
- ✅ List elements only used for actual lists

#### ❌ FAILED (9/21)

- ❌ **[CRITICAL - WCAG 3.1.2 Level AA]** Content in other languages has lang attribute
  - **Result**: Spanish testimonial lacks `lang="es"` attribute
  - **Impact**: Screen readers may mispronounce foreign language content
  - **Fix**: Add `lang="es"` to testimonial blockquote

- ❌ **[MAJOR - WCAG 3.1.2 Level AA]** Foreign language passages marked with lang attribute
  - **Result**: English words/passages in French page not marked
  - **Impact**: Screen readers won't switch pronunciation
  - **Fix**: Mark with `<span lang="en">` attribute

- ❌ **[MINOR - Best Practice]** Page title not in foreign language without reason
  - **Result**: Some page titles contain foreign language terms
  - **Impact**: May confuse users, affects SEO
  - **Fix**: Translate titles or mark language properly

#### ⊘ SKIPPED (0/21)

_(No tests were skipped in this section - all applicable elements were present on the page)_

---

### Section 2: Keyboard Navigation & Focus Management

**Summary Table:**

| Total Tests | Passed | Failed | Skipped | Critical | Major | Minor |
| ----------- | ------ | ------ | ------- | -------- | ----- | ----- |
| 24          | 8      | 16     | 0       | 9        | 5     | 2     |

#### ✅ PASSED (8/24)

- ✅ Tab navigation works in logical order
- ✅ Shift+Tab reverse navigation works
- ✅ Enter/Space activates controls appropriately
- ✅ Focus indicator contrast ratio ≥ 3:1
- ✅ Focus order matches visual/reading order
- ✅ Natural HTML elements have no tabindex
- ✅ Scripted elements have tabindex="0"
- ✅ Page load focus at top of page

#### ❌ FAILED (16/24)

- ❌ **[CRITICAL - WCAG 2.1.1 Level A]** Tab doesn't reach visually hidden elements
  - **Result**: Tab path reaches hidden menu items
  - **Impact**: Confusing keyboard navigation
  - **Fix**: Use proper hiding techniques (display:none or visibility:hidden)

- ❌ **[MAJOR - WCAG 2.1.1 Level A]** Focus returns after closing components
  - **Result**: Focus not repositioned after closing some components
  - **Impact**: Users lose their place in page
  - **Fix**: Return focus to trigger element on close

#### ⊘ SKIPPED (0/24)

_(No tests were skipped in this section)_

---

### Section 3: Color & Contrast

**Summary Table:**

| Total Tests | Passed | Failed | Skipped | Critical | Major | Minor |
| ----------- | ------ | ------ | ------- | -------- | ----- | ----- |
| 12          | 4      | 3      | 5       | 2        | 1     | 0     |

#### ✅ PASSED (4/12)

- ✅ Body text contrast ratio ≥ 4.5:1
- ✅ Large text contrast ratio ≥ 3:1
- ✅ UI components contrast ratio ≥ 3:1
- ✅ Focus indicators contrast ratio ≥ 3:1

#### ❌ FAILED (3/12)

- ❌ **[CRITICAL - WCAG 1.4.3 Level AA]** Text contrast insufficient
  - **Result**: Gray text on white background has 3.2:1 ratio
  - **Impact**: Users with low vision cannot read content
  - **Fix**: Darken text color to achieve 4.5:1 minimum ratio

- ❌ **[MAJOR - WCAG 1.4.11 Level AA]** Button border contrast insufficient
  - **Result**: Secondary buttons have 2.1:1 contrast
  - **Impact**: Users cannot distinguish button boundaries
  - **Fix**: Increase border color contrast to 3:1 minimum

- ❌ **[MAJOR - WCAG 1.4.3 Level AA]** Link text contrast fails
  - **Result**: Some hyperlinks have 3.8:1 ratio
  - **Impact**: Links not easily distinguishable
  - **Fix**: Use darker blue or add underline

#### ⊘ SKIPPED (5/12)

- ⊘ Color not sole means of conveying information
  - **Reason**: No color-only information elements present on tested pages
- ⊘ Enhanced contrast for text (Level AAA)
  - **Reason**: No body text elements found to test

- ⊘ Graphical objects contrast ratio ≥ 3:1
  - **Reason**: No graphical objects (icons, diagrams) present on page

- ⊘ Non-text contrast for disabled controls
  - **Reason**: No disabled form controls found on tested pages

- ⊘ Hover/focus color changes maintain contrast
  - **Reason**: No hover states defined in CSS for tested elements

---

## Overall Summary by Section

| Section                 | Total   | Passed  | Failed | Skipped | Critical | Major | Minor |
| ----------------------- | ------- | ------- | ------ | ------- | -------- | ----- | ----- |
| 1. Document Structure   | 21      | 12      | 9      | 0       | 6        | 2     | 1     |
| 2. Keyboard Navigation  | 24      | 8       | 16     | 0       | 9        | 5     | 2     |
| 3. Color & Contrast     | 12      | 4       | 3      | 5       | 2        | 1     | 0     |
| 4. Forms & Input        | 23      | 6       | 12     | 5       | 9        | 3     | 0     |
| 5. Images & Alt Text    | 18      | 6       | 8      | 4       | 6        | 2     | 0     |
| 6. ARIA Usage           | 25      | 10      | 12     | 3       | 10       | 2     | 0     |
| 19. HTML Quality        | 20      | 4       | 16     | 0       | 14       | 2     | 0     |
| 20. Content Without CSS | 12      | 3       | 9      | 0       | 7        | 2     | 0     |
| **TOTAL**               | **185** | **114** | **71** | **25**  | **12**   | **8** | **5** |

**Note**: Only 8 of 20 sections shown above for brevity. Full report would include all 20 sections.

**Calculation Notes**:

- **Passed + Failed + Skipped = Total Tests** (for each section)
- **Skipped tests** are not counted as passed or failed
- **Overall Compliance** = Passed / (Passed + Failed) × 100% = 114 / 185 × 100% = 62%
  - Skipped tests are excluded from compliance percentage calculation

---

## Instructions for Test Execution

When generating accessibility test reports, follow these rules for test categorization:

1. **PASSED (✅)**: Test was executed and the element/feature meets accessibility requirements
2. **FAILED (❌)**: Test was executed and the element/feature does NOT meet accessibility requirements
3. **SKIPPED (⊘)**: Test could NOT be executed because the required element/feature was not present on the tested pages

### When to Mark Tests as SKIPPED

Mark a test as "Skipped" when:

- The element type being tested is not present on any tested page (e.g., no video players, no data tables, no accordions)
- The feature being tested is not implemented (e.g., no search functionality, no filters)
- The interaction pattern doesn't exist (e.g., no modals, no carousels, no drag-and-drop)
- CSS styles or JavaScript behaviors aren't present to test (e.g., no hover states defined)

### Reporting Skipped Tests

For each section:

1. Add "Skipped" column to the summary table
2. Create a separate "⊘ SKIPPED" subsection after PASSED and FAILED
3. List each skipped test with a brief **Reason** explaining why it couldn't be executed
4. Do NOT include skipped tests in compliance percentage calculations
5. Include skipped count in the "Total Tests" to show complete test coverage scope

### Example Skipped Test Format

```markdown
#### ⊘ SKIPPED (5/12)

- ⊘ Video captions and transcripts available
  - **Reason**: No video content present on tested pages
- ⊘ Audio descriptions provided for video
  - **Reason**: No video players found

- ⊘ Data table headers properly marked
  - **Reason**: No data tables present on tested pages
```

---

**End of Report**
