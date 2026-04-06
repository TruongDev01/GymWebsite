"use client";
import Link from "next/link";
import { useEffect } from "react";

// Inline CSS for the animations to keep them specific to this page without polluting globals.css
const animationStyles = `
  .checkmark-circle {
      stroke-dasharray: 166;
      stroke-dashoffset: 166;
      stroke-width: 2;
      stroke-miterlimit: 10;
      stroke: #ff3d5e;
      fill: none;
      animation: check-stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
  }
  .checkmark {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: block;
      stroke-width: 2;
      stroke: #fff;
      stroke-miterlimit: 10;
      margin: 10% auto;
      box-shadow: inset 0px 0px 0px #ff3d5e;
      animation: check-fill .4s ease-in-out .4s forwards, check-scale .3s ease-in-out .9s both;
  }
  .checkmark-check {
      transform-origin: 50% 50%;
      stroke-dasharray: 48;
      stroke-dashoffset: 48;
      animation: check-stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
  }
  @keyframes check-stroke {
      100% { stroke-dashoffset: 0; }
  }
  @keyframes check-scale {
      0%, 100% { transform: none; }
      50% { transform: scale3d(1.1, 1.1, 1); }
  }
  @keyframes check-fill {
      100% { box-shadow: inset 0px 0px 0px 50px #ff3d5e; }
  }
  .confetti-piece {
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: #ff3d5e;
      opacity: 0.7;
      animation: fall linear infinite;
  }
  @keyframes fall {
      0% { transform: translateY(-10vh) rotate(0deg); opacity: 1;}
      100% { transform: translateY(110vh) rotate(720deg); opacity: 0;}
  }
  .glow-bg {
      background: radial-gradient(circle at center, rgba(255, 61, 94, 0.15) 0%, transparent 70%);
  }
  
  @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 20px rgba(255, 61, 94, 0.5); }
      50% { box-shadow: 0 0 40px rgba(255, 61, 94, 0.8); }
  }
  .animate-pulse-glow {
      animation: pulse-glow 3s infinite;
  }
  
  @keyframes fade-in-up {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-up {
      animation: fade-in-up 0.8s ease-out forwards;
  }
`;

