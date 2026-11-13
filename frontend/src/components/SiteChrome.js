"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import LogoIntro from "./LogoIntro";
import PageTransition from "./PageTransition";

// Everything that stays on screen between pages: the header, the logo intro
// and the page-transition wrapper around each page.
export default function SiteChrome({ children }) {
  const pathname = usePathname();

  // The logo intro plays only when the site is first opened on the home page.
  // (First render only: later navigation never replays it.)
  const [introStarted] = useState(pathname === "/");
  const [introDone, setIntroDone] = useState(false);
  const introActive = introStarted && !introDone;

  return (
    <>
      <Header introActive={introActive} />
      <PageTransition>{children}</PageTransition>
      <LogoIntro active={introActive} onDone={() => setIntroDone(true)} />
    </>
  );
}
