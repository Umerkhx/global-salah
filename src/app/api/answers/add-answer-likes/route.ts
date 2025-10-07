import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/supabaseServer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { answer_id, user_id } = body;

    if (!answer_id || !user_id) {
      return NextResponse.json({ error: "answer_id and user_id are required" }, { status: 400 });
    }

    // Insert new like
    const { data, error } = await supabaseServer
      .from("answer_likes")
      .insert([{ answer_id, user_id }])
      .select();

    if (error) throw error;

    return NextResponse.json({ like: data[0] }, { status: 201 });
  } catch (err) {
    console.error("Error adding answer like:", err);
    return NextResponse.json({ error: "Failed to add answer like" }, { status: 500 });
  }
}