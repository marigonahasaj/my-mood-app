import React, {useEffect, useMemo, useRef, useState} from "react";
import {
    RocketLaunchIcon,
    MusicalNoteIcon,
    TrophyIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

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
        label: "Clear-Headed",
        description: "No chaos. No clutter. Just grounded thinking and steady vibes.",
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
        description: "You barely know them, but they’ve taken over your mental playlist.",
        image: "/images/crush.webp",
        tone: "positive",
        borderColor: "border-blue-400",
    },

    // 🟡 NEUTRAL
    {
        emoji: "🔄",
        label: "Craving Change",
        description: "Something needs to shift. A job? A vibe? You’re ready to shake things up.",
        image: "/images/change.webp",
        tone: "neutral",
        borderColor: "border-indigo-400",
    },
    {
        emoji: "🧳",
        label: "Mentally Escaping",
        description: "You’re dreaming of elsewhere. A different place, pace, or person.",
        image: "/images/escape.webp",
        tone: "neutral",
        borderColor: "border-violet-500",
    },
    {
        emoji: "🔁",
        label: "Distracted",
        description: "Can’t focus. Refreshing tabs, rereading lines, nothing’s sticking.",
        image: "/images/forgetting.jpeg",
        tone: "neutral",
        borderColor: "border-purple-400",
    },
    {
        emoji: "📦",
        label: "Cluttered",
        description: "Too many thoughts, not enough clarity. You need a mental declutter.",
        image: "/images/todolist.jpg",
        tone: "neutral",
        borderColor: "border-fuchsia-400",
    },
    {
        emoji: "🥐",
        label: "Seeking Comfort",
        description: "Soft clothes. Easy snacks. Low-stakes vibes. That’s the mood.",
        image: "/images/snacking.webp",
        tone: "neutral",
        borderColor: "border-pink-400",
    },
    {
        emoji: "🕵️‍♀️",
        label: "Suspicious",
        description: "You’re picking up on weird energy. Trusting your gut — not your group chat.",
        image: "/images/suspicious.webp",
        tone: "neutral",
        borderColor: "border-rose-400",
    },

    // 🔴 NEGATIVE
    {
        emoji: "🌫️",
        label: "Lost",
        description: "The map’s gone. The motivation’s missing. You’re wandering internally.",
        image: "/images/lost.webp",
        tone: "negative",
        borderColor: "border-gray-500",
    },
    {
        emoji: "🫥",
        label: "Emotionally Numb",
        description: "You’re present, but disconnected. Everything feels muted.",
        image: "/images/numb.webp",
        tone: "negative",
        borderColor: "border-neutral-500",
    },
    {
        emoji: "🥶",
        label: "Lonely",
        description: "You’re surrounded, but it doesn’t feel like anyone sees you.",
        image: "/images/lonely.webp",
        tone: "negative",
        borderColor: "border-cyan-600",
    },
    {
        emoji: "🧩",
        label: "Identity Crisis",
        description: "You’re questioning everything — especially yourself.",
        image: "/images/identity.webp",
        tone: "negative",
        borderColor: "border-indigo-500",
    },
    {
        emoji: "🧨",
        label: "Panicking",
        description: "Tight chest. Racing thoughts. It’s fight, flight, or freeze time.",
        image: "/images/panic.webp",
        tone: "negative",
        borderColor: "border-rose-700",
    },
    {
        emoji: "💤",
        label: "Burned Out",
        description: "Not just tired — empty. You’re scraping the bottom of your energy barrel.",
        image: "/images/burnout.webp",
        tone: "negative",
        borderColor: "border-orange-600",
    },
    {
        emoji: "🪞",
        label: "Insecure",
        description: "You’re overthinking every move and doubting your worth.",
        image: "/images/insecure.webp",
        tone: "negative",
        borderColor: "border-blue-400",
    },
    {
        emoji: "🫣",
        label: "Guilty",
        description: "Something’s weighing on you. You wish it had gone differently.",
        image: "/images/guilty.webp",
        tone: "negative",
        borderColor: "border-yellow-700",
    },
    {
        emoji: "🧿",
        label: "Jealous",
        description: "You’re watching someone else shine — and it stings more than you want to admit.",
        image: "/images/jealous.webp",
        tone: "negative",
        borderColor: "border-emerald-700",
    },
    {
        emoji: "💔",
        label: "Affection Starved",
        description: "It’s not just about hugs. You’re craving someone who *gets it*.",
        image: "/images/affection.webp",
        tone: "negative",
        borderColor: "border-pink-700",
    },
    {
        emoji: "🎭",
        label: "Masking Emotions",
        description: "You’re smiling for the world while hiding a storm inside.",
        image: "/images/masking.webp",
        tone: "negative",
        borderColor: "border-purple-500",
    },
    {
        emoji: "📸",
        label: "Sentimental",
        description: "Everything feels like a memory today. Bittersweet and vivid.",
        image: "/images/sentimental.webp",
        tone: "negative",
        borderColor: "border-fuchsia-500",
    }
];


export default function OnboardingForm({
                                           onSelect,

                                       }: {
    onSelect: (profile: MoodProfile, mode: "fit" | "shift") => void;
    onSkipPaid: (email: string) => void;
}) {
    const [step, setStep] = useState(0);
    const [selected, setSelected] = useState<MoodProfile | null>(null);
    const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const sortedProfiles = useMemo(() => {
        const negatives = moodProfiles.filter((m) => m.tone === "negative");
        const neutrals = moodProfiles.filter((m) => m.tone === "neutral");
        const positives = moodProfiles.filter((m) => m.tone === "positive");
        return [...negatives, ...neutrals, ...positives];
    }, []);


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
    }, [step, sortedProfiles]);

    if (step === 0) {
        return (
            <div className="relative h-[100vh] max-h-[100vh] bg-white overflow-hidden flex flex-col justify-between">
                <div className="relative z-10 flex-1 flex flex-col justify-start md:justify-center px-4 py-10 sm:py-16 lg:py-24">

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

                                <div className="absolute top-0 transform animate-roll space-y-[10px] z-0">
                                    {[...Array(3)].map((_, i) => (
                                        <Image
                                            key={i}
                                            src="/images/emotions.gif"
                                            alt={`Emotions ${i}`}
                                            width={100}
                                            height={100}
                                            className="w-full object-cover"
                                            priority
                                        />
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


                    </div>
                </div>


            </div>

        );
    }

    return (
        <div className="h-[100vh] max-h-[100vh] flex flex-col items-start md:items-center justify-start md:justify-center py-4 relative overflow-hidden">
            <div className="relative z-10 w-full max-w-md">
                <h2 className="text-xl font-semibold -tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-olive-500 via-olive-300 to-amber-400 w-full px-4">
                    Current vibe:
                </h2>

                <div className="mt-2 flex flex-col rounded-2xl border border-zinc-200 shadow-inner overflow-hidden min-h-[400px] max-h-[470px]">
                {/* Top shadow indicator */}
                    <div className="pointer-events-none absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white to-transparent z-10" />

                    {/* Scrollable mood list */}
                    <div className="flex-1 overflow-y-auto bg-white px-4 py-4 space-y-4">
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
                                className="flex-1 rounded-xl border-amber-300 bg-amber-400 hover:bg-amber-500 transition text-white p-2 shadow-sm"
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
