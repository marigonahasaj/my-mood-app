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
            const res = await fetch("/api/create-checkout-session", {
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
            const res = await fetch("/api/generate-response", {
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
        <div className="h-[667px] max-h-[667px] w-full bg-white flex flex-col relative overflow-hidden mx-auto p-4">
            <div className="w-full max-w-md bg-white space-y-6 text-center">

                {loading ? (
                    <div className="py-16">
                        <p className="text-lg text-zinc-600 animate-pulse">✨ Preparing your uplift...</p>
                    </div>
                ) : (
                    <>
                        <div className="space-y-2">
                            <h2 className="text-3xl font-semibold -tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-olive-500 via-olive-300 to-amber-400 w-full">Almost there 💭</h2>
                            <p className="text-base text-zinc-600">Want to skip the boring steps next time?</p>
                        </div>

                        <div className="flex flex-col gap-4 pt-4">
                            <button
                                onClick={handleStripeCheckout}
                                className="w-full py-4 px-6 rounded-2xl font-semibold text-white bg-gradient-to-r from-amber-400 via-rose-400 to-lime-400 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out flex items-center justify-center gap-2"
                            >
                                <span className="text-2xl">☕</span>
                                <span className="text-base md:text-lg">Treat me a coffee — I’ll remember you!</span>
                            </button>
                            <p className="text-xs text-zinc-400 mt-0.5">
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

                            <button
                                onClick={onBack}
                                className="text-sm text-zinc-500 hover:text-zinc-700 underline"
                            >
                                ← Back
                            </button>
                    </>
                )}
            </div>
        </div>
    );
}
