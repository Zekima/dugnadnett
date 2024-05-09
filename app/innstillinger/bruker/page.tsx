import { Separator } from "@/components/ui/separator";
import UserImage from "@/components/user-image";
import { getCurrentUser } from "@/lib/auth";

const UserSettingsPage = async () => {
  const user = await getCurrentUser();

  return (
    <div>
      <h1 className="text-2xl font-medium">Brukerinnstillinger</h1>
      <Separator className="my-6" />
      <div className="flex flex-col gap-6">
        <div className="gap-4 flex flex-col">
          <h2 className="font-medium">E-postadresse</h2>
          <div className="flex gap-1.5">
            <input
              value={user?.email as string}
              className="border h-10 rounded-md p-2 border-gray-400 w-[300px]"
            />
            <button
              className="px-4 h-10 py-2 text-white h-full bg-green-700 rounded-md hover:bg-green-800 border-green-700"
            >
              Lagre
            </button>
          </div>

        </div>
        <div className="gap-4 flex flex-col">
          <h2 className="font-medium">Endre Passord</h2>
          <div className="flex flex-col gap-3">
            <div className="gap-1.5 flex flex-col">
              <p className="text-sm">Gammelt Passord</p>
              <input
                type="password"
                className="border h-10 rounded-md p-2 border-gray-400 w-[300px]"
              />
            </div>
            <div className="gap-1.5 flex flex-col">
              <p className="text-sm">Nytt Passord</p>
              <input
                type="password"
                className="border h-10 rounded-md p-2 border-gray-400 w-[300px]"
              />
            </div>
          </div>
          <button
              className="px-4 h-10 py-2 text-white h-full bg-green-700  w-[100px] rounded-md hover:bg-green-800 border-green-700"
            >
              Lagre
            </button>

        </div>


      </div>
    </div>
  );
};

export default UserSettingsPage;
