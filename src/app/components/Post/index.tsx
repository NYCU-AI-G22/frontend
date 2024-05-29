'use client';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
} from '@nextui-org/react';
import { useState } from 'react';
import { Heart, HeartSolid, Comment } from '../icons';

export default function App() {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Card className="h-auto w-full max-w-[35rem] bg-white shadow-md sm:max-h-[24.7rem] sm:w-4/5 lg:w-2/3 xl:w-1/2">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar showFallback src="https://images.unsplash.com/broken" />
          <div className="flex flex-col items-start justify-center gap-1">
            <h4 className="text-small font-bold leading-none text-slate-950">
              Justin Li
            </h4>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0   text-small text-default-400">
        <p>
          Frontend developer and UI/UX enthusiast. Join me on this coding
          adventure!
        </p>
      </CardBody>
      <CardFooter className="gap-3">
        <div
          className="flex cursor-pointer gap-1"
          onClick={() => setIsLiked(!isLiked)}
        >
          {isLiked ? <Heart /> : <HeartSolid />}
        </div>
        <div>
          <Comment />
        </div>
      </CardFooter>
    </Card>
  );
}
