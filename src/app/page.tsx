import Post from '@/components/Post';
import PostButton from '@/components/Post/PostButton';
export default function Home() {
  return (
    <div className=" min-h-screen ">
      <div className="flex items-center justify-items-center ">
        <PostButton />
      </div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Post />
      </main>
    </div>
  );
}
