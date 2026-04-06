"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AddWorkoutModal from "./AddWorkoutModal";
import { deleteWorkout } from "@/actions/workout-actions";


type Workout = {
    id: string;
    title: string;
    type: string;
    description: string | null;
    date: Date;
    startTime: string;
    endTime: string;
};

type Props = {
    userName: string | null;
    workouts: Workout[];
};

const TYPE_META: Record<string, { icon: string; color: string; colorBg: string }> = {
    Cardio: { icon: "directions_run", color: "text-blue-400", colorBg: "bg-blue-400/10 border-blue-400/30" },
    Strength: { icon: "fitness_center", color: "text-primary", colorBg: "bg-primary/10 border-primary/30" },
    Yoga: { icon: "self_improvement", color: "text-green-400", colorBg: "bg-green-400/10 border-green-400/30" },
    HIIT: { icon: "local_fire_department", color: "text-orange-400", colorBg: "bg-orange-400/10 border-orange-400/30" },
    Swimming: { icon: "pool", color: "text-cyan-400", colorBg: "bg-cyan-400/10 border-cyan-400/30" },
    General: { icon: "sports", color: "text-text-muted", colorBg: "bg-surface-dark border-border-dark" },
};

function getMeta(type: string) {
    return TYPE_META[type] ?? TYPE_META["General"];
}

const DAY_NAMES_FULL = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES_VI = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
];

function getWeekDates(baseDate: Date) {
    const day = baseDate.getDay();
    const monday = new Date(baseDate);
    monday.setDate(baseDate.getDate() - ((day + 6) % 7));
    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        return d;
    });
}

