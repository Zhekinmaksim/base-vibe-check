import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const MOODS = ["bullish", "building", "vibing", "bearish", "touching_grass", "degen"];
const VOTES_KEY = "vibe-check:votes";

// GET — получить текущие голоса
export async function GET() {
  try {
    const votes: Record<string, string> | null = await redis.hgetall(VOTES_KEY);
    const result: Record<string, number> = {};
    for (const mood of MOODS) {
      result[mood] = votes ? parseInt(votes[mood] || "0", 10) : 0;
    }
    return NextResponse.json({ votes: result });
  } catch (error) {
    console.error("Redis GET error:", error);
    return NextResponse.json({ votes: {} }, { status: 500 });
  }
}

// POST — проголосовать
export async function POST(request: NextRequest) {
  try {
    const { mood } = await request.json();
    if (!MOODS.includes(mood)) {
      return NextResponse.json({ error: "Invalid mood" }, { status: 400 });
    }
    const newCount = await redis.hincrby(VOTES_KEY, mood, 1);
    const votes: Record<string, string> | null = await redis.hgetall(VOTES_KEY);
    const result: Record<string, number> = {};
    for (const m of MOODS) {
      result[m] = votes ? parseInt(votes[m] || "0", 10) : 0;
    }
    return NextResponse.json({ votes: result, voted: mood, newCount });
  } catch (error) {
    console.error("Redis POST error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
