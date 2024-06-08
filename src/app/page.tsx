import Post from '@/components/Post';
import PostButton from '@/components/Post/PostButton';
import AvatarButton from '@/components/Avatar';
import createClient from '@/utils/supabase/server';
import { getPosts } from '@/actions/post';
import { PostType } from '@/types';

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user?.id)
    .single();
  const { data: posts } = await getPosts();

  return (
    <div className=" flex  bg-gray-200">
      <div className="ml-auto mr-auto flex-row">
        <div className="mb-10 mt-10 flex justify-between">
          <PostButton user_id={profile.user_id} />
          {profile ? (
            <AvatarButton name={profile.name} />
          ) : (
            <AvatarButton name="Max" />
          )}
        </div>
        <div>
          {posts?.map((post: PostType) => (
            <Post key={post.id} post={post} user_id={profile.user_id} />
          ))}
        </div>
      </div>
    </div>
  );
}
