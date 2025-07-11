"use client";
import React, { useState } from "react";

interface ResultPageProps {
    response: string;
    moodIntent: string;
    onReset: () => void;
}

export default function ResultPage({
                                       response,
                                       moodIntent,
                                       onReset,
                                   }: ResultPageProps) {
    const [userMessage, setUserMessage] = useState("");

    const handleSend = () => {
        console.log("User replied:", userMessage);
        // optionally send to server
        onReset();
    };

    const renderResponse = () => {
        if (moodIntent === "Talk It Out") {
            return (
                <>
                    <div className="bg-gray-50 border border-zinc-200 text-zinc-700 text-sm p-4 rounded-lg whitespace-pre-wrap">
                        {response}
                    </div>

                    <textarea
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        placeholder="Type your reply or thoughts here…"
                        className="w-full p-3 mt-4 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                        rows={4}
                    />

                    <button
                        onClick={handleSend}
                        className="mt-4 w-full py-2 rounded-md bg-amber-400 text-white font-semibold hover:bg-amber-500 transition"
                    >
                        Send and Start Over
                    </button>
                </>
            );
        }

        let additionalClass = "";
        if (moodIntent === "Cool Jams") additionalClass = "text-indigo-700";
        if (moodIntent === "Mini Stories") additionalClass = "italic";
        if (moodIntent === "Uplifting Quotes") additionalClass = "text-center text-lg leading-relaxed text-zinc-700";
        if (moodIntent === "Laugh Dose") additionalClass = "text-pink-600 font-medium";
        if (moodIntent === "Mood Bites") additionalClass = "text-amber-700 font-semibold";

        return (
            <div className={`bg-gray-100 text-sm p-4 rounded-lg whitespace-pre-wrap ${additionalClass}`}>
                {response}
            </div>
        );
    };

    return (
        <div className="h-[600px] flex items-center justify-center bg-gradient-to-b from-lime-50 via-amber-50 to-rose-50 px-6 py-4">
            <div className="w-full max-h-[500px] overflow-y-auto max-w-md bg-white px-6 py-8 rounded-2xl shadow-xl space-y-6 text-center text-olive-800">
                <h2 className="text-2xl font-bold text-zinc-800">
                    {moodIntent === "Talk It Out" ? "Let’s Chat 💬" : "Your Vibe-Based Insight"}
                </h2>

                {renderResponse()}

                {moodIntent !== "Talk It Out" && (
                    <button
                        onClick={onReset}
                        className="mt-4 text-sm text-red-500 hover:text-red-700 underline"
                    >
                        Start Over
                    </button>
                )}
            </div>
        </div>
    );
}
