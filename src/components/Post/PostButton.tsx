'use client';

import { Button } from '@nextui-org/react';
import { useDisclosure } from '@nextui-org/use-disclosure';
import { PostButtonIcon } from '../Icons';
import PostModal from '../PostModal';

export default function PostButton(user_id: string) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button
        variant="solid"
        color="warning"
        className="text-black "
        onPress={onOpen}
      >
        <PostButtonIcon />
      </Button>
      <PostModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        userId={user_id}
      />
    </div>
  );
}
