'use server';

import createClient from '@/utils/supabase/server';

const supabase = createClient();

export interface Profile {
  user_id: string;
}

export default async function getUserId(email: string) {
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('user_id')
    .eq('email', email);

  if (error) {
    console.error('Error fetching user ID:', error);
    return { error };
  }

  if (profiles.length === 0) {
    console.error('User not found');
    return { error: 'User not found' };
  }

  return { userId: profiles[0].user_id };
}
