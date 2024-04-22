import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import SideBarNav from "@/components/innstillinger/sidebar-nav";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const settingsNavItems = [
    {
      name: "Profil",
      path: "/innstillinger",
    },
    {
      name: "Bruker",
      path: "/innstillinger/bruker",
    },
    {
      name: "Sikkerhet",
      path: "/innstillinger/sikkerhet",
    },
    {
      name: "Notifikasjoner",
      path: "/innstillinger/notifikasjoner",
    },
  ];

  return (
    <div className="min-h-screen max-w-[1280px] m-auto">
      <div className="mt-10">
        <div>
          <h1 className="text-2xl font-bold">Innstillinger</h1>
          <h2>
            Administrer kontoinnstillingene dine.
          </h2>
        </div>
        <Separator className="my-4" />
        <div className="flex gap-10">
          <SideBarNav settingsNavItems={settingsNavItems}/>
          <div className="mt-2 w-full">
          {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
