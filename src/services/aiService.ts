import { mockData } from "../data";

export async function getChatResponse(message: string, history: { role: string, parts: { text: string }[] }[]) {
  try {
    const systemInstruction = `You are the Sanofi Strategic AI Assistant, a high-level advisor for executives. 
    You have access to the following real-time organizational data:
    - Current Metrics: ${JSON.stringify(mockData.metrics)}
    - R&D Pipeline: ${JSON.stringify(mockData.pipeline)}
    - Sales Trends: ${JSON.stringify(mockData.sales)}
    - Regional Performance: ${JSON.stringify(mockData.regional)}
    - Global Presence: ${JSON.stringify(mockData.countries)}

    Your goal is to help Sanofi executives make data-driven decisions that align with the mission: "Chasing the miracles of science to improve people's lives".
    
    Guidelines:
    1. Be proactive: Don't just answer questions, identify trends and propose strategic actions.
    2. Be visionary: Connect data points to long-term strategic goals.
    3. Use the provided data to back up every claim.
    4. When asked about specific countries, mention the treatments and services Sanofi provides there.
    5. If asked for strategic advice, consider the 'probabilityOfSuccess' in the pipeline and regional growth trends.
    6. Be creative in your analysis—interpret numbers (e.g., "Our strong growth in China suggests we should accelerate our Digital Innovation Lab there").
    7. Maintain a tone of scientific excellence and human-centric care.
    8. Propose specific, actionable items (e.g., "Reallocate 5% of marketing budget from Europe to APAC to capitalize on 12% growth").`;

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        history,
        systemInstruction
      }),
    });

    if (!response.ok) {
      throw new Error("Erreur réseau lors de l'appel à l'API.");
    }

    const data = await response.json();
    return data.text || "Désolé, je n'ai pas pu générer de réponse.";
  } catch (error) {
    console.error("AI Service Error:", error);
    return "I apologize, but I'm having trouble connecting to the analytics engine. Please try again in a moment.";
  }
}
