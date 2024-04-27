'use client'

import React, { useState } from 'react';


const Bio = ({initalBio}: {initalBio: string}) => {
    const [bio, setBio] = useState(initalBio);
    const handleBioChange = (event: any) => {
        setBio(event.target.value);
      };

    return (
        <div className='flex flex-col gap-4'>
          <h2 className="font-medium">Biografi</h2>
          <textarea
            placeholder="Skriv en biografi"
            value={bio}
            onChange={handleBioChange}
            className="border border-gray-400 rounded-md p-2 resize-none w-[500px] h-[150px]"
          ></textarea>

          
        <button className="bg-green-700 text-white py-2 px-4 w-[100px] rounded-md hover:bg-green-800">
          Lagre
        </button>
        </div>
    )
}

export default Bio;