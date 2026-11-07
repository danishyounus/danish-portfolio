"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, X } from "lucide-react";
import {
  certCategories,
  certificates,
  type CertCategoryId,
  type Certificate,
} from "@/content/certifications";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { IssuerMark } from "@/components/certifications/IssuerMark";
import { cn, formatDate, isExpired } from "@/lib/utils";

type Filter = CertCategoryId | "all";

function shortDate(iso: string | null) {
  if (!iso) return null;
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

/** Single-letter seal for the credential placeholder cover. */
const issuerInitials: Record<string, string> = {
  "scrum.org": "S",
  walkme: "W",
  tata: "T",
  "british-airways": "BA",
  "hp-life": "HP",
  cranes: "CV",
};

export function Certifications({ availableImages }: { availableImages: string[] }) {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<Certificate | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? certificates : certificates.filter((item) => item.category === filter)),
    [filter]
  );

  const counts = useMemo(() => {
    return certCategories.reduce<Record<string, number>>((acc, category) => {
      acc[category.id] = certificates.filter((item) => item.category === category.id).length;
      return acc;
    }, {});
  }, []);

  useEffect(() => {
    if (!active) return;
    lastFocused.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      lastFocused.current?.focus?.();
    };
  }, [active]);

  return (
    <section id="certifications" className="section relative">
      <div className="shell">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            index="06"
            kicker="Credentials"
            title="Credentials, separated by what they actually are."
            lede="Professional certifications, platform credentials, job simulations and coursework — each labelled honestly."
          />

          <p className="mono text-[0.55rem] text-white/25">
            {certificates.length} records · {certCategories.length} categories
          </p>
        </div>

        {/* ---------------------------------------------------------- filters */}
        <div className="mt-10 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={cn(
              "relative shrink-0 rounded-full px-3.5 py-2 text-[10.5px] transition-colors",
              filter === "all" ? "text-white" : "text-white/40 hover:text-white/70"
            )}
          >
            {filter === "all" ? (
              <motion.span
                layoutId="cert-filter"
                className="absolute inset-0 rounded-full border border-white/12 bg-white/[0.06]"
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
              />
            ) : null}
            <span className="relative">All records</span>
          </button>

          {certCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setFilter(category.id)}
              className={cn(
                "relative shrink-0 rounded-full px-3.5 py-2 text-[10.5px] transition-colors",
                filter === category.id ? "text-white" : "text-white/40 hover:text-white/70"
              )}
            >
              {filter === category.id ? (
                <motion.span
                  layoutId="cert-filter"
                  className="absolute inset-0 rounded-full border border-white/12 bg-white/[0.06]"
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                />
              ) : null}
              <span className="relative">
                {category.short}
                <span className="ml-1.5 text-[9px] text-white/25">{counts[category.id]}</span>
              </span>
            </button>
          ))}
        </div>

        {/* ------------------------------------------------------------ grid */}
        <motion.div layout className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((cert) => {
              const hasImage = Boolean(cert.image && availableImages.includes(cert.image));
              const expired = isExpired(cert.expires);
              const category = certCategories.find((item) => item.id === cert.category);

              return (
                <motion.button
                  key={cert.id}
                  layout
                  type="button"
                  onClick={() => setActive(cert)}
                  initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                  className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.022] text-left transition-colors duration-500 hover:border-white/[0.2] hover:bg-white/[0.04]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0a10]">
                    {hasImage ? (
                      <img
                        src={cert.image as string}
                        alt={`${cert.title} certificate`}
                        loading="lazy"
                        className="h-full w-full object-cover object-top brightness-[0.82] transition-all duration-700 group-hover:scale-[1.02] group-hover:brightness-100"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(91,140,255,0.18),transparent_58%),radial-gradient(circle_at_10%_100%,rgba(167,139,250,0.12),transparent_60%),linear-gradient(160deg,#0c0c15,#07070b)]">
                        <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:38px_38px]" />
                        <div className="absolute inset-3 rounded-lg border border-white/[0.07]" />

                        <div className="absolute inset-0 grid place-items-center">
                          <div className="relative grid h-[72px] w-[72px] place-items-center rounded-full border border-white/[0.14] bg-white/[0.025]">
                            <span className="absolute -inset-2.5 rounded-full border border-white/[0.055]" />
                            <span className="font-serif text-[1.55rem] italic leading-none text-white/70">
                              {issuerInitials[cert.issuerMark] ?? "•"}
                            </span>
                          </div>
                        </div>

                        <div className="absolute inset-x-5 bottom-4 flex items-end justify-between gap-3">
                          <div>
                            <p className="text-[8px] uppercase tracking-[0.2em] text-white/30">
                              Certificate
                            </p>
                            <p className="mt-1 text-[10px] text-white/45">Available on request</p>
                          </div>
                          <span className="mono text-[8px] text-white/25">
                            {cert.issued ? cert.issued.slice(0, 4) : "Coursework"}
                          </span>
                        </div>
                      </div>
                    )}

                    {hasImage ? (
                      <div className="absolute inset-0 bg-gradient-to-t from-[#08080c]/90 via-transparent to-transparent" />
                    ) : null}

                    <span className="absolute left-3 top-3 rounded-full border border-white/12 bg-black/40 px-2.5 py-1 text-[8.5px] uppercase tracking-[0.16em] text-white/60 backdrop-blur">
                      {category?.short}
                    </span>

                    <span className="absolute bottom-3 right-3 translate-y-2 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-[9px] uppercase tracking-[0.16em] text-white/80 opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      View
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <IssuerMark mark={cert.issuerMark} />
                      {expired ? (
                        <span className="text-[8.5px] uppercase tracking-[0.14em] text-amber-200/60">
                          Renewal due
                        </span>
                      ) : cert.expires ? (
                        <span className="text-[8.5px] uppercase tracking-[0.14em] text-emerald-200/50">
                          Valid to {shortDate(cert.expires)}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-4 line-clamp-2 font-display text-[15px] font-medium leading-snug tracking-[-0.01em] text-white/85">
                      {cert.title}
                    </h3>

                    <p className="mt-1.5 text-[10.5px] text-white/35">
                      {cert.issuedLabel ?? "Completion date not recorded"}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <Reveal delay={0.1} className="mt-6">
          <p className="text-[10px] leading-relaxed text-white/25">
            WalkMe credentials carry expiry dates; the status shown is derived from the certificate.
            Cranes Varsity is a PG Diploma, kept separate from professional certifications.
          </p>
        </Reveal>
      </div>

      {/* ------------------------------------------------------------ lightbox */}
      <AnimatePresence>
        {active ? (
          <CertificateLightbox
            cert={active}
            hasImage={Boolean(active.image && availableImages.includes(active.image))}
            closeRef={closeRef}
            onClose={() => setActive(null)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function CertificateLightbox({
  cert,
  hasImage,
  closeRef,
  onClose,
}: {
  cert: Certificate;
  hasImage: boolean;
  closeRef: React.RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const expired = isExpired(cert.expires);

  async function copyId() {
    if (!cert.credentialId) return;
    try {
      await navigator.clipboard.writeText(cert.credentialId);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be blocked; the ID is still visible and selectable.
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      role="presentation"
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${cert.title} — certificate details`}
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.99 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-white/12 bg-[#0a0a10] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/50 text-white/70 backdrop-blur transition hover:border-white/30 hover:text-white"
          aria-label="Close certificate"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid md:grid-cols-[1.25fr_0.75fr]">
          <div className="flex min-h-[280px] items-center justify-center border-b border-white/[0.08] bg-[#050507] p-5 md:border-b-0 md:border-r">
            {hasImage ? (
              <img
                src={cert.image as string}
                alt={`${cert.title} certificate issued to Mohammed Danish Y.`}
                className="max-h-[62vh] w-auto max-w-full rounded-md border border-white/10 object-contain shadow-2xl"
              />
            ) : (
              <div className="w-full max-w-sm rounded-xl border border-white/[0.1] bg-[radial-gradient(circle_at_30%_0%,rgba(91,140,255,0.18),transparent_60%)] p-6">
                <IssuerMark mark={cert.issuerMark} />
                <p className="mt-8 font-display text-xl leading-snug text-white/80">{cert.title}</p>
                <p className="mt-2 text-[11px] text-white/40">Mohammed Danish Y.</p>
                <div className="mt-8 space-y-2 border-t border-white/10 pt-4 text-[10px] text-white/35">
                  <p>Issuer · {cert.issuer}</p>
                  {cert.issuedLabel ? <p>Issued · {cert.issuedLabel}</p> : null}
                  {cert.credentialId ? <p className="break-all">ID · {cert.credentialId}</p> : null}
                </div>
                <p className="mt-6 text-[9px] uppercase tracking-[0.16em] text-white/20">
                  Original certificate available on request
                </p>
              </div>
            )}
          </div>

          <div className="p-6 md:p-7">
            <p className="mono text-[0.52rem] text-white/30">Credential</p>
            <h3 className="mt-2 font-display text-xl font-medium leading-snug tracking-[-0.02em] text-white">
              {cert.title}
            </h3>
            <p className="mt-2 text-[11.5px] text-white/40">{cert.issuer}</p>

            <dl className="mt-6 space-y-4 border-t border-white/[0.08] pt-5 text-[11px]">
              <div>
                <dt className="text-white/30">Issued</dt>
                <dd className="mt-0.5 text-white/70">{cert.issuedLabel ?? "Not recorded"}</dd>
              </div>

              {cert.expires ? (
                <div>
                  <dt className="text-white/30">Expires</dt>
                  <dd className={cn("mt-0.5", expired ? "text-amber-200/70" : "text-white/70")}>
                    {formatDate(cert.expires)}
                    {expired ? " · renewal due" : ""}
                  </dd>
                </div>
              ) : null}

              {cert.credentialId ? (
                <div>
                  <dt className="text-white/30">Credential ID</dt>
                  <dd className="mt-1 flex items-start gap-2">
                    <code className="break-all rounded bg-white/[0.04] px-2 py-1 font-mono text-[9.5px] leading-relaxed text-white/55">
                      {cert.credentialId}
                    </code>
                    <button
                      type="button"
                      onClick={copyId}
                      className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded border border-white/10 text-white/40 transition hover:text-white"
                      aria-label="Copy credential ID"
                    >
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </button>
                  </dd>
                </div>
              ) : null}

              {cert.verificationCode ? (
                <div>
                  <dt className="text-white/30">Verification code</dt>
                  <dd className="mt-1 break-all font-mono text-[9.5px] text-white/55">
                    {cert.verificationCode}
                  </dd>
                </div>
              ) : null}
            </dl>

            {cert.verificationUrl ? (
              <a
                href={cert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-[10.5px] text-electric transition hover:text-white"
              >
                {cert.verificationLabel ?? "Verify credential"}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ) : null}

            {cert.note ? (
              <p className="mt-5 border-t border-white/[0.08] pt-4 text-[10px] leading-relaxed text-white/30">
                {cert.note}
              </p>
            ) : null}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
