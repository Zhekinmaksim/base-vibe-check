"use client";

import { ReactNode, useEffect, useState, createContext, useContext } from "react";
import sdk from "@farcaster/frame-sdk";

interface MiniKitContextType {
  isLoaded: boolean;
  context: any | null;
}

const MiniKitContext = createContext<MiniKitContextType>({
  isLoaded: false,
  context: null,
});

export const useMiniKit = () => useContext(MiniKitContext);

export default function MiniKitProvider({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [context, setContext] = useState<any | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const ctx = await sdk.context;
        setContext(ctx);
        // Signal to the host app that we're ready
        sdk.actions.ready();
      } catch (e) {
        console.error("MiniKit init error:", e);
      } finally {
        setIsLoaded(true);
      }
    };
    init();
  }, []);

  return (
    <MiniKitContext.Provider value={{ isLoaded, context }}>
      {children}
    </MiniKitContext.Provider>
  );
}
