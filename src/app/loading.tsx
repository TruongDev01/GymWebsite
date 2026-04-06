import { GymLoader } from "@/components/ui/gym-loader";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <GymLoader size="lg" />
        <span className="text-[var(--color-primary)] font-display text-sm tracking-widest uppercase animate-pulse">
          Loading Data...
        </span>
      </div>
    </div>
  );
}
