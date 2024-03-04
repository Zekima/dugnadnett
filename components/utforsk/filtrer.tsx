'use client'

import React, {useState} from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useDebouncedCallback } from 'use-debounce';
import BadgeSelect from '@/components/utforsk/badge-select'

import { CiSearch } from "react-icons/ci";
import Image from "next/image";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Filtrer({categories, categoryParams}: any) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 350);

  const [selectedCategories, setSelectedCategories] = useState(categoryParams);

  const handleCategoryChange = (newCategories: any) => {
    setSelectedCategories(newCategories)
    const params = new URLSearchParams(searchParams);
    const categoriesJoined = newCategories.join(',');
    if (categoriesJoined) {
      params.set('categories', categoriesJoined);
    } else {
      params.delete('categories');
    }
    replace(`${pathname}?${params.toString()}`);
  }
  

  return (
    <div className="gap-y-6 flex flex-col">
      <div className="relative">
        <CiSearch size={24} className="absolute right-2 bottom-2" />
        <Input
          placeholder="Søk i dugnader"
          className="bg-white"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get('query')?.toString()}
        />
      </div>

      <div>
        <h1 className="font-bold">Kategorier</h1>
        <div className="flex gap-1 mt-2 flex-wrap">
          <BadgeSelect categories={categories} value={selectedCategories} onChange={handleCategoryChange}/>
        </div>
      </div>

      {/* <div>
        <h1 className="font-bold">Område</h1>
      </div> */}
    </div>
  );
}
