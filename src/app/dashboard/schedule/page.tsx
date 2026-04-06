import { prisma } from "@/lib/db";
import { getSessionCookie } from "@/lib/auth";
import { redirect } from "next/navigation";
import ScheduleClient from "./ScheduleClient";

export const dynamic = "force-dynamic";

export default async function SchedulePage() {
    const session = await getSessionCookie();
    if (!session?.id) {
        redirect("/login");
    }

    const [user, workouts] = await Promise.all([
        prisma.user.findUnique({ where: { id: session.id as string } }),
        prisma.workout.findMany({
            where: { userId: session.id as string },
            orderBy: { date: "asc" },
        }),
    ]);

    return (
        <div className="bg-background-dark text-text-main font-display overflow-hidden selection:bg-primary selection:text-white">
            <ScheduleClient
                userName={user?.name ?? null}
                workouts={workouts}
            />
        </div>
    );
}
