import Link from 'next/link';
import { prisma } from "@/lib/db";
import { getSessionCookie } from "@/lib/auth";
import { redirect } from "next/navigation";
import TrainersClient from "./TrainersClient";
import { UserProfileButton } from "@/components/dashboard/UserProfileButton";

export const dynamic = "force-dynamic";

export default async function TrainersPage() {
    const session = await getSessionCookie();
    if (!session?.id) {
        redirect("/login");
    }

    const user = await prisma.user.findUnique({
        where: { id: session.id as string }
    });

    const trainersDB = await prisma.trainerProfile.findMany({
        include: {
            user: true
        }
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
                            <Link className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-text-muted transition-colors hover:bg-surface-dark hover:text-white" href="/dashboard/member">
                                <span className="material-symbols-outlined">dashboard</span>
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
                            <Link className="flex items-center gap-3 rounded-xl bg-surface-dark px-4 py-3 text-sm font-medium text-white shadow-sm ring-1 ring-white/5 transition-all hover:bg-surface-darker hover:ring-primary/50" href="/dashboard/trainers">
                                <span className="material-symbols-outlined text-primary">groups</span>
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
                                <h2 className="text-xl font-bold leading-tight tracking-tight text-white">Find Your Coach</h2>
                                <p className="text-sm font-medium text-text-muted">Expert guidance for your fitness journey</p>
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

                    <TrainersClient user={user} trainersDB={trainersDB} />
                </div>
            </div>
        </div>
    );
}
