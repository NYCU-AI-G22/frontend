'use client';

import { Button } from '@nextui-org/react';
import { PostButtonIcon } from '../Icons';

export default function PostButton() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="bordered" className="text-black ">
        <PostButtonIcon />
        Post
      </Button>
    </div>
  );
}
