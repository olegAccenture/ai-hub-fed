# ARIA Usage & Implementation (26 checks)

**Standards**: WCAG 4.1.2 (A), 4.1.3 (AA)

## 6.1 ARIA Roles (WCAG 4.1.2 - Level A)

**Testing steps:**

1. Identify all elements with role attributes
2. Verify roles are valid and appropriate
3. Check roles match element function
4. Verify no conflicting native HTML + ARIA roles
5. Check buttons labeled as links (or vice versa) have correct role

**JavaScript check:**

```javascript
const ariaRoles = await page.evaluate(() => {
  const withRoles = document.querySelectorAll('[role]');
  return Array.from(withRoles).map((el) => ({
    tag: el.tagName,
    role: el.getAttribute('role'),
    conflict: el.tagName === 'BUTTON' && el.getAttribute('role') === 'link'
  }));
});
```

**Valid ARIA roles:**

- Navigation: `navigation`, `banner`, `main`, `contentinfo`, `search`
- Structure: `article`, `region`, `complementary`, `list`, `listitem`
- Widgets: `button`, `tab`, `tabpanel`, `dialog`, `tooltip`, `combobox`
- Live: `alert`, `status`, `log`, `progressbar`

**Pass criteria:**

- [ ] All ARIA roles are valid
- [ ] ARIA roles match element function
- [ ] No conflicting native HTML + ARIA roles
- [ ] Buttons have button role (not link role)
- [ ] Links have link role (not button role)

## 6.2 ARIA Properties & States (WCAG 4.1.2/4.1.3 - Level A/AA)

**Testing steps:**

1. Identify aria-\* attributes (aria-expanded, aria-checked, aria-selected, etc.)
2. Verify values are valid and appropriate
3. Check states update dynamically when needed
4. Test aria-hidden doesn't hide focusable content
5. Verify color options have value attribute
6. Check buttons have accessible names

**State checking:**

```javascript
// Toggle accordion and check aria-expanded updates
await page.click('[aria-expanded="false"]');
const expanded = await page.getAttribute('[aria-expanded]', 'aria-expanded');
// Should be "true" after click

// Check for aria-hidden on focusable elements
const hiddenFocusable = await page.evaluate(() => {
  return Array.from(document.querySelectorAll('[aria-hidden="true"] *')).filter(
    (el) => {
      return (
        el.tabIndex >= 0 ||
        ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName)
      );
    }
  ).length;
});
```

**Pass criteria:**

- [ ] ARIA states/properties have valid values
- [ ] Dynamic states update correctly
- [ ] aria-hidden doesn't hide focusable content
- [ ] Color options have value attribute
- [ ] All buttons have accessible names
- [ ] Interactive components have relevant accessible names

## 6.3 ARIA Labels & Descriptions (WCAG 4.1.2 - Level A)

**Testing steps:**

1. Identify aria-label, aria-labelledby, aria-describedby
2. Verify labels present on elements without visible labels
3. Check labelledby references point to valid elements
4. Verify descriptions provide additional helpful context
5. Test all interactive components have relevant accessible names

**Validation:**

```javascript
const labelIssues = await page.evaluate(() => {
  const withLabelledby = document.querySelectorAll('[aria-labelledby]');
  const issues = [];

  withLabelledby.forEach((el) => {
    const ids = el.getAttribute('aria-labelledby').split(' ');
    ids.forEach((id) => {
      if (!document.getElementById(id)) {
        issues.push({ element: el.outerHTML.substring(0, 100), missingId: id });
      }
    });
  });

  return issues;
});
```

**Pass criteria:**

- [ ] aria-label used where visible label absent
- [ ] aria-labelledby references are valid
- [ ] aria-describedby provides helpful context

## 6.4 ARIA Live Regions (WCAG 4.1.3 - Level AA)

**Testing steps:**

1. Identify dynamic content updates (alerts, notifications, status)
2. Verify aria-live, role="alert", role="status" used appropriately
3. Test updates are announced
4. Check politeness level appropriate (polite/assertive)
5. Verify status messages announced
6. Test action results returned to assistive technologies

**Live region roles:**

- `role="status"` - reports result of action or application status (polite)
- `role="alert"` - presents suggestion or warns of error (assertive)
- `role="log"` - reports ongoing activity like chat messages (polite)
- `role="progressbar"` - reports progress of a process

**Testing example:**

```javascript
// Trigger action that should announce status
await page.click('button.add-to-cart');

// Check for live region update
const liveRegion = await page.evaluate(() => {
  const live = document.querySelector('[role="status"], [aria-live]');
  return {
    exists: !!live,
    text: live?.textContent,
    role: live?.getAttribute('role'),
    ariaLive: live?.getAttribute('aria-live')
  };
});
```

**Pass criteria:**

- [ ] Dynamic content updates use aria-live
- [ ] Status messages use role="status"
- [ ] Alerts use role="alert" or aria-live="assertive"
- [ ] Logs use role="log"
- [ ] Progress updates use role="progressbar"
- [ ] Status updates use appropriate politeness
- [ ] Action results announced to AT

## 6.5 ARIA in Custom Components (WCAG 4.1.2 - Level A)

**Testing steps:**

1. Identify custom widgets (tabs, accordions, modals, dropdowns)
2. Verify appropriate ARIA patterns implemented
3. Check keyboard interaction matches ARIA Authoring Practices
4. Test state changes announce correctly
5. Verify components have: role, name, value/state

See [Custom Components & Widgets](custom-widgets.md) for detailed testing.

**Pass criteria:**

- [ ] Custom widgets follow ARIA patterns
- [ ] Custom components keyboard accessible
- [ ] Custom components have role, name, value

## Checklist Summary

```markdown
## ARIA Usage & Implementation (26 checks)

### Roles (5 checks)

- [ ] All ARIA roles are valid
- [ ] ARIA roles match element function
- [ ] No conflicting native HTML + ARIA roles
- [ ] Buttons have button role (not link role)
- [ ] Links have link role (not button role)

### States & Properties (6 checks)

- [ ] ARIA states/properties have valid values
- [ ] Dynamic states update correctly
- [ ] aria-hidden doesn't hide focusable content
- [ ] Color options have value attribute
- [ ] All buttons have accessible names
- [ ] Interactive components have relevant accessible names

### Labels & Descriptions (3 checks)

- [ ] aria-label used where visible label absent
- [ ] aria-labelledby references are valid
- [ ] aria-describedby provides helpful context

### Live Regions (7 checks)

- [ ] Dynamic content updates use aria-live
- [ ] Status messages use role="status"
- [ ] Alerts use role="alert" or aria-live="assertive"
- [ ] Logs use role="log"
- [ ] Progress updates use role="progressbar"
- [ ] Status updates use appropriate politeness
- [ ] Action results announced to AT

### Custom Components (3 checks)

- [ ] Custom widgets follow ARIA patterns
- [ ] Custom components keyboard accessible
- [ ] Custom components have role, name, value
```
