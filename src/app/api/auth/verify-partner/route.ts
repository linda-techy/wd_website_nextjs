import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function GET(request: NextRequest) {
    try {
        // Get token from cookie
        const token = request.cookies.get('partner_token')?.value;

        if (!token) {
            return NextResponse.json(
                { success: false, message: 'Not authenticated' },
                { status: 401 }
            );
        }

        // Verify JWT token
        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(JWT_SECRET)
        );

        // Return partner data
        return NextResponse.json({
            success: true,
            data: {
                partnerId: payload.partnerId,
                name: payload.name,
                phone: payload.phone,
                partnershipType: payload.partnershipType,
            },
        });
    } catch (error) {
        console.error('Token verification error:', error);
        return NextResponse.json(
            { success: false, message: 'Invalid or expired token' },
            { status: 401 }
        );
    }
}

