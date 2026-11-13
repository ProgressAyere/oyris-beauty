"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { lockScroll } from "@/lib/scroll-lock";

// ---------------------------------------------------------------------------
// Page transition (modelled on the Kanvas reference)
//
//   OUT   the current page shrinks into a rounded card, its content fades
//         out, then the card swings away like a wheel turning.
//   IN    a fresh card swings in from the other side and settles, the new
//         page's content fades up inside it, then the card expands to full
//         screen.
//
// The header stays put the whole time. Works the same on desktop and mobile.
// Links are picked up automatically (no need to change <Link> anywhere).
//
// Colours live in globals.css:  --pt-stage (behind the card)  --pt-card (the card)
// ---------------------------------------------------------------------------

const CARD_SCALE = 0.92; // size of the card while it swings (1 = full screen)
const CARD_RADIUS = 28; // corner radius of the card, in px
const SWING_ANGLE = 58; // how far the card swings away / in, in degrees
const SPEED = 1; // 1 = as designed, 1.25 = faster, 0.8 = slower

const EASE_IO = "cubic-bezier(0.76, 0, 0.24, 1)";
const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";

const ms = (n) => n / SPEED;
const sleep = (n) => new Promise((resolve) => setTimeout(resolve, n));
const frames = async (n) => {
  for (let i = 0; i < n; i++) await new Promise((resolve) => requestAnimationFrame(() => resolve()));
};

// The "card" is the part of the page you can see below the header.
// Measured in the page shell's own coordinates so it also works mid-scroll.
function measure(shell) {
  const header = document.querySelector("[data-site-header]");
  const headerBottom = header ? Math.max(0, header.getBoundingClientRect().bottom) : 0;
  const rect = shell.getBoundingClientRect();
  const vw = document.documentElement.clientWidth;
  const vh = window.innerHeight;
  const top = headerBottom - rect.top;
  const height = vh - headerBottom;
  const cx = vw / 2;
  const cy = top + height / 2;
  return {
    top,
    height,
    bottom: Math.max(0, rect.height - top - height),
    cx,
    cy,
    // the card swings around a point below the screen, like a turning wheel
    px: cx,
    py: cy + height,
  };
}

// scale about the card centre, then rotate about the wheel's pivot
const cardTransform = (g, scale, angle) =>
  `translate(${g.px}px, ${g.py}px) rotate(${angle}deg) translate(${-g.px}px, ${-g.py}px) ` +
  `translate(${g.cx}px, ${g.cy}px) scale(${scale}) translate(${-g.cx}px, ${-g.cy}px)`;

// clip the page to the card shape (rounded rectangle)
const cardClip = (g, radius) => `inset(${g.top}px 0px ${g.bottom}px 0px round ${radius}px)`;

