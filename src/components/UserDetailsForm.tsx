"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

type UserDetails = {
    name?: string;
    email?: string;
    ageRange?: string;
    gender?: string;
    sleepQuality?: string;
    energyLevel: number;
    socialConnection?: string;
    mentalClarity?: string;
    moodStability?: string;
    currentFeeling?: string;
    emotionalNeed?: string;
    isAuthenticated?: boolean;
    hasPaid?: boolean;
};


export function UserDetailsForm({
                                    onSubmit,
                                    onBack,
                                    hasPaid
                                }: {
    onSubmit: (data: UserDetails) => void;
    onSkip: () => void;
    onBack: () => void;
    hasPaid?: boolean;
}) {

    const [formData, setFormData] = useState<UserDetails>({
        name: "",
        email: "",
        ageRange: "",
        gender: "",
        sleepQuality: "",
        energyLevel: 5,
    });

    const handleChange = (field: keyof UserDetails, value: string | number | boolean) => {
        setFormData((prev) => ({...prev, [field]: value}));
    };


    const buttonGroup = (
        group: { label: string; value: string; emoji?: string }[],
        field: keyof UserDetails,
        selected: string | undefined,
        color = "amber"
    ) => (
        <div className="flex flex-wrap gap-2 text-sm">
            {group.map(({label, value, emoji}) => (
                <button
                    key={value}
                    type="button"
                    onClick={() => handleChange(field, value)}
                    className={`px-3 py-1 rounded-full border transition flex items-center gap-1 ${
                        selected === value
                            ? `bg-${color}-100 border-${color}-400 text-zinc-900 font-semibold`
                            : "border-zinc-300 text-zinc-500 hover:border-zinc-400"
                    }`}
                >
                    {emoji && <span>{emoji}</span>}
                    <span>{label}</span>
                </button>
            ))}
        </div>
    );

    const handleSubmit = () => {
        const requiredFields: (keyof UserDetails)[] = [
            "name",
            "email",
            "ageRange",
            "gender",
            "sleepQuality",
            "socialConnection",
            "mentalClarity",
            "moodStability",
            "currentFeeling",
            "emotionalNeed",
        ];

        const missing = requiredFields.filter((field) => !formData[field]);

        if (!hasPaid && missing.length > 0) {
            toast.error("🧠 Help us nudge you better — all fields are required.");
            return;
        }

        onSubmit({
            ...formData,
            energyLevel: Number(formData.energyLevel),
        });
    };


    return (
        <div
            className="min-h-screen bg-gradient-to-b from-rose-50 via-amber-50 to-lime-50 flex flex-col relative overflow-hidden">
            <div
                className="absolute top-[-100px] left-[-100px] w-[250px] h-[250px] bg-gradient-to-br from-rose-300 via-amber-200 to-lime-100 rounded-full blur-3xl opacity-40 z-0"/>
            <div
                className="absolute bottom-[-100px] right-[-100px] w-[220px] h-[220px] bg-gradient-to-tr from-amber-200 via-lime-200 to-rose-100 rounded-full blur-2xl opacity-30 z-0"/>

            <div
                className="relative z-10 max-w-md w-full mx-auto space-y-6 flex flex-col justify-between flex-1 px-4 py-6">
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-center text-zinc-800">
                        Okay but like… who even are you 👀:
                    </h2>

                    <div className="space-y-4">
                        <InputField label="First name" value={formData.name}
                                    onChange={(val) => handleChange("name", val)}/>
                        <InputField label="Email" type="email" value={formData.email}
                                    onChange={(val) => handleChange("email", val)}/>

                        {/* Age Range */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-700">Age range</label>
                            <select
                                value={formData.ageRange}
                                onChange={(e) => handleChange("ageRange", e.target.value)}
                                className="mt-1 w-full border border-zinc-300 rounded-xl px-4 py-2 text-sm focus:ring-amber-200"
                            >
                                <option value="">Select</option>
                                <option value="12-18">12-18</option>
                                <option value="18-24">18–24</option>
                                <option value="25-34">25–34</option>
                                <option value="35-44">35–44</option>
                                <option value="45+">45+</option>
                            </select>
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-1">Gender</label>
                            {buttonGroup(
                                [
                                    {label: "Woman", value: "Woman", emoji: "👩"},
                                    {label: "Man", value: "Man", emoji: "👨"},
                                    {label: "Non-binary", value: "Non-binary", emoji: "🧑‍🎤"},
                                    {label: "Skip", value: "Prefer not to say", emoji: "❔"},
                                ],
                                "gender",
                                formData.gender
                            )}
                        </div>

                        {/* Sleep */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2">Got any sleep this past
                                week?</label>
                            {buttonGroup(
                                [
                                    {emoji: "🐻", label: "Hibernation mode", value: "Bear"},
                                    {emoji: "🐑", label: "Pretty okay", value: "Lamb"},
                                    {emoji: "🦊", label: "Barely blinked", value: "Fox"},
                                ],
                                "sleepQuality",
                                formData.sleepQuality
                            )}
                        </div>

                        {/* Energy */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2">How’s your energy?</label>
                            {buttonGroup(
                                [
                                    {value: "3", emoji: "🪫", label: "Running on fumes"},
                                    {value: "6", emoji: "🔋", label: "Steady but chill"},
                                    {value: "9", emoji: "⚡", label: "Zooming today"},
                                ],
                                "energyLevel",
                                String(formData.energyLevel),
                                "lime"
                            )}
                        </div>

                        {/* Social connection */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2">Lately, have you felt
                                more…</label>
                            {buttonGroup(
                                [
                                    {value: "Connected", label: "Connected to people"},
                                    {value: "Neutral", label: "Somewhere in between"},
                                    {value: "Disconnected", label: "Disconnected or isolated"},
                                ],
                                "socialConnection",
                                formData.socialConnection
                            )}
                        </div>

                        {/* Mental clarity */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2">How’s your mind
                                feeling?</label>
                            {buttonGroup(
                                [
                                    {value: "Clear", label: "Clear and focused"},
                                    {value: "Cluttered", label: "Cluttered or distracted"},
                                    {value: "Racing", label: "Racing thoughts"},
                                ],
                                "mentalClarity",
                                formData.mentalClarity
                            )}
                        </div>

                        {/* Mood stability */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2">Has your mood been…</label>
                            {buttonGroup(
                                [
                                    {value: "Steady", label: "Pretty steady"},
                                    {value: "Up and down", label: "Up and down"},
                                    {value: "Unpredictable", label: "All over the place"},
                                ],
                                "moodStability",
                                formData.moodStability
                            )}
                        </div>

                        {/* Dominant feeling */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2">Which word describes you
                                best right now?</label>
                            <input
                                type="text"
                                placeholder="e.g. Grateful, Anxious, Free, Angry..."
                                className="mt-1 w-full border border-zinc-300 rounded-xl px-4 py-2 text-sm focus:ring-amber-200"
                                value={formData.currentFeeling || ""}
                                onChange={(e) => handleChange("currentFeeling", e.target.value)}
                            />
                        </div>

                        {/* Emotional need */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2">What do you feel you need
                                most today?</label>
                            {buttonGroup(
                                [
                                    {value: "Rest", label: "Rest"},
                                    {value: "Reassurance", label: "Reassurance"},
                                    {value: "Motivation", label: "Motivation"},
                                    {value: "Fun", label: "Fun"},
                                    {value: "Clarity", label: "Clarity"},
                                    {value: "A reset", label: "A reset button"},
                                ],
                                "emotionalNeed",
                                formData.emotionalNeed
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-zinc-200">
                    <button onClick={onBack} className="text-sm text-zinc-600 hover:text-zinc-800 underline">
                        ← Back
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="py-2 px-6 rounded-xl text-white font-medium bg-gradient-to-r from-rose-400 via-amber-500 to-lime-500 hover:from-rose-500 hover:to-lime-500 transition shadow-md"
                    >
                        Continue →
                    </button>
                </div>
            </div>
        </div>
    );
}

function InputField({
                        label,
                        value,
                        onChange,
                        type = "text",
                    }: {
    label: string;
    value?: string;
    onChange: (val: string) => void;
    type?: string;
}) {
    return (
        <div>
            <label className="block text-sm font-medium text-zinc-700">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 w-full border border-zinc-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-200"
            />
        </div>
    );
}
