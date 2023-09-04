"use client";

import { useForm } from "react-hook-form";

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}
const AccountProfile = ({ user, btnTitle }: Props) => {
  const form = useForm();

  return <form>
    
  </form>;
};

export default AccountProfile;
