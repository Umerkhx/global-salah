// app/api/users/login/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/supabaseServer";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const { data: user, error } = await supabaseServer
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

     if (user.account_status === "suspended") {
      return NextResponse.json(
        { error: "Your account has been suspended. Contact support." },
        { status: 403 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        role: user.role,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
