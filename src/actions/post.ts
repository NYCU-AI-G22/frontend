'use server';

import createClient from '@/utils/supabase/server';

const supabase = createClient();

export default async function createPost(content: string, userId: string) {
  const { data, error } = await supabase
    .from('posts')
    .insert([{ content, user_id: userId }])
    .select();

  if (error) {
    console.error('Error creating post:', error);
    return { error };
  }

  return { data };
}
