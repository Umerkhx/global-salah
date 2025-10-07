import { supabaseServer } from "@/lib/supabase/supabaseServer";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("answers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ answers: data });
  } catch (err) {
    console.error("Error fetching answers:", err);
    return NextResponse.json({ error: "Failed to fetch answers" }, { status: 500 });
  }
}