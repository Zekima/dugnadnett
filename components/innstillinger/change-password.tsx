

'use client'

import { useState } from "react";
import { toast } from "../ui/use-toast";
import { Check, X } from "lucide-react";

const ChangePassword = ({ updatePassword }: { updatePassword: (oldPass: string, newPass: string) => any }) => {

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const handleOldChange = (event: any) => {
        setOldPassword(event.target.value);
    };

    const handleNewChange = (event: any) => {
        setNewPassword(event.target.value);
    };

    const handleUpdatePassword = async () => {
        const passwordStatus = await updatePassword(oldPassword, newPassword)
        if (passwordStatus?.success) {
            toast({
                description: <div className='flex gap-3 items-center text-white font-medium'><Check />{passwordStatus?.message}</div>,
                className: "bg-green-800 text-white border-none"
            })
        } else {
            toast({
                description: <div className='flex gap-3 items-center text-white font-medium'><X />{passwordStatus?.message}</div>,
                className: "bg-red-800 text-white border-none"
            })
        }
    }

    return (
        <div className="gap-4 flex flex-col">
            <h2 className="font-medium">Endre Passord</h2>
            <div className="flex flex-col gap-3">
                <div className="gap-1.5 flex flex-col">
                    <p className="text-sm">Gammelt Passord</p>
                    <input
                        value={oldPassword}
                        onChange={handleOldChange}
                        type="password"
                        className="border h-10 rounded-md p-2 border-gray-400 w-[300px]"
                    />
                </div>
                <div className="gap-1.5 flex flex-col">
                    <p className="text-sm">Nytt Passord</p>
                    <input
                        value={newPassword}
                        onChange={handleNewChange}
                        type="password"
                        className="border h-10 rounded-md p-2 border-gray-400 w-[300px]"
                    />
                </div>
            </div>
            <button
                onClick={handleUpdatePassword}
                className="px-4 h-10 py-2 text-white h-full bg-green-700  w-[100px] rounded-md hover:bg-green-800 border-green-700"
            >
                Lagre
            </button>

        </div>
    )
}

export default ChangePassword;