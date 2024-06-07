'use server';

import createClient from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

const supabase = createClient();

export default async function createComment(
  content: string,
  userId: string,
  postId: number,
) {
  const { data, error } = await supabase
    .from('comments')
    .insert([{ content, user_id: userId, post_id: postId }])
    .select();

  if (error) {
    console.error('Error creating comment:', error);
    return { error };
  }
  revalidatePath('/');
  return { data };
}
