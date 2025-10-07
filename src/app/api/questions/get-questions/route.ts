import { supabaseServer } from "@/lib/supabase/supabaseServer";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang");

    let query = supabaseServer
      .from("questions")
      .select("*")
      .order("created_at", { ascending: false });

    if (lang) {
      query = query.eq("lang", lang);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({ questions: data });
  } catch (err) {
    console.error("Error fetching questions:", err);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}
