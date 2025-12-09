import { jwtVerify, SignJWT } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const secret = new TextEncoder().encode(JWT_SECRET);

export interface JWTPayload {
    partnerId: string;
    phone: string;
    name: string;
    partnershipType: string;
    role: string;
}

// Generate JWT token
export async function generateToken(payload: JWTPayload): Promise<string> {
    const token = await new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(secret);

    return token;
}

// Verify JWT token
export async function verifyToken(token: string): Promise<JWTPayload | null> {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload as unknown as JWTPayload;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}

// Hash password (for registration)
export async function hashPassword(password: string): Promise<string> {
    // In production, use bcrypt or similar
    // For now, simple implementation (REPLACE IN PRODUCTION)
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Verify password (for login)
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    const inputHash = await hashPassword(password);
    return inputHash === hashedPassword;
}

// Parse JWT from cookie
export function getTokenFromCookie(cookieString: string | undefined): string | null {
    if (!cookieString) return null;
    
    const match = cookieString.match(/partner_token=([^;]+)/);
    return match ? match[1] : null;
}

