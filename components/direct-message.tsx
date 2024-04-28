import { X } from "lucide-react";
import { BsPersonAdd } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";
import { Search } from "lucide-react";

const DirectMessage = ({
  setShowChat,
  showChat,
}: {
  setShowChat: (state: boolean) => void;
  showChat: boolean;
}) => {
  return (
    <div className="fixed bottom-0 right-0 w-[350px] bg-white border-gray-400 z-50 h-1/2 border border-r-0 rounded-tl-md">
      <div className="w-full h-8 bg-gray-200 border-b border-gray-900 rounded-tl-md p-2 flex justify-between items-center">
        <p className="text-sm font-medium">Samtaler</p>
        <X
          size={20}
          className="cursor-pointer"
          onClick={() => setShowChat(!showChat)}
        />
      </div>
      <div className="px-4 py-2 flex items-center gap-1 mt-1">
        <div className="flex items-center relative w-full">
          <input
            type="text"
            placeholder="Søk etter samtale"
            className="border text-sm border-gray-600 rounded-md p-2 h-10 w-full"
          />
          <Search className="absolute right-2 top-2 text-gray-400" />
        </div>
        <button className="p-2 px-3 hover:bg-gray-100 text-sm gap-2 rounded-md border-gray-600 border h-10 flex items-center justify-center">
          <IoMdPersonAdd size={20} />

        </button>
      </div>
      <div className="p-2 text-sm h-full items-center flex flex-col justify-center pb-[130px]">
        Ingen samtaler oprettet{" "}
        <span className="text-green-700 cursor-pointer hover:text-green-800 hover:underline">
          {" "}
          Legg til samtale
        </span>
      </div>
    </div>
  );
};

export default DirectMessage;
