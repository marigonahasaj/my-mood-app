"use client";
import React, { useState } from "react";

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
                                        }: {
    onNext: (data: string[]) => void;
    onBack: () => void;
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
        if (selected && selectedSub) {
            const result = [selected, selectedSub];
            if (selected === "Talk It Out") {
                result.push(inputValue.trim());
            }
            onNext(result);
        }
    };

    const isTalkItOut = selected === "Talk It Out";
    const isReady = selected && selectedSub && (!isTalkItOut || inputValue.trim().length > 0);

    return (
        <div className="h-[600px] bg-gradient-to-b from-rose-50 via-amber-50 to-lime-50 flex flex-col items-center justify-between px-6 py-4 relative">
            {/* Glow Blobs */}
            <div className="absolute top-[-100px] left-[-100px] w-[250px] h-[250px] bg-gradient-to-br from-rose-300 via-amber-200 to-lime-100 rounded-full blur-3xl opacity-40 z-0" />
            <div className="absolute bottom-[-100px] right-[-100px] w-[220px] h-[220px] bg-gradient-to-tr from-amber-200 via-lime-200 to-rose-100 rounded-full blur-2xl opacity-30 z-0" />

            {/* Scrollable content area */}
            <div className="z-10 w-full flex-1 max-w-md">
                <h2 className="text-xl font-semibold -tracking-wider text-zinc-800 w-full">
                    What usually affects your mood?
                </h2>

                {/* Main Options */}
                <div className="grid grid-cols-2 gap-2 text-left pt-2">
                    {options.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => handleMainSelect(item.label)}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl transition border-2 text-center h-20 ${
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
                    <div className="text-center mt-4">
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
                            Describe how you're feeling (max 300 characters):
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
                        disabled={!isReady}
                        className="px-4 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-rose-400 via-amber-500 to-lime-500 hover:from-rose-500 hover:to-lime-500 disabled:bg-zinc-300 disabled:cursor-not-allowed"
                    >
                        Continue →
                    </button>
                </div>
            </div>
        </div>
    );

}
