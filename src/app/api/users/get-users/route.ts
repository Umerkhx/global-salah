import { supabaseServer } from "@/lib/supabase/supabaseServer";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ users: data });
  } catch (err) {
    console.error("Error fetching users:", err);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}