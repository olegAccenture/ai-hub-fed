# Responsive & Reflow (22 checks)

**Standards**: WCAG 1.3.4 (AA), 1.4.4 (AA), 1.4.10 (AA), 1.4.12 (AA), 2.5.5 (AAA), 2.5.8 (AA)

## 10.1 Zoom & Text Resize (WCAG 1.4.4/1.4.10 - Level AA)

**Testing:** Test at 200% zoom and verify functionality.

**Pass criteria:**
- [ ] Page functional at 200% zoom
- [ ] No horizontal scrolling at 200% zoom
- [ ] Text resizes to 200% without loss
- [ ] Configuration options accessible at 200% zoom
- [ ] User menus fully visible at 200% zoom

## 10.2 Reflow (WCAG 1.4.10 - Level AA)

**Testing:** Test at 320px viewport or 1280px at 400% zoom.

**Pass criteria:**
- [ ] Content reflows at 320px viewport width
- [ ] No 2D scrolling required (except tables/images)
- [ ] All functionality available on mobile
- [ ] Page works at 1280px width with 400% zoom
- [ ] Website usable on mobile/small screens
- [ ] Comparator tools understandable without CSS

## 10.3 Text Spacing (WCAG 1.4.12 - Level AA)

**Testing:** Apply increased spacing and verify no clipping.

**Pass criteria:**
- [ ] Increased line height doesn't break layout
- [ ] Increased spacing doesn't cut off content
- [ ] Text spacing test passes (codepen tool)
- [ ] No information lost with increased spacing

## 10.4 Orientation (WCAG 1.3.4 - Level AA)

**Pass criteria:**
- [ ] Content adapts to portrait orientation
- [ ] Content adapts to landscape orientation
- [ ] Orientation not locked unnecessarily
- [ ] 3D viewers work in portrait mode
- [ ] Viewing not blocked in one orientation

## 10.5 Target Size (WCAG 2.5.5/2.5.8 - Level AAA/AA)

**Pass criteria:**
- [ ] Interactive targets ≥ 24x24 pixels
- [ ] Adequate spacing between touch targets
