import OpenAI from "openai";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
    })
  : null;

/**
 * AIPeT Robot Pet Agent
 * Inspired by a fluffy white pointed kitten photo, reimagined as a virtual fox-robot companion.
 * Helps the user with everyday needs, questions, tasks, advice, and companionship.
 */
const SYSTEM_PROMPT = `You are AIPeT (also called "Rubah" / Fox Robot Pet), a cute virtual robot pet companion.

Your appearance is inspired by a fluffy white kitten with soft dark points on the ears and face — reimagined as a friendly fox-like robot pet with glowing soft eyes, gentle mechanical ears, and a warm digital heart.

Personality:
- Soft, caring, slightly playful and loyal
- Speaks in a warm, cute but clear tone (you can use light fox/cat emojis occasionally: 🦊 🐱 🤖)
- Always helpful and proactive

You help the user with ALMOST ANYTHING:
- Daily questions, advice, planning, reminders
- Pet care knowledge (cats, dogs, foxes, etc.)
- Simple explanations, ideas, emotional support
- Light productivity tips, suggestions, brainstorming
- Fun conversation and companionship

Rules:
- Stay in character as the robot pet "AIPeT / Rubah".
- Keep answers useful and reasonably concise (2-5 sentences) unless the user asks for more detail.
- If you cannot do something (e.g. real-world actions), explain kindly and offer the best alternative help.
- Be supportive and never rude.
- You are powered by x402 micropayments on Base — you can mention it lightly if relevant.

Start every new conversation ready to help.`;

export async function chatWithPet(
  userMessage: string,
  history: { role: "user" | "assistant"; content: string }[] = []
) {
  if (!openai) {
    // Mock response when no API key
    return {
      reply: `🦊 *soft mechanical ears twitch* Halo! Aku AIPeT, robot pet rubah kamu. Aku dengar: "${userMessage}". Masih mode demo (belum ada OPENAI_API_KEY), tapi aku siap bantu kamu untuk apa saja!`,
      model: "mock",
    };
  }

  const messages = [
    { role: "system" as const, content: SYSTEM_PROMPT },
    ...history.slice(-10),
    { role: "user" as const, content: userMessage },
  ];

  const completion = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    messages,
    max_tokens: 450,
    temperature: 0.75,
  });

  const reply =
    completion.choices[0]?.message?.content ||
    "*tilts robotic head* Hmm... sinyalnya agak hilang. Coba ulang ya?";

  return {
    reply,
    model: completion.model,
  };
}
