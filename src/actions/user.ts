'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function login(formData: FormData) {
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const supabase = createServerActionClient({
    cookies,
  });

  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
export async function signup(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.error('Signup error:', error);
    redirect('/error');
  } 

    revalidatePath('/');
    redirect('/account'); 

}
