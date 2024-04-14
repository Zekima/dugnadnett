"use client";

import React, { useState, useEffect } from "react";

const GDPRBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("gdprConsent");
    if (consent === null) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("gdprConsent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("gdprConsent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-3 z-50 left-1/2 gap-4 flex-col -translate-x-1/2 rounded-full bg-green-100 px-10 py-4 shadow-md text-center flex justify-center outline outline-green-800 items-center">
      <p className="text-sm text-gray-700 min-w-[350px] max-w-[550px]">
        Vi bruker informasjonskapsler for å forbedre opplevelsen din på vår
        nettside. Ved å godta samtykker du til vår bruk av informasjonskapsler.
      </p>
      <div>
        <button
          onClick={handleAccept}
          className="mr-2 px-4 py-2 text-white bg-green-800 outline outline-green-500 rounded hover:bg-green-900"
        >
          Godta
        </button>
        <button
          onClick={handleDecline}
          className="px-4 py-2 text-gray-700 bg-white outline rounded hover:bg-gray-200"
        >
          Avvis
        </button>
      </div>
    </div>
  );
};

export default GDPRBanner;
