import { PostDetailType } from '@/types';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import createClient from '@/utils/supabase/server';
import Post from '@/components/Post';
import GetCommentBoard from '@/components/Comment/GetCommentBoard';

export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = (await supabase.auth.getUser()) || { data: { user: null } };
  const { data: comments, error } = await supabase
    .from('comments')
    .select(
      `
      id,
      content,
      created_at,
      user_id,
      profiles!inner(name)
    `,
    )
    .eq('post_id', params.id);

  if (error) {
    console.error('Error fetching comments:', error);
    return { error };
  }
  console.log(comments);
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
  console.log('9999', data, '8888');
  return (
    <div className=" flex h-screen flex-col  bg-gray-200">
      <div className="ml-auto mr-auto flex-row">
        <div>
          {data ? (
            <Post post={data as PostDetailType} user_id={user.id} />
          ) : (
            <div>Post not found</div>
          )}
        </div>
      </div>
      <div className="ml-auto mr-auto">
        <Card className="mt-10 h-auto w-[30rem] bg-white px-5 pt-2 shadow-md">
          <CardHeader className="flex gap-3">
            <h4 className="text-small font-bold leading-none text-slate-950">
              Comment
            </h4>
          </CardHeader>
          <CardBody>
            {comments ? (
              comments.map((comment) => (
                <GetCommentBoard key={comment.id} comment={comment} />
              ))
            ) : (
              <div>No comments found</div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