export default function ScheduleClient({ userName, workouts }: Props) {
    const [now, setNow] = useState(new Date());
    const [weekOffset, setWeekOffset] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 60_000);
        return () => clearInterval(timer);
    }, []);

    const pivot = new Date(now);
    pivot.setDate(pivot.getDate() + weekOffset * 7);
    const weekDates = getWeekDates(pivot);

    const weekStart = weekDates[0];
    const weekEnd = weekDates[6];
    const weekLabel = `${weekStart.getDate()} ${MONTH_NAMES_VI[weekStart.getMonth()]} – ${weekEnd.getDate()} ${MONTH_NAMES_VI[weekEnd.getMonth()]}, ${weekEnd.getFullYear()}`;

    const todayStr = now.toDateString();
    const timeStr = now.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
    const dateStr = now.toLocaleDateString("vi-VN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

    // Chuẩn hóa ngày về YYYY-MM-DD theo múi giờ cục bộ để tránh lỗi timezone
    const toLocalDateStr = (d: Date) =>
        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

    // Map workouts to each day column (0=Mon .. 6=Sun) for the current week
    const eventsByCol: Record<number, Workout[]> = Object.fromEntries(
        Array.from({ length: 7 }, (_, i) => [i, []])
    );
    workouts.forEach((w) => {
        // w.date được serialize từ server thành ISO string UTC
        // Cần parse và lấy ngày theo UTC để tránh lệch ngày
        const raw = typeof w.date === 'string' ? w.date : (w.date as Date).toISOString();
        // Lấy YYYY-MM-DD từ ISO string (phần đầu trước chữ T)
        const wDateStr = raw.slice(0, 10);
        weekDates.forEach((col, i) => {
            if (wDateStr === toLocalDateStr(col)) {
                eventsByCol[i].push(w);
            }
        });
    });

    const START_HOUR = 6;
    const END_HOUR = 22;
    const HOURS = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => `${String(i + START_HOUR).padStart(2, '0')}:00`);
    const ROW_HEIGHT = 96; // Tương đương với h-24 trong Tailwind

    const timeToY = (timeStr: string) => {
        const [h, m] = timeStr.split(":").map(Number);
        const totalMinutes = (h - START_HOUR) * 60 + m;
        return (totalMinutes / 60) * ROW_HEIGHT;
    };

    const router = useRouter();
    const [isPending, startDeletion] = useTransition();
    const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

    const confirmDelete = () => {
        if (!deleteTarget) return;
        const id = deleteTarget;
        setDeleteTarget(null);
        startDeletion(async () => {
            const result = await deleteWorkout(id);
            if (result.success) {
                router.refresh();
            } else {
                alert(result.error || "Có lỗi xảy ra khi xóa.");
            }
        });
    };

    return (
        <>
            {/* Custom Confirm Dialog */}
            {deleteTarget && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center">
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteTarget(null)} />
                    <div className="relative z-10 bg-background-dark border border-border-dark rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/30">
                                <span className="material-symbols-outlined text-red-400">delete</span>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white">Xóa hoạt động</h3>
                                <p className="text-xs text-text-muted mt-0.5">Hành động này không thể hoàn tác.</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteTarget(null)}
                                className="flex-1 rounded-xl border border-border-dark py-2 text-sm font-medium text-text-muted hover:text-white hover:border-white/20 transition"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={confirmDelete}
                                disabled={isPending}
                                className="flex-1 rounded-xl bg-red-500 hover:bg-red-600 py-2 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isPending ? (
                                    <><span className="material-symbols-outlined text-[14px] animate-spin">progress_activity</span> Đang xóa...</>
                                ) : (
                                    <><span className="material-symbols-outlined text-[14px]">delete</span> Xóa</>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex h-screen w-full overflow-hidden">
                {/* Sidebar */}
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
                                <span className="material-symbols-outlined">dashboard</span>Dashboard
                            </Link>
                            <Link className="flex items-center gap-3 rounded-xl bg-surface-dark px-4 py-3 text-sm font-medium text-white shadow-sm ring-1 ring-white/5" href="/dashboard/schedule">
                                <span className="material-symbols-outlined text-primary">calendar_month</span>Schedule
                            </Link>
                            <Link className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-text-muted transition-colors hover:bg-surface-dark hover:text-white" href="/dashboard/membership">
                                <span className="material-symbols-outlined">credit_card</span>My Membership
                            </Link>
                            <Link className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-text-muted transition-colors hover:bg-surface-dark hover:text-white" href="/dashboard/trainers">
                                <span className="material-symbols-outlined">groups</span>Trainers
                            </Link>
                            <a className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-text-muted transition-colors hover:bg-surface-dark hover:text-white" href="#">
                                <span className="material-symbols-outlined">settings</span>Settings
                            </a>
                        </nav>
                    </div>
                    <Link href="/login" className="flex w-full items-center justify-center gap-2 rounded-xl border border-border-dark bg-surface-dark px-4 py-3 text-sm font-bold text-white transition-all hover:bg-surface-darker hover:text-primary">
                        <span className="material-symbols-outlined text-[20px]">logout</span>Log Out
                    </Link>
                </aside>

                {/* Main */}
                <div className="flex flex-1 flex-col h-screen overflow-hidden">
                    {/* Header */}
                    <header className="flex items-center justify-between border-b border-border-dark bg-background-dark/95 px-6 py-4 backdrop-blur-md md:px-8 z-20">
                        <div className="flex items-center gap-4">
                            <button className="md:hidden text-text-muted hover:text-white">
                                <span className="material-symbols-outlined">menu</span>
                            </button>
                            <div className="flex flex-col">
                                <h2 className="text-xl font-bold leading-tight tracking-tight text-white">Training Schedule</h2>
                                <div className="flex items-center gap-2 mt-1">
                                    <button onClick={() => setWeekOffset((p) => p - 1)} className="p-0.5 text-text-muted hover:text-white transition rounded">
                                        <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                                    </button>
                                    <span className="text-sm font-medium text-white">{weekLabel}</span>
                                    <button onClick={() => setWeekOffset((p) => p + 1)} className="p-0.5 text-text-muted hover:text-white transition rounded">
                                        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                                    </button>
                                    {weekOffset !== 0 && (
                                        <button onClick={() => setWeekOffset(0)} className="text-xs text-primary hover:underline ml-1">Hôm nay</button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="hidden md:flex flex-col items-end">
                                <span className="text-sm font-bold text-white tabular-nums">{timeStr}</span>
                                <span className="text-[10px] text-text-muted">{dateStr}</span>
                            </div>
                            <div className="h-8 w-px bg-border-dark hidden md:block" />
                            <AddWorkoutModal />
                            <div className="h-8 w-px bg-border-dark hidden md:block" />
                            <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-border-dark bg-surface-dark cursor-pointer flex items-center justify-center">
                                <span className="text-xs font-bold text-white">
                                    {userName ? userName.charAt(0).toUpperCase() : "U"}
                                </span>
                            </div>
                        </div>
                    </header>

                    {/* Calendar */}
                    <div className="flex-1 overflow-y-auto bg-surface-darker">
                        {/* Week header */}
                        <div className="grid grid-cols-8 border-b border-border-dark bg-surface-dark sticky top-0 z-10 shadow-lg shadow-black/20">
                            <div className="p-4 border-r border-border-dark flex items-end justify-center pb-2">
                                <span className="text-xs text-text-muted">GMT+7</span>
                            </div>
                            {weekDates.map((date, i) => {
                                const isToday = date.toDateString() === todayStr;
                                return (
                                    <div key={i} className={`p-3 text-center border-r border-border-dark last:border-r-0 ${isToday ? "bg-primary/5" : ""}`}>
                                        <span className={`block text-xs font-medium uppercase mb-1 ${isToday ? "text-primary font-bold" : "text-text-muted"}`}>
                                            {DAY_NAMES_FULL[date.getDay()]}
                                        </span>
                                        <span className={`flex items-center justify-center h-8 w-8 mx-auto rounded-full text-sm font-bold cursor-pointer transition ${isToday ? "bg-primary text-white shadow-lg shadow-primary/30" : "text-white hover:bg-surface-darker"}`}>
                                            {date.getDate()}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Time grid */}
                        <div className="grid grid-cols-8 divide-x divide-border-dark" style={{ height: `${HOURS.length * ROW_HEIGHT}px` }}>
                            {/* Hour labels */}
                            <div className="bg-surface-dark/40 relative">
                                {HOURS.map((h) => (
                                    <div key={h} className="h-24 border-b border-border-dark/40 flex items-start px-2 pt-1">
                                        <span className="text-xs text-text-muted">{h}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Day columns */}
                            {weekDates.map((date, colIdx) => {
                                const isToday = date.toDateString() === todayStr;
                                const dayEvents = eventsByCol[colIdx] ?? [];
                                return (
                                    <div key={colIdx} className={`relative flex flex-col ${isToday ? "bg-primary/5" : ""}`}>
                                        {/* Horizontal grid lines */}
                                        <div className="absolute inset-0 pointer-events-none">
                                            {HOURS.map((h) => (
                                                <div key={h} className="h-24 border-b border-border-dark/20" />
                                            ))}
                                        </div>

                                        {/* Current time indicator */}
                                        {isToday && (
                                            <div
                                                className="absolute left-0 right-0 border-t-2 border-primary z-20 pointer-events-none flex items-center"
                                                style={{ top: `${timeToY(now.getHours() + ":" + now.getMinutes())}px` }}
                                            >
                                                <div className="size-2 rounded-full bg-primary -ml-1 shadow-[0_0_10px_rgba(255,61,94,0.8)]" />
                                            </div>
                                        )}

                                        {/* Events Container */}
                                        <div className="relative flex-1 z-10 mx-1.5">
                                            {dayEvents.map((event) => {
                                                const meta = getMeta(event.type);
                                                const top = timeToY(event.startTime);
                                                const bottom = timeToY(event.endTime);
                                                const height = Math.max(bottom - top, 32); // Chiều cao tối thiểu 32px

                                                return (
                                                    <div
                                                        key={event.id}
                                                        className={`absolute left-0 right-0 rounded-xl border ${meta.colorBg} p-2 cursor-default transition-all hover:shadow-lg hover:shadow-black/40 group`}
                                                        style={{
                                                            top: `${top}px`,
                                                            height: `${height}px`,
                                                            zIndex: 10
                                                        }}
                                                    >
                                                        <div className="flex items-start justify-between gap-1 mb-0.5">
                                                            <div className="flex flex-col flex-1 min-w-0">
                                                                <span className="text-xs font-bold text-white leading-tight truncate">{event.title}</span>
                                                                <p className={`text-[9px] font-bold ${meta.color}`}>{event.startTime} – {event.endTime}</p>
                                                            </div>
                                                            <div className="flex items-center gap-1 shrink-0">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setDeleteTarget(event.id)}
                                                                    className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-red-500/20 text-red-400/60 hover:text-red-400 transition-all"
                                                                    title="Xóa hoạt động"
                                                                >
                                                                    <span className="material-symbols-outlined text-[16px]">delete</span>
                                                                </button>
                                                                <span className={`material-symbols-outlined text-[14px] ${meta.color}`}>{meta.icon}</span>
                                                            </div>
                                                        </div>
                                                        {height >= 64 && event.description && (
                                                            <p className="text-[9px] text-text-muted mt-1 line-clamp-2 leading-tight">{event.description}</p>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
