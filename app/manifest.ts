import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Red Moros Studios (RedMoros / RedMorosStudios)",
    short_name: "RedMoros",
    description:
      "Official website of Red Moros Studios (RedMoros / Red Moros / RedMorosStudios) — Story-Driven Psychological Horror Thriller Game Experience.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090C",
    theme_color: "#09090C",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
