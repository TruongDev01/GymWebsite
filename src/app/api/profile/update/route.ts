import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionCookie } from "@/lib/auth";

export async function PUT(req: Request) {
  try {
    const session = await getSessionCookie();
    if (!session?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { name, phone, avatarUrl, weight, height, address } = body;

    const updatedUser = await prisma.user.update({
      where: { id: session.id as string },
      data: {
        name,
        phone,
        avatarUrl,
        weight: weight ? parseFloat(weight) : null,
        height: height ? parseFloat(height) : null,
        address
      }
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error: any) {
    console.error("Profile update error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
