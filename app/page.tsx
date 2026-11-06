import fs from "node:fs";
import path from "node:path";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Education } from "@/components/Education";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";
import { certificates } from "@/content/certifications";

function assetExists(asset: string | null): boolean {
  if (!asset) return false;
  const relative = asset.startsWith("/") ? asset.slice(1) : asset;
  try {
    return fs.existsSync(path.join(process.cwd(), "public", relative));
  } catch {
    return false;
  }
}

export default function HomePage() {
  const hasHeroPortrait = assetExists("/assets/portraits/hero-portrait.jpg");
  const hasAboutPortrait = assetExists("/assets/portraits/about-portrait.jpg");

  const availableCertificates = certificates
    .map((certificate) => certificate.image)
    .filter((image): image is string => Boolean(image) && assetExists(image));

  return (
    <>
      <Hero hasPortrait={hasHeroPortrait} />
      <About hasPortrait={hasAboutPortrait} />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Certifications availableImages={availableCertificates} />
      <Contact />
    </>
  );
}
