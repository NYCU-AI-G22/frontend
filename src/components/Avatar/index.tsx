'use client';

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from '@nextui-org/react';
import { AvatarButtonProps } from '@/types';
import { logout } from '@/actions/user';

export default function AvatarButton({ name }: AvatarButtonProps) {
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: 'https://www.svgrepo.com/show/418965/user-avatar-profile.svg',
            }}
            className="transition-transform"
            name={name}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem
            key="logout"
            color="danger"
            onPress={async () => {
              await logout();
            }}
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
