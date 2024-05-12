import ChangeEmail from "@/components/innstillinger/chane-email";
import ChangePassword from "@/components/innstillinger/change-password";
import { Separator } from "@/components/ui/separator";
import UserImage from "@/components/user-image";
import { getCurrentUser } from "@/lib/auth";
import { updateEmail } from "@/actions/settingsActions/userSettings";


const UserSettingsPage = async () => {
  const user = await getCurrentUser();
  if (!user) return;

  const handleEmailUpdate = async (content: string) => {
    "use server"
    const status = await updateEmail(content)
    return status;
  }

  return (
    <div>
      <h1 className="text-2xl font-medium">Brukerinnstillinger</h1>
      <Separator className="my-6" />
      <div className="flex flex-col gap-6">
        <ChangeEmail updateEmail={handleEmailUpdate} user={user}/>
        <ChangePassword/>


      </div>
    </div>
  );
};

export default UserSettingsPage;
