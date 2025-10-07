import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/supabaseServer";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { all, user_id, id } = body;

    if (all) {
      if (!user_id) {
        return NextResponse.json({ error: "user_id is required for marking all notifications" }, { status: 400 });
      }

      const { error } = await supabaseServer
        .from("notifications")
        .update({ is_read: true })
        .eq("user_id", user_id);

      if (error) return NextResponse.json({ error: error.message }, { status: 500 });

      return NextResponse.json({ message: "All notifications marked as read" });
    }

    if (!id || !user_id) {
      return NextResponse.json({ error: "id and user_id are required for single notification" }, { status: 400 });
    }

    const { error } = await supabaseServer
      .from("notifications")
      .update({ is_read: true })
      .match({ id, user_id });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ message: "Notification marked as read" });

  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}