// app/api/users/signup/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseServer } from "@/lib/supabase/supabaseServer";

export async function POST(req: Request) {
  try {
    const { fullname, email, password } = await req.json();

    if (!fullname || !email || !password) {
      return NextResponse.json(
        { error: "fullname, email and password are required" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabaseServer
      .from("users")
      .insert({
        fullname,
        email,
        password: hashedPassword,
      })
      .select()
      .single();

    console.log("Insert result:", { data, error }); 

    if (error) {
      return NextResponse.json(
        { message: "Insert failed", details: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "User created successfully", user: data },
      { status: 201 }
    );
  } catch (err) {
    console.error("Route error:", err);
    return NextResponse.json(
      { error: "Unexpected server error", details: String(err) },
      { status: 500 }
    );
  }
}
