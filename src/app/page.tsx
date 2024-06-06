import Post from '@/components/Post';
import PostButton from '@/components/Post/PostButton';
import AvatarButton from '@/components/Avatar';
import createClient from '@/utils/supabase/server';

export default async function Home() {
  const supabase = createClient();
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .single();
  console.log(profile);
  return (
    <div className=" flex h-screen ">
      <div className="ml-auto mr-auto flex-row">
        <div className="mb-10 mt-10 flex justify-between">
          <PostButton />
          {profile ? (
            <AvatarButton name={profile.name} />
          ) : (
            <AvatarButton name="Max" />
          )}
        </div>
        <Post />
      </div>
    </div>
  );
}
