"use client";
import React, { useEffect, useState } from "react";
import OnboardingForm from "@/components/OnboardingForm";
import MoodInsightForm from "@/components/MoodInsightForm";
import {UserDetailsForm} from "@/components/UserDetailsForm";
import AlmostThereForm from "@/components/AlmostThereForm";
import MoodResult from "@/components/MoodResult";
import MoodResultLoading from "@/components/MoodResultIsLoading";
import ResultPage from "@/components/ResultPage";
import SuccessStep from "@/components/SuccessStep";
import { FormData } from "@/types/formdata";import toast, { Toaster } from 'react-hot-toast';



export default function App() {
    const [step, setStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [openAiResponse, setOpenAiResponse] = useState<string | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem("formData");
        if (saved) {
            const parsed = JSON.parse(saved);
            setFormData(parsed);
        }
    }, []);


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
        if (step === 3) {
            setIsLoading(true);
            const timer = setTimeout(() => setIsLoading(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [step]);

    useEffect(() => {
        const sessionId = new URLSearchParams(window.location.search).get("session_id");
        if (!sessionId) return;

        const verifyPayment = async () => {
            const res = await fetch(`/api/verify-payment?session_id=${sessionId}`);
            const data = await res.json();

            if (data.status === "paid") {
                const savedForm = localStorage.getItem("formData");
                const parsed = savedForm ? JSON.parse(savedForm) : null;

                const updatedFormData = {
                    ...(parsed ?? formData),
                    userDetails: {
                        ...(parsed?.userDetails ?? formData.userDetails),
                        email: data.email,
                        hasPaid: true,
                    },
                };

                localStorage.setItem("formData", JSON.stringify(updatedFormData));
                setFormData(updatedFormData);

                // STEP 1: Transition into result loading view
                setStep(98);

                // STEP 2: Ask backend to generate response
                try {
                    const gen = await fetch("/api/generate-response", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updatedFormData),
                    });

                    const genData = await gen.json();
                    if (genData.status === "success") {
                        setOpenAiResponse(genData.response);
                        setTimeout(() => setStep(5), 2000); // Small delay for better UX
                    } else {
                        toast.error("Failed to generate your insight. Try again.");
                        setStep(4); // fallback
                    }
                } catch (e) {
                    console.error("Generation error:", e);
                    toast.error("Server error while generating your result.");
                    setStep(4); // fallback
                }

                // Clear the session_id from the URL
                window.history.replaceState({}, document.title, "/");
            }
        };

        verifyPayment();
    }, []);




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
        <main className="min-h-screen flex justify-center items-start md:items-center bg-white">
            <Toaster position="top-center" />
            <div className="w-full max-w-md space-y-4 p-4">
                {step === 0 && (
                    <OnboardingForm
                        onSelect={(profile) => {
                            setFormData((f) => ({
                                ...f,
                                profile,
                            }));
                            setStep(1);
                        }}
                    />

                )}

                {step === 1 && (
                    <MoodInsightForm
                        moodLabel={formData.profile.label}
                        onNext={(insights) => {
                            const userHasPaid = insights.hasPaid ?? formData.userDetails.hasPaid;

                            setFormData((f) => ({
                                ...f,
                                moodInsights: {
                                    moodLabel: insights.moodLabel,
                                    answers: insights.answers,
                                },
                                userDetails: {
                                    ...f.userDetails,
                                    hasPaid: userHasPaid,
                                },
                            }));

                            if (userHasPaid) {
                                setStep(3);
                            } else {
                                setStep(2);
                            }
                        }}
                        onBack={goBack}
                    />


                )}

                {step === 2 && (
                    <UserDetailsForm
                        hasPaid={formData.userDetails.hasPaid}
                        onSubmit={(userDetails) => {
                            setFormData((f) => ({
                                ...f,
                                userDetails: {
                                    ...userDetails,
                                    hasPaid: f.userDetails.hasPaid,
                                    isAuthenticated: f.userDetails.isAuthenticated,
                                    skipped: false,
                                },
                            }));
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
                    formData.userDetails.hasPaid ? (
                        (() => {
                            setStep(4);
                            return null;
                        })()
                    ) : (
                        <AlmostThereForm
                            onNext={(finalDetails) => {
                                setFormData((f) => ({ ...f, finalDetails }));
                                goNext();
                            }}
                            onBack={goBack}
                        />
                    )
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
                    <ResultPage
                        key={openAiResponse}
                        response={openAiResponse}
                        formData={formData}
                        moodIntent={formData.moodIntent}
                        setOpenAiResponse={setOpenAiResponse}
                        onReset={resetFlow}
                    />
                )}

                {step === 98 && (
                    <div className="text-center space-y-6 p-6 animate-pulse">
                        <h2 className="text-2xl font-bold text-lime-700">🎉 Thanks for the tip!</h2>
                        <p className="text-zinc-600">Fetching your personalized insight...</p>
                    </div>
                )}

                {step === 99 && (
                    <SuccessStep
                        onContinue={() => {
                            setStep(openAiResponse ? 5 : 4);
                        }}

                    />
                )}
            </div>
        </main>
    );
}
