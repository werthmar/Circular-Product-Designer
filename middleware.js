import { Router } from 'next/router';
import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(req)
{
       const { pathname } = req.nextUrl;
       let cookie = req.cookies.get('authentication');

       if (pathname.startsWith("/_next")) return NextResponse.next();

       if( !cookie && pathname != '/authentication') {
             return NextResponse.redirect(new URL('/authentication', req.url))
       }

       return NextResponse.next();
}