export async function sendChatMessage(message: string): Promise<{ response?: string; error?: string }> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('API Error:', {
        status: response.status,
        error: data.error
      });
      return { error: data.error || 'Request failed' };
    }

    return data;
  } catch (error) {
    console.error('Fetch Error:', error);
    return {
      error: error instanceof Error ? error.message : 'Failed to connect to the server'
    };
  }
}