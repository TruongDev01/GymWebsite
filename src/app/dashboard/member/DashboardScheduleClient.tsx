"use client";

import { useState } from "react";
import type { Workout } from "@prisma/client";

// Lấy danh sách 7 ngày của tuần dựa vào offset
// offset = 0: tuần hiện tại, = -1: tuần trước, = 1: tuần sau
function getWeekDates(offset: number = 0): Date[] {
    const today = new Date();
    // Chuyển về sáng thứ Hai của tuần chứa `today`
    const day = today.getDay(); // 0 (Sun) đến 6 (Sat)
    const diffToMonday = today.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(today.setDate(diffToMonday));
    monday.setHours(0, 0, 0, 0);

    // Cộng thêm offset (số tuần)
    monday.setDate(monday.getDate() + offset * 7);

    // Tạo mảng 7 ngày
    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        return d;
    });
}

const SHORT_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Hàm chuyển đổi HH:mm thành format AM/PM
const formatTimeAMPM = (timeStr: string) => {
    if (!timeStr) return "";
    const [hStr, mStr] = timeStr.split(":");
    let h = parseInt(hStr, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12; // Chuyển 0 thành 12
    return `${String(h).padStart(2, '0')}:${mStr} ${ampm}`;
};

// Tính duration phút
const calculateDuration = (start: string, end: string) => {
    if (!start || !end) return 0;
    const [hs, ms] = start.split(":").map(Number);
    const [he, me] = end.split(":").map(Number);
    return (he * 60 + me) - (hs * 60 + ms);
};

// Mapping UI cho các loại hình tập thuật. Do DB chưa phân loại rõ, ta map tạm qua title
const getEventStyles = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('yoga') || t.includes('stretch')) {
        return {
            bg: "border border-blue-500/20 bg-surface-dark hover:border-blue-500/40 shadow-md",
            text: "text-blue-400",
            icon: "self_improvement"
        };
    }
    if (t.includes('crossfit') || t.includes('group')) {
        return {
            bg: "border border-green-500/20 bg-surface-dark hover:border-green-500/40 shadow-md",
            text: "text-green-400",
            icon: "groups"
        };
    }
    if (t.includes('hiit')) {
        return {
            bg: "bg-gradient-to-br from-primary to-[#ff6b84] shadow-[0_4px_15px_rgba(255,61,94,0.3)] hover:scale-[1.02]",
            text: "text-white",
            icon: "fitness_center",
            indicator: true
        };
    }
    // Mặc định (Cardio, v.v.)
    return {
        bg: "border border-transparent bg-surface-dark hover:border-primary/30 shadow-md",
        text: "text-primary",
        icon: "directions_run"
    };
};

