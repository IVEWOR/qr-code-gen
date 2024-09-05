import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        return NextResponse.redirect(new URL('/api/auth/signin', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/qr-codes/:path*', "/dashboard/:path*"],
};
