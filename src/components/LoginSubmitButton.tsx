'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@nextui-org/react';

export default function LoginSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} isLoading={pending}>
      登入
    </Button>
  );
}
