'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  try {
    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
      redirect('/login?message=' + encodeURIComponent(error.message))
    }
  } catch (err) {
    console.error(err)
    if (err instanceof Error && err.message === 'NEXT_REDIRECT') throw err; // Allow Next.js redirect to work
    redirect('/login?message=System Error: Are your Supabase keys configured?')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string
  const referralCode = formData.get('referralCode') as string

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    })

    if (error) {
      redirect('/login?message=' + encodeURIComponent(error.message))
    }

    if (data.user) {
      // Create a unique referral code for this user
      const myCode = fullName.split(' ')[0].toUpperCase() + Math.floor(1000 + Math.random() * 9000).toString();
      
      let referredBy = null;
      // Handle if they provided a friend's code
      if (referralCode) {
        // Find friend
        const { data: friend } = await supabase
          .from('users')
          .select('id')
          .eq('referral_code', referralCode.toUpperCase())
          .single();
          
        if (friend) {
          referredBy = referralCode.toUpperCase();
        }
      }

      await supabase.from('users').insert({
        id: data.user.id,
        email: email,
        full_name: fullName,
        referral_code: myCode,
        referred_by: referredBy
      })
    }
  } catch (err) {
    console.error(err)
    if (err instanceof Error && err.message === 'NEXT_REDIRECT') throw err; 
    redirect('/login?message=System Error: Are your Supabase keys configured?')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function logout() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
