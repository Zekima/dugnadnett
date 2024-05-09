'use client'

import { Pencil, Trash, Loader } from "lucide-react";
import UserImage from "../user-image";

import { deleteAvatar, updateAvatar } from "@/actions/settingsActions/profileSettings";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { useState } from "react";


const ChangeAvatar = ({ user }: { user: User }) => {
  const session = useSession();
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    await updateAvatar(formData);
    await session.update();
    setLoading(false);
  }

  const handleDelete = async () => {
    await deleteAvatar();
    user.image = ""
    await session.update();
  }

  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      await handleSubmit(formData);
    }
  };

  return (
    <>
      <h2 className="font-medium">Profilbilde</h2>

      <div className="mb-2 flex gap-6">

      <div className="relative">
          <UserImage user={user} size={128} />
          {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-50 flex justify-center items-center">
              <Loader size={48} className="animate-spin" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1.5 justify-center">
        <form>
            <label htmlFor="image" className="px-4 flex items-center gap-2 py-2 rounded-md bg-green-700 text-white hover:bg-green-800 cursor-pointer">
              <Pencil size={20} />
              <input
                type="file"
                name="image"
                id="image"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </form>
          <button onClick={handleDelete} className="px-4 flex items-center gap-2 py-2 rounded-md bg-red-700 text-white hover:bg-red-800">
            <Trash size={20} />
          </button>
        </div>
      </div>
    </>
  )
}

export default ChangeAvatar;