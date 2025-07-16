import {supabase} from "@/types/supabaseClient";

export const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: 'http://localhost:3000'
        }
});


    if (error) {
        throw error;
    }
};
