import React, { useEffect, useRef, useState } from "react";
import {
    RocketLaunchIcon,
    SparklesIcon,
    MusicalNoteIcon,
    TrophyIcon,
} from "@heroicons/react/24/outline";
import {signInWithGoogle} from "@/utils/auth";

type MoodTone = "negative" | "neutral" | "positive";

type MoodProfile = {
    emoji: string;
    label: string;
    description: string;
    image: string;
    tone: MoodTone;
    borderColor: string;
};

const moodProfiles: MoodProfile[] = [
    // 🟢 POSITIVE
    {
        emoji: "🦁",
        label: "Empowered",
        description: "You’re standing tall today. Boundaries firm. Confidence on.",
        image: "/images/empowered.webp",
        tone: "positive",
        borderColor: "border-yellow-400",
    },
    {
        emoji: "🚀",
        label: "Hyper-Focused",
        description: "Locked in. Flowing through tasks like a machine with a mission.",
        image: "/images/focused.webp",
        tone: "positive",
        borderColor: "border-yellow-300",
    },
    {
        emoji: "🧘",
        label: "Calm & Present",
        description: "Emotionally balanced, mentally focused, and okay with where you are.",
        image: "/images/calm.jpg",
        tone: "positive",
        borderColor: "border-lime-300",
    },
    {
        emoji: "🌱",
        label: "Quietly Hopeful",
        description: "Slight optimism bubbling under the surface. Not sure why, but it feels nice.",
        image: "/images/hope.webp",
        tone: "positive",
        borderColor: "border-lime-400",
    },
    {
        emoji: "🏃‍♀️",
        label: "Energetically Motivated",
        description: "You didn’t plan it — but you're moving, focused, and getting things done.",
        image: "/images/motivated.jpg",
        tone: "positive",
        borderColor: "border-emerald-400",
    },
    {
        emoji: "🧊",
        label: "Stable & Clear-Headed",
        description: "No chaos. No drama. Just emotionally hydrated and steady.",
        image: "/images/cool.jpg",
        tone: "positive",
        borderColor: "border-teal-400",
    },
    {
        emoji: "💘",
        label: "Falling in Love",
        description: "Heart racing. Brain glitching. Suddenly every song is about them.",
        image: "/images/inlove.webp",
        tone: "positive",
        borderColor: "border-sky-400",
    },
    {
        emoji: "🔥",
        label: "Crushing Hard",
        description: "You barely know them, but somehow they’re living rent-free in your head.",
        image: "/images/crush.webp",
        tone: "positive",
        borderColor: "border-blue-400",
    },

    // 🟡 NEUTRAL
    {
        emoji: "🔄",
        label: "Ready for Change",
        description: "Something needs to shift. A job? A habit? A vibe? You’re itching for new.",
        image: "/images/change.webp",
        tone: "neutral",
        borderColor: "border-indigo-400",
    },
    {
        emoji: "🧳",
        label: "Craving Escape",
        description: "You're fantasizing about disappearing for a while. Just... anywhere else.",
        image: "/images/escape.webp",
        tone: "neutral",
        borderColor: "border-violet-500",
    },
    {
        emoji: "🔁",
        label: "Distracted",
        description: "Can't stay focused. Refreshing tabs, rereading lines, mind skipping.",
        image: "/images/forgetting.jpeg",
        tone: "neutral",
        borderColor: "border-purple-400",
    },
    {
        emoji: "📦",
        label: "Mentally Cluttered",
        description: "Too many tasks, not enough clarity. Brain feels tab-overloaded.",
        image: "/images/todolist.jpg",
        tone: "neutral",
        borderColor: "border-fuchsia-400",
    },
    {
        emoji: "🥐",
        label: "Unmotivated Comfort-Seeker",
        description: "Drifting into snacks, scrolling, and soft distractions.",
        image: "/images/snacking.webp",
        tone: "neutral",
        borderColor: "border-pink-400",
    },
    {
        emoji: "🕵️‍♀️",
        label: "Suspicious",
        description: "Gut says something’s off. You’re watching, not reacting (yet).",
        image: "/images/suspicious.webp",
        tone: "neutral",
        borderColor: "border-rose-400",
    },

    // 🔴 NEGATIVE
    {
        emoji: "🎡",
        label: "Overwhelmed",
        description: "Thoughts racing, mind spinning, everything feels urgent.",
        image: "/images/overwhelmed.webp",
        tone: "negative",
        borderColor: "border-red-400",
    },
    {
        emoji: "🛏️",
        label: "Exhausted",
        description: "Mentally alert, physically drained. Even sitting up feels like effort.",
        image: "/images/tired.avif",
        tone: "negative",
        borderColor: "border-red-500",
    },
    {
        emoji: "🫠",
        label: "Anxious & Shutting Down",
        description: "Emotionally tense, socially checked out, holding it together on the surface.",
        image: "/images/spiraling.webp",
        tone: "negative",
        borderColor: "border-rose-500",
    },
    {
        emoji: "📉",
        label: "Just Failed",
        description: "That didn’t go as planned. A little embarrassed. A lot deflated.",
        image: "/images/failure.webp",
        tone: "negative",
        borderColor: "border-zinc-500",
    },
    {
        emoji: "💔",
        label: "Heartbroken",
        description: "It hurts. It really hurts. And you're just trying to stay afloat.",
        image: "/images/heartbroken.webp",
        tone: "negative",
        borderColor: "border-zinc-500",
    },
    {
        emoji: "🧨",
        label: "Cheated or Betrayed",
        description: "That trust? Gone. You're stunned, angry, or both.",
        image: "/images/cheated.webp",
        tone: "negative",
        borderColor: "border-zinc-600",
    },
    {
        emoji: "🔒",
        label: "Guarded",
        description: "Walls up. Trust is earned, and today isn’t the day.",
        image: "/images/guarded.webp",
        tone: "negative",
        borderColor: "border-zinc-600",
    },
    {
        emoji: "🎭",
        label: "Feeling Manipulated",
        description: "Something feels off. You’re being steered, not heard.",
        image: "/images/manipulated.webp",
        tone: "negative",
        borderColor: "border-zinc-600",
    },
    {
        emoji: "🌪️",
        label: "Emotionally Flooded",
        description: "Too many feelings, too fast. You're trying to keep it together.",
        image: "/images/flooded.webp",
        tone: "negative",
        borderColor: "border-neutral-600",
    },
];

