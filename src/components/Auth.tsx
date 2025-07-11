"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {supabase} from "@/types/supabaseClient";

export default function AuthCallback() {
    const router = useRouter();
    const [, setLoading] = useState(true);

    useEffect(() => {
        const handleOAuthCallback = async () => {
            // Parse the access_token and set session in Supabase
            const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.hash);

            if (error) {
                console.error("OAuth error:", error);
                router.push("/"); // fallback to home or error page
                return;
            }

            console.log("Logged in user:", data.session?.user);

            // Optional: store in localStorage or use React context
            localStorage.setItem("user", JSON.stringify(data.session?.user));

            // Redirect to wherever you want after login
            router.push("/app"); // or /onboarding etc.
        };

        handleOAuthCallback().finally(() => setLoading(false));
    }, [router]);

    return (
        <div className="flex items-center justify-center h-screen text-zinc-500">
            Finishing login...
        </div>
    );
}
