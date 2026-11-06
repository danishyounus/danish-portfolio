import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { personal } from "@/content/personal";
import { experience } from "@/content/experience";
import { education, additionalLearning } from "@/content/education";
import { skillTiers } from "@/content/skills";
import { projects } from "@/content/projects";
import { certCategories, certificates } from "@/content/certifications";
import { PrintButton } from "@/components/resume/PrintButton";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Résumé of Mohammed Danish Y. — Technology Analyst working across data analytics, digital adoption and experience design.",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <div className="pb-20 pt-28 md:pt-32">
      <div className="shell">
        <div className="no-print mx-auto flex max-w-[900px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/35 transition hover:text-white/80"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to portfolio
          </Link>

          <div className="flex flex-col items-start gap-2 sm:items-end">
            <PrintButton />
            <p className="text-[9.5px] text-white/25">
              Choose &ldquo;Save as PDF&rdquo; in the print dialog.
            </p>
          </div>
        </div>

        <article className="print-sheet mx-auto mt-8 max-w-[900px] rounded-lg bg-[#f7f7f4] p-8 text-[#151515] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] md:p-12">
          {/* --------------------------------------------------------- header */}
          <header className="border-b border-black/15 pb-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="font-display text-[2rem] font-semibold leading-none tracking-[-0.045em] md:text-[2.5rem]">
                  {personal.fullName}
                </h1>
                <p className="mt-2 text-[12px] font-medium text-black/70">{personal.title}</p>
              </div>
              <div className="text-[10.5px] leading-relaxed text-black/55 sm:text-right">
                <p>{personal.location}</p>
                <p>Contact details available on request</p>
              </div>
            </div>
          </header>

          {/* --------------------------------------------------------- profile */}
          <section className="print-break mt-6">
            <h2 className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/40">
              Profile
            </h2>
            <p className="mt-2 max-w-3xl text-[10.8px] leading-[1.7] text-black/70">
              {personal.intro[0]} {personal.intro[1]}
            </p>
          </section>

          {/* ------------------------------------------------------ experience */}
          <section className="print-break mt-7">
            <h2 className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/40">
              Experience
            </h2>

            <div className="mt-3">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <p className="text-[12.5px] font-semibold text-black/85">
                    {experience.role} — {experience.employer}
                  </p>
                  <p className="text-[10px] text-black/55">{experience.area}</p>
                </div>
                <p className="text-[10px] text-black/55">
                  {experience.start} — {experience.end} · {experience.location}
                </p>
              </div>

              <div className="mt-4 space-y-4">
                {experience.engagements.map((engagement) => (
                  <div key={engagement.id} className="print-break">
                    <p className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-black/70">
                      {engagement.industry}
                    </p>
                    <ul className="mt-1.5 space-y-1">
                      {engagement.responsibilities.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-[10.3px] leading-[1.55] text-black/65"
                        >
                          <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-black/30" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------- skills */}
          <section className="print-break mt-7">
            <h2 className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/40">
              Skills
            </h2>
            <div className="mt-3 space-y-2">
              {skillTiers.map((tier) => (
                <div key={tier.id} className="grid gap-1 sm:grid-cols-[110px_1fr]">
                  <p className="text-[9.5px] font-semibold uppercase tracking-[0.08em] text-black/55">
                    {tier.label}
                  </p>
                  <p className="text-[10.3px] leading-relaxed text-black/65">
                    {tier.skills.map((skill) => skill.name).join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ------------------------------------------------------- education */}
          <section className="print-break mt-7">
            <h2 className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/40">
              Education
            </h2>
            <div className="mt-3 space-y-2.5">
              {education.map((degree) => (
                <div key={degree.id} className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <p className="text-[11px] font-semibold text-black/80">
                      {degree.qualification}
                    </p>
                    <p className="text-[10px] text-black/55">
                      {degree.institution}, {degree.location}
                    </p>
                  </div>
                  <p className="text-[10px] text-black/55">{degree.year}</p>
                </div>
              ))}
              <div className="pt-1">
                <p className="text-[10.5px] text-black/60">
                  {additionalLearning.title} — {additionalLearning.provider} (coursework:{" "}
                  {additionalLearning.modules.join(", ")})
                </p>
              </div>
            </div>
          </section>

          {/* -------------------------------------------------- certifications */}
          <section className="print-break mt-7">
            <h2 className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/40">
              Certifications &amp; Learning
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {certCategories.map((category) => {
                const items = certificates.filter((cert) => cert.category === category.id);
                if (items.length === 0) return null;
                return (
                  <div key={category.id}>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-black/45">
                      {category.label}
                    </p>
                    <ul className="mt-1.5 space-y-1.5">
                      {items.map((cert) => (
                        <li key={cert.id} className="text-[10px] leading-snug text-black/65">
                          <span className="font-medium text-black/75">{cert.title}</span>
                          <span className="block text-[9px] text-black/45">
                            {cert.issuer}
                            {cert.issuedLabel ? ` · ${cert.issuedLabel}` : ""}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>

          {/* --------------------------------------------------------- projects */}
          <section className="print-break mt-7">
            <h2 className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/40">
              Selected Projects
            </h2>
            <ul className="mt-3 space-y-2">
              {projects.map((project) => (
                <li key={project.slug} className="text-[10.2px] leading-snug text-black/65">
                  <span className="font-semibold text-black/80">{project.title}</span>
                  <span className="text-black/45"> — {project.stack.join(", ")}</span>
                  <span className="block text-[9.5px] text-black/50">{project.built}</span>
                </li>
              ))}
            </ul>
          </section>

          <footer className="mt-8 border-t border-black/15 pt-3 text-[8.5px] text-black/40">
            {personal.fullName} · {personal.title} · {personal.location}
          </footer>
        </article>
      </div>
    </div>
  );
}
