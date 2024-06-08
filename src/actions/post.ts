'use server';

import createClient from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

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
  revalidatePath('/');
  return { data };
}

export async function getPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select(
      `
      id,
      user_id,
      content,
      created_at,
      profiles (
        name
      )
    `,
    )
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error getting posts:', error);
    return { error };
  }
  revalidatePath('/');
  return { data };
}

export async function getPostsId(id: string) {
  const { data, error } = await supabase
    .from('posts')
    .select(
      `
      id,
      user_id,
      content,
      created_at,
      profiles (
        name
      )
    `,
    )
    .eq('id', id);

  if (error) {
    console.error('Error getting posts:', error);
    return { error };
  }
  revalidatePath('/');
  return { data };
}
