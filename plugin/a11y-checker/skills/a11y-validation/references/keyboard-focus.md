# Keyboard Navigation & Focus Management (24 checks)

**Standards**: WCAG 2.1.1 (A), 2.1.2 (A), 2.1.4 (A), 2.4.1 (A), 2.4.3 (A), 2.4.7 (AA), 2.4.11 (AA)

## 2.1 Keyboard Accessibility (WCAG 2.1.1/2.1.2 - Level A)

**Testing steps:**

1. Navigate through entire page using only Tab key
2. Use Shift+Tab for reverse navigation
3. Test Enter/Space for activating controls
4. Verify no keyboard traps exist
5. Check all mouse actions can be performed with keyboard

**Playwright example:**

```javascript
// Navigate forward
await page.keyboard.press('Tab');
// Navigate backward
await page.keyboard.press('Shift+Tab');
// Activate element
await page.keyboard.press('Enter');
// Check focus
const focusedElement = await page.evaluate(
  () => document.activeElement.tagName
);
```

**Pass criteria:**

- [ ] All interactive elements reachable via keyboard
- [ ] All mouse actions can be done with keyboard
- [ ] Tab navigation works in logical order
- [ ] Shift+Tab reverse navigation works
- [ ] No keyboard traps detected
- [ ] Enter/Space activates controls appropriately

## 2.2 Focus Visibility (WCAG 2.4.7/2.4.11 - Level AA)

**Testing steps:**

1. Tab through all interactive elements
2. Verify visible focus indicator exists for each
3. Measure focus indicator contrast ratio (minimum 3:1)
4. Check focus indicator not completely hidden
5. Verify indicator not just color or text-decoration
6. Ensure indicator includes visual cue (outline, border, background)

**Contrast measurement:**

```javascript
const indicator = await page.evaluate(() => {
  const el = document.activeElement;
  const styles = window.getComputedStyle(el);
  return {
    outline: styles.outline,
    outlineColor: styles.outlineColor,
    boxShadow: styles.boxShadow,
    borderColor: styles.borderColor
  };
});
```

**Pass criteria:**

- [ ] Focus indicator visible on all focusable elements
- [ ] Focus indicator includes visual cue (not just color)
- [ ] Focus indicator contrast ratio ≥ 3:1

## 2.3 Focus Order (WCAG 2.4.3 - Level A)

**Testing steps:**

1. Tab through page and document focus order
2. Verify focus order matches visual/meaningful order
3. Check for illogical jumps in focus sequence

**Pass criteria:**

- [ ] Focus order matches visual/reading order

## 2.4 Skip Links (WCAG 2.4.1 - Level A)

**Testing steps:**

1. Load page and press Tab once
2. Check for "Skip to main content" or similar link
3. Verify skip link is first focusable element
4. Activate skip link and verify it redirects to main content
5. Check skip link has relevant accessible name
6. If hidden, verify visible on keyboard focus

**Pass criteria:**

- [ ] Skip to main content link present and functional
- [ ] Skip link actually redirects to main content
- [ ] Skip link is first focusable element
- [ ] Skip link visible on keyboard focus
- [ ] Skip link has relevant accessible name

## 2.5 Interactive Component Shortcuts (WCAG 2.1.4 - Level A)

**Testing steps:**

1. Test custom keyboard shortcuts don't override browser/AT shortcuts
2. Verify shortcuts can be turned off or remapped

**Pass criteria:**

- [ ] Custom shortcuts don't conflict with browser/AT
- [ ] Keyboard shortcuts can be disabled or remapped

## 2.6 Natural Keyboard Navigation (WCAG 2.1.1/2.4.3 - Level A)

**Testing steps:**

1. Check native HTML interactive objects have no tabindex attribute
2. Verify scripted interactive objects have tabindex="0"
3. Ensure tab path doesn't reach visually hidden elements
4. Test closing component returns focus to opener
5. Verify opening dialog positions focus inside and traps it
6. Check page load focus is at top
7. Verify burger menus don't force through all hidden elements
8. Check radio buttons require single tab only

**JavaScript check:**

```javascript
// Check for improper tabindex usage
const nativeInteractive = document.querySelectorAll(
  'a[href], button, input, select, textarea'
);
const withTabindex = Array.from(nativeInteractive).filter((el) =>
  el.hasAttribute('tabindex')
);

// Check for visually hidden but focusable
const hiddenFocusable = Array.from(
  document.querySelectorAll('[tabindex]:not([tabindex="-1"])')
).filter((el) => {
  const styles = window.getComputedStyle(el);
  return styles.display === 'none' || styles.visibility === 'hidden';
});
```

**Pass criteria:**

- [ ] Natural HTML elements have no tabindex
- [ ] Scripted elements have tabindex="0"
- [ ] Tab doesn't reach visually hidden elements
- [ ] Focus returns after closing components
- [ ] Focus trapped in open dialogs
- [ ] Page load focus at top of page
- [ ] Burger menu doesn't force through all elements
- [ ] Radio buttons require single tab only

## Checklist Summary

```markdown
## Keyboard Navigation & Focus Management (24 checks)

### Keyboard Access (6 checks)

- [ ] All interactive elements reachable via keyboard
- [ ] All mouse actions can be done with keyboard
- [ ] Tab navigation works in logical order
- [ ] Shift+Tab reverse navigation works
- [ ] No keyboard traps detected
- [ ] Enter/Space activates controls appropriately

### Focus Visibility (3 checks)

- [ ] Focus indicator visible on all focusable elements
- [ ] Focus indicator includes visual cue (not just color)
- [ ] Focus indicator contrast ratio ≥ 3:1

### Focus Order (1 check)

- [ ] Focus order matches visual/reading order

### Skip Links (5 checks)

- [ ] Skip to main content link present and functional
- [ ] Skip link actually redirects to main content
- [ ] Skip link is first focusable element
- [ ] Skip link visible on keyboard focus
- [ ] Skip link has relevant accessible name

### Shortcuts (2 checks)

- [ ] Custom shortcuts don't conflict with browser/AT
- [ ] Keyboard shortcuts can be disabled or remapped

### Natural Navigation (8 checks)

- [ ] Natural HTML elements have no tabindex
- [ ] Scripted elements have tabindex="0"
- [ ] Tab doesn't reach visually hidden elements
- [ ] Focus returns after closing components
- [ ] Focus trapped in open dialogs
- [ ] Page load focus at top of page
- [ ] Burger menu doesn't force through all elements
- [ ] Radio buttons require single tab only
```
