// Blocks scrolling (wheel, touch, keyboard) while an animation is playing.
// Unlike `overflow: hidden` it doesn't remove the scrollbar, so the page never
// shifts sideways. Returns a function that releases the lock.

const SCROLL_KEYS = new Set([" ", "PageUp", "PageDown", "Home", "End", "ArrowUp", "ArrowDown"]);

const isEditable = (el) =>
  !!el && (el.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName));

export function lockScroll() {
  const stop = (e) => e.preventDefault();
  const onKey = (e) => {
    if (SCROLL_KEYS.has(e.key) && !isEditable(e.target)) e.preventDefault();
  };

  window.addEventListener("wheel", stop, { passive: false });
  window.addEventListener("touchmove", stop, { passive: false });
  window.addEventListener("keydown", onKey);

  return () => {
    window.removeEventListener("wheel", stop);
    window.removeEventListener("touchmove", stop);
    window.removeEventListener("keydown", onKey);
  };
}
