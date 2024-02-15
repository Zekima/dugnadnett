"use server";

import B2 from "backblaze-b2";
import sharp from "sharp";
import randomstring from "randomstring";

const keyId = process.env.B2_KEY_ID as string;
const applicationKey = process.env.B2_APPLICATION_KEY as string;
const bucketId = process.env.B2_BUCKET_ID as string;

const b2 = new B2({
  applicationKeyId: keyId,
  applicationKey: applicationKey,
});

async function uploadImage(data: FormData) {
  const image = data.get("image") as File;
  if (!image) throw new Error("Ingen bilde");

  const fileType = image.type;
  const blob = new Blob([image], { type: fileType });
  const imageBinary = await blob.arrayBuffer();
  const buffer = Buffer.from(imageBinary);

  const targetWidths = [500, 900];
  const fileName = `${randomstring.generate(8)}`;


  const uploadPromises = targetWidths.map(async (width) => {
    await b2.authorize();
    const uploadUrlResponse = await b2.getUploadUrl({ bucketId });

    const resizedBuffer = await sharp(buffer)
      .resize(width, null, {
        withoutEnlargement: true,
      })
      .webp({ quality: 95 })
      .toBuffer();

    try {
      await b2.uploadFile({
        uploadUrl: uploadUrlResponse.data.uploadUrl,
        uploadAuthToken: uploadUrlResponse.data.authorizationToken,
        fileName: `${fileName}-${width}.webp`,
        data: resizedBuffer,
        mime: "image/webp",
      });
    } catch (error) {
      console.error(`Feil ved opplasting av bilde ${width}px:`, error);
      throw error;
    }
  });

  try {
    await Promise.all(uploadPromises);
    return `https://dugnadnett.s3.eu-central-003.backblazeb2.com/${fileName}`;
  } catch (error) {
    console.error("Error ved opplasting av bilde:", error);
  }
}

export default uploadImage;
