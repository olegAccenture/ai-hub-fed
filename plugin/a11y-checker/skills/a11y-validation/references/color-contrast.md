# Color & Contrast (12 checks)

**Standards**: WCAG 1.4.1 (A), 1.4.3 (AA), 1.4.6 (AAA), 1.4.11 (AA), 2.4.11 (AA)

## 3.1 Color Contrast - Text (WCAG 1.4.3/1.4.6 - Level AA/AAA)

**Requirements:**

- **Normal text** (< 18pt or < 14pt bold):
  - Level AA: minimum 4.5:1
  - Level AAA: minimum 7:1
- **Large text** (≥ 18pt or ≥ 14pt bold):
  - Level AA: minimum 3:1
  - Level AAA: minimum 4.5:1

**Testing steps:**

1. Identify all text content on the page
2. For each text element, measure contrast ratio between text and background
3. Use automated contrast checker or calculate manually

**Playwright measurement:**

```javascript
const contrastInfo = await page.evaluate(() => {
  const texts = Array.from(
    document.querySelectorAll(
      'p, h1, h2, h3, h4, h5, h6, span, a, button, label'
    )
  );
  return texts.map((el) => {
    const styles = window.getComputedStyle(el);
    const fontSize = parseFloat(styles.fontSize);
    const fontWeight = parseInt(styles.fontWeight);
    const isLargeText =
      fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 700);

    return {
      text: el.textContent.trim().substring(0, 50),
      color: styles.color,
      backgroundColor: styles.backgroundColor,
      fontSize: fontSize,
      fontWeight: fontWeight,
      isLargeText: isLargeText
    };
  });
});
```

**Pass criteria:**

- [ ] Normal text contrast ≥ 4.5:1 (AA) or ≥ 7:1 (AAA)
- [ ] Large text contrast ≥ 3:1 (AA) or ≥ 4.5:1 (AAA)

## 3.2 Color Contrast - Non-Text (WCAG 1.4.11 - Level AA)

**Requirements:**

- UI components (buttons, form borders, icons): minimum 3:1
- Graphics required for understanding: minimum 3:1

**Testing steps:**

1. Identify UI components and meaningful graphics
2. Measure contrast ratio against adjacent colors
3. Verify minimum 3:1 contrast

**Pass criteria:**

- [ ] UI component contrast ≥ 3:1
- [ ] Graphical objects contrast ≥ 3:1

## 3.3 Use of Color (WCAG 1.4.1 - Level A)

**Testing steps:**

1. Identify information conveyed by color alone
2. Verify additional indicators exist (icons, patterns, text)
3. Test with grayscale/color blindness simulation
4. Check selected options not indicated only by visual attributes
5. Verify error fields not indicated by red border only

**Grayscale test:**

```javascript
await page.evaluate(() => {
  document.body.style.filter = 'grayscale(100%)';
});
// Manually verify information is still distinguishable
```

**Pass criteria:**

- [ ] Information not conveyed by color alone
- [ ] Color-only indicators have text/icon alternatives
- [ ] Selected options not indicated only by visual attributes
- [ ] Error fields not indicated by color only
- [ ] Page usable in grayscale mode

## 3.4 Text Color and Background (WCAG 1.4.3 - Level AA)

**Testing steps:**

1. Verify all texts have both `color` and `background-color` CSS properties defined
2. Check colored texts are associated with background color

**JavaScript check:**

```javascript
const missingColors = await page.evaluate(() => {
  const texts = Array.from(
    document.querySelectorAll(
      'p, h1, h2, h3, h4, h5, h6, span, a, button, label'
    )
  );
  return texts
    .filter((el) => {
      const styles = window.getComputedStyle(el);
      const hasColor = styles.color !== '';
      const hasBg =
        styles.backgroundColor !== '' &&
        styles.backgroundColor !== 'rgba(0, 0, 0, 0)';
      return !hasColor || !hasBg;
    })
    .map((el) => el.outerHTML.substring(0, 100));
});
```

**Pass criteria:**

- [ ] All texts have color and background-color CSS properties
- [ ] Colored texts associated with background color

## 3.5 Contrast in Focus Indicators (WCAG 2.4.11 - Level AA)

See [Keyboard Navigation & Focus Management - Section 2.2](keyboard-focus.md#22-focus-visibility-wcag-2472411---level-aa)

**Pass criteria:**

- [ ] Focus indicator contrast ≥ 3:1

## Checklist Summary

```markdown
## Color & Contrast (12 checks)

### Text Contrast (2 checks)

- [ ] Normal text contrast ≥ 4.5:1 (AA) or ≥ 7:1 (AAA)
- [ ] Large text contrast ≥ 3:1 (AA) or ≥ 4.5:1 (AAA)

### Non-Text Contrast (2 checks)

- [ ] UI component contrast ≥ 3:1
- [ ] Graphical objects contrast ≥ 3:1

### Use of Color (5 checks)

- [ ] Information not conveyed by color alone
- [ ] Color-only indicators have text/icon alternatives
- [ ] Selected options not indicated only by visual attributes
- [ ] Error fields not indicated by color only
- [ ] Page usable in grayscale mode

### Color Properties (2 checks)

- [ ] All texts have color and background-color CSS properties
- [ ] Colored texts associated with background color

### Focus Indicator (1 check)

- [ ] Focus indicator contrast ≥ 3:1
```
