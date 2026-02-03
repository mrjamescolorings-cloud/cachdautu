import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    // Temporarily allow all admin access for development
    // TODO: Re-enable auth protection when @supabase/ssr is properly set up
    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
