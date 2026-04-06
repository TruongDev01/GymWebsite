"use client";

import { useActionState, useState } from "react";
import { registerUser, AuthState } from "@/actions/auth-actions";
import Link from "next/link";

export default function RegisterPage() {
    const [state, formAction, isPending] = useActionState(registerUser, { error: "", success: "" } as AuthState);
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);

    const handleContinue = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setStep(2);
    };

    const handleBack = () => {
        setStep(1);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex-1 flex w-full relative">
            {/* Lớp Overlay Mobile nếu cần */}
            <div className="lg:hidden absolute inset-0 z-0 bg-gradient-to-b from-primary/5 to-background-dark"></div>

            <div className="flex-1 flex flex-col md:flex-row relative">
                {/* Nửa Trái: Banner Image */}
                <div className="relative hidden md:flex md:w-1/2 lg:w-3/5 bg-cover bg-center min-h-[calc(100vh-5rem)] border-r border-border-dark" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAD6ebim1WC3CN3GTOWodzsV0D073uPQUMJRMKArKHQw517F9HdhK_ll__w2Cv-RbxoX1hPjq3AqG-CUbn1JPerzGh2_dpn6V0XacAXPmDmt_w_f96xYsQfaWNS6QGAQwBwFoVU9HpDjvXCo0hREniXxTgXs1SGsh-d24JHPJcZaqxBwgBw0oBoWP0qup_ZQG9TjGQ_mQGXKqd9IVyfzosUa__MN-EUttWGGygw7eHwDmoP_hrgXREXIKQSY9PfzC8hrJ7Ygvx1HK4")' }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent"></div>
                    <div className="relative z-10 flex flex-col justify-end p-12 lg:p-20 overflow-hidden h-full">
                        <div className="max-w-lg">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-sm">
                                <span className="material-symbols-outlined !text-sm">bolt</span>
                                <span>New Equipment Arrived</span>
                            </div>
                            <h1 className="text-5xl font-black text-slate-100 mb-6 leading-tight tracking-tight">
                                Transform Your Body, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">Elevate Your Life.</span>
                            </h1>
                            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                                Join the elite fitness community. Get access to premium equipment, expert trainers, and personalized nutrition plans designed for your success.
                            </p>
                            <div className="flex gap-4">
                                <div className="flex -space-x-3">
                                    <img alt="Member" className="w-10 h-10 rounded-full border-2 border-background-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfu8ac4_TddEO6fC-Eo_pyMxq7-E1wxqUeZg1RgGI5lNJzSRnr5WXp84m8X2J1MIkGv8qJARGoecYaHPGWcDGGN7p5lUbTrix4PJTHnQukrfgpoGW7YqyiSwCiyqurEEt5-DJc6buOLR3pegG18zzv3SeSGvN1D52Thn1WOtd55qhklRFtkNWMIAcghDAzrz64_1QMlGx9Fhv8D8mnUop1SFn2dMq975_q-0OBm7cLopL7KCydwC_6HBFnRcBCdxwFoMVQ_tIJJFM" />
                                    <img alt="Member" className="w-10 h-10 rounded-full border-2 border-background-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD33Q2uG9LtxLqx4vq9bkKr7hJqwSF8uGoEcU6eHeVj0w7SxKW8Yp-Zfgv8ql2Z9qqCy8rnp97oir7lOOqa5gRu1RgBvgu02D_6pkEPZL-MpNLe2vKJVXvJ_3TtJ5R3NiEgaO378Vq025jvFk6tohHf1u1u5ZnDjG338BlilWVo_-mdNANYufTPdhUzVgS1pXloKxMmraSi4APTpswdsCTevB4MuUgpbAgJ45AOZaiDxQxdbMbEs4bUbw_xhd4lHnCGGiY3jaa38QA" />
                                    <img alt="Member" className="w-10 h-10 rounded-full border-2 border-background-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzcy7djOGicBAMBZyyaFiQ55r490T7PPiCkGQTFVfq3NC3o5a1_qCfULu53SKAZevu42j0X2_GCI8KbQwScMSDmmTmBePTDTUhc55gK3FTrZ9SHdID24hBgZaKKPCIlDXBN4EuLieMfxU18mBTyM3MI39kKowytPupYGW35aSPOukNlCGkEiMyPlM75BeOKSl6K0Mq7ywXNygqZ8gLBiRdvFKfCNLzNzEi2-qGtxZj41gajo24dGlStcgTIGOecQvXGXicfA3-ok0" />
                                    <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-surface-dark flex items-center justify-center text-xs font-bold text-slate-300">+2k</div>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <div className="flex text-primary text-xs">
                                        <span className="material-symbols-outlined !text-sm fill-current">star</span>
                                        <span className="material-symbols-outlined !text-sm fill-current">star</span>
                                        <span className="material-symbols-outlined !text-sm fill-current">star</span>
                                        <span className="material-symbols-outlined !text-sm fill-current">star</span>
                                        <span className="material-symbols-outlined !text-sm fill-current">star</span>
                                    </div>
                                    <span className="text-slate-400 text-xs font-medium">Trusted by 2,000+ members</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Nửa Phải: Register Form */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-12 relative bg-background-dark min-h-[calc(100vh-5rem)]">
                    <div className="w-full max-w-[520px] relative z-10 glass-panel md:bg-transparent md:border-none md:backdrop-blur-none p-6 md:p-0 rounded-2xl md:rounded-none shadow-xl md:shadow-none">

                        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors mb-6 group">
                            <span className="material-symbols-outlined !text-xl transition-transform group-hover:-translate-x-1">arrow_back</span>
                            <span className="text-sm font-medium">Back to Home</span>
                        </Link>

                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-slate-100 text-sm font-bold">Step {step} of 2</span>
                                <span className="text-primary text-sm font-medium">{step === 1 ? 'Account Registration' : 'Personal Info'}</span>
                            </div>
                            <div className="h-1.5 w-full bg-[#2f1e21] rounded-full overflow-hidden">
                                <div className={`h-full bg-primary rounded-full shadow-[0_0_10px_rgba(255,61,94,0.6)] transition-all duration-500 ease-out ${step === 1 ? 'w-1/2' : 'w-full'}`}></div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-slate-100 mb-2">
                                {step === 1 ? 'Create Your Account' : 'Tell Us About You'}
                            </h2>
                            <p className="text-slate-400">
                                {step === 1 ? 'Join GymPro today and start your fitness journey.' : 'We use this information to calculate your body metrics and personalize your plan.'}
                            </p>
                        </div>

                        <form action={formAction} className="flex flex-col gap-6" autoComplete="off">
                            {state.error && (
                                <div className="p-4 rounded-xl bg-red-900/40 border border-primary/50 text-primary-light text-sm font-medium">
                                    {state.error}
                                </div>
                            )}

                            {/* Bước 1: Account Registration */}
                            <div className={`space-y-5 transition-opacity duration-300 ${step === 1 ? 'opacity-100' : 'hidden opacity-0'}`}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <label className="flex flex-col gap-2 group">
                                        <span className="text-slate-300 text-sm font-medium group-focus-within:text-primary transition-colors">First Name</span>
                                        <input id="firstName" name="firstName" className="w-full bg-[#2f1e21] border border-[#3a272a] rounded-xl px-4 py-3.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="" type="text" />
                                    </label>
                                    <label className="flex flex-col gap-2 group">
                                        <span className="text-slate-300 text-sm font-medium group-focus-within:text-primary transition-colors">Last Name</span>
                                        <input id="lastName" name="lastName" className="w-full bg-[#2f1e21] border border-[#3a272a] rounded-xl px-4 py-3.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="" type="text" required disabled={isPending} />
                                    </label>
                                </div>
                                <label className="flex flex-col gap-2 group">
                                    <span className="text-slate-300 text-sm font-medium group-focus-within:text-primary transition-colors">Email Address</span>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 material-symbols-outlined !text-xl pointer-events-none">mail</span>
                                        <input id="email" name="email" className="w-full bg-[#2f1e21] border border-[#3a272a] rounded-xl pl-11 pr-4 py-3.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="" type="email" required disabled={isPending} autoComplete="off" />
                                    </div>
                                </label>
                                <label className="flex flex-col gap-2 group">
                                    <span className="text-slate-300 text-sm font-medium group-focus-within:text-primary transition-colors">Phone Number</span>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 material-symbols-outlined !text-xl pointer-events-none">call</span>
                                        <input id="phone" name="phone" className="w-full bg-[#2f1e21] border border-[#3a272a] rounded-xl pl-11 pr-4 py-3.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="" type="tel" />
                                    </div>
                                </label>
                                <label className="flex flex-col gap-2 group">
                                    <span className="text-slate-300 text-sm font-medium group-focus-within:text-primary transition-colors">Password</span>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 material-symbols-outlined !text-xl pointer-events-none">lock</span>
                                        <input
                                            id="password"
                                            name="password"
                                            className="w-full bg-[#2f1e21] border border-[#3a272a] rounded-xl pl-11 pr-12 py-3.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                            placeholder=""
                                            type={showPassword ? "text" : "password"}
                                            required
                                            disabled={isPending}
                                            autoComplete="new-password"
                                        />
                                        <button
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                        >
                                            <span className="material-symbols-outlined !text-xl">
                                                {showPassword ? "visibility" : "visibility_off"}
                                            </span>
                                        </button>
                                    </div>
                                </label>

                                <div className="pt-4 flex flex-col gap-4">
                                    <button onClick={handleContinue} className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-primary h-12 px-6 text-white text-base font-bold shadow-[0_4px_20px_rgba(255,61,94,0.3)] hover:bg-primary-dark hover:shadow-[0_6px_25px_rgba(255,61,94,0.4)] transition-all active:scale-[0.98]" type="button">
                                        <span className="flex items-center gap-2">
                                            Continue
                                            <span className="material-symbols-outlined !text-lg">arrow_forward</span>
                                        </span>
                                    </button>
                                </div>

                                <p className="text-center text-slate-400 text-sm mt-2">
                                    Already have an account? <Link href="/login" className="text-primary hover:text-primary-light font-semibold hover:underline">Log in</Link>
                                </p>
                            </div>

                            {/* Bước 2: Personal Info */}
                            <div className={`space-y-5 transition-opacity duration-300 ${step === 2 ? 'opacity-100' : 'hidden opacity-0'}`}>
                                <div className="flex flex-col gap-2">
                                    <span className="text-slate-300 text-sm font-medium">Gender</span>
                                    <div className="grid grid-cols-3 gap-3">
                                        <label className="cursor-pointer relative">
                                            <input defaultChecked className="peer sr-only" name="gender" type="radio" value="MALE" />
                                            <div className="w-full bg-[#2f1e21] border border-[#3a272a] rounded-xl py-3 text-slate-400 text-center text-sm font-medium peer-checked:border-primary peer-checked:text-primary peer-checked:bg-primary/5 transition-all hover:border-slate-600">Male</div>
                                        </label>
                                        <label className="cursor-pointer relative">
                                            <input className="peer sr-only" name="gender" type="radio" value="FEMALE" />
                                            <div className="w-full bg-[#2f1e21] border border-[#3a272a] rounded-xl py-3 text-slate-400 text-center text-sm font-medium peer-checked:border-primary peer-checked:text-primary peer-checked:bg-primary/5 transition-all hover:border-slate-600">Female</div>
                                        </label>
                                        <label className="cursor-pointer relative">
                                            <input className="peer sr-only" name="gender" type="radio" value="OTHER" />
                                            <div className="w-full bg-[#2f1e21] border border-[#3a272a] rounded-xl py-3 text-slate-400 text-center text-sm font-medium peer-checked:border-primary peer-checked:text-primary peer-checked:bg-primary/5 transition-all hover:border-slate-600">Other</div>
                                        </label>
                                    </div>
                                </div>
                                <label className="flex flex-col gap-2 group">
                                    <span className="text-slate-300 text-sm font-medium group-focus-within:text-primary transition-colors">Date of Birth</span>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 material-symbols-outlined !text-xl pointer-events-none">calendar_month</span>
                                        <input id="dateOfBirth" name="dateOfBirth" className="w-full bg-[#2f1e21] border border-[#3a272a] rounded-xl pl-11 pr-4 py-3.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none [&::-webkit-calendar-picker-indicator]:invert-[1] [&::-webkit-calendar-picker-indicator]:opacity-50 hover:[&::-webkit-calendar-picker-indicator]:opacity-80 cursor-pointer" type="date" />
                                    </div>
                                </label>
                                <div className="grid grid-cols-2 gap-5">
                                    <label className="flex flex-col gap-2 group">
                                        <span className="text-slate-300 text-sm font-medium group-focus-within:text-primary transition-colors">Current Weight</span>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 material-symbols-outlined !text-xl pointer-events-none">monitor_weight</span>
                                            <input id="weight" name="weight" className="w-full bg-[#2f1e21] border border-[#3a272a] rounded-xl pl-11 pr-12 py-3.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="70" type="number" step="0.1" />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-medium pointer-events-none">kg</span>
                                        </div>
                                    </label>
                                    <label className="flex flex-col gap-2 group">
                                        <span className="text-slate-300 text-sm font-medium group-focus-within:text-primary transition-colors">Height</span>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 material-symbols-outlined !text-xl pointer-events-none">height</span>
                                            <input id="height" name="height" className="w-full bg-[#2f1e21] border border-[#3a272a] rounded-xl pl-11 pr-12 py-3.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="175" type="number" step="1" />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-medium pointer-events-none">cm</span>
                                        </div>
                                    </label>
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <label className="flex flex-col gap-2 group">
                                        <span className="text-slate-300 text-sm font-medium group-focus-within:text-primary transition-colors">Occupation</span>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 material-symbols-outlined !text-xl pointer-events-none">work</span>
                                            <input id="occupation" name="occupation" className="w-full bg-[#2f1e21] border border-[#3a272a] rounded-xl pl-11 pr-4 py-3.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="E.g. Engineer" type="text" />
                                        </div>
                                    </label>
                                    <label className="flex flex-col gap-2 group">
                                        <span className="text-slate-300 text-sm font-medium group-focus-within:text-primary transition-colors">Address / City</span>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 material-symbols-outlined !text-xl pointer-events-none">location_on</span>
                                            <input id="address" name="address" className="w-full bg-[#2f1e21] border border-[#3a272a] rounded-xl pl-11 pr-4 py-3.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Hanoi" type="text" />
                                        </div>
                                    </label>
                                </div>
                                <label className="flex flex-col gap-2 group">
                                    <span className="text-slate-300 text-sm font-medium group-focus-within:text-primary transition-colors">Primary Fitness Goal</span>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 material-symbols-outlined !text-xl pointer-events-none">emoji_events</span>
                                        <select id="fitnessGoal" name="fitnessGoal" defaultValue="" className="w-full bg-[#2f1e21] border border-[#3a272a] rounded-xl pl-11 pr-10 py-3.5 text-slate-100 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none cursor-pointer">
                                            <option disabled value="">Select your goal</option>
                                            <option value="MUSCLE_GAIN">Muscle Gain & Hypertrophy</option>
                                            <option value="WEIGHT_LOSS">Weight Loss & Toning</option>
                                            <option value="ENDURANCE">Endurance & Cardio</option>
                                            <option value="FLEXIBILITY">Flexibility & Mobility</option>
                                            <option value="GENERAL">General Health & Fitness</option>
                                        </select>
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 material-symbols-outlined !text-xl pointer-events-none">expand_more</span>
                                    </div>
                                </label>

                                <div className="pt-4 flex flex-col gap-4">
                                    <button disabled={isPending} className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-primary h-12 px-6 text-white text-base font-bold shadow-[0_4px_20px_rgba(255,61,94,0.3)] hover:bg-primary-dark hover:shadow-[0_6px_25px_rgba(255,61,94,0.4)] transition-all active:scale-[0.98] disabled:opacity-75" type="submit">
                                        <span className="flex items-center gap-2">
                                            {isPending ? "Setting up..." : "Finish Registration"}
                                        </span>
                                    </button>
                                    <button onClick={handleBack} className="w-full text-slate-400 hover:text-white transition-colors text-sm font-medium py-2" type="button">
                                        Back to Account Info
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
