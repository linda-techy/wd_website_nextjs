// API configuration for partnership authentication
import { BASE_API_URL } from './config';

const API_BASE = BASE_API_URL || 'http://localhost:8080';

export interface PartnerLoginRequest {
    email: string;
    password: string;
}

export interface PartnerLoginResponse {
    token: string;
    partnerId: string;
    name: string;
    phone: string;
    email: string;
    partnershipType: string;
    firmName: string;
    status: string;
}

export interface PartnershipApplicationRequest {
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    designation?: string;
    partnershipType: string;
    password: string;
    
    // Business fields (conditional based on type)
    firmName?: string;
    companyName?: string;
    gstNumber?: string;
    licenseNumber?: string;
    reraNumber?: string;
    cinNumber?: string;
    ifscCode?: string;
    employeeId?: string;
    
    // Professional details
    experience?: number;
    specialization?: string;
    portfolioLink?: string;
    certifications?: string;
    
    // Operational details
    areaOfOperation?: string;
    areasCovered?: string;
    landTypes?: string;
    materialsSupplied?: string;
    businessSize?: string;
    location?: string;
    industry?: string;
    projectType?: string;
    projectScale?: string;
    timeline?: string;
    yearsOfPractice?: number;
    areaServed?: string;
    businessName?: string;
    
    // Additional
    additionalContact?: string;
    message?: string;
}

export interface PartnershipReferralRequest {
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    clientWhatsapp?: string;
    customerType?: string;
    projectType: string;
    projectDescription?: string;
    estimatedBudget?: number;
    projectSqftArea?: number;
    location?: string;
    state?: string;
    district?: string;
    address?: string;
    requirements?: string;
    notes?: string;
    priority?: string;
    assignedTeam?: string;
    dateOfEnquiry?: string;
    clientRating?: number;
    probabilityToWin?: number;
    nextFollowUp?: string;
    lastContactDate?: string;
}

class PartnershipAPI {
    private getAuthHeader(): Record<string, string> {
        const token = typeof window !== 'undefined' ? localStorage.getItem('partnerToken') : null;
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    }

    async login(credentials: PartnerLoginRequest): Promise<PartnerLoginResponse> {
        const response = await fetch(`${API_BASE}/api/partnerships/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Login failed');
        }

        return response.json();
    }

    async submitApplication(data: PartnershipApplicationRequest): Promise<any> {
        const response = await fetch(`${API_BASE}/api/partnerships/apply`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Application submission failed');
        }

        return response.json();
    }

    async logout(): Promise<void> {
        const response = await fetch(`${API_BASE}/api/partnerships/logout`, {
            method: 'POST',
            headers: {
                ...this.getAuthHeader(),
            },
        });

        if (!response.ok) {
            throw new Error('Logout failed');
        }

        // Clear local storage
        if (typeof window !== 'undefined') {
            localStorage.removeItem('partnerToken');
            localStorage.removeItem('partnerInfo');
        }
    }

    async getStats(): Promise<any> {
        const response = await fetch(`${API_BASE}/api/partnerships/stats`, {
            method: 'GET',
            headers: {
                ...this.getAuthHeader(),
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to fetch stats');
        }

        return response.json();
    }

    async getReferrals(): Promise<any[]> {
        const response = await fetch(`${API_BASE}/api/partnerships/referrals`, {
            method: 'GET',
            headers: {
                ...this.getAuthHeader(),
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to fetch referrals');
        }

        return response.json();
    }

    async submitReferral(referralData: any): Promise<any> {
        const response = await fetch(`${API_BASE}/api/partnerships/referrals`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...this.getAuthHeader(),
            },
            body: JSON.stringify(referralData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to submit referral');
        }

        return response.json();
    }

    async forgotPassword(email: string): Promise<void> {
        const response = await fetch(`${API_BASE}/api/partnerships/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to send reset email');
        }
    }

    async resetPassword(email: string, token: string, newPassword: string): Promise<void> {
        const response = await fetch(`${API_BASE}/api/partnerships/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, token, newPassword }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to reset password');
        }
    }

    /**
     * For referred_client type: returns the status of their own inquiry lead.
     * Shows them where they are in the pipeline (contacted, qualified, etc.)
     */
    async getMyInquiry(): Promise<any> {
        const response = await fetch(`${API_BASE}/api/partnerships/my-inquiry`, {
            method: 'GET',
            headers: { ...this.getAuthHeader() },
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to fetch inquiry status');
        }
        return response.json();
    }

    async submitReferralAsLead(referralData: PartnershipReferralRequest): Promise<any> {
        const response = await fetch(`${API_BASE}/api/partnerships/referrals/lead`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...this.getAuthHeader(),
            },
            body: JSON.stringify(referralData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to submit referral as lead');
        }

        return response.json();
    }
}

export const partnershipAPI = new PartnershipAPI();

