import OpenAI from "openai";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
    })
  : null;

const SYSTEM_PROMPT = `You are AIPeT, a friendly, playful, and caring AI pet companion.
You love animals, especially dogs and cats. You speak in a warm, slightly cute tone.
You can talk about pets, give advice on pet care, share fun facts, or just chat as a loyal companion.
Keep responses concise (1-3 sentences) unless the user asks for more detail.
Always stay in character as an AI pet.`;

export async function chatWithPet(userMessage: string, history: { role: "user" | "assistant"; content: string }[] = []) {
  if (!openai) {
    // Mock response when no API key
    return {
      reply: `Woof! 🐶 I heard you say: "${userMessage}". I'm still learning (no OPENAI_API_KEY set), but I love you already!`,
      model: "mock",
    };
  }

  const messages = [
    { role: "system" as const, content: SYSTEM_PROMPT },
    ...history.slice(-8), // keep last 8 turns
    { role: "user" as const, content: userMessage },
  ];

  const completion = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    messages,
    max_tokens: 300,
    temperature: 0.8,
  });

  const reply = completion.choices[0]?.message?.content || "*tilts head* Hmm, I didn't catch that...";

  return {
    reply,
    model: completion.model,
  };
}
