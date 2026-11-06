import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { projects } from "@/content/projects";
import { ProjectCover } from "@/components/projects/ProjectCover";
import { Reveal } from "@/components/ui/Reveal";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: "Project not found" };

  return {
    title: `${project.title} — Case study`,
    description: project.problem,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} — Case study`,
      description: project.problem,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="relative pb-24 pt-28 md:pt-32">
      <div className="shell">
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/35 transition hover:text-white/80"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          All work
        </Link>

        <header className="mt-8 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] text-white/55">
                {project.category}
              </span>
              <span className="mono text-[0.6rem] text-white/25">{project.index} / 07</span>
            </div>

            <h1 className="display mt-6 max-w-3xl text-[clamp(2.2rem,5.4vw,4.4rem)] font-semibold text-white balance">
              {project.title}
            </h1>

            <p className="mt-6 max-w-2xl text-[1rem] leading-relaxed text-white/55 pretty">
              {project.problem}
            </p>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-white/[0.09] bg-white/[0.025] px-2.5 py-1 text-[10px] text-white/45"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-5">
            <p className="mono text-[0.52rem] text-white/30">Summary</p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-white/60">{project.built}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.repo ? (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm"
                >
                  <Github className="h-3.5 w-3.5" />
                  Repository
                </a>
              ) : null}
              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Live demo
                </a>
              ) : null}
            </div>
          </div>
        </header>

        <Reveal className="mt-12">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/[0.1] md:aspect-[21/9]">
            <ProjectCover project={project} large />
          </div>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-[1.35fr_0.65fr] lg:gap-20">
          <div className="space-y-12">
            <section>
              <h2 className="font-display text-[1.5rem] font-medium tracking-[-0.03em] text-white">
                The problem
              </h2>
              <p className="mt-4 max-w-2xl text-[0.95rem] leading-[1.85] text-white/55">
                {project.problem}
              </p>
            </section>

            <section>
              <h2 className="font-display text-[1.5rem] font-medium tracking-[-0.03em] text-white">
                What I built
              </h2>
              <p className="mt-4 max-w-2xl text-[0.95rem] leading-[1.85] text-white/55">
                {project.built}
              </p>
            </section>

            <section>
              <h2 className="font-display text-[1.5rem] font-medium tracking-[-0.03em] text-white">
                Approach
              </h2>
              <ol className="mt-5 space-y-4">
                {project.approach.map((step, stepIndex) => (
                  <li key={step} className="flex gap-4">
                    <span className="mono mt-1 shrink-0 text-[0.55rem] text-white/25">
                      0{stepIndex + 1}
                    </span>
                    <span className="text-[0.93rem] leading-relaxed text-white/55">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2 className="font-display text-[1.5rem] font-medium tracking-[-0.03em] text-white">
                Outcome
              </h2>
              <p className="mt-4 max-w-2xl text-[0.95rem] leading-[1.85] text-white/55">
                {project.outcome}
              </p>
            </section>

            {project.screenshots.length > 0 ? (
              <section>
                <h2 className="font-display text-[1.5rem] font-medium tracking-[-0.03em] text-white">
                  Selected captures
                </h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {project.screenshots.map((screenshot) => (
                    <img
                      key={screenshot}
                      src={screenshot}
                      alt={`${project.title} screenshot`}
                      className="w-full rounded-xl border border-white/10"
                      loading="lazy"
                    />
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.022] p-5">
              <p className="mono text-[0.52rem] text-white/30">Project</p>
              <dl className="mt-4 space-y-3 text-[11px]">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-white/30">Category</dt>
                  <dd className="text-right text-white/65">{project.category}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-white/30">Type</dt>
                  <dd className="text-right text-white/65">Personal project</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-white/30">Stack</dt>
                  <dd className="max-w-[160px] text-right text-white/65">
                    {project.stack.join(", ")}
                  </dd>
                </div>
              </dl>

              <div className="mt-5 h-px w-full bg-white/[0.08]" />

              <Link
                href="/#projects"
                className="mt-4 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-white/40 transition hover:text-white"
              >
                Back to all work
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </aside>
        </div>

        <div className="mt-20 border-t border-white/[0.08] pt-8">
          <p className="mono text-[0.52rem] text-white/25">Next project</p>
          <Link
            href={`/projects/${next.slug}`}
            className="group mt-3 flex items-center justify-between gap-6"
          >
            <div>
              <p className="font-display text-[clamp(1.3rem,2.6vw,2rem)] font-medium tracking-[-0.03em] text-white/85 transition-colors group-hover:text-white">
                {next.title}
              </p>
              <p className="mt-1 text-[11px] text-white/35">{next.category}</p>
            </div>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 text-white/60 transition-all group-hover:border-white/40 group-hover:bg-white group-hover:text-black">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
