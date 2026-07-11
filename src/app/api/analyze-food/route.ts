import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';


const FoodAnalysisSchema = z.object({
  name: z.string(),
  total_kcal: z.number(),
  protein_g: z.number(),
  carbs_g: z.number(),
  fat_g: z.number(),
  confidence: z.number().min(0).max(100),
  ai_tip: z.string(),
});

export async function POST(req: Request) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'dummy_key_for_build',
    });

    const { imageBase64 } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert nutritionist. Analyze the provided food image and estimate the macronutrients. 
          Return ONLY valid JSON matching this schema: 
          { "name": "...", "total_kcal": 0, "protein_g": 0, "carbs_g": 0, "fat_g": 0, "confidence": 95, "ai_tip": "..." }
          No prose.`
        },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: imageBase64.startsWith('data:') ? imageBase64 : `data:image/jpeg;base64,${imageBase64}`
              }
            }
          ]
        }
      ],
      response_format: { type: "json_object" }
    });

    const rawJson = JSON.parse(response.choices[0].message.content || "{}");
    const result = FoodAnalysisSchema.parse(rawJson);

    return NextResponse.json({ success: true, data: result });

  } catch (err) {
    console.error("Food Analysis Error:", err);
    return NextResponse.json({ success: false, error: "Failed to analyze image" }, { status: 500 });
  }
}
