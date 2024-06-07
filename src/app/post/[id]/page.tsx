import { createClient } from '@supabase/supabase-js';
import { PostDetailType } from '@/types';
import Post from '@/components/Post';

export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data } = await supabase
    .from('posts')
    .select(
      `
      id,
      user_id,
      content,
      created_at,
      profiles!inner(name)
    `,
    )
    .eq('id', params.id)
    .single();
  return (
    <div>
      {data ? <Post post={data as PostDetailType} /> : <div>Post not found</div>}
    </div>
  );
}
