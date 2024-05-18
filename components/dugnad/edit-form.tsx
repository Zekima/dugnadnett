"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import BadgeSelect from "@/components/utforsk/badge-select";
import { DugnadSchema2 } from "@/schemas/index";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import * as z from "zod";

import React, { useState } from "react";
import { updateDugnad } from "@/actions/dugnadActions/updateDugnad";
import { Separator } from "@/components/ui/separator"
import { Location } from "@/types";
import Link from "next/link";
import CreateEditMap from "../maps/createEditMap";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const EditForm = ({ categories, dugnad }: any) => {
  const [selectedCategories, setSelectedCategories] = useState(dugnad.categories.map((category: { id: number, name: string }) => category.name))
  const [imageChanged, setImageChanged] = useState(false);

  const form = useForm<z.infer<typeof DugnadSchema2>>({
    resolver: zodResolver(DugnadSchema2),
    defaultValues: {
      title: dugnad.title,
      location: {
        address: dugnad.location.address,
        latitude: dugnad.location.latitude,
        longitude: dugnad.location.longitude
      },
      date: new Date(dugnad.date).toISOString().slice(0, 16),
      info: dugnad.info,
      categories: selectedCategories,
      image: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof DugnadSchema2>) => {
    const formData = new FormData();

    if (data.image && data.image != dugnad.image) {
      // @ts-expect-error
      formData.append("image", data.image[0]);
    }

    formData.append("title", data.title);
    formData.append("date", data.date);
    formData.append("locationAddress", data.location.address);
    formData.append("locationLatitude", String(data.location.latitude));
    formData.append("locationLongitude", String(data.location.longitude));
    formData.append("info", data.info);
    formData.append("categories", JSON.stringify(data.categories));
    formData.append("imageChanged", JSON.stringify(imageChanged));

    try {
      await updateDugnad(formData, dugnad.id);
    } catch (error) {
      console.error(error);
    }
  };

  const prevImage = dugnad.image ? dugnad.image + "-900.webp" : null

  const [preview, setPreview] = useState<any>(prevImage);

  const handlePreviewChange = (event: any) => {
    const file = event.target.files[0];
    if (!file) return
    setImageChanged(true);
    if (file.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }

  const handlePreviewDelete = () => {
    setPreview(null);
    setImageChanged(true);
  }

  const [location, setLocation] = useState({
    address: dugnad.location.address,
    latitude: dugnad.location.latitude,
    longitude: dugnad.location.longitude
  });

  const handleAreaChange = (newLocation: Location) => {
    setLocation(newLocation);
    form.setValue('location.address', newLocation.address);
    form.setValue('location.latitude', newLocation.latitude);
    form.setValue('location.longitude', newLocation.longitude);
  };

  return (
    <div className="">
      <div className="min-h-screen flex justify-center relative">
        <div className="max-w-[1280px]">
          <div className="p-6 mt-3 rounded-md">
            <h1 className="text-2xl font-semibold">Rediger Dugnad</h1>
            <Separator className="my-4" />
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col md:flex-row justify-between gap-x-5 gap-y-3">
                  <div className="flex flex-col gap-4 w-full md:w-1/2">
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="image" className="flex items-center gap-2">
                            Bilde <FormMessage className="text-red-500" />
                          </FormLabel>
                          <FormControl>
                            <div className="flex flex-col rounded-md relative items-center justify-center bg-white border-2 border-dashed border-gray-400 hover:border-gray-400">
                              {preview ? (
                                <div className="absolute">
                                  <button className="absolute right-0 top-0 text-white bg-black cursor-pointer z-50" onClick={() => handlePreviewDelete()}><X /></button>
                                  <img src={preview} alt="Preview" style={{ position: 'relative', maxHeight: 300 }} />
                                </div>
                              ) : (
                                <div className="absolute right-50 text-center justify-center text-sm text-gray-600">
                                  <div className="font-medium text-gray-600">
                                    Klikk for å bla i filutforsker
                                  </div>
                                  <div className="text-xs text-gray-500 mt-2">
                                    kun jpg, jpeg, avif, png og webp tillat
                                  </div>
                                </div>
                              )}
                              <Input
                                {...form.register("image")}
                                type="file"
                                id="image"
                                name="image"
                                className="opacity-0 py-[160px]"
                                onChange={(e) => {
                                  handlePreviewChange(e);
                                }}
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            Tittel <FormMessage className="text-red-500" />
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Skriv inn tittel"
                              className="bg-white"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="info"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            Beskrivelse <FormMessage className="text-red-500" />
                          </FormLabel>

                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Skriv inn beskrivelse"
                              className="bg-white min-h-[160px]"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full flex flex-col gap-4 md:w-1/2">
                    <div>
                      <p className="leading-none font-medium text-sm mb-2">Område

                        {form.formState.errors.location?.address && (
                          <span className="text-red-500 ml-2">{form.formState.errors.location?.address.message}</span>
                        )}

                      </p>
                      <CreateEditMap
                        areaValue={location}
                        onAreaChange={handleAreaChange}
                        isNew={false}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="categories"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            Kategorier <FormMessage className="text-red-500" />
                          </FormLabel>
                          <FormControl>
                            <BadgeSelect {...field} categories={categories} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            Dato <FormMessage className="text-red-500" />
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="datetime-local"
                              {...field}
                              className="bg-white"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="gap-2 flex justify-between my-10 rounded-md bg-gray-200 p-4">
                  <div className="w-1/2 ml-6 flex items-center">
                    <Link href={`/dugnad/${dugnad.id}`}><button className="flex items-center gap-2"><div className="rotate-180">➜</div>Gå tilbake</button></Link>
                  </div>
                  <div className="gap-2 flex justify-end w-full rounded-md bg-gray-200">

                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                      className="w-full md:w-1/4 py-6 text-md bg-green-800 hover:bg-green-900 font-medium"
                    >
                      {form.formState.isSubmitting ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Lagre"
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
