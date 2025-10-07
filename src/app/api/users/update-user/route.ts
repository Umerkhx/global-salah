import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/supabaseServer";

export async function PUT(req: Request) {
  try {
    const { id, fullname } = await req.json();

    if (!id || !fullname) {
      return NextResponse.json(
        { error: "id and fullname are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseServer
      .from("users")
      .update({ fullname })
      .eq("id", id)
      .select("id, fullname");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, user: data[0] });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}