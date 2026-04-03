"use client";

import { Icon } from "@iconify/react";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { partnershipAPI } from "@/lib/api";
import { STATE_LIST, DEFAULT_STATE, DEFAULT_DISTRICT, getDistrictsByState, PROJECT_TYPES } from "@/lib/constants";

// ── Types matching the portal API response ─────────────────────────────────

interface ApiReferral {
    leadId: number;
    clientName: string;
    clientPhone: string;
    clientEmail: string;
    projectType: string;
    status: string; // lead status from DB: new_inquiry, contacted, qualified, etc.
    priority: string;
    location: string;
    budget: number | null;
    dateOfEnquiry: string;
    createdAt: string;
}

interface ApiStats {
    totalReferrals: number;
    pendingReferrals: number;
    qualifiedReferrals: number;
    convertedReferrals: number;
    lostReferrals: number;
}

interface PartnerInfo {
    partnerId: string;
    name?: string;
    phone?: string;
    email?: string;
    partnershipType?: string;
    firmName?: string;
    status?: string;
}

// ── Status helpers ─────────────────────────────────────────────────────────

const LEAD_STATUS_MAP: Record<string, { label: string; color: string; icon: string }> = {
    new_inquiry:   { label: "New",          color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20",     icon: "ph:sparkle-fill" },
    contacted:     { label: "Contacted",    color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20", icon: "ph:phone-fill" },
    qualified:     { label: "Qualified",    color: "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20", icon: "ph:check-fill" },
    proposal_sent: { label: "Proposal Sent", color: "text-orange-600 bg-orange-50 dark:bg-orange-900/20", icon: "ph:file-text-fill" },
    project_won:   { label: "Won ✓",        color: "text-green-600 bg-green-50 dark:bg-green-900/20",   icon: "ph:trophy-fill" },
    converted:     { label: "Converted",    color: "text-green-600 bg-green-50 dark:bg-green-900/20",   icon: "ph:check-circle-fill" },
    lost:          { label: "Not Converted", color: "text-red-600 bg-red-50 dark:bg-red-900/20",         icon: "ph:x-circle-fill" },
};

function getStatusInfo(status: string) {
    return LEAD_STATUS_MAP[status] ?? { label: status, color: "text-gray-600 bg-gray-50 dark:bg-gray-900/20", icon: "ph:circle-fill" };
}

function formatBudget(budget: number | null): string {
    if (!budget) return "—";
    if (budget >= 10000000) return `₹${(budget / 10000000).toFixed(1)} Cr`;
    if (budget >= 100000)   return `₹${(budget / 100000).toFixed(0)} L`;
    return `₹${budget.toLocaleString("en-IN")}`;
}

function formatDate(dateStr: string | null): string {
    if (!dateStr) return "—";
    try {
        return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    } catch { return dateStr; }
}

function getPartnerTypeLabel(type?: string): string {
    const map: Record<string, string> = {
        architect: "Architect",
        real_estate: "Real Estate Agent",
        interior_designer: "Interior Designer",
        financial: "Financial Institution",
        material_supplier: "Material Supplier",
        vastu: "Vastu Consultant",
        land_consultant: "Land Consultant",
        corporate: "Corporate Partner",
        referral_client: "Referral Partner",
        referred_client: "Referred Client",
    };
    return type ? (map[type] ?? type) : "Partner";
}

// ── Component ──────────────────────────────────────────────────────────────

export default function PartnerDashboard() {
    const router = useRouter();

    const handleSessionExpired = useCallback(() => {
        localStorage.removeItem("partnerToken");
        localStorage.removeItem("partnerInfo");
        router.push("/partnerships/login?reason=session_expired");
    }, [router]);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [partnerInfo, setPartnerInfo] = useState<PartnerInfo | null>(null);
    const [activeTab, setActiveTab] = useState<"overview" | "referrals" | "add-referral">("overview");

    const [referrals, setReferrals] = useState<ApiReferral[]>([]);
    const [stats, setStats] = useState<ApiStats | null>(null);
    const [isLoadingReferrals, setIsLoadingReferrals] = useState(true);

    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
    const [submitError, setSubmitError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // For referred_client type — their own inquiry status
    const [myInquiry, setMyInquiry] = useState<any>(null);
    const [isLoadingInquiry, setIsLoadingInquiry] = useState(false);

    const [newReferral, setNewReferral] = useState({
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        clientWhatsapp: "",
        projectType: "",
        projectDescription: "",
        estimatedBudget: "",
        state: DEFAULT_STATE,
        district: DEFAULT_DISTRICT,
        location: "",
        notes: "",
    });

    // ── Auth + Data loading ──────────────────────────────────────────────────

    const loadDashboardData = useCallback(async () => {
        setIsLoadingReferrals(true);
        try {
            const [referralsData, statsData] = await Promise.all([
                partnershipAPI.getReferrals(),
                partnershipAPI.getStats(),
            ]);
            setReferrals(Array.isArray(referralsData) ? referralsData : []);
            setStats(statsData);
        } catch (error) {
            console.error("Failed to load dashboard data:", error);
            if (error instanceof Error && error.message === "SESSION_EXPIRED") {
                handleSessionExpired();
            } else {
                toast.error("Failed to load dashboard data. Please refresh the page.", {
                    duration: 4000,
                    icon: '⚠️'
                });
            }
        } finally {
            setIsLoadingReferrals(false);
        }
    }, [router, handleSessionExpired]);

    const loadMyInquiryData = useCallback(async () => {
        setIsLoadingInquiry(true);
        try {
            const data = await partnershipAPI.getMyInquiry();
            setMyInquiry(data);
        } catch (error) {
            console.error("Failed to load inquiry status:", error);
            if (error instanceof Error && error.message === "SESSION_EXPIRED") {
                handleSessionExpired();
            }
        } finally {
            setIsLoadingInquiry(false);
        }
    }, [handleSessionExpired]);

    useEffect(() => {
        const token = localStorage.getItem("partnerToken");
        const storedInfo = localStorage.getItem("partnerInfo");

        if (!token || !storedInfo) {
            router.push("/partnerships/login");
            return;
        }

        const partnerData = JSON.parse(storedInfo) as PartnerInfo;
        setIsAuthenticated(true);
        setPartnerInfo(partnerData);

        // Referred clients see their own inquiry status, not a partner dashboard
        if (partnerData.partnershipType === "referred_client") {
            loadMyInquiryData();
        } else {
            loadDashboardData();
        }
    }, [router, loadDashboardData, loadMyInquiryData]);

    // ── Handlers ──────────────────────────────────────────────────────────────

    const handleLogout = async () => {
        try { await partnershipAPI.logout(); } catch { /* ignore */ }
        localStorage.removeItem("partnerToken");
        localStorage.removeItem("partnerInfo");
        router.push("/partnerships/login");
    };

    const handleReferralChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setNewReferral(prev => {
            const updated = { ...prev, [name]: value };
            if (name === "state") {
                const districts = getDistrictsByState(value);
                updated.district = districts.length > 0 ? districts[0].value : "";
            }
            return updated;
        });
    };

    const convertBudgetToNumber = (budgetText: string): number | undefined => {
        if (!budgetText) return undefined;
        if (budgetText.includes("15") && budgetText.includes("25")) return 2000000;
        if (budgetText.includes("25") && budgetText.includes("50")) return 3750000;
        if (budgetText.includes("50") && budgetText.includes("75")) return 6250000;
        if (budgetText.includes("75") || (budgetText.includes("1 Crore") && !budgetText.startsWith("Above"))) return 8750000;
        if (budgetText.includes("Above") || budgetText.includes("1 Crore")) return 15000000;
        return undefined;
    };

    const handleReferralSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus("idle");
        setSubmitError("");

        try {
            const referralData = {
                clientName: newReferral.clientName,
                clientEmail: newReferral.clientEmail || "",
                clientPhone: newReferral.clientPhone,
                clientWhatsapp: newReferral.clientWhatsapp || undefined,
                projectType: newReferral.projectType,
                projectDescription: newReferral.projectDescription || undefined,
                estimatedBudget: convertBudgetToNumber(newReferral.estimatedBudget),
                state: newReferral.state,
                district: newReferral.district,
                location: newReferral.location || undefined,
                notes: newReferral.notes || undefined,
            };

            const loadingToast = toast.loading('Submitting referral...');
            const result = await partnershipAPI.submitReferralAsLead(referralData);

            toast.dismiss(loadingToast);

            if (result.success) {
                // Add the new referral to the local list optimistically
                const newApiReferral: ApiReferral = {
                    leadId: result.leadId,
                    clientName: newReferral.clientName,
                    clientPhone: newReferral.clientPhone,
                    clientEmail: newReferral.clientEmail,
                    projectType: newReferral.projectType,
                    status: "new_inquiry",
                    priority: "medium",
                    location: newReferral.location,
                    budget: convertBudgetToNumber(newReferral.estimatedBudget) ?? null,
                    dateOfEnquiry: new Date().toISOString().split("T")[0],
                    createdAt: new Date().toISOString(),
                };
                setReferrals(prev => [newApiReferral, ...prev]);

                // Update stats
                setStats(prev => prev ? {
                    ...prev,
                    totalReferrals: prev.totalReferrals + 1,
                    pendingReferrals: prev.pendingReferrals + 1,
                } : prev);

                // Reset form
                setNewReferral({
                    clientName: "", clientEmail: "", clientPhone: "", clientWhatsapp: "",
                    projectType: "", projectDescription: "", estimatedBudget: "",
                    state: DEFAULT_STATE, district: DEFAULT_DISTRICT, location: "", notes: "",
                });

                toast.success("Referral submitted successfully!", {
                    duration: 4000,
                    icon: '🎉',
                });

                setSubmitStatus("success");
                // Switch to referrals tab after a short delay
                setTimeout(() => {
                    setActiveTab("referrals");
                    setSubmitStatus("idle");
                }, 2500);
            } else {
                const errorMsg = result.message || "Submission failed. Please try again.";
                toast.error(errorMsg, {
                    duration: 5000,
                    icon: '❌',
                    style: { maxWidth: '500px' },
                });
                setSubmitStatus("error");
                setSubmitError(errorMsg);
            }
        } catch (error) {
            console.error("Submit referral error:", error);
            if (error instanceof Error && error.message === "SESSION_EXPIRED") {
                handleSessionExpired();
                return;
            }
            const errorMsg = error instanceof Error ? error.message : "An error occurred. Please try again.";
            toast.error(errorMsg, {
                duration: 5000,
                icon: '❌',
                style: { maxWidth: '500px' },
            });
            setSubmitStatus("error");
            setSubmitError(errorMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    // ── Loading state ─────────────────────────────────────────────────────────

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Icon icon="ph:spinner" width={40} height={40} className="text-primary animate-spin mx-auto mb-4" />
                    <p className="text-black/60 dark:text-white/60">Loading...</p>
                </div>
            </div>
        );
    }

    const displayName = partnerInfo?.name || partnerInfo?.email || "Partner";
    const partnerTypeLabel = getPartnerTypeLabel(partnerInfo?.partnershipType);

    // ── Referred Client View ──────────────────────────────────────────────────
    // Persons who were referred by someone get a personalised inquiry tracker instead of the partner dashboard.

    if (partnerInfo?.partnershipType === "referred_client") {
        const INQUIRY_STEPS = [
            { key: "new_inquiry",   label: "Inquiry Received",       desc: "We've received your inquiry",                 icon: "ph:check-circle-fill" },
            { key: "contacted",     label: "Team Reached Out",        desc: "Our team has contacted you",                  icon: "ph:phone-fill" },
            { key: "qualified",     label: "Initial Consultation",    desc: "Requirement discussion complete",             icon: "ph:users-fill" },
            { key: "proposal_sent", label: "Proposal Prepared",       desc: "Detailed proposal has been sent to you",      icon: "ph:file-text-fill" },
            { key: "project_won",   label: "Project Started",         desc: "Agreement signed, construction has begun",    icon: "ph:hard-hat-fill" },
        ];

        const STATUS_ORDER = ["new_inquiry", "contacted", "qualified", "proposal_sent", "project_won", "converted"];
        const currentStatus = myInquiry?.status ?? "";
        const currentIdx = STATUS_ORDER.indexOf(currentStatus);

        const getStepState = (stepKey: string) => {
            if (currentStatus === "lost") return "inactive";
            const stepIdx = STATUS_ORDER.indexOf(stepKey);
            if (currentStatus === "converted" || currentStatus === "project_won") return "done";
            if (stepIdx < currentIdx) return "done";
            if (stepIdx === currentIdx) return "active";
            return "inactive";
        };

        return (
            <div className="min-h-screen bg-gray-50 dark:bg-black/50 pt-32 pb-20">
                <Toaster position="top-right" toastOptions={{ style: { background: '#363636', color: '#fff', borderRadius: '12px', padding: '16px' }, success: { style: { background: '#10b981' } }, error: { style: { background: '#ef4444' } } }} />
                <div className="container max-w-3xl mx-auto px-5 2xl:px-0">

                    {/* Header */}
                    <div className="mb-8 flex items-start justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-1">
                                Your Inquiry Status
                            </h1>
                            <p className="text-black/60 dark:text-white/60">
                                Welcome, <span className="font-semibold text-black dark:text-white">{displayName}</span>
                            </p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors font-semibold cursor-pointer"
                        >
                            <Icon icon="ph:sign-out-fill" width={20} height={20} />
                            Logout
                        </button>
                    </div>

                    {isLoadingInquiry ? (
                        <div className="text-center py-20">
                            <Icon icon="ph:spinner" width={48} height={48} className="text-primary animate-spin mx-auto mb-4" />
                            <p className="text-black/60 dark:text-white/60">Loading your inquiry status...</p>
                        </div>
                    ) : !myInquiry?.found ? (
                        <div className="bg-white dark:bg-white/5 rounded-2xl p-10 text-center border border-black/10 dark:border-white/10">
                            <Icon icon="ph:clock-countdown-fill" width={56} height={56} className="text-primary mx-auto mb-4 opacity-60" />
                            <h2 className="text-xl font-semibold text-black dark:text-white mb-2">Inquiry Being Processed</h2>
                            <p className="text-black/60 dark:text-white/60 max-w-md mx-auto">
                                {myInquiry?.message ?? "Your inquiry is being set up. Please check back in a few minutes."}
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Referral Attribution */}
                            {myInquiry.referredBy && (
                                <div className="mb-6 flex items-center gap-3 px-5 py-4 rounded-2xl border border-primary/20 bg-primary/5">
                                    <Icon icon="ph:handshake-fill" width={22} height={22} className="text-primary flex-shrink-0" />
                                    <p className="text-sm text-black/70 dark:text-white/70">
                                        Referred by <span className="font-semibold text-black dark:text-white">{myInquiry.referredBy}</span>
                                    </p>
                                </div>
                            )}

                            {/* Lost Status */}
                            {currentStatus === "lost" && (
                                <div className="mb-6 px-5 py-4 rounded-2xl border border-red-200 bg-red-50 dark:bg-red-900/20 text-center">
                                    <Icon icon="ph:x-circle-fill" width={32} height={32} className="text-red-500 mx-auto mb-2" />
                                    <p className="font-semibold text-red-700 dark:text-red-400">This inquiry is no longer active.</p>
                                    <p className="text-sm text-red-600/70 dark:text-red-400/70 mt-1">If you&apos;d like to restart, please contact us.</p>
                                </div>
                            )}

                            {/* Progress Timeline */}
                            {currentStatus !== "lost" && (
                                <div className="bg-white dark:bg-white/5 rounded-2xl p-6 md:p-8 border border-black/10 dark:border-white/10 mb-6">
                                    <h2 className="text-lg font-semibold text-black dark:text-white mb-6">Progress</h2>
                                    <div className="space-y-0">
                                        {INQUIRY_STEPS.map((step, idx) => {
                                            const state = getStepState(step.key);
                                            return (
                                                <div key={step.key} className="flex gap-4">
                                                    {/* Connector */}
                                                    <div className="flex flex-col items-center">
                                                        <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all ${
                                                            state === "done"   ? "bg-green-500 border-green-500 text-white" :
                                                            state === "active" ? "bg-primary border-primary text-white scale-110 shadow-lg shadow-primary/30" :
                                                                                 "bg-gray-100 dark:bg-white/10 border-gray-200 dark:border-white/20 text-gray-400 dark:text-white/30"
                                                        }`}>
                                                            <Icon icon={state === "done" ? "ph:check-bold" : step.icon} width={16} height={16} />
                                                        </div>
                                                        {idx < INQUIRY_STEPS.length - 1 && (
                                                            <div className={`w-0.5 h-10 mt-1 ${state === "done" ? "bg-green-400" : "bg-gray-200 dark:bg-white/10"}`} />
                                                        )}
                                                    </div>
                                                    {/* Label */}
                                                    <div className="pb-6">
                                                        <p className={`font-semibold text-sm ${
                                                            state === "active" ? "text-primary" :
                                                            state === "done"   ? "text-black dark:text-white" :
                                                                                 "text-black/40 dark:text-white/30"
                                                        }`}>{step.label}</p>
                                                        <p className={`text-xs mt-0.5 ${state !== "inactive" ? "text-black/60 dark:text-white/50" : "text-black/25 dark:text-white/20"}`}>
                                                            {step.desc}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Inquiry Summary */}
                            <div className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-black/10 dark:border-white/10 mb-6">
                                <h2 className="text-lg font-semibold text-black dark:text-white mb-4">Inquiry Details</h2>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    {myInquiry.projectType && (
                                        <div>
                                            <p className="text-black/50 dark:text-white/50 mb-0.5">Project Type</p>
                                            <p className="font-medium text-black dark:text-white capitalize">{myInquiry.projectType.replace(/_/g, ' ')}</p>
                                        </div>
                                    )}
                                    {(myInquiry.location || myInquiry.district || myInquiry.state) && (
                                        <div>
                                            <p className="text-black/50 dark:text-white/50 mb-0.5">Location</p>
                                            <p className="font-medium text-black dark:text-white">
                                                {[myInquiry.location, myInquiry.district, myInquiry.state].filter(Boolean).join(', ')}
                                            </p>
                                        </div>
                                    )}
                                    {myInquiry.dateOfEnquiry && (
                                        <div>
                                            <p className="text-black/50 dark:text-white/50 mb-0.5">Submitted On</p>
                                            <p className="font-medium text-black dark:text-white">{formatDate(myInquiry.dateOfEnquiry)}</p>
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-black/50 dark:text-white/50 mb-0.5">Current Stage</p>
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusInfo(currentStatus).color}`}>
                                            <Icon icon={getStatusInfo(currentStatus).icon} width={12} height={12} />
                                            {getStatusInfo(currentStatus).label}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Contact CTA */}
                            <div className="text-center py-4">
                                <p className="text-sm text-black/50 dark:text-white/50 mb-2">Have questions about your inquiry?</p>
                                <a
                                    href="tel:+919207700700"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white hover:bg-dark transition-colors font-semibold text-sm"
                                >
                                    <Icon icon="ph:phone-fill" width={16} height={16} />
                                    Call +91 9207 700 700
                                </a>
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    }

    // ── Render ────────────────────────────────────────────────────────────────

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black/50 pt-32 pb-20">
            {/* Toast Notification Container */}
            <Toaster 
                position="top-right"
                toastOptions={{
                    className: '',
                    style: {
                        background: '#363636',
                        color: '#fff',
                        fontWeight: '500',
                        borderRadius: '12px',
                        padding: '16px',
                    },
                    success: {
                        style: {
                            background: '#10b981',
                        },
                    },
                    error: {
                        style: {
                            background: '#ef4444',
                        },
                    },
                }}
            />
            
            <div className="container max-w-8xl mx-auto px-5 2xl:px-0">

                {/* Header */}
                <div className="mb-8 flex items-start justify-between flex-wrap gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-1">
                            Referral Partner Dashboard
                        </h1>
                        <p className="text-black/60 dark:text-white/60">
                            Welcome back, <span className="font-semibold text-black dark:text-white">{displayName}</span>
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                                <Icon icon="ph:handshake-fill" width={14} height={14} />
                                {partnerTypeLabel}
                            </span>
                            {partnerInfo?.firmName && (
                                <span className="text-sm text-black/50 dark:text-white/50">{partnerInfo.firmName}</span>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors font-semibold cursor-pointer"
                    >
                        <Icon icon="ph:sign-out-fill" width={20} height={20} />
                        Logout
                    </button>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                    <StatCard
                        icon="ph:users-fill"
                        iconColor="text-primary"
                        label="Total Referrals"
                        value={stats?.totalReferrals ?? referrals.length}
                        valueColor="text-black dark:text-white"
                        loading={isLoadingReferrals}
                    />
                    <StatCard
                        icon="ph:clock-fill"
                        iconColor="text-yellow-600"
                        label="Pending"
                        value={stats?.pendingReferrals ?? 0}
                        valueColor="text-yellow-600"
                        loading={isLoadingReferrals}
                    />
                    <StatCard
                        icon="ph:check-fill"
                        iconColor="text-blue-600"
                        label="Qualified"
                        value={stats?.qualifiedReferrals ?? 0}
                        valueColor="text-blue-600"
                        loading={isLoadingReferrals}
                    />
                    <StatCard
                        icon="ph:trophy-fill"
                        iconColor="text-green-600"
                        label="Converted"
                        value={stats?.convertedReferrals ?? 0}
                        valueColor="text-green-600"
                        loading={isLoadingReferrals}
                    />
                    <StatCard
                        icon="ph:x-circle-fill"
                        iconColor="text-red-500"
                        label="Not Converted"
                        value={stats?.lostReferrals ?? 0}
                        valueColor="text-red-500"
                        loading={isLoadingReferrals}
                    />
                </div>

                {/* Navigation Tabs */}
                <div className="mb-8 border-b border-black/10 dark:border-white/10">
                    <div className="flex gap-6">
                        {(["overview", "referrals", "add-referral"] as const).map(tab => {
                            const labels = { overview: "Overview", referrals: `My Referrals (${referrals.length})`, "add-referral": "Add Referral" };
                            const icons = { overview: "ph:house-fill", referrals: "ph:list-fill", "add-referral": "ph:plus-circle-fill" };
                            return (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`pb-4 px-2 font-semibold transition-all cursor-pointer ${
                                        activeTab === tab
                                            ? "text-primary border-b-2 border-primary"
                                            : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <Icon icon={icons[tab]} width={20} height={20} />
                                        {labels[tab]}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ── Overview Tab ── */}
                {activeTab === "overview" && (
                    <div className="space-y-8">
                        {/* Welcome Banner */}
                        <div className="border border-primary/30 rounded-2xl p-8 bg-gradient-to-br from-primary/10 to-transparent">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <Icon icon="ph:handshake-fill" width={32} height={32} className="text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
                                        Welcome, {displayName}!
                                    </h2>
                                    <p className="text-black/70 dark:text-white/70 mb-4">
                                        Track all your referrals and their lead conversion status in one place.
                                        Your referrals are visible to our team and will be contacted promptly.
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        <button
                                            onClick={() => setActiveTab("add-referral")}
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-dark transition-colors cursor-pointer"
                                        >
                                            <Icon icon="ph:plus-fill" width={20} height={20} />
                                            Submit New Referral
                                        </button>
                                        <button
                                            onClick={() => setActiveTab("referrals")}
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/5 dark:bg-white/5 text-black dark:text-white font-semibold hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
                                        >
                                            <Icon icon="ph:list-fill" width={20} height={20} />
                                            View All Referrals
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Commission Info Banner */}
                        <div className="border border-yellow-200 dark:border-yellow-800 rounded-2xl p-6 bg-yellow-50 dark:bg-yellow-900/10">
                            <div className="flex items-start gap-3">
                                <Icon icon="ph:currency-inr-fill" width={24} height={24} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-bold text-yellow-800 dark:text-yellow-300 mb-1">Commission & Rewards</h3>
                                    <p className="text-sm text-yellow-700 dark:text-yellow-400">
                                        Your commission is calculated based on the project value once it reaches the <strong>Converted</strong> stage.
                                        Our team will contact you directly to process your reward. For queries, email{" "}
                                        <a href="mailto:info@walldotbuilders.com" className="underline">info@walldotbuilders.com</a>.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Recent Referrals */}
                        <div>
                            <h3 className="text-2xl font-bold text-black dark:text-white mb-6">Recent Referrals</h3>
                            {isLoadingReferrals ? (
                                <LoadingRows count={3} />
                            ) : referrals.length === 0 ? (
                                <EmptyState onAddClick={() => setActiveTab("add-referral")} />
                            ) : (
                                <div className="space-y-4">
                                    {referrals.slice(0, 5).map(referral => (
                                        <ReferralCard key={referral.leadId} referral={referral} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ── My Referrals Tab ── */}
                {activeTab === "referrals" && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-black dark:text-white">All Referrals</h2>
                            <button
                                onClick={() => setActiveTab("add-referral")}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-dark transition-colors cursor-pointer"
                            >
                                <Icon icon="ph:plus-fill" width={20} height={20} />
                                Add New Referral
                            </button>
                        </div>

                        {isLoadingReferrals ? (
                            <LoadingRows count={5} />
                        ) : referrals.length === 0 ? (
                            <EmptyState onAddClick={() => setActiveTab("add-referral")} />
                        ) : (
                            <div className="border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden bg-white dark:bg-dark">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-black/5 dark:bg-white/5">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-white">Ref ID</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-white">Client</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-white">Project Type</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-white">Budget</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-white">Location</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-white">Date</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-white">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-black/10 dark:divide-white/10">
                                            {referrals.map(referral => {
                                                const statusInfo = getStatusInfo(referral.status);
                                                return (
                                                    <tr key={referral.leadId} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                                        <td className="px-6 py-4 text-sm font-semibold text-primary">#{referral.leadId}</td>
                                                        <td className="px-6 py-4">
                                                            <div className="text-sm font-semibold text-black dark:text-white">{referral.clientName}</div>
                                                            {referral.clientPhone && (
                                                                <div className="text-xs text-black/50 dark:text-white/50">{referral.clientPhone}</div>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-black/70 dark:text-white/70 capitalize">
                                                            {referral.projectType?.replace(/_/g, " ") || "—"}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm font-semibold text-black dark:text-white">
                                                            {formatBudget(referral.budget)}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-black/60 dark:text-white/60">
                                                            {referral.location || "—"}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-black/60 dark:text-white/60">
                                                            {formatDate(referral.dateOfEnquiry || referral.createdAt)}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.color}`}>
                                                                <Icon icon={statusInfo.icon} width={12} height={12} />
                                                                {statusInfo.label}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* ── Add Referral Tab ── */}
                {activeTab === "add-referral" && (
                    <div>
                        <h2 className="text-2xl font-bold text-black dark:text-white mb-2">Submit New Referral</h2>
                        <p className="text-black/60 dark:text-white/60 mb-6">
                            Fill in your client&apos;s details. Our team will contact them and keep you updated on the status.
                        </p>

                        {/* Success state */}
                        {submitStatus === "success" && (
                            <div className="mb-6 p-6 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center flex-shrink-0">
                                        <Icon icon="ph:check-circle-fill" width={28} height={28} className="text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-green-800 dark:text-green-300 mb-1">Referral Submitted Successfully!</h3>
                                        <p className="text-sm text-green-700 dark:text-green-400">
                                            Your referral has been recorded. Our team will contact the client within 24 hours.
                                            Redirecting to your referrals list...
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Error state */}
                        {submitStatus === "error" && (
                            <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                                <div className="flex items-center gap-3">
                                    <Icon icon="ph:warning-fill" width={20} height={20} className="text-red-600" />
                                    <p className="text-red-600 dark:text-red-400 font-semibold text-sm">{submitError}</p>
                                </div>
                            </div>
                        )}

                        <div className="border border-black/10 dark:border-white/10 rounded-2xl p-8 bg-white dark:bg-dark max-w-3xl">
                            <form onSubmit={handleReferralSubmit}>
                                <div className="space-y-6">

                                    {/* Client Name */}
                                    <div>
                                        <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                                            Client Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="clientName"
                                            placeholder="Enter client's full name"
                                            required
                                            value={newReferral.clientName}
                                            onChange={handleReferralChange}
                                            className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white"
                                        />
                                    </div>

                                    {/* Phone + Email */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                                                Client Phone <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                name="clientPhone"
                                                placeholder="10-digit mobile number"
                                                required
                                                maxLength={10}
                                                value={newReferral.clientPhone}
                                                onChange={handleReferralChange}
                                                className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                                                Client Email
                                            </label>
                                            <input
                                                type="email"
                                                name="clientEmail"
                                                placeholder="client@email.com (optional)"
                                                value={newReferral.clientEmail}
                                                onChange={handleReferralChange}
                                                className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    {/* WhatsApp */}
                                    <div>
                                        <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                                            WhatsApp Number (Optional)
                                        </label>
                                        <input
                                            type="tel"
                                            name="clientWhatsapp"
                                            placeholder="If different from phone"
                                            maxLength={10}
                                            value={newReferral.clientWhatsapp}
                                            onChange={handleReferralChange}
                                            className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white"
                                        />
                                    </div>

                                    {/* Project Type + Budget */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                                                Project Type <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                name="projectType"
                                                required
                                                value={newReferral.projectType}
                                                onChange={handleReferralChange}
                                                className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-white dark:bg-dark text-black dark:text-white"
                                            >
                                                <option value="">Select project type</option>
                                                {PROJECT_TYPES.map(t => (
                                                    <option key={t.value} value={t.value}>{t.displayText}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                                                Estimated Budget <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                name="estimatedBudget"
                                                required
                                                value={newReferral.estimatedBudget}
                                                onChange={handleReferralChange}
                                                className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-white dark:bg-dark text-black dark:text-white"
                                            >
                                                <option value="">Select budget range</option>
                                                <option value="₹15-25 Lakhs">₹15–25 Lakhs</option>
                                                <option value="₹25-50 Lakhs">₹25–50 Lakhs</option>
                                                <option value="₹50-75 Lakhs">₹50–75 Lakhs</option>
                                                <option value="₹75 Lakhs - 1 Crore">₹75 Lakhs – 1 Crore</option>
                                                <option value="Above ₹1 Crore">Above ₹1 Crore</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* State + District */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                                                State <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                name="state"
                                                required
                                                value={newReferral.state}
                                                onChange={handleReferralChange}
                                                className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-white dark:bg-dark text-black dark:text-white"
                                            >
                                                {STATE_LIST.map(s => (
                                                    <option key={s.value} value={s.value}>{s.displayText}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                                                District <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                name="district"
                                                required
                                                value={newReferral.district}
                                                onChange={handleReferralChange}
                                                className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-white dark:bg-dark text-black dark:text-white"
                                            >
                                                {getDistrictsByState(newReferral.state).map(d => (
                                                    <option key={d.value} value={d.value}>{d.displayText}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div>
                                        <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                                            Specific Location / Area (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            placeholder="e.g. Thrissur Town, Palakkad Road"
                                            value={newReferral.location}
                                            onChange={handleReferralChange}
                                            className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white"
                                        />
                                    </div>

                                    {/* Project Description */}
                                    <div>
                                        <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                                            Project Description (Optional)
                                        </label>
                                        <textarea
                                            name="projectDescription"
                                            rows={3}
                                            placeholder="Brief description of the project requirements"
                                            value={newReferral.projectDescription}
                                            onChange={handleReferralChange}
                                            className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-2xl outline-primary focus:outline w-full bg-transparent text-black dark:text-white"
                                        />
                                    </div>

                                    {/* Additional Notes */}
                                    <div>
                                        <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                                            Additional Notes (Optional)
                                        </label>
                                        <textarea
                                            name="notes"
                                            rows={3}
                                            placeholder="Any other info that may help our team when contacting the client"
                                            value={newReferral.notes}
                                            onChange={handleReferralChange}
                                            className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-2xl outline-primary focus:outline w-full bg-transparent text-black dark:text-white"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting || submitStatus === "success"}
                                        className={`w-full px-8 py-4 rounded-full bg-primary text-white text-base font-semibold hover:bg-dark transition-all duration-300 flex items-center justify-center gap-2 ${
                                            isSubmitting ? "opacity-75 cursor-not-allowed" : "cursor-pointer"
                                        }`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Icon icon="ph:spinner" width={20} height={20} className="animate-spin" />
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                Submit Referral
                                                <Icon icon="ph:arrow-right" width={20} height={20} />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// ── Sub-components ─────────────────────────────────────────────────────────

function StatCard({
    icon, iconColor, label, value, valueColor, loading,
}: {
    icon: string; iconColor: string; label: string; value: number; valueColor: string; loading: boolean;
}) {
    return (
        <div className="border border-black/10 dark:border-white/10 rounded-2xl p-6 bg-white dark:bg-dark">
            <div className="flex items-center gap-3 mb-2">
                <Icon icon={icon} width={24} height={24} className={iconColor} />
                <span className="text-sm text-black/60 dark:text-white/60">{label}</span>
            </div>
            {loading ? (
                <div className="h-9 w-12 bg-black/10 dark:bg-white/10 rounded animate-pulse" />
            ) : (
                <div className={`text-3xl font-bold ${valueColor}`}>{value}</div>
            )}
        </div>
    );
}

function ReferralCard({ referral }: { referral: ApiReferral }) {
    const statusInfo = getStatusInfo(referral.status);
    return (
        <div className="border border-black/10 dark:border-white/10 rounded-2xl p-6 bg-white dark:bg-dark hover:shadow-lg transition-all">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon icon="ph:user-fill" width={24} height={24} className="text-primary" />
                    </div>
                    <div>
                        <h4 className="font-bold text-black dark:text-white">{referral.clientName}</h4>
                        <p className="text-sm text-black/60 dark:text-white/60">
                            {referral.projectType?.replace(/_/g, " ") || "—"}
                            {referral.budget ? ` • ${formatBudget(referral.budget)}` : ""}
                            {referral.location ? ` • ${referral.location}` : ""}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-black/40 dark:text-white/40">
                        {formatDate(referral.dateOfEnquiry || referral.createdAt)}
                    </span>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${statusInfo.color}`}>
                        <Icon icon={statusInfo.icon} width={14} height={14} className="inline mr-1" />
                        {statusInfo.label}
                    </span>
                </div>
            </div>
        </div>
    );
}

function EmptyState({ onAddClick }: { onAddClick: () => void }) {
    return (
        <div className="text-center py-16 border border-black/10 dark:border-white/10 rounded-2xl bg-white dark:bg-dark">
            <Icon icon="ph:users-three" width={48} height={48} className="text-black/20 dark:text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-black dark:text-white mb-2">No Referrals Yet</h3>
            <p className="text-black/60 dark:text-white/60 mb-6">
                You haven&apos;t submitted any referrals yet. Start by adding your first client referral!
            </p>
            <button
                onClick={onAddClick}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-dark transition-colors cursor-pointer"
            >
                <Icon icon="ph:plus-fill" width={20} height={20} />
                Add Your First Referral
            </button>
        </div>
    );
}

function LoadingRows({ count }: { count: number }) {
    return (
        <div className="space-y-4">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="border border-black/10 dark:border-white/10 rounded-2xl p-6 bg-white dark:bg-dark">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-black/10 dark:bg-white/10 animate-pulse" />
                        <div className="space-y-2 flex-1">
                            <div className="h-4 w-48 bg-black/10 dark:bg-white/10 rounded animate-pulse" />
                            <div className="h-3 w-32 bg-black/10 dark:bg-white/10 rounded animate-pulse" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
