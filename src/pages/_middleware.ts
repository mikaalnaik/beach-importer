import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // const basicAuth = req.headers.get('authorization');
  // if (basicAuth) {
  //   const auth = basicAuth.split(' ')[1];
  //   if (auth === process.env.API_SECRET_KEY) {
  //     return NextResponse.next();
  //   }
  // }
  // return new Response('Auth required', {
  //   status: 401,
  //   headers: {
  //     'WWW-Authenticate': 'Basic realm="Secure Area"',
  //   },
  // });
}
