"use server"

import { DugnadSchema } from "@/schemas/index";
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
      area: area,
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
      await db.dugnad.update({
        where: {
          id: dugnadId,
        },
        data: data
      });
  
    } catch (error) {
      console.error("Error ved oppdatering av dugnad:", error);
      return { error: "Error ved oppdatering av dugnad" };
    }
  
    return redirect(`/dugnad/${dugnadId}`);
  };
  