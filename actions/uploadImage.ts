"use server"

import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';

async function uploadImage(data: FormData) {
    'use server';
    const image = data.get('image') as File;
    const blob = await put(image.name, image, {
      access: 'public',
    });
    revalidatePath('/');
    return blob;
  }

export default uploadImage;