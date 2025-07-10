import React from "react";

const moodLoadingPhrases = [
    "Tuning into your vibe... 🎛️",
    "Consulting the mood muses... ✨",
    "Mixing the perfect match... 🧪",
    "Almost there, we feel you... 👀",
];

export default function MoodResultLoading() {
    return (
        <div className="w-full text-center px-6 py-20">
            <div className="animate-pulse space-y-4">
                <h2 className="text-xl font-bold text-zinc-700">Matching your mood...</h2>
                <p className="text-zinc-500 text-sm italic">
                    {moodLoadingPhrases[Math.floor(Math.random() * moodLoadingPhrases.length)]}
                </p>
                <div className="h-2 w-32 bg-zinc-200 rounded-full mx-auto mt-6 animate-pulse" />
            </div>
        </div>
    );
}
