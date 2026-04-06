import Link from "next/link";
import { prisma } from "@/lib/db";
import { getSessionCookie } from "@/lib/auth";
import { redirect } from "next/navigation";
import { createBooking } from "@/actions/booking-actions";

export default async function ConfirmPage({
    searchParams,
}: {
    searchParams: Promise<{ planId?: string; trainerId?: string; paymentMethod?: string }>;
}) {
    const params = await searchParams;
    const session = await getSessionCookie();

    // Nếu chưa đăng nhập, chuyển tới login hoặc register
    if (!session?.id) {
        redirect("/login");
    }

    const user = await prisma.user.findUnique({
        where: { id: session.id as string }
    });

    if (!user) {
        redirect("/register");
    }

    let plan = null;
    if (params.planId) {
        plan = await prisma.membershipPlan.findUnique({
            where: { id: params.planId }
        });
    }

    if (!plan) {
        // Rediect về chọn gói nếu mất tham số
        redirect("/packages");
    }

    let trainer = null;
    if (params.trainerId) {
        trainer = await prisma.trainerProfile.findUnique({
            where: { id: params.trainerId },
            include: { user: true }
        });
    }

    const serviceFee = 2.50;
    const totalDue = plan.price + (trainer?.monthlyRate || 0) + serviceFee;

    // TODO: Trong tương lai có thể tạo 1 Server Action để record record Booking xuống database thực sự khi bấm "Complete Registration".
    // Hiện tại UI link trực tiếp sang /success để Demo Flow.

    return (
        <div className="bg-background-dark text-white flex flex-col font-display selection:bg-primary selection:text-white flex-1 relative w-full">
            <header className="sticky top-0 z-50 w-full border-b border-[#3a272a] bg-background-dark/95 backdrop-blur-sm">
                <div className="mx-auto flex h-20 w-full items-center justify-between px-6 lg:px-10">
                    <div className="flex items-center gap-3 text-white">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#281b1d] border border-[#3a272a] text-primary">
                            <span className="material-symbols-outlined text-2xl -rotate-45">fitness_center</span>
                        </div>
                        <h2 className="text-white text-2xl font-black leading-tight tracking-[-0.015em]">GymPro</h2>
                    </div>

                    <nav className="hidden md:flex flex-1 justify-center gap-8">
                        <Link className="text-slate-300 font-medium leading-normal text-sm hover:text-primary transition-colors" href="/">Home</Link>
                        <Link className="text-slate-300 font-medium leading-normal text-sm hover:text-primary transition-colors" href="/#services">Services</Link>
                        <Link className="text-slate-300 font-medium leading-normal text-sm hover:text-primary transition-colors" href="/#equipment">Equipment</Link>
                        <Link className="text-slate-300 font-medium leading-normal text-sm hover:text-primary transition-colors" href="/#packages">Packages</Link>
                        <Link className="text-slate-300 font-medium leading-normal text-sm hover:text-primary transition-colors" href="/#trainers">Trainers</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs uppercase">
                                {user.name ? user.name.slice(0, 2) : "US"}
                            </div>
                            <span className="text-sm font-bold text-white hidden md:block">{user.name || "User"}</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 w-full max-w-[1440px] mx-auto p-4 md:p-6 lg:p-10 flex flex-col lg:flex-row gap-8">
                <div className="flex-1 flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-end">
                            <h1 className="text-3xl font-bold tracking-tight text-white">Confirmation</h1>
                            <span className="text-primary text-sm font-semibold">Step 3 of 4</span>
                        </div>
                        <div className="relative w-full h-2 bg-[#281b1d] rounded-full overflow-hidden">
                            <div className="absolute top-0 left-0 h-full w-3/4 bg-primary rounded-full shadow-[0_0_10px_rgba(255,61,94,0.5)]"></div>
                        </div>
                        <div className="flex justify-between text-xs text-[#bcaaa4] font-medium">
                            <span className="text-white">Plan Selection</span>
                            <span className="text-white">Select</span>
                            <span className="text-primary">Confirm</span>
                            <span>Payment</span>
                        </div>
                    </div>

                    <section>
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                            <span className="material-symbols-outlined text-primary">assignment</span>
                            Review Your Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-[#281b1d]/70 to-[#181012]/80 backdrop-blur-md border border-[rgba(255,61,94,0.15)] shadow-[0_4px_30px_rgba(0,0,0,0.1)] rounded-xl p-6 flex flex-col gap-4">
                                <div className="flex items-center justify-between border-b border-[#3a272a] pb-3">
                                    <h3 className="font-bold text-white flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-sm">badge</span>
                                        Account Info
                                    </h3>
                                    <Link href="/register" className="text-xs text-primary hover:text-white transition-colors">Edit</Link>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs text-[#bcaaa4] uppercase tracking-wider">Email Address</p>
                                        <p className="text-white font-medium">{user.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#bcaaa4] uppercase tracking-wider">Phone Number</p>
                                        <p className="text-white font-medium">{user.phone || "Not provided"}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-[#281b1d]/70 to-[#181012]/80 backdrop-blur-md border border-[rgba(255,61,94,0.15)] shadow-[0_4px_30px_rgba(0,0,0,0.1)] rounded-xl p-6 flex flex-col gap-4">
                                <div className="flex items-center justify-between border-b border-[#3a272a] pb-3">
                                    <h3 className="font-bold text-white flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-sm">person</span>
                                        Personal Info
                                    </h3>
                                    <Link href="/register" className="text-xs text-primary hover:text-white transition-colors">Edit</Link>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="col-span-2">
                                        <p className="text-xs text-[#bcaaa4] uppercase tracking-wider">Full Name</p>
                                        <p className="text-white font-medium">{user.name || "Member"}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#bcaaa4] uppercase tracking-wider">Gender</p>
                                        <p className="text-white font-medium capitalize">{user.gender?.toLowerCase() || "-"}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#bcaaa4] uppercase tracking-wider">Birthdate</p>
                                        <p className="text-white font-medium">{user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : "-"}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-xs text-[#bcaaa4] uppercase tracking-wider">Occupation</p>
                                        <p className="text-white font-medium">{user.occupation || "-"}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-xs text-[#bcaaa4] uppercase tracking-wider">Address</p>
                                        <p className="text-white font-medium">{user.address || "-"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-6 mt-8 flex items-center gap-2 text-white">
                            <span className="material-symbols-outlined text-primary">shopping_cart</span>
                            Selected Plan & Trainer
                        </h2>

                        <div className="rounded-xl border border-[#3a272a] bg-[#281b1d] overflow-hidden">
                            <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#3a272a] hover:bg-white/5 transition-colors">
                                <div className="flex items-start gap-4">
                                    <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined">fitness_center</span>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white">{plan.name}</h4>
                                        <p className="text-sm text-[#bcaaa4]">Monthly billing • {plan.durationMonths} Month{plan.durationMonths > 1 ? 's' : ''}</p>
                                        <ul className="flex gap-4 mt-2 text-xs text-[#bcaaa4]">
                                            {(plan.features as string[]).slice(0, 2).map((feat, i) => (
                                                <li key={i} className="flex items-center gap-1"><span className="material-symbols-outlined text-primary text-[14px]">check</span> {feat}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                                    <span className="text-xl font-bold text-white">${plan.price.toFixed(2)}<span className="text-xs text-[#bcaaa4] font-normal">/mo</span></span>
                                    <Link href="/packages" className="text-sm text-primary hover:text-white hover:underline">Change</Link>
                                </div>
                            </div>

                            {trainer && (
                                <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/5 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <img alt={trainer.user.name || "Trainer"} className="h-12 w-12 rounded-lg object-cover border border-[#3a272a]" src={trainer.imageUrl || "/default-avatar.png"} />
                                        <div>
                                            <h4 className="text-lg font-bold text-white">{trainer.user.name}</h4>
                                            <p className="text-sm text-[#bcaaa4]">Personal Trainer • Monthly Retainer</p>
                                            <div className="flex items-center gap-1 text-yellow-400 text-xs mt-1">
                                                <span className="material-symbols-outlined text-[14px]">star</span>
                                                <span>{trainer.rating.toFixed(1)} ({trainer.reviewCount} reviews)</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                                        <span className="text-xl font-bold text-white">${trainer.monthlyRate.toFixed(2)}<span className="text-xs text-[#bcaaa4] font-normal">/mo</span></span>
                                        <Link href="/packages" className="text-sm text-primary hover:text-white hover:underline">Change</Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="mt-8">
                        <label className="flex items-start gap-3 p-4 rounded-xl border border-dashed border-[#3a272a] hover:bg-[#281b1d]/50 cursor-pointer transition-colors">
                            <input className="mt-1 w-5 h-5 text-primary bg-transparent border-gray-500 rounded focus:ring-primary focus:ring-offset-0" type="checkbox" />
                            <div className="text-sm text-[#bcaaa4]">
                                <span className="text-white font-bold">Email me about special offers and new classes.</span>
                                <p>We promise not to spam. You can unsubscribe at any time in your profile settings.</p>
                            </div>
                        </label>
                    </section>
                </div>

                <div className="w-full lg:w-[380px] shrink-0">
                    <div className="sticky top-24 flex flex-col gap-6 rounded-2xl border border-[#3a272a] bg-[#281b1d] p-6 shadow-2xl">
                        <h3 className="text-lg font-bold text-white border-b border-[#3a272a] pb-4">Booking Summary</h3>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-[#bcaaa4]">Plan</p>
                                    <p className="font-bold text-white">{plan.name}</p>
                                </div>
                                <p className="font-bold text-white">${plan.price.toFixed(2)}</p>
                            </div>

                            {trainer && (
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm text-[#bcaaa4]">Trainer</p>
                                        <p className="font-bold text-white">{trainer.user.name}</p>
                                        <p className="text-xs text-[#bcaaa4]">Monthly Retainer</p>
                                    </div>
                                    <p className="font-bold text-white">${trainer.monthlyRate.toFixed(2)}</p>
                                </div>
                            )}

                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-[#bcaaa4]">Payment Method</p>
                                    <p className="font-bold text-white">{params.paymentMethod?.replace("_", " ")}</p>
                                </div>
                            </div>

                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-[#bcaaa4]">Service Fee</p>
                                </div>
                                <p className="font-bold text-white">${serviceFee.toFixed(2)}</p>
                            </div>

                            <div className="pt-2">
                                <div className="flex gap-2">
                                    <input className="flex-1 bg-background-dark border border-[#3a272a] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary placeholder:text-[#bcaaa4]" placeholder="Promo Code" type="text" />
                                    <button type="button" className="bg-[#3a272a] hover:bg-white/10 text-white rounded-lg px-3 py-2 text-sm font-medium transition-colors">Apply</button>
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-[#3a272a] w-full"></div>

                        <div className="flex items-end justify-between">
                            <p className="text-[#bcaaa4] font-medium">Total due today</p>
                            <div className="text-right">
                                <p className="text-3xl font-bold text-primary">${totalDue.toFixed(2)}</p>
                                <p className="text-xs text-[#bcaaa4]">Includes taxes</p>
                            </div>
                        </div>

                        <form action={createBooking} className="w-full">
                            <input type="hidden" name="planId" value={plan.id} />
                            {trainer && <input type="hidden" name="trainerId" value={trainer.id} />}
                            <input type="hidden" name="paymentMethod" value={params.paymentMethod || "CREDIT_CARD"} />
                            <input type="hidden" name="totalAmount" value={totalDue} />
                            <input type="hidden" name="durationMonths" value={plan.durationMonths} />

                            <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-[0_4px_20px_rgba(255,61,94,0.4)] transition-all hover:transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group">
                                <span>Complete Registration</span>
                                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">check_circle</span>
                            </button>
                        </form>

                        <p className="text-center text-xs text-[#bcaaa4] mt-2">
                            By clicking complete, you agree to our <Link href="#" className="text-primary hover:underline">Terms of Service</Link>.
                        </p>
                    </div>
                </div>
            </main>

            <footer className="mt-12 border-t border-[#3a272a] bg-background-dark py-12">
                <div className="mx-auto max-w-[1440px] px-6 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-2xl">fitness_center</span>
                        <span className="text-white font-bold text-lg">GymPro</span>
                    </div>
                    <p className="text-[#bcaaa4] text-sm text-center md:text-right">© 2023 GymPro Inc. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
