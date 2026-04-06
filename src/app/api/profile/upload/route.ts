import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { getSessionCookie } from "@/lib/auth";
import fs from "fs";

export async function POST(req: Request) {
  try {
    const session = await getSessionCookie();
    if (!session?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${session.id}-${Date.now()}-${file.name.replaceAll(" ", "_")}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "avatars");

    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    const fileUrl = `/uploads/avatars/${filename}`;

    return NextResponse.json({ Message: "Success", status: 201, url: fileUrl });
  } catch (error) {
    console.error("Error occurred while saving file", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
}
