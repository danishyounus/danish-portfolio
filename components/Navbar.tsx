"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { useMotionPref } from "@/components/MotionProvider";

const nav = site.nav.filter((item) => item.id !== "home");

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const reduce = useReducedMotion();
  const { motionOn } = useMotionPref();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const ids = site.nav.map((item) => item.id);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRect.height - a.intersectionRect.height)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={cn(
            "transition-all duration-500",
            scrolled
              ? "border-b border-white/[0.06] bg-[#050507]/72 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent"
          )}
        >
          <div className="shell flex h-[72px] items-center justify-between gap-6">
            <Link
              href="/"
              className="group flex items-center gap-2.5"
              aria-label="Mohammed Danish Y. — home"
              onClick={() => setOpen(false)}
            >
              <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.04]">
                <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_25%,rgba(167,139,250,0.5),transparent_65%)] opacity-70" />
                <span className="relative font-display text-[11px] font-semibold tracking-[-0.02em] text-white">
                  MD
                </span>
              </span>
              <span className="font-display text-[15px] font-medium tracking-[-0.02em] text-white/90">
                Danish
                <span className="text-electric">.</span>
              </span>
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
              {nav.map((item) => {
                const isActive = isHome && active === item.id;
                return (
                  <Link
                    key={item.id}
                    href={`/#${item.id}`}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-[12.5px] font-medium transition-colors duration-300",
                      isActive ? "text-white" : "text-white/50 hover:text-white/90"
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.055]"
                        transition={{ type: "spring", stiffness: 320, damping: 30 }}
                      />
                    ) : null}
                    <span className="relative">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <div className="hidden md:block">
                <Link
                  href="/#contact"
                  className={cn(
                    "btn btn-ghost btn-sm whitespace-nowrap transition-opacity duration-300",
                    open && "pointer-events-none opacity-0"
                  )}
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-electric" />
                  </span>
                  Let&rsquo;s talk
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
                </Link>
              </div>

              <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/80 transition hover:border-white/20 hover:text-white lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        <motion.div
          className="h-px origin-left bg-gradient-to-r from-transparent via-electric to-violet"
          style={{ scaleX: reduce || !motionOn ? 1 : progress, opacity: scrolled ? 1 : 0 }}
          aria-hidden="true"
        />
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-[#050507]/96 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex-1 overflow-y-auto px-6 pb-10 pt-28">
              <nav aria-label="Mobile" className="flex flex-col">
                {site.nav.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + index * 0.045, duration: 0.5 }}
                  >
                    <Link
                      href={`/#${item.id}`}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline justify-between border-b border-white/[0.07] py-4"
                    >
                      <span className="font-display text-2xl font-medium tracking-[-0.03em] text-white/90 group-hover:text-white">
                        {item.label}
                      </span>
                      <span className="mono text-[10px] text-white/30">
                        0{index + 1}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-8 flex items-center justify-between text-xs text-white/40">
                <span>Bengaluru, India</span>
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-violet" />
                  Portfolio 2026
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  const target = document.querySelector("[data-motion-toggle]");
                  target?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className="mt-6 text-left text-xs text-white/35 underline decoration-white/20 underline-offset-4"
              >
                Motion settings
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
