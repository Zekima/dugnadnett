"use server";

import { DugnadSchema2 } from "@/schemas/index";
import uploadImage from "@/actions/uploadImage";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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

  const locationAddress = formData.get("locationAddress") as string;
  const locationLatitude = parseFloat(
    formData.get("locationLatitude") as string
  );
  const locationLongitude = parseFloat(
    formData.get("locationLongitude") as string
  );

  const values = {
    title: formData.get("title"),
    date: formattedDate,
    info: formData.get("info"),
    categories: categoriesArray,
    image: formData.get("image"),
    location: {
      address: locationAddress,
      latitude: locationLatitude,
      longitude: locationLongitude,
    },
  };
  const validatedFields = DugnadSchema2.safeParse(values);

  if (!validatedFields.success) {
    console.log("Validation errors:", validatedFields.error.issues);
    return { error: "Ugyldig data" };
  }

  const { title, date, info, categories, location } = validatedFields.data;

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
    const newLocation = await db.location.create({
      data: {
        address: location.address,
        latitude: location.latitude,
        longitude: location.longitude,
      },
    });

    dugnad = await db.dugnad.create({
      data: {
        ownerId: userId as string,
        locationId: newLocation.id,
        date: date,
        info: info,
        title: title,
        image: imageUrl,
        status: "ACTIVE",
        categories: {
          connect: categories.map((category) => ({ name: category })),
        },
      },
    });
  } catch (error) {
    console.error("Error ved oppretting av dugnad:", error);
    return { error: "Error ved oppretting av dugnad" };
  }

  revalidatePath(`/dugnad/${dugnad.id}`)
  redirect(`/dugnad/${dugnad.id}`);
};
