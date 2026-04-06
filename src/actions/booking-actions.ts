"use server";

import { prisma } from "@/lib/db";
import { getSessionCookie } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createBooking(formData: FormData) {
    const session = await getSessionCookie();
    if (!session?.id) {
        throw new Error("Unauthorized");
    }

    const planId = formData.get("planId") as string;
    const trainerId = formData.get("trainerId") as string | null;
    const paymentMethodRaw = formData.get("paymentMethod") as string;
    const totalAmount = parseFloat(formData.get("totalAmount") as string);
    const durationMonths = parseInt(formData.get("durationMonths") as string, 10);

    // Xử lý Enum PaymentMethod (mặc định CREDIT_CARD)
    const validPaymentMethods = ["CREDIT_CARD", "MOMO", "VNPAY"];
    const paymentMethod = validPaymentMethods.includes(paymentMethodRaw)
        ? paymentMethodRaw as "CREDIT_CARD" | "MOMO" | "VNPAY"
        : "CREDIT_CARD";

    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + durationMonths);

    try {
        await prisma.booking.create({
            data: {
                userId: session.id as string,
                membershipPlanId: planId,
                trainerId: trainerId || null,
                status: "ACTIVE", // Giả lập thanh toán thành công chuyển ngay sang ACTIVE
                paymentMethod: paymentMethod,
                totalAmount: totalAmount,
                startDate: startDate,
                endDate: endDate,
            }
        });
    } catch (error) {
        console.error("Lỗi tạo booking: ", error);
        throw new Error("Có lỗi xảy ra trong quá trình lưu đặt chỗ.");
    }

    redirect("/success");
}

export async function addWorkout(data: {
    planId: string;
    trainerId: string | null;
    paymentMethod: string;
    totalAmount: number;
    durationMonths: number;
}): Promise<{ success: boolean; error?: string }> {
    const session = await getSessionCookie();
    if (!session?.id) {
        return { success: false, error: "Unauthorized" };
    }

    const validPaymentMethods = ["CREDIT_CARD", "MOMO", "VNPAY"];
    const paymentMethod = validPaymentMethods.includes(data.paymentMethod)
        ? (data.paymentMethod as "CREDIT_CARD" | "MOMO" | "VNPAY")
        : "CREDIT_CARD";

    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + data.durationMonths);

    try {
        await prisma.booking.create({
            data: {
                userId: session.id as string,
                membershipPlanId: data.planId,
                trainerId: data.trainerId || null,
                status: "ACTIVE",
                paymentMethod,
                totalAmount: data.totalAmount,
                startDate,
                endDate,
            },
        });
    } catch (error) {
        console.error("Error adding workout:", error);
        return { success: false, error: "Không thể lưu workout. Vui lòng thử lại." };
    }

    revalidatePath("/dashboard/schedule");
    return { success: true };
}
