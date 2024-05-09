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
  ];

  return (
    <div className="min-h-screen pb-[200px] max-w-[1280px] m-auto">
      <div className="mt-10">
        <div className="flex sm:flex-row flex-col gap-10">
          <SideBarNav settingsNavItems={settingsNavItems}/>
          <div className="mt-2 sm:px-0 px-3 w-full">
          {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
