import React from "react";

interface MoodIntentFormProps {
    onSelect: (intent: "fit" | "shift") => void;
    onBack: () => void;
}

export default function MoodIntentForm({ onSelect, onBack }: MoodIntentFormProps) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-rose-50 via-amber-50 to-lime-50 flex items-center justify-center px-4 py-10 relative overflow-hidden">
            {/* Glow blobs */}
            <div className="absolute top-[-100px] left-[-100px] w-[250px] h-[250px] bg-gradient-to-br from-rose-300 via-amber-200 to-lime-100 rounded-full blur-3xl opacity-40 z-0" />
            <div className="absolute bottom-[-100px] right-[-100px] w-[220px] h-[220px] bg-gradient-to-tr from-amber-200 via-lime-200 to-rose-100 rounded-full blur-2xl opacity-30 z-0" />

            {/* Main card */}
            <div className="relative z-10 w-full max-w-md  backdrop-blur-md space-y-6">
                <h2 className="text-xl font-bold text-center text-zinc-800">
                    How should we support your mood?
                </h2>

                <div className="space-y-4">
                    <button
                        onClick={() => onSelect("fit")}
                        className="w-full p-4 text-left rounded-xl border-2 border-amber-300 bg-white bg-opacity-60 hover:bg-amber-50/60 transition-all duration-200 shadow-sm"
                    >
                        <div className="font-semibold text-amber-800 text-lg flex items-center gap-2">
                            🎧 Fit My Mood
                        </div>
                        <div className="text-sm text-zinc-600 mt-1">
                            Show me music, stories, or suggestions that match how I feel.
                        </div>
                    </button>

                    <button
                        onClick={() => onSelect("shift")}
                        className="w-full p-4 text-left rounded-xl border-2 border-rose-400 bg-white bg-opacity-60 hover:bg-rose-50/60 transition-all duration-200 shadow-sm"
                    >
                        <div className="font-semibold text-rose-700 text-lg flex items-center gap-2">
                            🚀 Shift My Mood
                        </div>
                        <div className="text-sm text-zinc-600 mt-1">
                            Nudge me toward a better vibe. Bring on the uplift.
                        </div>
                    </button>
                </div>

                <div className="pt-4 text-center">
                    <button
                        onClick={onBack}
                        className="text-sm text-zinc-600 hover:text-zinc-800 underline"
                    >
                        ← Back
                    </button>
                </div>
            </div>
        </div>
    );
}
