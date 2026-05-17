# Content Without CSS Test (12 checks)

**Standards**: WCAG 1.3.1 (A), 1.3.2 (A)

## 20.1 CSS Disabled Test (WCAG 1.3.1/1.3.2 - Level A)

**Testing:** Disable CSS and evaluate page.

**Playwright example:**
```javascript
// Disable CSS
await page.addStyleTag({ content: '* { all: unset !important; }' });
```

**Pass criteria:**
- [ ] Content readable without CSS
- [ ] Content in logical order without CSS
- [ ] All information available without CSS
- [ ] No content hidden without CSS
- [ ] Reading order makes sense

## 20.2 Meaningful Sequence (WCAG 1.3.2 - Level A)

**Pass criteria:**
- [ ] DOM order matches visual order
- [ ] Reading sequence is logical
- [ ] Content structure makes sense
- [ ] No CSS positioning breaking reading order

## 20.3 Content Dependencies (WCAG 1.3.1 - Level A)

**Pass criteria:**
- [ ] No information only in CSS
- [ ] No content only in background images
- [ ] No functionality dependent on CSS
