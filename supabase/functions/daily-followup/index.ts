import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"
import { Resend } from "https://esm.sh/resend@1.0.0"

const resend = new Resend(Deno.env.get("RESEND_API_KEY"))
const twilioAccountSid = Deno.env.get("TWILIO_ACCOUNT_SID")
const twilioAuthToken = Deno.env.get("TWILIO_AUTH_TOKEN")
const twilioPhoneNumber = Deno.env.get("TWILIO_PHONE_NUMBER")

const CHECKOUT_URL = "https://fituit.app/paywall" // Replace with actual checkout link

serve(async (req) => {
  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    )

    // Fetch ALL users to segment them
    const { data: users, error } = await supabaseClient
      .from("users")
      .select("*")

    if (error) throw error

    let premiumCount = 0;
    let freeCount = 0;

    for (const user of users) {
      const phone = user.phone || null; 
      
      if (user.is_premium) {
        // COHORT A: PREMIUM USERS
        premiumCount++;
        const sessionName = "Session 13: Core Integrity";
        const topExercise = "Pike Pushups";
        const dietTip = "You're lagging on protein today. Consider some paneer or a protein shake.";
        
        // 1. Send Email via Resend
        if (user.email) {
          await resend.emails.send({
            from: 'Coach AI <coach@FITUIT.app>',
            to: user.email,
            subject: `Your FITUIT session for today, ${user.full_name || 'Athlete'}`,
            html: `
              <h2>Good Morning ${user.full_name || ''}!</h2>
              <p>Today's session is <strong>${sessionName}</strong>. Be ready for some ${topExercise}.</p>
              <p><strong>Diet Tip:</strong> ${dietTip}</p>
              <p>Stay strong,</p>
              <p>FITUIT Coach AI</p>
            `
          });
        }

        // 2. Send WhatsApp via Twilio
        if (phone) {
          const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`;
          const twilioBody = new URLSearchParams({
            To: `whatsapp:${phone}`,
            From: `whatsapp:${twilioPhoneNumber}`,
            Body: `Hey ${user.full_name || 'Athlete'}! 🚀 Time for ${sessionName}. Let's get it!`
          });
          
          await fetch(twilioUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Basic ' + btoa(`${twilioAccountSid}:${twilioAuthToken}`)
            },
            body: twilioBody.toString()
          });
        }
      } else {
        // COHORT B: FREE USERS (Abandoned Checkout)
        freeCount++;
        
        // Send WhatsApp Marketing message via Twilio
        if (phone) {
          const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`;
          const twilioBody = new URLSearchParams({
            To: `whatsapp:${phone}`,
            From: `whatsapp:${twilioPhoneNumber}`,
            Body: `Hey ${user.full_name || 'Athlete'}! Your AI Coach noticed you haven't started your personalized FITUIT program yet. Don't let your goals slip away. Upgrade to Elite today and let's get to work: ${CHECKOUT_URL}`
          });
          
          await fetch(twilioUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Basic ' + btoa(`${twilioAccountSid}:${twilioAuthToken}`)
            },
            body: twilioBody.toString()
          });
        }
      }
    }

    return new Response(JSON.stringify({ success: true, premium_messaged: premiumCount, free_messaged: freeCount }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    })
  }
})
