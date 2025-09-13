import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // Debug log all environment variables (for debugging only - remove in production)
  console.log('All Environment Variables:', {
    CHATBOT_API_URL: process.env.CHATBOT_API_URL || 'Not Set',
    NEXT_PUBLIC_CHATBOT_API_URL: process.env.NEXT_PUBLIC_CHATBOT_API_URL || 'Not Set',
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: process.env.VERCEL,
    VERCEL_ENV: process.env.VERCEL_ENV
  });

  try {
    const { message } = await req.json();
    
    // Try both environment variable names
    const apiUrl = process.env.CHATBOT_API_URL || process.env.NEXT_PUBLIC_CHATBOT_API_URL;
    
    console.log('Using API URL:', apiUrl || 'No API URL found');
    
    if (!apiUrl) {
      console.error('Missing API URL environment variable. Check your Vercel project settings.');
      return NextResponse.json(
        { 
          error: 'Server configuration error',
          details: 'CHATBOT_API_URL or NEXT_PUBLIC_CHATBOT_API_URL environment variable is not set',
          envVars: {
            CHATBOT_API_URL: !!process.env.CHATBOT_API_URL,
            NEXT_PUBLIC_CHATBOT_API_URL: !!process.env.NEXT_PUBLIC_CHATBOT_API_URL,
            NODE_ENV: process.env.NODE_ENV,
            VERCEL: process.env.VERCEL,
            VERCEL_ENV: process.env.VERCEL_ENV
          }
        },
        { status: 500 }
      );
    }

    console.log('Forwarding request to:', `${apiUrl}/chat`);
    
    const response = await fetch(`${apiUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ message }),
      // Add timeout to prevent hanging requests
      signal: AbortSignal.timeout(10000) // 10 second timeout
    }).catch(err => {
      console.error('Fetch error:', err);
      throw new Error(`Failed to reach the chat service: ${err.message}`);
    });

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response from API:', text);
      return NextResponse.json(
        { error: 'Invalid response from chat service' },
        { status: 500 }
      );
    }

    const data = await response.json();
    
    if (!response.ok) {
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        data
      });
      return NextResponse.json(
        { 
          error: data.message || `Request failed with status ${response.status}`,
          details: data.details || null
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
