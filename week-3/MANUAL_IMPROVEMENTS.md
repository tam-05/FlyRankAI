# Manual Improvements, Corrections & Refactorings

During code review and verification of AI-generated implementations, several critical flaws, domain bugs, and runtime discrepancies were caught and manually corrected.

---

## 1. Domain Logic: Inverted SERP Rank Calculation Bug
### The Flaw:
The initial AI-generated code treated numeric rank changes like standard quantitative metrics (assuming higher numbers indicate growth):
```javascript
// AI initial naive logic:
const diff = current - previous;
if (diff > 0) return `+${diff} Gained`; // BUG: Moving from #2 to #5 showed as "+3 Gained"!
```
### Manual Correction:
In search engine ranking (SERP), **lower ranks are superior** (e.g. Rank #1 is the top organic result). An increase in number indicates a drop in search visibility.
```javascript
// Corrected Domain Logic:
if (current < previous) {
  const diff = previous - current;
  return <span className="rank-change-pill change-gain">▲ +{diff}</span>;
}
if (current > previous) {
  const diff = current - previous;
  return <span className="rank-change-pill change-drop">▼ -{diff}</span>;
}
return <span className="rank-change-pill change-stable">— 0</span>;
```
We also updated the 7-day trajectory chart coordinate algorithm so that Rank #1 plots at the visual peak of the chart and higher numbers descend towards the bottom.

---

## 2. Test Execution: Node.js 26 `localStorage` Runtime Failure
### The Flaw:
In Node.js v26.3, running `npm test` failed across all integration tests with:
`TypeError: Cannot read properties of undefined (reading 'clear')`
`ExperimentalWarning: localStorage is not available because --localstorage-file was not provided.`
The AI had simply called `localStorage.clear()` in test suites assuming standard browser availability.

### Manual Correction:
Refactored `src/setupTests.js` to define an isolated in-memory storage mock and safely attach it to both `globalThis` and `window`:
```javascript
const localStorageMock = (function () {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = String(value); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true,
  configurable: true,
});
```

---

## 3. Asynchronous Test Race Condition
### The Flaw:
The AI added a realistic network delay simulation in `AddKeywordModal.jsx` (`await new Promise((r) => setTimeout(r, 300))`), but in the corresponding integration test, it executed a synchronous assertion immediately after the click event:
```javascript
// AI code:
fireEvent.click(submitBtn);
expect(screen.getByText('generative ai brand protection')).toBeInTheDocument(); // FAILED: DOM had not updated yet
```

### Manual Correction:
Refactored the test to be asynchronous, wrapped the assertion inside React Testing Library's `waitFor`, and imported `waitFor` into the test module:
```javascript
// Corrected test:
fireEvent.click(submitBtn);
await waitFor(() => {
  expect(screen.getByText('generative ai brand protection')).toBeInTheDocument();
});
```

---

## 4. Accessibility & Modal Keyboard Trapping
### The Flaw:
The initial AI modal was purely visual. Pressing the `Escape` key did not dismiss the dialog, and focus remained stranded on whichever background element triggered the modal opening.

### Manual Correction:
1. Bound an active `keydown` listener listening for `e.key === 'Escape'` to invoke `onClose()`.
2. Created a programmatic `firstInputRef` that triggers `.focus()` automatically when `isOpen === true`.
3. Applied `role="dialog"`, `aria-modal="true"`, and `aria-labelledby="modal-title"` to conform to WCAG 2.1 AA dialog guidelines.
