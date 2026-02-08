"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ContactCardModal } from "./ContactCardModal";

const ALTERNATE_PHRASES = ["stay curious.", "create boldly."];
const MAIN_PHRASE = "don't be boring.";

const PORTFOLIO_URL =
  "https://drive.google.com/drive/folders/16mdFkMqHBzXPm0BJ3-SlB5CPGOxCDck3?usp=drive_link";
const LINKEDIN_URL = "https://www.linkedin.com/in/gabrieldurodesign/";

const CONTACT_EMAIL = "dalimusashi@gmail.com";
const CONTACT_IMAGE_SRC = "/contact.jpg"; // put this file in /public/contact.jpg

export function InteractiveHeadline() {
  const [text, setText] = useState(MAIN_PHRASE);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const phraseIndexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!window.matchMedia("(pointer: fine)").matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleClick = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const nextPhrase =
      ALTERNATE_PHRASES[phraseIndexRef.current % ALTERNATE_PHRASES.length];
    setText(nextPhrase);
    phraseIndexRef.current += 1;

    timeoutRef.current = setTimeout(() => setText(MAIN_PHRASE), 2000);
  };

  return (
    <div className="parallax-container relative flex flex-col items-center justify-center h-full w-full select-none">
      <h1
        onClick={handleClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={cn(
          "parallax-element font-headline font-normal tracking-tighter text-6xl md:text-8xl lg:text-9xl cursor-pointer transition-transform duration-300 ease-out text-center",
          isHovering ? "opacity-90" : "opacity-100"
        )}
        style={{ transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)` }}
      >
        {text}
      </h1>

      <nav className="mt-12 flex flex-wrap justify-center gap-8 md:gap-12 text-sm tracking-widest uppercase font-light">
        <a
          href={PORTFOLIO_URL}
          className="hover:underline underline-offset-8 transition-all opacity-60 hover:opacity-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          Portfolio
        </a>

        <a
          href={LINKEDIN_URL}
          className="hover:underline underline-offset-8 transition-all opacity-60 hover:opacity-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>

        <button
          onClick={() => setIsContactOpen(true)}
          className="hover:underline underline-offset-8 transition-all opacity-60 hover:opacity-100 uppercase tracking-widest font-light"
          type="button"
        >
          Contact
        </button>
      </nav>

      <ContactCardModal
        open={isContactOpen}
        onOpenChange={setIsContactOpen}
        email={CONTACT_EMAIL}
        imageSrc={CONTACT_IMAGE_SRC}
      />
    </div>
  );
}
