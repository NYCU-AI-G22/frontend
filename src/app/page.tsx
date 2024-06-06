import Post from '@/components/Post';
import PostButton from '@/components/Post/PostButton';
import AvatarButton from '@/components/Avatar';
import createClient from '@/utils/supabase/server';
import { getPosts } from '@/actions/post';
import { Profile, PostType } from '@/types';

export default async function Home() {
  const supabase = createClient();
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .single();

  const userProfile = profile as Profile;

  const { data: posts } = await getPosts();
  return (
    <div className=" flex h-screen ">
      <div className="ml-auto mr-auto flex-row">
        <div className="mb-10 mt-10 flex justify-between">
          <PostButton user_id={userProfile.user_id} />
          {userProfile ? (
            <AvatarButton name={userProfile.name} />
          ) : (
            <AvatarButton name="Max" />
          )}
        </div>
        <div className="space-y-6">
          {posts?.map((post: PostType) => <Post key={post.id} post={post} />)}
        </div>
      </div>
    </div>
  );
}
