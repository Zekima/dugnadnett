import {
  getUserParticpatesInDugnads,
  getUserOwnesDugnads,
} from "@/actions/dugnadActions/getDugnads";
import {
  checkIfUserFollows,
  followUser,
  getFollowers,
} from "@/actions/profileActions/follow";
import { FollowButton } from "@/components/profile/follow-button";
import { Separator } from "@/components/ui/separator";
import UserImage from "@/components/user-image";
import UtforskCard from "@/components/utforsk/utforsk-card";
import { getUserById } from "@/data/user";
import { getCurrentUser } from "@/lib/auth";
import { Calendar, User } from "lucide-react";
import Link from "next/link";

export default async function ProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  const userProfile = await getUserById(params.slug);
  const currentUser = await getCurrentUser();
  if (!currentUser?.id || !userProfile?.id) return;

  const isCurrentUser = userProfile.id === currentUser.id;
  const ownedDugnads = (await getUserOwnesDugnads()).slice(2, 5);
  const particpantDugnads = await getUserParticpatesInDugnads();
  const userFollowers = await getFollowers({ userId: userProfile.id });

  const isFollowing = await checkIfUserFollows({
    userId: currentUser.id,
    followedUserId: userProfile.id,
  });

  return (
    <div className="min-h-screen max-w-[1280px] m-auto xl:p-0 px-5 pb-12">
      <div className="mt-10 flex gap-6 sm:flex-row flex-col items-center sm:items-start">
        <div className="flex flex-col items-center gap-4 min-h-screen w-[350px]">
          <div className="bg-black p-0.5 rounded-full">
            <UserImage user={userProfile} size={200}></UserImage>
          </div>
          <div className="flex gap-6 flex-col w-full">
            <div className="gap-2 flex flex-col">
              <p className="text-2xl text-center">{userProfile?.name}</p>
              <div className="flex gap-2 items-center justify-center">
                <Calendar size={20} />
                <p className="text-gray-600 font-light text-sm">
                  Medlem siden{" "}
                  {userProfile?.createdAt?.toLocaleDateString("nb-NO")}
                </p>
              </div>
            </div>
            {!isCurrentUser && (
              <div className="flex flex-col gap-2">
                <button className="p-2 justify-center disabled:opacity-75 items-center bg-blue-600 text-white w-full font-medium rounded-md hover:bg-blue-700 flex gap-2">
                  Send melding
                </button>
                <FollowButton
                  currentUserId={currentUser.id}
                  userProfileId={userProfile.id}
                  followStatus={isFollowing}
                />
              </div>
            )}

            <div>
              <h1 className="text-lg">
                Følgere{" "}
                {userFollowers.length > 0 && ` (${userFollowers.length})`}
              </h1>
              <Separator className="my-2" />

              {userFollowers.length > 0 ? (
                <div className="flex flex-wrap">
                  {userFollowers.map((follower) => (
                    <div
                      title={follower.name as string}
                      className="mr-1 mb-1"
                      key={follower.id}
                    >
                      <UserImage user={follower} size={40} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-600">
                  Ingen som følger denne personen
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <div className="h-[750px] rounded-md w-full">
            <div className="flex gap-6 w-full">
              <div className="w-full">
              <h1 className="font-medium text-lg">Biografi</h1>
              <Separator className="my-3 w-full"/>
              <p className="text-gray-400 text-sm">Ingen bio.</p>
              </div>
              <div className="w-full">
              <h1 className="font-medium text-lg">Ferdigheter</h1>
              <Separator className="my-3"/>
              <p className="text-gray-400 text-sm">Ingen ferdigheter satt opp.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p></p>
    </div>
  );
}
