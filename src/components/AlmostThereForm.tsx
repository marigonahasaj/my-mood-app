"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

const options = [
    { label: "Cool Jams", emoji: "🎵" },
    { label: "Uplifting Quotes", emoji: "📝" },
    { label: "Mini Stories", emoji: "📚" },
    { label: "Talk It Out", emoji: "🗣️" },
    { label: "Mood Bites", emoji: "🍓" },
    { label: "Laugh Dose", emoji: "😂" },
];

const subOptions: Record<string, string[]> = {
    "Cool Jams": [
        "Lo-fi", "Chill beats", "90s R&B", "Confident energy", "Instrumental only", "Something nostalgic",
    ],
    "Uplifting Quotes": [
        "Stoic wisdom", "Poetic vibes", "Short & punchy", "Empathetic and warm", "From famous people", "From anonymous voices",
    ],
    "Mini Stories": [
        "Heartwarming", "Funny and weird", "Romantic", "Realistic", "Set in the past", "Fantasy or surreal",
    ],
    "Talk It Out": [
        "I need comfort", "I want a challenge", "Just distract me", "Ask deep stuff", "Keep it light",
    ],
    "Mood Bites": [
        "Sweet snack ideas", "Salty cravings", "Healthy suggestions", "Comfort food", "Quick recipes", "Treat-yourself foods",
    ],
    "Laugh Dose": [
        "Absurd humor", "Clever wordplay", "Relatable memes", "PG only", "Dark humor", "TikTok-style funnies",
    ],
};

export default function AlmostThereForm({
                                            onNext,
                                            onBack,
                                            hasPaid,
                                        }: {
    onNext: (data: string[], skipMoodResult: boolean) => void;
    onBack: () => void;
    hasPaid: boolean;
}) {
    const [selected, setSelected] = useState<string | null>(null);
    const [selectedSub, setSelectedSub] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState<string>("");


    const handleMainSelect = (label: string) => {
        setSelected(label);
        setSelectedSub(null);
        setInputValue(""); // clear input on option change
    };

    const handleContinue = () => {
        if (!selected) {
            toast.error("🧐 Choose your vibe first — we’re not mind readers (yet).");
            return;
        }

        if (!selectedSub) {
            toast.error("🤔 Pick a flavor — sub-options give us context magic!");
            return;
        }

        if (isTalkItOut && inputValue.trim().length === 0) {
            toast.error("🗣️ Say something — even if it’s just 'ugh'.");
            return;
        }

        const result = [selected, selectedSub];
        if (isTalkItOut) {
            result.push(inputValue.trim());
        }

        // this will skip MoodResult if the user hasPaid
        onNext(result, hasPaid);
    };



    const isTalkItOut = selected === "Talk It Out";

    return (
        <div className="h-[650px] max-h-[650px] w-full bg-white flex flex-col relative overflow-hidden mx-auto p-4">
            {/* Scrollable content area */}
            <div className="z-10 w-full flex-1 max-w-md overflow-y-auto">
                <h2 className="text-xl font-semibold -tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-olive-500 via-olive-300 to-amber-400 w-full">
                    What usually affects your mood?
                </h2>

                {/* Main Options */}
                <div className="grid grid-cols-2 gap-2 text-left mt-4">
                    {options.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => handleMainSelect(item.label)}
                            className={`flex flex-col items-center justify-center p-2 rounded-xl transition border-2 text-center h-20 ${
                                selected === item.label
                                    ? "bg-amber-100 border-amber-400 text-amber-700"
                                    : "bg-white/80 border-zinc-200 hover:border-amber-300"
                            }`}
                        >
                            <span className="text-xl">{item.emoji}</span>
                            <span className="font-medium text-sm mt-1">{item.label}</span>
                        </button>
                    ))}
                </div>

                {/* Sub-options */}
                {selected && (
                    <div className="text-center mt-4 border-t border-b py-4">
                        <h3 className="text-sm font-semibold text-zinc-700 mb-2">
                            Select what fits you best:
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            {subOptions[selected].map((option) => (
                                <button
                                    key={option}
                                    onClick={() => setSelectedSub(option)}
                                    className={`text-sm px-3 py-2 rounded-full border transition ${
                                        selectedSub === option
                                            ? "bg-lime-100 border-lime-400 font-semibold text-lime-800"
                                            : "border-zinc-300 hover:border-zinc-400 text-zinc-600"
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Input for Talk It Out */}
                {isTalkItOut && selectedSub && (
                    <div className="mt-4 text-left">
                        <label className="block text-sm font-medium text-zinc-700 mb-1">
                            Can you describe how you&apos;re feeling in less than 100 words?:
                        </label>
                        <textarea
                            maxLength={300}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-full border border-zinc-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-300"
                            rows={4}
                            placeholder="Let it out here..."
                        />
                        <div className="text-xs text-zinc-500 text-right mt-1">
                            {inputValue.length}/300
                        </div>
                    </div>
                )}
            </div>

            {/* Sticky Action Buttons */}
            <div className="z-10 w-full max-w-md pt-4">
                <div className="flex justify-between items-center">
                    <button
                        onClick={onBack}
                        className="text-sm text-zinc-600 hover:text-zinc-800 underline"
                    >
                        ← Back
                    </button>
                    <button
                        onClick={handleContinue}
                        className="px-4 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-rose-400 via-amber-500 to-lime-500 hover:from-rose-500 hover:to-lime-500"
                    >
                        Continue →
                    </button>
                </div>
            </div>
        </div>
    );

}
