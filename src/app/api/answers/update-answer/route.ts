import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/supabaseServer";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { answer_id, status } = body;

    if (!answer_id || !status) {
      return NextResponse.json(
        { error: "answer_id and status are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseServer
      .from("answers")
      .update({ status })
      .eq("id", answer_id)
      .select("id, status, user_id")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      {
        message: "Answer status updated successfully",
        data,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
