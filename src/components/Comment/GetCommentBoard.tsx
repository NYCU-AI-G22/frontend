import { User } from '@nextui-org/user';
import { Divider } from '@nextui-org/react';
import { CommentType } from '@/types';

export default function GetCommentBoard({ comment }: CommentType) {
  return (
    <div className="mb-5">
      <User
        name={comment.profiles.name}
        avatarProps={{
          src: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
        }}
      />
      <div className="mb-3 ml-[3rem]">{comment.content}</div>
      <Divider />
    </div>
  );
}
