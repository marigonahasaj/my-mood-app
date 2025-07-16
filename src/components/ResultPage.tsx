"use client";
import React, { useState } from "react";
import { FormData } from "@/types/formdata";
import toast from "react-hot-toast";

interface ResultPageProps {
    response: string;
    moodIntent: string;
    formData: FormData;
    setOpenAiResponse: (val: string) => void;
    onReset: () => void;
}

export default function ResultPage({
                                       response,
                                       moodIntent,
                                       formData,
                                       setOpenAiResponse,
                                       onReset,
                                   }: ResultPageProps) {
    const [userMessage, setUserMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = () => {
        console.log("User replied:", userMessage);
        onReset();
    };


    const handleAnotherAnswer = async () => {
        console.log("🔄 Fetching another answer for mood:", moodIntent);
        const savedData = localStorage.getItem("formData");
        const isPaid = savedData ? JSON.parse(savedData)?.userDetails?.hasPaid : false;

        if (!isPaid) {
            toast("☕ This feature runs on caffeine only!", { duration: 3000 });
            return;
        }

//         // TEMP: override payment check for testing purposes
//         const isPaid = true; // <== manually force access
//
// // Optionally, log if user is not marked as paid in localStorage
//         const actuallyPaid = savedData ? JSON.parse(savedData)?.userDetails?.hasPaid : false;
//         if (!actuallyPaid) {
//             console.warn("User not marked as paid — allowing access for testing.");
//         }
//

        setLoading(true);
        try {
            const response = await fetch("http://localhost:8000/generate-response", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.status === "success") {
                setOpenAiResponse(data.response);
            } else {
                toast.error("Something went wrong generating a new response.");
            }
        } catch (err) {
            console.error("Error fetching another answer:", err);
            toast.error("Server error. Try again later.");
        } finally {
            setLoading(false);
        }
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-lime-50 via-amber-50 to-rose-50 p-4">
            <div className="w-full max-w-md bg-white p-4 rounded-2xl shadow-xl space-y-4 text-center">
                <h2 className="text-lg font-bold text-zinc-800">
                    {moodIntent === "Talk It Out" ? "Let’s Chat 💬" : "Your Vibe-Based Insight"}
                </h2>

                {loading ? (
                    <p className="text-sm text-zinc-500 animate-pulse">🔄 Generating a fresh take…</p>
                ) : (
                    renderResponse()
                )}
                {moodIntent !== "Talk It Out" && (
                    <>
                        <button
                            onClick={handleAnotherAnswer}
                            className="mt-4 text-sm w-full py-2 rounded-md bg-lime-100 text-lime-700 font-semibold hover:bg-lime-200 transition"
                        >
                            🪄 Another answer?
                        </button>

                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={onReset}
                                className="text-sm text-red-500 hover:text-red-700 underline"
                            >
                                Start Over
                            </button>
                            <button
                                onClick={() => {
                                    localStorage.removeItem("formData");
                                    window.location.reload();
                                }}
                                className="text-sm text-zinc-500 hover:text-zinc-600 underline"
                            >
                                Clear my saved profile
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
