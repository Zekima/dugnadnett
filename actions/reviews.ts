import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { ReviewSchema } from "@/schemas";

export default async function createReview(dugnadId: number, formData: FormData) {
    const user = await getCurrentUser();
    if (!user?.id) return;

    const values = {
        title: formData.get("title"),
        text: formData.get("text"),
        rating: formData.get("rating"),
    }

    const validatedFields = ReviewSchema.safeParse(values)

    if (!validatedFields.success) {
        console.log("Ugyldig data:", validatedFields.error.issues);
        return { error: "Ugyldig data" };
      }

    const {title, text, rating} = validatedFields.data;

    try {
        await db.review.create({
            data: {
                title: title,
                text: text,
                rating: rating,
                dugnadId: dugnadId,
                writerId: user.id
            }
        })

    } catch (error) {
        console.error("Kunne ikke lage anmeldelse:", error)
    }
}