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


export default function Sorter() {
  const [selectedValue, setSelectedValue] = useState('publisert');

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <Select value={selectedValue} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup>
          <SelectItem value="publisert">Publisert</SelectItem>
          <SelectItem value="popularitet">Popularitet</SelectItem>
          <SelectItem value="nærmest">Nærmest</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
