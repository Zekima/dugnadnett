import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { ReviewSchema } from "@/schemas";

export async function createReview(dugnadId: number, formData: FormData) {
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

export async function getReviewsByUserId() {
    const user = await getCurrentUser();
    if (!user?.id) return;

    try {
        const reviews = await db.review.findMany({
            where: {
                writerId: user.id
            }
        })

        return reviews;
    } catch (e) {
        console.error("Kunne ikke hente skapte anmendelser for denne brukeren", e)
        return;
    }
}