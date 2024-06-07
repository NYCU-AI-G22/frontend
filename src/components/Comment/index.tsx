'use client';

import { Textarea } from '@nextui-org/input';
import { Button } from '@nextui-org/react';
import { Divider } from '@nextui-org/divider';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Toaster, toast } from 'sonner';
import createComment from '@/actions/comment';

type CommentBoardProps = {
    postId: number;
    userId: string;
    onCancel: () => void;
  };

export default function CommentBoard({ postId, userId, onCancel }: CommentBoardProps) {
  const { pending } = useFormStatus();
  const [comment, setComment] = useState('');

  const handlePost = async () => {
    const { error } = await createComment(comment, userId, postId);
    console.log(userId, '5');
    if (error) {
      console.error('Error creating comment:', error);
      return;
    }
    setComment('');
    if (error) {
      toast.error('留言建立失敗!');
      return;
    }
    setComment('');
    toast.success('留言成功建立!');
    onCancel();
  };

  return (
    <div>
      <Divider />
      <Textarea
        label="Comment"
        variant="bordered"
        className="min-w-xs mb-1 p-3"
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="mb-3 flex flex-row items-start justify-end gap-3 pr-3">
        <div>
        <Button color="danger" variant="bordered" onClick={onCancel}>
            取消
          </Button>
        </div>
        <div>
          <Button
            type="submit"
            disabled={pending}
            isLoading={pending}
            color="success"
            variant="bordered"
            onPress={handlePost}
          >
            送出
          </Button>
        </div>
      </div>
      <Toaster richColors />
    </div>
  );
}
