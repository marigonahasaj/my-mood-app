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
import {supabase} from "@/types/supabaseClient";

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

    useEffect(() => {
        const finalizeOAuthLogin = async () => {
            if (window.location.hash.includes("access_token")) {
                const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.hash);

                if (error) {
                    console.error("OAuth error:", error.message);
                    return;
                }

                const user = data.session?.user;
                console.log("✅ Logged in user:", user);

                const email = user?.email || "";

                // 🔍 Check if this user has paid
                const res = await fetch(`http://localhost:8000/has-paid?email=${email}`);
                const { paid } = await res.json();

                setFormData((prev) => ({
                    ...prev,
                    userDetails: {
                        ...prev.userDetails,
                        email,
                        name: user?.user_metadata?.full_name || "",
                        isAuthenticated: true,
                        skipped: false,
                        hasPaid: paid,
                    },
                }));

                // If paid, skip payment step
                setStep(paid ? 4 : 3);

                // Clean up the URL
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        };

        finalizeOAuthLogin();
    }, []);

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (session?.user) {
                const user = session.user;
                const email = user.email || "";

                const res = await fetch(`http://localhost:8000/has-paid?email=${email}`);
                const { paid } = await res.json();

                setFormData((prev) => ({
                    ...prev,
                    userDetails: {
                        ...prev.userDetails,
                        email,
                        name: user.user_metadata?.full_name || "",
                        isAuthenticated: true,
                        skipped: false,
                        hasPaid: paid,
                    },
                }));

                setStep(paid ? 4 : 3);
            }
        };

        checkSession();
    }, []);


    return (
        <main className="min-h-screen w-full flex justify-center items-center bg-white overflow-hidden">
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
