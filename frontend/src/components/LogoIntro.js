"use client";

import { useEffect, useRef } from "react";
import { lockScroll } from "@/lib/scroll-lock";

// ---------------------------------------------------------------------------
// Logo intro
//
//   1. Pink screen.
//   2. A thin white line draws in at the centre.
//   3. The line thickens into a bar and the logo is revealed inside it.
//   4. Hold.
//   5. The bar grows to fill the screen while the REAL header logo travels to
//      its place at the top-left (and shrinks to its header size).
//   6. The header menu fades in and the pink screen dissolves.
//
// The header logo itself is the thing that moves: it is simply transformed to
// the centre at the start and animated back to where it naturally lives, using
// transforms only (no top/left animation, no fixed -> absolute switch), so the
// path is smooth and ends exactly in place.
// ---------------------------------------------------------------------------

const EASE_IO = "cubic-bezier(0.76, 0, 0.24, 1)";
const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const frame = () => new Promise((resolve) => requestAnimationFrame(() => resolve()));
const bar = (sx, sy) => `translate(-50%, -50%) scale(${sx}, ${sy})`;

export default function LogoIntro({ active, onDone }) {
  const overlayRef = useRef(null);
  const barRef = useRef(null);
  const doneRef = useRef(onDone);

  useEffect(() => {
    doneRef.current = onDone;
  });

  useEffect(() => {
    if (!active) return;

    // Reduced motion: no intro, show the header straight away.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      doneRef.current();
      return;
    }

    const overlay = overlayRef.current;
    const barEl = barRef.current;
    const header = document.querySelector("[data-site-header]");
    const logo = header?.querySelector("[data-logo]");
    if (!overlay || !barEl || !logo) {
      doneRef.current();
      return;
    }
    const menu = [...header.querySelectorAll("[data-header-ui]")];
    const img = logo.querySelector("img");

    let cancelled = false;
    let finished = false;
    const anims = [];
    const run = (el, keyframes, options) => {
      const a = el.animate(keyframes, { fill: "both", ...options });
      anims.push(a);
      return a.finished;
    };

    const resetLogo = () => {
      Object.assign(logo.style, {
        transform: "",
        transformOrigin: "",
        clipPath: "",
        visibility: "",
        willChange: "",
      });
    };

    const unlock = lockScroll();

    const finish = async () => {
      if (finished || cancelled) return;
      finished = true;
      window.clearTimeout(failSafe);
      doneRef.current(); // removes the overlay and the "intro" state from the header
      await frame();
      await frame();
      anims.forEach((a) => a.cancel());
      resetLogo();
      unlock();
    };

    // Never leave the site covered if something goes wrong.
    const failSafe = window.setTimeout(finish, 9000);

    const start = async () => {
      try {
        await img?.decode?.();
      } catch {
        /* image not decodable yet: carry on */
      }
      if (cancelled) return;

      const vw = document.documentElement.clientWidth;
      const vh = window.innerHeight;

      // Where the logo naturally sits in the header (measured before any transform)
      const r = logo.getBoundingClientRect();

      // How big it is while it sits in the middle of the screen
      const targetW = vw < 640 ? Math.min(vw * 0.72, 320) : Math.min(vw * 0.3, 440);
      const scale = targetW / r.width;
      const dx = vw / 2 - (r.left + r.width / 2);
      const dy = vh / 2 - (r.top + r.height / 2);
      const middle = `translate(${dx}px, ${dy}px) scale(${scale})`;

      const barW = targetW * 1.2;
      const barH = targetW * (r.height / r.width) * 1.18;
      const lineSy = 2 / barH;

      // Starting state
      barEl.style.width = `${barW}px`;
      barEl.style.height = `${barH}px`;
      barEl.style.transform = bar(0, lineSy);
      barEl.style.opacity = "0";
      Object.assign(logo.style, {
        transformOrigin: "50% 50%",
        transform: middle,
        clipPath: "inset(50% 0 50% 0)",
        visibility: "visible",
        willChange: "transform, clip-path",
      });

      await sleep(250);
      if (cancelled) return;

      // 2. thin line draws in
      await run(
        barEl,
        [
          { transform: bar(0, lineSy), opacity: 0 },
          { transform: bar(1, lineSy), opacity: 1 },
        ],
        { duration: 600, easing: EASE_OUT }
      );

      // 3. line thickens into the bar, logo is revealed inside it
      await Promise.all([
        run(barEl, [{ transform: bar(1, lineSy) }, { transform: bar(1, 1) }], {
          duration: 750,
          easing: EASE_IO,
        }),
        run(logo, [{ clipPath: "inset(50% 0 50% 0)" }, { clipPath: "inset(0% 0 0% 0)" }], {
          duration: 750,
          delay: 80,
          easing: EASE_IO,
        }),
      ]);

      // 4. hold
      await sleep(900);
      if (cancelled) return;

      // 5 + 6. bar fills the screen, logo flies to the header, menu arrives
      await Promise.all([
        run(
          barEl,
          [{ transform: bar(1, 1) }, { transform: bar((vw + 8) / barW, (vh + 8) / barH) }],
          { duration: 1200, easing: EASE_IO }
        ),
        run(logo, [{ transform: middle }, { transform: "translate(0px, 0px) scale(1)" }], {
          duration: 1200,
          easing: EASE_IO,
        }),
        ...menu.map((el, i) =>
          run(
            el,
            [
              { opacity: 0, visibility: "visible", transform: "translateY(-10px)" },
              { opacity: 1, visibility: "visible", transform: "translateY(0px)" },
            ],
            { duration: 600, delay: 900 + i * 80, easing: EASE_OUT }
          )
        ),
        run(overlay, [{ opacity: 1 }, { opacity: 0 }], {
          duration: 400,
          delay: 1150,
          easing: "ease-out",
        }),
      ]);

      await finish();
    };

    start().catch(() => {
      /* animations were cancelled (unmounted): nothing to do */
    });

    return () => {
      cancelled = true;
      window.clearTimeout(failSafe);
      anims.forEach((a) => a.cancel());
      resetLogo();
      unlock();
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={overlayRef}
      data-intro-overlay=""
      aria-hidden="true"
      className="fixed inset-0 z-40 bg-[#ff66c4]"
    >
      <div
        ref={barRef}
        className="absolute left-1/2 top-1/2 bg-white"
        style={{ transform: bar(0, 0) }}
      />
    </div>
  );
}
