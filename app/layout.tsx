import type { Metadata } from "next";
import "./globals.css";
import MiniKitProvider from "./components/MiniKitProvider";
import { minikitConfig, PROJECT_NAME } from "@/minikit.config";

export const metadata: Metadata = {
  title: PROJECT_NAME,
  description: minikitConfig.miniapp.description,
  openGraph: {
    title: minikitConfig.miniapp.ogTitle || PROJECT_NAME,
    description:
      minikitConfig.miniapp.ogDescription ||
      minikitConfig.miniapp.description,
    images: minikitConfig.miniapp.ogImageUrl
      ? [minikitConfig.miniapp.ogImageUrl]
      : [],
  },
  other: {
    "fc:frame": JSON.stringify({
      version: minikitConfig.miniapp.version,
      name: minikitConfig.miniapp.name,
      iconUrl: minikitConfig.miniapp.iconUrl,
      splashImageUrl: minikitConfig.miniapp.splashImageUrl,
      splashBackgroundColor: minikitConfig.miniapp.splashBackgroundColor,
      homeUrl: minikitConfig.miniapp.homeUrl,
    }),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MiniKitProvider>{children}</MiniKitProvider>
      </body>
    </html>
  );
}
