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

  try {
    await b2.authorize();
  } catch (error) {
    console.error("Kunne ikke autentisere backblaze", error);
    throw new Error("Autentisering til Backblaze feilet");
  }

  const uploadPromises = targetWidths.map(async (width) => {
    let uploadUrlResponse, uploadUrl, authorizationToken;

    try {
      uploadUrlResponse = await b2.getUploadUrl({ bucketId });
      uploadUrl = uploadUrlResponse.data.uploadUrl;
      authorizationToken = uploadUrlResponse.data.authorizationToken;
    } catch (error) {
      console.error("Kunne ikke hente opplastings-URL fra backblaze", error);
      throw new Error("Feil ved henting av opplastings-URL");
    }

    const resizedBuffer = await sharp(buffer)
      .resize(width, null, {
        withoutEnlargement: true,
      })
      .webp({ quality: 95 })
      .toBuffer();

    return retryUpload(uploadUrl, authorizationToken, `${fileName}-${width}.webp`, resizedBuffer, "image/webp", b2, bucketId);
  });

  try {
    await Promise.all(uploadPromises);
    return `https://dugnadnett.s3.eu-central-003.backblazeb2.com/${fileName}`;
  } catch (error) {
    console.error("Error ved opplasting av bilde:", error);
    throw new Error("Opplasting av bilde feilet");
  }
}

async function retryUpload(uploadUrl: string, authorizationToken: string, fileName: string, data: Buffer, mime: string, b2: any, bucketId: string, retries = 15, delay = 1000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await b2.uploadFile({
        uploadUrl,
        uploadAuthToken: authorizationToken,
        fileName,
        data,
        mime,
      });
      console.log(`Velykket opplasting: ${fileName}`);
      return;
    } catch (error: any) {
      if (attempt === retries || error.response?.status !== 503) {
        console.error(`Feil ved opplasting av bilde ${fileName}:`, error);
        throw new Error(`Opplasting feilet for ${fileName}`);
      }

      console.warn(`Forsøk ${attempt} feilet for ${fileName}. Prøver igjen om ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));

      try {
        await b2.authorize();
        const uploadUrlResponse = await b2.getUploadUrl({ bucketId });
        uploadUrl = uploadUrlResponse.data.uploadUrl;
        authorizationToken = uploadUrlResponse.data.authorizationToken;
      } catch (reauthError) {
        console.error("Kunne ikke reautentisere og hente ny opplastings URL", reauthError);
        throw new Error("Feil ved reautentisering");
      }
    }
  }
}

export default uploadImage;
