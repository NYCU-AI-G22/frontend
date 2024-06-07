export type AvatarButtonProps = {
  name: string;
};
export type Profile = {
  user_id: string;
  name: string;
};

export type PostType = {
  profiles: any;
  id: number;
  user_id: string;
  content: string;
  created_at: string;
};

export type PostDetailType = {
  id: number;
  user_id: string;
  content: string;
  created_at: string;
  profiles: { name: any }[];
};
