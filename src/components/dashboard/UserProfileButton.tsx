"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, X, Loader2, Save, User, Image as ImageIcon } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function UserProfileButton({ user }: { user: any }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    avatarUrl: user?.avatarUrl || "/default-avatar.png",
    weight: user?.weight || "",
    height: user?.height || "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Focus effect for dropdown closing when clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/profile/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result.url) {
        setFormData(prev => ({ ...prev, avatarUrl: result.url }));
        // If they just chose "Change Avatar" without hitting save, we could save automatically,
        // but it's safer to let them hit "Save Identity" in the modal.
      }
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await fetch("/api/profile/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setIsModalOpen(false);
      window.location.reload(); // Hard refresh to update RSC layout with new avatar
    } catch (error) {
      console.error("Profile save error", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Avatar */}
      <div 
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-border-dark bg-surface-dark cursor-pointer transition-all hover:ring-primary/50 relative z-30" 
        style={{ backgroundImage: `url('${formData.avatarUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-3 w-56 rounded-xl border border-border-dark bg-surface-darker shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 z-40">
           <div className="px-4 py-3 border-b border-border-dark bg-surface-dark">
             <p className="text-sm text-white font-bold leading-none">{formData.name || "Member"}</p>
             <p className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">GymPro Athlete</p>
           </div>
           <div className="p-1.5 flex flex-col gap-0.5">
             <button 
               onClick={() => { 
                 setIsDropdownOpen(false); 
                 setIsModalOpen(true); 
               }}
               className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-muted hover:bg-surface-dark hover:text-white transition-colors"
             >
               <User size={16} className="text-primary/70" />
               Profile Information
             </button>
             <button 
               onClick={() => { 
                 setIsDropdownOpen(false); 
                 setIsModalOpen(true);
                 // Auto-trigger the file selector after modal opens
                 setTimeout(() => fileInputRef.current?.click(), 100);
               }}
               className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-muted hover:bg-surface-dark hover:text-white transition-colors"
             >
               <ImageIcon size={16} className="text-primary/70" />
               Change Avatar
             </button>
           </div>
        </div>
      )}

      {/* The Configuration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-surface-dark border-border-dark w-full max-w-md rounded-2xl border p-6 shadow-2xl relative flex flex-col gap-6">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-text-muted hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center">
              <h2 className="text-xl font-bold text-white tracking-tight">Identity Settings</h2>
              <p className="text-xs text-text-muted mt-1 uppercase tracking-widest">Upgrade your aesthetic</p>
            </div>

            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-3">
              <div 
                className="relative h-24 w-24 rounded-full border-2 border-border-dark bg-background-dark overflow-hidden group cursor-pointer shadow-lg"
                onClick={() => fileInputRef.current?.click()}
              >
                <div 
                   className="absolute inset-0 bg-cover bg-center transition-opacity group-hover:opacity-50"
                   style={{ backgroundImage: `url('${formData.avatarUrl}')` }}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white">
                  {isUploading ? <Loader2 className="animate-spin" size={24} /> : <Camera size={24} />}
                </div>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*" 
              />
              <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Tap to modify</span>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Alias</label>
                <input 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-background-dark border border-border-dark rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
                  placeholder="Your Name" 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Comms</label>
                <input 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-background-dark border border-border-dark rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
                  placeholder="+1 234 567 890" 
                />
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Mass (kg)</label>
                  <input 
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    className="w-full bg-background-dark border border-border-dark rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
                    placeholder="75" 
                  />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Height (cm)</label>
                  <input 
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({...formData, height: e.target.value})}
                    className="w-full bg-background-dark border border-border-dark rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
                    placeholder="180" 
                  />
                </div>
              </div>
            </div>

            <button 
              onClick={handleSave}
              disabled={isSaving || isUploading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-white shadow-[0_4px_15px_rgba(255,61,94,0.3)] transition-all hover:shadow-[0_6px_20px_rgba(255,61,94,0.5)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              {isSaving ? "Synchronizing..." : "Save Identity"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
