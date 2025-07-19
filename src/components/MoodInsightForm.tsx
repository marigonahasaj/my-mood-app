import React from "react";
import toast from "react-hot-toast";

interface MoodInsightFormProps {
    moodLabel: string;
    onNext: (data: { moodLabel: string; answers: string[]; hasPaid?: boolean }) => void;
    onBack: () => void;
}

const moodSpecificQuestions: Record<string, string[]> = {
    "Lonely": [
        "When did you last feel truly connected to someone?",
        "Do you feel physically alone, emotionally distant, or both?",
        "Is this loneliness more about others — or something within you?",
    ],
    "Bored": [
        "What do you wish you were doing instead right now?",
        "Is your boredom from lack of stimulation or lack of purpose?",
        "Does this boredom show up often — or just today?",
    ],
    "Emotionally Numb": [
        "Do you remember the last time you felt something deeply?",
        "Are you actively avoiding emotions, or are they just not arriving?",
        "What would need to happen for you to feel again?",
    ],
    "Guilty": [
        "What triggered this feeling of guilt?",
        "Have you apologized — or do you feel it wouldn’t help?",
        "Is this guilt helping you grow or keeping you stuck?",
    ],
    "Jealous": [
        "What do you think you're missing that others have?",
        "Is your jealousy about them — or about your own unmet needs?",
        "Would having what they have actually bring you peace?",
    ],
    "Insecure": [
        "What part of yourself feels most judged right now?",
        "Are you comparing yourself to someone — or your own expectations?",
        "What would help you feel more grounded in your worth?",
    ],
    "Lost": [
        "What feels unclear or directionless?",
        "Are you questioning your path, your identity, or both?",
        "Is this a passing fog or a deeper kind of disorientation?",
    ],
    "Panicking": [
        "What’s making your body feel unsafe right now?",
        "Can you name the worst-case scenario you’re fearing?",
        "Is this moment urgent — or does it just feel that way?",
    ],
    "Masking Happiness": [
        "Who are you pretending for — and why?",
        "What would it feel like to show what you're really feeling?",
        "What part of your true emotion is hardest to admit?",
    ],
    "Affection Starved": [
        "What kind of connection are you craving right now?",
        "Do you feel unseen, untouched, or unheard?",
        "When was the last time you felt emotionally nourished?",
    ],
    "Sentimental": [
        "What memory keeps resurfacing lately?",
        "Is this nostalgia joyful, painful, or both?",
        "What do you miss — the person, the place, or the version of you?",
    ],
    "Vulnerable": [
        "What part of you feels exposed right now?",
        "Are you being open by choice — or because you had to be?",
        "Do you feel safe in this vulnerability — or on edge?",
    ],
    "Burned Out": [
        "What part of your life feels most drained?",
        "Are you tired — or completely emptied out?",
        "What would rest look like if you could take it seriously?",
    ],
    "Impatient": [
        "What are you waiting for that feels overdue?",
        "Is your frustration with time, people, or your own pace?",
        "Would slowing down feel like failure or freedom?",
    ],
    "Loved": [
        "What made you feel truly seen or valued today?",
        "Do you feel safe enough to receive that love fully?",
        "Is it hard for you to believe this is real?",
    ],
    "Identity Crisis": [
        "What part of yourself feels unclear or unstable?",
        "Are you shifting because of growth — or confusion?",
        "What used to define you that no longer feels true?",
    ],
};

function getQuestionsForMood(moodLabel: string): string[] {
    return moodSpecificQuestions[moodLabel] || [];
}


export default function MoodInsightForm({ moodLabel, onNext, onBack }: MoodInsightFormProps) {
    const questions = getQuestionsForMood(moodLabel);
    const [answers, setAnswers] = React.useState<string[]>(Array(questions.length).fill(""));

    const handleChange = (index: number, value: string) => {
        const updated = [...answers];
        updated[index] = value;
        setAnswers(updated);
    };

    const handleSubmit = async () => {
        console.log("🔍 Submitting mood insights…");

        let sessionId: string | null = null;
        if (typeof window !== "undefined") {
            sessionId = new URLSearchParams(window.location.search).get("session_id");
        }

        console.log("🔑 Session ID from URL:", sessionId);

        let paid = false;
        if (sessionId) {
            try {
                const res = await fetch(`http://localhost:8000/verify-payment?session_id=${sessionId}`);
                const data = await res.json();
                console.log("✅ /verify-payment response:", data);
                paid = data.status === "paid";
            } catch (err) {
                console.error("❌ Error verifying payment:", err);
            }
        }

        // 🛑 Validate inputs if NOT paid
        if (!paid && answers.some((ans) => !ans.trim())) {
            toast.error("Please answer all questions before continuing.");
            return;
        }

        onNext({ moodLabel, answers, hasPaid: paid });
    };


    return (
        <div className="h-[667px] max-h-[667px] w-full bg-white flex flex-col p-4 relative overflow-hidden mx-auto">
            {/* Form Container */}
            <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col justify-between flex-1 px-2">
                <div className="space-y-2 my-4">
                    <h2 className="text-xl font-semibold -tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-olive-500 via-olive-300 to-amber-400 w-full px-4">
                        Let’s understand this mood better</h2>

                    <div className="space-y-2 overflow-y-auto">
                        {questions.map((q, i) => (
                            <div key={i} className="space-y-1">
                                <label className="text-sm text-zinc-700">{q}</label>
                                <textarea
                                    rows={3}
                                    value={answers[i]}
                                    onChange={(e) => handleChange(i, e.target.value)}
                                    className="w-full border border-zinc-300 rounded-xl px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-200"
                                    placeholder="Type your answer..."
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-zinc-200">
                    <button
                        onClick={onBack}
                        className="text-sm text-zinc-600 hover:text-zinc-800 underline"
                    >
                        ← Back
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="py-2 px-6 rounded-xl text-white font-medium bg-gradient-to-r from-rose-400 via-amber-500 to-lime-500 hover:from-rose-500 hover:to-lime-500 transition shadow-md"
                    >
                        Next →
                    </button>
                </div>
            </div>
        </div>
    );
}