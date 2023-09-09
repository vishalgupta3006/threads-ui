import { ROUTES } from "@/constants";
import Image from "next/image";
import Link from "next/link";

type TThreadCard = {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
};

const ThreadCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  createdAt,
  comments,
  isComment,
}: TThreadCard) => {
  return (
    <article
      className={`flex w-full flex-col rounded-xl ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link
              href={`${ROUTES.profile}/${author.id}`}
              className="relative h-11 w-11"
            >
              <Image
                src={author.image}
                fill
                alt="profile image"
                className="cursor-pointer rounded-full"
              />
            </Link>
            <div className="thread-card_bar" />
          </div>
          <div className="flex flex-col w-full">
            <Link
              href={`${ROUTES.profile}/${author.id}`}
              className="w-fit"
            >
              <h4 className="cursor-pointer text-base-semibold text-light-2">
                {author.name}
              </h4>
            </Link>
            <p className="mt-2 class-small-regular text-light-2">
              {content}
            </p>
            <div
              className={`${
                isComment ? "mb-10" : ""
              } mt-5 flex flex-col gap-3`}
            >
              <div className="flex gap-3.5">
                <Image
                  src="/assets/heart-gray.svg"
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-point object-contain"
                />
                <Link href={`${ROUTES.thread}/${id}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="reply"
                    width={24}
                    height={24}
                    className="cursor-point object-contain"
                  />
                </Link>
                <Image
                  src="/assets/repost.svg"
                  alt="repost"
                  width={24}
                  height={24}
                  className="cursor-point object-contain"
                />
                <Image
                  src="/assets/share.svg"
                  alt="share"
                  width={24}
                  height={24}
                  className="cursor-point object-contain"
                />
              </div>

              {isComment && comments.length && (
                <Link href={`${ROUTES.thread}/${id}`}>
                  <p className="mt-1 text-subtle-medium tex-gray-1">
                    {comments.length} replies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ThreadCard;
