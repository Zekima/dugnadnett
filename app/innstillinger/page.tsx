import { Separator } from "@/components/ui/separator";
import UserImage from "@/components/user-image";
import { getCurrentUser } from "@/lib/auth";

const SettingsPage = async () => {
  const user = await getCurrentUser();
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
        <div>
          <h2 className="font-medium mb-2">Biografi</h2>
          <textarea placeholder="Skriv en biografi" className="border border-gray-400 rounded-md p-2 resize-none w-[500px] h-[150px]"></textarea>
        </div>
        <div>
          <h2 className="font-medium mb-2">Ferdigheter</h2>
          <div className="flex gap-1">
          <input placeholder="Organisering" className="border rounded-md p-2 border-gray-400 w-[500px]"/>
          <button className="px-4 py-2 text-white h-full bg-green-700 rounded-md border hover:bg-green-800 border-green-700">+</button>
          </div>
        </div>

        <button className="bg-black text-white py-2 px-4 w-[190px] rounded-md hover:bg-gray-800">
            Lagre endringer
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
