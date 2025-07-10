import {useState} from "react";

export default function LoginStep({ onLogin }: { onLogin: (email: string) => void }) {
    const [email, setEmail] = useState("");

    return (
        <div className="max-w-md mx-auto space-y-6 py-20">
            <h2 className="text-xl font-bold text-center text-zinc-800">
                Let’s keep things personal—but quick.
            </h2>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-zinc-300 rounded-xl px-4 py-2 text-sm focus:ring-amber-200"
            />
            <button
                onClick={() => onLogin(email)}
                disabled={!email}
                className="w-full py-2 px-4 rounded-xl text-white font-semibold bg-amber-500 hover:bg-amber-600 transition"
            >
                Continue →
            </button>
        </div>
    );
}
