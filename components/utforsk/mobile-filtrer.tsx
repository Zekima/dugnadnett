import React from "react";

import Filtrer from "@/components/utforsk/filtrer";

import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerHeader
} from "@/components/ui/drawer"

const MobileFiltrer = (props: any) => {
    return (
        <Drawer>
            <DrawerTrigger className="py-1 px-2 rounded-md text-sm bg-white border-2 hover:bg-gray-100">Filtrer</DrawerTrigger>
            <DrawerContent className="bg-white h-full p-5">
                <div className="flex items-center justify-center">
                <div className="bg-gray-200 h-2 mb-6 rounded-lg w-1/2"></div></div>
                <Filtrer {...props} />
            </DrawerContent>
        </Drawer>
    );
}

export default MobileFiltrer;