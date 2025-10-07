import { supabaseServer } from "@/lib/supabase/supabaseServer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = supabaseServer;

  try {
    const body = await req.json();
    const { user_id, question_id, answer } = body;

    if (!user_id || !question_id || !answer) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("answers")
      .insert([{ user_id, question_id, answer }])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
