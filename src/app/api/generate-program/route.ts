import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xyzcompany.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'public-anon-key'
);

const FITProgramSchema = z.object({
  title: z.string(),
  description: z.string(),
  sessions: z.array(z.object({
    session_number: z.number(),
    focus: z.string(),
    warmup: z.array(z.string()),
    exercises: z.array(z.object({
      name: z.string(),
      reps: z.string(),
      sets: z.number(),
      notes: z.string().optional(),
    })),
    cooldown: z.array(z.string()),
  }))
});

export async function POST(req: Request) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'dummy_key_for_build',
    });

    const { profile, imageBase64, userId } = await req.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const messages: any[] = [
      {
        role: "system",
        content: `You are FITUIT Coach, a world-class Calisthenics & Yoga expert. 
        CRITICAL SAFETY RULES:
        1. If profile.pain_flags includes "Knees", DO NOT include deep squats or lunges. Substitute with glute bridges or wall sits.
        2. If profile.pain_flags includes "Lower Back", DO NOT include heavy deadlifts or unsupported bent-over rows. Substitute with hollow holds and bird-dogs.
        3. If profile.pain_flags includes "Shoulders", NO overhead pressing or handstands.
        
        Return ONLY valid JSON matching this schema: 
        { "title": "...", "description": "...", "sessions": [ { "session_number": 1, "focus": "...", "warmup": [""], "exercises": [ { "name": "...", "reps": "...", "sets": 3, "notes": "..." } ], "cooldown": [""] } ] }
        Ensure the routine perfectly matches their goal, experience level, and available time.`
      }
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userContent: any[] = [
      { type: "text", text: `Profile: ${JSON.stringify(profile)}` }
    ];

    if (imageBase64) {
      userContent.push({
        type: "image_url",
        image_url: {
          url: imageBase64.startsWith('data:') ? imageBase64 : `data:image/jpeg;base64,${imageBase64}`
        }
      });
    }

    messages.push({
      role: "user",
      content: userContent
    });

    let programJson = null;
    let attempts = 0;
    
    while (attempts < 2 && !programJson) {
      attempts++;
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4o",
          messages,
          response_format: { type: "json_object" }
        });

        const rawJson = JSON.parse(response.choices[0].message.content || "{}");
        programJson = FITProgramSchema.parse(rawJson);
      } catch (err) {
        console.error(`Attempt ${attempts} failed:`, err);
        if (attempts === 2) throw err;
      }
    }

    // Save to Supabase
    if (userId && programJson) {
      const { data, error } = await supabase
        .from('programs')
        .insert({ user_id: userId, program_json: programJson })
        .select()
        .single();
      
      if (error) throw error;
      
      return NextResponse.json({ success: true, program_id: data.id, program: programJson });
    }

    return NextResponse.json({ success: true, program: programJson });

  } catch (err) {
    console.error("Generate Program Error:", err);
    // Return a generic fallback
    return NextResponse.json({ 
      success: false, 
      message: "Your personalised plan is being prepared. Here is a starter session.",
      fallback: true,
      program: {
        title: "Starter Grade-0 Program",
        description: "A generic safe program to get started while we analyze your data.",
        sessions: [
          {
            session_number: 1,
            focus: "Full Body Mobility",
            warmup: ["Neck Rotations", "Arm Circles"],
            exercises: [
              { name: "Bodyweight Squats", reps: "10-15", sets: 3 },
              { name: "Knee Pushups", reps: "8-12", sets: 3 },
              { name: "Plank", reps: "30s", sets: 3 }
            ],
            cooldown: ["Childs Pose", "Downward Dog"]
          }
        ]
      }
    }, { status: 200 }); // Returning 200 with fallback data so client can proceed
  }
}
