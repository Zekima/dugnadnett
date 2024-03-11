import React from "react";

import Filtrer from "@/components/utforsk/filtrer";

import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"

const MobileFiltrer = (props: any) => {
    return (
        <Drawer>
            <DrawerTrigger className="py-1 px-2 rounded-md text-sm bg-white border-2 hover:bg-gray-100">Filtrer</DrawerTrigger>
            <DrawerContent className="bg-white h-2/3 p-5">
                <Filtrer {...props} />
            </DrawerContent>
        </Drawer>
    );
}

export default MobileFiltrer;