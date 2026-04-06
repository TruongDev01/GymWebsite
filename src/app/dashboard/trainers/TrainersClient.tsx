"use client";

import { useState } from "react";
import Image from "next/image";

const FILTERS = ["All", "Strength", "Yoga", "HIIT", "Cardio", "Pilates"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TrainersClient({ user, trainersDB }: { user: any, trainersDB: any[] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");

    // Format DB trainers to match the UI requirements
    const formattedTrainers = trainersDB.map((t) => {
        let tagColor = "bg-primary/90 text-white shadow-primary/20"; // default
        const specialtyLower = t.specialty ? t.specialty.toLowerCase() : "";

        if (specialtyLower.includes("yoga") || specialtyLower.includes("pilates")) {
            tagColor = "bg-purple-500/90 text-white shadow-purple-500/20";
        } else if (specialtyLower.includes("hiit")) {
            tagColor = "bg-orange-500/90 text-white shadow-orange-500/20";
        } else if (specialtyLower.includes("cardio")) {
            tagColor = "bg-blue-500/90 text-white shadow-blue-500/20";
        }

        // Mocking experience based on reviewCount since it's not in DB
        const experienceYears = Math.max(1, Math.floor((t.reviewCount || 0) / 10));

        return {
            id: t.id,
            name: t.user?.name || "Unknown Trainer",
            title: t.specialty || "Fitness Coach",
            specialty: t.specialty || "General",
            rating: typeof t.rating === 'number' ? t.rating : parseFloat(t.rating) || 5.0,
            experience: `${experienceYears} Years`,
            clients: `${t.reviewCount || 0}+`,
            imageUrl: t.imageUrl || "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop",
            tagColor
        };
    });

    const filteredTrainers = formattedTrainers.filter(trainer => {
        const matchesSearch = trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            trainer.specialty.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = activeFilter === "All" || trainer.specialty === activeFilter;
        return matchesSearch && matchesFilter;
    });

    return (
        <main className="flex-1 overflow-y-auto bg-background-dark relative">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute -top-[10%] -right-[10%] h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]"></div>
                <div className="absolute top-[40%] -left-[10%] h-[400px] w-[400px] rounded-full bg-purple-900/10 blur-[100px]"></div>
            </div>

            <div className="relative z-10 flex flex-col px-4 py-6 md:px-10 md:py-8 gap-8">
                <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h3 className="text-3xl font-bold text-white tracking-tight">Meet Our Expert Trainers</h3>
                        <p className="text-text-muted mt-2 max-w-2xl">Browse our roster of certified professionals. Filter by specialty to find the perfect match for your goals.</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative group">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-muted group-focus-within:text-white transition-colors">search</span>
                            <input
                                className="pl-10 pr-4 py-2.5 bg-surface-dark border border-border-dark rounded-xl text-white placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary w-full md:w-64 transition-all"
                                placeholder="Search trainers..."
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        {FILTERS.map(filter => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${activeFilter === filter
                                    ? "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-dark"
                                    : "bg-surface-dark border border-border-dark text-text-muted hover:text-white hover:border-white/20"
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredTrainers.length > 0 ? (
                        filteredTrainers.map(trainer => (
                            <div key={trainer.id} className="bg-surface-dark/60 backdrop-blur-md border border-white/5 rounded-2xl p-5 flex flex-col gap-4 group hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
                                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-surface-darker">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                        style={{ backgroundImage: `url('${trainer.imageUrl}')` }}
                                    ></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-80"></div>

                                    <div className="absolute top-3 right-3 bg-surface-darker/80 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 border border-white/10">
                                        <span className="material-symbols-outlined text-yellow-400 text-[16px]">star</span>
                                        <span className="text-xs font-bold text-white">{trainer.rating.toFixed(1)}</span>
                                    </div>

                                    <div className="absolute bottom-3 left-3">
                                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm ${trainer.tagColor}`}>
                                            {trainer.specialty}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{trainer.name}</h4>
                                    <p className="text-sm text-text-muted">{trainer.title}</p>

                                    <div className="mt-3 flex items-center gap-4 text-xs text-text-muted border-t border-white/5 pt-3">
                                        <div className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[16px]">verified</span>
                                            {trainer.experience} Exp.
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[16px]">person</span>
                                            {trainer.clients} Clients
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mt-auto">
                                    <button className="rounded-xl border border-border-dark bg-transparent py-2.5 text-xs font-bold text-white hover:bg-surface-dark transition-all">
                                        View Profile
                                    </button>
                                    <button className="rounded-xl bg-primary py-2.5 text-xs font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-primary/40">
                                        Book Session
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-12 flex flex-col items-center justify-center text-text-muted">
                            <span className="material-symbols-outlined text-4xl mb-2 opacity-50">search_off</span>
                            <p>No trainers found matching your criteria.</p>
                            <button
                                onClick={() => { setSearchTerm(""); setActiveFilter("All"); }}
                                className="mt-4 text-primary hover:underline text-sm font-medium"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
