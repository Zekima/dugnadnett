import { updateBio, updateSkills } from "@/actions/settingsActions/profileSettings";
import Bio from "@/components/innstillinger/bio";
import ChangeAvatar from "@/components/innstillinger/change-avatar";
import Skills from "@/components/innstillinger/skills"
import { Separator } from "@/components/ui/separator";
import UserImage from "@/components/user-image";
import { getUserById } from "@/data/user";
import { getCurrentUser } from "@/lib/auth";
import { Pencil, Trash } from 'lucide-react'

const SettingsPage = async () => {
  const user = await getCurrentUser();
  if (!user?.id) return;
  const userInfo = await getUserById(user.id);

  const handleBioUpdate = async (content: string) => {
    "use server"
    const status = await updateBio(content)
    return status;
  }

  const handleSkillsUpdate = async (listOfSkills: string[]) => {
    "use server"
    await updateSkills(listOfSkills)
  }

  return (
    <div>
      <h1 className="text-2xl font-medium">Profilinnstillinger</h1>
      <Separator className="my-6" />
      <div className="flex flex-col gap-6">
        <ChangeAvatar user={user}/>
        <Bio updateBio={handleBioUpdate} initalBio={userInfo?.bio as string} />
        <Skills updateSkills={handleSkillsUpdate} initalSkills={userInfo?.skills as string[]} />
      </div>
    </div>
  );
};

export default SettingsPage;
