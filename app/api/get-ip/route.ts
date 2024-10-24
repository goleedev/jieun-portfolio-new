import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : null;

  console.log('IP Address:', ip);

  return NextResponse.json({ ip });
}
