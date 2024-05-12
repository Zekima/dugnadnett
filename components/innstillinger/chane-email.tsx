'use client'

import { User } from "next-auth";
import { useState } from "react";
import { toast } from "../ui/use-toast";
import { Check, X } from "lucide-react";
import { useSession } from "next-auth/react";

type StatusType = {
    message: string;
    success: boolean;
};

const ChangeEmail = ({ user, updateEmail }: { user: User, updateEmail: (content: string) => Promise<StatusType | undefined> }) => {
    const session = useSession();

    const [email, setEmail] = useState(user?.email as string);
    const handleEmailChange = (event: any) => {
        setEmail(event.target.value)
    }

    const handleEmailUpdate = async () => {
        const emailStatus = await updateEmail(email)
        if (emailStatus?.success) {
            toast({
                description: <div className='flex gap-3 items-center text-white font-medium'><Check />{emailStatus?.message}</div>,
                className: "bg-green-800 text-white border-none"
            })
        } else {
            toast({
                description: <div className='flex gap-3 items-center text-white font-medium'><X />{emailStatus?.message}</div>,
                className: "bg-red-800 text-white border-none"
            })
        }
        await session.update()

    }
    return (
        <div className="gap-4 flex flex-col">
            <h2 className="font-medium">E-postadresse</h2>
            <div className="flex gap-1.5">
                <input
                    value={email}
                    onChange={handleEmailChange}
                    className="border h-10 rounded-md p-2 border-gray-400 w-[300px]"
                />
                <button
                    onClick={handleEmailUpdate}
                    className="px-4 h-10 py-2 text-white h-full bg-green-700 rounded-md hover:bg-green-800 border-green-700"
                >
                    Lagre
                </button>
            </div>

        </div>
    )
}

export default ChangeEmail;