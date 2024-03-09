"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import BadgeSelect from "@/components/utforsk/badge-select";
import { DugnadSchema } from "@/schemas/index";
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
import { relative } from "path";
import Link from "next/link";


const EditForm = ({ categories, dugnad, handleDelete }: any) => {
  const [selectedCategories, setSelectedCategories] = useState(dugnad.categories.map((category: {id: number, name: string}) => category.name))

  const form = useForm<z.infer<typeof DugnadSchema>>({
    resolver: zodResolver(DugnadSchema),
    defaultValues: {
      title: dugnad.title,
      area: dugnad.area,
      date: new Date(dugnad.date).toISOString().slice(0, 16),
      info: dugnad.info,
      categories: selectedCategories,
      image: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof DugnadSchema>) => {
    const formData = new FormData();

    if (data.image && data.image != dugnad.image) {
      // @ts-expect-error
      formData.append("image", data.image[0]);
    }

    formData.append("title", data.title);
    formData.append("area", data.area);
    formData.append("date", data.date);
    formData.append("info", data.info);
    formData.append("categories", JSON.stringify(data.categories));

    try {
      await updateDugnad(formData, dugnad.id);
    } catch (error) {
      console.error(error);
    }
  };

  const prevImage = dugnad.image ?  dugnad.image + "-900.webp" : null

  const [preview, setPreview] = useState<any>(prevImage);

  const handlePreviewChange = (event: any) => {
    const file = event.target.files[0];
    if (!file) return
    if (file.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }


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
                                  <button className="absolute right-0 top-0 text-white bg-black cursor-pointer z-50" onClick={() => setPreview(null)}><X /></button>
                                  <img src={preview} alt="Preview" style={{ position: 'relative', maxHeight: 300 }} />
                                </div>
                              ) : (
                                <div className="absolute right-50 text-center justify-center text-sm text-gray-600">
                                  <div className="font-medium text-gray-600">
                                    Dra eller slipp bilde her
                                  </div>
                                  <div className="text-xs text-gray-500 mt-2">
                                    (eller klikk for å bla i filutforsker)
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

                        {form.formState.errors.area && (
                          <span className="text-red-500 ml-2">{form.formState.errors.area.message}</span>
                        )}

                      </p>
                      <img className="rounded-md outline-gray-400 outline outline-1" src="/oslomap.webp" alt="" />


                      <FormField
                        control={form.control}
                        name="area"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Skriv inn område"
                                className="bg-white mt-2"
                              />
                            </FormControl>
                          </FormItem>
                        )}
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
                            <BadgeSelect {...field} categories={categories}  />
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
                    <Link href={`/dugnad/${dugnad.id}`}><button>← Gå tilbake</button></Link>
                  </div>
                  <div className="gap-2 flex justify-end w-full rounded-md bg-gray-200">
                    <Button
                      type="button"
                      onClick={() => handleDelete()}
                      className="w-full md:w-1/4 py-6 text-md bg-red-800 hover:bg-red-900 font-medium"
                    >
                      Slett Dugnad
                    </Button>
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
