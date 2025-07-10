"use client";
import React, { useEffect, useState } from "react";
import OnboardingForm from "@/components/OnboardingForm";
import MoodInsightForm from "@/components/MoodInsightForm";
import UserDetailsForm from "@/components/UserDetailsForm";
import AlmostThereForm from "@/components/AlmostThereForm";
import MoodResult from "@/components/MoodResult";
import MoodResultLoading from "@/components/MoodResultIsLoading";
import ResultPage from "@/components/ResultPage";
import { FormData } from "@/types/formdata";

export default function App() {
    const [step, setStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [openAiResponse, setOpenAiResponse] = useState<string | null>(null);

    const [formData, setFormData] = useState<FormData>({
        profile: { emoji: "", label: "", description: "", image: "", tone: "" },
        moodInsights: { moodLabel: "", answers: [] },
        userDetails: {
            name: "",
            email: "",
            ageRange: "",
            gender: "",
            sleepQuality: "",
            energyLevel: 3,
            socialConnection: "",
            mentalClarity: "",
            moodStability: "",
            currentFeeling: "",
            emotionalNeed: "",
            isAuthenticated: false,
            hasPaid: false,
            skipped: true,
        },
        moodIntent: "",
        finalDetails: [],
    });

    useEffect(() => {
        if (step === 4) {
            setIsLoading(true);
            const timer = setTimeout(() => setIsLoading(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [step]);

    const goBack = () => setStep((prev) => Math.max(0, prev - 1));
    const goNext = () => setStep((prev) => prev + 1);
    const resetFlow = () => {
        setFormData({
            profile: { emoji: "", label: "", description: "", image: "", tone: "" },
            moodInsights: { moodLabel: "", answers: [] },
            userDetails: {
                name: "",
                email: "",
                ageRange: "",
                gender: "",
                sleepQuality: "",
                energyLevel: 3,
                socialConnection: "",
                mentalClarity: "",
                moodStability: "",
                currentFeeling: "",
                emotionalNeed: "",
                isAuthenticated: false,
                hasPaid: false,
                skipped: true,
            },
            moodIntent: "",
            finalDetails: [],
        });
        setOpenAiResponse(null);
        setStep(0);
    };

    return (
        <main className="min-h-screen flex justify-center items-center bg-white">
            <div className="w-full max-w-md space-y-4 p-4">
                {step === 0 && (
                    <OnboardingForm
                        onSelect={(profile) => {
                            setFormData((f) => ({ ...f, profile }));
                            goNext();
                        }}
                    />
                )}

                {step === 1 && (
                    <MoodInsightForm
                        moodLabel={formData.profile.label}
                        onNext={(insights) => {
                            setFormData((f) => ({ ...f, moodInsights: insights }));
                            goNext();
                        }}
                        onBack={goBack}
                    />
                )}

                {step === 2 && (
                    <UserDetailsForm
                        onSubmit={(userDetails) => {
                            setFormData((f) => ({ ...f, userDetails }));
                            goNext();
                        }}
                        onSkip={() => {
                            setFormData((f) => ({
                                ...f,
                                userDetails: {
                                    ...f.userDetails,
                                    skipped: true,
                                },
                            }));
                            goNext();
                        }}
                        onBack={goBack}
                    />
                )}

                {step === 3 && (
                    <AlmostThereForm
                        onNext={(finalDetails) => {
                            setFormData((f) => ({ ...f, finalDetails }));
                            goNext();
                        }}
                        onBack={goBack}
                    />
                )}

                {step === 4 && (
                    <>
                        {isLoading ? (
                            <MoodResultLoading />
                        ) : (
                            <MoodResult
                                formData={formData}
                                openAiResponse={openAiResponse}
                                setOpenAiResponse={setOpenAiResponse}
                                onBack={goBack}
                                onReset={resetFlow}
                                goNext={goNext}
                            />
                        )}
                    </>
                )}

                {step === 5 && openAiResponse && (
                    <ResultPage response={openAiResponse} onReset={resetFlow} moodIntent={formData.moodIntent} />
                )}
            </div>
        </main>
    );
}
