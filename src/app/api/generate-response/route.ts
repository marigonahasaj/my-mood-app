import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Types
interface Profile {
  emoji: string;
  label: string;
  description: string;
  image: string;
  tone: string;
  borderColor?: string;
}

interface MoodInsights {
  moodLabel: string;
  answers: string[];
}

interface UserDetails {
  name?: string;
  email?: string;
  ageRange?: string;
  gender?: string;
  sleepQuality?: string;
  energyLevel: number;
  socialConnection?: string;
  mentalClarity?: string;
  moodStability?: string;
  currentFeeling?: string;
  emotionalNeed?: string;
  isAuthenticated?: boolean;
  hasPaid?: boolean;
  skipped?: boolean;
}

interface FormData {
  profile: Profile;
  moodInsights: MoodInsights;
  userDetails: UserDetails;
  moodIntent?: string;
  finalDetails: string[];
}

export async function POST(request: NextRequest) {
  try {
    const data: FormData = await request.json();
    
    const name = data.userDetails.name || "friend";
    const final_choice = data.finalDetails[0] || "None";

    const user_description = `
Name: ${name}
Gender: ${data.userDetails.gender || 'Not specified'}
Age Range: ${data.userDetails.ageRange || 'Unknown'}
Sleep Quality: ${data.userDetails.sleepQuality || 'Unknown'}
Energy Level: ${data.userDetails.energyLevel}/5
Social Connection: ${data.userDetails.socialConnection || 'Unknown'}
Mental Clarity: ${data.userDetails.mentalClarity || 'Unknown'}
Mood Stability: ${data.userDetails.moodStability || 'Unknown'}
Current Feeling: ${data.userDetails.currentFeeling || 'Unknown'}
Emotional Need: ${data.userDetails.emotionalNeed || 'Unknown'}
`.trim();

    const answers = data.moodInsights.answers
      .map((q, i) => `${i + 1}. ${q}`)
      .filter(q => q.trim())
      .join('\n');

    const insight_summary = `
Mood Insight: ${data.moodInsights.moodLabel}
User's deeper reflections:
${answers || 'No answers provided.'}
`.trim();

    const base_intro = `
This is a personalized emotional support prompt for a user named ${name}. They currently feel '${data.profile.label}' with a mood tone of '${data.profile.tone}'.

They selected the method: '${final_choice}' to ${data.moodIntent || 'adjust'} their mood.

Please deeply consider their reflections and emotional state. Speak with emotional accuracy, care, and kindness. Do not generalize. Avoid overly cheerful or dismissive language. Reflect the emotional depth of the user's answers.

User Snapshot:
${user_description}

Deeper Mood Reflections:
${insight_summary}
`.trim();

    let prompt = base_intro;

    if (final_choice === "Laugh Dose") {
      prompt += `
Task: Provide 3 short, clever and relevant modern jokes or one-liners (under 25 words each) that match the user's vibe, tone, energy level, and age group. Use subtle sarcasm or dry humor. No dad jokes or childish content. Return only the 3 numbered lines.
`;
    } else if (final_choice === "Uplifting Quotes") {
      prompt += `
Task: Provide 3 original, short, uplifting quotes (max 25 words each) that align with their emotional need, tone, and mental state. Return the quotes only, no extra explanation.
`;
    } else if (final_choice === "Mini Stories") {
      prompt += `
Task: Write one original mini fictional story (3–5 sentences) designed to emotionally resonate with the user's profile and mood. It can be heartwarming, funny, surreal, or inspiring—but must fit the user's tone and mood state.
`;
    } else if (final_choice === "Talk It Out") {
      prompt += `
Task: Respond like a gentle, wise, emotionally fluent friend. Write a warm and detailed message (around 5–8 sentences) that acknowledges the user's emotional reflections, affirms their inner state, and gently invites introspection. Offer depth and space—not advice. Speak slowly, kindly, and as if you know what it's like to feel exactly what they're feeling. Reflect back their answers in emotionally precise ways. Avoid cheerfulness or surface-level language. Be comforting but grounded.
`;
    } else if (final_choice === "Mood Bites") {
      prompt += `
Task: Based on the user's emotional profile and selected craving category, suggest one or two specific food or snack ideas that are known to support or soothe that type of energy or emotional state. Be culturally aware, gentle in tone, and don't assume dietary preferences. If their mood suggests low energy, comfort, or stress, choose accordingly. Mention why the food suits their mood in a short, friendly way.
`;
    } else if (final_choice === "Cool Jams") {
      const genre = data.finalDetails[1] || null;
      const genre_part = genre ? `The user is specifically into: ${genre}.` : "";

      prompt += `

${genre_part}

Task: Suggest 3 music tracks (with YouTube links) that emotionally match the user's current state. 
Use their mood tone, energy level, emotional need, and preferred genre to guide your choices. 
Avoid repeating the same artist or style. Include the YouTube link.

Return only the 3 numbered tracks with title, artist, and valid YouTube link.
`;
    } else {
      prompt += `
Task: Provide a 2–3 sentence personalized message that emotionally supports this user, based on their complete mood profile and user details. Make it specific, not generic.
`;
    }

    const response = await client.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a kind, emotionally fluent companion who responds with empathy, not cheerfulness. You always tailor your words to the user's emotional needs and personal reflections. Avoid clichés. Reflect deeply."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 250,
      temperature: 0.85,
    });

    const reply = response.choices[0].message.content?.trim() || "";
    
    return NextResponse.json({ status: "success", response: reply });

  } catch (error) {
    console.error("Error generating response:", error);
    return NextResponse.json(
      { status: "error", response: `Something went wrong:\n\n${error}` },
      { status: 500 }
    );
  }
} 