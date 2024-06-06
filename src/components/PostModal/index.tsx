'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
} from '@nextui-org/react';
import createPost from '@/actions/post';
import { useState } from 'react';
import { toast } from 'sonner'

export default function PostModal({
  isOpen,
  onOpenChange,
  onClose,
  userId,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  userId: string;
}) {
  const [content, setContent] = useState('');
  const handlePost = async () => {
    const { error } = await createPost(content, userId);

    if (error) {
      console.error('Failed to create post:', error);
      return;
    }

    toast.success('Event has been created')
    
    onClose();
  };
  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{
        backdrop:
          'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
      }}
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">發布貼文</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <Textarea
                placeholder="Enter your description"
                className="w-full"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="warning" onPress={handlePost}>
              發布貼文
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}
