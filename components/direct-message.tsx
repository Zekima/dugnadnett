import { X } from "lucide-react";
import { BsPersonAdd } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";
import { Search } from "lucide-react";

const DirectMessage = ({setShowChat, showChat}: {setShowChat : (state: boolean) => void, showChat: boolean}) => {
  return (
    <div className="fixed bottom-0 right-0 w-[350px] bg-white border-gray-400 z-50 h-1/2 border border-r-0 rounded-tl-md">
      <div className="w-full h-8 bg-gray-200 border-b border-gray-900 rounded-tl-md p-2 flex justify-between items-center">
        <p className="text-sm font-medium">Samtaler</p>
        <X size={20} className="cursor-pointer" onClick={() => setShowChat(!showChat)}/>
      </div>
      <div className="p-2 flex items-center gap-2 justify-center mt-1">
        <div className="relative">
        <input type="text" placeholder="Sok etter person" className="border border-gray-600 rounded-md p-1"/>
        <Search className="absolute right-2 top-1 text-gray-500"/>
        </div>
        <button className="px-2 py-1 rounded-md border-gray-600 border">
        <IoMdPersonAdd size={24}/>
        </button>
      </div>
      <div className="p-2 text-sm h-full items-center flex flex-col mt-12">Ingen samtaler oprettet <span className="text-green-700 cursor-pointer hover:text-green-800 hover:underline"> legg til samtale</span></div>
    </div>
  );
};

export default DirectMessage;
