"use client"

import React, { useState } from 'react';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

  import { useSearchParams, usePathname, useRouter } from 'next/navigation';


export default function Sorter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [selectedValue, setSelectedValue] = useState(searchParams.get('sort')?.toString() || 'publisert');

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('sort', value);
    } else {
      params.delete('sort');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select value={selectedValue} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent className="bg-white z-50">
        <SelectGroup>
          <SelectItem value="publisert">Publisert</SelectItem>
          <SelectItem value="eldste">Eldste</SelectItem>
          <SelectItem value="nærmest">Nærmest</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
