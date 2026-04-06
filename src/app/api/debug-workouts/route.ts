import { prisma } from "@/lib/db";
import { getSessionCookie } from "@/lib/auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    const session = await getSessionCookie();
    if (!session?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const workouts = await prisma.workout.findMany({
        where: { userId: session.id as string },
        orderBy: { date: "asc" },
    });

    return NextResponse.json({
        userId: session.id,
        count: workouts.length,
        workouts: workouts.map(w => ({
            id: w.id,
            title: w.title,
            date: w.date,
            dateISO: w.date.toISOString(),
            dateSlice: w.date.toISOString().slice(0, 10),
            startTime: w.startTime,
            endTime: w.endTime,
        })),
    });
}
