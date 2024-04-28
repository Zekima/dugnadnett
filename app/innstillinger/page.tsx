import { updateBio } from "@/actions/settingsActions/profileSettings";
import Bio from "@/components/innstillinger/bio";
import Skills from "@/components/innstillinger/skills"
import { Separator } from "@/components/ui/separator";
import UserImage from "@/components/user-image";
import { getUserById } from "@/data/user";
import { getCurrentUser } from "@/lib/auth";
import {Pencil, Trash} from 'lucide-react'

const SettingsPage = async () => {
  const user = await getCurrentUser();
  if (!user?.id) return;
  const userInfo = await getUserById(user.id);

  const handleBioUpdate = async (content: string) => {
    "use server"
    const status = await updateBio(content)
    return status;
  }

  return (
    <div>
      <h1 className="text-2xl font-medium">Profilinnstillinger</h1>
      <Separator className="my-6" />
      <div className="flex flex-col gap-6">
      <h2 className="font-medium">Profilbilde</h2>

        <div className="mb-2 flex gap-6">
          
          <UserImage user={user} size={128} />
          <div className="flex flex-col gap-1.5 justify-center">
            <button className="px-4 flex items-center gap-2 py-2 rounded-md bg-green-700 text-white hover:bg-green-800">
              <Pencil size={20}/>
            </button>
            <button className="px-4 flex items-center gap-2 py-2 rounded-md bg-red-700 text-white hover:bg-red-800">
              <Trash size={20}/>
            </button>
          </div>
        </div>
        <Bio updateBio={handleBioUpdate} initalBio={userInfo?.bio as string}/>
        <Skills initalSkills={userInfo?.skills as string[]}/>
      </div>
    </div>
  );
};

export default SettingsPage;
