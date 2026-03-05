const ROOT_URL =
  process.env.NEXT_PUBLIC_URL || "https://your-app.vercel.app";

export const PROJECT_NAME =
  process.env.NEXT_PUBLIC_PROJECT_NAME || "Vibe Check";

export const minikitConfig = {
  // accountAssociation will be added after deploying to Vercel
  // and signing via base.dev/preview
  accountAssociation: {
    header: "",
    payload: "",
    signature: "",
  },
  miniapp: {
    version: "1",
    name: "Vibe Check",
    subtitle: "Onchain Mood Tracker",
    description:
      "Share your daily onchain mood and see how the community is vibing. Are we bullish? Building? Touching grass? Find out now.",
    screenshotUrls: [`${ROOT_URL}/screenshot.png`],
    iconUrl: `${ROOT_URL}/icon.png`,
    splashImageUrl: `${ROOT_URL}/splash.png`,
    splashBackgroundColor: "#0A0B0D",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "social",
    tags: ["mood", "social", "vibes", "community", "onchain"],
    heroImageUrl: `${ROOT_URL}/splash.png`,
    tagline: "How are you vibing onchain today?",
    ogTitle: "Vibe Check — Onchain Mood Tracker",
    ogDescription:
      "Share your daily onchain mood and see how the community is vibing.",
    ogImageUrl: `${ROOT_URL}/splash.png`,
  },
} as const;
