import {useState} from "react";

function LoginModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
    const [email, setEmail] = useState("");
    const handleLogin = () => {
        // fake token logic
        localStorage.setItem("moodUserEmail", email);
        onSuccess();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl max-w-sm w-full space-y-4 shadow-lg">
                <h3 className="text-lg font-semibold text-zinc-800">Save your progress</h3>
                <input
                    type="email"
                    placeholder="Your email"
                    className="w-full border px-4 py-2 rounded-lg text-zinc-700"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    onClick={handleLogin}
                    className="w-full py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600"
                >
                    Send magic link
                </button>
                <button
                    onClick={onClose}
                    className="text-sm text-zinc-500 hover:underline block text-center"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default LoginModal
