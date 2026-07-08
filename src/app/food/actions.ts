'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function logMealAction(mealData: Record<string, unknown>) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Not logged in' }
  }

  const today = new Date().toISOString().split('T')[0]

  try {
    // 1. Fetch today's log or create a new one
    const logResponse = await supabase
      .from('daily_logs')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', today)
      .single()

    let log = logResponse.data;
    const fetchError = logResponse.error;

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error(fetchError)
      return { error: fetchError.message }
    }

    if (!log) {
      // Create new log
      const { data: newLog, error: insertError } = await supabase
        .from('daily_logs')
        .insert({
          user_id: user.id,
          date: today,
          meals: [mealData],
          total_kcal: (mealData.kcal as number) || 0,
          protein_g: (mealData.pro as number) || 0,
          carbs_g: (mealData.carb as number) || 0,
          fat_g: (mealData.fat as number) || 0,
        })
        .select()
        .single()
        
      if (insertError) {
        console.error(insertError)
        return { error: insertError.message }
      }
      log = newLog
    } else {
      // Update existing log
      const updatedMeals = [...(log.meals || []), mealData]
      
      const { data: updatedLog, error: updateError } = await supabase
        .from('daily_logs')
        .update({
          meals: updatedMeals,
          total_kcal: (log.total_kcal || 0) + ((mealData.kcal as number) || 0),
          protein_g: (log.protein_g || 0) + ((mealData.pro as number) || 0),
          carbs_g: (log.carbs_g || 0) + ((mealData.carb as number) || 0),
          fat_g: (log.fat_g || 0) + ((mealData.fat as number) || 0),
        })
        .eq('id', log.id)
        .select()
        .single()

      if (updateError) {
        console.error(updateError)
        return { error: updateError.message }
      }
      log = updatedLog
    }

    revalidatePath('/dashboard')
    revalidatePath('/food')
    return { success: true, log }
    
  } catch (err) {
    console.error(err)
    return { error: err instanceof Error ? err.message : String(err) }
  }
}
