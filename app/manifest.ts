import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mohammed Danish Y. — Technology Analyst",
    short_name: "Danish",
    description:
      "Portfolio of Mohammed Danish Y. — Technology Analyst working across data, digital adoption and experience design.",
    start_url: "/",
    display: "standalone",
    background_color: "#050507",
    theme_color: "#050507",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
