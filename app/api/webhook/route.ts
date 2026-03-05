import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Webhook received:", JSON.stringify(body, null, 2));

    // Handle different webhook event types
    const { event } = body;

    if (event === "frame_added") {
      console.log("User added the mini app!");
      // Here you could store user notification details in a DB
    }

    if (event === "frame_removed") {
      console.log("User removed the mini app.");
    }

    if (event === "notifications_enabled") {
      console.log("Notifications enabled by user.");
    }

    if (event === "notifications_disabled") {
      console.log("Notifications disabled by user.");
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
