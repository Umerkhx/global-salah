import { supabaseServer } from "@/lib/supabase/supabaseServer";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { userId, account_status } = await req.json();

    if (!userId || !account_status) {
      return NextResponse.json(
        { error: "userId and account_status are required" },
        { status: 400 }
      );
    }

    const { error } = await supabaseServer
      .from("users")
      .update({ account_status })
      .eq("id", userId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      message: `User status updated to ${account_status} successfully`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
