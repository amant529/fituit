import { NextResponse } from 'next/server';
import { lemonSqueezySetup, createCheckout } from '@lemonsqueezy/lemonsqueezy.js';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  try {
    lemonSqueezySetup({ apiKey: process.env.LEMONSQUEEZY_API_KEY });
    const { tier, billing, discountCode } = await req.json();

    // The user needs to add these IDs to their .env.local after creating the products in LemonSqueezy
    const variantIds = {
      monthly: { 
        core: process.env.LS_CORE_MONTH_ID || '00000', 
        elite: process.env.LS_ELITE_MONTH_ID || '00000' 
      },
      yearly: { 
        core: process.env.LS_CORE_YEAR_ID || '00000', 
        elite: process.env.LS_ELITE_YEAR_ID || '00000' 
      }
    };

    const storeId = process.env.LEMONSQUEEZY_STORE_ID || '00000';
    const variantId = variantIds[billing as 'monthly' | 'yearly'][tier as 'core' | 'elite'];

    // Get real user from session
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    const customerEmail = user?.email || "athlete@example.com"; 
    const userId = user?.id || "00000000-0000-0000-0000-000000000000";

    const checkoutResponse = await createCheckout(storeId, variantId, {
      checkoutOptions: {
        embed: false,
        media: false,
        logo: true,
      },
      checkoutData: {
        email: customerEmail,
        discountCode: discountCode || undefined,
        custom: {
          user_id: userId, // This passes the Supabase User ID to the webhook
        }
      },
      productOptions: {
        redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:4000'}/dashboard?success=true`,
      }
    });

    if (checkoutResponse.error) {
      throw new Error(checkoutResponse.error.message);
    }

    return NextResponse.json({ url: checkoutResponse.data?.data.attributes.url });
  } catch (err) {
    console.error(err);
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