export default function OnboardingForm({ onSelect }: { onSelect: (profile: MoodProfile, mode: "fit" | "shift") => void }) {
    const [step, setStep] = useState(0);
    const [selected, setSelected] = useState<MoodProfile | null>(null);
    const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const sortedProfiles = [
        ...moodProfiles.filter((m) => m.tone === "negative"),
        ...moodProfiles.filter((m) => m.tone === "neutral"),
        ...moodProfiles.filter((m) => m.tone === "positive"),
    ];

    useEffect(() => {
        if (step === 1) {
            const neutralIndex = sortedProfiles.findIndex((m) => m.tone === "neutral");
            if (neutralIndex !== -1 && itemRefs.current[neutralIndex]) {
                itemRefs.current[neutralIndex]?.scrollIntoView({ behavior: "smooth", inline: "start" });
                setTimeout(() => {
                    const scrollContainer = document.querySelector(".overflow-x-auto");
                    scrollContainer?.scrollBy({ left: -40, behavior: "smooth" });
                }, 400);
            }
        }
    }, [step]);

    if (step === 0) {
        return (
            <div className="relative bg-white overflow-hidden flex flex-col justify-between lg:border lg:border-olive-100 lg:rounded-2xl lg:shadow-sm">
                <div className="relative z-10 flex-1 flex flex-col justify-between px-4 py-4 sm:py-6 lg:py-12">

                    {/* Top content */}
                    <div className="max-w-xl w-full mx-auto text-center space-y-8">
                        <h1 className="pt-2 sm:pt-6 lg:pt-10 text-4xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-500 to-lime-500">
                            FitMyVibe
                        </h1>

                        <div className="space-y-2 text-zinc-700 text-sm sm:text-base text-center">
                            <div>
                                <span className="text-md text-olive-600 tracking-tight">Feeling off today?</span>
                                <ul className="space-y-2 mt-3 text-xl text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-amber-500 to-lime-500">
                                    <li>Let our AI do the overthinking for once.</li>
                                </ul>
                            </div>

                            <div className="relative h-28 overflow-hidden flex justify-center shadow-inner bg-white bg-opacity-30 backdrop-blur-3xl">
                                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
                                <div className="absolute top-0 animate-roll space-y-[10px] z-0">
                                    {[...Array(3)].map((_, i) => (
                                        <img key={i} src="/images/emotions.gif" alt={`Emotions ${i}`} className="w-full object-cover" />
                                    ))}
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
                            </div>

                            <div className="pt-2">
                                <ul className="grid grid-cols-3 gap-y-4 text-sm text-center w-full max-w-sm mx-auto">
                                    {[
                                        {
                                            icon: <MusicalNoteIcon className="w-6 h-6 text-olive-500" />,
                                            label: "Music",
                                            description: "Set the tone",
                                        },
                                        {
                                            icon: <TrophyIcon className="w-6 h-6 text-yellow-500" />,
                                            label: "Stories",
                                            description: "Feel the win",
                                        },
                                        {
                                            icon: (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.6}
                                                    stroke="currentColor"
                                                    className="w-6 h-6 text-rose-400"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M8.25 8.25C7.007 8.25 6 9.257 6 10.5v.75c0 .414.336.75.75.75h1.5v.75c0 1.243-1.007 2.25-2.25 2.25m9.75-6.75c-1.243 0-2.25 1.007-2.25 2.25v.75c0 .414.336.75.75.75h1.5v.75c0 1.243-1.007 2.25-2.25 2.25"
                                                    />
                                                </svg>
                                            ),
                                            label: "Quotes",
                                            description: "Quick fuel",
                                        },
                                        {
                                            icon: <span className="text-xl">🗣️</span>,
                                            label: "Talk",
                                            description: "Speak it out",
                                        },
                                        {
                                            icon: <span className="text-xl">🍓</span>,
                                            label: "Food",
                                            description: "Snack ideas",
                                        },
                                        {
                                            icon: <span className="text-xl">😂</span>,
                                            label: "Laughs",
                                            description: "Mood boost",
                                        },
                                    ].map((item) => (
                                        <li
                                            key={item.label}
                                            className="flex flex-col items-center justify-center space-y-0.5 px-2"
                                        >
                                            <div>{item.icon}</div>
                                            <span className="font-medium text-[10px] text-zinc-800">{item.label}</span>
                                            <span className="text-[11px] text-zinc-500">{item.description}</span>
                                        </li>
                                    ))}
                                </ul>

                            </div>
                        </div>
                    </div>

                    {/* Bottom buttons */}
                    <div className="space-y-4 text-center max-w-md w-full mx-auto mt-6 px-2">
                        <button
                            onClick={() => setStep(1)}
                            className="w-full flex gap-x-2 items-center justify-center py-4 rounded-2xl font-semibold text-white text-lg bg-gradient-to-r from-rose-400 via-amber-500 to-lime-500 hover:from-rose-500 hover:to-lime-500 transition-all duration-300 shadow-lg"
                        >
                            Tune it UP <RocketLaunchIcon className="text-white w-6 h-6" />
                        </button>

                        <div className="text-sm text-zinc-600">

                            <button
                                className="inline-flex items-center justify-center text-amber-500 hover:text-amber-700 font-medium underline"
                                onClick={signInWithGoogle}
                            >
                                Skip the small talk →
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

    return (
        <div className="h-[600px]  bg-gradient-to-b from-rose-50 via-amber-50 to-lime-50 flex flex-col items-center justify-between px-6 py-4 relative overflow-hidden lg:border lg:border-olive-100 lg:rounded-2xl lg:shadow-sm">
            <div className="relative z-10 w-full max-w-md">
                <h2 className="text-xl font-semibold -tracking-wider text-zinc-800 w-full">
                    Current vibe:
                </h2>

                <div className="mt-2 relative rounded-2xl border border-zinc-200 shadow-inner overflow-hidden">
                    {/* Top shadow indicator */}
                    <div className="pointer-events-none absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white to-transparent z-10" />

                    {/* Scrollable mood list */}
                    <div className="max-h-[420px] overflow-y-auto bg-white px-4 py-4 space-y-4">
                        <fieldset className="space-y-4" aria-label="Mood Profile">
                            {sortedProfiles.map((profile) => {
                                const isSelected = selected?.label === profile.label;

                                return (
                                    <label
                                        key={profile.label}
                                        className={`group relative block rounded-xl px-4 py-4 cursor-pointer transition-all border ${
                                            isSelected
                                                ? `ring-2 ring-offset-1 ring-amber-300 ${profile.borderColor}`
                                                : `${profile.borderColor} hover:border-amber-300`
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="mood"
                                            value={profile.label}
                                            checked={isSelected}
                                            onChange={() => setSelected(profile)}
                                            className="absolute inset-0 appearance-none cursor-pointer focus:outline-none"
                                        />
                                        <div className="flex items-start gap-4 text-left">
                                            <div className="text-xl">{profile.emoji}</div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-zinc-800 text-sm">{profile.label}</span>
                                                <span className="text-xs text-zinc-600">{profile.description}</span>
                                            </div>
                                        </div>
                                    </label>
                                );
                            })}
                        </fieldset>
                    </div>

                    {/* Bottom scroll indicator */}
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent z-10" />
                </div>






                {selected ? (
                    <div className="py-4">
                        <div className="flex flex-row gap-4 w-full">
                            <button
                                onClick={() => onSelect(selected, "fit")}
                                className="flex-1 rounded-xl border-amber-300 bg-amber-400 hover:bg-amber-700 transition text-white p-2 shadow-sm"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="flex items-center font-semibold">
                                        🎧
                                    </div>
                                    <div className="flex items-center gap-1 text-base font-semibold">
                                      <span>Fit My Mood</span>
                                    </div>
                                    <p className="text-sm text-amber-100 mt-0.5">
                                        Match how I feel.
                                    </p>
                                </div>
                            </button>

                            <button
                                onClick={() => onSelect(selected, "shift")}
                                className="flex-1 border-olive-700 rounded-xl bg-olive-300 hover:bg-olive-400 transition text-white p-2 shadow-sm"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="flex items-center font-semibold">
                                        🚀
                                    </div>
                                    <div className="flex items-center gap-1 text-base font-semibold">
                                     <span>Shift My Mood</span>
                                    </div>
                                    <p className="text-sm text-rose-100 mt-0.5">
                                        Bring on the uplift.
                                    </p>
                                </div>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="pt-4 pb-6 text-center">
                        <p className="text-sm text-olive-500 transition-opacity duration-300">
                            Please select a mood to continue 🙃
                        </p>
                    </div>
                )}


            </div>
        </div>
    );
}
