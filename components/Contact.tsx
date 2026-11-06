"use client";

import { ArrowUpRight, Download, MapPin } from "lucide-react";
import { personal } from "@/content/personal";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ContactForm";

const socialIcons: Record<string, string> = {
  linkedin: "LinkedIn",
  github: "GitHub",
  kaggle: "Kaggle",
  tableau: "Tableau Public",
};

export function Contact() {
  const socials = personal.socials.filter((social) => social.visible && social.url);

  return (
    <section id="contact" className="section relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[520px] bg-[radial-gradient(ellipse_at_50%_100%,rgba(91,140,255,0.14),transparent_65%)]"
      />

      <div className="shell relative">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div>
            <SectionHeading
              index="07"
              kicker="Contact"
              title="Let's build something people actually use."
              lede="Open to conversations about data, digital adoption, AI-enabled products and transformation work."
            />

            <Reveal delay={0.1} className="mt-10">
              <dl className="space-y-4 border-t border-white/[0.08] pt-6 text-[12px]">
                <div className="flex items-start justify-between gap-6">
                  <dt className="text-white/30">Based in</dt>
                  <dd className="flex items-center gap-1.5 text-right text-white/70">
                    <MapPin className="h-3.5 w-3.5 text-white/30" />
                    {personal.location}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-6">
                  <dt className="text-white/30">Currently</dt>
                  <dd className="text-right text-white/70">
                    {personal.current.role} · {personal.current.employer}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-6">
                  <dt className="text-white/30">Timezone</dt>
                  <dd className="text-right text-white/70">IST · UTC +5:30</dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.14} className="mt-8">
              <p className="mono text-[0.52rem] text-white/30">Areas of interest</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {personal.interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10.5px] text-white/50"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.18} className="mt-8 flex flex-wrap gap-4">
              <a
                href="/resume"
                className="inline-flex items-center gap-2 text-[11px] text-white/50 transition hover:text-white"
              >
                <Download className="h-3.5 w-3.5" />
                Résumé
              </a>
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[11px] text-white/50 transition hover:text-white"
                >
                  {socialIcons[social.id] ?? social.label}
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              ))}
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="glass relative overflow-hidden rounded-2xl p-6 md:p-8">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
              />
              <div className="mb-7 flex items-center justify-between gap-4">
                <div>
                  <p className="mono text-[0.52rem] text-white/30">Enquiry</p>
                  <h3 className="mt-1 font-display text-lg font-medium text-white">
                    Start a conversation
                  </h3>
                </div>
                <span className="flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-[9px] uppercase tracking-[0.14em] text-white/35">
                  <span className="h-1 w-1 rounded-full bg-emerald-400" />
                  Form
                </span>
              </div>

              <ContactForm />

              <p className="mt-6 border-t border-white/[0.07] pt-4 text-[9.5px] leading-relaxed text-white/20">
                {personal.fullName} · {personal.location} · Direct email is not published to avoid
                scraping.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
