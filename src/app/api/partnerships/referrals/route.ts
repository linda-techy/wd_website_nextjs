import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware to verify JWT token
async function verifyToken(request: NextRequest) {
    const token = request.cookies.get('partner_token')?.value;

    if (!token) {
        return null;
    }

    try {
        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(JWT_SECRET)
        );
        return payload;
    } catch (error) {
        return null;
    }
}

// GET - Fetch partner's referrals
export async function GET(request: NextRequest) {
    try {
        const partner = await verifyToken(request);

        if (!partner) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        // TODO: Query database to get partner's referrals
        // For demo, return mock data
        const referrals = await getPartnerReferrals(partner.partnerId as string);

        return NextResponse.json({
            success: true,
            data: referrals,
        });
    } catch (error) {
        console.error('Fetch referrals error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST - Submit new referral
export async function POST(request: NextRequest) {
    try {
        const partner = await verifyToken(request);

        if (!partner) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { clientName, clientEmail, clientPhone, projectType, estimatedBudget, location, notes } = body;

        // Validate input
        if (!clientName || !clientEmail || !clientPhone || !projectType || !estimatedBudget) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 }
            );
        }

        // TODO: Insert into database
        const newReferral = await createReferral({
            partnerId: partner.partnerId as string,
            clientName,
            clientEmail,
            clientPhone,
            projectType,
            estimatedBudget,
            location,
            notes,
        });

        return NextResponse.json({
            success: true,
            message: 'Referral submitted successfully',
            data: newReferral,
        });
    } catch (error) {
        console.error('Create referral error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Demo function - Replace with actual database query
async function getPartnerReferrals(partnerId: string) {
    // TODO: Query database
    return [
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
    ];
}

// Demo function - Replace with actual database insert
async function createReferral(data: any) {
    // TODO: Insert into database
    return {
        id: `REF${Date.now()}`,
        ...data,
        submittedDate: new Date().toISOString().split('T')[0],
        status: "pending",
        commission: "Calculating...",
        commissionStatus: "pending"
    };
}

