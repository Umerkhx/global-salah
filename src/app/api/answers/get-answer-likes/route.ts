import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/supabaseServer";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const answerId = searchParams.get("answer_id");

    let query = supabaseServer.from("answer_likes").select("*");

    if (answerId) {
      query = query.eq("answer_id", answerId);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({ likes: data }, { status: 200 });
  } catch (err) {
    console.error("Error fetching answer likes:", err);
    return NextResponse.json({ error: "Failed to fetch answer likes" }, { status: 500 });
  }
}