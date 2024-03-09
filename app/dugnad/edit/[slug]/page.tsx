import React from "react";
import {
    getDugnadById,
    getOwnerByDugnadId,
} from "@/actions/dugnadActions/getDugnads";

import { getCategories } from "@/actions/category";


import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import EditForm from "../../../../components/dugnad/edit-form";


export default async function DugnadEditPage({
    params,
}: {
    params: { slug: string };
}) {
    const dugnad = await getDugnadById(params.slug);
    if (!dugnad) return;
    const dugnadOwner = await getOwnerByDugnadId(dugnad.ownerId);
    if (!dugnadOwner) return;
    const user = await getCurrentUser();

    const isOwner = dugnadOwner.id === user?.id

    if (!isOwner) {
        redirect(`/dugnad/${dugnad.id}`)
    }

    const categories = await getCategories();

    return; // <EditForm categories={categories} dugnad={dugnad}></EditForm>;
}
