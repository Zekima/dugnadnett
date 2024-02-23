import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email er obligatorisk",
  }),
  password: z.string().min(1, {
    message: "Passord er obligatorisk",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email er påkrevd",
  }),
  name: z.string().min(1, {
    message: "Navn er påkrevd",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 bokstaver",
  }),
});

const MAX_FILE_SIZE = 450000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif"
];

export const DugnadSchema = z.object({
  title: z.string().min(1, "Tittel er påkrevd"),
  area: z.string().min(1, "Område er påkrevd"),
  status: z.string().min(1, ""),
  date: z.string().min(1, "Dato er påkrevd"),
  info: z.string().min(1, "Informasjon er påkrevd"),
  categories: z.array(z.string()).min(1, "Velg minst en kategori"),
  image: z.unknown().optional().refine((files: any) => {
    let allowedImage = true;
    
    if (!files || !Array.isArray(files)) {
      return true;
    }

    for (let i = 0; i < files.length; i++) {
      if (
        // @ts-expect-error
        files.item(i)!.size > MAX_FILE_SIZE ||
        // @ts-expect-error
        !ACCEPTED_IMAGE_TYPES.includes(files.item(i)!.type)
      ) {
        allowedImage = false
        break
      }
      
    }

    return allowedImage;
  }, "Maks filstørelse er 4.5MB"),

});


export const ReviewSchema = z.object({
  title: z.string().min(1, {
    message: "Tittel er påkrevd"
  }),
  text: z.string().min(1).max(100, {
    message: "Maximum av 100 karakterer"
  }),
  rating: z.number().min(1).max(5)
})

