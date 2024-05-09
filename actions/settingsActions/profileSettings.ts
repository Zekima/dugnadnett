'use server'
import { useRouter } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import B2 from "backblaze-b2";
import sharp from "sharp";
import randomstring from "randomstring";

export async function updateBio(content: string) {
    const user = await getCurrentUser();
    if (!user?.id) return;

    try {
        await db.user.update({
            where: { id: user.id },
            data: {
                bio: content
            }
        })
        revalidatePath('/innstillinger')
        revalidatePath(`/profil/${user.id}`)

        return { message: "Biografi oppdatert!", success: true }
    } catch (e) {
        console.log("Kunne ikke oppdatere bio: ", e)
    }
}

export async function updateSkills(listOfSkills: string[]) {
    const user = await getCurrentUser();
    if (!user?.id) return;

    try {
        await db.user.update({
            where: { id: user.id },
            data: {
                skills: listOfSkills
            }
        })
        revalidatePath('/innstillinger')
        revalidatePath(`/profil/${user.id}`)

        return { message: "Ferdigheter oppdatert!", success: true }
    } catch (e) {
        console.log("Kunne ikke oppdatere ferdigheter: ", e)
    }

}


const keyId = process.env.B2_KEY_ID as string;
const applicationKey = process.env.B2_APPLICATION_KEY as string;
const bucketId = process.env.B2_BUCKET_ID as string;

const b2 = new B2({
    applicationKeyId: keyId,
    applicationKey: applicationKey,
});

export async function updateAvatar(avatar: FormData) {
    const image = avatar.get("image") as File;
    if (!image) throw new Error("Ingen bilde");
    const user = await getCurrentUser();
    if (!user?.id) return;

    const fileType = image.type;
    const blob = new Blob([image], { type: fileType });
    const imageBinary = await blob.arrayBuffer();
    const buffer = Buffer.from(imageBinary);

    const fileName = `${randomstring.generate(8)}`;

    try {
        await b2.authorize();
    } catch (e) {
        console.error("Kunne ikke autentisere backblaze")
    }

    const uploadUrlResponse = await b2.getUploadUrl({ bucketId });

    const resizedBuffer = await sharp(buffer)
        .resize(300, null)
        .webp({ quality: 95 })
        .toBuffer();

    try {
        await b2.uploadFile({
            uploadUrl: uploadUrlResponse.data.uploadUrl,
            uploadAuthToken: uploadUrlResponse.data.authorizationToken,
            fileName: `${fileName}.webp`,
            data: resizedBuffer,
            mime: "image/webp",
        });
        try {
            await db.user.update({
                where: {
                    id: user.id
                },
                data: {
                    image: `https://dugnadnett.s3.eu-central-003.backblazeb2.com/${fileName}.webp`
                }
            })
            revalidatePath("/")
        } catch (error) {
            console.log("Kunne ikke sette bildeurl i databasen:", error)
        }
    } catch (error) {
        console.error(`Feil ved opplasting av avatar:`, error);
        return;
    }

}


export async function deleteAvatar() {
    const user = await getCurrentUser();
    if (!user?.id) return;

    try {
        await db.user.update({
            where: {
                id: user.id
            },
            data: {
                image: ""
            }
        })

    } catch (e) {
        console.log("Kunne ikke slette avatar:", e)
    }
}

