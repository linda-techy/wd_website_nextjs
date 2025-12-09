"use client";

import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { partnershipAPI } from "@/lib/api";
import { STATE_LIST, DEFAULT_STATE, DEFAULT_DISTRICT, getDistrictsByState, PROJECT_TYPES } from "@/lib/constants";

interface Referral {
    id: string;
    clientName: string;
    projectType: string;
    projectValue: string;
    submittedDate: string;
    status: "pending" | "contacted" | "in-progress" | "completed" | "rejected";
    commission: string;
    commissionStatus: "pending" | "approved" | "paid";
}

interface PartnerInfo {
    partnerId: string;
    name?: string;
    phone: string;
    email?: string;
    partnershipType?: string;
    status?: string;
}

export default function PartnerDashboard() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [partnerInfo, setPartnerInfo] = useState<PartnerInfo | null>(null);
    const [activeTab, setActiveTab] = useState<"overview" | "referrals" | "add-referral">("overview");
    const [referrals, setReferrals] = useState<Referral[]>([
        {
            id: "REF001",
            clientName: "Rajesh Kumar",
            projectType: "Luxury Villa",
            projectValue: "₹75 Lakhs",
            submittedDate: "2025-10-01",
            status: "completed",
            commission: "₹2,25,000",
            commissionStatus: "paid"
        },
        {
            id: "REF002",
            clientName: "Priya Menon",
            projectType: "Residential Home",
            projectValue: "₹45 Lakhs",
            submittedDate: "2025-10-05",
            status: "in-progress",
            commission: "₹1,35,000",
            commissionStatus: "approved"
        },
        {
            id: "REF003",
            clientName: "Arun Nair",
            projectType: "Apartment",
            projectValue: "₹30 Lakhs",
            submittedDate: "2025-10-10",
            status: "contacted",
            commission: "₹90,000",
            commissionStatus: "pending"
        },
    ]);

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

    useEffect(() => {
        // Check authentication and load data
        const checkAuth = async () => {
            try {
                // Check if token and partner info exist
                const token = localStorage.getItem('partnerToken');
                const storedPartnerInfo = localStorage.getItem('partnerInfo');
                
                if (!token || !storedPartnerInfo) {
                    router.push("/partnerships/login");
                    return;
                }

                // Load partner info from localStorage (already verified during login)
                const partnerData = JSON.parse(storedPartnerInfo);
                setIsAuthenticated(true);
                setPartnerInfo(partnerData);
                
                // Fetch referrals
                const referralsData = await partnershipAPI.getReferrals();
                if (referralsData && referralsData.length > 0) {
                    setReferrals(referralsData);
                }
            } catch (error) {
                console.error('Auth check error:', error);
                // Clear localStorage and redirect
                localStorage.removeItem('partnerToken');
                localStorage.removeItem('partnerInfo');
                router.push("/partnerships/login");
            }
        };

        checkAuth();
    }, [router]);

    const handleLogout = async () => {
        try {
            // Call Spring Boot API to logout
            await partnershipAPI.logout();
            
            // Redirect to login
            router.push("/partnerships/login");
        } catch (error) {
            console.error('Logout error:', error);
            // Even if API fails, clear local storage and redirect
            localStorage.removeItem("partnerToken");
            localStorage.removeItem("partnerInfo");
            router.push("/partnerships/login");
        }
    };

    const handleReferralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        setNewReferral(prev => {
            const updated = {
                ...prev,
                [name]: value,
            };
            
            // If state changes, reset district to default for that state
            if (name === 'state') {
                const districtsForState = getDistrictsByState(value);
                updated.district = districtsForState.length > 0 ? districtsForState[0].value : "";
            }
            
            return updated;
        });
    };

    const handleReferralSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            // Helper function to convert budget text to number
            const convertBudgetToNumber = (budgetText: string): number | undefined => {
                if (!budgetText) return undefined;
                
                // Extract numbers and convert to lakhs/crores
                if (budgetText.includes('15-25')) return 2000000; // 20 lakhs average
                if (budgetText.includes('25-50')) return 3750000; // 37.5 lakhs average
                if (budgetText.includes('50-75')) return 6250000; // 62.5 lakhs average
                if (budgetText.includes('75 Lakhs - 1 Crore')) return 8750000; // 87.5 lakhs average
                if (budgetText.includes('Above ₹1 Crore')) return 15000000; // 1.5 crores default
                
                return undefined;
            };

            // Prepare referral data - only essential fields captured from form
            // Backend will set default values for uncaptured fields
            const referralData = {
                clientName: newReferral.clientName,
                clientEmail: newReferral.clientEmail,
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
            
            // Call Spring Boot API to submit referral as lead
            const result = await partnershipAPI.submitReferralAsLead(referralData);

            if (result.success) {
                // Add new referral to list
                const newRef: Referral = {
                    id: result.leadId,
                    clientName: newReferral.clientName,
                    projectType: newReferral.projectType,
                    projectValue: newReferral.estimatedBudget,
                    submittedDate: new Date().toISOString().split('T')[0],
                    status: "pending",
                    commission: "Calculating...",
                    commissionStatus: "pending"
                };

                setReferrals([newRef, ...referrals]);
                
                // Reset form
                setNewReferral({
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
                
                setActiveTab("referrals");
                alert(`Referral submitted successfully as lead! Lead ID: ${result.leadId}`);
            } else {
                alert("Failed to submit referral: " + result.message);
            }
        } catch (error) {
            console.error('Submit referral error:', error);
            alert("An error occurred. Please try again.");
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed": return "text-green-600 bg-green-50 dark:bg-green-900/20";
            case "in-progress": return "text-blue-600 bg-blue-50 dark:bg-blue-900/20";
            case "contacted": return "text-purple-600 bg-purple-50 dark:bg-purple-900/20";
            case "pending": return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20";
            case "rejected": return "text-red-600 bg-red-50 dark:bg-red-900/20";
            case "paid": return "text-green-600 bg-green-50 dark:bg-green-900/20";
            case "approved": return "text-blue-600 bg-blue-50 dark:bg-blue-900/20";
            default: return "text-gray-600 bg-gray-50 dark:bg-gray-900/20";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "completed": return "ph:check-circle-fill";
            case "in-progress": return "ph:spinner-fill";
            case "contacted": return "ph:phone-fill";
            case "pending": return "ph:clock-fill";
            case "rejected": return "ph:x-circle-fill";
            case "paid": return "ph:currency-inr-fill";
            case "approved": return "ph:check-fill";
            default: return "ph:circle-fill";
        }
    };

    const stats = {
        totalReferrals: referrals.length,
        activeReferrals: referrals.filter(r => r.status === "in-progress" || r.status === "contacted").length,
        completedProjects: referrals.filter(r => r.status === "completed").length,
        totalEarnings: "₹4,50,000",
        pendingCommission: "₹2,25,000",
        paidCommission: "₹2,25,000"
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Icon icon={"ph:spinner"} width={40} height={40} className="text-primary animate-spin mx-auto mb-4" />
                    <p className="text-black/60 dark:text-white/60">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black/50 pt-32 pb-20">
            <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
                
                {/* Header */}
                <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-2">
                            Partner Dashboard
                        </h1>
                        <p className="text-black/60 dark:text-white/60">
                            Welcome back, {partnerInfo?.phone || "Partner"}
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors font-semibold cursor-pointer"
                    >
                        <Icon icon={"ph:sign-out-fill"} width={20} height={20} />
                        Logout
                    </button>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                    <div className="border border-black/10 dark:border-white/10 rounded-2xl p-6 bg-white dark:bg-dark">
                        <div className="flex items-center gap-3 mb-2">
                            <Icon icon={"ph:users-fill"} width={24} height={24} className="text-primary" />
                            <span className="text-sm text-black/60 dark:text-white/60">Total Referrals</span>
                        </div>
                        <div className="text-3xl font-bold text-black dark:text-white">{stats.totalReferrals}</div>
                    </div>
                    <div className="border border-black/10 dark:border-white/10 rounded-2xl p-6 bg-white dark:bg-dark">
                        <div className="flex items-center gap-3 mb-2">
                            <Icon icon={"ph:spinner-fill"} width={24} height={24} className="text-blue-600" />
                            <span className="text-sm text-black/60 dark:text-white/60">Active</span>
                        </div>
                        <div className="text-3xl font-bold text-blue-600">{stats.activeReferrals}</div>
                    </div>
                    <div className="border border-black/10 dark:border-white/10 rounded-2xl p-6 bg-white dark:bg-dark">
                        <div className="flex items-center gap-3 mb-2">
                            <Icon icon={"ph:check-circle-fill"} width={24} height={24} className="text-green-600" />
                            <span className="text-sm text-black/60 dark:text-white/60">Completed</span>
                        </div>
                        <div className="text-3xl font-bold text-green-600">{stats.completedProjects}</div>
                    </div>
                    <div className="border border-black/10 dark:border-white/10 rounded-2xl p-6 bg-white dark:bg-dark">
                        <div className="flex items-center gap-3 mb-2">
                            <Icon icon={"ph:currency-inr-fill"} width={24} height={24} className="text-primary" />
                            <span className="text-sm text-black/60 dark:text-white/60">Total Earnings</span>
                        </div>
                        <div className="text-2xl font-bold text-black dark:text-white">{stats.totalEarnings}</div>
                    </div>
                    <div className="border border-black/10 dark:border-white/10 rounded-2xl p-6 bg-white dark:bg-dark">
                        <div className="flex items-center gap-3 mb-2">
                            <Icon icon={"ph:clock-fill"} width={24} height={24} className="text-yellow-600" />
                            <span className="text-sm text-black/60 dark:text-white/60">Pending</span>
                        </div>
                        <div className="text-2xl font-bold text-yellow-600">{stats.pendingCommission}</div>
                    </div>
                    <div className="border border-black/10 dark:border-white/10 rounded-2xl p-6 bg-white dark:bg-dark">
                        <div className="flex items-center gap-3 mb-2">
                            <Icon icon={"ph:check-fill"} width={24} height={24} className="text-green-600" />
                            <span className="text-sm text-black/60 dark:text-white/60">Paid</span>
                        </div>
                        <div className="text-2xl font-bold text-green-600">{stats.paidCommission}</div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="mb-8 border-b border-black/10 dark:border-white/10">
                    <div className="flex gap-6">
                        <button
                            onClick={() => setActiveTab("overview")}
                            className={`pb-4 px-2 font-semibold transition-all cursor-pointer ${
                                activeTab === "overview"
                                    ? "text-primary border-b-2 border-primary"
                                    : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <Icon icon={"ph:house-fill"} width={20} height={20} />
                                Overview
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab("referrals")}
                            className={`pb-4 px-2 font-semibold transition-all cursor-pointer ${
                                activeTab === "referrals"
                                    ? "text-primary border-b-2 border-primary"
                                    : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <Icon icon={"ph:list-fill"} width={20} height={20} />
                                My Referrals ({referrals.length})
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab("add-referral")}
                            className={`pb-4 px-2 font-semibold transition-all cursor-pointer ${
                                activeTab === "add-referral"
                                    ? "text-primary border-b-2 border-primary"
                                    : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <Icon icon={"ph:plus-circle-fill"} width={20} height={20} />
                                Add Referral
                            </div>
                        </button>
                    </div>
                </div>

                {/* Overview Tab */}
                {activeTab === "overview" && (
                    <div className="space-y-8">
                        {/* Welcome Banner */}
                        <div className="border border-primary/30 rounded-2xl p-8 bg-gradient-to-br from-primary/10 to-transparent">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <Icon icon={"ph:handshake-fill"} width={32} height={32} className="text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
                                        Welcome to Your Partner Dashboard
                                    </h2>
                                    <p className="text-black/70 dark:text-white/70 mb-4">
                                        Track all your referrals, view commission status, and submit new referrals in one place.
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        <button
                                            onClick={() => setActiveTab("add-referral")}
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-dark transition-colors cursor-pointer"
                                        >
                                            <Icon icon={"ph:plus-fill"} width={20} height={20} />
                                            Submit New Referral
                                        </button>
                                        <button
                                            onClick={() => setActiveTab("referrals")}
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/5 dark:bg-white/5 text-black dark:text-white font-semibold hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
                                        >
                                            <Icon icon={"ph:list-fill"} width={20} height={20} />
                                            View All Referrals
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div>
                            <h3 className="text-2xl font-bold text-black dark:text-white mb-6">Recent Activity</h3>
                            <div className="space-y-4">
                                {referrals.slice(0, 3).map((referral) => (
                                    <div key={referral.id} className="border border-black/10 dark:border-white/10 rounded-2xl p-6 bg-white dark:bg-dark hover:shadow-lg transition-all">
                                        <div className="flex items-center justify-between flex-wrap gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <Icon icon={"ph:user-fill"} width={24} height={24} className="text-primary" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-black dark:text-white">{referral.clientName}</h4>
                                                    <p className="text-sm text-black/60 dark:text-white/60">{referral.projectType} • {referral.projectValue}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(referral.status)}`}>
                                                    <Icon icon={getStatusIcon(referral.status)} width={16} height={16} className="inline mr-1" />
                                                    {referral.status}
                                                </span>
                                                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(referral.commissionStatus)}`}>
                                                    {referral.commission}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* My Referrals Tab */}
                {activeTab === "referrals" && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-black dark:text-white">All Referrals</h2>
                            <button
                                onClick={() => setActiveTab("add-referral")}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-dark transition-colors cursor-pointer"
                            >
                                <Icon icon={"ph:plus-fill"} width={20} height={20} />
                                Add New Referral
                            </button>
                        </div>

                        <div className="border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden bg-white dark:bg-dark">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-black/5 dark:bg-white/5">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-white">Ref ID</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-white">Client Name</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-white">Project Type</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-white">Value</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-white">Date</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-white">Status</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-white">Commission</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-white">Payment</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-black/10 dark:divide-white/10">
                                        {referrals.map((referral) => (
                                            <tr key={referral.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4 text-sm font-semibold text-primary">{referral.id}</td>
                                                <td className="px-6 py-4 text-sm text-black dark:text-white">{referral.clientName}</td>
                                                <td className="px-6 py-4 text-sm text-black/70 dark:text-white/70">{referral.projectType}</td>
                                                <td className="px-6 py-4 text-sm font-semibold text-black dark:text-white">{referral.projectValue}</td>
                                                <td className="px-6 py-4 text-sm text-black/60 dark:text-white/60">{referral.submittedDate}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(referral.status)}`}>
                                                        <Icon icon={getStatusIcon(referral.status)} width={14} height={14} />
                                                        {referral.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-semibold text-black dark:text-white">{referral.commission}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(referral.commissionStatus)}`}>
                                                        <Icon icon={getStatusIcon(referral.commissionStatus)} width={14} height={14} />
                                                        {referral.commissionStatus}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add Referral Tab */}
                {activeTab === "add-referral" && (
                    <div>
                        <h2 className="text-2xl font-bold text-black dark:text-white mb-6">Submit New Referral</h2>
                        <p className="text-black/60 dark:text-white/60 mb-6">Fill in the essential details below. Additional lead information will be set with default values.</p>

                        <div className="border border-black/10 dark:border-white/10 rounded-2xl p-8 bg-white dark:bg-dark max-w-3xl">
                            <form onSubmit={handleReferralSubmit}>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                                            Client Name*
                                        </label>
                                        <input
                                            type="text"
                                            name="clientName"
                                            placeholder="Enter client name"
                                            required
                                            value={newReferral.clientName}
                                            onChange={handleReferralChange}
                                            className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white"
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                                                Client Email*
                                            </label>
                                            <input
                                                type="email"
                                                name="clientEmail"
                                                placeholder="Enter email"
                                                required
                                                value={newReferral.clientEmail}
                                                onChange={handleReferralChange}
                                                className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                                                Client Phone*
                                            </label>
                                            <input
                                                type="tel"
                                                name="clientPhone"
                                                placeholder="Enter phone number (10 digits)"
                                                required
                                                value={newReferral.clientPhone}
                                                onChange={handleReferralChange}
                                                className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                                            WhatsApp Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="clientWhatsapp"
                                            placeholder="Enter WhatsApp number (optional)"
                                            value={newReferral.clientWhatsapp}
                                            onChange={handleReferralChange}
                                            className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white"
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                                                Project Type*
                                            </label>
                                            <select
                                                name="projectType"
                                                required
                                                value={newReferral.projectType}
                                                onChange={handleReferralChange}
                                                className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white"
                                            >
                                                <option value="">Select project type</option>
                                                {PROJECT_TYPES.map((type) => (
                                                    <option key={type.value} value={type.value}>
                                                        {type.displayText}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                                                Estimated Budget*
                                            </label>
                                            <select
                                                name="estimatedBudget"
                                                required
                                                value={newReferral.estimatedBudget}
                                                onChange={handleReferralChange}
                                                className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white"
                                            >
                                                <option value="">Select budget range</option>
                                                <option value="₹15-25 Lakhs">₹15-25 Lakhs</option>
                                                <option value="₹25-50 Lakhs">₹25-50 Lakhs</option>
                                                <option value="₹50-75 Lakhs">₹50-75 Lakhs</option>
                                                <option value="₹75 Lakhs - 1 Crore">₹75 Lakhs - 1 Crore</option>
                                                <option value="Above ₹1 Crore">Above ₹1 Crore</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                                                State*
                                            </label>
                                            <select
                                                name="state"
                                                required
                                                value={newReferral.state}
                                                onChange={handleReferralChange}
                                                className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white"
                                            >
                                                {STATE_LIST.map((state) => (
                                                    <option key={state.value} value={state.value}>
                                                        {state.displayText}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                                                District*
                                            </label>
                                            <select
                                                name="district"
                                                required
                                                value={newReferral.district}
                                                onChange={handleReferralChange}
                                                className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white"
                                            >
                                                {getDistrictsByState(newReferral.state).map((district) => (
                                                    <option key={district.value} value={district.value}>
                                                        {district.displayText}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                                            Location/City
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            placeholder="Enter specific location or city"
                                            value={newReferral.location}
                                            onChange={handleReferralChange}
                                            className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                                            Project Description
                                        </label>
                                        <textarea
                                            name="projectDescription"
                                            rows={3}
                                            placeholder="Brief description of the project (optional)"
                                            value={newReferral.projectDescription}
                                            onChange={handleReferralChange}
                                            className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-2xl outline-primary focus:outline w-full bg-transparent text-black dark:text-white"
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                                            Additional Notes
                                        </label>
                                        <textarea
                                            name="notes"
                                            rows={4}
                                            placeholder="Any additional information about the client or project (optional)"
                                            value={newReferral.notes}
                                            onChange={handleReferralChange}
                                            className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-2xl outline-primary focus:outline w-full bg-transparent text-black dark:text-white"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full px-8 py-4 rounded-full bg-primary text-white text-base font-semibold hover:bg-dark transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        Submit Referral as Lead
                                        <Icon icon={"ph:arrow-right"} width={20} height={20} />
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

