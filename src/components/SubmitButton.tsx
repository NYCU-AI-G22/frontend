'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@nextui-org/react';

export default function SubmitButton({ action }: { action: string }) {
  const { pending } = useFormStatus();
  const isLogin = action === 'login';

  return (
    <Button
      type="submit"
      disabled={pending}
      isLoading={pending}
      variant="bordered"
      className="bg-black"
    >
      <p className="text-white">{isLogin ? '登入' : '註冊'}</p>
    </Button>
  );
}
