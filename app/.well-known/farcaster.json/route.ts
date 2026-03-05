import { NextResponse } from "next/server";
import { minikitConfig } from "@/minikit.config";

export async function GET() {
  const manifest = {
    accountAssociation: minikitConfig.accountAssociation,
    frame: {
      ...minikitConfig.miniapp,
    },
  };

  return NextResponse.json(manifest);
}
