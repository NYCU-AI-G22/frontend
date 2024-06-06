import SubmitButton from '@/components/SubmitButton';
import { Input } from '@nextui-org/react';
import { signup } from '@/actions/user';

export default async function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 ">
      <div className="w-[30rem] rounded-lg bg-gray-300 p-8 text-black shadow-md">
        <div className="mb-10 flex items-center justify-center text-3xl font-bold ">
          <p>註冊</p>
        </div>
        <form action={signup} className="flex-col">
          <div className="mb-6 flex items-center justify-center ">
            <Input
              labelPlacement="outside"
              name="name"
              type="name"
              label="Name"
              variant="faded"
              placeholder="Enter your name"
              className="w-[80%]"
            />
          </div>
          <div className="mb-6 flex items-center justify-center ">
            <Input
              labelPlacement="outside"
              name="email"
              type="email"
              label="Email"
              variant="faded"
              placeholder="you@example.com"
              className="w-[80%]"
            />
          </div>
          <div className="mb-6 flex items-center justify-center">
            <Input
              labelPlacement="outside"
              name="password"
              type="password"
              label="Password"
              variant="faded"
              placeholder="Enter your password"
              className="w-[80%]"
            />
          </div>
          <div className="flex items-center justify-center">
            <SubmitButton action="signin" />
          </div>
        </form>
      </div>
    </div>
  );
}
