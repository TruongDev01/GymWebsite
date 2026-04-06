import { GymLoader } from "@/components/ui/gym-loader";

export default function DashboardLoading() {
  return (
    <div className="flex-1 w-full h-[60vh] flex items-center justify-center bg-transparent">
      <div className="flex flex-col items-center gap-4">
        <GymLoader size="lg" />
        <span className="text-[var(--color-primary)] font-display text-sm tracking-widest uppercase animate-pulse">
          Fetching Metrics...
        </span>
      </div>
    </div>
  );
}
