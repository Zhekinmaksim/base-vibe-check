const ROOT_URL =
  process.env.NEXT_PUBLIC_URL || "https://base-vibe-check.vercel.app";

export const PROJECT_NAME =
  process.env.NEXT_PUBLIC_PROJECT_NAME || "Vibe Check";

export const minikitConfig = {
  accountAssociation: {
    header: "eyJmaWQiOjE4NzM0MzgsInR5cGUiOiJhdXRoIiwia2V5IjoiMHg3NzEzODg0OTVGMzRkMjFDNTU3NEZlRmMwNGNkMUQ1ODExRTAwYURhIn0",
    payload: "eyJkb21haW4iOiJiYXNlLXZpYmUtY2hlY2sudmVyY2VsLmFwcCJ9",
    signature: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABEDCDBDXuuJes6ttlgVzmR9iUhmxpheh3qhsS4pVVFhoog34_QzC9QqN7hnDzo3KoXBGm-0Cpn424IOoRBqG2jAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAl8ZgIay2xclZzG8RWZzuWvO8j9R0fus3XxDee9lRlVy8dAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACKeyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdlIjoicDBnWXpkREJ4U1Nwazcwc1hIQTlqaXh1bTZPcWdPWm55Wll0MU0yUUlFSSIsIm9yaWdpbiI6Imh0dHBzOi8va2V5cy5jb2luYmFzZS5jb20iLCJjcm9zc09yaWdpbiI6ZmFsc2V9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
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
