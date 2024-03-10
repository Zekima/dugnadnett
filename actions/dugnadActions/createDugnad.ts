"use server";

import { DugnadSchema } from "@/schemas/index";
import uploadImage from "@/actions/uploadImage";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export const createDugnad = async (formData: FormData) => {
  const categoriesString = formData.get("categories");
  let categoriesArray = [];

  if (typeof categoriesString === "string") {
    categoriesArray = JSON.parse(categoriesString);
  }

  const dateValue = formData.get("date");
  let formattedDate = "";

  if (typeof dateValue === "string") {
    formattedDate = new Date(dateValue).toISOString();
  }

  const values = {
    area: formData.get("area"),
    title: formData.get("title"),
    date: formattedDate,
    info: formData.get("info"),
    categories: categoriesArray,
    image: formData.get("image"),
  };
  const validatedFields = DugnadSchema.safeParse(values);

  if (!validatedFields.success) {
    console.log("Validation errors:", validatedFields.error.issues);
    return { error: "Ugyldig data" };
  }

  const { area, title, date, info, categories } = validatedFields.data;

  let imageUrl = "";

  const checkImage = formData.get("image");

  if (checkImage && checkImage !== "undefined") {
    try {
      const blob = await uploadImage(formData);
      imageUrl = blob as string;
    } catch (error) {
      console.log("Error ved opplasting av bilde:", error);
      return { error: "Error ved opplasting av bilde" };
    }
  }

  const user = await getCurrentUser();
  const userId = user?.id;

  let dugnad;
  try {
      dugnad = await db.dugnad.create({
      data: {
        ownerId: userId as string,
        area: area,
        date: date,
        info: info,
        title: title,
        image: imageUrl,
        status: 'ACTIVE',
        categories: {
          connect: categories.map((category) => ({ name: category })),
        },
      },
    });

  } catch (error) {
    console.error("Error ved oppretting av dugnad:", error);
    return { error: "Error ved oppretting av dugnad" };
  }

  return redirect(`/dugnad/${dugnad.id}`)
};
