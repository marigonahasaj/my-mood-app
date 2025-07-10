"use client";
import React, { useState } from "react";
import { FormData } from "@/types/formdata";

type MoodResultProps = {
    formData: FormData;
    openAiResponse: string | null;
    setOpenAiResponse: (value: string) => void;
    onBack: () => void;
    onReset: () => void;
    goNext: () => void;
};

export default function MoodResult({
                                       formData,
                                       setOpenAiResponse,
                                       onBack,
                                       goNext,
                                   }: MoodResultProps) {
    const [loading, setLoading] = useState(false);

    const handleStripeCheckout = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:8000/create-checkout-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error("Stripe session URL not received");
                setLoading(false);
            }
        } catch (err) {
            console.error("Checkout error:", err);
            setLoading(false);
        }
    };

    const handleGenerateAndContinue = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:8000/generate-response", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.status === "success") {
                setOpenAiResponse(data.response);
                goNext();
            } else {
                console.error("Error generating response", data.response);
            }
        } catch (err) {
            console.error("Server error:", err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-lime-50 via-amber-50 to-rose-50 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md bg-white px-6 py-8 rounded-2xl shadow-xl space-y-6 text-center">

                {loading ? (
                    <div className="py-16">
                        <p className="text-lg text-zinc-600 animate-pulse">✨ Preparing your uplift...</p>
                    </div>
                ) : (
                    <>
                        <div className="space-y-2">
                            <h2 className="text-3xl font-extrabold text-zinc-800">Almost there 💭</h2>
                            <p className="text-base text-zinc-600">Want to skip the boring steps next time?</p>
                        </div>

                        <div className="flex flex-col gap-4 pt-4">
                            <button
                                onClick={handleStripeCheckout}
                                className="w-full py-4 px-6 rounded-xl font-semibold text-zinc-600 border border-amber-400 hover:border-amber-600 hover:text-zinc-800 hover:shadow-md hover:bg-amber-50 transition-all"
                            >
                                Treat me a <span className="text-2xl px-2">☕</span> I’ll remember you.
                            </button>

                            <button
                                onClick={handleGenerateAndContinue}
                                className="w-full py-4 px-6 rounded-xl text-sm text-zinc-600 hover:text-zinc-800 hover:font-semibold transition underline"
                            >
                                No thanks, I’ll start fresh every time →
                            </button>
                        </div>

                        <div className="pt-4">
                            <button
                                onClick={onBack}
                                className="text-sm text-zinc-500 hover:text-zinc-700 underline"
                            >
                                ← Back
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
