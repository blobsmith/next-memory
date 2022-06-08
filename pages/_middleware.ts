import { NextResponse, NextRequest } from 'next/server'

export async function middleware(req, ev) {
    const { pathname } = req.nextUrl

    // Redirect / to /accueil
    if (pathname == '/') {
        const url = req.nextUrl.clone()
        url.pathname = '/accueil'
        return NextResponse.redirect(url)
    }
    return NextResponse.next()
}