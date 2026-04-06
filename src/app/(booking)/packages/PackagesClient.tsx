"use client";

import Link from "next/link";
import { useState } from "react";
import { MembershipPlan, TrainerProfile, User } from "@prisma/client";

type TrainerWithUser = TrainerProfile & { user: User };

interface PackagesClientProps {
    plans: MembershipPlan[];
    trainers: TrainerWithUser[];
}

export default function PackagesClient({ plans, trainers }: PackagesClientProps) {
    const popularPlan = plans.find(p => p.isPopular) || plans[0];
    const [selectedPlanId, setSelectedPlanId] = useState<string>(popularPlan?.id || "");
    const [selectedTrainerId, setSelectedTrainerId] = useState<string | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<string>("CREDIT_CARD");

    const selectedPlan = plans.find(p => p.id === selectedPlanId);
    const selectedTrainer = trainers.find(t => t.id === selectedTrainerId);

    const serviceFee = 2.50;
    const totalDue = (selectedPlan?.price || 0) + (selectedTrainer?.monthlyRate || 0) + serviceFee;

    const confirmUrl = `/confirm?planId=${selectedPlanId}&paymentMethod=${paymentMethod}${selectedTrainerId ? `&trainerId=${selectedTrainerId}` : ''}`;

    return (
        <main className="flex-1 w-full max-w-[1440px] mx-auto p-4 md:p-6 lg:p-10 flex flex-col lg:flex-row gap-8">
            <div className="flex-1 flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-end">
                        <h1 className="text-3xl font-bold tracking-tight text-white">Join GymPro Today</h1>
                        <span className="text-primary text-sm font-semibold">Step 2 of 4</span>
                    </div>
                    <div className="relative w-full h-2 bg-[#281b1d] rounded-full overflow-hidden">
                        <div className="absolute top-0 left-0 h-full w-2/4 bg-primary rounded-full shadow-[0_0_10px_rgba(255,61,94,0.5)]"></div>
                    </div>
                    <div className="flex justify-between text-xs text-[#bcaaa4] font-medium">
                        <span className="text-[#bcaaa4] font-normal">Account Registration</span>
                        <span className="text-primary font-bold">Select</span>
                        <span className="text-[#bcaaa4] font-normal">Confirm</span>
                        <span className="text-[#bcaaa4] font-normal">Payment</span>
                    </div>
                </div>

                <section>
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">fitness_center</span>
                        Choose Your Plan
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {plans.map((plan) => {
                            const isSelected = selectedPlanId === plan.id;
                            const features = plan.features as string[];

                            if (plan.isPopular) {
                                return (
                                    <div
                                        key={plan.id}
                                        onClick={() => setSelectedPlanId(plan.id)}
                                        className={`relative flex flex-col gap-4 rounded-xl border-2 transition-all p-6 shadow-[0_0_20px_rgba(255,61,94,0.15)] cursor-pointer transform scale-[1.02] ${isSelected ? 'border-primary bg-[#281b1d]' : 'border-[#3a272a] bg-[#281b1d]/80 hover:border-primary/50'}`}
                                    >
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-white uppercase tracking-wider">
                                            Most Popular
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-white text-lg font-bold">{plan.name}</h3>
                                            <p className="flex items-baseline gap-1 text-white mt-2">
                                                <span className="text-3xl font-black tracking-tight">${plan.price.toFixed(0)}</span>
                                                <span className="text-[#bcaaa4] text-sm font-medium">/month</span>
                                            </p>
                                        </div>
                                        <div className="flex-1 flex flex-col gap-3 mt-2">
                                            {features.map((feature, idx) => (
                                                <div key={idx} className="text-sm text-white flex gap-3 items-center">
                                                    <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>
                                        <button type="button" className={`mt-4 w-full rounded-lg py-2 text-sm font-bold shadow-md transition-colors ${isSelected ? 'bg-primary text-white' : 'border border-[#3a272a] text-white'}`}>
                                            {isSelected ? 'Selected' : 'Select Plan'}
                                        </button>
                                    </div>
                                );
                            }

                            return (
                                <div
                                    key={plan.id}
                                    onClick={() => setSelectedPlanId(plan.id)}
                                    className={`group relative flex flex-col gap-4 rounded-xl border bg-[#281b1d] p-6 transition-all cursor-pointer ${isSelected ? 'border-primary shadow-[0_0_15px_rgba(255,61,94,0.1)]' : 'border-[#3a272a] hover:border-primary/50 hover:bg-[#281b1d]/80'}`}
                                >
                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-white text-lg font-bold">{plan.name}</h3>
                                        <p className="flex items-baseline gap-1 text-white mt-2">
                                            <span className="text-3xl font-black tracking-tight">${plan.price.toFixed(0)}</span>
                                            <span className="text-[#bcaaa4] text-sm font-medium">/month</span>
                                        </p>
                                    </div>
                                    <div className="flex-1 flex flex-col gap-3 mt-2">
                                        {features.map((feature, idx) => {
                                            const isNegative = feature.toLowerCase().includes('no');
                                            return (
                                                <div key={idx} className={`text-sm flex gap-3 items-center ${isNegative ? 'text-[#bcaaa4] opacity-50' : 'text-[#bcaaa4]'}`}>
                                                    <span className={`material-symbols-outlined text-[20px] ${isNegative ? 'text-gray-500' : 'text-primary'}`}>
                                                        {isNegative ? 'cancel' : 'check_circle'}
                                                    </span>
                                                    {feature}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <button type="button" className={`mt-4 w-full rounded-lg border py-2 text-sm font-bold transition-colors ${isSelected ? 'bg-primary border-primary text-white' : 'border-[#3a272a] text-white group-hover:bg-primary group-hover:border-primary'}`}>
                                        {isSelected ? 'Selected' : 'Select Plan'}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">sports_martial_arts</span>
                            Select Personal Trainer <span className="text-sm text-[#bcaaa4] font-normal ml-2">(Optional)</span>
                        </h2>
                        {selectedTrainerId && (
                            <button onClick={() => setSelectedTrainerId(null)} type="button" className="text-sm text-primary hover:underline">
                                Clear selection
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {trainers.map((trainer) => {
                            const isSelected = selectedTrainerId === trainer.id;
                            return (
                                <div
                                    key={trainer.id}
                                    onClick={() => setSelectedTrainerId(trainer.id)}
                                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer group ${isSelected ? 'border-primary bg-[#281b1d]/50 shadow-[0_0_10px_rgba(255,61,94,0.1)]' : 'border-[#3a272a] bg-[#281b1d] hover:border-primary/30'}`}
                                >
                                    <img alt={trainer.user.name || "Trainer"} className={`w-16 h-16 rounded-full object-cover border-2 ${isSelected ? 'border-primary' : 'border-[#3a272a] group-hover:border-primary'}`} src={trainer.imageUrl || '/default-avatar.png'} />
                                    <div className="flex-1">
                                        <h3 className={`font-bold transition-colors ${isSelected ? 'text-white' : 'text-white group-hover:text-primary'}`}>{trainer.user.name}</h3>
                                        <div className="flex items-center gap-1 text-yellow-400 text-xs my-1">
                                            <span className="material-symbols-outlined text-[16px]">star</span>
                                            <span className="font-bold">{trainer.rating.toFixed(1)}</span>
                                            <span className="text-[#bcaaa4]">({trainer.reviewCount} reviews)</span>
                                        </div>
                                        <p className="text-xs text-[#bcaaa4]">{trainer.specialty}</p>
                                    </div>
                                    <div className={`h-6 w-6 rounded-full flex items-center justify-center transition-colors ${isSelected ? 'bg-primary shadow-lg shadow-primary/40' : 'border border-[#3a272a] group-hover:border-primary group-hover:bg-primary'}`}>
                                        <span className={`material-symbols-outlined text-white text-[16px] ${isSelected ? '' : 'hidden group-hover:block'}`}>check</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section className="mt-4">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">payments</span>
                        Payment Method
                    </h2>
                    <div className="space-y-4">
                        <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${paymentMethod === 'CREDIT_CARD' ? 'border-primary bg-primary/10' : 'border-[#3a272a] bg-[#281b1d] hover:bg-[#281b1d]/80'}`}>
                            <div className="flex items-center gap-4">
                                <input checked={paymentMethod === 'CREDIT_CARD'} onChange={() => setPaymentMethod('CREDIT_CARD')} className="w-5 h-5 text-primary bg-transparent border-gray-500 focus:ring-primary focus:ring-offset-0" name="payment" type="radio" value="CREDIT_CARD" />
                                <div className="flex flex-col">
                                    <span className="font-bold text-white">Credit Card</span>
                                    <span className="text-xs text-[#bcaaa4]">**** **** **** 4242</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center">
                                    <div className="w-6 h-4 bg-orange-500/80 rounded-sm"></div>
                                </div>
                            </div>
                        </label>

                        <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${paymentMethod === 'MOMO' ? 'border-primary bg-primary/10' : 'border-[#3a272a] bg-[#281b1d] hover:bg-[#281b1d]/80'}`}>
                            <div className="flex items-center gap-4">
                                <input checked={paymentMethod === 'MOMO'} onChange={() => setPaymentMethod('MOMO')} className="w-5 h-5 text-primary bg-transparent border-gray-500 focus:ring-primary focus:ring-offset-0" name="payment" type="radio" value="MOMO" />
                                <div className="flex flex-col">
                                    <span className="font-bold text-white">MoMo E-Wallet</span>
                                    <span className="text-xs text-[#bcaaa4]">Scan QR Code to pay</span>
                                </div>
                            </div>
                            <div className="h-8 w-8 rounded bg-[#A50064] flex items-center justify-center text-white text-[10px] font-bold">
                                MoMo
                            </div>
                        </label>

                        <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${paymentMethod === 'VNPAY' ? 'border-primary bg-primary/10' : 'border-[#3a272a] bg-[#281b1d] hover:bg-[#281b1d]/80'}`}>
                            <div className="flex items-center gap-4">
                                <input checked={paymentMethod === 'VNPAY'} onChange={() => setPaymentMethod('VNPAY')} className="w-5 h-5 text-primary bg-transparent border-gray-500 focus:ring-primary focus:ring-offset-0" name="payment" type="radio" value="VNPAY" />
                                <div className="flex flex-col">
                                    <span className="font-bold text-white">VNPay</span>
                                    <span className="text-xs text-[#bcaaa4]">Domestic ATM & QR</span>
                                </div>
                            </div>
                            <div className="h-8 w-12 rounded bg-white flex items-center justify-center text-[#005BAA] text-[10px] font-bold border border-gray-200">
                                VNPay
                            </div>
                        </label>
                    </div>
                </section>
            </div>

            <div className="w-full lg:w-[380px] shrink-0">
                <div className="sticky top-24 flex flex-col gap-6 rounded-2xl border border-[#3a272a] bg-[#281b1d] p-6 shadow-2xl">
                    <h3 className="text-lg font-bold text-white border-b border-[#3a272a] pb-4">Booking Summary</h3>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-[#bcaaa4]">Plan</p>
                                <p className="font-bold text-white">{selectedPlan?.name || "None"}</p>
                            </div>
                            <p className="font-bold text-white">${selectedPlan?.price.toFixed(2) || "0.00"}</p>
                        </div>

                        {selectedTrainer && (
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-[#bcaaa4]">Trainer</p>
                                    <p className="font-bold text-white">{selectedTrainer.user.name}</p>
                                    <p className="text-xs text-[#bcaaa4]">Monthly Retainer</p>
                                </div>
                                <p className="font-bold text-white">${selectedTrainer.monthlyRate.toFixed(2)}</p>
                            </div>
                        )}

                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-[#bcaaa4]">Service Fee</p>
                            </div>
                            <p className="font-bold text-white">${serviceFee.toFixed(2)}</p>
                        </div>

                        <div className="pt-2">
                            <div className="flex gap-2">
                                <input className="flex-1 bg-background-dark border border-[#3a272a] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary placeholder:text-[#bcaaa4]" placeholder="Promo Code" type="text" />
                                <button type="button" className="bg-[#3a272a] hover:bg-white/10 text-white rounded-lg px-3 py-2 text-sm font-medium transition-colors">Apply</button>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-[#3a272a] w-full"></div>

                    <div className="flex items-end justify-between">
                        <p className="text-[#bcaaa4] font-medium">Total due today</p>
                        <div className="text-right">
                            <p className="text-3xl font-bold text-primary">${totalDue.toFixed(2)}</p>
                            <p className="text-xs text-[#bcaaa4]">Includes taxes</p>
                        </div>
                    </div>

                    <Link href={confirmUrl} className={`w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-[0_4px_20px_rgba(255,61,94,0.4)] transition-all hover:transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group ${!selectedPlanId ? 'opacity-50 pointer-events-none' : ''}`}>
                        <span>Confirm & Pay</span>
                        <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </Link>

                    <p className="text-center text-xs text-[#bcaaa4] mt-2">
                        By confirming, you agree to our <Link href="#" className="text-primary hover:underline">Terms of Service</Link>.
                    </p>
                </div>
            </div>
        </main>
    );
}
