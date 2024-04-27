import Bio from "@/components/innstillinger/bio";
import Skills from "@/components/innstillinger/skills"
import { Separator } from "@/components/ui/separator";
import UserImage from "@/components/user-image";
import { getUserById } from "@/data/user";
import { getCurrentUser } from "@/lib/auth";
import { useState } from "react";

const SettingsPage = async () => {
  const user = await getCurrentUser();
  if (!user?.id) return;
  const userInfo = await getUserById(user.id);

  return (
    <div>
      <h1 className="text-xl font-medium">Min profil</h1>
      <Separator className="my-3" />
      <div className="flex flex-col gap-6">
        <div className="mt-3 mb-2 flex gap-6">
          <UserImage user={user} size={128} />
          <div className="flex flex-col gap-1 justify-center">
            <button className="px-4 py-2 rounded-md bg-green-700 text-white hover:bg-green-800">
              Endre profilbilde
            </button>
            <button className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800">
              Fjern profilbilde
            </button>
          </div>
        </div>
        <Bio initalBio={userInfo?.bio as string}/>
        <Skills initalSkills={userInfo?.skills as string[]}/>
      </div>
    </div>
  );
};

export default SettingsPage;
