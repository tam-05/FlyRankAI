# Architectural Comparison & Gap Analysis: Scratch ARIA Components vs. shadcn/ui (Radix Primitives)

**Author:** Tamanna Das  
**Milestone:** Week 4 — Accessible Component Playground (FE-03)  
**Deliverable:** Custom W3C ARIA Implementation (`Modal`, `Tabs`, `Disclosure`) vs. `shadcn/ui` (`@radix-ui/react-dialog`, `@radix-ui/react-tabs`)

---

## 1. Overview & Objective
In this exercise, we built three interactive UI components completely from scratch in React 18 + TypeScript with zero component libraries:
1. **Modal Dialog** (`role="dialog"`, `aria-modal="true"`, focus trap, escape listener, focus return)
2. **Tabs** (`role="tablist"`, `role="tab"`, `role="tabpanel"`, roving tabindex, horizontal arrow navigation)
3. **Disclosure / Collapsible** (`aria-expanded`, `aria-controls`, `role="region"`, `aria-labelledby`)

We subsequently installed `shadcn/ui` components based on Radix UI primitives (`@radix-ui/react-dialog`, `@radix-ui/react-tabs`), dissected their generated source code and underlying abstractions, and analyzed where manual implementations fall short compared to battle-tested headless primitives.

---

## 2. Concrete Gaps Identified

### Gap 1: True Accessibility Tree Isolation (`aria-hidden` Subtree Inversion)
* **Our Scratch Implementation:**
  Our scratch modal locks DOM keyboard focus using a `keydown` listener capturing `Tab` and `Shift+Tab`. If a keyboard user tabs through the modal, focus loops between the first and last focusable elements.
* **The Hidden Failure Mode:**
  Keyboard focus trapping does **not** trap screen readers. Assistive technologies (e.g., VoiceOver on macOS/iOS, NVDA in browse mode, JAWS virtual cursor) navigate the accessibility tree via swipe gestures or reading keys (e.g., Down Arrow, VO + Right Arrow) without firing keyboard `Tab` events. In our scratch version, a screen reader user can navigate straight out of the visual modal into the background DOM and read the rest of the application.
* **How shadcn / Radix Solves It:**
  Radix uses the `aria-hidden` micro-library under the hood. When a modal opens, Radix walks the root DOM tree and sets `aria-hidden="true"` on every top-level sibling of the modal container. It keeps an internal reference counter for nested dialogs, ensuring that background content is genuinely omitted from the assistive technology virtual buffer. When the dialog unmounts, it cleanly restores the previous `aria-hidden` states without destroying existing attributes.

---

### Gap 2: Pointer Interaction Lifecycles & Accidental Backdrop Dismissal
* **Our Scratch Implementation:**
  Our modal detects backdrop clicks using standard React `onClick` on the overlay:
  ```tsx
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };
  ```
* **The Hidden Failure Mode:**
  If a user starts a text selection or mouse drag inside the modal content and accidentally releases the mouse button outside the modal boundary on the backdrop, the browser synthesizes an `onClick` event on the backdrop (`e.target === backdrop`). This causes the dialog to abruptly close and lose all unsaved form data.
* **How shadcn / Radix Solves It:**
  Radix implements `DismissableLayer`, separating `pointerdown` from `pointerup`:
  1. It listens on `pointerdown` to record where the gesture initiated.
  2. If the interaction started *inside* the dialog content and ended *outside*, dismissal is ignored.
  3. It handles stacking context ordering: if a dropdown, tooltip, or nested dialog is open inside a modal, pressing Escape or clicking outside dismisses only the innermost active layer rather than closing the entire modal tree.

---

### Gap 3: Mobile Viewport Scroll Lock & Scrollbar Layout Shift (`react-remove-scroll`)
* **Our Scratch Implementation:**
  Our scratch modal sets `document.body.style.overflow = 'hidden'` and adjusts `paddingRight` by subtracting `document.documentElement.clientWidth` from `window.innerWidth`.
* **The Hidden Failure Mode:**
  1. **iOS Safari:** Setting `overflow: hidden` on `<body>` is notoriously ineffective in mobile Safari; users can still rubber-band scroll the background behind the modal.
  2. **Layout Jitter:** Fixed-position navigation bars and absolute headers that do not listen to standard body padding jump when scrollbars disappear.
  3. **Inner Scroll vs. Outer Scroll:** If the modal content itself is long and scrollable, naive prevent-default logic either locks the modal's internal scroll or lets scroll events bubble and scroll the background.
* **How shadcn / Radix Solves It:**
  Radix utilizes `react-remove-scroll`. It dynamically injects CSS custom properties (`--removed-body-scroll-bar-size`), intercepts `wheel` and `touchmove` events on the window, locks scroll exclusively outside the modal container, and permits normal fluid scrolling within the dialog body across all mobile and desktop webkit engines.

---

### Gap 4: Internationalization & Bidirectional Keyboard Navigation in Tabs
* **Our Scratch Implementation:**
  Our scratch `TabList` strictly listens for `ArrowRight` (index + 1) and `ArrowLeft` (index - 1).
* **The Hidden Failure Mode:**
  In Right-to-Left (RTL) languages (Arabic, Hebrew, Persian), visual horizontal order is reversed: moving to the next tab requires pressing `ArrowLeft`, while `ArrowRight` should move to the previous tab. Our scratch implementation moves backwards in RTL contexts.
* **How shadcn / Radix Solves It:**
  Radix's `RovingFocusGroup` primitive inspects the computed `dir` attribute (or inherited direction context). When `dir="rtl"`, it automatically swaps `ArrowLeft` and `ArrowRight` key handlers. Furthermore, it cleanly skips `disabled` tabs during roving focus traversal even if tab elements are conditionally rendered or rearranged at runtime.

---

### Gap 5: Focus Restoration Edge Cases (`onCloseAutoFocus`)
* **Our Scratch Implementation:**
  We capture `document.activeElement` when the modal opens and invoke `.focus()` in a cleanup hook.
* **The Hidden Failure Mode:**
  If the button that triggered the modal is destroyed, replaced, or disabled during the modal's lifecycle (e.g. "Delete item" modal that removes the item row and its trigger button from the table), `triggerRef.current.focus()` either fails or causes the browser to reset focus to `<body>`, disorienting the keyboard user.
* **How shadcn / Radix Solves It:**
  Radix provides an explicit `onCloseAutoFocus={(event) => ...}` lifecycle prop. It checks `document.contains(triggerElement)`. If the original trigger is unmounted, it allows developers to redirect focus to a fallback container or gracefully moves focus to the nearest logical sibling.

---

## 3. Summary of Lessons Learned
Building accessible components from scratch is essential for understanding the underlying mechanics of ARIA roles, composite widget keyboard contracts, and focus trapping. However, production-grade accessibility requires accounting for subtle edge cases:
- Pointer gesture origins vs. click bubbling
- Assistive technology virtual cursor navigation (`aria-hidden` subtree isolation)
- Mobile Safari scroll hijacking and scrollbar layout shifts
- Directionality (RTL) and dynamic DOM changes

Headless UI primitives like Radix (and wrappers like `shadcn/ui`) provide robust solutions to these complex edge cases while giving developers full stylistic control.
