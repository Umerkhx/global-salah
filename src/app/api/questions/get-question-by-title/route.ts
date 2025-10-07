import { NextResponse } from "next/server";

import { supabaseServer } from "@/lib/supabase/supabaseServer";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");

  if (!title) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }

  const { data, error } = await supabaseServer
    .from("questions")
    .select(`
      id,
      title,
      description,
      status,
      lang,
      created_at,
      user_id,
      users:users!questions_user_id_fkey (
        id,
        fullname,
        email,
        role
      ),
      answers (
        id,
        answer,
        status,
        created_at,
        user_id,
        users:users!answers_user_id_fkey (
          id,
          fullname,
          email,
          role
        )
      )
    `)
    .ilike("title", title)
    .limit(1)
    .single();

  if (error) {
    if (error.code === "P2015") {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    } else {
      return NextResponse.json(
        { error: error.message || "An error occurred" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ question: data });
}