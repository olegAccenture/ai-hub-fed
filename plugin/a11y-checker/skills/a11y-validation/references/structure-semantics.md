# Document Structure & Semantics (21 checks)

**Standards**: WCAG 1.3.1 (A), 2.4.2 (A), 2.4.6 (AA), 3.1.1 (A), 3.1.2 (AA)

## 1.1 Page Title (WCAG 2.4.2 - Level A)

**Testing steps:**

1. Navigate to the page
2. Extract `<title>` element content
3. Verify title is descriptive, unique, and identifies page purpose
4. Check title is not in foreign language without reason
5. Ensure title is specific, not generic (avoid "Page", "Untitled", etc.)

**Pass criteria:**

- [ ] Page has unique, descriptive title
- [ ] Title is specific (not generic)
- [ ] Title not in foreign language without reason

## 1.2 Language Declaration (WCAG 3.1.1/3.1.2 - Level A/AA)

**Testing steps:**

1. Check `<html>` element for `lang` attribute
2. Verify language code is valid (e.g., `en`, `es`, `de`)
3. Check for `lang` attributes on content in different languages
4. Test that foreign language passages are marked with `<span lang="[code]">`
5. Verify English words/passages in non-English pages are marked

**Pass criteria:**

- [ ] HTML lang attribute is present and correct
- [ ] Content in other languages has lang attribute
- [ ] Foreign language passages marked with lang attribute

## 1.3 Heading Hierarchy (WCAG 1.3.1/2.4.6 - Level A/AA)

**Testing steps:**

1. Extract all heading elements (h1-h6) using:
   ```javascript
   const headings = Array.from(
     document.querySelectorAll('h1, h2, h3, h4, h5, h6')
   ).map((h) => ({ tag: h.tagName, text: h.textContent.trim() }));
   ```
2. Verify logical hierarchy (no skipped levels)
3. Confirm page has exactly one h1
4. Verify headings describe their sections
5. Check all headings are in `<hn>` tags (not styled text)
6. Ensure headings are not empty

**Pass criteria:**

- [ ] Heading hierarchy is logical (no skipped levels)
- [ ] Page has exactly one h1 element
- [ ] All headings are descriptive
- [ ] All headings contained in `<hn>` tags
- [ ] No empty headings
- [ ] Heading levels reflect information structure

## 1.4 Landmarks and Regions (WCAG 1.3.1 - Level A)

**Testing steps:**

1. Identify HTML5 semantic elements: `<header>`, `<nav>`, `<main>`, `<footer>`, `<aside>`, `<section>`
2. Check for ARIA landmarks: `role="banner"`, `role="navigation"`, `role="main"`, `role="contentinfo"`
3. Verify `<main>` exists and is unique OR `<div role="main">` present
4. Check `<main>` includes entire main content area
5. Verify site's `<header>` (native `<header>` is already a banner landmark)
6. Check all `<nav>` elements (native `<nav>` is already navigation landmark)
7. Verify `<footer>` is used (native `<footer>` is already contentinfo landmark)
8. Note: explicit `role="contentinfo"` only needed if using `<div>` instead of semantic `<footer>`
9. Verify all content is within appropriate landmarks

**JavaScript check:**

```javascript
const landmarks = {
  main: document.querySelectorAll('main, [role="main"]').length,
  navigation: document.querySelectorAll('nav, [role="navigation"]').length,
  banner: document.querySelectorAll('header, [role="banner"]').length,
  contentinfo: document.querySelectorAll('footer, [role="contentinfo"]').length
};
```

**Pass criteria:**

- [ ] Page contains `<main>` landmark (unique)
- [ ] `<main>` includes entire main content
- [ ] Page has appropriate `<header>` (banner landmark)
- [ ] Navigation uses `<nav>` (navigation landmark)
- [ ] Footer uses `<footer>` (contentinfo landmark)
- [ ] All content is within appropriate landmarks

## 1.5 Lists (WCAG 1.3.1 - Level A)

**Testing steps:**

1. Identify all lists (ul, ol, dl)
2. Verify list markup used for list content
3. Check non-list content doesn't use list elements
4. Verify links in accordions use list tags
5. Check characteristics lists use proper list structure

**Pass criteria:**

- [ ] Lists use proper markup (ul, ol, dl)
- [ ] List elements only used for actual lists
- [ ] Links in accordions use list tags

## Checklist Summary

```markdown
## Document Structure & Semantics (21 checks)

### Page Title (3 checks)

- [ ] Page has unique, descriptive title
- [ ] Page title is specific (not generic)
- [ ] Page title not in foreign language without reason

### Language (3 checks)

- [ ] HTML lang attribute is present and correct
- [ ] Content in other languages has lang attribute
- [ ] Foreign language passages marked with lang attribute

### Headings (6 checks)

- [ ] Heading hierarchy is logical (no skipped levels)
- [ ] Page has exactly one h1 element
- [ ] All headings are descriptive
- [ ] All headings contained in <hn> tags
- [ ] No empty headings
- [ ] Heading levels reflect information structure

### Landmarks (6 checks)

- [ ] Page contains <main> landmark (unique)
- [ ] <main> includes entire main content
- [ ] Page has appropriate <header> with banner landmark
- [ ] Navigation uses <nav> with navigation landmark
- [ ] Footer uses <footer> with contentinfo landmark
- [ ] All content is within appropriate landmarks

### Lists (3 checks)

- [ ] Lists use proper markup (ul, ol, dl)
- [ ] List elements only used for actual lists
- [ ] Links in accordions use list tags
```
