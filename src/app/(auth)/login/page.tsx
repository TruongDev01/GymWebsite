"use client";

import { useActionState, useState } from "react";
import { loginUser, AuthState } from "@/actions/auth-actions";
import Link from "next/link";

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(loginUser, { error: "", success: "" } as AuthState);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex-1 flex flex-col md:flex-row relative">
            {/* Left side: Banner Image */}
            <div className="relative hidden md:flex md:w-1/2 lg:w-3/5 bg-cover bg-center min-h-[calc(100vh-5rem)]" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAl456sqg9dPoKTwt5s4who4F4JktE6Ym3RPYH08M2QTuDYX-Egb8DZKrqXfbdw-6Q3qjoZyR-wdqaQdsmjfNeipspHWgcay1zyAX80eJ9c6jfnlEmS63S-xyWXaC67Sf6apRVwklLghHoeJKt24AW3szrJCcY73u69lRgBW3wU5_kYayljF0ZC_gC9zxgRTVjd4PTNM4zyepXQB0g6tpdQEC2oHwDQBfvmJWEhEkqcGI8lKakz9PfKGNtoSjPZViGRVaKk87ZLSg")' }}>
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent"></div>
                <div className="relative z-10 flex flex-col justify-end p-12 lg:p-16 h-full">
                    <h1 className="text-white text-5xl font-black leading-tight tracking-[-0.033em] mb-4">
                        Push Your Limits <br />
                        <span className="text-primary">Every Single Day.</span>
                    </h1>
                    <p className="text-gray-300 text-lg max-w-md">
                        Join the elite community of fitness enthusiasts at GymPro. Track your gains, schedule classes, and transform your life.
                    </p>
                </div>
            </div>

            {/* Right side: Login Form */}
            <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 relative bg-background-dark min-h-[calc(100vh-5rem)]">
                <div className="w-full max-w-md space-y-8 glass-panel bg-surface-dark/50 p-8 rounded-2xl shadow-2xl relative z-10 flex flex-col">

                    <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors mb-2 group self-start">
                        <span className="material-symbols-outlined !text-xl transition-transform group-hover:-translate-x-1">arrow_back</span>
                        <span className="text-sm font-medium">Back to Home</span>
                    </Link>

                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/20 text-primary mb-4">
                            <span className="material-symbols-outlined !text-3xl">fitness_center</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h2>
                        <p className="mt-2 text-sm text-gray-400">Please enter your details to sign in.</p>
                    </div>

                    <form action={formAction} className="mt-8 space-y-6" autoComplete="off">
                        {state.error && (
                            <div className="p-4 rounded-xl bg-red-900/40 border border-primary/50 text-primary-light text-sm font-medium">
                                {state.error}
                            </div>
                        )}

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1" htmlFor="email">Email address</label>
                                <div className="relative justify-center rounded-lg shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 !text-xl">mail</span>
                                    </div>
                                    <input
                                        className="block w-full rounded-lg border-0 py-3 pl-10 text-slate-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-background-dark dark:ring-gray-700 dark:text-white dark:placeholder:text-gray-500 transition-colors"
                                        id="email"
                                        name="email"
                                        placeholder=""
                                        type="email"
                                        required
                                        disabled={isPending}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300" htmlFor="password">Password</label>
                                    <div className="text-sm">
                                        <Link className="font-medium text-primary hover:text-primary/80 transition-colors" href="#">Forgot password?</Link>
                                    </div>
                                </div>
                                <div className="relative justify-center rounded-lg shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 !text-xl">lock</span>
                                    </div>
                                    <input
                                        className="block w-full rounded-lg border-0 py-3 pl-10 pr-10 text-slate-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-background-dark dark:ring-gray-700 dark:text-white dark:placeholder:text-gray-500 transition-colors"
                                        id="password"
                                        name="password"
                                        placeholder=""
                                        type={showPassword ? "text" : "password"}
                                        required
                                        disabled={isPending}
                                        autoComplete="new-password"
                                    />
                                    <div
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer group"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <span className="material-symbols-outlined text-gray-500 group-hover:text-gray-300 transition-colors !text-xl">
                                            {showPassword ? "visibility" : "visibility_off"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                className="flex w-full justify-center rounded-lg bg-primary px-3 py-3 text-sm font-bold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200 transform active:scale-[0.98] disabled:opacity-75 disabled:active:scale-100"
                                type="submit"
                                disabled={isPending}
                            >
                                {isPending ? "Logging in..." : "Login"}
                            </button>
                        </div>
                    </form>

                    <div className="relative mt-8">
                        <div aria-hidden="true" className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-surface-dark px-2 text-sm text-gray-400">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-8">
                        <button className="flex w-full items-center justify-center gap-3 rounded-lg bg-white dark:bg-background-dark px-3 py-2.5 text-sm font-semibold text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-surface-dark/80 transition-colors" type="button">
                            <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
                                <path d="M12.0003 20.45c4.6667 0 8.45-3.7833 8.45-8.45 0-4.6667-3.7833-8.45-8.45-8.45-4.6667 0-8.45 3.7833-8.45 8.45 0 4.6667 3.7833 8.45 8.45 8.45Z" fill="#fff" fillOpacity="0" stroke="none"></path>
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                <path d="M5.84 14.09c-.26-.75-.38-1.56-.38-2.38s.13-1.63.38-2.38V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                            </svg>
                            <span className="text-sm">Google</span>
                        </button>
                        <button className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#1877F2] px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1874ea] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1877F2] transition-colors" type="button">
                            <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                            </svg>
                            <span className="text-sm">Facebook</span>
                        </button>
                    </div>

                    <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                        Don&apos;t have an account?{" "}
                        <Link className="font-semibold leading-6 text-primary hover:text-primary/80 transition-colors" href="/register">Sign up for free</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
