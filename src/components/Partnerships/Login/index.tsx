"use client";

import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { partnershipAPI } from "@/lib/api";

type Mode = "login" | "forgot" | "reset" | "forgot_sent";

export default function PartnerLogin() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [mode, setMode] = useState<Mode>("login");
    const [resetToken, setResetToken] = useState("");
    const [resetEmail, setResetEmail] = useState("");

    // Login form
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    // Forgot password form
    const [forgotEmail, setForgotEmail] = useState("");
    // Reset password form
    const [resetData, setResetData] = useState({ newPassword: "", confirmPassword: "" });
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Detect reset mode from URL params
    useEffect(() => {
        const urlMode = searchParams.get("mode");
        const token = searchParams.get("token");
        const email = searchParams.get("email");
        if (urlMode === "reset" && token && email) {
            setResetToken(token);
            setResetEmail(email);
            setMode("reset");
        }
    }, [searchParams]);

    const clearError = () => setError("");

    // ── Login ────────────────────────────────────────────────────────
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            const response = await partnershipAPI.login(loginData);
            localStorage.setItem("partnerToken", response.token);
            localStorage.setItem("partnerInfo", JSON.stringify({
                partnerId: response.partnerId,
                name: response.name,
                phone: response.phone,
                email: response.email,
                partnershipType: response.partnershipType,
                firmName: response.firmName,
                status: response.status,
            }));
            router.push("/partnerships/dashboard");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // ── Forgot password ──────────────────────────────────────────────
    const handleForgotSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            await partnershipAPI.forgotPassword(forgotEmail.trim().toLowerCase());
            setMode("forgot_sent");
        } catch {
            // Always show success to prevent enumeration (backend does same)
            setMode("forgot_sent");
        } finally {
            setIsLoading(false);
        }
    };

    // ── Reset password ───────────────────────────────────────────────
    const handleResetSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (resetData.newPassword !== resetData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (resetData.newPassword.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }
        setIsLoading(true);
        try {
            await partnershipAPI.resetPassword(resetEmail, resetToken, resetData.newPassword);
            // Success — go back to login with success message shown inline
            setMode("login");
            setError("");
            setLoginData({ email: resetEmail, password: "" });
        } catch (err) {
            setError(err instanceof Error ? err.message : "Password reset failed. The link may have expired.");
        } finally {
            setIsLoading(false);
        }
    };

    // ── Shared error/status banner ───────────────────────────────────
    const ErrorBanner = ({ message }: { message: string }) => (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                <Icon icon="ph:warning-fill" width={18} height={18} />
                {message}
            </p>
        </div>
    );

    // ── Render ───────────────────────────────────────────────────────
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:py-16 bg-gradient-to-br from-primary/5 via-white to-primary/5 dark:from-primary/10 dark:via-black dark:to-primary/10">
            <div className="w-full max-w-md">

                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon icon="ph:handshake-fill" width={40} height={40} className="text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
                        {mode === "forgot" ? "Forgot Password" :
                         mode === "forgot_sent" ? "Check Your Email" :
                         mode === "reset" ? "Reset Password" :
                         "Dashboard Login"}
                    </h1>
                    <p className="text-sm text-black/60 dark:text-white/60">
                        {mode === "forgot" ? "Enter your email to receive a reset link" :
                         mode === "forgot_sent" ? "A reset link has been sent if your account exists" :
                         mode === "reset" ? "Enter your new password below" :
                         "Access your Refer a Friend or Partnership dashboard"}
                    </p>
                </div>

                <div className="border border-black/10 dark:border-white/10 rounded-2xl p-8 shadow-xl dark:shadow-white/10 bg-white dark:bg-dark">

                    {/* ── LOGIN FORM ─────────────────────────────────────── */}
                    {mode === "login" && (
                        <form onSubmit={handleLogin}>
                            <div className="space-y-6">
                                {error && <ErrorBanner message={error} />}

                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-black dark:text-white mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                            <Icon icon="ph:envelope-fill" width={20} height={20} className="text-black/40 dark:text-white/40" />
                                        </div>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Enter your email address"
                                            required
                                            value={loginData.email}
                                            onChange={(e) => { setLoginData({ ...loginData, email: e.target.value }); clearError(); }}
                                            className="w-full pl-12 pr-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline bg-transparent text-black dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-semibold text-black dark:text-white mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                            <Icon icon="ph:lock-fill" width={20} height={20} className="text-black/40 dark:text-white/40" />
                                        </div>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            placeholder="Enter your password"
                                            required
                                            value={loginData.password}
                                            onChange={(e) => { setLoginData({ ...loginData, password: e.target.value }); clearError(); }}
                                            className="w-full pl-12 pr-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline bg-transparent text-black dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span className="text-black/60 dark:text-white/60">Remember me</span>
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => { setMode("forgot"); setForgotEmail(loginData.email); clearError(); }}
                                        className="text-primary hover:underline"
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full px-8 py-4 rounded-full bg-primary text-white text-base font-semibold hover:bg-dark transition-all duration-300 flex items-center justify-center gap-2 ${isLoading ? "opacity-75 cursor-not-allowed" : "cursor-pointer"}`}
                                >
                                    {isLoading ? (
                                        <><Icon icon="ph:spinner" width={20} height={20} className="animate-spin" /><span>Logging in...</span></>
                                    ) : (
                                        <><span>Login</span><Icon icon="ph:sign-in-fill" width={20} height={20} /></>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* ── FORGOT PASSWORD FORM ───────────────────────────── */}
                    {mode === "forgot" && (
                        <form onSubmit={handleForgotSubmit}>
                            <div className="space-y-6">
                                {error && <ErrorBanner message={error} />}

                                <div>
                                    <label htmlFor="forgotEmail" className="block text-sm font-semibold text-black dark:text-white mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                            <Icon icon="ph:envelope-fill" width={20} height={20} className="text-black/40 dark:text-white/40" />
                                        </div>
                                        <input
                                            type="email"
                                            id="forgotEmail"
                                            placeholder="Enter your registered email"
                                            required
                                            value={forgotEmail}
                                            onChange={(e) => { setForgotEmail(e.target.value); clearError(); }}
                                            className="w-full pl-12 pr-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline bg-transparent text-black dark:text-white"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full px-8 py-4 rounded-full bg-primary text-white text-base font-semibold hover:bg-dark transition-all duration-300 flex items-center justify-center gap-2 ${isLoading ? "opacity-75 cursor-not-allowed" : "cursor-pointer"}`}
                                >
                                    {isLoading ? (
                                        <><Icon icon="ph:spinner" width={20} height={20} className="animate-spin" /><span>Sending...</span></>
                                    ) : (
                                        <><Icon icon="ph:paper-plane-fill" width={20} height={20} /><span>Send Reset Link</span></>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => { setMode("login"); clearError(); }}
                                    className="w-full text-sm text-black/60 dark:text-white/60 hover:text-primary flex items-center justify-center gap-1"
                                >
                                    <Icon icon="ph:arrow-left" width={16} height={16} />
                                    Back to Login
                                </button>
                            </div>
                        </form>
                    )}

                    {/* ── FORGOT SENT CONFIRMATION ───────────────────────── */}
                    {mode === "forgot_sent" && (
                        <div className="space-y-6 text-center">
                            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
                                <Icon icon="ph:envelope-open-fill" width={32} height={32} className="text-green-600 dark:text-green-400" />
                            </div>
                            <p className="text-sm text-black/70 dark:text-white/70 leading-relaxed">
                                If an account with that email exists, we&apos;ve sent a password reset link. Please check your inbox — the link is valid for <strong>15 minutes</strong>.
                            </p>
                            <button
                                type="button"
                                onClick={() => { setMode("login"); clearError(); }}
                                className="w-full px-8 py-4 rounded-full bg-primary text-white text-base font-semibold hover:bg-dark transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <Icon icon="ph:arrow-left" width={20} height={20} />
                                Back to Login
                            </button>
                        </div>
                    )}

                    {/* ── RESET PASSWORD FORM ────────────────────────────── */}
                    {mode === "reset" && (
                        <form onSubmit={handleResetSubmit}>
                            <div className="space-y-6">
                                {error && <ErrorBanner message={error} />}

                                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                    <p className="text-xs text-blue-700 dark:text-blue-300 flex items-center gap-2">
                                        <Icon icon="ph:info-fill" width={16} height={16} />
                                        Resetting password for <strong>{resetEmail}</strong>
                                    </p>
                                </div>

                                <div>
                                    <label htmlFor="newPassword" className="block text-sm font-semibold text-black dark:text-white mb-2">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                            <Icon icon="ph:lock-fill" width={20} height={20} className="text-black/40 dark:text-white/40" />
                                        </div>
                                        <input
                                            type={showNewPassword ? "text" : "password"}
                                            id="newPassword"
                                            placeholder="Minimum 8 characters"
                                            required
                                            minLength={8}
                                            value={resetData.newPassword}
                                            onChange={(e) => { setResetData({ ...resetData, newPassword: e.target.value }); clearError(); }}
                                            className="w-full pl-12 pr-12 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline bg-transparent text-black dark:text-white"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40 hover:text-primary"
                                        >
                                            <Icon icon={showNewPassword ? "ph:eye-slash-fill" : "ph:eye-fill"} width={20} height={20} />
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-black dark:text-white mb-2">
                                        Confirm New Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                            <Icon icon="ph:lock-key-fill" width={20} height={20} className="text-black/40 dark:text-white/40" />
                                        </div>
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            id="confirmPassword"
                                            placeholder="Re-enter your new password"
                                            required
                                            value={resetData.confirmPassword}
                                            onChange={(e) => { setResetData({ ...resetData, confirmPassword: e.target.value }); clearError(); }}
                                            className="w-full pl-12 pr-12 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline bg-transparent text-black dark:text-white"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40 hover:text-primary"
                                        >
                                            <Icon icon={showConfirmPassword ? "ph:eye-slash-fill" : "ph:eye-fill"} width={20} height={20} />
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full px-8 py-4 rounded-full bg-primary text-white text-base font-semibold hover:bg-dark transition-all duration-300 flex items-center justify-center gap-2 ${isLoading ? "opacity-75 cursor-not-allowed" : "cursor-pointer"}`}
                                >
                                    {isLoading ? (
                                        <><Icon icon="ph:spinner" width={20} height={20} className="animate-spin" /><span>Resetting...</span></>
                                    ) : (
                                        <><Icon icon="ph:check-circle-fill" width={20} height={20} /><span>Set New Password</span></>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* ── Register links (shown only on login/forgot screens) ── */}
                    {(mode === "login" || mode === "forgot") && (
                        <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10 text-center">
                            <p className="text-sm text-black/60 dark:text-white/60 mb-4">
                                Don&apos;t have an account yet?
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <a
                                    href="/referrals"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/5 dark:bg-white/5 text-black dark:text-white hover:bg-primary hover:text-white transition-colors font-semibold cursor-pointer text-sm w-full sm:w-auto justify-center"
                                >
                                    <Icon icon="ph:users-fill" width={20} height={20} />
                                    Refer a Friend
                                </a>
                                <a
                                    href="/partnerships"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/5 dark:bg-white/5 text-black dark:text-white hover:bg-primary hover:text-white transition-colors font-semibold cursor-pointer text-sm w-full sm:w-auto justify-center"
                                >
                                    <Icon icon="ph:briefcase-fill" width={20} height={20} />
                                    Apply for Partnership
                                </a>
                            </div>
                        </div>
                    )}
                </div>

                {/* Help Section */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-black/60 dark:text-white/60 mb-2">Need help?</p>
                    <a
                        href="mailto:info@walldotbuilders.com"
                        className="text-sm text-primary hover:underline font-semibold cursor-pointer"
                    >
                        Contact Referral Partnership Team
                    </a>
                </div>
            </div>
        </div>
    );
}
