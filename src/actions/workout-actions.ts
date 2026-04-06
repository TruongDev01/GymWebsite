"use server";

import { prisma } from "@/lib/db";
import { getSessionCookie } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createWorkout(data: {
    title: string;
    type: string;
    description?: string;
    date: string;       // "YYYY-MM-DD"
    startTime: string;  // "HH:mm"
    endTime: string;    // "HH:mm"
}): Promise<{ success: boolean; error?: string }> {
    const session = await getSessionCookie();
    if (!session?.id) {
        return { success: false, error: "Unauthorized" };
    }

    if (!data.title.trim()) {
        return { success: false, error: "Tên hoạt động không được để trống." };
    }

    try {
        await prisma.workout.create({
            data: {
                userId: session.id as string,
                title: data.title.trim(),
                type: data.type || "General",
                description: data.description?.trim() || null,
                date: new Date(data.date),
                startTime: data.startTime,
                endTime: data.endTime,
            },
        });
    } catch (error) {
        console.error("Error creating workout:", error);
        return { success: false, error: "Không thể lưu hoạt động. Vui lòng thử lại." };
    }

    revalidatePath("/dashboard/schedule");
    return { success: true };
}

export async function deleteWorkout(id: string): Promise<{ success: boolean; error?: string }> {
    const session = await getSessionCookie();
    if (!session?.id) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const workout = await prisma.workout.findUnique({
            where: { id }
        });

        if (!workout || workout.userId !== session.id) {
            return { success: false, error: "Không tìm thấy hoạt động hoặc không có quyền xóa." };
        }

        await prisma.workout.delete({
            where: { id }
        });
    } catch (error) {
        console.error("Error deleting workout:", error);
        return { success: false, error: "Không thể xóa hoạt động. Vui lòng thử lại." };
    }

    revalidatePath("/dashboard/schedule");
    return { success: true };
}
