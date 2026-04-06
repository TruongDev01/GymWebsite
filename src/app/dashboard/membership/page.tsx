import Link from 'next/link';
import { prisma } from "@/lib/db";
import { getSessionCookie } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function MembershipPage() {
    const session = await getSessionCookie();
    if (!session?.id) {
        redirect("/login");
    }


    const booking = await prisma.booking.findFirst({
        where: { userId: session.id as string, status: "ACTIVE" },
        include: {
            membershipPlan: true,
        },
        orderBy: { createdAt: 'desc' }
    });

    const plan = booking?.membershipPlan;

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
                            <Link className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-text-muted transition-colors hover:bg-surface-dark hover:text-white" href="/dashboard/member">
                                <span className="material-symbols-outlined">dashboard</span>
                                Dashboard
                            </Link>
                            <Link className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-text-muted transition-colors hover:bg-surface-dark hover:text-white" href="/dashboard/schedule">
                                <span className="material-symbols-outlined">calendar_month</span>
                                Schedule
                            </Link>
                            <Link className="flex items-center gap-3 rounded-xl bg-surface-dark px-4 py-3 text-sm font-medium text-white shadow-sm ring-1 ring-white/5 transition-all hover:bg-surface-darker hover:ring-primary/50" href="/dashboard/membership">
                                <span className="material-symbols-outlined text-primary">credit_card</span>
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

                <main className="flex flex-1 flex-col overflow-y-auto bg-background-dark scrollbar-hide">
                    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border-dark bg-background-dark/80 px-6 py-4 backdrop-blur-md md:px-10">
                        <div className="flex items-center gap-4">
                            <button className="md:hidden text-text-muted hover:text-white">
                                <span className="material-symbols-outlined">menu</span>
                            </button>
                            <div>
                                <h2 className="text-xl font-bold leading-tight tracking-tight text-white">Membership Details</h2>
                                <p className="text-sm text-text-muted">Manage your subscription and payments</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 md:gap-6">
                            <button className="relative rounded-lg p-2 text-text-muted hover:bg-surface-dark hover:text-white transition-colors">
                                <span className="material-symbols-outlined">notifications</span>
                                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary"></span>
                            </button>
                            <button className="rounded-lg p-2 text-text-muted hover:bg-surface-dark hover:text-white transition-colors hidden sm:block">
                                <span className="material-symbols-outlined">chat_bubble</span>
                            </button>
                            <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-border-dark bg-surface-dark">
                                <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: "url('/default-avatar.png')" }}></div>
                            </div>
                        </div>
                    </header>

                    <div className="layout-content-container flex flex-col px-4 py-6 md:px-10 md:py-8 gap-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 flex flex-col gap-8">
                                <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface-dark to-surface-darker p-8 ring-1 ring-white/10 shadow-xl">
                                    <div className="absolute right-0 top-0 h-full w-2/3 bg-[url('https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover opacity-5 pointer-events-none" style={{ maskImage: "linear-gradient(to right, transparent, black)" }}></div>
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-6">
                                            <div>
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-2xl font-bold text-white">{plan?.name || "No Active Plan"}</h3>
                                                    {booking && (
                                                        <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-bold text-green-400 ring-1 ring-green-500/30 tracking-wide uppercase">Active</span>
                                                    )}
                                                </div>
                                                <p className="text-text-muted mt-2">Plan renews on <span className="text-white font-medium">{booking ? new Date(booking.endDate).toLocaleDateString() : "-"}</span></p>
                                            </div>
                                            <div className="hidden sm:block text-right">
                                                <span className="text-4xl font-black text-white">${plan?.price?.toFixed(0) || "0"}</span>
                                                <span className="text-sm font-medium text-text-muted">/{plan?.durationMonths === 1 ? 'mo' : (plan?.durationMonths ? plan.durationMonths + ' mos' : 'mo')}</span>
                                            </div>
                                        </div>
                                        <div className="h-px w-full bg-border-dark mb-6"></div>
                                        <h4 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-4">Your Benefits</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {(plan?.features as string[] || ["All Gym Access (24/7)", "Unlimited Group Classes", "Sauna & Steam Room", "2 Guest Passes / Month", "Free Towel Service", "10% Off Smoothie Bar"]).map((feature, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-dark ring-1 ring-white/10 text-primary">
                                                        <span className="material-symbols-outlined text-[14px]">check</span>
                                                    </div>
                                                    <span className="text-sm font-medium text-white">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <h3 className="text-lg font-bold text-white mb-4">Membership Stats</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="rounded-xl bg-surface-dark p-5 ring-1 ring-white/5 flex flex-col items-center justify-center gap-3">
                                            <div className="relative h-20 w-20">
                                                <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                                                    <path className="text-surface-darker" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4"></path>
                                                    <path className="text-primary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="75, 100" strokeLinecap="round" strokeWidth="4"></path>
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center flex-col">
                                                    <span className="text-xl font-bold text-white">22</span>
                                                    <span className="text-[10px] uppercase text-text-muted">Days</span>
                                                </div>
                                            </div>
                                            <span className="text-sm font-medium text-text-muted">Remaining</span>
                                        </div>

                                        <div className="rounded-xl bg-surface-dark p-5 ring-1 ring-white/5 flex flex-col justify-center gap-2">
                                            <div className="flex items-center gap-2 text-text-muted mb-2">
                                                <span className="material-symbols-outlined text-primary">fitness_center</span>
                                                <span className="text-xs uppercase font-bold tracking-wider">Sessions</span>
                                            </div>
                                            <span className="text-4xl font-bold text-white">14</span>
                                            <span className="text-sm text-text-muted">Attended this month</span>
                                            <div className="w-full bg-surface-darker rounded-full h-1.5 mt-2">
                                                <div className="bg-primary h-1.5 rounded-full" style={{ width: "70%" }}></div>
                                            </div>
                                        </div>

                                        <div className="rounded-xl bg-surface-dark p-5 ring-1 ring-white/5 flex flex-col justify-center gap-2">
                                            <div className="flex items-center gap-2 text-text-muted mb-2">
                                                <span className="material-symbols-outlined text-yellow-500">star</span>
                                                <span className="text-xs uppercase font-bold tracking-wider">Loyalty</span>
                                            </div>
                                            <span className="text-4xl font-bold text-white">850</span>
                                            <span className="text-sm text-text-muted">Total Points</span>
                                            <button className="mt-2 text-xs font-bold text-primary hover:text-primary-light transition-colors text-left">
                                                Redeem Rewards →
                                            </button>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-bold text-white">Billing & Payments</h3>
                                        {booking && <span className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">Next Billing: {new Date(booking.endDate).toLocaleDateString()}</span>}
                                    </div>
                                    <div className="rounded-xl border border-border-dark bg-surface-dark overflow-hidden">
                                        <table className="w-full text-left text-sm">
                                            <thead className="bg-surface-darker text-text-muted uppercase text-xs font-semibold">
                                                <tr>
                                                    <th className="px-6 py-4">Date</th>
                                                    <th className="px-6 py-4">Description</th>
                                                    <th className="px-6 py-4">Amount</th>
                                                    <th className="px-6 py-4 text-right">Invoice</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-border-dark">
                                                {booking ? (
                                                    <tr className="hover:bg-white/5 transition-colors">
                                                        <td className="px-6 py-4 text-white">{new Date(booking.createdAt).toLocaleDateString()}</td>
                                                        <td className="px-6 py-4 text-text-muted">Membership Payment ({booking.paymentMethod})</td>
                                                        <td className="px-6 py-4 text-white font-medium">${booking.totalAmount.toFixed(2)}</td>
                                                        <td className="px-6 py-4 text-right">
                                                            <button className="text-text-muted hover:text-primary transition-colors">
                                                                <span className="material-symbols-outlined text-[20px]">download</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    <tr className="hover:bg-white/5 transition-colors">
                                                        <td colSpan={4} className="px-6 py-4 text-center text-text-muted">No payment history</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                        <div className="bg-surface-darker px-6 py-3 border-t border-border-dark text-center">
                                            <button className="text-xs font-bold text-text-muted hover:text-white transition-colors uppercase tracking-wider">View All Transactions</button>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <div className="flex flex-col gap-6">
                                <div className="rounded-2xl bg-surface-dark p-6 ring-1 ring-white/5">
                                    <h3 className="text-lg font-bold text-white mb-6">Membership Actions</h3>
                                    <div className="flex flex-col gap-4">
                                        <button className="group flex items-center justify-between rounded-xl border border-border-dark bg-surface-darker p-4 transition-all hover:border-primary/50 hover:bg-surface-darker/80">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                                    <span className="material-symbols-outlined">upgrade</span>
                                                </div>
                                                <div className="text-left">
                                                    <p className="font-bold text-white">Upgrade Plan</p>
                                                    <p className="text-xs text-text-muted">Get more benefits</p>
                                                </div>
                                            </div>
                                            <span className="material-symbols-outlined text-text-muted group-hover:text-white">chevron_right</span>
                                        </button>

                                        <button className="group flex items-center justify-between rounded-xl border border-border-dark bg-surface-darker p-4 transition-all hover:border-primary/50 hover:bg-surface-darker/80">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                                    <span className="material-symbols-outlined">credit_card</span>
                                                </div>
                                                <div className="text-left">
                                                    <p className="font-bold text-white">Payment Method</p>
                                                    <p className="text-xs text-text-muted">Visa ending in 4242</p>
                                                </div>
                                            </div>
                                            <span className="material-symbols-outlined text-text-muted group-hover:text-white">edit</span>
                                        </button>

                                        <button className="group flex items-center justify-between rounded-xl border border-border-dark bg-surface-darker p-4 transition-all hover:border-yellow-500/50 hover:bg-surface-darker/80">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-500 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                                                    <span className="material-symbols-outlined">pause_circle</span>
                                                </div>
                                                <div className="text-left">
                                                    <p className="font-bold text-white">Pause Membership</p>
                                                    <p className="text-xs text-text-muted">Freeze for up to 30 days</p>
                                                </div>
                                            </div>
                                            <span className="material-symbols-outlined text-text-muted group-hover:text-white">chevron_right</span>
                                        </button>

                                        <button className="group flex items-center justify-between rounded-xl border border-border-dark bg-surface-darker p-4 transition-all hover:border-red-500/50 hover:bg-surface-darker/80 mt-2">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
                                                    <span className="material-symbols-outlined">cancel</span>
                                                </div>
                                                <div className="text-left">
                                                    <p className="font-bold text-white">Cancel Membership</p>
                                                    <p className="text-xs text-text-muted">Terminate subscription</p>
                                                </div>
                                            </div>
                                            <span className="material-symbols-outlined text-text-muted group-hover:text-white">chevron_right</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="rounded-2xl bg-gradient-to-br from-primary-dark to-primary p-6 text-center shadow-lg shadow-primary/20">
                                    <div className="mb-4 flex justify-center">
                                        <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                                            <span className="material-symbols-outlined text-3xl text-white">support_agent</span>
                                        </div>
                                    </div>
                                    <h4 className="mb-2 text-lg font-bold text-white">Need Help?</h4>
                                    <p className="mb-6 text-sm text-white/90">Have questions about your billing or plan? Our support team is here to help you.</p>
                                    <button className="w-full rounded-xl bg-white px-4 py-3 text-sm font-bold text-primary hover:bg-white/90 transition-colors">
                                        Contact Support
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