export default function SuccessPage() {
    return (
        <div className="bg-background-dark text-white flex flex-col font-display selection:bg-primary selection:text-white flex-1 relative w-full overflow-x-hidden min-h-screen">
            <style dangerouslySetInnerHTML={{ __html: animationStyles }} />

            {/* Confetti Animation Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="glow-bg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl rounded-full blur-3xl"></div>
                <div className="confetti-piece" style={{ left: "10%", animationDuration: "4s", background: "#ff3d5e" }}></div>
                <div className="confetti-piece" style={{ left: "20%", animationDuration: "6s", background: "#ffffff" }}></div>
                <div className="confetti-piece" style={{ left: "35%", animationDuration: "3.5s", background: "#ff6b85" }}></div>
                <div className="confetti-piece" style={{ left: "50%", animationDuration: "5s", background: "#ff3d5e" }}></div>
                <div className="confetti-piece" style={{ left: "65%", animationDuration: "4.2s", background: "#ffffff" }}></div>
                <div className="confetti-piece" style={{ left: "80%", animationDuration: "5.5s", background: "#ff6b85" }}></div>
                <div className="confetti-piece" style={{ left: "90%", animationDuration: "3.8s", background: "#ff3d5e" }}></div>
            </div>

            <header className="sticky top-0 z-50 w-full border-b border-transparent bg-background-dark/95 backdrop-blur-sm py-2">
                <div className="mx-auto flex h-20 max-w-[1440px] items-center px-6 lg:px-10 justify-between">
                    <div className="flex items-center gap-4 text-white w-1/4">
                        <div className="size-10 bg-[#281b1d] rounded-xl flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-3xl">fitness_center</span>
                        </div>
                        <h2 className="text-white text-2xl font-black leading-tight tracking-[-0.015em]">GymPro</h2>
                    </div>

                    <nav className="hidden md:flex flex-1 justify-center items-center gap-10">
                        <Link className="text-slate-300 hover:text-primary transition-colors text-sm font-medium leading-normal" href="/">Home</Link>
                        <Link className="text-slate-300 hover:text-primary transition-colors text-sm font-medium leading-normal" href="/#services">Services</Link>
                        <Link className="text-slate-300 hover:text-primary transition-colors text-sm font-medium leading-normal" href="/#equipment">Equipment</Link>
                        <Link className="text-slate-300 hover:text-primary transition-colors text-sm font-medium leading-normal" href="/#packages">Packages</Link>
                        <Link className="text-slate-300 hover:text-primary transition-colors text-sm font-medium leading-normal" href="/#trainers">Trainers</Link>
                    </nav>

                    <div className="flex items-center justify-end gap-4 w-1/4">
                        <Link href="/login" className="text-white hover:text-primary border border-white/20 hover:border-primary px-6 py-2.5 rounded-lg font-bold transition-all text-sm">
                            Log In
                        </Link>
                        <Link href="/register" className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-bold shadow-lg shadow-primary/20 transition-all text-sm">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1 w-full max-w-[1440px] mx-auto p-4 md:p-6 lg:p-10 flex flex-col items-center justify-center relative z-10 min-h-[70vh]">
                <div className="w-full max-w-2xl flex flex-col items-center text-center animate-fade-in-up">

                    {/* Animated Checkmark SVG */}
                    <div className="mb-8 relative">
                        <svg className="checkmark animate-pulse-glow" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
                            <circle className="checkmark-circle" cx="26" cy="26" fill="none" r="25"></circle>
                            <path className="checkmark-check" d="M14.1 27.2l7.1 7.2 16.7-16.8" fill="none"></path>
                        </svg>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight drop-shadow-[0_0_15px_rgba(255,61,94,0.3)]">
                        REGISTRATION SUCCESSFUL!
                    </h1>
                    <p className="text-[#bcaaa4] text-lg mb-10 max-w-lg leading-relaxed">
                        Welcome to the GymPro family. Your journey to greatness starts now!
                    </p>

                    <div className="bg-gradient-to-br from-[#281b1d]/70 to-[#181012]/80 backdrop-blur-md border border-[rgba(255,61,94,0.15)] shadow-[0_4px_30px_rgba(0,0,0,0.1)] w-full rounded-2xl p-8 mb-10 border-t border-white/10 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>

                        <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/5">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">receipt_long</span>
                                Transaction Summary
                            </h3>
                            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-primary/20">Paid</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                            <div className="space-y-1">
                                <p className="text-xs text-[#bcaaa4] uppercase tracking-wider font-semibold">Order ID</p>
                                <p className="text-white font-mono text-lg font-medium">#GYM-883492</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-[#bcaaa4] uppercase tracking-wider font-semibold">Amount Paid</p>
                                <p className="text-primary text-2xl font-bold">$211.50</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-[#bcaaa4] uppercase tracking-wider font-semibold">Membership Start</p>
                                <p className="text-white font-medium text-lg">Today, Oct 24</p>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between text-sm text-[#bcaaa4]/60">
                            <span>Payment Method: Visa ending in 4242</span>
                            <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-base">verified_user</span>
                                Secure Transaction
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                        <Link href="/dashboard/member" className="w-full sm:w-auto min-w-[200px] bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-xl shadow-[0_0_20px_rgba(255,61,94,0.4)] transition-all hover:transform hover:scale-[1.05] active:scale-[0.98] flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined">dashboard</span>
                            Go to Dashboard
                        </Link>
                        <button type="button" className="w-full sm:w-auto min-w-[200px] bg-transparent border border-primary text-primary hover:bg-primary/10 font-bold py-4 px-8 rounded-xl transition-all hover:transform hover:scale-[1.05] active:scale-[0.98] flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined">description</span>
                            View Receipt
                        </button>
                    </div>
                </div>
            </main>

            <footer className="mt-auto border-t border-[#3a272a] bg-background-dark py-8 relative z-10 w-full mb-0">
                <div className="mx-auto max-w-[1440px] px-6 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined text-primary text-2xl">fitness_center</span>
                        <span className="text-white font-bold text-lg">GymPro</span>
                    </div>
                    <div className="flex gap-6 text-sm text-[#bcaaa4]">
                        <Link className="hover:text-primary transition-colors" href="#">Privacy Policy</Link>
                        <Link className="hover:text-primary transition-colors" href="#">Terms of Service</Link>
                    </div>
                    <p className="text-[#bcaaa4] text-sm text-center md:text-right">© 2023 GymPro Inc. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
