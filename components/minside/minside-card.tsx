import React from "react";
import {z} from "zod";
import {User} from "@/types";
import {getCurrentUser} from "@/lib/auth";

const MinsideCard =  async () => {
    const user = await getCurrentUser();
    return (
        <div className="border-2 border-gray-300 rounded-md cursor-pointer">
            <div className="p-2">
                {user?.name}
            </div>
        </div>
    )
}

export default MinsideCard;