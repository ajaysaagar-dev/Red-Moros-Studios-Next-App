export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://redmoros.ajaysaagar.online";

export const BRAND_VARIANTS = [
  "Red Moros",
  "RedMoros",
  "Red Moros Studios",
  "RedMorosStudios",
] as const;

export const SEO_KEYWORDS = [
  // Primary target exact query permutations
  "Red Moros",
  "RedMoros",
  "Red Moros Studios",
  "RedMorosStudios",

  // Studio and brand variations
  "Red Moros Studio",
  "RedMoros Studio",
  "Red Moros Games",
  "RedMoros Games",
  "Red Moros Game Studio",
  "RedMoros Game Studio",
  "Red Moros Inc",

  // Game projects and genres
  "Unknown 13",
  "Unknown 13 Horror Game",
  "Unknown 13 Red Moros",
  "Psychological Horror Game",
  "Story-Driven Thriller",
  "Psychological Thriller Game",
  "Indie Horror Studio",
  "Cinematic Horror Game",
  "Atmospheric Horror Game",
  "PC Horror Games",
  "Unreal Engine Horror Game",
  "Next-Gen Indie Horror",
  "Dark Storytelling",
  "Best Visuals Horror Game",
  "Game Development Careers",
];

export const DEFAULT_META = {
  title: "Red Moros Studios (RedMoros) | Psychological Horror Thriller Game Experience",
  titleTemplate: "%s | Red Moros Studios (RedMoros / RedMorosStudios)",
  description:
    "Official website of Red Moros Studios (also known as RedMoros, Red Moros, and RedMorosStudios). An independent game studio crafting story-driven psychological horror thriller experiences and cinematic game worlds with next-gen visuals.",
  siteName: "Red Moros Studios | RedMoros",
  author: "Red Moros Studios",
  twitterHandle: "@RedMorosStudios",
};

/**
 * Generates comprehensive Schema.org JSON-LD Structured Data
 * Covering Organization, WebSite, VideoGame, and SiteNavigation.
 */
export function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "VideoGameDevelopmentStudio"],
        "@id": `${SITE_URL}/#organization`,
        name: "Red Moros Studios",
        alternateName: [
          "Red Moros",
          "RedMoros",
          "RedMorosStudios",
          "Red Moros Studio",
          "RedMoros Studio",
        ],
        legalName: "Red Moros Studios",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/icon-512.png`,
          width: 512,
          height: 512,
        },
        image: `${SITE_URL}/og-image.png`,
        description:
          "Red Moros Studios (also known as RedMoros, Red Moros, and RedMorosStudios) is an independent game development studio creating psychological horror thriller video games and atmospheric story-driven experiences.",
        foundingDate: "2024",
        foundingLocation: {
          "@type": "Place",
          name: "Global / Remote",
        },
        slogan: "A Story-Driven Psychological Horror Thriller Experience",
        knowsAbout: [
          "Video Game Development",
          "Psychological Horror Games",
          "Cinematic Storytelling",
          "Interactive Thrillers",
          "Visual Fidelity in Gaming",
        ],
        sameAs: [
          "https://twitter.com/RedMorosStudios",
          "https://www.youtube.com/@RedMorosStudios",
          "https://github.com/ajaysaagar-dev/Red-Moros-Studios-Next-App",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Red Moros Studios",
        alternateName: [
          "Red Moros",
          "RedMoros",
          "RedMorosStudios",
          "Red Moros Studio",
        ],
        description:
          "Official website and hub of Red Moros Studios (RedMoros / Red Moros / RedMorosStudios) - psychological horror thriller game development.",
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "VideoGame",
        "@id": `${SITE_URL}/#game-unknown-13`,
        name: "Unknown 13",
        alternateName: [
          "Unknown 13 by Red Moros Studios",
          "Red Moros Unknown 13",
          "RedMoros Unknown 13",
        ],
        description:
          "A story-driven psychological horror thriller game experience with state-of-the-art visuals, created by Red Moros Studios (RedMoros).",
        genre: [
          "Psychological Horror",
          "Thriller",
          "Survival Horror",
          "Narrative Adventure",
        ],
        author: {
          "@id": `${SITE_URL}/#organization`,
        },
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
        gamePlatform: ["PC", "Microsoft Windows"],
        applicationCategory: "Game",
        playMode: "SinglePlayer",
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#navigation`,
        name: "Red Moros Studios Primary Navigation",
        itemListElement: [
          {
            "@type": "SiteNavigationElement",
            position: 1,
            name: "Home",
            description: "Red Moros Studios official home and teaser presentation",
            url: `${SITE_URL}/`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 2,
            name: "Careers",
            description: "Career opportunities at Red Moros Studios (RedMoros)",
            url: `${SITE_URL}/careers`,
          },
        ],
      },
    ],
  };
}
