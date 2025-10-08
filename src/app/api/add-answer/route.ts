import { NextResponse } from "next/server";
import { dbConnection } from "@/db/dbConnect";
import { sendAdminQAAlert } from "@/lib/sendAdminQAAlert.ts";
import { sendUserQAAlert } from "@/lib/sendUserQAAlert";

export async function POST(req: Request) {
  try {
    const { user_id, question_id, answer } = await req.json();

    if (!user_id || !question_id || !answer) {
      return NextResponse.json(
        { message: "Fields are required" },
        { status: 400 }
      );
    }

    const db = await dbConnection();

    // Checking if user already exists
    const [questions] = await db.query(
      "SELECT * FROM questions WHERE id = ?",
      question_id
    );
    const question_user_id = questions[0].user_id;

    // const [question_user] = await db.query(
    //   "SELECT * FROM users WHERE id = ?",
    //   question_user_id
    // );

    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", user_id);
    const user = rows[0];

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await db.execute(
      "INSERT INTO answers (question_id, user_id, answer, status) VALUES (?, ?, ?, ?)",
      [question_id, user_id, answer, "pending"]
    );

    await sendAdminQAAlert(true);
    await sendUserQAAlert(true, user.email, answer, undefined);

    const message = `${user.fullname} has answered your question ${questions[0].title}`;

    await db.execute(
      "INSERT INTO notifications (user_id, message, type, is_read) VALUES (?, ?, ?, ?)",
      [question_user_id, message, "answer_received", 0]
    );

    return NextResponse.json(
      { message: "Answer added successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
