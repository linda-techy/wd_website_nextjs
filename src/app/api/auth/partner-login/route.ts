import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { phone, password } = body;

        // Validate input
        if (!phone || !password) {
            return NextResponse.json(
                { success: false, message: 'Phone number and password are required' },
                { status: 400 }
            );
        }

        // TODO: Replace with actual database query
        // This is a demo implementation
        // In production, verify against database with hashed password
        const isValidCredentials = await validatePartnerCredentials(phone, password);

        if (!isValidCredentials) {
            return NextResponse.json(
                { success: false, message: 'Invalid phone number or password' },
                { status: 401 }
            );
        }

        // Get partner details from database
        const partnerData = await getPartnerByPhone(phone);

        // Create JWT token
        const token = await new SignJWT({
            partnerId: partnerData.id,
            phone: partnerData.phone,
            name: partnerData.name,
            partnershipType: partnerData.partnershipType,
            role: 'partner',
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('7d') // Token expires in 7 days
            .sign(new TextEncoder().encode(JWT_SECRET));

        // Create response with token
        const response = NextResponse.json({
            success: true,
            message: 'Login successful',
            data: {
                partnerId: partnerData.id,
                name: partnerData.name,
                phone: partnerData.phone,
                email: partnerData.email,
                partnershipType: partnerData.partnershipType,
                firmName: partnerData.firmName,
            },
        });

        // Set HTTP-only cookie with JWT
        response.cookies.set('partner_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Demo function - Replace with actual database query
async function validatePartnerCredentials(phone: string, password: string): Promise<boolean> {
    // TODO: Query database to validate credentials
    // Compare hashed password using bcrypt
    // For demo, accept any credentials
    return true;
}

// Demo function - Replace with actual database query
async function getPartnerByPhone(phone: string) {
    // TODO: Query database to get partner details
    // For demo, return mock data
    return {
        id: 'PARTNER001',
        name: 'Demo Partner',
        phone: phone,
        email: 'partner@example.com',
        partnershipType: 'architectural',
        firmName: 'Demo Firm',
    };
}