export default function DashboardScheduleClient({ workouts }: { workouts: Workout[] }) {
    const [weekOffset, setWeekOffset] = useState(0);

    const handlePrevWeek = () => setWeekOffset(prev => prev - 1);
    const handleNextWeek = () => setWeekOffset(prev => prev + 1);

    const weekDates = getWeekDates(weekOffset);
    const startDate = weekDates[0];
    const endDate = weekDates[6];

    // Format tiêu đề: VD "Oct 22 - Oct 28"
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const startStr = `${monthNames[startDate.getMonth()]} ${startDate.getDate()}`;
    const endStr = `${monthNames[endDate.getMonth()]} ${endDate.getDate()}`;
    const weekTitle = `${startStr} - ${endStr}`;

    // Chuẩn hóa ngày yyyy-mm-dd local timezone
    const toLocalDateStr = (d: Date) =>
        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

    // Map workout vào từng cột ngày
    const eventsByCol: Record<number, Workout[]> = Object.fromEntries(
        Array.from({ length: 7 }, (_, i) => [i, []])
    );

    workouts.forEach(w => {
        const raw = typeof w.date === 'string' ? w.date : (new Date(w.date)).toISOString();
        const wDateStr = raw.slice(0, 10);
        weekDates.forEach((colD, i) => {
            if (wDateStr === toLocalDateStr(colD)) {
                eventsByCol[i].push(w);
            }
        });
    });

    const isToday = (d: Date) => toLocalDateStr(d) === toLocalDateStr(new Date());

    return (
        <section className="mt-2">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight">Training Schedule</h2>
                <div className="flex items-center rounded-lg bg-surface-dark p-1 border border-border-dark">
                    <button onClick={handlePrevWeek} className="px-3 py-1.5 rounded text-text-muted hover:text-white transition">
                        <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                    </button>
                    <span className="px-3 text-sm font-bold text-white w-[140px] text-center">{weekTitle}</span>
                    <button onClick={handleNextWeek} className="px-3 py-1.5 rounded text-text-muted hover:text-white transition">
                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </button>
                </div>
            </div>

            <div className="rounded-2xl border border-border-dark bg-surface-darker overflow-hidden flex flex-col md:flex-row shadow-lg">
                {weekDates.map((date, i) => {
                    const dayWorkouts = eventsByCol[i];
                    const hasWorkout = dayWorkouts.length > 0;
                    const isCurrentDay = isToday(date);

                    // Responsive classes:
                    // Mon, Tue, Wed (0,1,2): always show
                    // Thu (3): hidden sm:flex
                    // Fri (4): hidden md:flex
                    // Sat (5): hidden lg:flex
                    // Sun (6): hidden xl:flex
                    let displayClass = "flex";
                    if (i === 3) displayClass = "hidden sm:flex";
                    if (i === 4) displayClass = "hidden md:flex";
                    if (i === 5) displayClass = "hidden lg:flex";
                    if (i === 6) displayClass = "hidden xl:flex";

                    const borderRightClass = i < 6 ? "md:border-r border-border-dark" : "";

                    return (
                        <div key={i} className={`flex-1 border-b md:border-b-0 flex-col pb-4 min-h-[300px] relative transition-all ${displayClass} ${borderRightClass} ${!hasWorkout ? 'opacity-50 bg-surface-darker/50' : ''}`}>
                            {isCurrentDay && <div className="absolute top-0 left-0 w-full h-1 bg-primary z-10"></div>}

                            <div className="p-4 text-center border-b border-border-dark bg-surface-dark">
                                <span className={`block text-xs font-bold uppercase tracking-wider mb-1 ${isCurrentDay ? 'text-primary' : 'text-text-muted'}`}>
                                    {SHORT_DAYS[date.getDay()]}
                                </span>
                                <span className={`text-lg font-black ${isCurrentDay ? 'text-white' : 'text-white'}`}>
                                    {date.getDate()}
                                </span>
                            </div>

                            {hasWorkout ? (
                                <div className="p-3 flex flex-col gap-3 flex-1 px-4 mt-2">
                                    {dayWorkouts.map((w, wIdx) => {
                                        const style = getEventStyles(w.title);
                                        const duration = calculateDuration(w.startTime, w.endTime);
                                        return (
                                            <div key={wIdx} className={`rounded-xl p-3 cursor-pointer transition-all group ${style.bg}`}>
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className={`text-[10px] font-bold tracking-wider ${style.text}`}>
                                                        {formatTimeAMPM(w.startTime)}
                                                    </span>
                                                    <span className={`material-symbols-outlined text-[14px] ${style.indicator ? 'text-white' : 'text-text-muted group-hover:' + style.text} transition`}>
                                                        {style.icon}
                                                    </span>
                                                </div>
                                                <h4 className={`text-sm font-bold mb-1 ${style.indicator ? 'text-white' : 'text-white'}`}>
                                                    {w.title}
                                                </h4>
                                                <p className={`text-[10px] ${style.indicator ? 'text-white/80' : 'text-text-muted'}`}>
                                                    {duration} mins
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center p-4 min-h-[150px]">
                                    <span className="material-symbols-outlined text-text-muted text-3xl mb-2">bedtime</span>
                                    <span className="text-[10px] font-bold text-text-muted tracking-widest uppercase">Rest Day</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
