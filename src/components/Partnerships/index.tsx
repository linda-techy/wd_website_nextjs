"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";

type PartnershipType = 
    | "architectural" 
    | "realEstate" 
    | "interiorDesigner" 
    | "financial" 
    | "materialSupplier" 
    | "vastu" 
    | "landConsultant" 
    | "corporate";

export default function Partnerships() {
    const [activeTab, setActiveTab] = useState<PartnershipType>("architectural");
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    // Form states for each partnership type
    const [architecturalFormData, setArchitecturalFormData] = useState({
        contactName: "", contactEmail: "", contactPhone: "", designation: "",
        firmName: "", portfolioLink: "", experience: "", specialization: "", 
        additionalContact: "", gstNumber: "", message: "",
    });

    const [realEstateFormData, setRealEstateFormData] = useState({
        contactName: "", contactEmail: "", contactPhone: "", designation: "",
        firmName: "", licenseNumber: "", reraNumber: "", areaOfOperation: "", 
        additionalContact: "", message: "",
    });

    const [interiorDesignerFormData, setInteriorDesignerFormData] = useState({
        contactName: "", contactEmail: "", contactPhone: "", designation: "",
        firmName: "", portfolioLink: "", specialization: "", experience: "", 
        gstNumber: "", additionalContact: "", message: "",
    });

    const [financialFormData, setFinancialFormData] = useState({
        contactName: "", contactEmail: "", contactPhone: "", designation: "",
        bankName: "", branch: "", ifscCode: "", employeeId: "", message: "",
    });

    const [materialSupplierFormData, setMaterialSupplierFormData] = useState({
        contactName: "", contactEmail: "", contactPhone: "", designation: "",
        companyName: "", materialsSupplied: "", businessSize: "", location: "", 
        gstNumber: "", additionalContact: "", message: "",
    });

    const [vastuFormData, setVastuFormData] = useState({
        contactName: "", contactEmail: "", contactPhone: "",
        businessName: "", yearsOfPractice: "", areaServed: "", 
        certifications: "", additionalContact: "", message: "",
    });

    const [landConsultantFormData, setLandConsultantFormData] = useState({
        contactName: "", contactEmail: "", contactPhone: "",
        businessName: "", areasCovered: "", landTypes: "", 
        licenseNumber: "", additionalContact: "", message: "",
    });

    const [corporateFormData, setCorporateFormData] = useState({
        contactName: "", contactEmail: "", contactPhone: "", designation: "",
        companyName: "", industry: "", projectType: "", projectScale: "", 
        gstNumber: "", cinNumber: "", timeline: "", message: "",
    });

    // Handle change functions
    const handleArchitecturalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setArchitecturalFormData({ ...architecturalFormData, [e.target.name]: e.target.value });
    };

    const handleRealEstateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setRealEstateFormData({ ...realEstateFormData, [e.target.name]: e.target.value });
    };

    const handleInteriorDesignerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setInteriorDesignerFormData({ ...interiorDesignerFormData, [e.target.name]: e.target.value });
    };

    const handleFinancialChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFinancialFormData({ ...financialFormData, [e.target.name]: e.target.value });
    };

    const handleMaterialSupplierChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setMaterialSupplierFormData({ ...materialSupplierFormData, [e.target.name]: e.target.value });
    };

    const handleVastuChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setVastuFormData({ ...vastuFormData, [e.target.name]: e.target.value });
    };

    const handleLandConsultantChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setLandConsultantFormData({ ...landConsultantFormData, [e.target.name]: e.target.value });
    };

    const handleCorporateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setCorporateFormData({ ...corporateFormData, [e.target.name]: e.target.value });
    };

    // Submit handlers
    const handleArchitecturalSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const handleRealEstateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const handleInteriorDesignerSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const handleFinancialSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const handleMaterialSupplierSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const handleVastuSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const handleLandConsultantSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const handleCorporateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    // Partnership tab configuration
    const partnershipTabs = [
        { id: "architectural" as PartnershipType, label: "Architect", icon: "ph:buildings-fill", description: "Design partnership" },
        { id: "realEstate" as PartnershipType, label: "Real Estate", icon: "ph:house-line-fill", description: "Agent collaboration" },
        { id: "interiorDesigner" as PartnershipType, label: "Interior Designer", icon: "ph:paint-brush-fill", description: "Design collaboration" },
        { id: "financial" as PartnershipType, label: "Financial", icon: "ph:bank-fill", description: "Loan referrals" },
        { id: "materialSupplier" as PartnershipType, label: "Supplier", icon: "ph:package-fill", description: "Vendor partnership" },
        { id: "vastu" as PartnershipType, label: "Vastu", icon: "ph:compass-fill", description: "Consultant network" },
        { id: "landConsultant" as PartnershipType, label: "Land Consultant", icon: "ph:map-pin-fill", description: "Land + construction" },
        { id: "corporate" as PartnershipType, label: "Corporate", icon: "ph:briefcase-fill", description: "B2B projects" },
    ];

    // Benefits configuration
    const benefitsConfig: Record<PartnershipType, Array<{ icon: string; title: string; description: string }>> = {
        architectural: [
            { icon: "ph:handshake-fill", title: "Partnership Revenue", description: "Earn 2-5% commission on every project value" },
            { icon: "ph:buildings-fill", title: "Expand Network", description: "Access to quality construction projects" },
            { icon: "ph:briefcase-fill", title: "Collaborative Projects", description: "Work on high-value residential & commercial projects" },
            { icon: "ph:medal-fill", title: "Priority Allocation", description: "Preferred partner status with first preference" },
        ],
        realEstate: [
            { icon: "ph:coins-fill", title: "High Commission", description: "1-3% of project value for each client referral" },
            { icon: "ph:trend-up-fill", title: "Complete Solution", description: "Offer land + construction package to buyers" },
            { icon: "ph:handshake-fill", title: "Long-term Partnership", description: "Ongoing relationship for continuous revenue" },
            { icon: "ph:users-fill", title: "Client Retention", description: "Increase satisfaction with end-to-end service" },
        ],
        interiorDesigner: [
            { icon: "ph:sparkle-fill", title: "Revenue Share", description: "3-7% on every project with quality execution" },
            { icon: "ph:palette-fill", title: "Creative Freedom", description: "Work with builders who respect design vision" },
            { icon: "ph:handshake-fill", title: "Seamless Collaboration", description: "Smooth coordination between design and build" },
            { icon: "ph:trophy-fill", title: "Portfolio Growth", description: "Add quality projects to your portfolio" },
        ],
        financial: [
            { icon: "ph:currency-inr-fill", title: "Referral Bonus", description: "₹15,000-25,000 per funded construction project" },
            { icon: "ph:shield-check-fill", title: "Trusted Builder", description: "Refer clients to reliable construction partner" },
            { icon: "ph:chart-line-up-fill", title: "Higher Conversion", description: "Increased loan approval with trusted builders" },
            { icon: "ph:users-three-fill", title: "Client Satisfaction", description: "Happy clients lead to more referrals" },
        ],
        materialSupplier: [
            { icon: "ph:package-fill", title: "Bulk Orders", description: "Regular orders from ongoing projects" },
            { icon: "ph:arrows-clockwise-fill", title: "Mutual Growth", description: "Long-term supply partnership" },
            { icon: "ph:handshake-fill", title: "Preferred Vendor", description: "Priority consideration for all projects" },
            { icon: "ph:currency-inr-fill", title: "Bonus + Orders", description: "Referral bonus plus supply business" },
        ],
        vastu: [
            { icon: "ph:compass-fill", title: "Commission", description: "₹5,000-15,000 per client who builds" },
            { icon: "ph:buildings-fill", title: "Implementation", description: "Builders who respect Vastu principles" },
            { icon: "ph:users-fill", title: "Client Assurance", description: "Recommendations properly executed" },
            { icon: "ph:medal-fill", title: "Recognition", description: "Build reputation as trusted consultant" },
        ],
        landConsultant: [
            { icon: "ph:map-trifold-fill", title: "Complete Package", description: "Land + construction solution for clients" },
            { icon: "ph:currency-inr-fill", title: "Double Revenue", description: "2-4% commission on construction projects" },
            { icon: "ph:handshake-fill", title: "Strategic Alliance", description: "Long-term collaboration for growth" },
            { icon: "ph:star-fill", title: "Client Value", description: "Provide end-to-end solution" },
        ],
        corporate: [
            { icon: "ph:buildings-fill", title: "Large-Scale Projects", description: "Commercial and industrial construction" },
            { icon: "ph:currency-circle-dollar-fill", title: "Substantial Commission", description: "1-3% based on contract value" },
            { icon: "ph:briefcase-fill", title: "B2B Relations", description: "Establish valuable corporate partnerships" },
            { icon: "ph:certificate-fill", title: "Dedicated PM", description: "Priority handling with dedicated manager" },
        ],
    };

    // Steps configuration - keeping the existing comprehensive steps
    const stepsConfig: Record<PartnershipType, Array<{ number: string; title: string; description: string }>> = {
        architectural: [
            { number: "01", title: "Register", description: "Submit architect details and portfolio" },
            { number: "02", title: "Verification", description: "We verify credentials and schedule meeting" },
            { number: "03", title: "Onboarding", description: "Sign partnership agreement and get projects" },
            { number: "04", title: "Earn Commission", description: "Receive commission for each project" },
        ],
        realEstate: [
            { number: "01", title: "Register Agent", description: "Submit agent details and client information" },
            { number: "02", title: "Client Meeting", description: "We schedule consultation with client" },
            { number: "03", title: "Project Starts", description: "Client signs agreement and begins" },
            { number: "04", title: "Commission Paid", description: "Receive commission after milestone" },
        ],
        interiorDesigner: [
            { number: "01", title: "Submit Portfolio", description: "Share designer details and past work" },
            { number: "02", title: "Partnership Setup", description: "Establish collaboration framework" },
            { number: "03", title: "Project Execution", description: "Work together on projects" },
            { number: "04", title: "Revenue Share", description: "Earn percentage on completed projects" },
        ],
        financial: [
            { number: "01", title: "Register", description: "Submit loan officer and institution details" },
            { number: "02", title: "Client Consultation", description: "We meet client for project discussion" },
            { number: "03", title: "Loan Processing", description: "Client gets loan and project starts" },
            { number: "04", title: "Bonus Received", description: "Bonus after first disbursement" },
        ],
        materialSupplier: [
            { number: "01", title: "Register Supplier", description: "Submit company and product details" },
            { number: "02", title: "Quality Check", description: "We evaluate quality and pricing" },
            { number: "03", title: "Vendor Onboarding", description: "Become preferred vendor" },
            { number: "04", title: "Ongoing Orders", description: "Regular orders plus referral bonus" },
        ],
        vastu: [
            { number: "01", title: "Register", description: "Share consultant and client information" },
            { number: "02", title: "Vastu Integration", description: "We incorporate in design phase" },
            { number: "03", title: "Construction", description: "Build per Vastu guidelines" },
            { number: "04", title: "Commission Paid", description: "Receive payment after project start" },
        ],
        landConsultant: [
            { number: "01", title: "Client Referral", description: "Refer client who bought land" },
            { number: "02", title: "Site Assessment", description: "We assess land for construction" },
            { number: "03", title: "Project Launch", description: "Client approves and begins building" },
            { number: "04", title: "Commission Earned", description: "Earn on top of land sale" },
        ],
        corporate: [
            { number: "01", title: "Submit Requirement", description: "Share company and project details" },
            { number: "02", title: "Proposal", description: "We create detailed project proposal" },
            { number: "03", title: "Contract Signing", description: "Company approves and signs" },
            { number: "04", title: "Commission Earned", description: "Receive per contract value" },
        ],
    };

    // FAQ Data for partnerships
    const faqData = [
        {
            question: "What is the difference between referral and partnership programs?",
            answer: "Our Referral Program is for individuals referring friends/family clients (one-time cash rewards). Our Partnership Program is for professionals and businesses seeking ongoing collaboration with commission-based revenue. Partnerships involve long-term relationships, formal agreements, and continuous project flow."
        },
        {
            question: "How do partnership commissions work?",
            answer: "Commission rates vary by partnership type: Architects (2-5% of project value), Real Estate Agents (1-3%), Interior Designers (3-7% revenue share), Financial Institutions (₹15,000-25,000 per project), Material Suppliers (bulk orders + ₹5,000-20,000 bonus), Vastu Consultants (₹5,000-15,000), Land Consultants (2-4%), and Corporate (1-3% of contract value). Commissions are paid per completed project or agreed milestones."
        },
        {
            question: "Do I need to sign a formal partnership agreement?",
            answer: "Yes. All professional partnerships require a formal agreement outlining commission structure, responsibilities, payment terms, and collaboration guidelines. This protects both parties and ensures clear expectations. The agreement process typically takes 3-5 business days after verification."
        },
        {
            question: "How long does the partnership verification process take?",
            answer: "Verification typically takes 5-7 business days. We verify credentials, check references, review portfolio/track record, and schedule a partnership discussion meeting. Once approved, onboarding and agreement signing takes an additional 3-5 days."
        },
        {
            question: "Can I be part of multiple partnership categories?",
            answer: "Yes! If you operate in multiple domains (e.g., you're both a land consultant and real estate agent), you can apply for multiple partnership categories. Each will have its own agreement and commission structure based on the services provided."
        },
        {
            question: "Is there a minimum commitment or quota?",
            answer: "No minimum commitment required. Partnerships are flexible - you refer/collaborate when opportunities arise. However, active partners who consistently bring projects receive priority status, higher commission rates, and exclusive benefits."
        },
        {
            question: "How and when are commissions paid?",
            answer: "Commission payment schedules vary: Architects/Designers - after project completion; Real Estate/Land - after client agreement signing; Financial - after first loan disbursement; Suppliers - monthly after order fulfillment; Vastu - after project commencement; Corporate - per agreed milestones. Payments are processed within 15-30 days of milestone completion."
        },
        {
            question: "What support do partners receive?",
            answer: "Partners receive: Dedicated partnership manager, marketing collateral, project updates, priority customer service, training on our processes, co-branded materials (for eligible partners), and quarterly partnership review meetings. We invest in our partners' success."
        },
        {
            question: "Can I track my partnership performance?",
            answer: "Yes! Partners get access to a dedicated partner dashboard showing: active projects, commission earnings, payment history, client status, and performance metrics. You'll receive monthly partnership reports via email."
        },
        {
            question: "Are partnership commissions taxable?",
            answer: "Yes, all partnership commissions are business income subject to applicable taxes. We provide detailed invoices and TDS certificates for your tax filing. For commissions above ₹50,000, TDS is deducted as per government regulations."
        }
    ];

    const currentBenefits = benefitsConfig[activeTab];
    const currentSteps = stepsConfig[activeTab];

    return (
        <div className="container max-w-8xl mx-auto px-4 sm:px-5 2xl:px-0">
            
            {/* Partner Login Notice */}
            <div className="mb-8 border border-primary/30 rounded-2xl p-6 bg-gradient-to-r from-primary/10 to-transparent flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon icon={"ph:sign-in-fill"} width={24} height={24} className="text-primary" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg md:text-xl text-black dark:text-white">Already a Partner?</h3>
                        <p className="text-sm md:text-base text-black/70 dark:text-white/70 mt-1 leading-relaxed">Login to access your dashboard and track referrals</p>
                    </div>
                </div>
                <a
                    href="/partnerships/login"
                    className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full bg-primary text-white text-base md:text-lg font-bold hover:bg-dark transition-colors shadow-lg hover:scale-105"
                >
                    <Icon icon={"ph:sign-in-fill"} width={20} height={20} className="md:w-6 md:h-6" />
                    Partner Login
                </a>
            </div>

            {/* Partnership Types Selector */}
            <section className="mb-16">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex gap-2.5 items-center justify-center mb-6">
                        <Icon icon={"ph:briefcase-fill"} width={24} height={24} className="text-primary" />
                        <p className="text-base md:text-lg font-bold text-badge dark:text-white/90">
                            Choose Partnership Type
                        </p>
                    </div>
                    
                    {/* Partnership tabs */}
                    <div className="w-full overflow-x-auto pb-4 no-scrollbar">
                        <div className="inline-flex gap-3 p-2 border border-black/10 dark:border-white/10 rounded-2xl bg-black/5 dark:bg-white/5 min-w-full justify-center flex-wrap">
                            {partnershipTabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                                        activeTab === tab.id
                                            ? "bg-primary text-white shadow-lg"
                                            : "text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                                    }`}
                                >
                                    <div className="flex flex-col items-center gap-1">
                                        <Icon icon={tab.icon} width={20} height={20} />
                                        <span className="text-xs">{tab.label}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <p className="text-base md:text-lg text-black/70 dark:text-white/70 mt-6 text-center max-w-3xl mx-auto leading-relaxed px-4">
                        {activeTab === "architectural" && "Partner with us for ongoing architectural collaboration and project commissions"}
                        {activeTab === "realEstate" && "Collaborate with Kerala's trusted builder and add value to your land buyers"}
                        {activeTab === "interiorDesigner" && "Join our network for seamless design-to-construction projects"}
                        {activeTab === "financial" && "Connect your loan-approved clients with reliable construction services"}
                        {activeTab === "materialSupplier" && "Become our preferred vendor and grow your business"}
                        {activeTab === "vastu" && "Refer clients whose projects need Vastu-compliant construction"}
                        {activeTab === "landConsultant" && "Provide complete land + construction solutions to clients"}
                        {activeTab === "corporate" && "Partner for commercial and industrial construction projects"}
                    </p>
                </div>
            </section>

            {/* Partnership Benefits */}
            <section className="mb-20">
                <div className="text-center mb-12">
                    <div className="flex gap-2.5 items-center justify-center mb-4">
                        <Icon icon={"ph:star-fill"} width={24} height={24} className="text-primary" />
                        <p className="text-base md:text-lg font-bold text-badge dark:text-white/90">Partnership Benefits</p>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-52 font-bold tracking-tight text-black dark:text-white mb-4 leading-tight px-4">
                        Why Partner With Us
                    </h2>
                    <p className="text-base md:text-lg font-normal text-black/70 dark:text-white/70 leading-relaxed max-w-3xl mx-auto px-4">
                        Unlock exclusive collaboration opportunities and grow your business
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {currentBenefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="border border-black/10 dark:border-white/10 rounded-2xl p-6 hover:shadow-xl dark:hover:shadow-white/10 transition-all duration-300 hover:border-primary/30 hover:scale-105"
                        >
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                <Icon icon={benefit.icon} width={28} height={28} className="text-primary md:w-8 md:h-8" />
                            </div>
                            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-black dark:text-white mb-3 leading-snug">
                                {benefit.title}
                            </h3>
                            <p className="text-sm md:text-base text-black/70 dark:text-white/70 leading-relaxed">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How Partnership Works */}
            <section className="mb-20">
                <div className="text-center mb-12">
                    <div className="flex gap-2.5 items-center justify-center mb-4">
                        <Icon icon={"ph:path-fill"} width={24} height={24} className="text-primary" />
                        <p className="text-base md:text-lg font-bold text-badge dark:text-white/90">Partnership Process</p>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-52 font-bold tracking-tight text-black dark:text-white mb-4 leading-tight px-4">
                        How It Works
                    </h2>
                    <p className="text-base md:text-lg font-normal text-black/70 dark:text-white/70 leading-relaxed max-w-3xl mx-auto px-4">
                        Our streamlined partnership process
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {currentSteps.map((step, index) => (
                        <div key={index} className="relative">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mb-4 shadow-lg">
                                    <span className="text-3xl font-bold text-white">{step.number}</span>
                                </div>
                                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-black dark:text-white mb-2 leading-snug">
                                    {step.title}
                                </h3>
                                <p className="text-sm md:text-base text-black/70 dark:text-white/70 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                            {index < currentSteps.length - 1 && (
                                <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent"></div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Partnership Application Form - Will be dynamically rendered based on activeTab */}
            <section className="mb-20">
                <div className="text-center mb-12">
                    <div className="flex gap-2.5 items-center justify-center mb-4">
                        <Icon icon={"ph:file-text-fill"} width={24} height={24} className="text-primary" />
                        <p className="text-base md:text-lg font-bold text-badge dark:text-white/90">Apply Now</p>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-52 font-bold tracking-tight text-black dark:text-white mb-4 leading-tight px-4">
                        Partnership Application
                    </h2>
                    <p className="text-base md:text-lg font-normal text-black/70 dark:text-white/70 leading-relaxed max-w-3xl mx-auto px-4">
                        Fill out the form below to start the partnership process
                    </p>
                </div>

                <div className="border border-black/10 dark:border-white/10 rounded-2xl p-8 shadow-xl dark:shadow-white/10 max-w-4xl mx-auto bg-white dark:bg-dark">
                    {/* Form rendering logic will go here - keeping it from the original comprehensive component */}
                    {activeTab === "architectural" && (
                        <form onSubmit={handleArchitecturalSubmit}>
                            <div className="mb-8">
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-black dark:text-white mb-2 leading-snug">Primary Contact Information</h3>
                                <p className="text-sm md:text-base text-black/70 dark:text-white/70 mb-6 leading-relaxed">This will be used to create your partner account for dashboard access</p>
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <input type="text" name="contactName" placeholder="Your Full Name*" required value={architecturalFormData.contactName} onChange={handleArchitecturalChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                        <input type="text" name="designation" placeholder="Designation/Role*" required value={architecturalFormData.designation} onChange={handleArchitecturalChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    </div>
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <input type="email" name="contactEmail" placeholder="Email (Login ID)*" required value={architecturalFormData.contactEmail} onChange={handleArchitecturalChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                        <input type="tel" name="contactPhone" placeholder="Phone Number*" required value={architecturalFormData.contactPhone} onChange={handleArchitecturalChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-8">
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-black dark:text-white mb-2 leading-snug">Firm/Business Details</h3>
                                <p className="text-sm md:text-base text-black/70 dark:text-white/70 mb-6 leading-relaxed">Professional credentials and portfolio</p>
                                <div className="flex flex-col gap-6">
                                    <input type="text" name="firmName" placeholder="Firm/Company Name*" required value={architecturalFormData.firmName} onChange={handleArchitecturalChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <input type="number" name="experience" placeholder="Years of Experience*" required min="0" value={architecturalFormData.experience} onChange={handleArchitecturalChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                        <select name="specialization" required value={architecturalFormData.specialization} onChange={handleArchitecturalChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg">
                                            <option value="">Specialization*</option>
                                            <option value="residential">Residential Architecture</option>
                                            <option value="commercial">Commercial Architecture</option>
                                            <option value="interior">Interior Design</option>
                                            <option value="landscape">Landscape Architecture</option>
                                            <option value="sustainable">Sustainable Design</option>
                                            <option value="mixed">Mixed Use</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <input type="url" name="portfolioLink" placeholder="Portfolio/Website Link*" required value={architecturalFormData.portfolioLink} onChange={handleArchitecturalChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                        <input type="text" name="gstNumber" placeholder="GST Number (Optional)" value={architecturalFormData.gstNumber} onChange={handleArchitecturalChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    </div>
                                    <input type="text" name="additionalContact" placeholder="Additional Contact Person (Optional)" value={architecturalFormData.additionalContact} onChange={handleArchitecturalChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    <textarea rows={5} name="message" placeholder="Tell us about notable projects and why you&apos;d like to partner (Optional)" value={architecturalFormData.message} onChange={handleArchitecturalChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-2xl outline-primary focus:outline bg-transparent text-black dark:text-white text-base md:text-lg"></textarea>
                                </div>
                            </div>
                            <div className="mb-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                <div className="flex items-start gap-3">
                                    <Icon icon={"ph:info-fill"} width={20} height={20} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-blue-900 dark:text-blue-300">
                                        <strong>Partner Account:</strong> Upon approval, we&apos;ll create a partner dashboard account using your email. You&apos;ll receive login credentials to track your referrals, commissions, and partnership status in real-time.
                                    </p>
                                </div>
                            </div>
                            <div className="mb-6 flex items-start gap-3">
                                <input type="checkbox" id="terms" required className="mt-1" />
                                <label htmlFor="terms" className="text-sm text-black/70 dark:text-white/70">
                                    I agree to the partnership terms and conditions, and authorize Walldot Builders to create a partner account for tracking and commission management. *
                                </label>
                            </div>
                            <button type="submit" className="px-8 py-4 rounded-full bg-primary text-white text-base font-semibold w-full mobile:w-fit hover:cursor-pointer hover:bg-dark duration-300 flex items-center justify-center gap-2 group">
                                Submit Partnership Application
                                <Icon icon={"ph:arrow-right"} width={20} height={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    )}

                    {/* Real Estate Agent Form */}
                    {activeTab === "realEstate" && (
                        <form onSubmit={handleRealEstateSubmit}>
                            <div className="mb-8">
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-black dark:text-white mb-2 leading-snug">Primary Contact Information</h3>
                                <p className="text-sm md:text-base text-black/70 dark:text-white/70 mb-6 leading-relaxed">This will be used to create your partner account for dashboard access</p>
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <input type="text" name="contactName" placeholder="Your Full Name*" required value={realEstateFormData.contactName} onChange={handleRealEstateChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                        <input type="text" name="designation" placeholder="Designation/Role*" required value={realEstateFormData.designation} onChange={handleRealEstateChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    </div>
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <input type="email" name="contactEmail" placeholder="Email (Login ID)*" required value={realEstateFormData.contactEmail} onChange={handleRealEstateChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                        <input type="tel" name="contactPhone" placeholder="Phone Number*" required value={realEstateFormData.contactPhone} onChange={handleRealEstateChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-8">
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-black dark:text-white mb-2 leading-snug">Agency/Business Details</h3>
                                <p className="text-sm md:text-base text-black/70 dark:text-white/70 mb-6 leading-relaxed">Professional credentials and operational details</p>
                                <div className="flex flex-col gap-6">
                                    <input type="text" name="firmName" placeholder="Firm/Agency Name*" required value={realEstateFormData.firmName} onChange={handleRealEstateChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <input type="text" name="licenseNumber" placeholder="License Number (Optional)" value={realEstateFormData.licenseNumber} onChange={handleRealEstateChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                        <input type="text" name="reraNumber" placeholder="RERA Number (Optional)" value={realEstateFormData.reraNumber} onChange={handleRealEstateChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    </div>
                                    <input type="text" name="areaOfOperation" placeholder="Area of Operation*" required value={realEstateFormData.areaOfOperation} onChange={handleRealEstateChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    <input type="text" name="additionalContact" placeholder="Additional Contact Person (Optional)" value={realEstateFormData.additionalContact} onChange={handleRealEstateChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    <textarea rows={5} name="message" placeholder="Tell us about your business and why you&apos;d like to partner" value={realEstateFormData.message} onChange={handleRealEstateChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-2xl outline-primary focus:outline bg-transparent text-black dark:text-white text-base md:text-lg"></textarea>
                                </div>
                            </div>
                            <div className="mb-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                <div className="flex items-start gap-3">
                                    <Icon icon={"ph:info-fill"} width={20} height={20} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-blue-900 dark:text-blue-300">
                                        <strong>Partner Account:</strong> Upon approval, we&apos;ll create a partner dashboard account using your email. You&apos;ll receive login credentials to track your referrals, commissions, and partnership status in real-time.
                                    </p>
                                </div>
                            </div>
                            <div className="mb-6 flex items-start gap-3">
                                <input type="checkbox" id="terms-re" required className="mt-1" />
                                <label htmlFor="terms-re" className="text-sm text-black/70 dark:text-white/70">
                                    I agree to the partnership terms and conditions, and authorize Walldot Builders to create a partner account for tracking and commission management. *
                                </label>
                            </div>
                            <button type="submit" className="px-8 py-4 rounded-full bg-primary text-white text-base font-semibold w-full mobile:w-fit hover:bg-dark duration-300 flex items-center justify-center gap-2 group">
                                Submit Partnership Application
                                <Icon icon={"ph:arrow-right"} width={20} height={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    )}

                    {/* Interior Designer Form */}
                    {activeTab === "interiorDesigner" && (
                        <form onSubmit={handleInteriorDesignerSubmit}>
                            <div className="mb-8">
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-black dark:text-white mb-2 leading-snug">Primary Contact Information</h3>
                                <p className="text-sm md:text-base text-black/70 dark:text-white/70 mb-6 leading-relaxed">This will be used to create your partner account for dashboard access</p>
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <input type="text" name="contactName" placeholder="Your Full Name*" required value={interiorDesignerFormData.contactName} onChange={handleInteriorDesignerChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                        <input type="text" name="designation" placeholder="Designation/Role*" required value={interiorDesignerFormData.designation} onChange={handleInteriorDesignerChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    </div>
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <input type="email" name="contactEmail" placeholder="Email (Login ID)*" required value={interiorDesignerFormData.contactEmail} onChange={handleInteriorDesignerChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                        <input type="tel" name="contactPhone" placeholder="Phone Number*" required value={interiorDesignerFormData.contactPhone} onChange={handleInteriorDesignerChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-8">
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-black dark:text-white mb-2 leading-snug">Designer/Studio Details</h3>
                                <p className="text-sm md:text-base text-black/70 dark:text-white/70 mb-6 leading-relaxed">Professional credentials and portfolio</p>
                                <div className="flex flex-col gap-6">
                                    <input type="text" name="firmName" placeholder="Firm/Studio Name*" required value={interiorDesignerFormData.firmName} onChange={handleInteriorDesignerChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <input type="number" name="experience" placeholder="Years of Experience*" required min="0" value={interiorDesignerFormData.experience} onChange={handleInteriorDesignerChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                        <select name="specialization" required value={interiorDesignerFormData.specialization} onChange={handleInteriorDesignerChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg">
                                            <option value="">Specialization*</option>
                                            <option value="residential">Residential Interiors</option>
                                            <option value="commercial">Commercial Interiors</option>
                                            <option value="hospitality">Hospitality Design</option>
                                            <option value="modular">Modular Kitchens</option>
                                            <option value="luxury">Luxury Design</option>
                                            <option value="sustainable">Sustainable Design</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <input type="url" name="portfolioLink" placeholder="Portfolio/Website Link*" required value={interiorDesignerFormData.portfolioLink} onChange={handleInteriorDesignerChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                        <input type="text" name="gstNumber" placeholder="GST Number (Optional)" value={interiorDesignerFormData.gstNumber} onChange={handleInteriorDesignerChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    </div>
                                    <input type="text" name="additionalContact" placeholder="Additional Contact Person (Optional)" value={interiorDesignerFormData.additionalContact} onChange={handleInteriorDesignerChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    <textarea rows={5} name="message" placeholder="Tell us about your design philosophy and notable projects (Optional)" value={interiorDesignerFormData.message} onChange={handleInteriorDesignerChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-2xl outline-primary focus:outline bg-transparent text-black dark:text-white text-base md:text-lg"></textarea>
                                </div>
                            </div>
                            <div className="mb-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                <div className="flex items-start gap-3">
                                    <Icon icon={"ph:info-fill"} width={20} height={20} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-blue-900 dark:text-blue-300">
                                        <strong>Partner Account:</strong> Upon approval, we&apos;ll create a partner dashboard account using your email. You&apos;ll receive login credentials to track your referrals, commissions, and partnership status in real-time.
                                    </p>
                                </div>
                            </div>
                            <div className="mb-6 flex items-start gap-3">
                                <input type="checkbox" id="terms-id" required className="mt-1" />
                                <label htmlFor="terms-id" className="text-sm text-black/70 dark:text-white/70">
                                    I agree to the partnership terms and conditions, and authorize Walldot Builders to create a partner account for tracking and commission management. *
                                </label>
                            </div>
                            <button type="submit" className="px-8 py-4 rounded-full bg-primary text-white text-base font-semibold w-full mobile:w-fit hover:bg-dark duration-300 flex items-center justify-center gap-2 group">
                                Submit Partnership Application
                                <Icon icon={"ph:arrow-right"} width={20} height={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    )}

                    {/* Financial Institution Form */}
                    {activeTab === "financial" && (
                        <form onSubmit={handleFinancialSubmit}>
                            <div className="mb-8">
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-black dark:text-white mb-2 leading-snug">Primary Contact Information</h3>
                                <p className="text-sm md:text-base text-black/70 dark:text-white/70 mb-6 leading-relaxed">Account will be created for dashboard access</p>
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <input type="text" name="contactName" placeholder="Your Full Name*" required value={financialFormData.contactName} onChange={handleFinancialChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                        <input type="text" name="designation" placeholder="Designation*" required value={financialFormData.designation} onChange={handleFinancialChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    </div>
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <input type="email" name="contactEmail" placeholder="Email (Login ID)*" required value={financialFormData.contactEmail} onChange={handleFinancialChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                        <input type="tel" name="contactPhone" placeholder="Phone Number*" required value={financialFormData.contactPhone} onChange={handleFinancialChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-8">
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-black dark:text-white mb-2 leading-snug">Institution Details</h3>
                                <p className="text-sm md:text-base text-black/70 dark:text-white/70 mb-6 leading-relaxed">Bank/Financial institution information</p>
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <input type="text" name="bankName" placeholder="Bank/Institution Name*" required value={financialFormData.bankName} onChange={handleFinancialChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                        <input type="text" name="branch" placeholder="Branch Location*" required value={financialFormData.branch} onChange={handleFinancialChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    </div>
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <input type="text" name="ifscCode" placeholder="IFSC Code (Optional)" value={financialFormData.ifscCode} onChange={handleFinancialChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                        <input type="text" name="employeeId" placeholder="Employee ID (Optional)" value={financialFormData.employeeId} onChange={handleFinancialChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    </div>
                                    <textarea rows={5} name="message" placeholder="Tell us about your loan products and target clients (Optional)" value={financialFormData.message} onChange={handleFinancialChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-2xl outline-primary focus:outline bg-transparent text-black dark:text-white text-base md:text-lg"></textarea>
                                </div>
                            </div>
                            <div className="mb-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                <div className="flex items-start gap-3">
                                    <Icon icon={"ph:info-fill"} width={20} height={20} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-blue-900 dark:text-blue-300">
                                        <strong>Partner Account:</strong> Upon approval, we&apos;ll create a partner dashboard account. Track loan-approved client referrals and commission status in real-time.
                                    </p>
                                </div>
                            </div>
                            <div className="mb-6 flex items-start gap-3">
                                <input type="checkbox" id="terms-fin" required className="mt-1" />
                                <label htmlFor="terms-fin" className="text-sm text-black/70 dark:text-white/70">
                                    I agree to the partnership terms and conditions, and authorize Walldot Builders to create a partner account. *
                                </label>
                            </div>
                            <button type="submit" className="px-8 py-4 rounded-full bg-primary text-white text-base font-semibold w-full mobile:w-fit hover:bg-dark duration-300 flex items-center justify-center gap-2 group">
                                Submit Partnership Application
                                <Icon icon={"ph:arrow-right"} width={20} height={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    )}

                    {/* Material Supplier Form */}
                    {activeTab === "materialSupplier" && (
                        <form onSubmit={handleMaterialSupplierSubmit}>
                            <div className="mb-8">
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-black dark:text-white mb-2 leading-snug">Primary Contact Information</h3>
                                <p className="text-sm md:text-base text-black/70 dark:text-white/70 mb-6 leading-relaxed">Account creation and communication details</p>
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <input type="text" name="contactName" placeholder="Your Full Name*" required value={materialSupplierFormData.contactName} onChange={handleMaterialSupplierChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                        <input type="text" name="designation" placeholder="Designation/Role*" required value={materialSupplierFormData.designation} onChange={handleMaterialSupplierChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    </div>
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <input type="email" name="contactEmail" placeholder="Email (Login ID)*" required value={materialSupplierFormData.contactEmail} onChange={handleMaterialSupplierChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                        <input type="tel" name="contactPhone" placeholder="Phone Number*" required value={materialSupplierFormData.contactPhone} onChange={handleMaterialSupplierChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-8">
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-black dark:text-white mb-2 leading-snug">Business Details</h3>
                                <p className="text-sm md:text-base text-black/70 dark:text-white/70 mb-6 leading-relaxed">Company and product information</p>
                                <div className="flex flex-col gap-6">
                                    <input type="text" name="companyName" placeholder="Company Name*" required value={materialSupplierFormData.companyName} onChange={handleMaterialSupplierChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    <input type="text" name="materialsSupplied" placeholder="Materials Supplied (e.g., Cement, Steel, Tiles)*" required value={materialSupplierFormData.materialsSupplied} onChange={handleMaterialSupplierChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <select name="businessSize" required value={materialSupplierFormData.businessSize} onChange={handleMaterialSupplierChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg">
                                            <option value="">Business Size*</option>
                                            <option value="small">Small (Local)</option>
                                            <option value="medium">Medium (District)</option>
                                            <option value="large">Large (State/Multi-state)</option>
                                        </select>
                                        <input type="text" name="location" placeholder="Location/City*" required value={materialSupplierFormData.location} onChange={handleMaterialSupplierChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    </div>
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <input type="text" name="gstNumber" placeholder="GST Number (Optional)" value={materialSupplierFormData.gstNumber} onChange={handleMaterialSupplierChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                        <input type="text" name="additionalContact" placeholder="Additional Contact (Optional)" value={materialSupplierFormData.additionalContact} onChange={handleMaterialSupplierChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    </div>
                                    <textarea rows={5} name="message" placeholder="Additional information about products and pricing (Optional)" value={materialSupplierFormData.message} onChange={handleMaterialSupplierChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-2xl outline-primary focus:outline bg-transparent text-black dark:text-white text-base md:text-lg"></textarea>
                                </div>
                            </div>
                            <div className="mb-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                <div className="flex items-start gap-3">
                                    <Icon icon={"ph:info-fill"} width={20} height={20} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-blue-900 dark:text-blue-300">
                                        <strong>Partner Account:</strong> Track your orders, view purchase orders, and monitor vendor performance through your dashboard.
                                    </p>
                                </div>
                            </div>
                            <div className="mb-6 flex items-start gap-3">
                                <input type="checkbox" id="terms-sup" required className="mt-1" />
                                <label htmlFor="terms-sup" className="text-sm text-black/70 dark:text-white/70">
                                    I agree to the vendor partnership terms and authorize account creation. *
                                </label>
                            </div>
                            <button type="submit" className="px-8 py-4 rounded-full bg-primary text-white text-base font-semibold w-full mobile:w-fit hover:bg-dark duration-300 flex items-center justify-center gap-2 group">
                                Submit Partnership Application
                                <Icon icon={"ph:arrow-right"} width={20} height={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    )}

                    {/* Vastu Consultant Form */}
                    {activeTab === "vastu" && (
                        <form onSubmit={handleVastuSubmit}>
                            <div className="mb-8">
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-black dark:text-white mb-2 leading-snug">Primary Contact Information</h3>
                                <p className="text-sm md:text-base text-black/70 dark:text-white/70 mb-6 leading-relaxed">Dashboard account will be created with these details</p>
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <input type="text" name="contactName" placeholder="Your Full Name*" required value={vastuFormData.contactName} onChange={handleVastuChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                        <input type="email" name="contactEmail" placeholder="Email (Login ID)*" required value={vastuFormData.contactEmail} onChange={handleVastuChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    </div>
                                    <input type="tel" name="contactPhone" placeholder="Phone Number*" required value={vastuFormData.contactPhone} onChange={handleVastuChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                </div>
                            </div>
                            <div className="mb-8">
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-black dark:text-white mb-2 leading-snug">Professional Details</h3>
                                <p className="text-sm md:text-base text-black/70 dark:text-white/70 mb-6 leading-relaxed">Vastu consultation practice information</p>
                                <div className="flex flex-col gap-6">
                                    <input type="text" name="businessName" placeholder="Practice/Business Name" value={vastuFormData.businessName} onChange={handleVastuChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <input type="number" name="yearsOfPractice" placeholder="Years of Practice*" required min="0" value={vastuFormData.yearsOfPractice} onChange={handleVastuChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                        <input type="text" name="areaServed" placeholder="Area Served*" required value={vastuFormData.areaServed} onChange={handleVastuChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    </div>
                                    <input type="text" name="certifications" placeholder="Certifications/Qualifications (Optional)" value={vastuFormData.certifications} onChange={handleVastuChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    <input type="text" name="additionalContact" placeholder="Additional Contact (Optional)" value={vastuFormData.additionalContact} onChange={handleVastuChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    <textarea rows={5} name="message" placeholder="Tell us about your practice and approach (Optional)" value={vastuFormData.message} onChange={handleVastuChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-2xl outline-primary focus:outline bg-transparent text-black dark:text-white text-base md:text-lg"></textarea>
                                </div>
                            </div>
                            <div className="mb-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                <div className="flex items-start gap-3">
                                    <Icon icon={"ph:info-fill"} width={20} height={20} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-blue-900 dark:text-blue-300">
                                        <strong>Partner Account:</strong> Track your client referrals and commission earnings through the dashboard.
                                    </p>
                                </div>
                            </div>
                            <div className="mb-6 flex items-start gap-3">
                                <input type="checkbox" id="terms-vastu" required className="mt-1" />
                                <label htmlFor="terms-vastu" className="text-sm text-black/70 dark:text-white/70">
                                    I agree to the partnership terms and authorize account creation. *
                                </label>
                            </div>
                            <button type="submit" className="px-8 py-4 rounded-full bg-primary text-white text-base font-semibold w-full mobile:w-fit hover:bg-dark duration-300 flex items-center justify-center gap-2 group">
                                Submit Partnership Application
                                <Icon icon={"ph:arrow-right"} width={20} height={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    )}

                    {/* Land Consultant Form */}
                    {activeTab === "landConsultant" && (
                        <form onSubmit={handleLandConsultantSubmit}>
                            <div className="mb-8">
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-black dark:text-white mb-2 leading-snug">Primary Contact Information</h3>
                                <p className="text-sm md:text-base text-black/70 dark:text-white/70 mb-6 leading-relaxed">Dashboard access credentials</p>
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <input type="text" name="contactName" placeholder="Your Full Name*" required value={landConsultantFormData.contactName} onChange={handleLandConsultantChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                        <input type="email" name="contactEmail" placeholder="Email (Login ID)*" required value={landConsultantFormData.contactEmail} onChange={handleLandConsultantChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    </div>
                                    <input type="tel" name="contactPhone" placeholder="Phone Number*" required value={landConsultantFormData.contactPhone} onChange={handleLandConsultantChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                </div>
                            </div>
                            <div className="mb-8">
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-black dark:text-white mb-2 leading-snug">Business Details</h3>
                                <p className="text-sm md:text-base text-black/70 dark:text-white/70 mb-6 leading-relaxed">Land consultancy information</p>
                                <div className="flex flex-col gap-6">
                                    <input type="text" name="businessName" placeholder="Business/Practice Name" value={landConsultantFormData.businessName} onChange={handleLandConsultantChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <input type="text" name="areasCovered" placeholder="Areas Covered*" required value={landConsultantFormData.areasCovered} onChange={handleLandConsultantChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                        <input type="text" name="landTypes" placeholder="Land Types (e.g., Residential, Commercial)*" required value={landConsultantFormData.landTypes} onChange={handleLandConsultantChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    </div>
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <input type="text" name="licenseNumber" placeholder="License Number (Optional)" value={landConsultantFormData.licenseNumber} onChange={handleLandConsultantChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                        <input type="text" name="additionalContact" placeholder="Additional Contact (Optional)" value={landConsultantFormData.additionalContact} onChange={handleLandConsultantChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    </div>
                                    <textarea rows={5} name="message" placeholder="Tell us about your land portfolio and client base (Optional)" value={landConsultantFormData.message} onChange={handleLandConsultantChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-2xl outline-primary focus:outline bg-transparent text-black dark:text-white text-base md:text-lg"></textarea>
                                </div>
                            </div>
                            <div className="mb-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                <div className="flex items-start gap-3">
                                    <Icon icon={"ph:info-fill"} width={20} height={20} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-blue-900 dark:text-blue-300">
                                        <strong>Partner Account:</strong> Track construction referrals from your land clients and monitor commissions.
                                    </p>
                                </div>
                            </div>
                            <div className="mb-6 flex items-start gap-3">
                                <input type="checkbox" id="terms-land" required className="mt-1" />
                                <label htmlFor="terms-land" className="text-sm text-black/70 dark:text-white/70">
                                    I agree to the partnership terms and authorize account creation. *
                                </label>
                            </div>
                            <button type="submit" className="px-8 py-4 rounded-full bg-primary text-white text-base font-semibold w-full mobile:w-fit hover:bg-dark duration-300 flex items-center justify-center gap-2 group">
                                Submit Partnership Application
                                <Icon icon={"ph:arrow-right"} width={20} height={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    )}

                    {/* Corporate Form */}
                    {activeTab === "corporate" && (
                        <form onSubmit={handleCorporateSubmit}>
                            <div className="mb-8">
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-black dark:text-white mb-2 leading-snug">Primary Contact Information</h3>
                                <p className="text-sm md:text-base text-black/70 dark:text-white/70 mb-6 leading-relaxed">Authorized person for partnership and account access</p>
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <input type="text" name="contactName" placeholder="Contact Person Name*" required value={corporateFormData.contactName} onChange={handleCorporateChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                        <input type="text" name="designation" placeholder="Designation*" required value={corporateFormData.designation} onChange={handleCorporateChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    </div>
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <input type="email" name="contactEmail" placeholder="Email (Login ID)*" required value={corporateFormData.contactEmail} onChange={handleCorporateChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                        <input type="tel" name="contactPhone" placeholder="Phone Number*" required value={corporateFormData.contactPhone} onChange={handleCorporateChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-8">
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-black dark:text-white mb-2 leading-snug">Company Details</h3>
                                <p className="text-sm md:text-base text-black/70 dark:text-white/70 mb-6 leading-relaxed">Corporate information and project requirements</p>
                                <div className="flex flex-col gap-6">
                                    <input type="text" name="companyName" placeholder="Company Name*" required value={corporateFormData.companyName} onChange={handleCorporateChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    <select name="industry" required value={corporateFormData.industry} onChange={handleCorporateChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg">
                                        <option value="">Industry*</option>
                                        <option value="manufacturing">Manufacturing</option>
                                        <option value="it">IT/Technology</option>
                                        <option value="retail">Retail</option>
                                        <option value="hospitality">Hospitality</option>
                                        <option value="healthcare">Healthcare</option>
                                        <option value="education">Education</option>
                                        <option value="logistics">Logistics</option>
                                        <option value="other">Other</option>
                                    </select>
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <select name="projectType" required value={corporateFormData.projectType} onChange={handleCorporateChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg">
                                            <option value="">Project Type*</option>
                                            <option value="office">Office Building</option>
                                            <option value="warehouse">Warehouse</option>
                                            <option value="factory">Factory/Plant</option>
                                            <option value="retail">Retail Space</option>
                                            <option value="hotel">Hotel/Resort</option>
                                            <option value="mixed">Mixed Use</option>
                                        </select>
                                        <select name="projectScale" required value={corporateFormData.projectScale} onChange={handleCorporateChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg">
                                            <option value="">Project Scale*</option>
                                            <option value="small">Small (&lt;5000 sqft)</option>
                                            <option value="medium">Medium (5000-20000 sqft)</option>
                                            <option value="large">Large (20000-50000 sqft)</option>
                                            <option value="xlarge">Extra Large (&gt;50000 sqft)</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <input type="text" name="gstNumber" placeholder="GST Number (Optional)" value={corporateFormData.gstNumber} onChange={handleCorporateChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                        <input type="text" name="cinNumber" placeholder="CIN Number (Optional)" value={corporateFormData.cinNumber} onChange={handleCorporateChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    </div>
                                    <input type="text" name="timeline" placeholder="Expected Timeline*" required value={corporateFormData.timeline} onChange={handleCorporateChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white text-base md:text-lg" />
                                    <textarea rows={5} name="message" placeholder="Project requirements and expectations (Optional)" value={corporateFormData.message} onChange={handleCorporateChange} className="px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-2xl outline-primary focus:outline bg-transparent text-black dark:text-white text-base md:text-lg"></textarea>
                                </div>
                            </div>
                            <div className="mb-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                <div className="flex items-start gap-3">
                                    <Icon icon={"ph:info-fill"} width={20} height={20} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-blue-900 dark:text-blue-300">
                                        <strong>Corporate Account:</strong> Access dedicated dashboard to track project proposals, contracts, and B2B collaboration status.
                                    </p>
                                </div>
                            </div>
                            <div className="mb-6 flex items-start gap-3">
                                <input type="checkbox" id="terms-corp" required className="mt-1" />
                                <label htmlFor="terms-corp" className="text-sm text-black/70 dark:text-white/70">
                                    I am authorized to represent the company and agree to partnership terms. *
                                </label>
                            </div>
                            <button type="submit" className="px-8 py-4 rounded-full bg-primary text-white text-base font-semibold w-full mobile:w-fit hover:bg-dark duration-300 flex items-center justify-center gap-2 group">
                                Submit Partnership Application
                                <Icon icon={"ph:arrow-right"} width={20} height={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    )}
                    
                </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-20">
                <div className="text-center mb-12">
                    <div className="flex gap-2.5 items-center justify-center mb-4">
                        <Icon icon={"ph:question-fill"} width={24} height={24} className="text-primary" />
                        <p className="text-base md:text-lg font-bold text-badge dark:text-white/90">Partnership FAQ</p>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-52 font-bold tracking-tight text-black dark:text-white mb-4 leading-tight px-4">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="max-w-4xl mx-auto space-y-4">
                    {faqData.map((faq, index) => (
                        <div 
                            key={index} 
                            className="border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden bg-white dark:bg-dark hover:border-primary/30 transition-all duration-300"
                        >
                            <button
                                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                            >
                                <h3 className="text-base md:text-lg lg:text-xl font-bold text-black dark:text-white pr-4 leading-snug">
                                    {faq.question}
                                </h3>
                                <Icon 
                                    icon={expandedFaq === index ? "ph:minus-circle-fill" : "ph:plus-circle-fill"} 
                                    width={24} 
                                    height={24} 
                                    className="text-primary flex-shrink-0"
                                />
                            </button>
                            {expandedFaq === index && (
                                <div className="px-6 pb-5">
                                    <p className="text-sm md:text-base text-black/70 dark:text-white/70 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm text-black/60 dark:text-white/60 mb-4">
                        Have more questions about partnerships?
                    </p>
                    <a 
                        href="mailto:info@walldotbuilders.com" 
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/5 dark:bg-white/5 text-black dark:text-white hover:bg-primary hover:text-white transition-colors duration-300"
                    >
                        <Icon icon={"ph:envelope-fill"} width={20} height={20} />
                        <span className="font-semibold">Contact Partnership Team</span>
                    </a>
                </div>
            </section>

            {/* Refer Individual Clients CTA */}
            <section>
                <div className="border-2 border-primary/30 rounded-2xl p-8 bg-gradient-to-br from-primary/5 to-transparent text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon icon={"ph:users-fill"} width={32} height={32} className="text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-black dark:text-white mb-3">
                        Want to Refer Individual Clients?
                    </h3>
                    <p className="text-base text-black/70 dark:text-white/70 mb-6 max-w-2xl mx-auto">
                        Looking to refer friends or family building their dream home? Check out our simple Refer a Friend program with cash rewards.
                    </p>
                    <a
                        href="/referrals"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-semibold hover:bg-dark transition-colors"
                    >
                        Go to Refer a Friend Program
                        <Icon icon={"ph:arrow-right"} width={20} height={20} />
                    </a>
                </div>
            </section>
        </div>
    );
}

