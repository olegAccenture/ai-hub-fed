# Custom Components & Widgets (29 checks)

**Standards**: WCAG 1.3.1 (A), 2.1.1 (A), 4.1.2 (A), 4.1.3 (AA)

## 16.1 Modal Dialogs (WCAG 1.3.1/2.1.1/4.1.2 - Level A)

**Pass criteria:**
- [ ] Modals have role="dialog" or role="alertdialog"
- [ ] Modals have aria-modal="true"
- [ ] Focus moves to modal on open
- [ ] Focus trapped within modal
- [ ] Escape key closes modal
- [ ] Focus returns to trigger on close
- [ ] Modal has accessible name (aria-labelledby)

## 16.2 Tabs (WCAG 1.3.1/4.1.2 - Level A)

**Pass criteria:**
- [ ] Tab list has role="tablist"
- [ ] Tabs have role="tab"
- [ ] Tab panels have role="tabpanel"
- [ ] aria-selected indicates active tab
- [ ] Arrow keys navigate between tabs
- [ ] Tab+Enter activates tab

## 16.3 Accordions (WCAG 4.1.2 - Level A)

**Pass criteria:**
- [ ] Buttons have aria-expanded state
- [ ] aria-expanded updates on toggle
- [ ] Content regions have role="region" or id linkage
- [ ] Keyboard can toggle accordion

## 16.4 Tooltips (WCAG 1.4.13 - Level AA)

**Pass criteria:**
- [ ] Tooltips dismissible with Escape
- [ ] Tooltips hoverable (don't disappear instantly)
- [ ] Tooltips persist until dismissed
- [ ] Tooltip has role="tooltip"

## 16.5 Carousels (WCAG 2.1.1/2.2.2 - Level A)

**Pass criteria:**
- [ ] Carousel controls keyboard accessible
- [ ] Auto-rotation can be paused
- [ ] Current slide indicated (aria-current)
- [ ] Navigation buttons labeled clearly

## 16.6 Dropdowns & Comboboxes (WCAG 4.1.2 - Level A)

**Pass criteria:**
- [ ] Combobox has role="combobox"
- [ ] Listbox has role="listbox"
- [ ] Options have role="option"
- [ ] aria-expanded indicates state
- [ ] Arrow keys navigate options
- [ ] Enter/Space selects option
