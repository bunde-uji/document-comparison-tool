import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
  dangerouslyAllowBrowser: true, // For client-side use
});

export interface SummaryResult {
  summary: string;
  keyChanges: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

export async function generateChangeSummary(
  oldText: string,
  newText: string
): Promise<SummaryResult> {
  try {
    const prompt = `You are a legal document analyst. Compare these two versions of a document and provide:

1. A brief summary (2-3 sentences) of the main changes
2. A list of 3-5 key specific changes
3. An overall risk assessment (low/medium/high) based on how significant the changes are

OLD VERSION:
${oldText.substring(0, 3000)}

NEW VERSION:
${newText.substring(0, 3000)}

Respond in JSON format:
{
  "summary": "Brief overview of changes",
  "keyChanges": ["Change 1", "Change 2", "Change 3"],
  "riskLevel": "low" or "medium" or "high"
}`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'openai/gpt-oss-safeguard-20b',
      // model: 'llama-3.3-70b-versatile',
      temperature: 0.3,
      max_tokens: 1000,
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from AI');
    }

    const result = JSON.parse(content) as SummaryResult;
    return result;
  } catch (error) {
    console.error('Error generating AI summary:', error);
    throw new Error('Failed to generate AI summary. Please try again.');
  }
}