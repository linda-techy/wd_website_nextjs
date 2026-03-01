"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";
import { BASE_API_URL } from "@/lib/config";

export default function Referrals() {
    const [formData, setFormData] = useState({
        yourName: "",
        yourEmail: "",
        yourPhone: "",
        accountPassword: "",
        referralName: "",
        referralEmail: "",
        referralPhone: "",
        projectType: "",
        estimatedBudget: "",
        location: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        try {
            // Submit to public referral API endpoint (no authentication required)
            const response = await fetch(`${BASE_API_URL}/leads/referral`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit referral');
            }

            const result = await response.json();
            
            if (result.success) {
                setSubmitStatus('success');
                
                // Reset form
                setFormData({
                    yourName: "",
                    yourEmail: "",
                    yourPhone: "",
                    accountPassword: "",
                    referralName: "",
                    referralEmail: "",
                    referralPhone: "",
                    projectType: "",
                    estimatedBudget: "",
                    location: "",
                    message: "",
                });
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    setSubmitStatus('idle');
                }, 5000);
            } else {
                throw new Error(result.message || 'Failed to submit referral');
            }
        } catch (error) {
            console.error('Error submitting referral:', error);
            setSubmitStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Failed to submit. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const benefits = [
        {
            icon: "ph:currency-inr-fill",
            title: "Cash Rewards",
            value: "₹10,000 - ₹50,000",
            description: "Earn attractive cash rewards based on project value"
        },
        {
            icon: "ph:users-three-fill",
            title: "Help Loved Ones",
            value: "Trust & Quality",
            description: "Help friends and family build their dream homes with quality construction"
        },
        {
            icon: "ph:infinity-fill",
            title: "Unlimited Referrals",
            value: "No Limits",
            description: "Refer as many people as you want, earn for each"
        },
        {
            icon: "ph:clock-fill",
            title: "Quick Processing",
            value: "30-45 Days",
            description: "Rewards processed after foundation completion"
        },
    ];

    const steps = [
        {
            number: "01",
            title: "Submit Referral",
            description: "Fill the simple form with your friend's details",
            icon: "ph:note-pencil-fill"
        },
        {
            number: "02",
            title: "We Connect",
            description: "Our team contacts them for consultation",
            icon: "ph:phone-fill"
        },
        {
            number: "03",
            title: "Project Starts",
            description: "They sign agreement and construction begins",
            icon: "ph:hard-hat-fill"
        },
        {
            number: "04",
            title: "You Get Rewarded",
            description: "Cash reward credited after foundation stage",
            icon: "ph:gift-fill"
        },
    ];

    return (
        <div className="container max-w-8xl mx-auto px-4 sm:px-5 2xl:px-0">
            
            {/* Returning Referrer Login Notice */}
            <div className="mb-12 border border-primary/30 rounded-2xl p-6 bg-gradient-to-r from-primary/10 to-transparent flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon icon={"ph:users-fill"} width={24} height={24} className="text-primary" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg md:text-xl text-black dark:text-white">Already referred someone?</h3>
                        <p className="text-sm md:text-base text-black/70 dark:text-white/70 mt-1 leading-relaxed">Login to your dashboard to track your referral's status and rewards</p>
                    </div>
                </div>
                <a
                    href="/partnerships/login"
                    className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full bg-primary text-white text-base md:text-lg font-bold hover:bg-dark transition-colors shadow-lg hover:scale-105"
                >
                    <Icon icon={"ph:sign-in-fill"} width={20} height={20} className="md:w-6 md:h-6" />
                    Dashboard Login
                </a>
            </div>

            {/* Why Refer Section */}
            <section className="mb-20">
                <div className="text-center mb-12">
                    <div className="flex gap-2.5 items-center justify-center mb-3">
                        <Icon icon={"ph:gift-fill"} width={20} height={20} className="text-primary" />
                        <p className="text-base font-semibold text-badge dark:text-white/90">Why Refer</p>
                    </div>
                    <h2 className="text-4xl sm:text-52 font-medium tracking-tighter text-black dark:text-white mb-3">
                        Refer & Earn Cash Rewards
                    </h2>
                    <p className="text-xm font-normal tracking-tight text-black/50 dark:text-white/50 leading-6 max-w-3xl mx-auto">
                        Share the Walldot experience with your friends and family
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-6">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="border border-black/10 dark:border-white/10 rounded-2xl p-6 hover:shadow-xl dark:hover:shadow-white/10 transition-all duration-300 hover:border-primary/30 text-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                <Icon icon={benefit.icon} width={32} height={32} className="text-primary" />
                            </div>
                            <div className="text-3xl font-bold text-primary mb-2">{benefit.value}</div>
                            <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                                {benefit.title}
                            </h3>
                            <p className="text-sm text-black/60 dark:text-white/60">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section className="mb-20">
                <div className="text-center mb-12">
                    <div className="flex gap-2.5 items-center justify-center mb-3">
                        <Icon icon={"ph:path-fill"} width={20} height={20} className="text-primary" />
                        <p className="text-base font-semibold text-badge dark:text-white/90">Simple Process</p>
                    </div>
                    <h2 className="text-4xl sm:text-52 font-medium tracking-tighter text-black dark:text-white mb-3">
                        How It Works
                    </h2>
                    <p className="text-xm font-normal tracking-tight text-black/50 dark:text-white/50 leading-6 max-w-3xl mx-auto">
                        4 easy steps to earn rewards
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            <div className="text-center">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <span className="text-3xl font-bold text-white">{step.number}</span>
                                </div>
                                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                    <Icon icon={step.icon} width={28} height={28} className="text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-black/60 dark:text-white/60">
                                    {step.description}
                                </p>
                            </div>
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent"></div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Referral Form */}
            <section className="mb-20">
                <div className="text-center mb-12">
                    <div className="flex gap-2.5 items-center justify-center mb-3">
                        <Icon icon={"ph:paper-plane-fill"} width={20} height={20} className="text-primary" />
                        <p className="text-base font-semibold text-badge dark:text-white/90">Submit Referral</p>
                    </div>
                    <h2 className="text-4xl sm:text-52 font-medium tracking-tighter text-black dark:text-white mb-3">
                        Refer Your Friend
                    </h2>
                    <p className="text-xm font-normal tracking-tight text-black/50 dark:text-white/50 leading-6 max-w-3xl mx-auto">
                        Fill out the form below and we&apos;ll take care of the rest
                    </p>
                </div>

                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                    <div className="mb-6 p-6 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 max-w-4xl mx-auto text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                            <Icon icon="ph:check-circle-fill" width={32} height={32} className="text-green-600 flex-shrink-0" />
                            <div>
                                <h3 className="text-green-800 dark:text-green-300 font-bold text-lg mb-1">
                                    Referral Submitted Successfully!
                                </h3>
                                <p className="text-green-700 dark:text-green-400 font-medium mb-4">
                                    We've automatically created a tracking dashboard for you. You can log in using your provided email address and the password you just created to track your referral's status and your upcoming rewards.
                                </p>
                                <a
                                    href="/partnerships/login"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors w-full sm:w-auto"
                                >
                                    Login to Track Status
                                    <Icon icon="ph:arrow-right-bold" width={16} height={16} />
                                </a>
                            </div>
                        </div>
                    </div>
                )}
                
                {submitStatus === 'error' && (
                    <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 max-w-4xl mx-auto">
                        <div className="flex items-center gap-3">
                            <Icon icon="ph:warning-fill" width={24} height={24} className="text-red-600" />
                            <p className="text-red-600 dark:text-red-400 font-semibold">
                                {errorMessage}
                            </p>
                        </div>
                    </div>
                )}

                <div className="border border-black/10 dark:border-white/10 rounded-2xl p-5 sm:p-6 md:p-8 shadow-xl dark:shadow-white/10 max-w-4xl mx-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold text-black dark:text-white mb-1">
                                Your Information
                            </h3>
                            <p className="text-sm text-black/50 dark:text-white/50 mb-6">
                                We&apos;ll use this to contact you about the reward
                            </p>
                            <div className="flex flex-col gap-6">
                                <input
                                    type="text"
                                    name="yourName"
                                    placeholder="Your Name*"
                                    required
                                    value={formData.yourName}
                                    onChange={handleChange}
                                    className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white"
                                />
                                <div className="flex flex-col lg:flex-row gap-6">
                                    <input
                                        type="email"
                                        name="yourEmail"
                                        placeholder="Your Email*"
                                        required
                                        value={formData.yourEmail}
                                        onChange={handleChange}
                                        className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white"
                                    />
                                    <input
                                        type="tel"
                                        name="yourPhone"
                                        placeholder="Your Phone Number*"
                                        required
                                        value={formData.yourPhone}
                                        onChange={handleChange}
                                        className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white"
                                    />
                                </div>
                                <div className="bg-primary/5 border border-primary/20 p-5 rounded-2xl mb-2">
                                    <div className="flex gap-3 mb-3">
                                        <Icon icon="ph:lock-key-fill" width={20} height={20} className="text-primary flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-semibold text-black dark:text-white">Create a Tracking Account (Optional but Recommended)</p>
                                            <p className="text-xs text-black/60 dark:text-white/60 mt-1">Provide a password below and we'll automatically create a dashboard for you. You can log in later to track your referral's status and see when you'll get paid.</p>
                                        </div>
                                    </div>
                                    <input
                                        type="password"
                                        name="accountPassword"
                                        placeholder="Create a Password to track status later"
                                        value={formData.accountPassword}
                                        onChange={handleChange}
                                        className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-white dark:bg-black/20 text-black dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold text-black dark:text-white mb-1">
                                Your Friend&apos;s Information
                            </h3>
                            <p className="text-sm text-black/50 dark:text-white/50 mb-6">
                                Who are you referring to us?
                            </p>
                            <div className="flex flex-col gap-6">
                                    <input
                                        type="text"
                                        name="referralName"
                                        placeholder="Friend&apos;s Name*"
                                    required
                                    value={formData.referralName}
                                    onChange={handleChange}
                                    className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white"
                                />
                                <div className="flex flex-col lg:flex-row gap-6">
                                    <input
                                        type="email"
                                        name="referralEmail"
                                        placeholder="Friend&apos;s Email*"
                                        required
                                        value={formData.referralEmail}
                                        onChange={handleChange}
                                        className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white"
                                    />
                                    <input
                                        type="tel"
                                        name="referralPhone"
                                        placeholder="Friend&apos;s Phone Number*"
                                        required
                                        value={formData.referralPhone}
                                        onChange={handleChange}
                                        className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white"
                                    />
                                </div>
                                <div className="flex flex-col lg:flex-row gap-6">
                                    <select
                                        name="projectType"
                                        required
                                        value={formData.projectType}
                                        onChange={handleChange}
                                        className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white"
                                    >
                                        <option value="">Project Type*</option>
                                        <option value="residential">Residential Home</option>
                                        <option value="villa">Luxury Villa</option>
                                        <option value="apartment">Apartment</option>
                                        <option value="office">Office Space</option>
                                        <option value="renovation">Renovation</option>
                                        <option value="other">Other</option>
                                    </select>
                                    <select
                                        name="estimatedBudget"
                                        required
                                        value={formData.estimatedBudget}
                                        onChange={handleChange}
                                        className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white"
                                    >
                                        <option value="">Estimated Budget*</option>
                                        <option value="15-25">₹15-25 Lakhs</option>
                                        <option value="25-50">₹25-50 Lakhs</option>
                                        <option value="50-75">₹50-75 Lakhs</option>
                                        <option value="75-100">₹75 Lakhs - 1 Crore</option>
                                        <option value="100+">Above ₹1 Crore</option>
                                    </select>
                                </div>
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Location/District*"
                                    required
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white"
                                />
                                <textarea
                                    rows={5}
                                    name="message"
                                    placeholder="Additional Information (Optional)"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-2xl outline-primary focus:outline bg-transparent text-black dark:text-white"
                                ></textarea>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-8 py-4 rounded-full bg-primary text-white text-base font-semibold w-full mobile:w-fit hover:bg-dark duration-300 flex items-center justify-center gap-2 group ${
                                isSubmitting ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'
                            }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <Icon icon="ph:spinner" width={20} height={20} className="animate-spin" />
                                    <span>Submitting...</span>
                                </>
                            ) : (
                                <>
                                    <span>Submit Referral</span>
                                    <Icon
                                        icon={"ph:arrow-right"}
                                        width={20}
                                        height={20}
                                        className="group-hover:translate-x-1 transition-transform"
                                    />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </section>

            {/* Interested in Professional Partnership */}
            <section className="mb-20">
                <div className="border-2 border-primary/30 rounded-2xl p-5 sm:p-6 md:p-8 bg-gradient-to-br from-primary/5 to-transparent text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon icon={"ph:handshake-fill"} width={32} height={32} className="text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-black dark:text-white mb-3">
                        Are You a Professional?
                    </h3>
                    <p className="text-base text-black/70 dark:text-white/70 mb-6 max-w-2xl mx-auto">
                        If you&apos;re an architect, real estate agent, interior designer, or industry professional, explore our Referral Partnership Program for ongoing collaboration opportunities.
                    </p>
                    <a
                        href="/partnerships"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-semibold hover:bg-dark transition-colors"
                    >
                        Explore Referral Partnership Program
                        <Icon icon={"ph:arrow-right"} width={20} height={20} />
                    </a>
                </div>
            </section>

            {/* Terms & Conditions */}
            <section>
                <div className="border border-black/10 dark:border-white/10 rounded-2xl p-8 bg-black/5 dark:bg-white/5">
                    <div className="flex items-start gap-3">
                        <Icon
                            icon={"ph:info-fill"}
                            width={24}
                            height={24}
                            className="text-primary flex-shrink-0 mt-1"
                        />
                        <div>
                            <h3 className="text-xl font-semibold text-black dark:text-white mb-3">
                                Terms & Conditions
                            </h3>
                            <ul className="space-y-2 text-sm text-black/70 dark:text-white/70">
                                <li className="flex items-start gap-2">
                                    <Icon icon={"ph:check-circle-fill"} width={18} height={18} className="text-primary flex-shrink-0 mt-0.5" />
                                    <span>Valid only for new clients who haven&apos;t previously engaged with Walldot Builders</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Icon icon={"ph:check-circle-fill"} width={18} height={18} className="text-primary flex-shrink-0 mt-0.5" />
                                    <span>Minimum project value: ₹15 lakhs for referral to qualify</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Icon icon={"ph:check-circle-fill"} width={18} height={18} className="text-primary flex-shrink-0 mt-0.5" />
                                    <span>Rewards processed 30-45 days after project foundation completion</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Icon icon={"ph:check-circle-fill"} width={18} height={18} className="text-primary flex-shrink-0 mt-0.5" />
                                    <span>Referred client must mention your name during initial consultation</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Icon icon={"ph:check-circle-fill"} width={18} height={18} className="text-primary flex-shrink-0 mt-0.5" />
                                    <span>Referral valid for 90 days from submission date</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Icon icon={"ph:check-circle-fill"} width={18} height={18} className="text-primary flex-shrink-0 mt-0.5" />
                                    <span>Walldot Builders reserves the right to modify program terms. Contact info@walldotbuilders.com for queries</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
