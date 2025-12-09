import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function authMiddleware(request: NextRequest) {
    const token = request.cookies.get('partner_token')?.value;

    if (!token) {
        return NextResponse.json(
            { success: false, message: 'Authentication required' },
            { status: 401 }
        );
    }

    const payload = await verifyToken(token);

    if (!payload) {
        return NextResponse.json(
            { success: false, message: 'Invalid or expired token' },
            { status: 401 }
        );
    }

    // Add partner data to request headers for downstream use
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-partner-id', payload.partnerId);
    requestHeaders.set('x-partner-phone', payload.phone);
    requestHeaders.set('x-partner-type', payload.partnershipType);

    return { partner: payload, headers: requestHeaders };
}

