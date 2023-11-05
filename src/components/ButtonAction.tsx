"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { error } from "console";
import { Trash, Pencil } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { useRouter } from "next/navigation";

interface ButtonActionProps {
  id: string;
}

const ButtonAction: FC<ButtonActionProps> = ({ id }) => {
  const router = useRouter();
  const { mutate: deletePost } = useMutation({
    mutationFn: async () => {
      return axios.delete(`/api/posts/${id}`);
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
  });
  return (
    <div>
      <Link href={`/edit/${id}`} className="btn mr-2">
        <Pencil />
        Edit
      </Link>
      <button onClick={() => deletePost()} className="btn btn-error">
        <Trash />
        Delete
      </button>
    </div>
  );
};

export default ButtonAction;
