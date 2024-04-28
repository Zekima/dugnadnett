import { Separator } from "@/components/ui/separator";
import UserImage from "@/components/user-image";
import { getCurrentUser } from "@/lib/auth";

const UserSettingsPage = async () => {
  const user = await getCurrentUser();

  return (
    <div>
      <h1 className="text-2xl font-medium">Brukerinnstillinger</h1>
      <Separator className="my-6" />
      <div className="flex flex-col gap-6"></div>
    </div>
  );
};

export default UserSettingsPage;
