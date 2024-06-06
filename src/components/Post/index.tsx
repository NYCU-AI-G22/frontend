'use client';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
} from '@nextui-org/react';
import { useState } from 'react';
import { Heart, HeartSolid, Comment } from '../Icons';

export default function Post() {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Card className="h-auto w-[30rem] bg-white px-5 pt-2 shadow-md">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            showFallback
            src="https://www.svgrepo.com/show/418965/user-avatar-profile.svg"
          />
          <div className="flex flex-col items-start justify-center gap-1">
            <h4 className="text-small font-bold leading-none text-slate-950">
              Justin Li
            </h4>
          </div>
        </div>
      </CardHeader>
      <CardBody className="text-small text-black">
        <p>Frontend developer and UI/UX enthusiast.</p>
      </CardBody>
      <CardFooter className="flex justify-end gap-3">
        <button
          type="button"
          className="flex cursor-pointer gap-1"
          onClick={() => setIsLiked(!isLiked)}
        >
          {isLiked ? <Heart /> : <HeartSolid />}
        </button>
        <div>
          <Comment />
        </div>
      </CardFooter>
    </Card>
  );
}
