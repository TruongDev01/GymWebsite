"use client";

import { useState, useTransition, useEffect } from "react";
import { createPortal } from "react-dom";
import { createWorkout } from "@/actions/workout-actions";

const WORKOUT_TYPES = [
    { label: "Cardio", icon: "directions_run", color: "text-blue-400", active: "border-blue-400 bg-blue-400/10" },
    { label: "Strength", icon: "fitness_center", color: "text-primary", active: "border-primary bg-primary/10" },
    { label: "Yoga", icon: "self_improvement", color: "text-green-400", active: "border-green-400 bg-green-400/10" },
    { label: "HIIT", icon: "local_fire_department", color: "text-orange-400", active: "border-orange-400 bg-orange-400/10" },
    { label: "Swimming", icon: "pool", color: "text-cyan-400", active: "border-cyan-400 bg-cyan-400/10" },
    { label: "Other", icon: "sports", color: "text-text-muted", active: "border-border-dark bg-surface-darker" },
];

export default function AddWorkoutModal() {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [title, setTitle] = useState("");
    const [type, setType] = useState("Cardio");
    const getLocalDateStr = () => {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    };

    const [date, setDate] = useState(() => getLocalDateStr());
    const [startTime, setStartTime] = useState("07:00");
    const [endTime, setEndTime] = useState("08:00");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [isPending, startTransition] = useTransition();

    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => { setMounted(true); }, []);

    function reset() {
        setTitle("");
        setType("Cardio");
        setDate(getLocalDateStr());
        setStartTime("07:00");
        setEndTime("08:00");
        setError(null);
        setSuccess(false);
    }

    function handleClose() {
        if (!isPending) { setOpen(false); reset(); }
    }

    function handleSubmit() {
        if (!title.trim()) { setError("Please enter the name of the activity."); return; }
        setError(null);
        startTransition(async () => {
            const result = await createWorkout({ title, type, date, startTime, endTime });
            if (result.success) {
                setSuccess(true);
                setTimeout(() => { setOpen(false); reset(); }, 1200);
            } else {
                setError(result.error ?? "Error");
            }
        });
    }

    const meta = WORKOUT_TYPES.find((t) => t.label === type) ?? WORKOUT_TYPES[0];

    const modalContent = (
        <div className="fixed inset-0 z-[9999] overflow-y-auto">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
            {/* Centering wrapper */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative w-full max-w-sm rounded-2xl bg-background-dark border border-border-dark shadow-2xl shadow-black/50 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-3 border-b border-border-dark bg-surface-dark rounded-t-2xl">
                        <div className="flex items-center gap-2">
                            <span className={`material-symbols-outlined text-[18px] ${meta.color}`}>{meta.icon}</span>
                            <h2 className="text-sm font-bold text-white">Add Activities</h2>
                        </div>
                        <button onClick={handleClose} className="text-text-muted hover:text-white p-1 rounded-lg hover:bg-surface-darker transition">
                            <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                    </div>

                    {/* Body */}
                    <div className="px-5 py-4 flex flex-col gap-3">
                        {/* Title */}
                        <div>
                            <label className="block text-xs font-semibold text-text-muted mb-1">
                                Name of Activities <span className="text-primary">*</span>
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Example: Morning run..."
                                className="w-full rounded-xl bg-surface-dark border border-border-dark text-white text-sm px-3 py-2 placeholder:text-text-muted focus:outline-none focus:border-primary transition"
                            />
                        </div>

                        {/* Type pills */}
                        <div>
                            <label className="block text-xs font-semibold text-text-muted mb-1">Type of Activities</label>
                            <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                                {WORKOUT_TYPES.map((t) => (
                                    <button
                                        key={t.label}
                                        type="button"
                                        onClick={() => setType(t.label)}
                                        className={`flex items-center gap-1.5 shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${type === t.label
                                            ? `${t.active} ${t.color} text-white`
                                            : "border-border-dark bg-surface-dark text-text-muted hover:border-primary/40"
                                            }`}
                                    >
                                        <span className={`material-symbols-outlined text-[13px] ${type === t.label ? t.color : ""}`}>{t.icon}</span>
                                        {t.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block text-xs font-semibold text-text-muted mb-1">Day</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full rounded-xl bg-surface-dark border border-border-dark text-white text-sm px-3 py-2 focus:outline-none focus:border-primary transition [color-scheme:dark]"
                            />
                        </div>

                        {/* Times */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-text-muted mb-1">Start</label>
                                <input
                                    type="time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    className="w-full rounded-xl bg-surface-dark border border-border-dark text-white text-sm px-3 py-2 focus:outline-none focus:border-primary transition [color-scheme:dark]"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-text-muted mb-1">End</label>
                                <input
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    className="w-full rounded-xl bg-surface-dark border border-border-dark text-white text-sm px-3 py-2 focus:outline-none focus:border-primary transition [color-scheme:dark]"
                                />
                            </div>
                        </div>

                        {/* Feedback */}
                        {error && (
                            <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/30 px-3 py-2">
                                <span className="material-symbols-outlined text-[15px] text-red-400">error</span>
                                <p className="text-xs text-red-400">{error}</p>
                            </div>
                        )}
                        {success && (
                            <div className="flex items-center gap-2 rounded-lg bg-green-500/10 border border-green-500/30 px-3 py-2">
                                <span className="material-symbols-outlined text-[15px] text-green-400">check_circle</span>
                                <p className="text-xs text-green-400">Activity added successfully!</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-5 py-3 border-t border-border-dark bg-surface-dark flex gap-3 rounded-b-2xl">
                        <button
                            onClick={handleClose}
                            disabled={isPending}
                            className="flex-1 rounded-xl border border-border-dark py-2 text-sm font-medium text-text-muted hover:text-white hover:border-white/20 transition disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isPending || success}
                            className="flex-1 rounded-xl bg-primary py-2 text-sm font-bold text-white shadow-lg shadow-primary/30 hover:bg-primary-dark transition disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isPending ? (
                                <>
                                    <span className="material-symbols-outlined text-[15px] animate-spin">progress_activity</span>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-[15px]">check</span>
                                    Save Activity
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-background-dark shadow-md hover:bg-gray-100 transition-all"
            >
                <span className="material-symbols-outlined text-[20px]">add</span>
                <span className="hidden sm:inline">Add Workout</span>
            </button>

            {/* Portal — render vào document.body, thoát khỏi mọi stacking context */}
            {mounted && open && createPortal(modalContent, document.body)}
        </>
    );
}