export default function PageTransition({ children }) {
  const router = useRouter();
  const routerRef = useRef(router);
  const stageRef = useRef(null);
  const shellRef = useRef(null);
  const cardRef = useRef(null);
  const contentRef = useRef(null);
  const busyRef = useRef(false);

  useEffect(() => {
    routerRef.current = router;
  });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const waitForUrl = async (target) => {
      const wanted = target.pathname + target.search;
      const started = performance.now();
      while (location.pathname + location.search !== wanted && performance.now() - started < 3000) {
        await sleep(16);
      }
    };

    const go = async (target) => {
      const stage = stageRef.current;
      const shell = shellRef.current;
      const card = cardRef.current;
      const content = contentRef.current;
      if (!stage || !shell || !card || !content) {
        routerRef.current.push(target.pathname + target.search + target.hash);
        return;
      }

      busyRef.current = true;
      window.dispatchEvent(new Event("oyris:navigate-start"));

      const html = document.documentElement;
      const unlock = lockScroll();
      const anims = [];
      const run = (el, keyframes, options) => {
        const a = el.animate(keyframes, { fill: "both", ...options });
        anims.push(a);
        return a.finished;
      };
      const clearAnims = () => anims.splice(0).forEach((a) => a.cancel());

      html.setAttribute("data-pt-active", "");
      stage.style.visibility = "visible";
      Object.assign(shell.style, {
        transformOrigin: "0 0",
        willChange: "transform, clip-path",
        pointerEvents: "none",
      });

      try {
        // ---------------- OUT ----------------
        let g = measure(shell);
        card.style.top = `${g.top}px`;
        card.style.height = `${g.height}px`;

        // A. the page shrinks into a card and its content fades to a blank card
        await Promise.all([
          run(
            shell,
            [
              { transform: cardTransform(g, 1, 0), clipPath: cardClip(g, 0) },
              { transform: cardTransform(g, CARD_SCALE, 0), clipPath: cardClip(g, CARD_RADIUS) },
            ],
            { duration: ms(440), easing: EASE_IO }
          ),
          run(card, [{ opacity: 0 }, { opacity: 1 }], {
            duration: ms(360),
            delay: ms(50),
            easing: "ease-in-out",
          }),
        ]);

        // B. the card swings away
        await run(
          shell,
          [
            { transform: cardTransform(g, CARD_SCALE, 0), clipPath: cardClip(g, CARD_RADIUS) },
            { transform: cardTransform(g, 1, -SWING_ANGLE), clipPath: cardClip(g, CARD_RADIUS) },
          ],
          { duration: ms(480), easing: EASE_IO }
        );

        // ---------------- swap the page while nothing is on screen ----------------
        shell.style.visibility = "hidden";
        routerRef.current.push(target.pathname + target.search + target.hash);
        await waitForUrl(target);
        await frames(2); // let React paint the new page
        clearAnims();
        window.scrollTo(0, 0);
        await frames(2);

        // ---------------- IN ----------------
        g = measure(shell);
        card.style.top = `${g.top}px`;
        card.style.height = `${g.height}px`;
        card.style.opacity = "1";
        shell.style.visibility = "visible";

        // C. a fresh card swings in and settles
        await run(
          shell,
          [
            { transform: cardTransform(g, 1, SWING_ANGLE), clipPath: cardClip(g, CARD_RADIUS) },
            { transform: cardTransform(g, CARD_SCALE, 0), clipPath: cardClip(g, CARD_RADIUS) },
          ],
          { duration: ms(620), easing: EASE_OUT }
        );

        // D. a beat, then the new page's content fades up inside the card
        await sleep(ms(80));
        run(card, [{ opacity: 1 }, { opacity: 0 }], { duration: ms(450), easing: "ease-out" });
        run(
          content,
          [{ transform: "translateY(36px)" }, { transform: "translateY(0px)" }],
          { duration: ms(650), easing: EASE_OUT }
        );
        await sleep(ms(200));

        // E. the card expands to full screen
        await run(
          shell,
          [
            { transform: cardTransform(g, CARD_SCALE, 0), clipPath: cardClip(g, CARD_RADIUS) },
            { transform: cardTransform(g, 1, 0), clipPath: cardClip(g, 0) },
          ],
          { duration: ms(560), easing: EASE_IO }
        );
      } finally {
        clearAnims();
        Object.assign(shell.style, {
          transform: "",
          transformOrigin: "",
          clipPath: "",
          willChange: "",
          pointerEvents: "",
          visibility: "",
        });
        card.style.opacity = "";
        card.style.top = "";
        card.style.height = "";
        stage.style.visibility = "";
        html.removeAttribute("data-pt-active");
        unlock();
        busyRef.current = false;
      }
    };

    // Pick up every internal link click (Next <Link> or plain <a>)
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const a = e.target.closest?.("a[href]");
      if (!a) return;
      if (a.hasAttribute("download") || (a.target && a.target !== "_self")) return;

      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return; // external, mailto:, tel:, ...
      if (url.pathname === location.pathname && url.search === location.search) return; // same page / #hash

      if (busyRef.current) {
        e.preventDefault(); // a transition is already running
        e.stopPropagation();
        return;
      }
      if (reduced.matches) return; // reduced motion: normal instant navigation

      e.preventDefault();
      e.stopPropagation();
      go(url);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <>
      <div ref={stageRef} className="pt-stage" aria-hidden="true" />
      <div ref={shellRef} className="pt-shell">
        <div ref={cardRef} className="pt-card" aria-hidden="true" />
        <div ref={contentRef} className="pt-content">
          {children}
        </div>
      </div>
    </>
  );
}
