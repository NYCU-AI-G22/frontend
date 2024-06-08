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
import createComment from '@/actions/comment';
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

  const handleAIComment = async (aicontent: string, postId: number) => {
    try {
      console.log('Sending request to AI system...');
      const aiResponse = await fetch('http://127.0.0.1:5000/text_generation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input_text: aicontent }),
      });

      if (!aiResponse.ok) {
        throw new Error(`AI response not ok, status: ${aiResponse.status}`);
      }

      const aiResult = await aiResponse.json();
      const parsedResult = JSON.parse(aiResult.return);
      const commentContent = parsedResult[0];

      const commentResponse = await createComment(
        commentContent,
        '2ef3b064-2802-4b47-a6a1-ceb292c601de',
        postId,
      );

      if (commentResponse.error) {
        toast.error('AI 留言創建失敗!');
      } else {
        toast.success('AI 留言成功建立!');
      }
    } catch (err) {
      console.error('Error fetching from AI system:', err);
      toast.error('AI 留言創建失敗!');
    }
  };
  const handlePost = async () => {
    const { data, error } = await createPost(content, userId);

    if (error) {
      toast.error('貼文建立失敗!');
      return;
    }

    const postId = data[0].id;

    setContent('');
    toast.success('貼文成功建立!');
    onClose();
    handleAIComment(content, postId);
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
          <Toaster richColors />
        </>
      </ModalContent>
    </Modal>
  );
}
