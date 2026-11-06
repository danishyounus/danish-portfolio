import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[80svh] items-center justify-center px-6 pt-24">
      <div className="max-w-md text-center">
        <p className="mono text-[0.6rem] text-white/30">404</p>
        <h1 className="display mt-4 text-[clamp(2.5rem,7vw,4.5rem)] font-semibold text-white">
          Page not found<span className="text-electric">.</span>
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-white/45">
          The page you&rsquo;re looking for doesn&rsquo;t exist, or hasn&rsquo;t been published yet.
        </p>
        <Link href="/" className="btn btn-ghost mt-8 inline-flex">
          <ArrowLeft className="h-4 w-4" />
          Back to the portfolio
        </Link>
      </div>
    </div>
  );
}
