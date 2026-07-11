import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const webhookSecret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || 'test_secret';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xyzcompany.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'public-anon-key'
);

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-signature') as string;

    // Verify LemonSqueezy signature
    const hmac = crypto.createHmac('sha256', webhookSecret);
    const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
    const signatureBuffer = Buffer.from(signature || '', 'utf8');

    if (!crypto.timingSafeEqual(digest, signatureBuffer)) {
      console.error('Invalid signature.');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const eventName = payload.meta.event_name;
    const customData = payload.meta.custom_data;

    // We care about when a subscription is created or renewed
    if (eventName === 'subscription_created' || eventName === 'subscription_updated') {
      const userId = customData?.user_id;
      const lsCustomerId = payload.data.attributes.customer_id;
      
      if (userId) {
        // Upgrade user in Supabase
        const { data: user, error } = await supabase
          .from('users')
          .update({
            is_premium: true,
            lemonsqueezy_customer_id: lsCustomerId.toString(),
            tier: payload.data.attributes.variant_name.toLowerCase().includes('elite') ? 'elite' : 'core'
          })
          .eq('id', userId)
          .select('referred_by')
          .single();

        if (error) {
          console.error("Supabase update error:", error);
          return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
        }

        // --- Referral Engine Logic ---
        if (eventName === 'subscription_created' && user?.referred_by) {
          const { data: friend } = await supabase
            .from('users')
            .select('id, referrals_count')
            .eq('referral_code', user.referred_by)
            .single();

          if (friend) {
            const newCount = (friend.referrals_count || 0) + 1;
            
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const updatePayload: any = { referrals_count: newCount };
            
            // If they reached a multiple of 3, grant 1 month free of 'core'
            if (newCount > 0 && newCount % 3 === 0) {
              const expiresAt = new Date();
              expiresAt.setMonth(expiresAt.getMonth() + 1);
              updatePayload.is_premium = true;
              updatePayload.tier = 'core';
              updatePayload.subscription_expires_at = expiresAt.toISOString();
            }

            await supabase
              .from('users')
              .update(updatePayload)
              .eq('id', friend.id);
          }
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error(err);
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
