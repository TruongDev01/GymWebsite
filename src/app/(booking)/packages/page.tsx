import Link from "next/link";
import { prisma } from "@/lib/db";
import PackagesClient from "./PackagesClient";

export default async function PackagesPage() {
    const plans = await prisma.membershipPlan.findMany({
        orderBy: { price: "asc" }
    });

    const trainers = await prisma.trainerProfile.findMany({
        include: { user: true }
    });

    return (
        <div className="bg-background-dark text-white flex flex-col font-display selection:bg-primary selection:text-white flex-1 relative w-full">
            <header className="sticky top-0 z-50 w-full border-b border-[#3a272a] bg-background-dark/95 backdrop-blur-sm">
                <div className="mx-auto flex h-20 w-full items-center px-6 lg:px-10 justify-between relative">
                    <div className="flex items-center gap-3 text-white flex-shrink-0">
                        <div className="flex items-center justify-center size-10 rounded-lg bg-[#281b1d] border border-[#3a272a] text-primary">
                            <span className="material-symbols-outlined text-2xl">fitness_center</span>
                        </div>
                        <h2 className="text-white text-2xl font-black tracking-tight">GymPro</h2>
                    </div>
                    <nav className="hidden md:flex items-center justify-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Link className="text-slate-300 hover:text-primary transition-colors text-sm font-medium leading-normal" href="/">Home</Link>
                        <Link className="text-slate-300 hover:text-primary transition-colors text-sm font-medium leading-normal" href="/#services">Services</Link>
                        <Link className="text-slate-300 hover:text-primary transition-colors text-sm font-medium leading-normal" href="/#equipment">Equipment</Link>
                        <Link className="text-slate-300 hover:text-primary transition-colors text-sm font-medium leading-normal" href="/#packages">Packages</Link>
                        <Link className="text-slate-300 hover:text-primary transition-colors text-sm font-medium leading-normal" href="/#trainers">Trainers</Link>
                    </nav>
                    <div className="flex items-center gap-4 flex-shrink-0 ml-auto">
                        <Link href="/login" className="hidden md:flex items-center justify-center rounded-lg border border-[#3a272a] bg-transparent hover:bg-[#3a272a] h-10 px-6 text-white text-sm font-bold transition-all">
                            Log In
                        </Link>
                        <Link href="/register" className="flex items-center justify-center rounded-lg bg-primary hover:bg-primary-dark h-10 px-6 text-white text-sm font-bold transition-all shadow-[0_0_15px_rgba(255,61,94,0.3)]">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </header>

            <PackagesClient plans={plans} trainers={trainers} />

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
