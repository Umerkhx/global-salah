import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/supabaseServer";

export async function DELETE(req: Request) {
  const supabase = supabaseServer;
  try {
    const { searchParams } = new URL(req.url);
    const notificationId = searchParams.get("id");
    const userId = searchParams.get("userId"); 

    let result;

    if (notificationId) {
      result = await supabase
        .from("notifications")
        .delete()
        .eq("id", notificationId)
        .eq("user_id", userId);
    } else {
      result = await supabase
        .from("notifications")
        .delete()
        .eq("user_id", userId);
    }

    if (result.error) {
      return NextResponse.json({ error: result.error.message }, { status: 400 });
    }

    return NextResponse.json(
      {
        message: notificationId
          ? "Notification deleted successfully"
          : "All notifications deleted successfully",
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
