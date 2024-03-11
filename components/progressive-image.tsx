'use client'

import React, { useState, useEffect } from 'react';

export const ProgressiveImage = ({ low, high, alt, className }: any) => {
  const [srcState, setSrcState] = useState(low);

  useEffect(() => {
    const img = new Image();
    img.src = high;
    img.onload = () => {
      setSrcState(high);
    };
  }, [low, high]);

  return <img src={srcState} alt={alt} className={className} />;
};