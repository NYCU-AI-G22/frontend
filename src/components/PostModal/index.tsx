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
import { useFormStatus } from 'react-dom';

import { Toaster, toast } from 'sonner';

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
  const { pending } = useFormStatus();
  const handlePost = async () => {
    const { error } = await createPost(content, userId);

    if (error) {
      toast.error('貼文建立失敗!');
      return;
    }
    setContent('');
    toast.success('貼文成功建立!');

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
            <Button
              color="warning"
              onPress={handlePost}
              disabled={pending}
              isLoading={pending}
            >
              發布貼文
            </Button>
          </ModalFooter>
          <Toaster richColors  />
        </>
      </ModalContent>
    </Modal>
  );
}
