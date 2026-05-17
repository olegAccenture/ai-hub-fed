# Forms & Input Controls (23 checks)

**Standards**: WCAG 1.3.1 (A), 1.3.5 (AA), 3.3.1 (A), 3.3.2 (A), 3.3.3 (AA), 3.3.4 (AA), 3.3.8 (AA)

## 4.1 Form Labels (WCAG 1.3.1/3.3.2 - Level A)

**Testing steps:**

1. Identify all form inputs (text, checkbox, radio, select, textarea)
2. Verify each has associated `<label>` with `for` attribute OR `aria-label`/`aria-labelledby`
3. Check label text is descriptive and visible
4. Verify search inputs have proper labels (not just placeholder)

**JavaScript check:**

```javascript
const unlabeledInputs = await page.evaluate(() => {
  const inputs = document.querySelectorAll('input, select, textarea');
  return Array.from(inputs)
    .filter((input) => {
      const hasLabel = document.querySelector(`label[for="${input.id}"]`);
      const hasAriaLabel = input.hasAttribute('aria-label');
      const hasAriaLabelledby = input.hasAttribute('aria-labelledby');
      return !hasLabel && !hasAriaLabel && !hasAriaLabelledby;
    })
    .map((el) => el.outerHTML);
});
```

**Pass criteria:**

- [ ] All form inputs have associated labels
- [ ] Labels are visible and descriptive
- [ ] Search inputs have proper labels (not just placeholder)

## 4.2 Required Fields (WCAG 1.3.1/3.3.2 - Level A)

**Testing steps:**

1. Identify required form fields
2. Verify required status indicated (text, asterisk, aria-required="true")
3. Check indication not by color alone
4. Verify indication visible (not just hidden text)

**Pass criteria:**

- [ ] Required fields indicated programmatically (aria-required)
- [ ] Required indication visible (not color alone)
- [ ] Required indication not just hidden text

## 4.3 Grouped Fields (WCAG 1.3.1/3.3.2 - Level A)

**Testing steps:**

1. Identify groups of related fields (address, contact info)
2. Verify `<fieldset>` and `<legend>` used
3. Check group labels are clear and relevant

**Pass criteria:**

- [ ] Grouped fields use fieldset/legend
- [ ] Group labels clear and relevant

## 4.4 Input Purpose (WCAG 1.3.5 - Level AA)

**Testing steps:**

1. Identify personal information fields (name, email, phone, address)
2. Verify autocomplete attribute present with appropriate value

**Autocomplete values:**

- `name`, `email`, `tel`, `address-line1`, `postal-code`, `country`, etc.

**Pass criteria:**

- [ ] Personal info fields have autocomplete attributes

## 4.5 Error Identification (WCAG 3.3.1/3.3.3 - Level A/AA)

**Testing steps:**

1. Submit form with errors intentionally
2. Verify error messages are clear and specific
3. Check errors associated with inputs (aria-describedby)
4. Verify error not indicated by color alone
5. Check messages not just at top without association
6. Ensure messages appear next to relevant fields

**Test example:**

```javascript
// Submit form and check for errors
await page.click('button[type="submit"]');
await page.waitForSelector('[aria-invalid="true"]', { timeout: 3000 });

const errorInfo = await page.evaluate(() => {
  const invalidInputs = document.querySelectorAll('[aria-invalid="true"]');
  return Array.from(invalidInputs).map((input) => ({
    id: input.id,
    hasDescribedBy: input.hasAttribute('aria-describedby'),
    errorMessage: input.getAttribute('aria-describedby')
      ? document.getElementById(input.getAttribute('aria-describedby'))
          ?.textContent
      : null
  }));
});
```

**Pass criteria:**

- [ ] Form errors clearly identified
- [ ] Error messages specific and clear
- [ ] Error messages associated with inputs (aria-describedby)
- [ ] Errors not indicated by color alone
- [ ] Error messages appear next to relevant fields
- [ ] Error messages not just at top of form

## 4.6 Error Suggestions (WCAG 3.3.3 - Level AA)

**Testing steps:**

1. Trigger validation errors
2. Verify suggestions for correction provided
3. Check suggestions specific and helpful
4. Include examples in messages (e.g., "Enter email like name@example.com")

**Pass criteria:**

- [ ] Error correction suggestions provided
- [ ] Error suggestions specific with examples

## 4.7 Error Prevention (WCAG 3.3.4 - Level AA)

**Testing steps:**

1. Test forms with legal/financial/data deletion actions
2. Verify at least one: reversible, checked, or confirmed
3. Check important actions have confirmation dialogs

**Pass criteria:**

- [ ] Important actions have confirmation/undo
- [ ] Delete actions have confirmation dialogs

## 4.8 Accessible Authentication (WCAG 3.3.8 - Level AA)

**Testing steps:**

1. Test login and authentication forms
2. Verify no cognitive function test (puzzles) OR alternatives provided
3. Check password paste allowed
4. Verify CAPTCHA has accessible alternatives (audio, biometric)

**Pass criteria:**

- [ ] No cognitive function tests in authentication
- [ ] CAPTCHA has accessible alternatives
- [ ] Password paste allowed
- [ ] Authentication alternatives provided

## Checklist Summary

```markdown
## Forms & Input Controls (23 checks)

### Labels (3 checks)

- [ ] All form inputs have associated labels
- [ ] Labels are visible and descriptive
- [ ] Search inputs have proper labels (not just placeholder)

### Required Fields (3 checks)

- [ ] Required fields indicated programmatically (aria-required)
- [ ] Required indication visible (not color alone)
- [ ] Required indication not just hidden text

### Grouped Fields (2 checks)

- [ ] Grouped fields use fieldset/legend
- [ ] Group labels clear and relevant

### Input Purpose (1 check)

- [ ] Personal info fields have autocomplete attributes

### Error Identification (6 checks)

- [ ] Form errors clearly identified
- [ ] Error messages specific and clear
- [ ] Error messages associated with inputs (aria-describedby)
- [ ] Errors not indicated by color alone
- [ ] Error messages appear next to relevant fields
- [ ] Error messages not just at top of form

### Error Suggestions (2 checks)

- [ ] Error correction suggestions provided
- [ ] Error suggestions specific with examples

### Error Prevention (2 checks)

- [ ] Important actions have confirmation/undo
- [ ] Delete actions have confirmation dialogs

### Authentication (4 checks)

- [ ] No cognitive function tests in authentication
- [ ] CAPTCHA has accessible alternatives
- [ ] Password paste allowed
- [ ] Authentication alternatives provided
```
