import { supabaseServer } from "@/lib/supabase/supabaseServer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const supabase = supabaseServer;

    const body = await req.json();
    const { user_id, title, description, lang } = body;

    if (!user_id || !title || !description || !lang) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("questions")
      .insert([
        {
          user_id,
          title,
          description,
          lang,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
