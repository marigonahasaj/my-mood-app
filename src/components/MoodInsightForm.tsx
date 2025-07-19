import React from "react";
import toast from "react-hot-toast";

interface MoodInsightFormProps {
    moodLabel: string;
    onNext: (data: { moodLabel: string; answers: string[]; hasPaid?: boolean }) => void;
    onBack: () => void;
}

const moodSpecificQuestions: Record<string, string[]> = {
    // 🔴 Negative
    "Lonely": [
        "When did you last feel truly connected to someone?",
        "Do you feel physically alone, emotionally distant, or both?",
        "Is this loneliness more about others — or something within you?",
    ],
    "Emotionally Numb": [
        "Do you remember the last time you felt something deeply?",
        "Are you actively avoiding emotions, or are they just not arriving?",
        "What would need to happen for you to feel again?",
    ],
    "Identity Crisis": [
        "What part of yourself feels unclear or unstable?",
        "Are you shifting because of growth — or confusion?",
        "What used to define you that no longer feels true?",
    ],
    "Panicking": [
        "What’s making your body feel unsafe right now?",
        "Can you name the worst-case scenario you’re fearing?",
        "Is this moment urgent — or does it just feel that way?",
    ],
    "Burned Out": [
        "What part of your life feels most drained?",
        "Are you tired — or completely emptied out?",
        "What would rest look like if you could take it seriously?",
    ],
    "Insecure": [
        "What part of yourself feels most judged right now?",
        "Are you comparing yourself to someone — or your own expectations?",
        "What would help you feel more grounded in your worth?",
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
    "Affection Starved": [
        "What kind of connection are you craving right now?",
        "Do you feel unseen, untouched, or unheard?",
        "When was the last time you felt emotionally nourished?",
    ],
    "Masking Emotions": [
        "Who are you pretending for — and why?",
        "What emotion are you suppressing beneath the surface?",
        "What would it take to show your real self right now?",
    ],
    "Sentimental": [
        "What memory keeps resurfacing lately?",
        "Is this nostalgia joyful, painful, or both?",
        "What do you miss — the person, the place, or the version of you?",
    ],
    "Lost": [
        "What feels unclear or directionless?",
        "Are you questioning your path, your identity, or both?",
        "Is this a passing fog or a deeper kind of disorientation?",
    ],

    // 🟡 Neutral
    "Craving Change": [
        "What part of your life feels stuck or outdated?",
        "What kind of change are you hoping for — big or small?",
        "Are you ready to take action, or still figuring it out?",
    ],
    "Mentally Escaping": [
        "Where does your mind wander when you need relief?",
        "Are you avoiding something in your current reality?",
        "Is this escape a recharge — or a red flag?",
    ],
    "Distracted": [
        "What keeps pulling your focus away today?",
        "Is your distraction physical, emotional, or digital?",
        "What would help you return to the present?",
    ],
    "Cluttered": [
        "What’s taking up too much space in your mind right now?",
        "Are you overwhelmed by things to do — or things to feel?",
        "What would bring you one small moment of clarity?",
    ],
    "Seeking Comfort": [
        "What’s been comforting to you lately?",
        "Do you feel safe where you are — emotionally and physically?",
        "What’s one soft or simple thing you’re craving today?",
    ],
    "Suspicious": [
        "What’s made you feel uneasy or uncertain?",
        "Is this suspicion coming from logic — or fear?",
        "Would clarity help here — or distance?",
    ],

    // 🟢 Positive
    "Empowered": [
        "What’s making you feel powerful or capable today?",
        "Are you expressing this confidence openly or keeping it grounded?",
        "How can you channel this energy toward something meaningful?",
    ],
    "Hyper-Focused": [
        "What are you locked in on right now?",
        "Is this focus energizing — or exhausting?",
        "What’s motivating your momentum today?",
    ],
    "Calm & Present": [
        "What helped you reach this calm space?",
        "Are you resisting chaos — or simply flowing through it?",
        "What’s keeping you grounded right now?",
    ],
    "Quietly Hopeful": [
        "What’s giving you that quiet sense of optimism?",
        "Is this hope rooted in evidence — or intuition?",
        "How can you protect this soft feeling?",
    ],
    "Energetically Motivated": [
        "What’s fueling your movement or motivation today?",
        "Does it feel effortless — or like you're pushing through?",
        "How can you ride this wave without burning out?",
    ],
    "Clear-Headed": [
        "What cleared the fog for you?",
        "Is this clarity new — or always there, just ignored?",
        "What can you decide or act on now, while your mind is this clear?",
    ],
    "Falling in Love": [
        "What makes this person feel magnetic to you?",
        "Are you letting yourself feel it — or trying to resist?",
        "What part of you feels most alive in their presence?",
    ],
    "Crushing Hard": [
        "What’s drawing you in — their vibe, their energy, or something deeper?",
        "Are you fantasizing about them — or about how they make you feel?",
        "Would it scare you to be honest about your feelings?",
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
                const res = await fetch(`/api/verify-payment?session_id=${sessionId}`);
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