
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const deleteDugnad = async (dugnadId: number) => {
  try {
    await db.dugnad.delete({
      where: {
        id: dugnadId,
      },
    });
  } catch (error) {
    console.error("Error ved sletting av dugnad:", error);
    return { error: "Error ved sletting av dugnad" };
  }

  return redirect("/utforsk");
};
