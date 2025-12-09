"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { partnershipAPI } from "@/lib/api";

export default function PartnerLogin() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        phone: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            // Call Spring Boot API
            const response = await partnershipAPI.login({
                phone: formData.phone,
                password: formData.password,
            });

            // Store partner info and token in localStorage
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

            // Redirect to dashboard
            router.push("/partnerships/dashboard");
        } catch (err) {
            console.error('Login error:', err);
            setError(err instanceof Error ? err.message : "Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:py-16 bg-gradient-to-br from-primary/5 via-white to-primary/5 dark:from-primary/10 dark:via-black dark:to-primary/10">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon icon={"ph:handshake-fill"} width={40} height={40} className="text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
                        Partner Login
                    </h1>
                    <p className="text-sm text-black/60 dark:text-white/60">
                        Access your partnership dashboard
                    </p>
                </div>

                {/* Login Form */}
                <div className="border border-black/10 dark:border-white/10 rounded-2xl p-8 shadow-xl dark:shadow-white/10 bg-white dark:bg-dark">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            {error && (
                                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                                    <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                                        <Icon icon={"ph:warning-fill"} width={18} height={18} />
                                        {error}
                                    </p>
                                </div>
                            )}

                            <div>
                                <label htmlFor="phone" className="block text-sm font-semibold text-black dark:text-white mb-2">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                        <Icon icon={"ph:phone-fill"} width={20} height={20} className="text-black/40 dark:text-white/40" />
                                    </div>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        placeholder="Enter your phone number"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
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
                                        <Icon icon={"ph:lock-fill"} width={20} height={20} className="text-black/40 dark:text-white/40" />
                                    </div>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline bg-transparent text-black dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4" />
                                    <span className="text-black/60 dark:text-white/60">Remember me</span>
                                </label>
                                <a href="#" className="text-primary hover:underline">
                                    Forgot password?
                                </a>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full px-8 py-4 rounded-full bg-primary text-white text-base font-semibold hover:bg-dark transition-all duration-300 flex items-center justify-center gap-2 ${
                                    isLoading ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'
                                }`}
                            >
                                {isLoading ? (
                                    <>
                                        <Icon icon={"ph:spinner"} width={20} height={20} className="animate-spin" />
                                        <span>Logging in...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Login</span>
                                        <Icon icon={"ph:sign-in-fill"} width={20} height={20} />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10 text-center">
                        <p className="text-sm text-black/60 dark:text-white/60 mb-4">
                            Don&apos;t have a partner account?
                        </p>
                        <a
                            href="/partnerships"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/5 dark:bg-white/5 text-black dark:text-white hover:bg-primary hover:text-white transition-colors font-semibold cursor-pointer"
                        >
                            <Icon icon={"ph:user-plus-fill"} width={20} height={20} />
                            Apply for Partnership
                        </a>
                    </div>
                </div>

                {/* Help Section */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-black/60 dark:text-white/60 mb-2">
                        Need help?
                    </p>
                    <a
                        href="mailto:info@walldotbuilders.com"
                        className="text-sm text-primary hover:underline font-semibold cursor-pointer"
                    >
                        Contact Partnership Team
                    </a>
                </div>
            </div>
        </div>
    );
}

