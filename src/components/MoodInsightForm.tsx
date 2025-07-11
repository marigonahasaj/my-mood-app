import React from "react";

interface MoodInsightFormProps {
    moodLabel: string;
    onNext: (data: { moodLabel: string; answers: string[] }) => void;
    onBack: () => void;
}

const moodSpecificQuestions: Record<string, string[]> = {
    "Falling in Love": [
        "How did this feeling start?",
        "Is it being reciprocated, or is it mostly internal?",
        "Does this feeling energize or distract you?",
    ],
    "Crushing Hard": [
        "What makes this person stick in your mind?",
        "Have you acted on this feeling or kept it private?",
        "How do you feel when you're not around them?",
    ],
    "Empowered": [
        "What helped you feel in control today?",
        "Is this tied to a recent action or boundary?",
        "How long have you felt this way?",
    ],
    "Just Failed": [
        "What did you expect to happen?",
        "Are you blaming yourself or learning from it?",
        "How are you treating yourself after this experience?",
    ],
    "Cheated or Betrayed": [
        "What broke your trust?",
        "Was this the first sign or a final one?",
        "What do you need to feel safe again?",
    ],
    "Heartbroken": [
        "What part hurts the most right now?",
        "Do you feel more sadness, anger, or emptiness?",
        "Is there someone you wish you could talk to?",
    ],
    "Overwhelmed": [
        "What's demanding your attention right now?",
        "What are you afraid of dropping or missing?",
        "When was the last time you felt calm?",
    ],
    "Ready for Change": [
        "What feels outdated or stagnant?",
        "What would you try if fear wasn’t a factor?",
        "Is this a small change or a deep shift?",
    ],
    // Fallback
    default: [
        "What do you think triggered this mood?",
        "Is it tied to something external or internal?",
        "Would you like more of this mood — or less of it?",
    ],
};

function getQuestionsForMood(moodLabel: string): string[] {
    return moodSpecificQuestions[moodLabel] || moodSpecificQuestions.default;
}

export default function MoodInsightForm({ moodLabel, onNext, onBack }: MoodInsightFormProps) {
    const questions = getQuestionsForMood(moodLabel);
    const [answers, setAnswers] = React.useState<string[]>(Array(questions.length).fill(""));

    const handleChange = (index: number, value: string) => {
        const updated = [...answers];
        updated[index] = value;
        setAnswers(updated);
    };

    const handleSubmit = () => {
        onNext({ moodLabel, answers });
    };

    return (
        <div className="h-[600px] bg-gradient-to-b from-rose-50 via-amber-50 to-lime-50 flex flex-col justify-between px-6 py-4 relative overflow-hidden">
            {/* Glowy blobs */}
            <div className="absolute top-[-100px] left-[-100px] w-[250px] h-[250px] bg-gradient-to-br from-rose-300 via-amber-200 to-lime-100 rounded-full blur-3xl opacity-40 z-0" />
            <div className="absolute bottom-[-100px] right-[-100px] w-[220px] h-[220px] bg-gradient-to-tr from-amber-200 via-lime-200 to-rose-100 rounded-full blur-2xl opacity-30 z-0" />

            {/* Form Container */}
            <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col justify-between flex-1">
                <div className="space-y-6 mb-6">
                    <h2 className="text-xl font-semibold -tracking-wider w-full">Let’s understand this mood better</h2>

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
