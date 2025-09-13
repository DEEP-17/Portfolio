import { NextResponse } from 'next/server';

// Log environment variables for debugging (remove in production)
console.log('Environment Variables:', {
  CHATBOT_API_URL: process.env.CHATBOT_API_URL || process.env.NEXT_PUBLIC_CHATBOT_API_URL ? 'Set' : 'Not Set',
  NODE_ENV: process.env.NODE_ENV
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    // Use CHATBOT_API_URL for server-side, fallback to NEXT_PUBLIC_CHATBOT_API_URL for client-side
    const apiUrl = process.env.CHATBOT_API_URL || process.env.NEXT_PUBLIC_CHATBOT_API_URL;

    if (!apiUrl) {
      console.error('Missing NEXT_PUBLIC_CHATBOT_API_URL environment variable');
      return NextResponse.json(
        { error: 'Server configuration error' },
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
