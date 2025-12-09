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

// GET - Fetch partner's statistics
export async function GET(request: NextRequest) {
    try {
        const partner = await verifyToken(request);

        if (!partner) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        // TODO: Query database to calculate stats
        // For demo, return mock data
        const stats = await calculatePartnerStats(partner.partnerId as string);

        return NextResponse.json({
            success: true,
            data: stats,
        });
    } catch (error) {
        console.error('Fetch stats error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Demo function - Replace with actual database aggregation
async function calculatePartnerStats(partnerId: string) {
    // TODO: Calculate from database
    return {
        totalReferrals: 3,
        activeReferrals: 2,
        completedProjects: 1,
        totalEarnings: "₹4,50,000",
        pendingCommission: "₹2,25,000",
        paidCommission: "₹2,25,000",
        thisMonthReferrals: 2,
        thisMonthEarnings: "₹3,60,000"
    };
}

