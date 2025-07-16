"use client";
import React from "react";

export default function SuccessStep({ onContinue }: { onContinue: () => void }) {
    return (
        <div className="text-center space-y-6 p-6">
            <h2 className="text-2xl font-bold text-lime-700">🎉 Payment Successful!</h2>
            <p className="text-zinc-600">Thanks for the coffee! Your profile will be remembered next time.</p>
            <button
                onClick={onContinue}
                className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-400 via-amber-400 to-lime-400 text-white font-semibold shadow hover:brightness-110"
            >
                Continue →
            </button>
        </div>
    );
}
