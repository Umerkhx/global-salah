import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/supabaseServer";

export async function PUT(req: Request) {
  try {
    // frontend se snake_case keys aa rahi hain
    const { question_id, status, user_id } = await req.json();

    if (!question_id || !status || !user_id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!["approved", "declined"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    // ✅ question update karo
    const { data, error } = await supabaseServer
      .from("questions")
      .update({ status })
      .eq("id", question_id)
      .select("id, status, user_id")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const responseData = {
      id: data.id,
      status: data.status,
      userId: data.user_id,
    };

    return NextResponse.json(
      {
        message: "Question status updated successfully",
        updatedQuestion: responseData,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
