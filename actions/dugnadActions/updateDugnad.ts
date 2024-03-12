"use server"

import { DugnadSchema2 } from "@/schemas/index";
import uploadImage from "@/actions/uploadImage";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const updateDugnad = async (formData: FormData, dugnadId: number) => {

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
    const locationLatitude = parseFloat(formData.get("locationLatitude") as string);
    const locationLongitude = parseFloat(formData.get("locationLongitude") as string);
  
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
  
    const { location, title, date, info, categories } = validatedFields.data;
  
    let imageUrl = values.image;
  
    if (imageUrl && imageUrl !== "undefined") {
      try {
        const blob = await uploadImage(formData);
        imageUrl = blob as string;
      } catch (error) {
        console.log("Error ved opplasting av bilde:", error);
        return { error: "Error ved opplasting av bilde" };
      }
    }

    let data = {
      date: date,
      info: info,
      title: title,
      categories: {
        set: [],
        connect: categories.map((category) => ({ name: category })),
      },
    };

    const imageChanged = formData.get("imageChanged") === "true";

    if (imageChanged) {
      if (imageUrl !== "undefined") {
        //@ts-ignore
        data.image = imageUrl;
      } else {
        //@ts-ignore
        data.image = null
      }
    }
  
    try {
      const updatedDugnad = await db.dugnad.update({
        where: {
          id: dugnadId,
        },
        data: data,
        include: {location: true}
      });

      await db.location.update({
        where: { id: updatedDugnad.locationId },
        data: {
          address: location.address,
          latitude: location.latitude,
          longitude: location.longitude,
        },
      });
  
    } catch (error) {
      console.error("Error ved oppdatering av dugnad:", error);
      return { error: "Error ved oppdatering av dugnad" };
    }
  
    return redirect(`/dugnad/${dugnadId}`);
  };
  