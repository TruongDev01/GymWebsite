import Link from 'next/link';
import { prisma } from "@/lib/db";
import { getSessionCookie } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardScheduleClient from "./DashboardScheduleClient";
import { UserProfileButton } from "@/components/dashboard/UserProfileButton";

export const dynamic = "force-dynamic";

export default async function MemberDashboard() {
    const session = await getSessionCookie();
    if (!session?.id) {
        redirect("/login");
    }

    const user = await prisma.user.findUnique({
        where: { id: session.id as string }
    });

    const booking = await prisma.booking.findFirst({
        where: { userId: session.id as string, status: "ACTIVE" },
        include: {
            membershipPlan: true,
            trainer: { include: { user: true } }
        },
        orderBy: { createdAt: 'desc' }
    });

    const plan = booking?.membershipPlan;
    const trainer = booking?.trainer;

    // Lấy dữ liệu workouts từ DB
    const workouts = await prisma.workout.findMany({
        where: { userId: session.id as string },
        orderBy: { date: "asc" }
    });

    return (
        <div className="bg-background-dark text-white font-display overflow-hidden selection:bg-primary selection:text-white">
            <div className="flex h-screen w-full overflow-hidden">
                <aside className="hidden w-64 flex-col justify-between border-r border-border-dark bg-background-dark p-4 md:flex z-30">
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center gap-3 px-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-dark shadow-lg shadow-primary/20">
                                <span className="material-symbols-outlined text-white">fitness_center</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold tracking-tight text-white">GymPro</h1>
                                <p className="text-xs text-text-muted">Member Portal</p>
                            </div>
                        </div>
                        <nav className="flex flex-col gap-2">
                            <Link className="flex items-center gap-3 rounded-xl bg-surface-dark px-4 py-3 text-sm font-medium text-white shadow-sm ring-1 ring-white/5 transition-all hover:bg-surface-darker hover:ring-primary/50" href="/dashboard/member">
                                <span className="material-symbols-outlined text-primary">dashboard</span>
                                Dashboard
                            </Link>
                            <Link className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-text-muted transition-colors hover:bg-surface-dark hover:text-white" href="/dashboard/schedule">
                                <span className="material-symbols-outlined">calendar_month</span>
                                Schedule
                            </Link>
                            <Link className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-text-muted transition-colors hover:bg-surface-dark hover:text-white" href="/dashboard/membership">
                                <span className="material-symbols-outlined">credit_card</span>
                                My Membership
                            </Link>
                            <Link className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-text-muted transition-colors hover:bg-surface-dark hover:text-white" href="/dashboard/trainers">
                                <span className="material-symbols-outlined">groups</span>
                                Trainers
                            </Link>
                            <Link className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-text-muted transition-colors hover:bg-surface-dark hover:text-white" href="#">
                                <span className="material-symbols-outlined">settings</span>
                                Settings
                            </Link>
                        </nav>
                    </div>
                    <Link href="/login" className="flex w-full items-center justify-center gap-2 rounded-xl border border-border-dark bg-surface-dark px-4 py-3 text-sm font-bold text-white transition-all hover:bg-surface-darker hover:text-primary">
                        <span className="material-symbols-outlined text-[20px]">logout</span>
                        Log Out
                    </Link>
                </aside>

                <div className="flex flex-1 flex-col h-screen overflow-hidden">
                    <header className="flex items-center justify-between border-b border-border-dark bg-background-dark/95 px-6 py-4 backdrop-blur-md md:px-8 z-20">
                        <div className="flex items-center gap-4">
                            <button className="md:hidden text-text-muted hover:text-white">
                                <span className="material-symbols-outlined">menu</span>
                            </button>
                            <div className="flex flex-col">
                                <h2 className="text-xl font-bold leading-tight tracking-tight text-white">Hello, {user?.name?.split(" ")[0] || "Member"}</h2>
                                <p className="text-sm font-medium text-text-muted">Ready for your workout today?</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative hidden md:block w-64">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted material-symbols-outlined text-lg">search</span>
                                <input className="w-full bg-surface-dark border border-transparent rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-border-dark focus:ring-1 focus:ring-primary transition-all" placeholder="Search workouts..." type="text" />
                            </div>
                            <button className="relative p-2 text-text-muted hover:text-white transition">
                                <span className="material-symbols-outlined">notifications</span>
                                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary ring-2 ring-background-dark"></span>
                            </button>
                            <button className="p-2 text-text-muted hover:text-white transition hidden sm:block">
                                <span className="material-symbols-outlined">chat</span>
                            </button>
                            <div className="h-8 w-px bg-[#3a272a] mx-2 hidden md:block"></div>
                            <UserProfileButton user={user} />
                        </div>
                    </header>

                    <main className="flex-1 overflow-y-auto bg-surface-darker p-6 lg:p-8">
                        <div className="max-w-[1400px] mx-auto flex flex-col xl:flex-row gap-8">

                            <div className="flex-1 flex flex-col gap-8">
                                <section>
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h2 className="text-2xl font-bold text-white tracking-tight">My Membership</h2>
                                            <p className="text-sm text-text-muted mt-1">Manage your current plan and trainer details</p>
                                        </div>
                                        <button className="hidden sm:flex items-center gap-2 rounded-lg bg-surface-dark px-4 py-2 text-sm font-bold text-white border border-border-dark hover:border-primary/50 transition">
                                            <span className="material-symbols-outlined text-[18px]">history</span>
                                            View History
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        {/* Membership Card */}
                                        <div className="lg:col-span-2 rounded-2xl border border-border-dark overflow-hidden flex flex-col sm:flex-row bg-surface-dark relative group">
                                            <div className="flex-1 p-6 relative z-10">
                                                <div className="flex justify-between items-start mb-6">
                                                    <div>
                                                        <div className="flex items-center gap-3 mb-1">
                                                            <h3 className="text-xl font-bold text-white tracking-tight">{plan?.name || "No Active Plan"}</h3>
                                                            {booking && <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-primary/20">{booking.status}</span>}
                                                        </div>
                                                        <p className="text-xs text-text-muted">Renewed on {booking ? new Date(booking.startDate).toLocaleDateString() : "-"}</p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-3 mb-8">
                                                    {(plan?.features as string[] || ["Access to all equipment", "Basic gym area"]).slice(0, 2).map((feature, i) => (
                                                        <div key={i} className="flex items-center gap-2 text-sm text-text-muted group-hover:text-white transition-colors">
                                                            <span className="material-symbols-outlined text-primary text-[16px]">check_circle</span>
                                                            {feature}
                                                        </div>
                                                    ))}
                                                </div>

                                                <Link href="/packages" className="inline-block w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-[#ff6b84] text-center text-white font-bold shadow-[0_4px_15px_rgba(255,61,94,0.3)] hover:shadow-[0_6px_20px_rgba(255,61,94,0.4)] transition-all active:scale-95">
                                                    {plan ? "Renew Now" : "Browse Plans"}
                                                </Link>
                                            </div>

                                            {/* Right side styling */}
                                            <div className="flex-1 bg-surface-darker p-6 relative overflow-hidden flex flex-col justify-between">
                                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
                                                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-surface-dark"></div>

                                                <div className="relative z-10 mb-6 sm:text-right">
                                                    <div className="flex items-end sm:justify-end gap-1 mb-1">
                                                        <span className="text-4xl font-black text-white">${plan?.price?.toFixed(0) || "0"}</span>
                                                        <span className="text-xs text-text-muted font-medium mb-1.5">/{plan?.durationMonths === 1 ? 'month' : (plan?.durationMonths ? plan.durationMonths + ' mos' : 'mo')}</span>
                                                    </div>
                                                    <p className="text-xs text-primary font-bold">{booking ? `Valid until ${new Date(booking.endDate).toLocaleDateString()}` : "No payment due"}</p>
                                                </div>

                                                <div className="relative z-10 flex flex-col gap-3 mb-8">
                                                    <div className="flex items-center gap-2 text-sm text-text-muted sm:justify-end">
                                                        <span className="material-symbols-outlined text-primary text-[16px]">check_circle</span>
                                                        {trainer ? `Trainer: ${trainer.user.name}` : "No Trainer Included"}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-text-muted sm:justify-end">
                                                        <span className="material-symbols-outlined text-primary text-[16px]">check_circle</span>
                                                        24/7 Gym Access
                                                    </div>
                                                </div>

                                                <button className="relative z-10 w-full rounded-xl bg-transparent border border-border-dark py-3 text-sm font-bold text-white hover:bg-white/5 transition-all">
                                                    Change Plan
                                                </button>
                                            </div>
                                        </div>

                                        {/* Trainer Card */}
                                        <div className="rounded-2xl border border-border-dark bg-surface-dark p-6 flex flex-col group hover:border-primary/30 transition-colors">
                                            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Your Trainer</h3>

                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="relative">
                                                    <div className="h-14 w-14 rounded-full bg-cover ring-2 ring-border-dark group-hover:ring-primary/50 transition-colors" style={{ backgroundImage: `url('${trainer?.imageUrl || "/default-avatar.png"}')` }}></div>
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-bold text-white">{trainer?.user?.name || "No Trainer Setup"}</h4>
                                                    <p className="text-xs text-primary font-medium">{trainer ? "Personal Trainer" : "Browse Trainers"}</p>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-3 mb-6 flex-1">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-text-muted">Specialty</span>
                                                    <span className="text-white font-medium text-right max-w-[120px] line-clamp-1">{trainer?.specialty || "N/A"}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-text-muted">Rating</span>
                                                    <span className="text-white font-medium">{trainer ? `⭐ ${trainer.rating.toFixed(1)} (${trainer.reviewCount})` : "N/A"}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-text-muted">Next Session</span>
                                                    <span className="text-white font-medium">None</span>
                                                </div>
                                            </div>

                                            <button className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl border border-border-dark bg-surface-darker py-3 text-sm font-bold text-white transition-all hover:bg-border-dark">
                                                <span className="material-symbols-outlined text-[18px]">chat</span>
                                                Message Trainer
                                            </button>
                                        </div>
                                    </div>
                                </section>

                                {/* Bảng Schedule được chuyển sang DashboardScheduleClient.tsx */}
                                <DashboardScheduleClient workouts={workouts} />
                            </div>

                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
