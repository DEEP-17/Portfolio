export async function sendChatMessage(message: string): Promise<{ response?: string; error?: string }> {
    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
  
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
  
      return await res.json();
    } catch (error) {
      throw new Error("Failed to connect to the server");
    }
  }