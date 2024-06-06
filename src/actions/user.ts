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

  const name = formData.get('name') as string;

  const { data: signUpData, error } = await supabase.auth.signUp(data);

  if (error) {
    console.error('Signup error:', error);
    redirect('/error'); // 或者顯示錯誤信息
  } else {
    // 確保用戶已成功註冊
    if (signUpData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({ id: signUpData.user.id, name });

      if (profileError) {
        console.error('Profile update error:', profileError);
        redirect('/error');
      }
    }

    revalidatePath('/');
    redirect('/account'); // 成功後重定向到用戶賬戶頁面
  }
}
