'use client';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
} from '@nextui-org/react';
import { useState } from 'react';
import { PostType } from '@/types';
import Link from 'next/link';
import { Heart, HeartSolid, Comment } from '../Icons';
import CommentBoard from '../Comment';

export default function Post({
  post,
  user_id,
}: {
  post: PostType;
  user_id: string;
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);

  return (
    <Card className="mt-10 h-auto w-[30rem] bg-white px-5 pt-2 shadow-md">
      <Link href={`/post/${post.id}`} passHref>
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar
              showFallback
              src="https://www.svgrepo.com/show/418965/user-avatar-profile.svg"
            />
            <div className="flex flex-col items-start justify-center gap-1">
              <h4 className="text-small font-bold leading-none text-slate-950">
                {post.profiles.name}
              </h4>
            </div>
          </div>
        </CardHeader>
        <CardBody className="text-small text-black">
          <p>{post.content}</p>
        </CardBody>
        <CardFooter className="flex justify-end gap-3">
          <button
            type="button"
            className="flex cursor-pointer gap-1"
            onClick={(e) => {
              e.preventDefault();
              setIsLiked(!isLiked);
            }}
            aria-label={isLiked ? 'Unlike' : 'Like'}
          >
            {isLiked ? <Heart /> : <HeartSolid />}
          </button>
          <button
            type="button"
            className="flex cursor-pointer gap-1"
            onClick={(e) => {
              e.preventDefault();
              setIsCommenting(!isCommenting);
            }}
            aria-label="Comment"
          >
            <Comment />
          </button>
        </CardFooter>
      </Link>
      {isCommenting && <CommentBoard postId={post.id} userId={user_id} />}
    </Card>
  );
}
