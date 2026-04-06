"use server";

import { prisma } from "@/lib/db";
import { hashPassword, verifyPassword, setSessionCookie } from "@/lib/auth";
import { redirect } from "next/navigation";

export type AuthState = {
    error?: string;
    success?: string;
};

export async function registerUser(prevState: AuthState, formData: FormData): Promise<AuthState> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = `${formData.get("firstName") || ""} ${formData.get("lastName") || ""}`.trim();
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;
    const occupation = formData.get("occupation") as string;
    const gender = formData.get("gender") as "MALE" | "FEMALE" | "OTHER";

    // Parse ngày tháng
    const dobString = formData.get("dateOfBirth") as string;
    const dateOfBirth = dobString ? new Date(dobString) : null;

    // Parse số
    const weightStr = formData.get("weight") as string;
    const heightStr = formData.get("height") as string;
    const weight = weightStr ? parseFloat(weightStr) : null;
    const height = heightStr ? parseFloat(heightStr) : null;

    const fitnessGoal = formData.get("fitnessGoal") as "MUSCLE_GAIN" | "WEIGHT_LOSS" | "ENDURANCE" | "FLEXIBILITY" | "GENERAL" | null;

    if (!email || !password || !name) {
        return { error: "Vui lòng nhập đầy đủ thông tin bắt buộc (Tên, Email, Mật khẩu)!" };
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return { error: "Email này đã được sử dụng." };
        }

        const hashedPassword = await hashPassword(password);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                passwordHash: hashedPassword,
                phone: phone || null,
                gender: gender || null,
                dateOfBirth,
                weight,
                height,
                address: address || null,
                occupation: occupation || null,
                fitnessGoal: fitnessGoal || null,
            },
        });

        // Create session and set cookie
        await setSessionCookie({ id: user.id, email: user.email, role: user.role });
    } catch (err) {
        console.error("Lỗi đăng ký:", err);
        return { error: "Có lỗi xảy ra, vui lòng thử lại." };
    }
    redirect("/packages");
}

export async function loginUser(prevState: AuthState, formData: FormData): Promise<AuthState> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { error: "Vui lòng nhập email và mật khẩu." };
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return { error: "Tài khoản không tồn tại." };
        }

        const isValid = await verifyPassword(password, user.passwordHash);
        if (!isValid) {
            return { error: "Mật khẩu không chính xác." };
        }

        // Set session
        await setSessionCookie({ id: user.id, email: user.email, role: user.role });
    } catch (err) {
        console.error("Lỗi đăng nhập:", err);
        return { error: "Có lỗi xảy ra khi đăng nhập." };
    }

    redirect("/dashboard/member");

}
