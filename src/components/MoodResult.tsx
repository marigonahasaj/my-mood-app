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
    const [showTerms, setShowTerms] = useState(false);

    const handleStripeCheckout = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:8000/create-checkout-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.userDetails.email }),
            });


            const data = await res.json();
            if (data.url) {
                localStorage.setItem("formData", JSON.stringify(formData)); // Save to local device
                window.location.href = data.url;
            }
            else {
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
                                <p className="text-xs text-zinc-300 mt-0.5">
                                    By continuing, you agree to our{" "}
                                    <button
                                        onClick={() => setShowTerms(true)}
                                        className="underline hover:text-zinc-600"
                                    >
                                        Terms
                                    </button>
                                </p>
                            {showTerms && (
                                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center px-4">
                                    <div className="bg-white max-w-lg w-full p-6 rounded-xl shadow-lg relative overflow-y-auto max-h-[80vh]">
                                        <h2 className="text-lg font-semibold mb-2 text-zinc-800">Terms & Conditions</h2>
                                        <p className="text-sm text-zinc-700 space-y-2 leading-relaxed">
                                            <strong>Use of Service:</strong> This app provides mood-based insights, entertainment, and reflection tools based on your input. It is not a medical or therapeutic service.
                                            <br /><br />
                                            <strong>Payment:</strong> By supporting the app (e.g. buying a coffee), you gain access to time-saving features. This is a one-time, non-refundable contribution.
                                            <br /><br />
                                            <strong>No Refund Policy:</strong> All payments are final. No refunds will be issued once the transaction is completed.
                                            <br /><br />
                                            <strong>Data:</strong> We may use anonymized insights to improve our service. No personal data is shared or sold.
                                            <br /><br />
                                            <strong>Changes:</strong> We reserve the right to update these terms at any time without prior notice.
                                            <br /><br />
                                            By using this app, you agree to these terms.
                                        </p>
                                        <div className="mt-4 flex justify-end">
                                            <button
                                                onClick={() => setShowTerms(false)}
                                                className="text-sm text-rose-500 hover:text-rose-700 underline"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}


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
