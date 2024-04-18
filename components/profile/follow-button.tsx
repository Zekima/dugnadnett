"use client";

import React, { useState } from "react";
import { followUser, unfollowUser } from "@/actions/profileActions/follow";

export const FollowButton = ({
  currentUserId,
  userProfileId,
  followStatus,
}: {
  currentUserId: string;
  userProfileId: string;
  followStatus: boolean;
}) => {
  const [isFollowing, setIsFollowing] = useState(followStatus);

  return (
    <>
      {isFollowing ? (
        <button
          onClick={() => {
            unfollowUser({
              userId: currentUserId as string,
              followedUserId: userProfileId,
            });
            setIsFollowing(false);
          }}
          className="p-2 justify-center disabled:opacity-75 items-center bg-gray-600 text-white w-full font-medium rounded-md hover:bg-gray-700 flex gap-2"
        >
          Slutt å følge
        </button>
      ) : (
        <button
          onClick={() => {
            followUser({
              userId: currentUserId as string,
              followedUserId: userProfileId,
            });
            setIsFollowing(true);
          }}
          className="p-2 justify-center disabled:opacity-75 items-center bg-green-600 text-white w-full font-medium rounded-md hover:bg-green-700 flex gap-2"
        >
          Følg
        </button>
      )}
    </>
  );
};
